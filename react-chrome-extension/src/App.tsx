import { useState, useEffect } from 'react';
import useBookmarks from './hooks/useBookmarks';
import { getCurrentTab } from './utils';
import SignInForm from './components/SignInForm';
import { handleError } from './utils/errorHandler';
import BookmarkList from './components/BookmarkList';
import useAuthentication from './hooks/useAuthentication';
import { BookmarkType } from './types';
import Notification from './components/Notification';
import UserActions from './components/UserActions';

type Tags = {
  themes: string[];
  specifics: string[];
};

function App() {
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const { addBookmark, fetchBookmarks } = useBookmarks();
  const { user, handleSignOut } = useAuthentication();
  const [bookmarks, setBookmarks] = useState<BookmarkType[] | null>(null);
  const [tags, setTags] = useState<Tags | null>(null);

  const handleAddBookmarkClick = async () => {
    setIsLoading(true);

    const currentTab = await getCurrentTab();

    if (!currentTab) {
      console.error('No current tab! Please try again.');
      setIsLoading(false);
      return;
    }

    const { error } = await addBookmark(currentTab.url, currentTab.title);

    if (error) {
      setNotification({
        type: 'error',
        message: 'Failed to add bookmark. Please try again.',
      });
      setIsLoading(false);
      return;
    }

    setNotification({
      type: 'success',
      message: "You've successfully added a bookmark!",
    });

    setTimeout(() => {
      setNotification(null);
    }, 2000);

    setIsLoading(false);
  };

  const handleGenerateTags = async () => {
    console.log('Generating tags...');
    setIsGeneratingTags(true);

    const currentTab = await getCurrentTab();

    if (!currentTab) {
      console.error('No current tab! Please try again.');
      setIsGeneratingTags(false);
      return;
    }

    const res = await fetch(
      `http://localhost:3000/api/tagifier?url=${currentTab.url}`
    );

    const { error, themes, specifics } = await res.json();
    setIsGeneratingTags(false);

    if (error) {
      console.error('Error generating tags!');
      return;
    }

    console.log('Themes: ', themes);
    console.log('Specifics: ', specifics);

    setTags({ themes, specifics });
  };

  useEffect(() => {
    if (user) {
      fetchBookmarks()
        .then((data) => {
          if (data) {
            setBookmarks(data);
          }
        })
        .catch((error) => {
          handleError(error, 'Error fetching bookmarks');
        });
    }
  }, [user, fetchBookmarks]);

  return (
    <main className="rounded-md gap-8 py-8 m-8 flex flex-col w-96 items-center border border-white">
      <h1 className="text-2xl font-bold text-center">
        Digital Bookmarking Tool
      </h1>

      {!user ? (
        <SignInForm />
      ) : (
        <>
          <p className="text-center">
            Welcome, <strong>{user.email}</strong>!
          </p>

          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}

          <UserActions
            handleAddBookmark={handleAddBookmarkClick}
            handleSignOut={handleSignOut}
            handleGenerateTags={handleGenerateTags}
            isLoading={isLoading}
          />

          {isGeneratingTags && <p>Generating tags...</p>}

          {tags && (
            <div className="border border-gray-100 rounded-md p-4 mt-4 flex flex-row gap-28">
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-lg">Themes</h2>
                <ul>
                  {tags.themes.map((theme) => (
                    <li>{theme}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-lg">Specifics</h2>
                <ul>
                  {tags.specifics.map((specific) => (
                    <li>{specific}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <BookmarkList bookmarks={bookmarks ?? []} />
        </>
      )}
    </main>
  );
}

export default App;

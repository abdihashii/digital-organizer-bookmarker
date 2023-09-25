import { useState, useEffect } from 'react';
import useBookmarks from './hooks/useBookmarks';
import { checkIfValidUrl, getCurrentTab } from './utils';
import SignInForm from './components/SignInForm';
import { handleError } from './utils/errorHandler';
import BookmarkList from './components/BookmarkList';
import useAuthentication from './hooks/useAuthentication';
import { BookmarkType } from './types';
import Notification from './components/Notification';
import UserActions from './components/UserActions';

function App() {
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addBookmark, fetchBookmarks } = useBookmarks();
  const { user, handleSignOut } = useAuthentication();
  const [bookmarks, setBookmarks] = useState<BookmarkType[] | null>(null);

  const handleAddBookmarkClick = async () => {
    setIsLoading(true);

    const currentTab = await getCurrentTab();

    if (
      !currentTab?.url ||
      !checkIfValidUrl(currentTab.url) ||
      !currentTab.title
    ) {
      console.error('Invalid URL or title!');
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
            isLoading={isLoading}
          />

          <BookmarkList bookmarks={bookmarks ?? []} />
        </>
      )}
    </main>
  );
}

export default App;

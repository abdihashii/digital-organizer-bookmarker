import { useState } from 'react';
import useBookmarks from './hooks/useBookmarks';
import { checkIfValidUrl } from './utils';

function App() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { addBookmark } = useBookmarks();

  const handleAddBookmark = () => {
    if (!chrome || !chrome.tabs) {
      return;
    }

    let url = '',
      title = '';

    // get the current tab url
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const currentTab = tabs[0];

      if (!currentTab) {
        console.error('No current tab found!');

        return;
      }

      if (!currentTab.url || !currentTab.title) {
        console.error('The url or title is invalid!');

        return;
      }

      url = currentTab.url;

      // check if the url is valid
      if (!url || !checkIfValidUrl(url)) {
        console.error('The url is invalid!');

        return;
      }

      title = currentTab.title;

      alert(`url: ${url}\ntitle: ${title}`);

      if (!url || !title) {
        console.error(
          'The url or title is invalid! (outside of chrome.tabs.query)'
        );
        return;
      }

      // add the bookmark to the database
      const bookmarks = await addBookmark(url, title);

      alert(`All Bookmarks: ${JSON.stringify(bookmarks)}`);

      setIsSuccessful(true);

      // wait a couple seconds and then reset the state
      setTimeout(() => {
        setIsSuccessful(false);
      }, 2000);
    });
  };

  return (
    <main className="rounded-md gap-8 py-8 m-8 flex flex-col w-96 items-center border border-white">
      {!isSuccessful ? (
        <>
          <h1 className="text-2xl font-bold text-center">
            Digital Bookmarking Tool
          </h1>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddBookmark}
            >
              Add Bookmark
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You've successfully added a bookmark!</p>
        </>
      )}
    </main>
  );
}

export default App;

// Wait for popup.html to fully load
document.addEventListener('DOMContentLoaded', function () {
  // Inject the supabase cdn script to head
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(script);

  const bookmarkBtn = document.getElementById('bookmarkBtn');
  const bookmarksList = document.getElementById('bookmarksList');

  function displayBookmarks() {
    chrome.storage.local.get('bookmarks', function (result) {
      const bookmarks = result.bookmarks || [];
      bookmarksList.innerHTML = ''; // clear the previous list

      if (bookmarks.length === 0) {
        bookmarksList.innerHTML = "<p>You don't have any bookmarks yet!</p>";
        return;
      }

      for (const bookmark of bookmarks) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', bookmark);
        link.innerText = bookmark;
        link.target = '_blank';

        listItem.appendChild(link);
        bookmarksList.appendChild(listItem);
      }
    });
  }

  bookmarkBtn.addEventListener('click', function () {
    // queries the currently active tab in the current window once clicked
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        const currentTab = tabs[0];

        chrome.storage.local.get('bookmarks', function (result) {
          const bookmarks = result.bookmarks || [];

          // Check if the URL is already bookmarked
          if (!bookmarks.includes(currentTab.url)) {
            bookmarks.push(currentTab.url);
            chrome.storage.local.set({ bookmarks }, function () {
              bookmarkBtn.innerText = 'Bookmarked!';

              // Display bookmarks
              displayBookmarks();
            });
          } else {
            bookmarkBtn.innerText = 'Already bookmarked!';
          }
        });
      }
    );
  });

  // Display bookmarks when popup.html is loaded
  displayBookmarks();
});

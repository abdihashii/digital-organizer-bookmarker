import { BookmarkType } from '../types';

const BookmarkList = ({ bookmarks }: { bookmarks: BookmarkType[] }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-center">Your Bookmarks</h2>
      {bookmarks.length > 0 ? (
        <ul className="mt-4">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.uuid}>
              <a
                href={bookmark.url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {bookmark.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">No bookmarks found!</p>
      )}
    </div>
  );
};

export default BookmarkList;

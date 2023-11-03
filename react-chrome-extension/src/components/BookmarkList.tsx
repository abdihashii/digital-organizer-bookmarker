import { BookmarkType } from '../types';

const BookmarkList = ({ bookmarks }: { bookmarks: BookmarkType[] }) => {
  return (
    <div className="w-full">
      {bookmarks.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-4">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.uuid}
              className="gap-1 flex flex-col border-2 border-gray-500 hover:border-gray-600 rounded-md"
            >
              <a
                href={bookmark.url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group p-3"
              >
                <p className="text-lg font-semibold line-clamp-1">
                  {bookmark.title}
                </p>
                <p className="text-sm text-blue-500 group-hover:text-blue-600 line-clamp-1">
                  {bookmark.url}
                </p>
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

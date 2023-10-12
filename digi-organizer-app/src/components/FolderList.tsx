'use client';

// import BookmarkCard from '@/components/BookmarkCard';
import BookmarkModal from '@/components/BookmarkModal';
import type { FolderType } from '@/types/BookmarkType';

const FolderList = ({ folders }: { folders: FolderType[] }) => {
  return (
    <>
      {/* Featured Bookmarks List */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Featured Folders
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* {folders
            .filter((folder) => folder.featured)
            .map((folder) => {
              return (
                <></>
                // <BookmarkCard
                //   bookmark={bookmark}
                //   key={bookmark.uuid}
                //   bookmarkModal={bookmarkModal}
                //   setBookmarkModal={setBookmarkModal}
                // />
              );
            })} */}
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* Rest of folders List */}
      <section className="flex w-full flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Folders
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* {folders
            .filter((folder) => !folder.featured)
            .map((folder) => {
              return (
                <></>
                // <BookmarkCard
                //   bookmark={bookmark}
                //   key={bookmark.uuid}
                //   bookmarkModal={bookmarkModal}
                //   setBookmarkModal={setBookmarkModal}
                // />
              );
            })} */}
        </div>
      </section>

      <pre>
        <code>{JSON.stringify(folders, null, 2)}</code>
      </pre>
    </>
  );
};

export default FolderList;

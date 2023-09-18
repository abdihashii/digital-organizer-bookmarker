'use client';

import { useState } from 'react';
import BookmarkCard from '@/components/BookmarkCard';
import BookmarkModal from '@/components/BookmarkModal';
import type { BookmarkType } from '@/types/BookmarkType';

const BookmarkList = ({ bookmarks }: { bookmarks: BookmarkType[] }) => {
  const [bookmarkModal, setBookmarkModal] = useState<{
    isOpen: boolean;
    bookmark: BookmarkType | null;
  }>({
    isOpen: false,
    bookmark: null,
  });

  return (
    <>
      {/* Featured Bookmarks List */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Featured Bookmarks</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks
            .filter((bookmark) => bookmark.featured)
            .map((bookmark) => {
              return (
                <BookmarkCard
                  bookmark={bookmark}
                  key={bookmark.uuid}
                  bookmarkModal={bookmarkModal}
                  setBookmarkModal={setBookmarkModal}
                />
              );
            })}
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* Rest of Bookmarks List */}
      <section className="flex w-full flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Bookmarks</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks
            .filter((bookmark) => !bookmark.featured)
            .map((bookmark) => {
              return (
                <BookmarkCard
                  bookmark={bookmark}
                  key={bookmark.uuid}
                  bookmarkModal={bookmarkModal}
                  setBookmarkModal={setBookmarkModal}
                />
              );
            })}
        </div>
      </section>

      {/* Bookmark Modal */}
      {bookmarkModal.isOpen && (
        <BookmarkModal
          bookmarkModal={bookmarkModal}
          setBookmarkModal={setBookmarkModal}
        />
      )}
    </>
  );
};

export default BookmarkList;

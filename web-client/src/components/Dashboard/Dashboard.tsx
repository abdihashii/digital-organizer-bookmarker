'use client';

import { BookmarkType } from '@/types/BookmarkType';
import { useEffect, useState } from 'react';
import SearchBookmarks from '@/components/Search/SearchBookmarks';
import BookmarkList from '@/components/Bookmarks/BookmarkList';
import { User } from '@supabase/supabase-js';

const BookmarksDashboard = ({
  user,
  bookmarks,
}: {
  user: User;
  bookmarks: BookmarkType[];
}) => {
  const [bookmarksList, setBookmarksList] = useState<BookmarkType[]>(bookmarks);

  // Check if the bookmarks have changed and update the state
  useEffect(() => {
    setBookmarksList(bookmarks);
  }, [bookmarks]);

  return (
    <article className="min-h-screen flex-1 overflow-y-auto bg-gray-100 p-4 dark:bg-slate-700 md:p-12 lg:w-9/12">
      <div className="flex flex-col gap-8 lg:w-10/12">
        <SearchBookmarks user={user} setBookmarksList={setBookmarksList} />

        <BookmarkList bookmarks={bookmarksList} />
      </div>
    </article>
  );
};

export default BookmarksDashboard;

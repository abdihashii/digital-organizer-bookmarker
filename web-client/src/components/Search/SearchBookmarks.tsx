'use client';

import { AnimatePresence } from 'framer-motion';
import AddBookmarkModal from '@/components/BookmarkModal/AddBookmarkModal';
import React, { useEffect, useState } from 'react';
import { BookmarkPlus } from 'lucide-react';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import ToolTip from '../Tooltip';
import { BookmarkType } from '@/types/BookmarkType';

const SearchBookmarks = ({
  user,
  setBookmarksList,
}: {
  user: User;
  setBookmarksList: (bookmarksList: BookmarkType[]) => void;
}) => {
  const supabase = createClientComponentClient();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const addBookmark = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const delayBounce = setTimeout(async () => {
      if (searchTerm.length > 0) {
        const { data, error } = await supabase
          .from('bookmarks')
          .select()
          .order('updated_at', { ascending: false })
          .textSearch('textsearchable_index_col', `'${searchTerm}':*`, {
            type: 'plain',
            config: 'english',
          });

        if (error) {
          console.error(error);
          return;
        }

        setBookmarksList(data);
      } else {
        const { data, error } = await supabase
          .from('bookmarks')
          .select()
          .order('updated_at', { ascending: false });

        if (error) {
          console.error(error);
          return;
        }

        setBookmarksList(data);
      }
    }, 300);

    return () => clearTimeout(delayBounce);
  }, [searchTerm, setBookmarksList, supabase]);

  const handleOnSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="flex w-full flex-row items-stretch">
      <input
        type="text"
        className="flex-grow appearance-none rounded-md rounded-br-none rounded-tr-none border border-gray-300 p-4 dark:bg-gray-800"
        style={{ width: 'calc(100% - 4rem)' }}
        placeholder="Search for a bookmark"
        autoFocus
        onChange={handleOnSearchTermChange}
      />
      <ToolTip
        triggerContent={
          <div
            className="group flex w-16 cursor-pointer items-center justify-center rounded-md rounded-bl-none rounded-tl-none border border-l-0 border-gray-300 bg-white dark:bg-gray-800"
            onClick={addBookmark}
          >
            <BookmarkPlus
              className="overflow-visible text-2xl text-gray-800 transition-colors duration-150 group-hover:text-gray-400 dark:text-white"
              aria-label="Add Bookmark"
            />
          </div>
        }
        side="bottom"
        sideOffset={4}
      >
        Add Bookmark
      </ToolTip>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && (
          <AddBookmarkModal
            user={user}
            handleClose={() => setShowModal(!showModal)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default SearchBookmarks;

'use client';

import { AnimatePresence } from 'framer-motion';
import AddBookmarkModal from '@/components/AddBookmarkModal';
import React, { useState } from 'react';
import { BookmarkPlus } from 'lucide-react';
import { User } from '@supabase/auth-helpers-nextjs';
import ToolTip from './Tooltip';

const SearchBookmarks = ({ user }: { user: User }) => {
  const [showModal, setShowModal] = useState(false);

  const addBookmark = () => {
    setShowModal(true);
  };

  return (
    <section className="flex w-full flex-row items-stretch">
      <input
        type="text"
        className="flex-grow appearance-none rounded-md rounded-br-none rounded-tr-none border border-gray-300 p-4 dark:bg-gray-800"
        style={{ width: 'calc(100% - 4rem)' }}
        placeholder="Search for a bookmark"
        autoFocus
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

'use client';

import { AnimatePresence } from 'framer-motion';
import AddBookmarkModal from '@/components/AddBookmarkModal';
import React, { useState } from 'react';
import { BookmarkPlus } from 'lucide-react';

const SearchBookmarks = () => {
  const [showModal, setShowModal] = useState(false);

  const addBookmark = () => {
    setShowModal(true);
  };

  return (
    <section className="flex w-full flex-row items-stretch">
      <input
        type="text"
        className="flex-grow appearance-none rounded-md rounded-br-none rounded-tr-none border border-gray-300 p-4"
        style={{ width: 'calc(100% - 4rem)' }}
        placeholder="Search for a bookmark"
        autoFocus
      />
      <div
        className="group flex w-16 cursor-pointer items-center justify-center rounded-md rounded-bl-none rounded-tl-none border border-l-0 border-gray-300 bg-white"
        onClick={addBookmark}
      >
        <BookmarkPlus
          className="overflow-visible text-2xl text-gray-800 transition-colors duration-150 group-hover:text-gray-400"
          aria-label="Add Bookmark"
        />
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && (
          <AddBookmarkModal handleClose={() => setShowModal(!showModal)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default SearchBookmarks;

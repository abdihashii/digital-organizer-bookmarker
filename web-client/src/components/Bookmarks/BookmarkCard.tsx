'use client';

import React from 'react';
import type { BookmarkType } from '@/types/BookmarkType';
import Image from 'next/image';

export const BookmarkCard = ({
  bookmark,
  bookmarkModal,
  setBookmarkModal,
}: {
  bookmark: BookmarkType;
  bookmarkModal: {
    isOpen: boolean;
    bookmark: BookmarkType | null;
  };
  setBookmarkModal: (bookmarkModal: {
    isOpen: boolean;
    bookmark: BookmarkType | null;
  }) => void;
}) => {
  return (
    <div
      className="flex w-full cursor-pointer flex-col gap-4 overflow-hidden rounded border border-black p-4 transition-shadow duration-200 hover:shadow-xl dark:border-gray-300"
      onClick={() =>
        setBookmarkModal({
          isOpen: !bookmarkModal.isOpen,
          bookmark: bookmark,
        })
      }
    >
      {/* TITLE */}
      <h3 className="h-20 line-clamp-3 text-xl font-bold text-gray-800 dark:text-white">
        {bookmark.title}
      </h3>

      {/* IMAGE */}
      <div className="relative h-36 xl:h-48">
        <Image
          src={
            bookmark.imgsrc ||
            'https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80'
          }
          alt={bookmark.title || ''}
          fill={true}
          className="rounded-md object-contain"
        ></Image>
      </div>

      {/* URL */}
      <p className="truncate text-sm text-gray-500 dark:text-gray-300">
        {bookmark.url}
      </p>

      {/* TAGS */}
      {bookmark.tags && (
        <div className="flex flex-row gap-2 overflow-x-auto">
          {bookmark.tags.map((tag, index) => (
            <span
              key={`${tag}-${bookmark.url}-${index}`}
              className="whitespace-nowrap rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;

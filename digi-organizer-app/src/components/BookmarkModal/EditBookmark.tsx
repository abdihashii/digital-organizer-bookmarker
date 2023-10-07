'use client';

import React, { useState } from 'react';
import { BookmarkType } from '@/types/BookmarkType';
import Image from 'next/image';
import { cleanUpImgSrc } from '@/lib/utils';
import Link from 'next/link';
// import { generateScreenshot } from '@/lib/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Edit({
  bookmarkModal,
  setBookmarkModal,
  setEditMode,
}: {
  bookmarkModal: {
    isOpen: boolean;
    bookmark: BookmarkType | null;
  };
  setBookmarkModal: (bookmarkModal: {
    isOpen: boolean;
    bookmark: BookmarkType | null;
  }) => void;
  setEditMode: (editMode: boolean) => void;
}) {
  const supabase = createClientComponentClient();
  const [editedBookmark, setEditedBookmark] = useState(bookmarkModal.bookmark);

  // Grab the current bookmark from the bookmarkModalAtom
  const { bookmark } = bookmarkModal;

  const saveUpdatedBookmark = async (bookmark: {
    uuid: string;
    title: string;
    url: string;
    featured: boolean;
    tags?: Array<string>;
  }) => {
    const bookmarkWithUpdatedTimestamp = {
      ...bookmark,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('bookmarks')
      .update(bookmarkWithUpdatedTimestamp)
      .eq('uuid', bookmarkWithUpdatedTimestamp.uuid);

    // TODO: Handle error state
    if (error) {
      console.error(error);
      return;
    }
  };

  /**
   * Handle the save bookmark event
   */
  const handleSaveBookmark = async () => {
    await saveUpdatedBookmark(
      editedBookmark as {
        uuid: string;
        title: string;
        url: string;
        featured: boolean;
        tags?: Array<string>;
      }
    );

    // Set the bookmark modal bookmark property so that the view component can render the updated bookmark values
    setBookmarkModal({
      ...bookmarkModal,
      bookmark: editedBookmark,
    });

    // Reset the edited bookmark
    setEditedBookmark(null);

    // Go back to the view mode
    setEditMode(false);
  };

  /**
   * Handle the change event for the bookmark input fields
   * @param e - The event object
   */
  const handleBookmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBookmark((prevBookmark) => {
      if (prevBookmark) {
        return {
          ...prevBookmark,
          [e.target.name]: e.target.value,
        };
      }
      return null;
    });
  };

  return (
    <>
      {bookmark ? (
        <div className="flex h-full w-full flex-col gap-4">
          <Link
            href={bookmark.url as string}
            target="_blank"
            className="h-full w-full border border-white transition-all duration-300 hover:border hover:border-gray-300 hover:opacity-60"
          >
            <Image
              src={
                cleanUpImgSrc(editedBookmark?.imgsrc as string) ||
                'https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80'
              }
              alt="YouTube Screenshot"
              width={1920}
              height={1080}
            />
          </Link>

          {/* <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-blue-700"
            onClick={() => handleGenerateScreenshot(bookmark.url as string)}
          >
            Generate Screenshot
          </button> */}

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-gray-800 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-4"
              placeholder="Title"
              value={editedBookmark?.title || ''}
              onChange={handleBookmarkChange}
              name="title"
              id="title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="url" className="text-gray-800 dark:text-gray-300">
              URL
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-4"
              placeholder="URL"
              value={editedBookmark?.url || ''}
              onChange={handleBookmarkChange}
              name="url"
              id="url"
            />
          </div>

          {bookmark.tags && (
            <div className="flex flex-row gap-2 overflow-x-auto">
              {bookmark.tags?.map((tag, index) => (
                <span
                  key={`${tag}-${bookmark?.url}-${index}`}
                  className="whitespace-nowrap rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex w-full gap-4">
            <>
              <button
                className="w-10/12 rounded bg-green-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-green-700"
                onClick={handleSaveBookmark}
              >
                Save
              </button>

              <button
                className="w-2/12 rounded bg-yellow-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-yellow-700"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          </div>
        </div>
      ) : (
        <div>Bookmark not found</div>
      )}
    </>
  );
}

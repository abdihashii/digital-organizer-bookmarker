'use client';

import Modal from '@/components/Modal';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import React, { useState } from 'react';
import ToolTip from '@/components/Tooltip';
import { useRouter } from 'next/navigation';
import type { NewBookmarkType } from '@/types/BookmarkType';
import { XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AddBookmarkModal = ({
  user,
  handleClose,
}: {
  user: User;
  handleClose: () => void;
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [generatingTags, setGeneratingTags] = useState<boolean>(false);
  const [newBookmark, setNewBookmark] = useState<NewBookmarkType>({
    title: '',
    url: '',
    featured: false,
    tags: [],
    user_id: '',
  });

  const handleGenerateTags = async () => {
    // reset tags to empty array
    setNewBookmark({ ...newBookmark, tags: [] });

    setGeneratingTags(true);

    const res = await fetch(
      `http://localhost:3000/api/tagifier?url=${newBookmark.url}`
    );

    const { error, themes, specifics } = await res.json();

    if (error) {
      alert(error.message);
      return;
    }

    setGeneratingTags(false);

    const tags = [...themes, ...specifics];

    setNewBookmark({ ...newBookmark, tags });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    newBookmark['user_id'] = user.id;

    const { error } = await supabase.from('bookmarks').insert([newBookmark]);

    if (error) {
      alert(error.message);
      return;
    }

    setNewBookmark({
      title: '',
      url: '',
      featured: false,
      tags: [],
      user_id: '',
    });

    handleClose();

    router.refresh(); // refresh the page to show the newly added bookmark
  };

  return (
    <Modal title="Add Bookmark" handleClose={handleClose}>
      <form className="flex w-full flex-col gap-6" onSubmit={handleFormSubmit}>
        {/* Title */}
        <section className="flex flex-col gap-2">
          <label
            htmlFor="bookmarkTitle"
            className="text-gray-800 dark:text-gray-300"
          >
            Bookmark Title
          </label>
          <input
            required
            type="text"
            className="rounded-md border border-gray-300 p-4"
            placeholder="Title"
            id="bookmarkTitle"
            autoFocus
            value={newBookmark.title as string}
            onChange={(e) =>
              setNewBookmark({ ...newBookmark, title: e.target.value })
            }
          />
        </section>

        {/* URL */}
        <section className="flex flex-col gap-2">
          <label
            htmlFor="bookmarkURL"
            className="text-gray-800 dark:text-gray-300"
          >
            Bookmark URL
          </label>
          <input
            required
            type="text"
            className="rounded-md border border-gray-300 p-4"
            placeholder="URL"
            id="bookmarkURL"
            value={newBookmark.url as string}
            onChange={(e) =>
              setNewBookmark({ ...newBookmark, url: e.target.value })
            }
          />
        </section>

        {/* Feature Bookmark */}
        <section className="flex flex-row gap-2">
          <label
            htmlFor="featureBookmark"
            className="text-gray-800 dark:text-gray-300"
          >
            Feature this tag?
          </label>
          <input
            type="checkbox"
            className="rounded-md border border-gray-300 p-4"
            id="featureBookmark"
            checked={newBookmark.featured as boolean}
            onChange={(e) =>
              setNewBookmark({ ...newBookmark, featured: e.target.checked })
            }
          />
        </section>

        {/* Tags */}
        <section className="flex flex-col gap-2">
          {newBookmark.tags && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="bookmarkTags"
                className="text-gray-800 dark:text-gray-300"
              >
                Tags:
              </label>

              {/* Generating tags loading skeleton */}
              {generatingTags && (
                <div className="flex flex-row flex-wrap gap-2">
                  <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
                  <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
                  <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
                  <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
                  <Skeleton className="whitespace-nowrap rounded-md border bg-gray-200 px-6 py-3 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500" />
                </div>
              )}

              <div className="flex flex-row flex-wrap gap-2">
                {newBookmark.tags.map((tag, i) => (
                  <div
                    key={`${tag}-${newBookmark.url}-${i}`}
                    className="group relative"
                  >
                    <span className="whitespace-nowrap rounded-md border bg-gray-200 px-2 py-1 text-xs text-gray-700 group-hover:cursor-default dark:bg-gray-700 dark:text-white dark:group-hover:border-gray-500">
                      {tag}
                    </span>
                    {/* delete circle button */}
                    <XCircle
                      className="invisible absolute -right-2.5 -top-2.5 cursor-pointer text-gray-700 group-hover:visible"
                      size={24}
                      onClick={() => {
                        const tags = newBookmark.tags?.filter(
                          (t) => t !== tag
                        ) as string[];

                        setNewBookmark({ ...newBookmark, tags });
                      }}
                      fill="white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Generate Tags button */}
        <ToolTip
          triggerContent={
            <button
              type="button"
              className={`rounded-md bg-orange-500 p-4 text-white
            ${newBookmark.url === '' ? 'cursor-not-allowed opacity-50' : ''}
          `}
              disabled={newBookmark.url === ''}
              onClick={handleGenerateTags}
            >
              Generate Tags
            </button>
          }
          side="top"
          sideOffset={4}
        >
          Make sure to add a URL first!
        </ToolTip>

        <button type="submit" className="rounded-md bg-blue-500 p-4 text-white">
          Add Bookmark
        </button>
      </form>
    </Modal>
  );
};

export default AddBookmarkModal;

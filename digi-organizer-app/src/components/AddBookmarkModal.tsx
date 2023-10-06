'use client';

import Modal from '@/components/Modal';
import {
  User,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import React, { useState } from 'react';
import ToolTip from './Tooltip';
import { useRouter } from 'next/navigation';

const AddBookmarkModal = ({
  user,
  handleClose,
}: {
  user: User;
  handleClose: () => void;
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    url: '',
    featured: false,
    // tags: [],
    user_id: '',
  });

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
      // tags: [],
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
            value={newBookmark.title}
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
            value={newBookmark.url}
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
            checked={newBookmark.featured}
            onChange={(e) =>
              setNewBookmark({ ...newBookmark, featured: e.target.checked })
            }
          />
        </section>

        {/* Generate Tags button */}
        <ToolTip
          triggerContent={
            <button
              className={`rounded-md bg-orange-500 p-4 text-white
            ${newBookmark.url === '' ? 'cursor-not-allowed opacity-50' : ''}
          `}
              disabled={newBookmark.url === ''}
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

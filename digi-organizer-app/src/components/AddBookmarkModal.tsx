'use client';

import Modal from '@/components/Modal';
import React, { useState } from 'react';

const AddBookmarkModal = ({ handleClose }: { handleClose: () => void }) => {
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    url: '',
    featured: false,
    // tags: [],
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // await addBookmark(newBookmark)

    setNewBookmark({
      title: '',
      url: '',
      featured: false,
      // tags: [],
    });

    handleClose();
  };

  return (
    <Modal title="Add Bookmark" handleClose={handleClose}>
      <form className="flex w-full flex-col gap-6" onSubmit={handleFormSubmit}>
        <section className="flex flex-col gap-2">
          <label htmlFor="bookmarkTitle" className="text-gray-800">
            Bookmark Title
          </label>
          <input
            required
            type="text"
            className="rounded-md border border-gray-300 p-4"
            placeholder="Title"
            id="bookmarkTitle"
            autoFocus
          />
        </section>
      </form>
    </Modal>
  );
};

export default AddBookmarkModal;

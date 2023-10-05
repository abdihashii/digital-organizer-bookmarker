'use client';

import Modal from '@/components/Modal';
import { BookmarkType } from '@/types/BookmarkType';
import ViewBookmark from '@/components/BookmarkModal/ViewBookmark';
import EditBookmark from '@/components/BookmarkModal/EditBookmark';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const BookmarkModal = ({
  bookmarkModal,
  setBookmarkModal,
}: {
  bookmarkModal: {
    isOpen: boolean;
    bookmark: BookmarkType | null;
  };
  setBookmarkModal: (bookmarkModal: {
    isOpen: boolean;
    bookmark: BookmarkType | null;
  }) => void;
}) => {
  const supabase = createClientComponentClient();

  const [editMode, setEditMode] = useState(false);

  const deleteBookmark = async (bookmark: BookmarkType) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('uuid', bookmark.uuid);

    if (error) {
      console.error(error);
      return;
    }
  };

  const handleDeleteBookmark = async () => {
    if (!bookmarkModal.bookmark) return;

    await deleteBookmark(bookmarkModal.bookmark);

    setBookmarkModal({
      isOpen: false,
      bookmark: null,
    });
  };

  return (
    <Modal
      title={bookmarkModal.bookmark?.title || ''}
      handleClose={() => {
        setBookmarkModal({
          isOpen: false,
          bookmark: null,
        });
      }}
    >
      {editMode ? (
        <EditBookmark
          bookmarkModal={bookmarkModal}
          setBookmarkModal={setBookmarkModal}
          setEditMode={setEditMode}
        />
      ) : (
        <ViewBookmark
          bookmark={bookmarkModal.bookmark}
          setEditMode={setEditMode}
          handleDeleteBookmark={handleDeleteBookmark}
        />
      )}
    </Modal>
  );
};

export default BookmarkModal;

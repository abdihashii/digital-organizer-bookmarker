import Modal from '@/components/modal';
import { BookmarkType } from '@/types/BookmarkType';
import ViewBookmark from '@/components/BookmarkModal/ViewBookmark';

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
      <ViewBookmark
        bookmark={bookmarkModal.bookmark}
        // setEditMode={setEditMode}
        // deleteBookmarkWarning={deleteBookmarkWarning}
        // setDeleteBookmarkWarning={setDeleteBookmarkWarning}
        // handleDeleteBookmark={handleDeleteBookmark}
      />
    </Modal>
  );
};

export default BookmarkModal;

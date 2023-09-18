import Modal from '@/components/modal';
import { BookmarkType } from '@/types/BookmarkType';

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
      <p>
        {bookmarkModal.bookmark?.title} - {bookmarkModal.bookmark?.url}
      </p>
    </Modal>
  );
};

export default BookmarkModal;

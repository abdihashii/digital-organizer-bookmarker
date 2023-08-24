import React, { useState } from 'react';
import { BookmarkType } from '@/app/types';
import Modal from '../modal';
import Edit from './edit';
import View from './view';
import { useBookmarks } from '@/app/hooks/useBookmarks';

export default function BookmarkModal({
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
}) {
	const [editMode, setEditMode] = useState(false);
	const { deleteBookmark } = useBookmarks();
	const [deleteBookmarkWarning, setDeleteBookmarkWarning] = useState(false);

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
				<Edit
					bookmarkModal={bookmarkModal}
					setBookmarkModal={setBookmarkModal}
					setEditMode={setEditMode}
					deleteBookmarkWarning={deleteBookmarkWarning}
					setDeleteBookmarkWarning={setDeleteBookmarkWarning}
					handleDeleteBookmark={handleDeleteBookmark}
				/>
			) : (
				<View
					bookmark={bookmarkModal.bookmark}
					setEditMode={setEditMode}
					deleteBookmarkWarning={deleteBookmarkWarning}
					setDeleteBookmarkWarning={setDeleteBookmarkWarning}
					handleDeleteBookmark={handleDeleteBookmark}
				/>
			)}
		</Modal>
	);
}

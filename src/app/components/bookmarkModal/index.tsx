import React, { useState } from 'react';
import { BookmarkType } from '@/app/types';
import Modal from '../modal';
import { bookmarksAtom } from '@/app/store';
import { useAtom } from 'jotai';
import Edit from './edit';
import View from './view';

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
	const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

	const [deleteBookmarkWarning, setDeleteBookmarkWarning] = useState(false);

	const handleDeleteBookmark = () => {
		const updatedBookmarks = bookmarks.filter(
			(bookmark) => bookmark.url !== bookmarkModal.bookmark?.url,
		);

		setBookmarks(updatedBookmarks);

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
					setBookmarkModal={setBookmarkModal}
					setEditMode={setEditMode}
					deleteBookmarkWarning={deleteBookmarkWarning}
					setDeleteBookmarkWarning={setDeleteBookmarkWarning}
					handleDeleteBookmark={handleDeleteBookmark}
				/>
			)}
		</Modal>
	);
}

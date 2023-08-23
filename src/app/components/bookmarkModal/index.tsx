import React, { useState } from 'react';
import { BookmarkType } from '@/app/types';
import Modal from '../modal';
import { bookmarksAtom } from '@/app/store';
import { useAtom } from 'jotai';
import Edit from './edit';
import View from './view';
import { supabase } from '@/app/utils/supabaseClient';

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
	const [, setBookmarks] = useAtom(bookmarksAtom);

	const [deleteBookmarkWarning, setDeleteBookmarkWarning] = useState(false);

	const handleDeleteBookmark = async () => {
		const { error } = await supabase
			.from('bookmarks')
			.delete()
			.eq('uuid', bookmarkModal.bookmark?.uuid);

		if (error) {
			console.log(error);
			return;
		}

		// Fetch bookmarks again to update the list
		const { data, error: fetchError } = await supabase
			.from('bookmarks')
			.select();

		if (fetchError) {
			console.log(fetchError);
			return;
		}

		setBookmarks(data);

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

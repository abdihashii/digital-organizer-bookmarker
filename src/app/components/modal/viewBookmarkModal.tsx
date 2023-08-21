import React from 'react';
import { BookmarkType } from '@/app/types';
import Modal from './';
import Image from 'next/image';

export default function ViewBookmarkModal({
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
			<div className="h-full w-full bg-gray-500">
				<Image
					src={
						bookmarkModal.bookmark?.imgSrc ||
						'https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80'
					}
					alt="YouTube Screenshot"
					width={1920}
					height={1080}
				/>

				{bookmarkModal.bookmark?.title}
			</div>
		</Modal>
	);
}

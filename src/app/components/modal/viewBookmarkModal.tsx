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
			<div className="flex h-full w-full flex-col gap-4">
				<Image
					src={
						bookmarkModal.bookmark?.imgSrc ||
						'https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80'
					}
					alt="YouTube Screenshot"
					width={1920}
					height={1080}
				/>

				<a
					href={bookmarkModal.bookmark?.url}
					target="_blank"
					className="block w-fit text-sm text-gray-500 hover:underline"
				>
					{bookmarkModal.bookmark?.url}
				</a>

				<div>
					{bookmarkModal.bookmark?.tags?.map((tag, index) => (
						<span
							key={`${tag}-${bookmarkModal.bookmark?.url}-${index}`}
							className="whitespace-nowrap rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
						>
							{tag}
						</span>
					))}
				</div>

				<button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
					Edit Bookmark
				</button>
			</div>
		</Modal>
	);
}

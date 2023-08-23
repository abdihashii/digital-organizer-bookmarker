import React from 'react';
import { BookmarkType } from '@/app/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { bookmarksAtom, editedBookmarkAtom } from '@/app/store';
import { useAtom } from 'jotai';

export default function View({
	bookmark,
	setBookmarkModal,
	setEditMode,
	deleteBookmarkWarning,
	setDeleteBookmarkWarning,
	handleDeleteBookmark,
}: {
	bookmark: BookmarkType | null;
	setBookmarkModal: (bookmarkModal: {
		isOpen: boolean;
		bookmark: BookmarkType | null;
	}) => void;
	setEditMode: (editMode: boolean) => void;
	deleteBookmarkWarning: boolean;
	setDeleteBookmarkWarning: (deleteBookmarkWarning: boolean) => void;
	handleDeleteBookmark: () => void;
}) {
	const [editedBookmark] = useAtom(editedBookmarkAtom);

	return (
		<>
			{bookmark ? (
				<div className="flex h-full w-full flex-col gap-4">
					<Image
						src={
							bookmark.imgSrc ||
							'https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80'
						}
						alt="YouTube Screenshot"
						width={1920}
						height={1080}
					/>

					<a
						href={bookmark.url}
						target="_blank"
						className="block w-fit text-sm text-gray-500 hover:underline"
					>
						{bookmark.url}
					</a>

					{bookmark.tags && (
						<div className="flex flex-row gap-2 overflow-x-auto">
							{bookmark.tags?.map((tag, index) => (
								<span
									key={`${tag}-${bookmark?.url}-${index}`}
									className="whitespace-nowrap rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
								>
									{tag}
								</span>
							))}
						</div>
					)}

					<div className="flex w-full gap-4">
						{deleteBookmarkWarning ? (
							<>
								<motion.button
									animate={{
										scale: [1, 1, 1, 1],
										rotate: [0, 4, -4, 0],
									}}
									transition={{
										duration: 0.35,
									}}
									className="w-10/12 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
									onClick={handleDeleteBookmark}
								>
									Confirm Delete
								</motion.button>

								<button
									className="w-2/12 rounded bg-gray-400 px-4 py-2 font-bold text-white hover:bg-gray-600"
									onClick={() => setDeleteBookmarkWarning(false)}
								>
									Cancel
								</button>
							</>
						) : (
							<>
								<button
									className="w-10/12 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
									onClick={() => setEditMode(true)}
								>
									Edit
								</button>

								<button
									className="w-2/12 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
									onClick={() => setDeleteBookmarkWarning(true)}
								>
									Delete
								</button>
							</>
						)}
					</div>

					<pre>
						Bookmark from Modal
						<code>{JSON.stringify(bookmark, null, 2)}</code>
					</pre>

					<pre>
						Edited Bookmark
						<code>{JSON.stringify(editedBookmark, null, 2)}</code>
					</pre>
				</div>
			) : (
				<div>Bookmark not found</div>
			)}
		</>
	);
}

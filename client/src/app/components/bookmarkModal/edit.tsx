import React, { useState } from 'react';
import { BookmarkType } from '@/app/types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { bookmarksAtom } from '@/app/store';
import { useAtom } from 'jotai';
import { useBookmarks } from '@/app/hooks/useBookmarks';
import { cleanUpImgSrc } from '@/app/utils';

export default function Edit({
	bookmarkModal,
	setBookmarkModal,
	setEditMode,
	deleteBookmarkWarning,
	setDeleteBookmarkWarning,
	handleDeleteBookmark,
}: {
	bookmarkModal: {
		isOpen: boolean;
		bookmark: BookmarkType | null;
	};
	setBookmarkModal: (bookmarkModal: {
		isOpen: boolean;
		bookmark: BookmarkType | null;
	}) => void;
	setEditMode: (editMode: boolean) => void;
	deleteBookmarkWarning: boolean;
	setDeleteBookmarkWarning: (deleteBookmarkWarning: boolean) => void;
	handleDeleteBookmark: () => void;
}) {
	const [editedBookmark, setEditedBookmark] = useState(bookmarkModal.bookmark);
	const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
	const { saveUpdatedBookmark } = useBookmarks();

	// Grab the current bookmark from the bookmarkModalAtom
	const { bookmark } = bookmarkModal;

	/**
	 * Handle the save bookmark event
	 */
	const handleSaveBookmark = async () => {
		await saveUpdatedBookmark(
			editedBookmark as {
				uuid: string;
				title: string;
				url: string;
				featured: boolean;
				tags?: Array<string>;
			},
		);

		// Set the bookmark modal bookmark property so that the view component can render the updated bookmark values
		setBookmarkModal({
			...bookmarkModal,
			bookmark: editedBookmark,
		});

		// Reset the edited bookmark
		setEditedBookmark(null);

		// Go back to the view mode
		setEditMode(false);
	};

	/**
	 * Handle the change event for the bookmark input fields
	 * @param e - The event object
	 */
	const handleBookmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedBookmark((prevBookmark) => {
			if (prevBookmark) {
				return {
					...prevBookmark,
					[e.target.name]: e.target.value,
				};
			}
			return null;
		});
	};

	/**
	 * Handle the generate screenshot on click event
	 * @param url - The url to generate the screenshot for
	 */
	const handleGenerateScreenshot = async (url: string) => {
		const encodedUrl = encodeURIComponent(url);

		try {
			const resp = await fetch(`/api/get-screenshot?url=${encodedUrl}`);
			const data = await resp.json();

			const { secure_url } = data;

			console.log(secure_url);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{bookmark ? (
				<div className="flex h-full w-full flex-col gap-4">
					<Image
						src={
							cleanUpImgSrc(bookmark.imgsrc as string) ||
							'https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80'
						}
						alt="YouTube Screenshot"
						width={1920}
						height={1080}
					/>

					<button
						onClick={() => handleGenerateScreenshot(bookmark.url as string)}
					>
						Generate Screenshot
					</button>

					<div className="flex flex-col gap-2">
						<label
							htmlFor="title"
							className="text-gray-800"
						>
							Title
						</label>
						<input
							type="text"
							className="w-full rounded-md border border-gray-300 p-4"
							placeholder="Title"
							value={editedBookmark?.title || ''}
							onChange={handleBookmarkChange}
							name="title"
							id="title"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							htmlFor="url"
							className="text-gray-800"
						>
							URL
						</label>
						<input
							type="text"
							className="w-full rounded-md border border-gray-300 p-4"
							placeholder="URL"
							value={editedBookmark?.url || ''}
							onChange={handleBookmarkChange}
							name="url"
							id="url"
						/>
					</div>

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
									className="w-10/12 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
									onClick={handleSaveBookmark}
								>
									Save
								</button>

								<button
									className="w-2/12 rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
									onClick={() => setEditMode(false)}
								>
									Cancel
								</button>
							</>
						)}
					</div>
				</div>
			) : (
				<div>Bookmark not found</div>
			)}
		</>
	);
}

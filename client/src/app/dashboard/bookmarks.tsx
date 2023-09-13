'use client';

import { useState } from 'react';
import { useBookmarks } from '@/app/hooks/useBookmarks';
import type { BookmarkType } from '@/app/types';
import Bookmark from '@/app/components/bookmark';
import BookmarkModal from '@/app/components/bookmarkModal';

export default function Bookmarks() {
	// Fetch bookmarks from supabase and filter them using our custom hook
	const { featuredBookmarks, restOfBookmarks } = useBookmarks();

	const [bookmarkModal, setBookmarkModal] = useState<{
		isOpen: boolean;
		bookmark: BookmarkType | null;
	}>({
		isOpen: false,
		bookmark: null,
	});

	return (
		<>
			{/* Featured Bookmarks List */}
			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-bold text-gray-800">Featured Bookmarks</h2>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{featuredBookmarks.map((bookmark) => (
						<Bookmark
							key={bookmark.uuid}
							bookmark={bookmark}
							bookmarkModal={bookmarkModal}
							setBookmarkModal={setBookmarkModal}
						/>
					))}
				</div>
			</section>

			<hr className="border-gray-400" />

			{/* Rest of Bookmarks List */}
			<section className="flex w-full flex-col gap-4">
				<h2 className="text-2xl font-bold text-gray-800">Bookmarks</h2>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{restOfBookmarks.map((bookmark) => (
						<Bookmark
							key={bookmark.uuid}
							bookmark={bookmark}
							bookmarkModal={bookmarkModal}
							setBookmarkModal={setBookmarkModal}
						/>
					))}
				</div>
			</section>

			{/* Bookmark Modal */}
			{bookmarkModal.isOpen && (
				<BookmarkModal
					bookmarkModal={bookmarkModal}
					setBookmarkModal={setBookmarkModal}
				/>
			)}
		</>
	);
}

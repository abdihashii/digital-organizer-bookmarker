'use client';

import React, { useState } from 'react';
import SearchBookmarks from '../components/searchBookmarks';
import Bookmark from '../components/bookmark';
import { BookmarkType } from '@/app/types';
import BookmarkModal from '@/app/components/bookmarkModal';
import { useBookmarks } from '@/app/hooks/useBookmarks';
import LeftSideNav from '@/app/components/nav';

export default function Dashboard() {
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
		<main className="">
			{/* left side navigation */}
			<LeftSideNav />

			{/* right side main content */}
			<section
				className="ml-32 min-h-screen bg-gray-100 p-12"
				style={{ width: 'calc(100% - 8rem)' }}
			>
				<div className="flex w-full flex-col gap-8">
					<SearchBookmarks />

					<div className="flex flex-col gap-4">
						<h2 className="text-2xl font-bold text-gray-800">
							Featured Bookmarks
						</h2>

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
					</div>

					<hr className="border-gray-400" />

					<div className="flex w-full flex-col gap-4">
						<h2 className="text-2xl font-bold text-gray-800">
							Rest of Bookmarks
						</h2>

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
					</div>

					{bookmarkModal.isOpen && (
						<BookmarkModal
							bookmarkModal={bookmarkModal}
							setBookmarkModal={setBookmarkModal}
						/>
					)}
				</div>
			</section>
		</main>
	);
}

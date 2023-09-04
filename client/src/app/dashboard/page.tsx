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
		<main className="flex h-screen flex-col md:flex-row">
			{/* left side navigation - hidden on small screens */}
			<div className="hidden md:block">
				<LeftSideNav />
			</div>

			{/* right side main content */}
			<article className="min-h-screen flex-1 overflow-y-auto bg-gray-100 p-4 md:p-12 lg:w-9/12">
				<div className="flex flex-col gap-8 lg:w-10/12">
					<SearchBookmarks />

					{/* Featured Bookmarks List */}
					<section className="flex flex-col gap-4">
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
				</div>
			</article>
		</main>
	);
}

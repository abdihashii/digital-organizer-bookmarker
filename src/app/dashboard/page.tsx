'use client';

import React from 'react';
import {
	MdOutlineFolderCopy,
	MdLogout,
	MdSpaceDashboard,
	MdPerson,
	MdSettings,
	MdLockPerson,
} from 'react-icons/md';
import Link from 'next/link';
import SearchBookmarks from '../components/search';
import { bookmarksAtom } from '../store';
import { useAtom } from 'jotai';
import Bookmark from '../components/bookmark';

export default function Dashboard() {
	const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

	const featuredBookmarks = bookmarks.filter((bookmark) => bookmark.featured);
	const recentBookmarks = bookmarks.filter((bookmark) => !bookmark.featured);

	return (
		<main className="">
			{/* left side navigation */}
			<nav className="fixed flex h-full w-32 flex-col items-center gap-8 overflow-y-auto bg-gray-800 px-6 py-8">
				<Link href="/dashboard">
					<MdSpaceDashboard
						className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
						aria-label="Dashboard"
					/>
				</Link>

				<MdOutlineFolderCopy
					className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
					aria-label="Folders"
				/>

				<MdLockPerson
					className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
					aria-label="Private Bookmarks"
				/>

				<MdSettings
					className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
					aria-label="Settings"
				/>

				{/* Flex items that should be at the bottom of the nav */}
				<div
					className="absolute bottom-0 left-0 
          right-0 flex flex-row items-center justify-center gap-4 px-6 py-8
        "
				>
					<MdPerson
						className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
						aria-label="Profile"
					/>
					<MdLogout
						className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
						aria-label="Log out"
					/>
				</div>
			</nav>

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

						<div className="grid grid-cols-3 gap-4">
							{featuredBookmarks.map((bookmark) => (
								<Bookmark
									key={bookmark.id}
									bookmark={bookmark}
								/>
							))}
						</div>
					</div>

					<div className="flex w-full flex-col gap-4">
						<h2 className="text-2xl font-bold text-gray-800">
							Recent Bookmarks
						</h2>

						<div className="grid grid-cols-3 gap-4">
							{recentBookmarks.map((bookmark) => (
								<Bookmark
									key={bookmark.id}
									bookmark={bookmark}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

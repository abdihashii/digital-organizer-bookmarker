import React from 'react';
import {
	MdOutlineFolderCopy,
	MdLogout,
	MdSpaceDashboard,
	MdPerson,
	MdSettings,
	MdLockPerson,
	MdBookmarkAdd,
} from 'react-icons/md';
import Link from 'next/link';

type BookmarkType = {
	id: number;
	title: string;
	url: string;
	featured?: boolean;
	tags?: Array<string>;
};

const bookmarks: Array<BookmarkType> = [
	{
		id: 1,
		title: 'Google',
		url: 'https://google.com',
		featured: true,
		tags: ['search engine'],
	},
	{
		id: 2,
		title: 'Facebook',
		url: 'https://facebook.com',
	},
	{
		id: 3,
		title: 'Twitter',
		url: 'https://twitter.com',
		featured: true,
		tags: ['social media', 'microblogging'],
	},
	{
		id: 4,
		title: 'Instagram',
		url: 'https://instagram.com',
	},
	{
		id: 5,
		title: 'LinkedIn',
		url: 'https://linkedin.com',
	},
	{
		id: 6,
		title: 'YouTube',
		url: 'https://youtube.com',
		featured: true,
		tags: ['video streaming'],
	},
];

function Bookmark({ bookmark }: { bookmark: BookmarkType }) {
	return (
		<div className="flex w-full flex-col gap-4 overflow-hidden rounded border border-black p-4">
			<h3 className="text-xl font-bold text-gray-800">{bookmark.title}</h3>
			{/* TODO: add hover tooltip for overflow */}
			<p className="truncate text-sm text-gray-500">{bookmark.url}</p>

			{bookmark.tags && (
				<div className="flex flex-row gap-2 overflow-x-auto">
					{bookmark.tags.map((tag) => (
						<span
							key={tag}
							className="whitespace-nowrap rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
}

export default function Dashboard() {
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
				className="ml-32 flex min-h-screen flex-col gap-8 bg-gray-100 p-12"
				style={{ width: 'calc(100% - 8rem)' }}
			>
				<div className="flex w-full flex-row items-stretch">
					<input
						type="text"
						className="flex-grow appearance-none rounded-md rounded-br-none rounded-tr-none border border-gray-300 p-4"
						style={{ width: 'calc(100% - 4rem)' }}
						placeholder="Search"
					/>
					<div className="group flex w-16 cursor-pointer items-center justify-center rounded-md rounded-bl-none rounded-tl-none border border-l-0 border-gray-300 bg-white">
						<MdBookmarkAdd
							className="overflow-visible text-2xl text-gray-800 transition-colors duration-150 group-hover:text-gray-400"
							aria-label="Add Bookmark"
						/>
					</div>
				</div>

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
					<h2 className="text-2xl font-bold text-gray-800">Recent Bookmarks</h2>

					<div className="grid grid-cols-3 gap-4">
						{recentBookmarks.map((bookmark) => (
							<Bookmark
								key={bookmark.id}
								bookmark={bookmark}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

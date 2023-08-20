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
    <div className="w-full border border-black rounded flex flex-col gap-4 p-4 overflow-hidden">
      <h3 className="text-xl font-bold text-gray-800">{bookmark.title}</h3>
      {/* TODO: add hover tooltip for overflow */}
      <p className="text-sm text-gray-500 truncate">{bookmark.url}</p>

      {bookmark.tags && (
        <div className="flex flex-row gap-2 overflow-x-auto">
          {bookmark.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-700 bg-gray-200 rounded-md px-2 py-1 whitespace-nowrap"
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
      <nav className="bg-gray-800 w-32 px-6 py-8 flex flex-col items-center gap-8 fixed h-full overflow-y-auto">
        <Link href="/dashboard">
          <MdSpaceDashboard
            className="text-white w-8 h-8 hover:text-gray-400 transition-colors duration-200"
            aria-label="Dashboard"
          />
        </Link>

        <MdOutlineFolderCopy
          className="text-white w-8 h-8 hover:text-gray-400 transition-colors duration-200"
          aria-label="Folders"
        />

        <MdLockPerson
          className="text-white w-8 h-8 hover:text-gray-400 transition-colors duration-200"
          aria-label="Private Bookmarks"
        />

        <MdSettings
          className="text-white w-8 h-8 hover:text-gray-400 transition-colors duration-200"
          aria-label="Settings"
        />

        {/* Flex items that should be at the bottom of the nav */}
        <div
          className="flex flex-row gap-4 
          absolute bottom-0 left-0 right-0 px-6 py-8 items-center justify-center
        "
        >
          <MdPerson
            className="text-white w-8 h-8 hover:text-gray-400 transition-colors duration-200"
            aria-label="Profile"
          />
          <MdLogout
            className="text-white w-8 h-8 hover:text-gray-400 transition-colors duration-200"
            aria-label="Log out"
          />
        </div>
      </nav>

      {/* right side main content */}
      <section
        className="ml-32 bg-gray-100 min-h-screen p-12 flex flex-col gap-8"
        style={{ width: 'calc(100% - 8rem)' }}
      >
        <input
          type="text"
          className="border border-gray-300 rounded-md p-4 w-full"
          placeholder="Search"
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Bookmarks
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {featuredBookmarks.map((bookmark) => (
              <Bookmark key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-2xl font-bold text-gray-800">Recent Bookmarks</h2>

          <div className="grid grid-cols-3 gap-4">
            {recentBookmarks.map((bookmark) => (
              <Bookmark key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

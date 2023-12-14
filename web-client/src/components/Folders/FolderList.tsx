"use client";

import type { FolderType } from "@/types/BookmarkType";
import Link from "next/link";

const FolderList = ({ folders }: { folders: FolderType[] }) => {
  return (
    <>
      {/* Featured Bookmarks List */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Featured Folders
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {folders
            .filter((folder) => folder.featured)
            .map((folder) => {
              return (
                <Link
                  href={`/folders/${folder.id}`}
                  key={folder.id}
                  className="flex w-full cursor-pointer flex-col gap-4 overflow-hidden rounded border border-black p-4 transition-shadow duration-200 hover:shadow-xl dark:border-gray-300"
                >
                  {/* TITLE */}
                  <h3 className="line-clamp-3 text-xl font-bold text-gray-800 dark:text-white">
                    {folder.folder_name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="line-clamp-3 text-gray-500 dark:text-gray-300">
                    {folder.folder_description}
                  </p>

                  {/* NUMBER OF BOOKMARKS */}
                  <p className="text-green-500 dark:text-green-300">
                    {folder.bookmark_count} bookmarks
                  </p>
                </Link>
              );
            })}
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* Rest of folders List */}
      <section className="flex w-full flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Folders
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {folders
            .filter((folder) => !folder.featured)
            .map((folder) => {
              return (
                <Link
                  href={`/folders/${folder.id}`}
                  key={folder.id}
                  className="flex w-full cursor-pointer flex-col gap-4 overflow-hidden rounded border border-black p-4 transition-shadow duration-200 hover:shadow-xl dark:border-gray-300"
                >
                  {/* TITLE */}
                  <h3 className="line-clamp-3 text-xl font-bold text-gray-800 dark:text-white">
                    {folder.folder_name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="line-clamp-3 text-gray-500 dark:text-gray-300">
                    {folder.folder_description}
                  </p>

                  {/* NUMBER OF BOOKMARKS */}
                  <p className="text-green-500 dark:text-green-300">
                    {folder.bookmark_count} bookmarks
                  </p>
                </Link>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default FolderList;

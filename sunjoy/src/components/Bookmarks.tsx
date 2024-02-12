import React from "react";
import AddBookmarkForm from "./AddBookmarkForm";
import Image from "next/image";

const Bookmarks = ({ error, data }: { error: any; data: Array<Bookmark> }) => {
  return (
    <section className="flex flex-col items-center gap-5">
      <h2 className="text-3xl font-medium">Bookmarks</h2>

      <AddBookmarkForm />

      {error && <p>Error: Unable to retrieve bookmarks: {error.message}</p>}

      <ul className="grid grid-cols-4 gap-4">
        {data.map((bookmark) => (
          <li
            key={bookmark.uuid}
            className="flex flex-col border-2 rounded-lg border-slate-500 p-4 h-[400px] justify-between"
          >
            <h3 className="text-xl font-medium line-clamp-2">
              {bookmark.title}
            </h3>

            {bookmark.imgsrc && (
              <div className="relative w-full h-56">
                <Image
                  className="object-cover"
                  src={bookmark.imgsrc}
                  alt={bookmark.title}
                  fill={true}
                />
              </div>
            )}

            <p className="text-sm text-slate-500 line-clamp-1">
              {bookmark.url}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Bookmarks;
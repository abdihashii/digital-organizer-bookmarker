"use client";

import React from "react";
import type { BookmarkType } from "@/types/BookmarkType";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const BookmarkCard = ({
  bookmark,
  bookmarkModal,
  setBookmarkModal,
}: {
  bookmark: BookmarkType;
  bookmarkModal: {
    isOpen: boolean;
    bookmark: BookmarkType | null;
  };
  setBookmarkModal: (bookmarkModal: {
    isOpen: boolean;
    bookmark: BookmarkType | null;
  }) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        {bookmark.tags ? (
          <div className="flex flex-row gap-2 overflow-x-auto">
            {bookmark.tags.map((tag, index) => (
              <span
                key={`${tag}-${bookmark.url}-${index}`}
                className="whitespace-nowrap rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <div>
            <span className="opacity-0">No tags</span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {/* IMAGE */}
        <Image
          alt={bookmark.title || ""}
          className="h-64 object-cover"
          height="200"
          src="/placeholder.svg"
          style={{
            aspectRatio: "300/200",
          }}
          width="300"
        />

        <CardTitle className="mt-4 line-clamp-2 min-h-[3rem] pb-[0.12rem]">
          {bookmark.title}
        </CardTitle>

        <CardDescription className="mt-2 line-clamp-1 overflow-clip text-ellipsis">
          {bookmark.url}
        </CardDescription>

        <Link href={bookmark.url as string}>
          <Button className="group mt-8 w-full">
            Visit
            <ArrowUpRight className="ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BookmarkCard;

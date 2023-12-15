"use client";

import { BookmarkType, FolderType } from "@/types/BookmarkType";
import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FolderEditForm = ({ folder }: { folder: FolderType }) => {
  const supabase = createClientComponentClient<Database>();

  const router = useRouter();

  const [bookmarks, setBookmarks] = useState<Array<BookmarkType>>([]);
  const [selectedBookmarkIds, setSelectedBookmarkIds] = useState<Array<string>>(
    [],
  );
  const [removedBookmarkIds, setRemovedBookmarkIds] = useState<Array<string>>(
    [],
  );
  const [editedFolder, setEditedFolder] = useState<{
    folder_name: string;
    folder_description: string;
    featured: boolean;
    bookmark_count: number;
  }>(
    folder as {
      folder_name: string;
      folder_description: string;
      featured: boolean;
      bookmark_count: number;
    },
  );
  const [isLoading, setIsLoading] = useState(false);

  // Search for all of users bookmarks
  const fetchAllBookmarks = async () => {
    try {
      const { data: bookmarks, error: bookmarksError } = await supabase
        .from("bookmarks")
        .select()
        .order("updated_at", { ascending: false });

      if (bookmarksError) {
        throw bookmarksError;
      }

      setBookmarks(bookmarks);
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    }
  };

  // Search for bookmarks in folder
  const fetchBookmarksInFolder = async () => {
    try {
      const { data: bookmarks, error: bookmarksError } = await supabase
        .from("bookmarks")
        .select("uuid")
        .eq("folder_id", folder.id)
        .order("updated_at", { ascending: false });

      if (bookmarksError) {
        throw bookmarksError;
      }

      // flatten the array of objects into an array of strings
      const bookmarkIds = bookmarks.map((bookmark) => bookmark.uuid);

      setSelectedBookmarkIds(bookmarkIds);
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    }
  };

  const handleBookmarkSelection = (bookmarkId: string) => {
    let updatedSelectedBookmarks = [...selectedBookmarkIds];

    if (selectedBookmarkIds.includes(bookmarkId)) {
      // if the bookmark is already selected, remove it from the array
      updatedSelectedBookmarks = updatedSelectedBookmarks.filter(
        (id) => id !== bookmarkId,
      );

      // add the bookmark to the removedBookmarkIds array
      setRemovedBookmarkIds([...removedBookmarkIds, bookmarkId]);
    } else {
      // if the bookmark is not selected, add it to the array
      updatedSelectedBookmarks.push(bookmarkId);
    }

    setSelectedBookmarkIds(updatedSelectedBookmarks);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      // Update the folder to supabase
      const { data: newFolder, error: insertFolderError } = await supabase
        .from("folders")
        .update({
          folder_name: editedFolder.folder_name,
          folder_description: editedFolder.folder_description,
          featured: editedFolder.featured,
          bookmark_count: selectedBookmarkIds.length,
        })
        .eq("id", folder.id)
        .select("id")
        .single();

      if (insertFolderError) {
        throw insertFolderError;
      }

      // Iterate over the selected bookmarks and set their folder_id to the new folder's id
      for (const id of selectedBookmarkIds) {
        const { data: bM, error } = await supabase
          .from("bookmarks")
          .update({
            folder_id: newFolder.id,
          })
          .eq("uuid", id);

        if (error) {
          throw error;
        }
      }

      // Iterate over the removed bookmarks and set their folder_id to null (remove them from the folder)
      for (const id of removedBookmarkIds) {
        const { data: bM, error } = await supabase
          .from("bookmarks")
          .update({
            folder_id: null,
          })
          .eq("uuid", id);

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);

      // go to the folder page
      router.push(`/folders/${folder.id}`);

      // refresh the page to show the newly added bookmark
      router.refresh();
    }
  };

  // Search for all of users bookmarks
  useEffect(() => {
    fetchAllBookmarks();
    fetchBookmarksInFolder();
  }, [supabase]);

  return (
    <form
      className="flex flex-col space-y-6 lg:w-10/12"
      onSubmit={handleSubmit}
    >
      <section className="flex flex-col gap-2">
        <Label htmlFor="folderName">Folder Name</Label>
        <Input
          type="text"
          name="folderName"
          id="folderName"
          defaultValue={editedFolder.folder_name}
        />
      </section>

      <section className="flex flex-col gap-2">
        <Label htmlFor="folderDescription">Folder Description</Label>
        <Input
          type="text"
          name="folderDescription"
          id="folderDescription"
          defaultValue={editedFolder.folder_description || ""}
        />
      </section>

      <section className="flex flex-row items-center gap-2">
        <Label htmlFor="featured" className="flex-shrink-0 flex-grow-0">
          Featured
        </Label>
        <input
          type="checkbox"
          id="featured"
          checked={editedFolder.featured ? true : false}
          onChange={() => {
            const updatedEditedFolder = { ...editedFolder };

            updatedEditedFolder.featured = !updatedEditedFolder.featured;

            setEditedFolder(updatedEditedFolder);
          }}
        />
      </section>

      <section className="flex h-[200px] flex-col gap-2 overflow-y-scroll rounded-md border border-white p-4">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.uuid}
            className="flex flex-row items-center gap-2 border-b border-b-slate-500 p-2 last:border-b-0"
          >
            <input
              type="checkbox"
              id={`bookmark-${bookmark.uuid}`}
              checked={selectedBookmarkIds.includes(bookmark.uuid)}
              onChange={() => handleBookmarkSelection(bookmark.uuid)}
            />
            <Label
              htmlFor={`bookmark-${bookmark.uuid}`}
              className="cursor-pointer"
            >
              {bookmark.title}
            </Label>
          </div>
        ))}
      </section>

      <Button type="submit">
        {isLoading ? "Loading..." : "Update Folder"}
      </Button>

      <pre>
        <code>{JSON.stringify(selectedBookmarkIds, null, 2)}</code>
      </pre>
    </form>
  );
};

export default FolderEditForm;

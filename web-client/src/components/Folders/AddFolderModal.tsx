"use client";

import { BookmarkType } from "@/types/BookmarkType";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import Modal from "../Modal";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Database } from "@/types/database.types";

const addFolderSchema = z.object({
  folderName: z.string().min(1, {
    message: "Folder name cannot be empty",
  }),
  folderDescription: z.string().min(1, {
    message: "Folder description cannot be empty",
  }),
  featured: z.boolean().optional(),
  bookmarks: z.array(z.string()),
});

const AddFolderModal = ({
  user,
  handleClose,
}: {
  user: User;
  handleClose: () => void;
}) => {
  const supabase = createClientComponentClient<Database>();

  const [bookmarks, setBookmarks] = useState<Array<BookmarkType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const addFolderForm = useForm<z.infer<typeof addFolderSchema>>({
    resolver: zodResolver(addFolderSchema),
    defaultValues: {
      folderName: "",
      folderDescription: "",
      featured: false,
      bookmarks: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof addFolderSchema>) => {
    try {
      setIsLoading(true);

      // Add folder to supabase
      const { data: newFolder, error: insertFolderError } = await supabase
        .from("folders")
        .insert({
          folder_name: values.folderName,
          folder_description: values.folderDescription,
          featured: values.featured,
          user_id: user.id,
          bookmark_count: values.bookmarks.length,
        })
        .select("id")
        .single();

      if (insertFolderError) {
        throw insertFolderError;
      }

      // Iterate over bookmarks and set their folder_id to the new folder's id
      for (const bookmarkId of values.bookmarks) {
        const { error: updateBookmarkError } = await supabase
          .from("bookmarks")
          .update({
            folder_id: newFolder.id,
          })
          .eq("uuid", bookmarkId);

        if (updateBookmarkError) {
          throw updateBookmarkError;
        }
      }
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    } finally {
      handleClose();

      router.refresh(); // refresh the page to show the newly added bookmark

      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getBookmarks = async () => {
      const { data, error } = await supabase
        .from("bookmarks")
        .select()
        .order("updated_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setBookmarks(data);
    };

    getBookmarks();
  }, [supabase]);

  return (
    <Modal title="Add Folder" handleClose={handleClose}>
      <Form {...addFolderForm}>
        <form
          className="flex w-full flex-col space-y-6"
          onSubmit={addFolderForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={addFolderForm.control}
            name="folderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folder Name</FormLabel>
                <FormControl>
                  <Input
                    className="px-4 py-6"
                    placeholder="Folder Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={addFolderForm.control}
            name="folderDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folder Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="px-4 py-6"
                    placeholder="Folder Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="flex flex-row items-center gap-2">
            <FormLabel htmlFor="featured" className="flex-shrink-0 flex-grow-0">
              Featured
            </FormLabel>
            <Controller
              name="featured"
              control={addFolderForm.control}
              render={({ field: { onChange, value } }) => (
                <input
                  type="checkbox"
                  id="featured"
                  checked={value}
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                />
              )}
            />
          </section>

          <section className="flex h-[200px] flex-col gap-2 overflow-y-scroll rounded-md border border-white p-4">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.uuid}
                className="flex flex-row items-center gap-2 border-b border-b-slate-500 p-2 last:border-b-0"
              >
                <Controller
                  name="bookmarks"
                  control={addFolderForm.control}
                  render={({ field: { onChange, value } }) => (
                    <input
                      type="checkbox"
                      id={`bookmark-${bookmark.uuid}`}
                      checked={value.includes(bookmark.uuid)}
                      onChange={(e) => {
                        const updatedValue = e.target.checked
                          ? [...value, bookmark.uuid]
                          : value.filter((id) => id !== bookmark.uuid);
                        onChange(updatedValue);
                        console.log("Checkbox changed:", updatedValue);
                      }}
                    />
                  )}
                />
                <label
                  htmlFor={`bookmark-${bookmark.uuid}`}
                  className="cursor-pointer"
                >
                  {bookmark.title}
                </label>
              </div>
            ))}
          </section>

          <Button type="submit" className="btn btn-primary">
            {isLoading ? "..." : "Add Folder"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default AddFolderModal;

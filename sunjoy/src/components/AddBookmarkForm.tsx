import React from "react";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/supabaseServerClient";
import ogs from "open-graph-scraper";

const AddBookmarkForm = () => {
  const addBookmark = async (formData: FormData) => {
    "use server";

    const user = await getUser();

    if (!user) {
      return;
    }

    const { result } = await ogs({ url: formData.get("url") as string });
    const { ogTitle, ogUrl, ogImage } = result;

    const rawFormData = {
      user_id: user.id,
      title: ogTitle,
      url: ogUrl,
      imgsrc: ogImage?.[0].url ?? null,
    };

    try {
      const supabase = createServerActionClient({ cookies });

      const { error } = await supabase.from("bookmarks").insert([rawFormData]);

      if (error) {
        throw error;
      }

      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={addBookmark} className="space-x-2">
      <input
        className="border-2 border-slate-500 rounded-lg p-2"
        type="text"
        placeholder="URL"
        name="url"
      />

      <button
        className="bg-black text-white hover:bg-slate-500 rounded-lg px-4 py-2"
        type="submit"
      >
        Add Bookmark
      </button>
    </form>
  );
};

export default AddBookmarkForm;

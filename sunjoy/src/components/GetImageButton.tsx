"use client";

import React from "react";
import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const GetImageButton = ({
  url,
  bookmarkId,
  hasImage,
}: {
  url: string;
  bookmarkId: string;
  hasImage: boolean;
}) => {
  const supabase = createClientComponentClient<Database>();

  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleGetImage = async (url: string) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/fetch-metadata?url=${url}`);
      const { ogImage } = await res.json();

      const { error } = await supabase
        .from("bookmarks")
        .update({ imgsrc: ogImage })
        .eq("uuid", bookmarkId);
      if (error) {
        throw error;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => handleGetImage(url)}
      className={`bg-black text-white hover:bg-slate-500 rounded-lg px-4 py-2 ${hasImage || loading ? "cursor-not-allowed bg-slate-500" : ""}`}
      disabled={hasImage || loading}
    >
      {loading ? "Loading..." : "Get Image"}
    </button>
  );
};

export default GetImageButton;

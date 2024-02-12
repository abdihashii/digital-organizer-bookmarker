"use client";

import { Database } from "@/types/database.types";
import { useRouter } from "next/navigation";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const GenerateTagsButton = ({ bookmark }: { bookmark: Bookmark }) => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const handleGenerateTags = async () => {
    setLoading(true);

    try {
      const supabase = createClientComponentClient<Database>();

      const res = await fetch("/api/generate-tags", {
        method: "POST",
        body: JSON.stringify({ url: bookmark.url }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { tags } = await res.json();

      if (!tags) {
        throw new Error("No tags found");
      }

      alert(JSON.stringify(tags, null, 2));

      console.log("tags: ", tags);

      const { error } = await supabase
        .from("bookmarks")
        .update({ tags })
        .eq("uuid", bookmark.uuid);

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
      className="hover:bg-slate-500 text-white px-2 py-1 rounded-lg bg-black"
      onClick={handleGenerateTags}
      disabled={loading}
    >
      {loading ? "Generating tags..." : "Generate tags"}
    </button>
  );
};

export default GenerateTagsButton;

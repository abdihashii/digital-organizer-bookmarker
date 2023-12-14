import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/supabaseServerClient";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function FolderPage({
  params,
}: {
  params: {
    folder_id: string;
  };
}) {
  const supabase = createServerSupabaseClient();

  const { data: folder, error: folderError } = await supabase
    .from("folders")
    .select()
    .eq("id", params.folder_id)
    .single();

  if (folderError) {
    return <div>Error: {folderError.message}</div>;
  }

  const { data: bookmarks, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("uuid, title, imgsrc, url")
    .eq("folder_id", params.folder_id)
    .order("updated_at", { ascending: false });

  if (bookmarksError) {
    return <div>Error: {bookmarksError.message}</div>;
  }

  return (
    <article className="flex min-h-screen flex-1 flex-col gap-8 overflow-y-auto bg-gray-100 p-4 dark:bg-slate-700 md:p-12 lg:w-9/12">
      <Link href="/folders" className="lg:w-fit">
        <Button>
          <ArrowLeft className="mr-2" /> Back to Folders
        </Button>
      </Link>

      <div className="flex flex-col gap-2 lg:w-10/12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {folder.folder_name}
        </h1>

        <p className="text-gray-400">{folder.folder_description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-lg border border-white p-4 md:grid-cols-2 lg:w-10/12 lg:grid-cols-3 xl:gap-4">
        {bookmarks.map((bookmark) => (
          <a
            key={bookmark.uuid}
            href={bookmark.url as string}
            target="_blank"
            className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-md dark:bg-slate-800"
          >
            <h2>{bookmark.title}</h2>
            <p className="w-1/2 truncate text-sm text-gray-500">
              {bookmark.url}
            </p>
          </a>
        ))}
      </div>
    </article>
  );
}

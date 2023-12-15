import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/supabaseServerClient";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FolderEditForm from "./FolderEditForm";

export default async function EditFolderPage({
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

  return (
    <article className="flex min-h-screen flex-1 flex-col gap-8 overflow-y-auto bg-gray-100 p-4 dark:bg-slate-700 md:p-12 lg:w-9/12">
      <section>
        <Link href={`/folders/${folder.id}`} className="w-fit">
          <Button>
            <ArrowLeft className="mr-2" /> Back to Folder
          </Button>
        </Link>
      </section>

      <h1 className="text-2xl">{folder.folder_name}</h1>

      <FolderEditForm folder={folder} />
    </article>
  );
}

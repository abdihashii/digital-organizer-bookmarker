"use client";

import { Button } from "@/components/ui/button";
import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const DeleteFolderButton = ({ folderId }: { folderId: string }) => {
  const supabase = createClientComponentClient<Database>();

  const router = useRouter();

  const handleDeleteFolder = async () => {
    try {
      const { error: folderDeleteError } = await supabase
        .from("folders")
        .delete()
        .eq("id", folderId);

      if (folderDeleteError) {
        throw folderDeleteError;
      }

      alert("Folder deleted successfully");
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
    } finally {
      router.push("/folders");

      router.refresh();
    }
  };

  return (
    <Button
      variant={"destructive"}
      className="w-fit"
      onClick={handleDeleteFolder}
    >
      Delete Folder
    </Button>
  );
};

export default DeleteFolderButton;

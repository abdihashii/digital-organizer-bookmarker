'use client';

import { FolderType } from '@/types/BookmarkType';
import { useEffect, useState } from 'react';
import SearchFolders from '@/components/Search/SearchFolders';
import { User } from '@supabase/supabase-js';
import FolderList from '../Folders/FolderList';

const FoldersDashboard = ({
  user,
  folders,
}: {
  user: User;
  folders: FolderType[];
}) => {
  const [folderList, setFolderList] = useState<Array<FolderType>>(folders);

  // Check if the bookmarks have changed and update the state
  useEffect(() => {
    setFolderList(folders);
  }, [folders]);

  return (
    <article className="min-h-screen flex-1 overflow-y-auto bg-gray-100 p-4 dark:bg-slate-700 md:p-12 lg:w-9/12">
      <div className="flex flex-col gap-8 lg:w-10/12">
        <SearchFolders user={user} setFoldersList={setFolderList} />

        <FolderList folders={folderList} />
      </div>
    </article>
  );
};

export default FoldersDashboard;

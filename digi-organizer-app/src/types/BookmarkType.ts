export type BookmarkType = {
  featured: boolean | null;
  imgsrc?: string | null;
  tags: string[] | null;
  title: string | null;
  url: string | null;
  user_id: string | null;
  uuid: string;
};

export type NewBookmarkType = Omit<BookmarkType, 'uuid'>;

export type EditedBookmarkType = Partial<BookmarkType>;

export type ProfileType = {
  avatar_src: string | null;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  role: string;
  username: string;
};

export type FolderType = {
  created_at: string;
  folder_name: string;
  id: string;
  updated_at: string | null;
  user_id: string;
};

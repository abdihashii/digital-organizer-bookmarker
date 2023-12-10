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
  created_at: string | null;
  email: string;
  first_name: string | null;
  id: string;
  last_name: string | null;
  role: string;
  updated_at: string | null;
  username: string | null;
};

export type FolderType = {
  created_at: string;
  featured: boolean | null;
  folder_description: string | null;
  folder_name: string;
  id: string;
  textsearch: unknown | null;
  updated_at: string | null;
  user_id: string;
};

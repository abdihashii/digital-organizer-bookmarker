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
  email: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
  role: string;
};

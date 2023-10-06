import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import SearchBookmarks from '@/components/SearchBookmarks';
import BookmarkList from '@/components/BookmarkList';

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    return null;
  }

  const { data: bookmarks, error } = await supabase.from('bookmarks').select();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <article className="min-h-screen flex-1 overflow-y-auto bg-gray-100 p-4 dark:bg-slate-700 md:p-12 lg:w-9/12">
      <div className="flex flex-col gap-8 lg:w-10/12">
        <SearchBookmarks user={user} />

        <BookmarkList bookmarks={bookmarks} />
      </div>
    </article>
  );
}

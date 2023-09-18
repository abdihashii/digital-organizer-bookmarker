import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';
import LeftSideNav from '@/components/LeftSideNav';
import SearchBookmarks from '@/components/SearchBookmarks';
import BookmarkList from '@/components/BookmarkList';

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    redirect('/sign-in');
  }

  const { data: bookmarks, error } = await supabase.from('bookmarks').select();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="flex h-screen flex-col md:flex-row">
      {/* left side navigation - hidden on small screens */}
      <div className="hidden md:block">
        <LeftSideNav />
      </div>

      {/* right side main content */}
      <article className="min-h-screen flex-1 overflow-y-auto bg-gray-100 p-4 md:p-12 lg:w-9/12">
        <div className="flex flex-col gap-8 lg:w-10/12">
          <SearchBookmarks />

          <BookmarkList bookmarks={bookmarks} />
        </div>
      </article>
    </main>
  );
}

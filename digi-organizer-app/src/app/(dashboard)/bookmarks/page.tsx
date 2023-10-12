import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import Dashboard from '@/components/Dashboard/Dashboard';

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    return null;
  }

  const { data: bookmarks, error } = await supabase
    .from('bookmarks')
    .select()
    .order('updated_at', { ascending: false });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <Dashboard user={user} bookmarks={bookmarks} isFoldersList={false} />;
}

import FoldersDashboard from '@/components/Dashboard/FoldersDashboard';
import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';

export default async function FoldersPage() {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    return null;
  }

  const { data: folders, error } = await supabase
    .from('folders')
    .select()
    .order('updated_at', { ascending: false });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <FoldersDashboard user={user} folders={folders} />;
}

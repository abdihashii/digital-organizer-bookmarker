import LeftSideNav from '@/components/LeftSideNav';
import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    redirect('/sign-in');
  }

  const { data, error: profileError } = await supabase
    .from('profiles')
    .select();

  const profile = data?.[0];

  if (profileError) {
    return <div>Error: {profileError.message}</div>;
  }

  return (
    <main className="flex h-screen flex-col md:flex-row">
      {/* left side navigation - hidden on small screens */}
      <div className="hidden md:block">
        <LeftSideNav profile={profile} />
      </div>

      {/* right side main content */}
      {children}
    </main>
  );
}

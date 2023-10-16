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

  const {
    user_metadata: { full_name, avatar_url, user_name, email },
  } = user;

  const { data, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id);

  const profile = data?.[0];

  if (profileError) {
    return <div>Error: {profileError?.message}</div>;
  }

  if (!profile) {
    const [first_name, last_name] = full_name.split(' ');

    const newUserProfile = {
      id: user?.id,
      username: user_name,
      first_name,
      last_name,
      avatar_src: avatar_url,
      email,
    };

    try {
      await supabase.from('profiles').insert([newUserProfile]);
    } catch (error) {
      console.log(error);
    } finally {
      return;
    }
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

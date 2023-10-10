import UserSettingsForm from '@/components/Settings/UserSettingsForm';
import {
  createServerSupabaseClient,
  getUser,
} from '@/lib/supabaseServerClient';

export default async function SettingsPage() {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    return null;
  }

  const { data, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', user.id);

  const profile = data?.[0];

  if (profileError || !profile) {
    return <div>Error: {profileError?.message}</div>;
  }

  return (
    <article className="min-h-screen flex-1 overflow-y-auto bg-gray-100 p-4 dark:bg-slate-700 md:p-12 lg:w-9/12">
      <section className="flex flex-col gap-8 lg:w-5/12">
        <UserSettingsForm profile={profile} />
      </section>
    </article>
  );
}

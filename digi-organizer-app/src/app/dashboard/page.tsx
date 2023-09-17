import { getUser } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';
import SignOut from '@/components/auth/SignOut';

export default async function DashboardPage() {
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className="mt-4 flex flex-col items-center justify-center gap-4">
      <h1 className="text-center text-6xl">Dashboard</h1>

      <p className="text-center text-xl">Welcome, {user.email}!</p>

      <SignOut />
    </main>
  );
}

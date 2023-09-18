import { getSession } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';
import SignIn from '@/components/auth/SignIn';

export default async function SignInPage() {
  const session = await getSession();

  // Check if there is a session. If there is, redirect to the dashboard
  if (session) {
    redirect('/dashboard');
  }

  // If there is no session, show the sign in page
  return <SignIn />;
}
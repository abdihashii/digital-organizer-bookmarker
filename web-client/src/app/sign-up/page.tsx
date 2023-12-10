import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabaseServerClient';
import SignUp from '@/components/Auth/SignUp';

export default async function SignUpPage() {
  const session = await getSession();

  // Check if there is a session. If there is, redirect to the dashboard
  if (session) {
    redirect('/bookmarks');
  }

  // If there is no session, show the sign up page
  return <SignUp />;
}

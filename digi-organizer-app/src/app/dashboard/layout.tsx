import LeftSideNav from '@/components/LeftSideNav';
import { getUser } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  // If there is no user, redirect to the sign in page
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className="flex h-screen flex-col md:flex-row">
      {/* left side navigation - hidden on small screens */}
      <div className="hidden md:block">
        <LeftSideNav user={user} />
      </div>

      {/* right side main content */}
      {children}
    </main>
  );
}

import { getUser } from '@/lib/supabaseServerClient';
import Link from 'next/link';

export default async function Home() {
  const user = await getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <h1 className="text-4xl font-bold">Digi Organizer</h1>

      {user ? (
        <Link
          href="/bookmarks"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
        >
          Dashboard
        </Link>
      ) : (
        <Link
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          href="/sign-in"
        >
          Sign In
        </Link>
      )}
    </main>
  );
}

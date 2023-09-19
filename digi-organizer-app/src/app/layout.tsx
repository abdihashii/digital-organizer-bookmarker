import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider';
import type { Metadata } from 'next';
import { getSession } from '@/lib/supabaseServerClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digi Organizer',
  description: 'A digital bookmark organizer',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  const accessToken = session?.access_token ?? null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
      </body>
    </html>
  );
}

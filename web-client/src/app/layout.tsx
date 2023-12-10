import './globals.css';
import { getSession } from '@/lib/supabaseServerClient';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import AuthProvider from '@/components/Auth/AuthProvider';
import type { Metadata } from 'next';

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

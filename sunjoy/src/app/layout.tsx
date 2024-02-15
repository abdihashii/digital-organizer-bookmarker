import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { getSession } from '@/lib/supabaseServerClient';
import AuthProvider from '@/components/Auth/AuthProvider';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'SunJoy',
	description:
		'SunJoy helps you take back control of your digital assets and beat informational overload!',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getSession();

	const accessToken = session?.access_token ?? null;

	return (
		<html lang="en">
			<body
				className={cn(
					'bg-background min-h-screen font-sans antialiased',
					fontSans.variable,
				)}
			>
				<AuthProvider accessToken={accessToken}>{children}</AuthProvider>
				<Toaster />
			</body>
		</html>
	);
}

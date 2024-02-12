import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSession } from "@/lib/supabaseServerClient";
import AuthProvider from "@/components/Auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SunJoy",
  description:
    "SunJoy helps you take back control of your digital assets and beat informational overload!",
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
      <body className={inter.className}>
        <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
      </body>
    </html>
  );
}

import SignOutClientComponent from "@/components/Auth/SignOutClientComponent";
import { getUser } from "@/lib/supabaseServerClient";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="border border-red-500 w-fit p-6">
        <h1 className="text-4xl font-semibold">SunJoy</h1>

        <p>Welcome, {user.email}!</p>

        <SignOutClientComponent />
      </section>
    </main>
  );
}

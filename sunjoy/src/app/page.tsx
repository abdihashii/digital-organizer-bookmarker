import SignOutClientComponent from "@/components/Auth/SignOutClientComponent";
import Bookmarks from "@/components/Bookmarks";
import {
  createServerSupabaseClient,
  getUser,
} from "@/lib/supabaseServerClient";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <main className="flex flex-col p-24 items-center gap-10">
      <section className="border-b border-b-slate-500 w-fit p-6 flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-semibold">Welcome to SunJoy!</h1>

        <p>{user.email}!</p>

        <SignOutClientComponent />
      </section>

      {data && <Bookmarks error={error} data={data} />}
    </main>
  );
}

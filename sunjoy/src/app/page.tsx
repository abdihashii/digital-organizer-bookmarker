import SignOutClientComponent from '@/components/Auth/SignOutClientComponent';
import Bookmarks from '@/components/Bookmarks';
import {
	createServerSupabaseClient,
	getUser,
} from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';

export default async function Home() {
	const user = await getUser();

	if (!user) {
		redirect('/signin');
	}

	const supabase = createServerSupabaseClient();

	const { data, error } = await supabase
		.from('bookmarks')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error(error);
	}

	return (
		<main className="flex flex-col items-center gap-10 p-24">
			<section className="flex w-fit flex-col items-center gap-4 border-b border-b-slate-500 p-6">
				<h1 className="text-4xl font-semibold">Welcome to SunJoy!</h1>

				<p>{user.email}!</p>

				<SignOutClientComponent />
			</section>

			{data && (
				<Bookmarks
					error={error}
					data={data}
				/>
			)}
		</main>
	);
}

import {
	createServerSupabaseClient,
	getUser,
} from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';

import SignOutClientComponent from '@/components/Auth/SignOutClientComponent';
import Bookmarks from '@/components/Bookmarks';

export default async function Home() {
	const user = await getUser();

	if (!user) {
		redirect('/signin');
	}

	const supabase = createServerSupabaseClient();

	const {
		data,
		error,
		// count
	} = await supabase
		.from('bookmarks')
		.select(
			'*',
			// { count: 'exact' }
		) // This requests the exact count of all matching rows
		// .range(0, 5) // Limit to the first 6 bookmarks
		.order('created_at', { ascending: false });

	if (error) {
		console.error(error);
	}

	return (
		<main className="flex flex-col items-center gap-10 p-24">
			<section className="flex w-full flex-col items-center gap-4 border-b border-b-slate-500 p-6">
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

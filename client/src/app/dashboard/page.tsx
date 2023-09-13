import React from 'react';
import SearchBookmarks from '../components/searchBookmarks';
import LeftSideNav from '@/app/components/nav';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Bookmarks from './bookmarks';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../types/supabase.types';

export default async function Dashboard() {
	const supabase = createServerComponentClient<Database>({
		cookies,
	});

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		// this is a protected route - only users who are signed in can view this route
		redirect('/sign-in');
	}

	return (
		<main className="flex h-screen flex-col md:flex-row">
			{/* left side navigation - hidden on small screens */}
			<div className="hidden md:block">
				<LeftSideNav />
			</div>

			{/* right side main content */}
			<article className="min-h-screen flex-1 overflow-y-auto bg-gray-100 p-4 md:p-12 lg:w-9/12">
				<div className="flex flex-col gap-8 lg:w-10/12">
					<SearchBookmarks />

					<Bookmarks />
				</div>
			</article>
		</main>
	);
}

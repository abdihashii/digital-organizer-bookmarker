import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/app/types/supabase.types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	try {
		const requestUrl = new URL(request.url);

		const formData = await request.formData();
		const email = String(formData.get('email'));
		const password = String(formData.get('password'));

		console.log({ email, password });

		const supabase = createRouteHandlerClient<Database>({ cookies });

		await supabase.auth.signInWithPassword({
			email,
			password,
		});

		return NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
			status: 301,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			error: 'Unexpected server error while signing in.',
			data: null,
			redirectTo: null,
		});
	}
}

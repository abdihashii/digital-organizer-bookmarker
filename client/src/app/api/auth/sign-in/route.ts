import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/app/types/supabase.types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	const requestUrl = new URL(request.url);
	const body = await request.json();

	const email = body.email;
	const password = body.password;

	const supabase = createRouteHandlerClient<Database>({ cookies });

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	const redirectTo = error ? null : `${requestUrl.origin}/dashboard`;

	return NextResponse.json({
		data,
		error,
		redirectTo,
	});
}

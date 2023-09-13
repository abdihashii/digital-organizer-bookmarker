import { Database } from '@/app/types/supabase.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	if (code) {
		const supabase = createRouteHandlerClient<Database>({ cookies });
		await supabase.auth.exchangeCodeForSession(code);
	}

	// Redirect to this URL after the sign in process is complete
	return NextResponse.redirect(requestUrl.origin);
}
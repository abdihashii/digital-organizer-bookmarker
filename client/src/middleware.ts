import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './app/types/supabase.types';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const supabaseMiddlewareClient = createMiddlewareClient<Database>({
		req,
		res,
	});

	const { error } = await supabaseMiddlewareClient.auth.getSession();

	if (error) {
		console.log(`Middleware error: ${JSON.stringify({ error })}`);
	}

	return res;
}

export const config = {
	matcher: ['/', '/dashboard'],
};

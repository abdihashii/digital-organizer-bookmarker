import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { Database } from './app/types/supabase.types';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient<Database>({ req, res });
	const { data, error } = await supabase.auth.getSession();

	console.log(`Middleware data: ${JSON.stringify({ data })}`);

	if (error) {
		console.log(`Middleware error: ${JSON.stringify({ error })}`);
	}

	return res;
}

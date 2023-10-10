import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabaseClient = createMiddlewareClient({ req, res });

  await supabaseClient.auth.getSession();

  return res;
}

export const config = {
  matcher: ['/', '/bookmarks'],
};

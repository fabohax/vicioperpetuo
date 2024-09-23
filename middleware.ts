import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
export async function middleware(req: NextRequest) {
  
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
 
  if (!session) {
    console.log('session started')
  }
 
  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin']
};
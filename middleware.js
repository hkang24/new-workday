import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  
  const res = NextResponse.next()
  
  const { pathname } = req.nextUrl;
  console.log("pathname", pathname);

  
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })
  

  // Refresh session if expired - required for Server Components
  const {data, error} = await supabase.auth.getSession()

  if (!data.session) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ['/((?!api|fonts|icon.ico|signin|signup|auth|contexts|_next/static|_next/image|.*\\.png$|^/$|^$).*)|(^/$)'],
}
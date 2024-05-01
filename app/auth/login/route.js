import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import Status from '@/app/api/functions/status';

export async function POST(request) {
    try {
        const requestUrl = new URL(request.url)
        const formData = await request.formData()
        const email = formData.get('email')
        const password = formData.get('password')
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (data.user) {
            return Status.createSuccessResponse("user exists");
        } else {
            return Status.createSuccessResponse("unauthorized", 401);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.error({ status: 500, body: 'An unexpected error occurred'})
    }

}
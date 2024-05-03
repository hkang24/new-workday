export const dynamic = 'force-dynamic' // defaults to aut

import supabase from '../functions/supabase';

import Status from '@/app/api/functions/status'


export async function GET(request) {
    try {
        console.log('in get recruiter route');
        const queryParams = new URLSearchParams(request.url.split('?')[1]);
        console.log('in get recruiter route');
        console.log('queryParams', queryParams);
        // const { data, error } = await supabase.from('jobs').select('*').eq('recruiter', true);
        const { data, error } = await supabase.from('users').select('*').eq('id', queryParams.get('id'));
        console.log('data', data);
        // if (!data) {
        // console.log('No recruiters found', error.message);
        // return Status.createErrorResponse('No recruiters found', error.message);
        // }
        // console.log('Recruiters found', data);
        return Status.createSuccessResponse(data[0]);
    } catch (error) {
        console.log('An unexpected error occurred', error.message);
        return Status.createErrorResponse('An unexpected error occurred', error.message);
    }
    }
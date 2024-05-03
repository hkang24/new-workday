export const dynamic = 'force-dynamic' // defaults to aut

import supabase from '../functions/supabase';

import Status from '@/app/api/functions/status'

export async function POST(request) {
    try {
      console.log('in signup route');
      const formData = await request.formData();
      const { email, password, firstName, lastName , school, gpa, phone} = Object.fromEntries(formData);
      // console.log(email, password, country, firstName, lastName, username, zip);
  
      const { data, error } = await supabase.auth.signUp({ email, password , options: {
        emailRedirectTo: '/auth/callback'
      }});
      if (!data.user) {
        console.log('User creation failed', error.message);
        return Status.createErrorResponse('User creation failed', error.message);
        
      }
      console.log('User created', data.user);
      const id = data.user.id;
      await supabase.from('users').insert([{ id, email, first_name: firstName, last_name: lastName, applicant: true , school, gpa, phone_number: phone}]);
      const { data: userData, error: userError } = await supabase.from('users').select('*').eq('id', id);
      if (!userData) {
        console.log('User creation failed', userError.message);
        return Status.createErrorResponse('User creation failed', userError.message);

      }
  
      return Status.createSuccessResponse(userData[0]);
    } catch (error) {
      console.log('An unexpected error occurred', error.message);
      return Status.createErrorResponse('An unexpected error occurred', error.message);
    }
  }
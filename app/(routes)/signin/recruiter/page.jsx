"use client";

import axios from 'axios';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter();
    
    const [invalid, setInvalid] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        await axios.post('/auth/login', formData)
          .then(response => {
            console.log(response.data);
            router.push('/recruiter/jobs');
          })
          .catch(error => setInvalid(true));
    
      }

    return (

            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <img
                        className="h-10 w-auto"
                        src="https://www.dropbox.com/scl/fi/e2n0wx3uu2v3bicus09td/easyapplylogo.svg?rlkey=n0ecagfqq35j8lg8qpmww5p30&st=awcjoqag&dl=0&raw="
                        alt="Your Company"
                    />
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your <span className="text-blue">Recruiter</span> account
                    </h2>
                </div>
                <div>
                    <p className="mt-2 text-center text-sm leading-6 text-gray-500">
                        Don't have an account?{' '}
                        <a href="/signup/recruiter" className="font-semibold leading-6 text-orange hover:text-yellow">
                            Create one now!
                        </a>
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    
                    <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        
        
    )
}

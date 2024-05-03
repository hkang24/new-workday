'use client'

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'

import { useRouter } from 'next/navigation'

import axios from 'axios';

export default function Page() {

    const router = useRouter();

    async function onFormSubmit(event) {
        event.preventDefault();


        const formElement = document.getElementById('form');
        const formData = new FormData(formElement);

        const res = await axios.post(`/api/signupRecruiter`, formData);

        if (res.status === 201) {
            router.push('/signin/recruiter');
        } else {
            console.log("error", res);
        }
    }


    return (

        <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <img
                className="h-10 w-auto"
                src="https://upload.wikimedia.org/wikipedia/commons/8/80/Workday_logo.svg"
                alt="Your Company"
            />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register a <span className="text-blue">Recruiter</span> account
                </h2>
            </div>
            <div>
                <p className="mt-2 text-center text-sm leading-6 text-gray-500">
                    Already have an account?{' '}
                    <a href="/signin/recruiter" className="font-semibold leading-6 text-orange hover:text-yellow">
                        Sign in now!
                    </a>
                </p>
            </div>
            <div className="bg-white w-max mt-10 p-6 pb-6 shadow-sm border sm:rounded-md sm:px-12">
                    <form id='form' className="space-y-6" method="POST" onSubmit={(e) => onFormSubmit(e)}>
                        <div className="flex flex-row">
                            <div className="flex-1 me-1 pr-8">
                                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-zinc-500">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        autoComplete="first name"
                                        required
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm input-ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:blue sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 ms-1"><label htmlFor="lastName" className="block text-sm font-medium leading-6 text-zinc-500">
                                Last name
                            </label>
                                <div className="mt-2 flex flex-row">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        autoComplete="last name"
                                        required
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm input-ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                                    />
                                </div></div>


                        </div>


                        <div>
                            <label htmlFor="company" className="block text-sm font-medium leading-6 text-zinc-500">
                                Company
                            </label>
                            <div className="mt-2">
                            <div className="mt-2">
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm input-ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-zinc-500">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm input-ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>



                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-zinc-500">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm input-ring placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className='py-4'>
                            <button
                                type="submit"
                                className="horizontal bg-blue w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold transition leading-6 text-white shadow-sm hover:bg-dark-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-blue"
                            >
                                Create Account
                            </button>
                        </div>

                    </form>
                
            </div>
        </div>


    )
}

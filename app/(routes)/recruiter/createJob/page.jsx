"use client"


import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';

import { useState, useEffect } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from "@/components/ui/checkbox"

import StatusTag from '@/components/statusTag';

import { BarsArrowUpIcon, UsersIcon, PlusIcon } from '@heroicons/react/20/solid'

import { Toaster } from "@/components/ui/sonner"

import Banner from "@/components/banners/banner"

import Question from './components/question';



import Shell from "../components/Shell"

export default function Page() {

    const [user, setUser] = useState(null);
    const [degreeRequired, setDegreeRequired] = useState(false);
    const [contact, setContact] = useState(false);

    const [majors, setMajors] = useState([]);
    const [skills, setSkills] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [saved, setSaved] = useState(false);

    const supabase = createClientComponentClient();

    async function getUserData() {
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
            console.log('error', error);
        }
        console.log('data', data);
        setUser(data[0]);
    }

    function onAddMajor(e) {
        e.preventDefault();
        const major = document.getElementById('major').value;
        console.log('major', major);
        setMajors([...majors, major]);
    }

    function onAddSkill(e) {
        e.preventDefault();
        const skill = document.getElementById('skill').value;

        setSkills([...skills, skill]);
    }

    function onAddQuestion(e) {
        e.preventDefault();
        const question = document.getElementById('question').value;

        setQuestions([...questions, question]);
    }

    function onDeleteQuestion(index) {
        const newQuestions = questions.filter((question, i) => i !== index);
        setQuestions(newQuestions);
    }

    async function onFormSubmit(event) {
        event.preventDefault();
        const formElement = document.getElementById('form');
        console.log('formElement', formElement);
        const formData = new FormData(formElement);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        const gpa = formData.get('gpa') ? formData.get('gpa') : null;

        if (degreeRequired) {
            const res = await supabase.from('jobs').insert([{
                company: user.company,
                position: formData.get('position'),
                location: formData.get('location'),
                description: formData.get('description'),
                gpa: gpa,
                degree_required: degreeRequired,
                majors: majors,
                skills: skills,
                recruiter_id: user.id,
                additional_questions: questions,
                status: 'Open',
                contact: contact
            }]);
            if (res.error) {
                console.log('error', res);
            } else {
                console.log('res', res);
            }
        } else {
            const res = await supabase.from('jobs').insert([{
                company: user.company,
                position: formData.get('position'),
                location: formData.get('location'),
                description: formData.get('description'),
                gpa: gpa,
                degree_required: degreeRequired,
                recruiter_id: user.id,
                additional_questions: questions,
                status: 'Open',
                contact: contact
            }]);
            if (res.error) {
                console.log('error', res);
            } else {
                console.log('res', res);
            }
        }
        clearForm(event);
        setSaved(true);
    }


    function clearForm(e) {
        e.preventDefault();
        document.getElementById('position').value = '';
        document.getElementById('location').value = '';
        document.getElementById('description').value = '';
        document.getElementById('gpa').value = '';
        setDegreeRequired(false);
        setMajors([]);
        setSkills([]);
        setQuestions([]);
    }

    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSaved(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [saved])



    return (
        // <div>
        <>
            <Shell current='Create' >
                <div className="px-7 py-7 max-h-screen bg-light-blue ">

                    <div className='bg-white rounded-lg p-5'>
                        <h1 className="text-2xl font-bold text-blue mb-3 border-b-light-blue">Create Job Listing for <span className='text-orange'>{user?.company}</span></h1>
                        <ScrollArea className='h-[calc(100vh-8.5rem)]'>
                            <form id='form' onSubmit={(e) => onFormSubmit(e)} className='flex flex-col justify-between h-[calc(100vh-8.5rem)]'>
                                <div className="space-y-12">
                                    <div className="pb-10">


                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Position
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="position"
                                                        id="position"
                                                        required
                                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm input-ring placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Location
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        id="location"
                                                        required
                                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm input-ring placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-full">
                                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Description
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        rows="5"
                                                        name="description"
                                                        id="description"
                                                        required
                                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm input-ring placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-1">
                                                <label htmlFor="gpa" className="block text-sm font-medium leading-6 text-gray-900">
                                                    GPA (optional)
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="number"
                                                        name="gpa"
                                                        id="gpa"
                                                        
                                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm input-ring placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-1">
                                                <label htmlFor="degree-required" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Degree Required?
                                                </label>
                                                <div className="mt-5 w-full flex justify-center">
                                                    <Checkbox id='degree-required' checked={degreeRequired} onCheckedChange={setDegreeRequired} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='sm:grid sm:grid-cols-2 mt-8 gap-x-7'>
                                            {degreeRequired &&
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                                        Majors
                                                    </label>
                                                    <div className="mt-2 flex rounded-md shadow-sm">
                                                        <div className="relative flex flex-grow items-stretch focus-within:z-10">

                                                            <input
                                                                type="major"
                                                                name="major"
                                                                id="major"
                                                                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                                placeholder="ex. Computer Science"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => onAddMajor(e)}
                                                            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                        >
                                                            <PlusIcon className="h-4 w-4 text-gray-900" />
                                                            Add Major
                                                        </button>
                                                    </div>
                                                    <div className="mt-2 p-2 w-full border border-gray-200 min-h-20 rounded-lg flex flex-wrap gap-x-1">
                                                        {majors.map((major, index) => (
                                                            <StatusTag key={index} status={major} />
                                                        ))}

                                                    </div>
                                                </div>


                                            }
                                            <div className="sm:col-span-1">
                                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Skills
                                                </label>
                                                <div className="mt-2 flex rounded-md shadow-sm">
                                                    <div className="relative flex flex-grow items-stretch focus-within:z-10">

                                                        <input
                                                            type="skill"
                                                            name="skill"
                                                            id="skill"
                                                            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                            placeholder="ex. React"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => onAddSkill(e)}
                                                        className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        <PlusIcon className="h-4 w-4 text-gray-900" />
                                                        Add Skills
                                                    </button>
                                                </div>
                                                <div className="mt-2 p-2 w-full border border-gray-200 min-h-20 rounded-lg flex flex-wrap gap-x-1">
                                                    {skills.map((skill, index) => (
                                                        <StatusTag key={index} status={skill} />
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 mt-7">
                                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                Additional Questions
                                            </label>
                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                <div className="relative flex flex-grow items-stretch focus-within:z-10">

                                                    <input
                                                        type="text"
                                                        name="question"
                                                        id="question"
                                                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                        placeholder="ex. Why do you want to work at our company?"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => onAddQuestion(e)}
                                                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    <PlusIcon className="h-4 w-4 text-gray-900" />
                                                    Add Question
                                                </button>
                                            </div>
                                            <div className='mt-2 flex flex-col gap-y-2'>
                                                {questions.map((question, index) => (
                                                    <Question onDelete={() => onDeleteQuestion(index)} key={index}>{question}</Question>
                                                ))}

                                            </div>
                                        </div>
                                        <div className="sm:col-span-1 mt-7 flex items-center">
                                            <label htmlFor="contact" className="block text-sm font-medium leading-6 text-gray-900 mr-3">
                                                Allow applicant to contact you?
                                            </label>
                                            {/* <div className="mt-5 w-full flex justify-center"> */}
                                            <Checkbox id='contact' checked={contact} onCheckedChange={setContact} />
                                            {/* </div> */}
                                        </div>


                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-x-6 sticky bottom-0 bg-white pt-4">
                                    <button type="button" onClick={(e) => clearForm(e)} className="text-sm font-semibold leading-6 text-gray-900">
                                        Clear
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-orange px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                                    >
                                        Create Listing
                                    </button>
                                </div>

                            </form>
                        </ScrollArea>
                    </div>

                </div >
            </Shell >
            {saved && <Banner>Job Listing Created</Banner>
            }
        </>
        // </div>
    )
}


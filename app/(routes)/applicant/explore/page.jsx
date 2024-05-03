"use client"

import { useState, useEffect } from 'react';

import Shell from '../components/Shell';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

import Banner from "@/components/banners/banner"


import JobRow from './components/jobRow';
import StatusTag from '@/components/statusTag';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ScrollArea } from '@/components/ui/scroll-area';

import { PlusIcon } from '@heroicons/react/20/solid'



export default function Page() {

    const supabase = createClientComponentClient();

    const [user, setUser] = useState(null);

    const [jobs, setJobs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [selected, setSelected] = useState(null);

    const [saved, setSaved] = useState(false);

    async function getUserData() {
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
            console.log('error', error);
        }
        console.log('data', data);
        setUser(data[0]);
        return data[0];
    }

    function onAddSkill(e) {
        e.preventDefault();
        const skill = document.getElementById('skill').value;


        setSkills([...skills, skill]);
        document.getElementById('skill').value = '';
    }

    async function onFormSubmit(event) {
        console.log('onFormSubmit');
        event.preventDefault();
        const formElement = document.getElementById('form');
        console.log('formElement', formElement);
        const formData = new FormData(formElement);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        const gpa = formData.get('gpa') ? parseFloat(formData.get('gpa')) : null;
        const school = formData.get('school') ? formData.get('school') : null;
        const additional_questions_answers = [];
        if (jobs[selected].additional_questions && jobs[selected].additional_questions.length > 0) {
            for (let i = 0; i < jobs[selected].additional_questions.length; i++) {
                additional_questions_answers.push({ question: jobs[selected].additional_questions[i], answer: formData.get(`question${i}`) });
            }
        }
        const { data, error } = await supabase
            .from('applications')
            .insert([
                {
                    job_id: jobs[selected].id,
                    applicant_id: user.id,
                    first_name: formData.get('first_name'),
                    last_name: formData.get('last_name'),
                    gpa,
                    school,
                    skills,
                    question_answers: additional_questions_answers,
                    status: 'Unseen'
                }
            ])

        if (error) {
            console.error(error);
        }
        console.log('data', data);
        const jobsCopy = [...jobs];

        jobsCopy.splice(selected, 1);

        setSkills([]);
        setJobs(jobsCopy);
        setSaved(true);
        setSelected(null);
    }

    // useEffect(() => {
    //     getUserData();
    // }, [])


    useEffect(() => {
        async function fetchData() {
            const userData = await getUserData();
            console.log('userData', userData);
            if (!userData) return; // Ensure userData is not undefined before proceeding

            async function fetchJobs() {
                // First, get the list of job IDs from applications
                const { data: applicationData, error: applicationError } = await supabase
                    .from('applications')
                    .select('job_id')
                    .eq('applicant_id', userData.id);

                if (applicationError) {
                    console.error(applicationError);
                    return;
                }

                // Extract job IDs
                const appliedJobIds = applicationData.map(app => app.job_id);
                console.log('appliedJobIds', appliedJobIds);

                // Now, query jobs excluding the applied ones
                const { data, error } = await supabase
                    .from('jobs')
                    .select('*')
                    .eq('status', 'Open')
                    .not('id', 'in', `(${appliedJobIds.join(',')})`);

                if (error) {
                    console.error(error);
                } else {
                    console.log(data);
                    setJobs(data);
                }
            }
            fetchJobs();
        }
        fetchData();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSaved(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [saved])






    return (
        <div>
            <Shell current='Explore'>
                <div className='flex flex-row min-h-screen bg-white'>
                    <div className='flex flex-col grow-0 shrink-0 w-80 min-h-screen border border-blue bg-white'>
                        <h1 className='text-2xl font-regular text-center py-2 border border-blue bg-blue text-white py-3 rounded-b-lg'>Explore</h1>
                        <div className='flex flex-col divide-y divide-solid'>
                            {jobs.map((job, index) => {
                                return <JobRow key={index} index={index} job={job} setSelected={setSelected} selected={selected} />
                            })}
                            {/* <JobRow job={{ title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', status: 'Applied' }} />
                            <JobRow job={{ title: 'Product Manager', company: 'Facebook', location: 'Menlo Park, CA', status: 'Applied' }} />
                            <JobRow job={{ title: 'Consultant', company: 'ACME', location: 'Philadelphia, PA', status: 'Interview' }} /> */}

                        </div>
                    </div>
                    <div className="flex flex-col justify-between grow relative p-7 bg-white">
                        {selected === null ?
                            <div className='flex justify-center items-center h-full'>No job selected</div>
                            :
                            <>
                                <ScrollArea className='flex flex-col h-[87vh]'>
                                    <h1 className='text-3xl font-regular pb-2 text-blue-700'>{jobs[selected].company}</h1>
                                    <p className='text-md' style={{ 'fontWeight': '600' }}>{jobs[selected].title}</p>
                                    <p className='text-md' style={{ 'fontWeight': '500' }}>{jobs[selected].location}</p>

                                    <p className='text-sm mt-6' style={{ 'fontWeight': '600' }}>Description</p>
                                    <p className='text-sm mt-2' style={{ 'fontWeight': '500' }}>{jobs[selected].description}</p>

                                    <p className='text-sm mt-6 mb-3' style={{ 'fontWeight': '600' }}>Requirements</p>
                                    <div className="grid grid-cols-2 gap-y-6 gap-x-7">
                                        <div className="flex justify-between col-span-1">

                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>Degree: {jobs[selected].degree_required ? 'Required' : 'Not Required'}</p>


                                        </div>
                                        {jobs[selected].degree_required &&
                                            <>
                                                <div className="flex justify-between col-span-1">
                                                    <p className='text-sm' style={{ 'fontWeight': '500' }}>GPA: {jobs[selected].gpa}</p>
                                                </div>

                                                <div className="col-span-1">
                                                    <p className='text-sm' style={{ 'fontWeight': '600' }}>Majors</p>
                                                    <div className="mt-2 w-full  rounded-lg flex flex-wrap gap-x-1 gap-y-1">
                                                        {jobs[selected].majors.map((major, index) => (
                                                            <StatusTag key={index} status={major} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {jobs[selected].skills &&
                                            <div className="col-span-1">
                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Skills</p>
                                                <div className="mt-2 w-full  rounded-lg flex flex-wrap gap-x-1 gap-y-1">
                                                    {jobs[selected].skills.map((major, index) => (
                                                        <StatusTag key={index} status={major} />
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                        {jobs[selected].additional_questions &&
                                            <div className="col-span-full mt-2">
                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Additional Questions</p>
                                                {jobs[selected].additional_questions.map((question, index) => (
                                                    <div key={index} className='mt-2'>
                                                        <p className='text-sm' style={{ 'fontWeight': '500' }}>{question}</p>
                                                    </div>
                                                ))}

                                            </div>
                                        }

                                    </div>

                                </ScrollArea>
                                <div className='w-full flex justify-center'>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" className='bg-blue text-white rounded-lg py-2 px-4 mt-5 hover:bg-dark-blue hover:text-white'>Apply for Position</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='w-[80vw]'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className='mb-5'>{jobs[selected].company + ' ' + jobs[selected].position + ' Application'}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <ScrollArea className='h-[75vh]'>
                                                        <form id='form' onSubmit={(e) => onFormSubmit(e)} className='flex flex-col justify-between h-[75vh]'>
                                                            <div className="space-y-12">
                                                                <div className="pb-10">


                                                                    <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                        <div className="sm:col-span-3">
                                                                            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                First Name
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    type="text"
                                                                                    name="first_name"
                                                                                    id="first_name"
                                                                                    defaultValue={user?.first_name}
                                                                                    required
                                                                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm input-ring placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="sm:col-span-3">
                                                                            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                Last Name
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    type="text"
                                                                                    name="last_name"
                                                                                    id="last_name"
                                                                                    defaultValue={user?.last_name}
                                                                                    required
                                                                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm input-ring placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        {jobs[selected].degree_required &&
                                                                            <>
                                                                                <div className="sm:col-span-3">
                                                                                    <label htmlFor="school" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                        School Name
                                                                                    </label>
                                                                                    <div className="mt-2">
                                                                                        <input
                                                                                            type="text"
                                                                                            name="school"
                                                                                            id="school"
                                                                                            defaultValue={user?.school}
                                                                                            required
                                                                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm input-ring placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="sm:col-span-3">
                                                                                    <label htmlFor="gpa" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                        GPA
                                                                                    </label>
                                                                                    <div className="mt-2">
                                                                                        <input
                                                                                            type="number"
                                                                                            name="gpa"
                                                                                            id="gpa"
                                                                                            defaultValue={user?.gpa}
                                                                                            required
                                                                                            step="0.01"
                                                                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm input-ring placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        }
                                                                        <div className="sm:col-span-full">
                                                                            <label htmlFor="skills" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                Skills
                                                                            </label>
                                                                            <div className="mt-2 flex rounded-md shadow-sm">
                                                                                <div className="relative flex flex-grow items-stretch focus-within:z-10">

                                                                                    <input
                                                                                        type="text"
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
                                                                        {jobs[selected].additional_questions && jobs[selected].additional_questions.length > 0 &&
                                                                            <div className="sm:col-span-full">
                                                                                <label htmlFor="questions" className="block text-sm font-medium leading-6 text-gray-900">
                                                                                    Additional Questions
                                                                                </label>
                                                                                <div className="mt-2">
                                                                                    {jobs[selected].additional_questions.map((question, index) => (

                                                                                        <>
                                                                                            <label htmlFor={`question${index}`} className="block text-sm font-light leading-6 text-gray-900 mb-2">
                                                                                                {question}
                                                                                            </label>

                                                                                            <textarea name={`question${index}`} id={`question${index}`} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm input-ring placeholder:text-gray-400 input-ring sm:text-sm sm:leading-6 mb-4" />

                                                                                        </>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        }




                                                                    </div>


                                                                </div>
                                                            </div>
                                                            <AlertDialogFooter className='pt-1'>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <button type='submit'>
                                                                    <AlertDialogAction>Submit</AlertDialogAction>
                                                                </button>
                                                            </AlertDialogFooter>


                                                        </form>
                                                    </ScrollArea>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Shell>
            {saved && <Banner>Job Application Successfully Submitted</Banner>
            }
        </div>
    )
}


"use client"

import { useState } from 'react';

import Shell from '../components/shell';

import JobRow from './components/jobRow';
import { LocaleRouteNormalizer } from 'next/dist/server/future/normalizers/locale-route-normalizer';

import StatusTag from '@/components/statusTag';

const jobs = [
    { title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', status: 'Applied' },
    { title: 'Product Manager', company: 'Facebook', location: 'Menlo Park, CA', status: 'Applied' },
    { title: 'Consultant', company: 'ACME', location: 'Philadelphia, PA', status: 'Interview' },
]

export default function Page() {

    const [selected, setSelected] = useState(null);



    return (
        <div>
            <Shell>
                <div className='flex flex-row h-full'>
                    <div className='flex flex-col grow-0 shrink-0 w-80 h-full min-h-screen border border-blue bg-white'>
                        <h1 className='text-2xl font-regular text-center py-2 border border-blue bg-blue text-white rounded-b-lg h-full'>Applied</h1>
                        <div className='flex flex-col divide-y divide-solid bg-white h-full'>
                            {jobs.map((job, index) => {
                                return <JobRow key={index} index={index} job={job} setSelected={setSelected} selected={selected} />
                            })}
                            <hr />
                            {/* <JobRow job={{ title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', status: 'Applied' }} />
                            <JobRow job={{ title: 'Product Manager', company: 'Facebook', location: 'Menlo Park, CA', status: 'Applied' }} />
                            <JobRow job={{ title: 'Consultant', company: 'ACME', location: 'Philadelphia, PA', status: 'Interview' }} /> */}

                        </div>
                    </div>
                    <div className="flex flex-col justify-between grow  relative">
                        {selected === null ?
                            <div className='flex justify-center items-center h-full'>No job selected</div>
                            :
                            <>

                                <div className="flex flex-col grow relative" style={{ 'backgroundColor': 'white' }}>
                                    <h1 className='border-b flex items-center justify-between w-full grow-0 text-2xl font-regular h-[3.3rem] rounded-b-md  px-5 text-white bg-blue'><span>{'Software Engineer'}</span></h1>
                                    <div className='flex flex-col p-5'>
                                        <p className='text-md' style={{ 'fontWeight': '600' }}>{'Google'}</p>
                                        <p className='text-md' style={{ 'fontWeight': '500' }}>{'Menlo Park, CA'}</p>

                                        <p className='text-sm mt-6' style={{ 'fontWeight': '600' }}>Description</p>
                                        <p className='text-sm mt-2' style={{ 'fontWeight': '500' }}>{"As a Software Engineer focused on rapid prototyping of ML models, you will be responsible for designing and implementing innovative AI models and algorithms. You will work closely with other researchers and engineers to prototype and test new ideas, and collaborate with cross-functional teams to bring your research to life."}</p>

                                        <p className='text-sm mt-6 mb-3' style={{ 'fontWeight': '600' }}>Requirements</p>
                                        <div className="grid grid-cols-2 gap-y-6 gap-x-7">
                                            <div className="flex justify-between col-span-1">

                                                <p className='text-sm' style={{ 'fontWeight': '500' }}>Degree: {'Required'}</p>


                                            </div>
                                            {/* {jobs[selected].degree_required && */}
                                            <>
                                                <div className="flex justify-between col-span-1">
                                                    <p className='text-sm' style={{ 'fontWeight': '500' }}>GPA: {'3.50'}</p>
                                                </div>

                                                <div className="col-span-1">
                                                    <p className='text-sm' style={{ 'fontWeight': '600' }}>Majors</p>
                                                    <div className="mt-2 w-full  rounded-lg flex flex-wrap gap-x-1 gap-y-1">
                                                        {/* {jobs[selected].majors.map((major, index) => ( */}
                                                        <StatusTag status={'Computer Science'} />
                                                        <StatusTag status={'Data Science'} />
                                                        <StatusTag status={'Engineering'} />
                                                        <StatusTag status={'Electrical Engineering'} />
                                                        {/* // ))} */}
                                                    </div>
                                                </div>
                                            </>
                                            {/* // } */}
                                            {/* {jobs[selected].skills && */}
                                            <div className="col-span-1">
                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Skills</p>
                                                <div className="mt-2 w-full  rounded-lg flex flex-wrap gap-x-1 gap-y-1">
                                                    {/* {jobs[selected].skills.map((major, index) => ( */}
                                                    <StatusTag status={'Web Development'} />
                                                    <StatusTag status={'Object Oriented Programming'} />
                                                    <StatusTag status={'Data Structures'} />
                                                    {/* // ))} */}
                                                </div>
                                            </div>
                                            {/* } */}
                                            {/* {jobs[selected].additional_questions &&
                                            <div className="col-span-full mt-2">
                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Additional Questions</p>
                                                {jobs[selected].additional_questions.map((question, index) => (
                                                    <div key={index} className='mt-2'>
                                                        <p className='text-sm' style={{ 'fontWeight': '500' }}>{question}</p>
                                                    </div>
                                                ))}

                                            </div>

} */}
                                            <div className="col-span-full mt-2">
                                                <p className='text-sm mb-5' style={{ 'fontWeight': '600' }}>Additional Questions</p>
                                                {/* {jobs[selected].additional_questions.map((question, index) => ( */}
                                                <div className='mt-2'>
                                                    <p className='text-sm' style={{ 'fontWeight': '500' }}>{"Why do you want to work at Google?"}</p>
                                                    <p className='text-sm mt-2' style={{ 'fontWeight': '400' }}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
                                                </div>
                                                <div className='mt-2'>
                                                    <p className='text-sm' style={{ 'fontWeight': '500' }}>{"Explain a time when you made a mistake. How did you go about resolving it?"}</p>
                                                    <p className='text-sm mt-2' style={{ 'fontWeight': '400' }}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
                                                </div>

                                                {/* ))} */}

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* <div className='flex flex-col px-3 p-2'>
                                    <h1 className='text-3xl font-regular py-2 text-blue-700'>{jobs[selected].company}</h1>
                                    <p className='text-md' style={{ 'fontWeight': '600' }}>{jobs[selected].title}</p>
                                    <p className='text-md' style={{ 'fontWeight': '500' }}>{jobs[selected].location}</p>

                                    <p className='text-sm mt-5' style={{ 'fontWeight': '600' }}>Description</p>
                                    <p className='text-sm mt-2' style={{ 'fontWeight': '500' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Amet consectetur adipiscing elit pellentesque. Urna et pharetra pharetra massa massa ultricies. Iaculis nunc sed augue lacus. Sit amet consectetur adipiscing elit pellentesque. Vel facilisis volutpat est velit egestas. Dignissim enim sit amet venenatis. Non odio euismod lacinia at quis risus sed vulputate odio. Quis auctor elit sed vulputate mi sit. Amet massa vitae tortor condimentum lacinia quis. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Ut porttitor leo a diam sollicitudin. Proin sed libero enim sed faucibus turpis.
                                        Tristique magna sit amet purus gravida quis blandit turpis cursus. Consequat interdum varius sit amet mattis vulputate enim.</p>

                                    <p className='text-sm mt-5 mb-3' style={{ 'fontWeight': '600' }}>Requirements</p>
                                    <div className="grid grid-cols-2">
                                        <div className="flex flex-col  gap-y-3">

                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>GPA: 3.00</p>
                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>Degree: BSE or MSE</p>
                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>Major: Engineering, Math, Physics</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className='text-sm  mb-2' style={{ 'fontWeight': '500' }}>Skills:</p>
                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>CAD</p>
                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>Finite Element Analysis</p>
                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>Python</p>
                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>MATLAB</p>
                                        </div>
                                    </div>

                                    <p className='text-sm mt-1 mb-3' style={{ 'fontWeight': '600' }}>Application</p>
                                    <div className="grid grid-cols-2">
                                        <div className="flex flex-col gap-y-3">
                                            <div className="">
                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Name</p>
                                                <p className='text-sm' style={{ 'fontWeight': '500' }}>Haley Kang</p>
                                            </div>
                                            <div className="">
                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Skills</p>
                                                <p className='text-sm' style={{ 'fontWeight': '500' }}>MATLAB, Python, CAD</p>
                                            </div>
                                        </div>

                                        <div className="">
                                            <p className='text-sm' style={{ 'fontWeight': '600' }}>Why</p>
                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Amet consectetur adipiscing elit pellentesque.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className='grid grid-cols-2 divide-x divide-solid'>
                                    <div className="col-span-1">
                                        <button className='bg-blue-700 text-white w-full py-5'>Contact Recruiter</button>
                                    </div>
                                    <div className="col-span-1">
                                        <button className='bg-blue-700 text-white w-full py-5'>Withdraw Application</button>
                                    </div>
                                </div> */}
                            </>
                        }
                        <div className="flex justify-center w-full " style={{ 'backgroundColor': 'white' }}>

                            <button className='bg-blue text-white rounded-lg w-max py-2 px-5 mb-4'>Contact Recruiter</button>
                        </div>
                    </div>
                </div>
            </Shell>
        </div>
    )
}
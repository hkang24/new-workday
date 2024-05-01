"use client"

import { useState } from 'react';

import Shell from '../components/Shell';

import JobRow from './components/jobRow';

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
                    <div className='flex flex-col grow-0 shrink-0 w-80 h-full border border-blue-700'>
                        <h1 className='text-2xl font-regular bg-gray-100 text-center py-2 border border-blue-700'>Applied</h1>
                        <div className='flex flex-col divide-y divide-solid'>
                            {jobs.map((job, index) => {
                                return <JobRow key={index} index={index} job={job} setSelected={setSelected} selected={selected} />
                            })}
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
                                <div className='flex flex-col px-3 p-2'>
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
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Shell>
        </div>
    )
}


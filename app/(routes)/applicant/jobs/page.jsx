"use client"

import { useState, useEffect } from 'react';

import axios from 'axios';

import Shell from '../components/shell';

import JobRow from './components/jobRow';
import { LocaleRouteNormalizer } from 'next/dist/server/future/normalizers/locale-route-normalizer';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { ScrollArea } from '@/components/ui/scroll-area';

import StatusTag from '@/components/statusTag';

import ContactDialog from './components/ContactDialog';

const jobs = [
    { title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', status: 'Applied' },
    { title: 'Product Manager', company: 'Facebook', location: 'Menlo Park, CA', status: 'Applied' },
    { title: 'Consultant', company: 'ACME', location: 'Philadelphia, PA', status: 'Interview' },
]

export default function Page() {

    const supabase = createClientComponentClient();
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [contactInfo, setContactInfo] = useState(null);

    const [selected, setSelected] = useState(null);

    async function getJobs() {
        const { data: userData, error: userError } = await supabase.from('users').select('*');
        const user = userData[0];
        const { data: applicationsData, error: applicationsError } = await supabase.from('applications').select('*').eq('applicant_id', user.id);
        if (applicationsError) {
            console.log('error', applicationsError);
        }
        console.log(applicationsData);

        const uniqueApplications = applicationsData.filter((app, index, self) =>
            index === self.findIndex((t) => (
                t.job_id === app.job_id
            ))
        );


        const jobsArray = [];

        for (let i = 0; i < uniqueApplications.length; i++) {
            const { data: jobData, error: jobError } = await supabase.from('jobs').select('*').eq('id', uniqueApplications[i].job_id);
            if (jobError) {
                console.log('error', jobError);
            }
            console.log(jobData);
            jobsArray.push(jobData[0]);
        }


        console.log(jobsArray);
        setJobs(jobsArray);
        setApplications(uniqueApplications);


    }

    useEffect(() => {
        if (selected !== null) {
            async function getRecruiter() {
                const response = await axios.get(`/api/getRecruiter?id=${jobs[selected].recruiter_id}`);
                console.log('response', response);
                setContactInfo(response.data);
            }
            getRecruiter();
        }
        
    }, [selected]);

    useEffect(() => {
        getJobs();
    }, []);


    return (
        <div>
            <Shell>
                <div className='flex flex-row h-full'>
                    <div className='flex flex-col grow-0 shrink-0 w-80 h-full min-h-screen border border-blue bg-white'>
                        <h1 className='text-2xl font-regular text-center py-2 border border-blue bg-blue text-white rounded-b-lg h-full'>Applied</h1>
                        <div className='flex flex-col divide-y divide-solid bg-white h-full'>
                            {jobs.map((job, index) => {
                                return <JobRow key={index} index={index} job={job} setSelected={setSelected} selected={selected} application={applications[index]} />
                            })}
                            <hr />
                            {/* <JobRow job={{ title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', status: 'Applied' }} />
                            <JobRow job={{ title: 'Product Manager', company: 'Facebook', location: 'Menlo Park, CA', status: 'Applied' }} />
                            <JobRow job={{ title: 'Consultant', company: 'ACME', location: 'Philadelphia, PA', status: 'Interview' }} /> */}

                        </div>
                    </div>
                    <div className="flex flex-col justify-between grow  relative">
                        {selected === null || jobs.length === 0 ?
                            <div className='flex justify-center items-center h-full'>No job selected</div>
                            :
                            <>


                                <div className="flex flex-col grow relative" style={{ 'backgroundColor': 'white' }}>
                                    <h1 className='border-b flex items-center justify-between w-full grow-0 text-2xl font-regular h-[3.3rem] rounded-b-md  px-5 text-white bg-blue'><span>{'Software Engineer'}</span></h1>
                                    <ScrollArea className={`flex flex-col p-5 ${jobs[selected].contact ? 'h-[87vh]' : 'h-[92vh]'}`}>
                                        <p className='text-md' style={{ 'fontWeight': '600' }}>{jobs[selected].company}</p>
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
                                                                <StatusTag status={major} />
                                                            ))

                                                            }
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {jobs[selected].skills &&
                                                <div className="col-span-1">
                                                    <p className='text-sm text-black' style={{ 'fontWeight': '600' }}>Skills</p>
                                                    <div className="mt-2 w-full  rounded-lg flex flex-wrap gap-x-1 gap-y-1">
                                                        {jobs[selected].skills.map((major, index) => (
                                                            <StatusTag status={major} />
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            }
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

                                            <hr className='col-span-full' />
                                            <p className='text-md col-span-full' style={{ 'fontWeight': '600' }}>Your Application</p>
                                            {jobs[selected] && jobs[selected].degree_required && applications[selected] &&
                                                <>
                                                    {applications[selected].school &&
                                                        <div className="flex justify-between col-span-1">
                                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>School: {applications[selected].school}</p>
                                                        </div>
                                                    }
                                                    {applications[selected].major &&
                                                        <div className="flex justify-between col-span-1">
                                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>Major: {applications[selected].major}</p>
                                                        </div>
                                                    }
                                                    {applications[selected].gpa &&
                                                        <div className="flex justify-between col-span-1">
                                                            <p className='text-sm' style={{ 'fontWeight': '500' }}>GPA: {applications[selected].gpa}.00</p>
                                                        </div>
                                                    }

                                                </>
                                            }
                                            {applications[selected].skills &&



                                                <div className="col-span-full">
                                                    <p className='text-sm' style={{ 'fontWeight': '600' }}>Skills</p>
                                                    <div className="mt-2 w-full  rounded-lg flex flex-wrap gap-x-1 gap-y-1">
                                                        {applications[selected].skills.map((skill, index) => (
                                                            <StatusTag status={skill} />
                                                        ))

                                                        }
                                                    </div>
                                                </div>

                                            }
                                            <div className="col-span-full mt-2">
                                                <p className='text-sm mb-5' style={{ 'fontWeight': '600' }}>Additional Questions</p>
                                                {applications[selected].question_answers.map((question, index) => (
                                                    <div className='mt-2'>
                                                        <p className='text-sm' style={{ 'fontWeight': '500' }}>{question.question}</p>
                                                        <p className='text-sm mt-2' style={{ 'fontWeight': '400' }}>{question.answer}</p>
                                                    </div>


                                                ))}

                                            </div>

                                        </div>
                                    </ScrollArea>
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
                        {selected !== null && jobs.length > 0 && jobs[selected].contact && contactInfo &&
                            <div className="flex justify-center w-full mb-5" style={{ 'backgroundColor': 'white' }}>

                                <ContactDialog contactInfo={contactInfo} />
                            </div>

                        }
                    </div>
                </div>
            </Shell>
        </div>
    )
}
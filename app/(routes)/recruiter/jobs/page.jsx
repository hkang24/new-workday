"use client"

import { useState } from 'react';

import Shell from '../components/shell';

import JobRow from './components/jobRow';

import styles from './styles.module.css';

const jobs = [
    { title: 'Software Engineer', created: '1 mo ago', numApplicants: "153 applicants", status: '23 unseen', location: "San Francisco, CA" },
    { title: 'Manufacturing Engineer', created: '2 mo ago', numApplicants: "70 applicants", status: '5 unseen', location: "Philadlephia, PA" },
    { title: 'Electrical Engineer', created: '5 mo ago', numApplicants: "700 applicants", status: 'Fulfilled', location: "Baltimore, MD" },

]

const applicants = [
    { name: 'Haley Smith', school: 'Stanford', major: 'CS', gpa: '3.7' },
    { name: 'John Doe', school: 'Harvard', major: 'Bio', gpa: '3.5' },
    { name: 'Jane Smith', school: 'Yale', major: 'Psych', gpa: '3.8' },
]

export default function JobsRecruiter() {

    const [selected, setSelected] = useState(null);

    const [selectedApplicant, setSelectedApplicant] = useState(null);


    return (
        <div>
            <Shell>
                <div className='flex flex-row min-h-screen'>
                    <div className='flex flex-col grow-0 shrink-0 w-80 min-h-screen border border-blue bg-white'>
                        <h1 className='text-2xl font-regular text-center py-2 border border-blue bg-blue text-white py-3 rounded-b-lg'>Jobs</h1>
                        <div className='flex flex-col divide-y divide-solid'>
                            {jobs.map((job, index) => {
                                return <JobRow key={index} index={index} job={job} setSelected={setSelected} selected={selected} />
                            })}
                            <hr/>
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
                                <div className='grow flex flex-col px-3 p-2'>
                                    <h1 className='grow-0 text-3xl font-regular py-2 text-blue-700'>{jobs[selected].title}</h1>
                                    <p className=' grow-0 text-md' style={{ 'fontWeight': '500' }}>{jobs[selected].location}</p>
                                    <div className="grow grid grid-cols-2 h-full border border-blue-700 rounded-2xl divide-x divide-solid">
                                        <div className="col-span-1 ">
                                            <table className="min-w-full divide-y divide-gray-300 grow-0 rounded-2xl overflow-hidden">
                                                <thead className="bg-gray-50 rounded-2xl overflow-hidden">
                                                    <tr className='rounded-2xl'>
                                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-thin text-gray-900 sm:pl-6">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-thin text-gray-900" style={{ 'width': '5rem' }}>
                                                            School
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-thin text-gray-900">
                                                            Major
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-thin text-gray-900">
                                                            GPA
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">

                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                    {applicants.map((applicant) => (
                                                        <tr key={applicant.name} onClick={() => setSelectedApplicant(applicant)}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                {applicant.name}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-12">{applicant.school}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{applicant.major}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{applicant.gpa}</td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                    See more
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div>
                                        <div className="col-span-1">
                                            {selectedApplicant === null ?
                                                <div className='flex justify-center items-center h-full'>No applicant selected</div>
                                                :
                                                <div className='p-3 flex flex-col justify-between h-full'>
                                                    <div>
                                                        <h2 className='text-2xl font-regular mb-3'> {selectedApplicant.name} </h2>
                                                        <div className="flex flex-col gap-y-3">
                                                            <div className="">
                                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Skills</p>
                                                                <p className='text-sm' style={{ 'fontWeight': '500' }}>MATLAB, Python, CAD</p>
                                                            </div>
                                                            <div className="">
                                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>GPA</p>
                                                                <p className='text-sm' style={{ 'fontWeight': '500' }}>{selectedApplicant.gpa}</p>
                                                            </div>
                                                            <div className="">
                                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Degree</p>
                                                                <p className='text-sm' style={{ 'fontWeight': '500' }}>BSE</p>
                                                            </div>
                                                            <div className="">
                                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Major</p>
                                                                <p className='text-sm' style={{ 'fontWeight': '500' }}>{selectedApplicant.major}</p>
                                                            </div>

                                                            <div className="">
                                                                <p className='text-sm' style={{ 'fontWeight': '600' }}>Why</p>
                                                                <p className='text-sm' style={{ 'fontWeight': '500' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Amet consectetur adipiscing elit pellentesque.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className='text-blue-700 border border-blue-700 py-2 px-8 rounded-2xl'>Contact Applicant</button>
                                                </div>}

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
        </div >
    )
}

/*

                            </div>
                            </div>
                            <div className="flex flex-col justify-between grow  relative">
                                {selected === null ?
                                    <div className='flex justify-center items-center h-full'>No job selected</div>
                                    :
                                    <>
                                        <div className='grow flex flex-col px-3 p-2'>
                                            <h1 className='grow-0 text-3xl font-regular py-2 text-blue'>{jobs[selected].title}</h1>
                                            <p className=' grow-0 text-md' style={{ 'fontWeight': '500' }}>{jobs[selected].location}</p>
                                            <div className="grow grid grid-cols-2 h-full border border-blue- rounded-2xl divide-x divide-solid">
                                                <div className="col-span-1 ">
                                                    <table className="min-w-full divide-y divide-gray-300 grow-0 rounded-2xl overflow-hidden">
                                                        <thead className="bg-gray-50 rounded-2xl overflow-hidden">
                                                            <tr className='rounded-2xl'>
                                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-thin text-gray-900 sm:pl-6">
                                                                    Name
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-thin text-gray-900" style={{ 'width': '5rem' }}>
                                                                    School
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-thin text-gray-900">
                                                                    Major
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-thin text-gray-900">
                                                                    GPA
                                                                </th>
                                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
        
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                            {applicants.map((applicant) => (
                                                                <tr key={applicant.name} onClick={() => setSelectedApplicant(applicant)}>
                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                        {applicant.name}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-12">{applicant.school}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{applicant.major}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{applicant.gpa}</td>
                                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                            See more
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
        
                                                </div>
                                                <div className="col-span-1">
                                                    {selectedApplicant === null ?
                                                        <div className='flex justify-center items-center h-full'>No applicant selected</div>
                                                        :
                                                        <div className='p-3 flex flex-col justify-between h-full'>
                                                            <div>
                                                                <h2 className='text-2xl font-regular mb-3'> {selectedApplicant.name} </h2>
                                                                <div className="flex flex-col gap-y-3">
                                                                    <div className="">
                                                                        <p className='text-sm' style={{ 'fontWeight': '600' }}>Skills</p>
                                                                        <p className='text-sm' style={{ 'fontWeight': '500' }}>MATLAB, Python, CAD</p>
                                                                    </div>
                                                                    <div className="">
                                                                        <p className='text-sm' style={{ 'fontWeight': '600' }}>GPA</p>
                                                                        <p className='text-sm' style={{ 'fontWeight': '500' }}>{selectedApplicant.gpa}</p>
                                                                    </div>
                                                                    <div className="">
                                                                        <p className='text-sm' style={{ 'fontWeight': '600' }}>Degree</p>
                                                                        <p className='text-sm' style={{ 'fontWeight': '500' }}>BSE</p>
                                                                    </div>
                                                                    <div className="">
                                                                        <p className='text-sm' style={{ 'fontWeight': '600' }}>Major</p>
                                                                        <p className='text-sm' style={{ 'fontWeight': '500' }}>{selectedApplicant.major}</p>
                                                                    </div>
        
                                                                    <div className="">
                                                                        <p className='text-sm' style={{ 'fontWeight': '600' }}>Why</p>
                                                                        <p className='text-sm' style={{ 'fontWeight': '500' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Amet consectetur adipiscing elit pellentesque.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button className='text-blue-700 border border-blue-700 py-2 px-8 rounded-2xl'>Contact Applicant</button>
                                                        </div>}
        
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
*/
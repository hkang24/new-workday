"use client"

import { useState, useEffect } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import Shell from '../components/shell';

import JobRow from './components/jobRow';
import axios from 'axios';

import styles from './styles.module.css';

import StatusTag from '@/components/statusTag';

import { ScrollArea } from '@/components/ui/scroll-area';
import InterviewDialog from './components/InterviewDialog';
import HireDialog from './components/HireDialog';
import RejectDialog from './components/RejectDialog';
import ContactDialog from './components/ContactDialog';

const jobs = [
    { title: 'Software Engineer', created: '1 mo ago', numApplicants: "153 applicants", status: '23 unseen', location: "San Francisco, CA" },
    { title: 'Manufacturing Engineer', created: '2 mo ago', numApplicants: "70 applicants", status: '5 unseen', location: "Philadlephia, PA" },
    { title: 'Electrical Engineer', created: '5 mo ago', numApplicants: "700 applicants", status: 'Fulfilled', location: "Baltimore, MD" },

]

const applicants = [
    { name: 'Haley Smith', school: 'Stanford', major: 'CS', gpa: '3.7' },
    { name: 'John Doe', school: 'Harvard', major: 'Bio', gpa: '3.5' },
    { name: 'Jane Smith', school: 'Yale', major: 'Psych', gpa: '3.8' },
    { name: 'John Smith', school: 'Harvard', major: 'Biology', gpa: '3.9' },
    { name: 'Jake Smith', school: 'MIT', major: 'Chem', gpa: '3.7' },
    { name: 'Julia Smith', school: 'Stanford', major: 'Physics', gpa: '3.6' },
    { name: 'Jasmine Smith', school: 'Princeton', major: 'Math', gpa: '3.85' },
    { name: 'Jared Smith', school: 'Columbia', major: 'Econ', gpa: '3.75' },
    { name: 'Joan Smith', school: 'Brown', major: 'English', gpa: '3.8' },
    { name: 'Jeremy Smith', school: 'Cornell', major: 'History', gpa: '3.82' },
]

export default function JobsRecruiter() {

    const supabase = createClientComponentClient();

    const [user, setUser] = useState(null);
    const [selected, setSelected] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState(null);
    const [applicationsInfo, setApplicationsInfo] = useState([]);
    const [selectedContactInfo, setSelectedContactInfo] = useState(null);


    const [selectedApplicant, setSelectedApplicant] = useState(null);

    async function getJobs() {
        const userData = await supabase.from('users').select('*');
        console.log(userData);
        setUser(userData.data[0]);

        const { data, error } = await supabase.from('jobs').select('*').eq('recruiter_id', userData.data[0].id);
        if (error) console.log('error', error);
        else {
            console.log(data);
            setJobs(data);
            if (data.length > 0) {
                const applicationsArr = [];

                for (let i = 0; i < data.length; i++) {
                    let numApplicants = 0;
                    console.log(data[i].id);
                    const { data: numData, error: numError } = await supabase.from('applications').select('*').eq('job_id', data[i].id);
                    if (numError) console.log('error', numError);
                    else {
                        console.log("numData", numData);
                        numApplicants = numData.length;
                    }
                    if (data[i].status === 'Open') {
                        const { data: applicantsData, error: applicantsError } = await supabase.from('applications').select('*').eq('job_id', data[i].id).eq('status', 'Unseen');
                        if (applicantsError) console.log('error', applicantsError);
                        else {
                            console.log(applicantsData);

                            applicationsArr.push({ status: (applicantsData.length + ' Unseen'), numApplicants: numApplicants });
                        }


                    } else {
                        applicationsArr.push({ status: data[i].status, numApplicants: numApplicants });
                    }

                }
                console.log(applicationsArr);
                setApplicationsInfo(applicationsArr);

            }
        }
    }

    async function changeApplicationStatus(status) {
        const selectedApplicantCopy = { ...selectedApplicant };
        selectedApplicantCopy.status = status;
        setSelectedApplicant(selectedApplicantCopy);
        const { data, error } = await supabase.from('applications').update({ status: status }).match({ id: selectedApplicant.id });
        if (error) console.log('error', error);
        else {
            console.log(data);
            if (status === 'Rejected') {
                const applicationsInfoCopy = [...applicationsInfo];

                applicationsInfoCopy[selected].numApplicants = applicationsInfoCopy[selected].numApplicants - 1;
                setApplicationsInfo(applicationsInfoCopy);
            } else if (status === 'Hired') {
                const applicationsInfoCopy = [...applicationsInfo];
                applicationsInfoCopy[selected].status = 'Fulfilled';
                setApplicationsInfo(applicationsInfoCopy);
                const jobsCopy = [...jobs];
                jobsCopy[selected].status = 'Fulfilled';
                setJobs(jobsCopy);
                const { data, error } = await supabase.from('jobs').update({ status: 'Fulfilled' }).match({ id: jobs[selected].id });
                if (error) console.log('error', error);
                else {
                    console.log(data);
                }
            }
        }

        const applicantsCopy = [...applicants];
        applicantsCopy.forEach((applicant, index) => {
            if (applicant.id === selectedApplicant.id) {
                applicant.status = status;
            }
        });
        setApplicants(applicantsCopy);
    }


    useEffect(() => {
        if (selected !== null) {
            const getApps = async () => {
                const { data, error } = await supabase.from('applications').select('*').eq('job_id', jobs[selected].id);
                if (error) console.log('error', error);
                else {
                    console.log(data);
                    setApplicants(data);
                }
            }
            getApps();
        }
        setSelectedApplicant(null);

    }, [selected]);

    useEffect(() => {
        if (selectedApplicant !== null) {
            if (selectedApplicant.status === 'Unseen') {
                const updateApp = async () => {
                    console.log(selectedApplicant.id);
                    const { data, error } = await supabase.from('applications').update({ status: 'Seen' }).match({ id: selectedApplicant.id });
                    if (error) console.log('error', error);
                    else {
                        console.log(data);
                    }
                }
                updateApp();
                const applicantsCopy = [...applicants];
                applicantsCopy.forEach((applicant, index) => {
                    if (applicant.id === selectedApplicant.id) {
                        applicant.status = 'Seen';
                    }
                });
                setApplicants(applicantsCopy);
                // setApplicationsInfo(applicationsInfoCopy);
                const numUnseen = applicationsInfo[selected].status.split(' ')[0];
                const numSeen = parseInt(numUnseen) - 1;
                setApplicationsInfo(applicationsInfo.map((info, index) => {
                    if (index === selected) {
                        return { ...info, status: numSeen + ' Unseen' };
                    }
                    return info;
                }));
            }

            const getContactInfo = async () => {
                // const { data, error } = await supabase.from('users').select('email, phone_number').eq('id', selectedApplicant.applicant_id);
                const response = await axios.get(`/api/getRecruiter?id=${selectedApplicant.applicant_id}`);
                // if (error) console.log('error', error);
                // else {
                //     console.log(data[0]);
                //     setSelectedContactInfo(data[0]);
                // }
                console.log(response.data);
                setSelectedContactInfo(response.data);
            }
            getContactInfo();
        }

    }, [selectedApplicant]);

    useEffect(() => {
        getJobs();
    }, []);


    return (
        <div>
            <Shell current='Jobs'>
                <div className='flex flex-row min-h-screen'>
                    <div className='flex flex-col grow-0 shrink-0 w-80 min-h-screen border border-gray-200 bg-white'>
                        <h1 className='text-2xl font-regular text-center py-2 border border-blue bg-blue text-white py-3 rounded-b-lg'>Jobs</h1>
                        <div className='flex flex-col divide-y divide-solid'>
                            {jobs && jobs.length > 0 && applicationsInfo && applicationsInfo.length > 0 &&

                                jobs.map((job, index) => {
                                    return <JobRow key={index} index={index} job={job} setSelected={setSelected} selected={selected} numApplicants={applicationsInfo[index].numApplicants} status={applicationsInfo[index].status} />
                                })

                            }
                            <hr />
                            {/* <JobRow job={{ title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', status: 'Applied' }} />
                            <JobRow job={{ title: 'Product Manager', company: 'Facebook', location: 'Menlo Park, CA', status: 'Applied' }} />
                            <JobRow job={{ title: 'Consultant', company: 'ACME', location: 'Philadelphia, PA', status: 'Interview' }} /> */}

                        </div>
                    </div>
                    <div className="flex flex-col justify-between grow  relative bg-white">
                        {selected === null || applicants === null ?
                            <div className='flex justify-center items-center h-full'>No job selected</div>
                            :
                            <>
                                <div className='grow flex flex-col'>
                                    <h1 className='border-b flex items-center justify-between w-full grow-0 text-2xl font-regular h-[3.8rem]  px-5 text-white bg-blue'><span>{jobs[selected].position}</span>
                                        <p className=' grow-0 text-md mt-3 text-sm mb-3' style={{ 'fontWeight': '500' }}>{jobs[selected].location}</p>
                                    </h1>
                                    <div className='grow flex flex-col'>
                                        <div className="grow grid grid-cols-2 h-full border border-gray-200 divide-x divide-solid">
                                            <div className="col-span-1 grow-0 ">
                                                <table className="min-w-full divide-y divide-gray-300 grow-0 overflow-hidden">
                                                    <thead className="bg-blue overflow-hidden text-white">
                                                        <tr className=''>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-white sm:pl-6">
                                                                Name
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-normal text-white w-12 " >
                                                                School
                                                            </th>
                                                            {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-normal text-white ">
                                                                Major
                                                            </th> */}
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-normal text-white ">
                                                                Status
                                                            </th>
                                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">

                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {applicants.map((applicant, index) => (
                                                            <tr key={index} onClick={() => setSelectedApplicant(applicant)} className={(selectedApplicant && applicant.id == selectedApplicant.id) ? 'bg-light-blue' : applicant.status === 'Hired' ? 'bg-green-100' : applicant.status === 'Rejected' ? 'bg-red-100' : ''}>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 truncate">
                                                                    {applicant.first_name} {applicant.last_name}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-12 truncate overflow-hidden" style={{ maxWidth: '8rem', textOverflow: 'ellipsis' }}>
                                                                    {applicant.school}
                                                                </td>
                                                                {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate">{applicant.major}</td> */}
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{applicant.status}</td>
                                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                    <a href="#" className="text-blue hover:text-dark-blue">
                                                                        See more
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </table>
                                                <hr className='w-full' />

                                            </div>
                                            <div className="col-span-1">
                                                {selectedApplicant === null ?
                                                    <div className='flex justify-center items-center h-full'>No applicant selected</div>
                                                    :
                                                    <div className='p-5 flex flex-col justify-between h-full'>
                                                        <ScrollArea className='h-[80vh]'>
                                                            <h2 className='text-2xl font-regular mb-6'> {selectedApplicant.first_name} {selectedApplicant.last_name} </h2>
                                                            <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                                                                <div className="col-span-1">
                                                                    <p className='text-sm' style={{ 'fontWeight': '600' }}>Major</p>
                                                                    <p className='text-sm' style={{ 'fontWeight': '500' }}>{selectedApplicant.major}</p>
                                                                </div>
                                                                <div className="col-span-1">
                                                                    <p className='text-sm' style={{ 'fontWeight': '600' }}>GPA</p>
                                                                    <p className='text-sm' style={{ 'fontWeight': '500' }}>{selectedApplicant.gpa}.00</p>
                                                                </div>

                                                                <div className="col-span-2">
                                                                    <p className='text-sm' style={{ 'fontWeight': '600' }}>Skills</p>
                                                                    <div className="mt-2 w-full  rounded-lg flex flex-wrap gap-x-1 gap-y-1">
                                                                        {selectedApplicant.skills.map((skill, index) => (
                                                                            <StatusTag key={index} status={skill} />
                                                                        ))}

                                                                        {/* <StatusTag key={0} status={'MATLAB'} />
                                                                        <StatusTag key={1} status={'Python'} />
                                                                        <StatusTag key={2} status={'CAD'} />
                                                                        <StatusTag key={3} status={'React'} />
                                                                        <StatusTag key={4} status={'Public Speaking'} />
                                                                        <StatusTag key={5} status={'HTML'} />
                                                                        <StatusTag key={6} status={'JavaScript'} />
                                                                        <StatusTag key={7} status={'CSS'} /> */}


                                                                    </div>

                                                                </div>

                                                                {selectedApplicant.question_answers.map((answer, index) => (
                                                                    <div key={index} className="col-span-2">
                                                                        <p className='text-sm' style={{ 'fontWeight': '600' }}>{answer.question}</p>
                                                                        <p className='text-sm' style={{ 'fontWeight': '500' }}>{answer.answer}</p>
                                                                    </div>
                                                                ))}



                                                            </div>
                                                        </ScrollArea>
                                                        <div className="flex w-full justify-around">
                                                            {(selectedApplicant.status === 'Unseen' || selectedApplicant.status === 'Seen' && jobs[selected].status === 'Open') ?
                                                                <>
                                                                    <InterviewDialog contactInfo={selectedContactInfo} changeStatus={changeApplicationStatus} />
                                                                    <RejectDialog contactInfo={selectedContactInfo} changeStatus={changeApplicationStatus} />
                                                                </>
                                                                : (selectedApplicant.status === 'Interview' && jobs[selected].status === 'Open') ?
                                                                    <>
                                                                        <HireDialog contactInfo={selectedContactInfo} changeStatus={changeApplicationStatus} />
                                                                        <RejectDialog contactInfo={selectedContactInfo} changeStatus={changeApplicationStatus} />
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <ContactDialog contactInfo={selectedContactInfo} />
                                                                    </>


                                                            }
                                                            {/* <button className='bg-orange hover:bg-yellow text-white font-medium py-2 px-8 rounded-2xl text-sm'>Contact Applicant</button> */}
                                                        </div>
                                                    </div>}

                                            </div>
                                        </div>
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
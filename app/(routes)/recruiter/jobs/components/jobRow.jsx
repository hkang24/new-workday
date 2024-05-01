

import StatusTag from "@/components/statusTag"

export default function JobRow({ job , index, setSelected, selected}) {
    return (
        <div className={'flex flex-col p-3' + ' ' + (selected === index ? 'bg-light-blue' : '')} onClick={() => setSelected(index)}>
            <div className='flex flex-row justify-between'>
                <h2 className='text-md font-regular self-center'>{job.title}</h2>
                <p className='text-sm self-center'>{job.created}</p>
                {/* <div className='flex flex-col'>
                    <h2 className='text-md font-regular'>{job.title}</h2>
                    <p className='text-sm'>{job.company}</p>
                </div>
                <div className='flex flex-col'>
                    <p className='text-sm'>{job.location}</p>
                    {/* <p className='text-sm'>{job.type}</p> */}
                {/* </div> */}
            </div>
            <div className="flex flex-row justify-between mb-2">
                <p className='text-sm'>{job.numApplicants}</p>
            </div>
            <StatusTag status={job.status} />
        </div>
    )
}
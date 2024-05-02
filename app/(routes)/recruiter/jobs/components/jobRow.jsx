

import StatusTag from "@/components/statusTag"

export default function JobRow({ job , index, setSelected, selected, numApplicants, status}) {

    const getWeeksAgo = (date) => {
        const currentDate = new Date();
        const jobDate = new Date(date);
        const diffTime = Math.abs(currentDate - jobDate);
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
        return diffWeeks;
    }


    return (
        <div className={'flex flex-col p-3' + ' ' + (selected === index ? 'bg-light-blue' : '')} onClick={() => setSelected(index)}>
            <div className='flex flex-row justify-between'>
                <h2 className='text-md font-regular self-center'>{job.position}</h2>
                <p className='text-sm self-center'>{getWeeksAgo(job.created_at) + ' weeks ago'}</p>
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
                <p className='text-sm'>{numApplicants} applicants</p>
            </div>
            <StatusTag status={status} />
        </div>
    )
}
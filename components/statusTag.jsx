

export default function StatusTag({ status }) {
    return (
        <div className={' w-max text-white px-4 py-1 h-min' + ' ' +  (status === 'Unseen' ? 'bg-gray-500' : status === 'Seen' ? 'bg-yellow' : status === 'Interview' ? 'bg-blue' : status === 'Hired' || status === 'Fulfilled'? 'bg-emerald-600': status === 'Rejected' ? 'bg-red-500': 'bg-yellow')} style={{'borderRadius': '10rem'}}>
            <p className='text-xs'>{status}</p>
        </div>
    )
}


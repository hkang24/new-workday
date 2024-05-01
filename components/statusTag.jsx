

export default function StatusTag({ status }) {
    return (
        <div className={' w-max text-white px-4 py-1 h-min' + ' ' +  (status === 'Applied' ? 'bg-orange' : status === 'Fulfilled' ? 'bg-blue' : 'bg-yellow')} style={{'borderRadius': '10rem'}}>
            <p className='text-xs'>{status}</p>
        </div>
    )
}


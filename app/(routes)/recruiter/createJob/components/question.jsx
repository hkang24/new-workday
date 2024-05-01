

export default function Question({children , onDelete}) {
    return (
        <div className="w-full border border-gray-200 bg-gray-50 flex text-dark-blue rounded-md text-sm flex justify-between">
            <span className='py-2 px-3'>
            {children}
            </span>
            <button onClick={onDelete} type='button' className=' px-4  bg-blue text-white rounded-r-md'>
                Delete
            </button>
        </div>
    )
}


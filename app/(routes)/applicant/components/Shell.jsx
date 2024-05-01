const navigation = [
    { name: 'Jobs', href: '/applicant/jobs', current: true },
    { name: 'Explore', href: '/applicant/explore', current: false },

]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Shell({ children }) {
    return (
        <div className="flex flex-row h-screen">
            <nav className="flex flex-col justify-center w-40 bg-gray-100 h-full rounded-r-xl" aria-label="Sidebar">
                <ul role="list" className="mx-2 space-y-1">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className={classNames(
                                    // item.current ? 'bg-white text-blue-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'bg-white text-blue-600 group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
                                )}

                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex flex-col w-full">
                <h1 className="bg-blue-800 text-white text-2xl font-semibold w-full h-20 self-center content-center px-8">Welcome Back, Haley</h1>
                {children}
            </div>
            
        </div>
    )
}


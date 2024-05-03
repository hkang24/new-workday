

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function HireDialog({ contactInfo, changeStatus }) {
    return (
        <AlertDialog onOpenChange={() => changeStatus('Hired')}>
            <AlertDialogTrigger>
                <button className='bg-orange hover:bg-yellow text-white font-medium py-2 px-8 rounded-2xl text-sm'>Hire</button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[25rem]'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Applicant Contact Info</AlertDialogTitle>
                </AlertDialogHeader>
                {contactInfo &&
                    <AlertDialogDescription className='py-5'>
                        <div className="grid grid-cols-2 gap-x-10">
                            <div className="col-span-1">
                                <p className="font-medium text-black">Email</p>
                                <p>{contactInfo.email}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="font-medium text-black">Phone Number</p>
                                <p>{contactInfo.phone_number}</p>
                            </div>
                        </div>
                        {/* <p>{contactInfo.email}</p>
                        <p>{contactInfo.phone_number}</p> */}
                    </AlertDialogDescription>
                }
                <AlertDialogFooter>
                    <AlertDialogCancel className='bg-blue hover:bg-dark-blue text-white font-medium text-sm hover:text-white'>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


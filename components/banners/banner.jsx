
import {useState, useEffect} from 'react'


export default function Banner({children}) {
    

    

    
    
    return (
        <div className="absolute flex justify-center items-center content-center  w-full  mt-6 top-0">
            <div className={"flex justify-center bg-light-blue w-1/3 p-5 rounded-xl shadow shadow-lg border border-blue"}>
            
            <p className="text-blue text-sm ml-2">{children}</p>
            </div>
        </div>
        )
}
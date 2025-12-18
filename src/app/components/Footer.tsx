'use client'

import Image from "next/image"

export const Footer: React.FC = ()=>{
    return(
        <>
            <div className="flex justify-between items-center dark:bg-[#16142c] px-4 py-3 opacity-75">
                <div>
                    <a href="https://amansinha.vercel.app/" className="hover:underline" target="_blank">Aman Sinha</a>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}
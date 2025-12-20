'use client'

import Image from "next/image"
import Link from "next/link"

export const Footer: React.FC = ()=>{
    return(
        <>
            <div className="flex justify-between items-center dark:bg-[#16142c] px-4 py-3 opacity-75">
                <div>
                    <a href="https://amansinha.vercel.app/" className="hover:underline" target="_blank">Aman Sinha</a>
                </div>
                <div>
                    <Link href="https://github.com/amangh30" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/github-mark.png"
                        alt="GitHub"
                        width={40}
                        height={40}
                        style={{ cursor: "pointer" }}
                    />
                    </Link>                
                </div>
            </div>
        </>
    )
}
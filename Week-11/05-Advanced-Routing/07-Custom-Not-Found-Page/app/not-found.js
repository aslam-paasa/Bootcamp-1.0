import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const NotFoundPage = () => {
    return (
        <div className='flex fkex-col items-center justify-center h-screen bg-white text-black'>
            <Image src={"../public/not-found.svg"} alt='Not-Found-Image' height={400} width={400} />
            
            <Link href={"/"} className='px-3 py-3 bg-indigo-500 mt-10 rounded-lg text-white font-bold'>
                Back to Home
            </Link>
        </div>
    )
}

export default NotFoundPage

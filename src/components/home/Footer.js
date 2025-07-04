import { mono } from '@/lib/font'
import React from 'react'

export default function Footer() {
    return (
        <div className='flex flex-col  lg:flex-row justify-between items-center shadow-2xl shadow-black mt-5 py-5 px-12 text-gray-500'>
            <ul className='flex flex-col lg:flex-row gap-3 font-bold'>
                <li className={mono.className}>Privacy policy</li>
                <li className={mono.className}>Contact Us</li>
                <li className={mono.className}>Terms & Condition</li>
            </ul>
            <ul className='flex gap-3 font-bold'><span className={mono.className}>Courier_Service@2025</span></ul>
        </div>
    )
}



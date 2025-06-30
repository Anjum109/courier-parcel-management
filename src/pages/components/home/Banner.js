import Image from 'next/image'
import React from 'react'
import img from '../../../assets/home.jpg'
import Link from 'next/link'
import { FaBoxTissue } from "react-icons/fa";

export default function Banner() {
    return (
        <div>
            <div className='grid grid-cols-2 gap-5 ] px-[300px] pt-[100px]'>
                <Image src={img} alt='img' />
                <div>
                    <h1 className='text-[40px] pt-20 font-bold'>Fast, Reliable, and Real Time Courier Management</h1>
                    <p className='text-[12px]'>Book parcels, assign agents, track deliveries in real time- all in one platform.</p>
                    <div className='flex gap-3 mt-5'>
                        <Link href='/login/login'>  <button className='py-1 px-3 border-2 rounded-xl bg-cyan-900 text-cyan-100'>Log in as Customer</button></Link>
                        <Link href='/login/login'>  <button className='py-1 px-3  rounded-xl text-cyan-900 bg-cyan-100 font-bold'>Log in as Delivery Agent</button></Link>
                    </div>
                </div>
            </div>
            <div className='mt-[50px] grid-cols-4 px-[300px]'>
                <div>
                    <FaBoxTissue />
                    <h1>Book a percel pickup</h1>
                </div>
            </div>
        </div>
    )
}

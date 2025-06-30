import Image from 'next/image'
import React from 'react'
import img from '../../../assets/home.jpg'
import Link from 'next/link'
import { FaBoxTissue } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { FaStackOverflow } from "react-icons/fa6";
export default function Banner() {
    return (
        <div className='pt-[50px] px-[300px]'>
            <div className='grid grid-cols-2 gap-5 ] '>
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
            <div className=' grid grid-cols-4  gap-5'>
                <div className='border-2 py-8 px-2 border-gray-400 rounded-xl'>
                    <div className='text-[40px] flex justify-center text-cyan-950'>
                        <FaBoxTissue />
                    </div>
                    <h1 className='text-[18px] text-cyan-800 font-bold text-center mt-3'>Book a percel pickup</h1>
                </div>
                <div className='border-2 py-8 px-2 border-gray-400 rounded-xl'>
                    <div className='text-[40px] flex justify-center text-cyan-950'>
                        <FaLocationDot /></div>
                    <h1 className='text-[18px] text-cyan-800 font-bold text-center mt-3'>Real Time Tracking</h1>
                </div>
                <div className='border-2 py-8 px-2 border-gray-400 rounded-xl'>
                    <div className='text-[40px] flex justify-center text-cyan-950'>
                        <IoPersonSharp /></div>
                    <h1 className='text-[18px] text-cyan-800 font-bold text-center mt-3'>Delivery Agent Management</h1>
                </div>
                <div className='border-2 py-8 px-2 border-gray-400 rounded-xl'>
                    <div className='text-[40px] flex justify-center text-cyan-950'>
                        <FaStackOverflow /></div>
                    <h1 className='text-[18px] text-cyan-800 font-bold text-center mt-3'>Advanced Analytics And Reports</h1>
                </div>
            </div>
            {/* how it works  */}
            <div className='mt-12'>
                <h1 className='text-[40px] font-bold text-cyan-900 underline'>How it Works</h1>
                <div className=' grid grid-cols-3  gap-5'>
                    <div className=' py-8 px-2 rounded-xl'>
                        <div className='text-[20px] flex justify-center text-cyan-950'>
                            <button className='w-[30px] h-[30px] rounded-full bg-cyan-900 text-white flex justify-center items-center'>1</button>
                        </div>
                        <h1 className='text-[18px] text-cyan-800 font-bold text-center mt-3'>Create An Account</h1>
                    </div>
                    <div className='py-8 px-2  rounded-xl'>
                        <div className='text-[20px] flex justify-center text-cyan-950'>
                            <button className='w-[30px] h-[30px] rounded-full bg-cyan-900 text-white flex justify-center items-center'>2</button></div>
                        <h1 className='text-[18px] text-cyan-800 font-bold text-center mt-3'>Book And Assign Parcel</h1>
                    </div>
                    <div className=' py-8 px-2  rounded-xl'>
                        <div className='text-[20px] flex justify-center text-cyan-950'>
                            <button className='w-[30px] h-[30px] rounded-full bg-cyan-900 text-white flex justify-center items-center'>3</button></div>
                        <h1 className='text-[18px] text-cyan-800 font-bold text-center mt-3'>Track Deliveries Live</h1>
                    </div>

                </div>
            </div>
        </div>
    )
}

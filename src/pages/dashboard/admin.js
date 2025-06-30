
import React, { useState } from 'react'
import Metrics from '../components/home/navbar/admin/Metrics';
import AllParcel from '../components/home/navbar/admin/AllParcel';
import UserManagement from '../components/home/navbar/admin/UserManagement';
import Reports from '../components/home/navbar/admin/Reports';


export default function admin() {

    return (
        <div className='m-5'>
            <div className='flex justify-center w-full border-2 border-gray-300 rounded-xl'>
                {/* left side  */}
                <div className='lg:w-[20%] bg-cyan-900 p-5 rounded-l-xl'>
                    <h1 className='text-white text-[20px] font-bold text-center'>Hi Admin *username</h1>
                    <ul className='text-white text-[18px] flex flex-col gap-3 mt-5'>
                        <li className='border-white border-2 p-1 hover:bg-gray-200 hover:text-gray-700 hover:font-bold'>Dashboard</li>
                        <li className='border-white border-2 p-1 hover:bg-gray-200 hover:text-gray-700 hover:font-bold'>All percels</li>
                        <li className='border-white border-2 p-1 hover:bg-gray-200 hover:text-gray-700 hover:font-bold'>Metrics</li>
                        <li className='border-white border-2 p-1 hover:bg-gray-200 hover:text-gray-700 hover:font-bold'>Reports</li>
                        <li className='border-white border-2 p-1 hover:bg-gray-200 hover:text-gray-700 hover:font-bold'>User Management</li>
                    </ul>
                </div>
                {/* right side  */}
                <div className='lg:w-[80%] bg-white rounded-r-xl'>
                    {/* <metrics  */}
                    <div className='grid grid-cols-2'>
                        <Metrics />
                        <Reports />
                    </div>
                    {/* all parcels  */}
                    <div className='grid grid-cols-2'>
                        <AllParcel />
                        <UserManagement />
                    </div>

                </div>
            </div>
        </div>
    )
}

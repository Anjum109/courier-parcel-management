import React from 'react'

export default function Metrics() {
    return (
        <div>
            <div >
                <div className='m-5 bg-cyan-50 rounded-xl'>
                    <h1 className='text-cyan-700 font-bold text-[20px] p-4'>Metrics</h1>
                    <div className='grid grid-cols-3 gap-2 p-4'>
                        <p className='border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold text-cyan-700'>Count Daily Bookings</p>
                        <p className='border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold text-cyan-700'>Count COD Total</p>
                        <p className='border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold text-cyan-700'>Count Failed Deliverys</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React from 'react'

export default function Reports() {
    return (
        <div>
            <div className="m-4 bg-cyan-50 p-4 rounded-xl">
                <h2 className="text-lg font-semibold  text-cyan-700">Reports</h2>
                <div className='grid grid-cols-1 gap-3 p-4'>
                    <p className='border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold text-cyan-700'>Export CSV</p>
                    <p className='border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold text-cyan-700'>Export PDF</p>

                </div>
            </div>

        </div>
    )
}

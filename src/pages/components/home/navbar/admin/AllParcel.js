import React, { useState } from 'react'


const parcels = [
    { id: 1, customer: 'John Doe', date: '2024-04-24', status: 'In Transit' },
    { id: 2, customer: 'Jane Smith', date: '2024-04-24', status: 'Pending' },
    { id: 3, customer: 'Acme Corp.', date: '2024-04-24', status: 'Delivered' },
    { id: 4, customer: 'Bob Johnson', date: '2024-04-24', status: 'Cancelled' },
];


export default function AllParcel() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div> <div>
            <div className="m-4 bg-cyan-50 p-4 rounded-xl">
                <h2 className="text-lg font-semibold mb-4 text-cyan-700">All Parcels</h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th className="text-left px-4 py-3">ID</th>
                                <th className="text-left px-4 py-3">Customer</th>
                                <th className="text-left px-4 py-3">Date</th>
                                <th className="text-left px-4 py-3">Status</th>
                                <th className="text-left px-4 py-3">Agent</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            {parcels.map((parcel) => (
                                <tr key={parcel.id} className="border-t">
                                    <td className="px-4 py-2">{parcel.id}</td>
                                    <td className="px-4 py-2">{parcel.customer}</td>
                                    <td className="px-4 py-2">{parcel.date}</td>
                                    <td className="px-4 py-2">{parcel.status}</td>
                                    <td className="px-4 py-2">
                                        <button className="px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-100 text-sm">
                                            Assign Agent
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <button className="px-2 py-1 border rounded disabled:opacity-50" disabled>
                            &lt;
                        </button>
                        <span>{currentPage}</span>
                        <button className="px-2 py-1 border rounded disabled:opacity-50" disabled>
                            &gt;
                        </button>
                        <span className="ml-2">1–14</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="px-2 py-1 border rounded">A</button>
                        <button className="px-2 py-1 border rounded">&#8964;</button>
                        <button className="px-2 py-1 border rounded">🔁</button>
                        <button className="px-2 py-1 border rounded">📋</button>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

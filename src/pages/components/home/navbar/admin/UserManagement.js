import React from 'react'

const users = [
    { id: 1, customer_name: 'John Doe', email: 'JohnDoe@gmail.com' },

    { id: 2, customer_name: 'John Doe', email: 'JohnDoe@gmail.com' },

    { id: 3, customer_name: 'John Doe', email: 'JohnDoe@gmail.com' },

];


export default function UserManagement() {
    return (
        <div className="m-4 bg-cyan-50 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-cyan-700">User Management</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">

                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="text-left px-4 py-3">Name</th>
                            <th className="text-left px-4 py-3">Email</th>

                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="px-4 py-2">{user.customer_name}</td>
                                <td className="px-4 py-2">{user.email}</td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div></div>
    )
}

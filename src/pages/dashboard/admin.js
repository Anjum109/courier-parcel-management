import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Metrics from '../components/home/navbar/admin/Metrics';
import Reports from '../components/home/navbar/admin/Reports';
import AllParcel from '../components/home/navbar/admin/AllParcel';
import UserManagement from '../components/home/navbar/admin/UserManagement';
import Navbar from '../components/home/navbar/Navbar';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user.role !== 'admin') {
                        // Redirect non-admin users
                        router.push('/');
                    } else {
                        setUsername(data.user.email.split('@')[0]);
                    }
                } else {
                    router.push('/login/login');
                }
            } catch (err) {
                router.push('/login/login');
            }
        };

        fetchUser();
    }, [router]);

    return (
        <div className="">
            <Navbar />
            <div className="pt-[100px] px-5 flex flex-col lg:flex-row justify-center w-full  overflow-hidden">
                {/* Sidebar */}
                <div className="lg:w-[20%] bg-cyan-900 p-5">
                    <h1 className="text-white text-[20px] font-bold text-center mb-4">
                        Hi <span className='text-cyan-100'> {username ? `${username}` : ''}</span>
                    </h1>
                    <ul className="text-white text-[18px] flex flex-col gap-3">
                        <li
                            onClick={() => setActiveTab('dashboard')}
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === 'dashboard' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            Dashboard
                        </li>
                        <li
                            onClick={() => setActiveTab('parcels')}
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === 'parcels' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            All Parcels
                        </li>
                        <li
                            onClick={() => setActiveTab('metrics')}
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === 'metrics' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            Metrics
                        </li>
                        <li
                            onClick={() => setActiveTab('reports')}
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === 'reports' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            Reports
                        </li>
                        <li
                            onClick={() => setActiveTab('users')}
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === 'users' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            User Management
                        </li>
                    </ul>
                </div>

                {/* Content Area */}
                <div className="lg:w-[80%] bg-white p-6">
                    {activeTab === 'dashboard' && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Metrics />
                                <Reports />


                            </div>
                            <AllParcel />
                        </div>
                    )}

                    {activeTab === 'parcels' && (
                        <div>
                            <AllParcel />
                        </div>
                    )}

                    {activeTab === 'metrics' && (
                        <div>
                            <Metrics />
                        </div>
                    )}

                    {activeTab === 'reports' && (
                        <div>
                            <Reports />
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div>
                            <UserManagement />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

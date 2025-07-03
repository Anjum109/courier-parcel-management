import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/home/navbar/Navbar';
import Metrics from '@/components/home/navbar/admin/Metrics';
import Reports from '@/components/home/navbar/admin/Reports';
import AllParcel from '@/components/home/navbar/admin/AllParcel';
import UserManagement from '@/components/home/navbar/admin/UserManagement';
import Loader from '@/components/Loader';


export default function admin() {
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <div className=" bg-white text-black">
            <Navbar />
            <div className="lg:pt-[100px] pt-12 lg:px-5 flex flex-col lg:flex-row justify-center w-full  overflow-hidden">
                {/* Sidebar */}
                <div className="lg:w-[20%] bg-cyan-900 p-5">
                    <h1 className="text-white text-[20px] font-bold text-center mb-4">
                        Hi <span className='text-cyan-100'> {username ? `${username}` : ''}</span>
                    </h1>
                    <ul className="text-white text-[10px] md:text-[18px] lg:text-[18px] flex flex-row md:flex-col lg:flex-col gap-3">
                        <li
                            onClick={() => setActiveTab('dashboard')}
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === 'dashboard' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            Dashboard
                        </li>
                        <li
                            onClick={() => setActiveTab('parcels')}
                            className={`border-white border-2 hidden md:block lg:block xl:block p-2 cursor-pointer ${activeTab === 'parcels' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            All Parcels
                        </li>
                        <li
                            onClick={() => setActiveTab('parcels')}
                            className={`border-white block md:hidden lg:hidden xl:hidden border-2 p-2 cursor-pointer ${activeTab === 'parcels' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            Parcels
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
                            className={`border-white hidden md:block lg:block xl:block border-2 p-2 cursor-pointer ${activeTab === 'users' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            User Management
                        </li>
                        <li
                            onClick={() => setActiveTab('users')}
                            className={`border-white border-2 block md:hidden lg:hidden xl:hidden p-2 cursor-pointer ${activeTab === 'users' ? 'bg-gray-200 text-gray-700 font-bold' : ''
                                }`}
                        >
                            Info
                        </li>
                    </ul>
                </div>

                {/* Content Area */}
                <div className="lg:w-[80%] bg-white md:p-6 lg:p-6">
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

import React, { useEffect, useState } from "react";
import Navbar from "@/components/home/navbar/Navbar";

import {
    FaMapMarkerAlt,
    FaUserShield,
    FaDollarSign,
    FaRoute,
    FaChartBar,
    FaBoxOpen,
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { SiExpress, SiNodedotjs, SiSocketdotio, SiGooglemaps } from "react-icons/si";
import Loader from "@/components/Loader";

export default function About() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 1 second

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-white text-black">
            <Navbar />
            <div className="min-h-screen pt-[100px] bg-gray-50 flex items-center justify-center p-4 transition-opacity duration-500 ease-in opacity-100">
                <div className="bg-white rounded-lg shadow-md w-full max-w-5xl p-6 md:p-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">
                                About Our Courier Management System
                            </h1>
                            <p className="text-gray-600">
                                A real-time parcel tracking solution for the logistics industry.
                            </p>
                        </div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1995/1995514.png"
                            alt="Courier Van"
                            className="w-32 md:w-40 self-start md:self-center"
                        />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* Our Mission */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Our Mission</h2>
                            <p className="text-gray-700">
                                Our goal is to simplify courier services by providing an efficient and transparent
                                platform for managing parcel deliveries.
                            </p>
                        </div>

                        {/* Core Features */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Core Features</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-center space-x-2">
                                    <FaBoxOpen className="text-blue-500" />
                                    <span>Parcel booking</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FiClock className="text-blue-500" />
                                    <span>Real-time tracking</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaUserShield className="text-blue-500" />
                                    <span>Role-based access</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaDollarSign className="text-blue-500" />
                                    <span>COD support</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaRoute className="text-blue-500" />
                                    <span>Route optimization</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaChartBar className="text-blue-500" />
                                    <span>Reports</span>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Tech Stack</h2>
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center space-x-2">
                                    <SiExpress className="text-gray-700" />
                                    <span>Express</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <SiNodedotjs className="text-green-600" />
                                    <span>Node</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <SiGooglemaps className="text-red-500" />
                                    <span>Google Maps</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <SiSocketdotio className="text-indigo-600" />
                                    <span>Socket.io</span>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Why Choose Us</h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Clean and intuitive user-experience</li>
                                <li>Real-time updates and notifications</li>
                                <li>Comprehensive reporting tools</li>
                                <li>Multi-role access control</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

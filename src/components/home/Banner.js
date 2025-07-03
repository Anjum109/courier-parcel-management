import Image from 'next/image';
import React from 'react';
import img from '../../assets/home.jpg';
import Link from 'next/link';
import { FaBoxTissue } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { FaStackOverflow } from "react-icons/fa6";

export default function Banner() {
    return (
        <div className="px-4 md:px-10 lg:px-20 xl:px-32 pt-8 bg-white w-full">
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <Image
                    src={img}
                    alt="Courier illustration"
                    className="w-full h-auto rounded-lg object-cover"
                    priority
                />
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-900 mt-4 md:mt-0">
                        Fast, Reliable, and Real Time Courier Management
                    </h1>
                    <p className="text-sm md:text-base mt-2 text-gray-700">
                        Book parcels, assign agents, track deliveries in real time—all in one platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                        <Link href="/login/login">
                            <button className="w-full sm:w-auto py-2 px-4 border-2 rounded-xl bg-cyan-900 text-white">
                                Log in as Customer
                            </button>
                        </Link>
                        <Link href="/login/login">
                            <button className="w-full sm:w-auto py-2 px-4 rounded-xl text-cyan-900 bg-cyan-100 font-bold">
                                Log in as Delivery Agent
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="border-2 py-6 px-4 border-gray-300 rounded-xl">
                    <div className="text-3xl flex justify-center text-cyan-950">
                        <FaBoxTissue />
                    </div>
                    <h2 className="text-lg text-cyan-800 font-bold text-center mt-3">
                        Book a Parcel Pickup
                    </h2>
                </div>
                <div className="border-2 py-6 px-4 border-gray-300 rounded-xl">
                    <div className="text-3xl flex justify-center text-cyan-950">
                        <FaLocationDot />
                    </div>
                    <h2 className="text-lg text-cyan-800 font-bold text-center mt-3">
                        Real Time Tracking
                    </h2>
                </div>
                <div className="border-2 py-6 px-4 border-gray-300 rounded-xl">
                    <div className="text-3xl flex justify-center text-cyan-950">
                        <IoPersonSharp />
                    </div>
                    <h2 className="text-lg text-cyan-800 font-bold text-center mt-3">
                        Delivery Agent Management
                    </h2>
                </div>
                <div className="border-2 py-6 px-4 border-gray-300 rounded-xl">
                    <div className="text-3xl flex justify-center text-cyan-950">
                        <FaStackOverflow />
                    </div>
                    <h2 className="text-lg text-cyan-800 font-bold text-center mt-3">
                        Advanced Analytics & Reports
                    </h2>
                </div>
            </div>

            {/* How it Works */}
            <div className="mt-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-900 underline mb-6">
                    How it Works
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="py-6 px-4 rounded-xl bg-white border border-gray-200">
                        <div className="text-xl flex justify-center text-cyan-950">
                            <div className="w-8 h-8 rounded-full bg-cyan-900 text-white flex items-center justify-center">
                                1
                            </div>
                        </div>
                        <h2 className="text-lg text-cyan-800 font-bold text-center mt-3">
                            Create an Account
                        </h2>
                    </div>
                    <div className="py-6 px-4 rounded-xl bg-white border border-gray-200">
                        <div className="text-xl flex justify-center text-cyan-950">
                            <div className="w-8 h-8 rounded-full bg-cyan-900 text-white flex items-center justify-center">
                                2
                            </div>
                        </div>
                        <h2 className="text-lg text-cyan-800 font-bold text-center mt-3">
                            Book and Assign Parcel
                        </h2>
                    </div>
                    <div className="py-6 px-4 rounded-xl bg-white border border-gray-200">
                        <div className="text-xl flex justify-center text-cyan-950">
                            <div className="w-8 h-8 rounded-full bg-cyan-900 text-white flex items-center justify-center">
                                3
                            </div>
                        </div>
                        <h2 className="text-lg text-cyan-800 font-bold text-center mt-3">
                            Track Deliveries Live
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

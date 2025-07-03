import Navbar from "@/components/home/navbar/Navbar";
import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Contact() {
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
        <div>
            <Navbar />
            <div className="min-h-screen pt-[100px] flex items-center justify-center bg-gray-50 p-4 text-black">
                <div className="bg-white rounded-lg shadow-md w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
                    {/* Left Side - Form */}
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
                        <p className="text-gray-600 mb-6">Have a question? We’d love to hear from you.</p>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Contact Info */}
                    <div className="p-6 flex flex-col justify-center space-y-4 border-t md:border-t-0 md:border-l border-gray-200">
                        <div className="flex items-center space-x-3">
                            <FiMail className="text-gray-600" size={20} />
                            <span className="text-gray-700">support@couriertrackapp.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FiPhone className="text-gray-600" size={20} />
                            <span className="text-gray-700">+880 1234-567890</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FiMapPin className="text-gray-600" size={20} />
                            <span className="text-gray-700">Dhaka, Bangladesh</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

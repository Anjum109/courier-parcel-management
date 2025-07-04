import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/home/navbar/Navbar";
import ParcelBooking from "@/components/customer/ParcelBooking";
import BookingHistory from "@/components/customer/BookingHistory";
import Agent from "@/components/customer/Agent";
import ParcelTracking from "@/components/customer/ParcelTracking";
import Loader from "@/components/Loader";
import { guy } from "@/lib/font";


export default function customer() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/me");
                if (res.ok) {
                    const data = await res.json();
                    if (data.user.role !== "customer") {
                        router.push("/");
                    } else {
                        setUsername(data.user.email.split("@")[0]);
                    }
                } else {
                    router.push("/login/login");
                }
            } catch (err) {
                router.push("/login/login");
            }
        };

        fetchUser();
    }, [router]);
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
        <div className="bg-white h-full text-black">
            <Navbar />
            <div className="lg:pt-[100px] pt-12 lg:px-5 flex flex-col lg:flex-row justify-center w-full  overflow-hidden">
                {/* Sidebar */}
                <div className="lg:w-[20%] bg-cyan-950 p-5">
                    <div className={guy.className}>
                        <h1 className="text-white text-[20px] font-bold text-center mb-4">
                            Hi <span className="text-cyan-100">{username ? username : "Customer"}</span>
                        </h1>
                    </div>
                    <ul className="flex flex-row text-white text-[12px] lg:text-[18px]  lg:flex-col gap-3">
                        <li
                            onClick={() => setActiveTab("dashboard")}
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === "dashboard"
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            Dashboard
                        </li>
                        <li
                            onClick={() => setActiveTab("bookingHistory")}
                            className={`border-white border-2 p-2 cursor-pointer md:hidden lg:hidden${activeTab === "bookingHistory "
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            History
                        </li>
                        <li
                            onClick={() => setActiveTab("bookingHistory")}
                            className={`border-white border-2 p-2 cursor-pointer hidden md:block lg:block ${activeTab === "bookingHistory"
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            Booking History
                        </li>
                        <li
                            onClick={() => setActiveTab("parcelTracking")}
                            className={`border-white border-2 p-2 cursor-pointer hidden md:block lg:block ${activeTab === "parcelTracking"
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            Parcel Tracking
                        </li>
                        <li
                            onClick={() => setActiveTab("parcelTracking")}
                            className={`border-white border-2 p-2 cursor-pointer lg:hidden md:hidden ${activeTab === "parcelTracking"
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            Tracking
                        </li>
                        <li
                            onClick={() => setActiveTab("agent")}
                            className={`border-white border-2 p-2 cursor-pointer hidden md:block lg:block ${activeTab === "agent"
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            Show Agent & Cancel Parcel
                        </li>
                        <li
                            onClick={() => setActiveTab("agent")}
                            className={`border-white border-2 p-2 cursor-pointer lg:hidden md:hidden  ${activeTab === "agent"
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            Agent
                        </li>
                    </ul>
                </div>

                {/* Content */}
                <div className="lg:w-[80%] w-full bg-white lg:px-6 py-6">
                    {activeTab === "dashboard" && (
                        <div>
                            <div className={guy.className}> <h2 className="text-[25px] lg:text-[35px]  px-3 font-bold mb-4 text-cyan-700">Welcome  <span className=" font-bold text-center mb-4">
                                {username ? username : "Customer"} Book your parcel Now!
                            </span></h2>
                            </div>
                            <ParcelBooking />

                        </div>
                    )}

                    {activeTab === "bookingHistory" && (
                        <BookingHistory />
                    )}
                    {activeTab === "parcelTracking" && (
                        <ParcelTracking />
                    )}

                    {activeTab === "agent" && (
                        <Agent />
                    )}
                </div>
            </div>
        </div>
    );
}

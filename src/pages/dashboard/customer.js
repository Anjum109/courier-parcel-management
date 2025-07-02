import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/home/navbar/Navbar";
import ParcelBooking from "@/components/customer/ParcelBooking";
import BookingHistory from "@/components/customer/BookingHistory";
import Agent from "@/components/customer/Agent";
import ParcelTracking from "@/components/customer/ParcelTracking";


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

    return (
        <div className="">
            <Navbar />
            <div className="pt-[100px] px-5 flex flex-col lg:flex-row justify-center w-full  overflow-hidden">
                {/* Sidebar */}
                <div className="lg:w-[20%] bg-cyan-900 p-5">
                    <h1 className="text-white text-[20px] font-bold text-center mb-4">
                        Hi {username ? username : "Customer"}
                    </h1>
                    <ul className="text-white text-[18px] flex flex-col gap-3">
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
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === "bookingHistory"
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            Booking History
                        </li>
                        <li
                            onClick={() => setActiveTab("parcelTracking")}
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === "parcelTracking"
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            Parcel Tracking
                        </li>
                        <li
                            onClick={() => setActiveTab("agent")}
                            className={`border-white border-2 p-2 cursor-pointer ${activeTab === "agent"
                                ? "bg-gray-200 text-gray-700 font-bold"
                                : ""
                                }`}
                        >
                            Show Agent & Cancel Parcel
                        </li>
                    </ul>
                </div>

                {/* Content */}
                <div className="lg:w-[80%] bg-white p-6">
                    {activeTab === "dashboard" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-cyan-700">Welcome  <span className=" text-[20px] font-bold text-center mb-4">
                                {username ? username : "Customer"} Book your parcel Now!
                            </span></h2>
                            <ParcelBooking />
                            <BookingHistory />
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

"use client";
import Image from "next/image";
import { useState } from "react";

export default function delivery_agent() {
    const [parcels, setParcels] = useState([
        {
            id: 1,
            name: "Parcel 1",
            status: "Picked Up",
            lat: 44.9537,
            lng: -93.0900,
        },
        {
            id: 2,
            name: "Parcel 2",
            status: "In Transit",
            lat: 44.9800,
            lng: -93.2638,
        },
        {
            id: 3,
            name: "Parcel 3",
            status: "Picked Up",
            lat: 44.9370,
            lng: -93.2000,
        },
        {
            id: 4,
            name: "Parcel 4",
            status: "In Transit",
            lat: 44.9000,
            lng: -93.2896,
        },
    ]);

    const [showRoute, setShowRoute] = useState(false);

    const handleStatusChange = (id, status) => {
        const updatedParcels = parcels.map((parcel) =>
            parcel.id === id ? { ...parcel, status } : parcel
        );
        setParcels(updatedParcels);
    };

    const statusColors = {
        "Picked Up": "bg-blue-200 text-blue-800",
        "In Transit": "bg-cyan-200 text-cyan-800",
        "Delivered": "bg-green-200 text-green-800",
        "Failed": "bg-red-200 text-red-800",
    };

    const statusOptions = ["Picked Up", "In Transit", "Delivered", "Failed"];

    const routeParcels = parcels.filter((p) =>
        ["Picked Up", "In Transit"].includes(p.status)
    );

    return (
        <div>

            <div className="gap-6 p-6 bg-gray-50 min-h-screen">
                {/* Assigned Parcels */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Assigned Parcels</h2>
                    {parcels.map((parcel) => (
                        <div key={parcel.id} className="flex items-center justify-between mb-3">
                            <span className="font-medium">{parcel.name}</span>
                            <select
                                value={parcel.status}
                                onChange={(e) => handleStatusChange(parcel.id, e.target.value)}
                                className={`px-2 py-1 rounded ${statusColors[parcel.status]}`}
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <button
                        onClick={() => setShowRoute(true)}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Show Optimized Route
                    </button>
                </div>


            </div>
        </div>
    );
}

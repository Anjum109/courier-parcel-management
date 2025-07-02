"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ParcelTracking() {
    const [parcels, setParcels] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchParcels = async () => {
            const res = await fetch("/api/parcels/my", { credentials: "include" });
            const data = await res.json();
            setParcels(data);
        };

        fetchParcels();

        const socketInstance = io({ path: "/api/socketio" });
        setSocket(socketInstance);

        socketInstance.on("locationUpdated", ({ parcelId, lat, lng }) => {
            setParcels((prev) =>
                prev.map((p) =>
                    p._id === parcelId ? { ...p, currentLocation: { lat, lng } } : p
                )
            );
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-cyan-800 mb-4">Parcel Tracking</h2>
            {parcels.length === 0 ? (
                <p className="text-gray-600">No parcels found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {parcels.map((parcel) => (
                        <div
                            key={parcel._id}
                            className="bg-white p-4 border border-cyan-200 rounded-lg shadow"
                        >
                            <p className="font-bold text-cyan-900 text-lg mb-2">
                                Parcel {parcel._id.slice(-4).toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-600">From: {parcel.pickupAddress}</p>
                            <p className="text-sm text-gray-600">To: {parcel.deliveryAddress}</p>
                            <p className="text-sm text-gray-600">Status: {parcel.status}</p>

                            {parcel.currentLocation ? (
                                <p className="text-sm mt-2 text-green-700 font-semibold">
                                    Current Location: {parcel.currentLocation.lat.toFixed(4)},{" "}
                                    {parcel.currentLocation.lng.toFixed(4)}
                                </p>
                            ) : (
                                <p className="text-sm mt-2 text-red-500">Location not available yet.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

import React, { useEffect, useState } from "react";

export default function Agent() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                const res = await fetch("/api/parcels/my", {
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to fetch parcels");
                const data = await res.json();
                setParcels(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParcels();
    }, []);

    if (loading) return <p className="p-4">Loading parcels...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="m-4 bg-cyan-50 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-cyan-700">
                My Parcels and Assigned Agents
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="text-left px-4 py-3">#</th>
                            <th className="text-left px-4 py-3">Pickup Address</th>
                            <th className="text-left px-4 py-3">Delivery Address</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-left px-4 py-3">Assigned Agent</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4">
                                    No parcels booked.
                                </td>
                            </tr>
                        )}
                        {parcels.map((parcel, idx) => (
                            <tr key={parcel._id || idx} className="border-t">
                                <td className="px-4 py-2">{idx + 1}</td>
                                <td className="px-4 py-2">{parcel.pickupAddress}</td>
                                <td className="px-4 py-2">{parcel.deliveryAddress}</td>
                                <td className="px-4 py-2">{parcel.status}</td>
                                <td className="px-4 py-2">
                                    {parcel.assignedAgent
                                        ? parcel.assignedAgent.email
                                        : "Not assigned"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import Loader from "../Loader";

export default function Agent() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        fetchParcels();
    }, []);

    const fetchParcels = async () => {
        try {
            const res = await fetch("/api/parcels/my", { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch parcels");
            const data = await res.json();
            setParcels(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/parcels/delete?id=${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Delete failed");
            }
            setParcels(parcels.filter((p) => p._id !== id));
            setConfirmOpen(false);
            setDeletingId(null);
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <Loader />
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="m-4 bg-cyan-50 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-cyan-700">
                My Parcels and Assigned Agents
            </h2>

            {/* TABLE for screens sm and above */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full bg-white text-sm md:text-base">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="text-left px-4 py-3">#</th>
                            <th className="text-left px-4 py-3">Pickup Address</th>
                            <th className="text-left px-4 py-3">Delivery Address</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-left px-4 py-3">Assigned Agent</th>
                            <th className="text-left px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No parcels booked.
                                </td>
                            </tr>
                        )}
                        {parcels.map((parcel, idx) => (
                            <tr key={parcel._id || idx} className="border-t">
                                <td className="px-4 py-2">{idx + 1}</td>
                                <td className="px-4 py-2 break-words max-w-xs">{parcel.pickupAddress}</td>
                                <td className="px-4 py-2 break-words max-w-xs">{parcel.deliveryAddress}</td>
                                <td className="px-4 py-2">{parcel.status}</td>
                                <td className="px-4 py-2 truncate max-w-xs">
                                    {parcel.assignedAgent ? parcel.assignedAgent.email : "Not assigned"}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    {!parcel.assignedAgent ? (
                                        <button
                                            onClick={() => {
                                                setDeletingId(parcel._id);
                                                setConfirmOpen(true);
                                            }}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <span className="text-gray-400 text-xs">Cannot Cancel</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CARD list for mobile (below sm) */}
            <div className="sm:hidden space-y-4">
                {parcels.length === 0 && (
                    <p className="text-center p-4">No parcels booked.</p>
                )}
                {parcels.map((parcel, idx) => (
                    <div
                        key={parcel._id || idx}
                        className="bg-white p-4 rounded-xl shadow border border-gray-200"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-cyan-700">Parcel #{idx + 1}</span>
                            <span className="text-sm text-gray-600">{parcel.status}</span>
                        </div>
                        <p>
                            <span className="font-semibold">Pickup:</span>{" "}
                            <span>{parcel.pickupAddress}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Delivery:</span>{" "}
                            <span>{parcel.deliveryAddress}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Agent:</span>{" "}
                            <span>{parcel.assignedAgent ? parcel.assignedAgent.email : "Not assigned"}</span>
                        </p>
                        <div className="mt-3">
                            {!parcel.assignedAgent ? (
                                <button
                                    onClick={() => {
                                        setDeletingId(parcel._id);
                                        setConfirmOpen(true);
                                    }}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                                >
                                    Cancel Booking
                                </button>
                            ) : (
                                <span className="text-gray-400 text-center block">Cannot Cancel</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Confirm Modal */}
            {confirmOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
                        <p className="mb-4 font-semibold">
                            Are you sure you want to cancel this parcel booking?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setConfirmOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                No
                            </button>
                            <button
                                onClick={() => handleDelete(deletingId)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

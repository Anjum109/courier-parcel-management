"use client";
import Navbar from "@/components/home/navbar/Navbar";
import { useEffect, useState } from "react";

export default function delivery_agent() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelingParcelId, setCancelingParcelId] = useState(null);
    const [cancelReason, setCancelReason] = useState("");

    const [updatingParcelId, setUpdatingParcelId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");

    const [successMessage, setSuccessMessage] = useState(""); // NEW

    const statusColors = {
        "Picked Up": "bg-blue-100 text-blue-800",
        "In Transit": "bg-cyan-100 text-cyan-800",
        Delivered: "bg-green-100 text-green-800",
        Failed: "bg-red-100 text-red-800",
    };

    const statusOptions = ["Picked Up", "In Transit", "Delivered", "Failed"];

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                const res = await fetch("/api/parcels/assigned", { credentials: "include" });
                if (!res.ok) throw new Error("Failed to fetch parcels");
                const data = await res.json();
                setParcels(sortParcels(data));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParcels();
    }, []);

    const sortParcels = (list) => {
        return [...list].sort((a, b) => {
            if (a.status === "Delivered" && b.status !== "Delivered") return 1;
            if (a.status !== "Delivered" && b.status === "Delivered") return -1;
            return 0;
        });
    };

    const handleStatusChange = (parcelId, newStatus) => {
        setUpdatingParcelId(parcelId);
        setSelectedStatus(newStatus);
    };

    const handleDoneClick = async () => {
        if (!updatingParcelId || !selectedStatus) return;

        try {
            const res = await fetch("/api/parcels/update-status", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ parcelId: updatingParcelId, status: selectedStatus }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update status");
            }

            setParcels((prev) =>
                sortParcels(
                    prev.map((p) =>
                        p._id === updatingParcelId ? { ...p, status: selectedStatus } : p
                    )
                )
            );

            setUpdatingParcelId(null);
            setSelectedStatus("");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSendLocation = (parcelId) => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            const res = await fetch("/api/parcels/update-location", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    parcelId,
                    lat: latitude,
                    lng: longitude,
                }),
            });

            if (res.ok) {
                setSuccessMessage("Location sent successfully!");
                setTimeout(() => setSuccessMessage(""), 3000);
            } else {
                const errorData = await res.json();
                alert(errorData.message || "Failed to send location");
            }
        });
    };

    if (loading) return <p className="p-4">Loading parcels...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <>
            <Navbar />
            <div className="pt-[100px] px-8 bg-gray-50 min-h-screen relative">
                <h2 className="text-2xl font-bold text-cyan-800 mb-4">Assigned Parcels</h2>

                {parcels.length === 0 ? (
                    <p>No parcels assigned.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {parcels.map((parcel) => {
                            const isUpdating = updatingParcelId === parcel._id;

                            return (
                                <div
                                    key={parcel._id}
                                    className="bg-white p-4 shadow-md rounded-lg border border-cyan-100 space-y-2"
                                >
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-gray-500 uppercase">
                                            PARCEL{parcel._id.slice(-4).toUpperCase()}
                                        </span>
                                        <span
                                            className={`px-3 py-1 rounded text-xs font-bold ${statusColors[
                                                isUpdating ? selectedStatus : parcel.status
                                            ]
                                                }`}
                                        >
                                            {isUpdating ? selectedStatus : parcel.status}
                                        </span>
                                    </div>
                                    <p className="text-lg font-semibold text-cyan-900">
                                        {parcel.customer?.name || "Unknown Customer"}
                                    </p>
                                    <p className="text-gray-600">From: {parcel.pickupAddress}</p>
                                    <p className="text-gray-600">To: {parcel.deliveryAddress}</p>

                                    {parcel.currentLocation && (
                                        <p className="text-gray-600 text-sm">
                                            Current Location:{" "}
                                            <span className="font-medium text-cyan-700">
                                                {parcel.currentLocation.lat.toFixed(4)},{" "}
                                                {parcel.currentLocation.lng.toFixed(4)}
                                            </span>
                                        </p>
                                    )}

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2">
                                        <div className="flex gap-2">
                                            <select
                                                value={
                                                    isUpdating
                                                        ? selectedStatus
                                                        : parcel.status
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        parcel._id,
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    updatingParcelId !== null && !isUpdating
                                                }
                                                className="border rounded px-2 py-1 text-sm"
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                            {isUpdating && (
                                                <button
                                                    onClick={handleDoneClick}
                                                    className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
                                                >
                                                    Done
                                                </button>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleSendLocation(parcel._id)}
                                            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Send Current Location
                                        </button>
                                    </div>
                                    {/* cancel  */}
                                    <div className="flex justify-center items-center mt-3">
                                        {["Picked Up", "In Transit", "Delivered", "Failed"].includes(parcel.status) ? (
                                            <button
                                                disabled
                                                className="rounded-xl px-5 py-1 text-[10px] bg-gray-300 text-gray-500 cursor-not-allowed"
                                            >
                                                Cannot Cancel
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setCancelingParcelId(parcel._id);
                                                    setCancelReason("");
                                                }}
                                                className="rounded-xl px-5 py-1 text-[10px] bg-red-700 text-red-50"
                                            >
                                                Cancel Delivery
                                            </button>
                                        )}
                                        {cancelingParcelId && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                                <div className="bg-white p-6 rounded shadow max-w-sm w-full">
                                                    <p className="mb-3 font-semibold text-red-700">
                                                        Why are you cancelling this delivery?
                                                    </p>
                                                    <textarea
                                                        value={cancelReason}
                                                        onChange={(e) => setCancelReason(e.target.value)}
                                                        rows={3}
                                                        className="w-full border rounded p-2 mb-3 text-sm"
                                                        placeholder="Enter your reason..."
                                                    />
                                                    <div className="flex justify-end space-x-2">
                                                        <button
                                                            onClick={() => setCancelingParcelId(null)}
                                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                                                        >
                                                            No
                                                        </button>
                                                        <button
                                                            onClick={async () => {
                                                                try {
                                                                    if (!cancelReason.trim()) {
                                                                        alert("Please provide a reason.");
                                                                        return;
                                                                    }

                                                                    const res = await fetch("/api/parcels/cancel-assignment", {
                                                                        method: "PATCH",
                                                                        headers: { "Content-Type": "application/json" },
                                                                        credentials: "include",
                                                                        body: JSON.stringify({
                                                                            parcelId: cancelingParcelId,
                                                                            reason: cancelReason,
                                                                        }),
                                                                    });

                                                                    if (!res.ok) {
                                                                        const errData = await res.json();
                                                                        throw new Error(errData.message || "Failed to cancel assignment");
                                                                    }

                                                                    setParcels((prev) =>
                                                                        prev.map((p) =>
                                                                            p._id === cancelingParcelId
                                                                                ? { ...p, assignedAgent: null }
                                                                                : p
                                                                        )
                                                                    );

                                                                    setCancelingParcelId(null);
                                                                    setCancelReason("");
                                                                } catch (err) {
                                                                    alert(err.message);
                                                                }
                                                            }}
                                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                                        >
                                                            Yes, Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

                {successMessage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white px-6 py-4 rounded shadow text-center">
                            <p className="text-green-700 font-semibold">{successMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/home/navbar/Navbar";

export default function delivery_agent() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Track which parcel is being updated and its selected new status
    const [updatingParcelId, setUpdatingParcelId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                const res = await fetch("/api/parcels/assigned", { credentials: "include" });
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

    const statusColors = {
        "Picked Up": "bg-blue-200 text-blue-800",
        "In Transit": "bg-cyan-200 text-cyan-800",
        Delivered: "bg-green-200 text-green-800",
        Failed: "bg-red-200 text-red-800",
    };

    const statusOptions = ["Picked Up", "In Transit", "Delivered", "Failed"];

    // Called when a dropdown value changes: sets state for the selected parcel & status, shows Done button
    const handleStatusChange = (parcelId, newStatus) => {
        setUpdatingParcelId(parcelId);
        setSelectedStatus(newStatus);
    };

    // Called when Done clicked — sends update to backend and updates local state if success
    const handleDoneClick = async () => {
        if (!updatingParcelId || !selectedStatus) return;

        try {
            const res = await fetch("/api/parcels/update-status", {
                method: "PATCH", // or POST if you prefer
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ parcelId: updatingParcelId, status: selectedStatus }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update status");
            }

            // Update local parcels state to reflect new status
            setParcels((prev) =>
                prev.map((parcel) =>
                    parcel._id === updatingParcelId ? { ...parcel, status: selectedStatus } : parcel
                )
            );

            // Reset update controls
            setUpdatingParcelId(null);
            setSelectedStatus("");
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p>Loading parcels...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <>
            <Navbar />
            <div className="gap-6 pt-[100px] bg-gray-50 min-h-screen">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Assigned Parcels</h2>
                    {parcels.length === 0 && <p>No parcels assigned to you.</p>}
                    {parcels.map((parcel) => {
                        const isUpdating = updatingParcelId === parcel._id;
                        return (
                            <div
                                key={parcel._id}
                                className="flex items-center justify-between mb-3 space-x-4"
                            >
                                <span className="font-medium">
                                    {parcel.pickupAddress} → {parcel.deliveryAddress}
                                </span>
                                <select
                                    value={isUpdating ? selectedStatus : parcel.status}
                                    onChange={(e) => handleStatusChange(parcel._id, e.target.value)}
                                    className={`px-2 py-1 rounded ${statusColors[isUpdating ? selectedStatus : parcel.status]
                                        }`}
                                    disabled={updatingParcelId !== null && !isUpdating} // disable other selects during update
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
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

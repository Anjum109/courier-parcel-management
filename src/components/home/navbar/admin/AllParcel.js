import React, { useEffect, useState } from "react";
import { initSocket } from "@/lib/socket";
import Loader from "@/components/Loader";

export default function AllParcel() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [agents, setAgents] = useState([]);
    const [assigningParcelId, setAssigningParcelId] = useState(null);
    const [selectedAgentId, setSelectedAgentId] = useState(null);

    useEffect(() => {
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

        const fetchAgents = async () => {
            try {
                const res = await fetch("/api/users/agents");
                if (!res.ok) throw new Error("Failed to fetch delivery agents");
                const data = await res.json();
                setAgents(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchParcels();
        fetchAgents();

        const socket = initSocket();
        socket.on("parcelUpdated", (updatedParcel) => {
            setParcels((prev) =>
                prev.map((p) => (p._id === updatedParcel._id ? updatedParcel : p))
            );
        });

        return () => {
            socket.off("parcelUpdated");
        };
    }, []);

    const handleAssignClick = (parcelId) => {
        setAssigningParcelId(parcelId);
        setSelectedAgentId(null);
    };

    const handleDoneClick = async () => {
        if (!selectedAgentId) return;

        try {
            const res = await fetch("/api/parcels/assign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    parcelId: assigningParcelId,
                    agentId: selectedAgentId,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to assign agent");
            }

            const updated = await res.json();

            setParcels((prev) =>
                prev.map((p) => (p._id === updated.parcel._id ? updated.parcel : p))
            );

            setAssigningParcelId(null);
            setSelectedAgentId(null);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    if (loading) return <p className="p-4"><Loader /></p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="m-4 bg-cyan-50 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-cyan-700">All Parcels</h2>

            {/* TABLE VIEW: visible on sm and larger */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="text-left px-4 py-3">#</th>
                            <th className="text-left px-4 py-3">Pickup Address</th>
                            <th className="text-left px-4 py-3">Delivery Address</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-left px-4 py-3">Payment Method</th>
                            <th className="text-left px-4 py-3">Assigned Agent</th>
                            <th className="text-left px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center p-4">
                                    No parcels found.
                                </td>
                            </tr>
                        )}
                        {parcels.map((parcel, idx) => {
                            const assignedAgent = parcel.assignedAgent
                                ? typeof parcel.assignedAgent === "object"
                                    ? parcel.assignedAgent
                                    : agents.find((a) => a._id === parcel.assignedAgent)
                                : null;

                            return (
                                <tr key={parcel._id || idx} className="border-t">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{parcel.pickupAddress}</td>
                                    <td className="px-4 py-2">{parcel.deliveryAddress}</td>
                                    <td className="px-4 py-2 text-red-600 font-bold">{parcel.status}</td>
                                    <td className="px-4 py-2">{parcel.paymentMethod}</td>
                                    <td className="px-4 py-2">
                                        {assignedAgent
                                            ? `${assignedAgent.name} (${assignedAgent.email})`
                                            : "Not assigned"}
                                    </td>
                                    <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                                        {assigningParcelId === parcel._id ? (
                                            <>
                                                <select
                                                    value={selectedAgentId || ""}
                                                    onChange={(e) => setSelectedAgentId(e.target.value)}
                                                    className="border p-1"
                                                >
                                                    <option value="">Select Agent</option>
                                                    {agents.map((agent) => (
                                                        <option key={agent._id} value={agent._id}>
                                                            {agent.name} ({agent.email})
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    onClick={handleDoneClick}
                                                    className="px-2 py-1 bg-green-500 text-white rounded"
                                                >
                                                    Done
                                                </button>
                                            </>
                                        ) : assignedAgent ? (
                                            <button
                                                disabled
                                                className="px-3 py-1 bg-gray-200 text-gray-600 rounded cursor-not-allowed"
                                            >
                                                Assigned
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAssignClick(parcel._id)}
                                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm"
                                            >
                                                Assign Agent
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* CARD VIEW: visible on mobile screens only */}
            <div className="sm:hidden space-y-4">
                {parcels.length === 0 && (
                    <p className="text-center p-4">No parcels found.</p>
                )}
                {parcels.map((parcel, idx) => {
                    const assignedAgent = parcel.assignedAgent
                        ? typeof parcel.assignedAgent === "object"
                            ? parcel.assignedAgent
                            : agents.find((a) => a._id === parcel.assignedAgent)
                        : null;

                    return (
                        <div
                            key={parcel._id || idx}
                            className="bg-white p-4 rounded-xl shadow border border-gray-200"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-cyan-700">Parcel #{idx + 1}</span>
                                <span className="text-sm text-red-600 font-bold">{parcel.status}</span>
                            </div>
                            <p className="mb-1">
                                <span className="font-semibold">Pickup:</span> {parcel.pickupAddress}
                            </p>
                            <p className="mb-1">
                                <span className="font-semibold">Delivery:</span> {parcel.deliveryAddress}
                            </p>
                            <p className="mb-1">
                                <span className="font-semibold">Payment:</span> {parcel.paymentMethod}
                            </p>
                            <p className="mb-3">
                                <span className="font-semibold">Agent:</span>{" "}
                                {assignedAgent ? `${assignedAgent.name} (${assignedAgent.email})` : "Not assigned"}
                            </p>
                            <div>
                                {assigningParcelId === parcel._id ? (
                                    <>
                                        <select
                                            value={selectedAgentId || ""}
                                            onChange={(e) => setSelectedAgentId(e.target.value)}
                                            className="border p-1 w-full mb-2"
                                        >
                                            <option value="">Select Agent</option>
                                            {agents.map((agent) => (
                                                <option key={agent._id} value={agent._id}>
                                                    {agent.name} ({agent.email})
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={handleDoneClick}
                                            className="w-full px-4 py-2 bg-green-500 text-white rounded"
                                        >
                                            Done
                                        </button>
                                    </>
                                ) : assignedAgent ? (
                                    <button
                                        disabled
                                        className="w-full px-4 py-2 bg-gray-200 text-gray-600 rounded cursor-not-allowed"
                                    >
                                        Assigned
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAssignClick(parcel._id)}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
                                    >
                                        Assign Agent
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

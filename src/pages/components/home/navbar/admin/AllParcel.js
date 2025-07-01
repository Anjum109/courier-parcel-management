import React, { useEffect, useState } from "react";

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
                console.log("Fetched agents:", data); // 👈 Add this
                setAgents(data);
            } catch (err) {
                console.error(err);
            }
        };


        fetchParcels();
        fetchAgents();
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

            if (!res.ok) throw new Error("Failed to assign agent");

            // Optionally refresh parcel data
            const updated = await res.json();
            setParcels((prev) =>
                prev.map((p) =>
                    p._id === updated.parcel._id ? updated.parcel : p
                )
            );

            setAssigningParcelId(null);
            setSelectedAgentId(null);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    if (loading) return <p className="p-4">Loading parcels...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="m-4 bg-cyan-50 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-cyan-700">All Parcels</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="text-left px-4 py-3">#</th>
                            <th className="text-left px-4 py-3">Pickup Address</th>
                            <th className="text-left px-4 py-3">Delivery Address</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-left px-4 py-3">Payment Method</th>
                            <th className="text-left px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No parcels found.
                                </td>
                            </tr>
                        )}
                        {parcels.map((parcel, idx) => (
                            <tr key={parcel._id || idx} className="border-t">
                                <td className="px-4 py-2">{idx + 1}</td>
                                <td className="px-4 py-2">{parcel.pickupAddress}</td>
                                <td className="px-4 py-2">{parcel.deliveryAddress}</td>
                                <td className="px-4 py-2">{parcel.status}</td>
                                <td className="px-4 py-2">{parcel.paymentMethod}</td>
                                <td className="px-4 py-2 space-x-2">
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

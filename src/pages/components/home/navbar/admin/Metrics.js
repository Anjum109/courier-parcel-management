import React, { useEffect, useState } from "react";

export default function Metrics() {
    const [metrics, setMetrics] = useState({
        totalBookingsToday: 0,
        codTotalToday: 0,
        failedDeliveriesToday: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch("/api/parcels/metrics");
                if (!res.ok) throw new Error("Failed to fetch metrics");
                const data = await res.json();
                setMetrics(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    if (loading) {
        return (
            <div className="m-5 bg-cyan-50 rounded-xl p-4">
                <h1 className="text-cyan-700 font-bold text-[20px] mb-2">Metrics</h1>
                <p>Loading metrics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="m-5 bg-cyan-50 rounded-xl p-4">
                <h1 className="text-cyan-700 font-bold text-[20px] mb-2">Metrics</h1>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="m-5 bg-cyan-50 rounded-xl">
            <h1 className="text-cyan-700 font-bold text-[20px] p-4">Metrics</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
                <p className="border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold text-cyan-700">
                    Daily Bookings: <br></br> <span className="text-[28px] font-bold text-cyan-900">{metrics.totalBookingsToday}</span>
                </p>
                <p className="border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold text-cyan-700">
                    COD Total: <br></br> <span className="text-[28px] font-bold text-cyan-900"> {metrics.codTotalToday}</span>
                </p>
                <p className="border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold text-cyan-700">
                    Failed Deliveries:<br></br> <span className="text-[28px] font-bold text-cyan-900"> {metrics.failedDeliveriesToday}</span>
                </p>
            </div>
        </div>
    );
}

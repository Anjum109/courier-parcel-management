import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { IoMdDownload } from "react-icons/io";
import { initSocket } from "@/lib/socket";

export default function Reports() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchParcels = async () => {
        try {
            const res = await fetch("/api/parcels/report");
            if (!res.ok) throw new Error("Failed to fetch report data");
            const data = await res.json();
            setParcels(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchParcels();

        const socket = initSocket();

        // Listen to a server event 'parcelsUpdated' to update the parcel list real-time
        socket.on("parcelsUpdated", () => {
            fetchParcels();
        });

        return () => {
            socket.off("parcelsUpdated");
        };
    }, []);

    const exportCSV = () => {
        try {
            if (parcels.length === 0) {
                alert("No data to export");
                return;
            }

            const csvHeaders = ["Pickup Address", "Delivery Address", "Status", "Payment Method"];
            const csvRows = parcels.map((p) =>
                [
                    `"${p.pickupAddress}"`,
                    `"${p.deliveryAddress}"`,
                    `"${p.status}"`,
                    `"${p.paymentMethod}"`,
                ].join(",")
            );

            const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "parcels_report.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error(err);
            alert("Failed to export CSV");
        }
    };

    const exportPDF = () => {
        try {
            if (parcels.length === 0) {
                alert("No data to export");
                return;
            }

            const doc = new jsPDF();

            doc.setFontSize(14);
            doc.text("Parcels Report", 20, 20);

            let y = 30;
            parcels.forEach((p, idx) => {
                doc.text(
                    `${idx + 1}. ${p.pickupAddress} -> ${p.deliveryAddress} | Status: ${p.status} | Payment: ${p.paymentMethod}`,
                    20,
                    y
                );
                y += 10;
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
            });

            doc.save("parcels_report.pdf");
        } catch (err) {
            console.error(err);
            alert("Failed to export PDF");
        }
    };

    if (loading) return <p className="p-4">Loading report data...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="m-4 bg-cyan-50 p-4 rounded-xl">
            <h2 className="text-lg font-semibold text-cyan-700">Reports</h2>
            <div className="grid grid-cols-1 gap-3 p-4">
                <button
                    onClick={exportCSV}
                    className="flex justify-center items-center gap-3 text-[18px] border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold text-cyan-700 duration-1000 hover:text-cyan-100 hover:bg-cyan-800"
                >
                    Export CSV <IoMdDownload />
                </button>
                <button
                    onClick={exportPDF}
                    className="flex justify-center items-center gap-3 text-[18px] border-2 p-2 text-center bg-cyan-100 border-cyan-200 rounded-xl font-bold duration-1000  text-cyan-700 hover:text-cyan-100 hover:bg-cyan-800"
                >
                    Export PDF <IoMdDownload />
                </button>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import Loader from "../Loader";

export default function ParcelBooking() {
    const [pickupAddress, setPickupAddress] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [parcelType, setParcelType] = useState("Medium Box");
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("/api/parcels", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pickupAddress,
                    deliveryAddress,
                    parcelType,
                    paymentMethod,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to book parcel");

            setMessage("✅ Parcel booking successful!");

            // Reset form
            setPickupAddress("");
            setDeliveryAddress("");
            setParcelType("Medium Box");
            setPaymentMethod("Cash on Delivery");
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Parcel Booking</h2>

                {message && (
                    <div
                        className={`mb-4 p-2 rounded ${message.startsWith("✅")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Pickup Address"
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Delivery Address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <select
                        value={parcelType}
                        onChange={(e) => setParcelType(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option>Small Box</option>
                        <option>Medium Box</option>
                        <option>Large Box</option>
                    </select>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option>Cash on Delivery</option>
                        <option>Online Payment</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-cyan-900 text-white py-2 px-4 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Booking..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

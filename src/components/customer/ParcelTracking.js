import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Loader from "../Loader";

export default function ParcelTracking() {
    const [parcels, setParcels] = useState([]);
    const [socket, setSocket] = useState(null);
    const [locationsMap, setLocationsMap] = useState({}); // parcelId -> address

    useEffect(() => {
        const fetchParcels = async () => {
            const res = await fetch("/api/parcels/my", { credentials: "include" });
            const data = await res.json();
            setParcels(data);

            // Reverse geocode each location
            data.forEach((parcel) => {
                if (parcel.currentLocation) {
                    reverseGeocode(parcel._id, parcel.currentLocation.lat, parcel.currentLocation.lng);
                }
            });
        };

        fetchParcels();

        const socketInstance = io({ path: "/api/socket" });
        setSocket(socketInstance);

        socketInstance.on("locationUpdated", ({ parcelId, lat, lng }) => {
            setParcels((prev) =>
                prev.map((p) =>
                    p._id === parcelId ? { ...p, currentLocation: { lat, lng } } : p
                )
            );
            reverseGeocode(parcelId, lat, lng);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const reverseGeocode = async (parcelId, lat, lng) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();
            const address = data.display_name;
            setLocationsMap((prev) => ({ ...prev, [parcelId]: address }));
        } catch (err) {
            console.error("Reverse geocoding failed:", err);
        }
    };
    const [loading, setLoading] = useState(true);

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
                                    <span
                                        className="underline cursor-pointer hover:text-blue-600"
                                        onClick={() => {
                                            const lat = parcel.currentLocation.lat;
                                            const lng = parcel.currentLocation.lng;
                                            window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
                                        }}
                                    >
                                        Current Location:{" "}
                                        {locationsMap[parcel._id]
                                            ? locationsMap[parcel._id]
                                            : `${parcel.currentLocation.lat.toFixed(4)}, ${parcel.currentLocation.lng.toFixed(4)}`}
                                    </span>
                                </p>
                            ) : (
                                <p className="text-sm mt-2 text-red-500">
                                    Location not available yet.
                                </p>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

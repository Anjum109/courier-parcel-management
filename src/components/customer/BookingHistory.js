import React, { useEffect, useState } from 'react';
import Loader from '../Loader';

export default function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/parcels/my', {
                    credentials: 'include',
                });

                if (!res.ok) throw new Error('Failed to fetch booking history');

                const data = await res.json();
                setBookings(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const statusColor = {
        Booked: 'bg-red-800',
        'Picked Up': 'bg-yellow-400',
        'In Transit': 'bg-green-400',
        Delivered: 'bg-emerald-500',
    };

    if (loading) return <Loader />
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-white p-3 lg:p-6 mt-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Booking History</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-sm text-gray-600">
                        <th className="p-2">#</th>
                        <th className="p-2">Pickup Address</th>
                        <th className="p-2">Delivery Address</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center p-4">No bookings found.</td>
                        </tr>
                    )}
                    {bookings.map((booking, idx) => (
                        <tr key={booking._id || idx} className="border-t">
                            <td className="p-2">{idx + 1}</td>
                            <td className="p-2">{booking.pickupAddress}</td>
                            <td className="p-2">{booking.deliveryAddress}</td>
                            <td className="p-2">
                                <span className={`text-white text-xs px-2 py-1 rounded ${statusColor[booking.status] || 'bg-gray-400'}`}>
                                    {booking.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

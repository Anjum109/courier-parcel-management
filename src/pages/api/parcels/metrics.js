// pages/api/parcels/metrics.js
import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Count total bookings today
        const totalBookingsToday = await Parcel.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });

        // Count total COD bookings today
        const codTotalToday = await Parcel.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
            paymentMethod: "COD",
        });

        // Count failed deliveries today
        const failedDeliveriesToday = await Parcel.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
            status: "Failed",
        });

        res.status(200).json({
            totalBookingsToday,
            codTotalToday,
            failedDeliveriesToday,
        });
    } catch (err) {
        console.error("Metrics Error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

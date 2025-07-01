// pages/api/parcels/report.js
import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();

        const parcels = await Parcel.find().sort({ createdAt: -1 });

        res.status(200).json(parcels);
    } catch (err) {
        console.error("Fetch report error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

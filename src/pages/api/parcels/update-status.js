// pages/api/parcels/update-status.js
import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();

        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { parcelId, status } = req.body;
        if (!parcelId || !status) {
            return res.status(400).json({ message: "Parcel ID and status are required" });
        }

        // Optionally check if this parcel is assigned to the logged-in delivery agent
        const parcel = await Parcel.findById(parcelId);
        if (!parcel) return res.status(404).json({ message: "Parcel not found" });
        if (parcel.assignedAgent.toString() !== userId) {
            return res.status(403).json({ message: "Not allowed to update this parcel" });
        }

        parcel.status = status;
        await parcel.save();

        res.status(200).json({ message: "Status updated", parcel });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

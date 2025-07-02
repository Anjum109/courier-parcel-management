import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "PATCH") return res.status(405).end();

    try {
        await connectDB();

        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const agentId = decoded.userId;

        const { parcelId, reason } = req.body;

        if (!parcelId || !reason) {
            return res.status(400).json({ message: "Parcel ID and reason are required" });
        }

        const parcel = await Parcel.findById(parcelId);
        if (!parcel) return res.status(404).json({ message: "Parcel not found" });

        if (String(parcel.assignedAgent) !== agentId) {
            return res.status(403).json({ message: "You are not assigned to this parcel" });
        }

        if (
            parcel.status === "Picked Up" ||
            parcel.status === "In Transit" ||
            parcel.status === "Delivered" ||
            parcel.status === "Failed"
        ) {
            return res.status(400).json({ message: "Cannot cancel after pickup or delivery" });
        }

        parcel.assignedAgent = null;
        await parcel.save();

        res.status(200).json({ message: "Assignment canceled successfully" });
    } catch (err) {
        console.error("Cancel error:", err);
        res.status(500).json({ message: "Server error" });
    }
}
// pages/api/parcels/delete.js
import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "DELETE") return res.status(405).end();

    try {
        await connectDB();
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { id } = req.query;

        const parcel = await Parcel.findById(id);
        if (!parcel) return res.status(404).json({ message: "Parcel not found" });

        // Only the owner can delete and only if no agent assigned
        if (parcel.customer.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }
        if (parcel.assignedAgent) {
            return res.status(400).json({ message: "Cannot delete assigned parcel" });
        }

        await parcel.deleteOne();

        res.status(200).json({ message: "Parcel deleted successfully" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

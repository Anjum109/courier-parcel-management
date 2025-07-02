// api/auth/parcels/assign.js 
import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    try {
        await connectDB();

        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: "Invalid token" });

        const { parcelId, agentId } = req.body;
        if (!parcelId || !agentId) {
            return res.status(400).json({ message: "parcelId and agentId are required" });
        }

        // Find parcel to update
        const parcel = await Parcel.findById(parcelId);
        if (!parcel) {
            return res.status(404).json({ message: "Parcel not found" });
        }

        // Prevent re-assigning parcel if already assigned
        if (parcel.assignedAgent) {
            return res.status(400).json({ message: "Parcel already assigned" });
        }

        // Update assignedAgent field
        parcel.assignedAgent = agentId;
        await parcel.save();

        return res.status(200).json({ message: "Agent assigned successfully", parcel });
    } catch (error) {
        console.error("Assign Agent Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

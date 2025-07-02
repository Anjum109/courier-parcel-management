import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    try {
        await connectDB();

        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Find parcels assigned to this delivery agent
        const parcels = await Parcel.find({ assignedAgent: userId }).sort({ createdAt: -1 });

        res.status(200).json(parcels);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
    const parcels = await Parcel.find({ assignedAgent: user._id })
        .populate("customer", "name email")
        .sort({ createdAt: -1 });

}

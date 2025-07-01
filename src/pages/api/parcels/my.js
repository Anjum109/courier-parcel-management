import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    try {
        await connectDB();

        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(401).json({ message: "Unauthorized" });

        let parcels;

        if (user.role === "admin") {
            // Admin: fetch all parcels
            parcels = await Parcel.find().sort({ createdAt: -1 });
        } else {
            // Customer: fetch their own
            parcels = await Parcel.find({ customer: user._id }).sort({ createdAt: -1 });
        }

        res.status(200).json(parcels);
    } catch (err) {
        console.error("Fetch Parcels Error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

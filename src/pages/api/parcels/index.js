// pages/api/parcels/index.js
import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await connectDB();

            const token = req.cookies.token;

            if (!token) {
                return res.status(401).json({ message: "Not authenticated" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const { pickupAddress, deliveryAddress, parcelType, paymentMethod } = req.body;

            const parcel = await Parcel.create({
                pickupAddress,
                deliveryAddress,
                parcelType,
                paymentMethod,
                status: "Booked",
                customer: decoded.userId,
            });

            return res.status(201).json({ message: "Parcel booked successfully", parcel });
        } catch (error) {
            console.error("Parcel booking error:", error);
            return res.status(500).json({ message: "Server error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}

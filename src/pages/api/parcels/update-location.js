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

        const { parcelId, lat, lng } = req.body;
        if (!parcelId || lat == null || lng == null) {
            return res.status(400).json({ message: "Parcel ID and location are required" });
        }

        const parcel = await Parcel.findById(parcelId);
        if (!parcel) return res.status(404).json({ message: "Parcel not found" });

        if (parcel.assignedAgent.toString() !== userId) {
            return res.status(403).json({ message: "You cannot update this parcel" });
        }

        // Reverse geocode the coordinates to get address
        let address = "Unknown location";
        try {
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const geoData = await geoRes.json();
            address = geoData.display_name || address;
        } catch (geoErr) {
            console.error("Reverse geocoding failed:", geoErr);
        }

        // Save in database
        parcel.currentLocation = { lat, lng, address };
        await parcel.save();

        // Emit the update via Socket.IO
        if (res.socket.server.io) {
            res.socket.server.io.emit("locationUpdated", {
                parcelId,
                lat,
                lng,
                address,
            });
        }

        res.status(200).json({ message: "Location updated" });
    } catch (err) {
        console.error("Update Location Error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

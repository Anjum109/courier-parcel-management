import { connectDB } from "@/lib/mongodb";
import Parcel from "@/models/Parcel";


export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    try {
        await connectDB();

        const { parcelId, agentId } = req.body;

        if (!parcelId || !agentId) {
            return res.status(400).json({ message: "Parcel ID and Agent ID required" });
        }

        const parcel = await Parcel.findByIdAndUpdate(
            parcelId,
            { deliveryAgent: agentId, status: "Assigned" },
            { new: true }
        );

        res.status(200).json({ message: "Agent assigned successfully", parcel });
    } catch (err) {
        console.error("Assign agent error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

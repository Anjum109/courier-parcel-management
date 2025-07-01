import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    try {
        await connectDB();
        const agents = await User.find({ role: "delivery" }).select("name email _id");
        res.status(200).json(agents);
    } catch (err) {
        console.error("Fetch agents error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

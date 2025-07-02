// pages/api/users/index.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();

        // Check if admin
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const adminUser = await User.findById(decoded.userId);
        if (!adminUser || adminUser.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        const users = await User.find().select("name email role createdAt");

        res.status(200).json(users);
    } catch (err) {
        console.error("Fetch users error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

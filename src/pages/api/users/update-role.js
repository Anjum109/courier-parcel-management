// /pages/api/users/update-role.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await connectDB();

        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verify admin
        const adminUser = await User.findById(decoded.userId);
        if (!adminUser || adminUser.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        const { userId, newRole } = req.body;

        if (!["admin", "customer", "delivery"].includes(newRole)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = newRole;
        await user.save();

        res.status(200).json({ message: "Role updated successfully", user });
    } catch (err) {
        console.error("Update role error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

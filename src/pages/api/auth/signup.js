// pages/api/auth/signup 
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email, password, role } = req.body;

    console.log("👉 Signup payload:", { name, email, password, role });

    try {
        await connectDB();

        const existing = await User.findOne({ email });
        if (existing) {
            console.log("⚠️ Email already exists");
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        console.log("✅ User created:", user);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error("❌ Signup Error:", error); // ← very important
        res.status(500).json({ message: 'Server error' });
    }
}

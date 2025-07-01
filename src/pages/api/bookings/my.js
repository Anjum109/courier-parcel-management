// // pages/api/bookings/my.js
// import jwt from "jsonwebtoken";

// import cookie from "cookie";
// import { connectDB } from "@/lib/mongodb";
// import Parcel from "@/models/Parcel";

// const JWT_SECRET = process.env.JWT_SECRET;

// export default async function handler(req, res) {
//     if (req.method !== "GET") {
//         return res.status(405).json({ message: "Method not allowed" });
//     }

//     try {
//         await connectDB();

//         // Get cookies safely
//         const cookies = cookie.parse(req.headers.cookie || "");
//         const token = cookies.token;

//         if (!token) {
//             return res.status(401).json({ message: "No token provided" });
//         }

//         // Verify token
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const userId = decoded.userId;

//         // Fetch parcels
//         const parcels = await Parcel.find({ customer: userId }).sort({ createdAt: -1 });

//         // Log for debugging
//         console.log("Fetched parcels:", parcels);

//         return res.status(200).json({ bookings: parcels });
//     } catch (error) {
//         console.error("API error:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// }

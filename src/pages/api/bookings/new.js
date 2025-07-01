// // /pages/api/bookings/new.js
// import jwt from 'jsonwebtoken';
// import dbConnect from '@/lib/mongodb';
// import Booking from '@/models/Booking';

// const JWT_SECRET = process.env.JWT_SECRET;

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }

//     try {
//         await dbConnect();

//         const authHeader = req.headers.authorization;
//         if (!authHeader) {
//             return res.status(401).json({ message: 'No token provided' });
//         }

//         const token = authHeader.split(' ')[1];
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const userEmail = decoded.email;

//         const { pickupAddress, deliveryAddress, parcelType, paymentMethod } = req.body;

//         const booking = new Booking({
//             userEmail,
//             pickupAddress,
//             deliveryAddress,
//             parcelType,
//             paymentMethod,
//             status: 'Booked',
//         });

//         await booking.save();

//         return res.status(201).json({ message: 'Booking created', booking });
//     } catch (error) {
//         console.error('API error:', error);
//         return res.status(500).json({ message: 'Server error' });
//     }
// }

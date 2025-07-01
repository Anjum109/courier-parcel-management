// pages/api/bookings/my.js
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/mongodb';
import Bookings from '@/models/Bookings';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const userEmail = decoded.email;

        const bookings = await Bookings.find({ userEmail }).sort({ createdAt: -1 });

        return res.status(200).json({ bookings });
    } catch (error) {
        console.error('API error:', error); // log stack trace
        return res.status(500).json({ message: 'Server error' });
    }

}

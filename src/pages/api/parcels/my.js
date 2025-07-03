import Parcel from '@/models/Parcel';
import User from '@/models/User';

const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const { connectDB } = require('@/lib/mongodb');



export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    try {
        await connectDB();

        let token = null;
        if (req.headers.cookie) {
            const parsed = cookie.parse(req.headers.cookie);
            token = parsed.token;
        }

        if (!token && req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) return res.status(401).json({ message: 'Unauthorized – No token' });

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ message: 'Unauthorized user' });

        let parcels;
        if (user.role === 'admin') {
            parcels = await Parcel.find().populate('assignedAgent', 'email name').sort({ createdAt: -1 });
        } else {
            parcels = await Parcel.find({ customer: user._id }).populate('assignedAgent', 'email name').sort({ createdAt: -1 });
        }

        return res.status(200).json(parcels);
    } catch (err) {
        console.error('Fetch Parcels Error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}

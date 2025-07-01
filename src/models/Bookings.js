// models/Booking.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    pickupAddress: String,
    deliveryAddress: String,
    parcelType: String,
    paymentMethod: String,
    status: { type: String, default: 'Booked' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

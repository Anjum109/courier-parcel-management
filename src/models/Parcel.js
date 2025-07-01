// models/Parcel.js
import mongoose from "mongoose";

const ParcelSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pickupAddress: String,
    deliveryAddress: String,
    parcelType: String,
    paymentMethod: String,
    status: { type: String, default: "Booked" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Parcel || mongoose.model("Parcel", ParcelSchema);

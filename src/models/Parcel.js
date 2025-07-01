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
    // customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Add this line to reference the assigned delivery agent
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
});

export default mongoose.models.Parcel || mongoose.model("Parcel", ParcelSchema);

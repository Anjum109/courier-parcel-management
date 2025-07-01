const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema(
    {
        pickupAddress: {
            type: String,
            required: true,
        },
        deliveryAddress: {
            type: String,
            required: true,
        },
        parcelType: {
            type: String,
            enum: ["Small Box", "Medium Box", "Large Box"],
            default: "Medium Box",
        },
        paymentMethod: {
            type: String,
            enum: ["Cash on Delivery", "Online Payment"],
            default: "Cash on Delivery",
        },
        status: {
            type: String,
            enum: ["Booked", "Picked Up", "In Transit", "Delivered", "Failed"],
            default: "Booked",
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        deliveryAgent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Parcel", parcelSchema);

// routes/parcel.js
const auth = require("@/middleware/auth");
const Parcel = require("@/models/Parcel");
const express = require("express");
const router = express.Router();


// POST /api/parcels - create new booking
router.post("/", auth, async (req, res) => {
    try {
        const { pickupAddress, deliveryAddress, parcelType, paymentMethod } = req.body;
        const parcel = new Parcel({
            pickupAddress,
            deliveryAddress,
            parcelType,
            paymentMethod,
            status: "Booked",
            customer: req.user._id,
        });
        await parcel.save();
        res.status(201).json(parcel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating booking" });
    }
});

// GET /api/parcels/my - get bookings for logged-in customer
router.get("/my", auth, async (req, res) => {
    try {
        const parcels = await Parcel.find({ customer: req.user._id }).sort({ createdAt: -1 });
        res.json(parcels);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

module.exports = router;

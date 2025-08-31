// Trip routes (CRUD operations)
const express = require("express");
const Trip = require("../models/Trip");
const { protect, admin } = require("../middleware/auth");

const router = express.Router();

// @desc    Get all trips
// @route   GET /api/trips
// @access  Public
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find({}).populate("createdBy", "name email");
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a trip
// @route   POST /api/trips
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      title,
      destination,
      description,
      price,
      duration,
      startDate,
      endDate,
      maxPeople,
      image,
    } = req.body;

    const trip = new Trip({
      title,
      destination,
      description,
      price,
      duration,
      startDate,
      endDate,
      maxPeople,
      image,
      createdBy: req.user._id,
    });

    const createdTrip = await trip.save();
    res.status(201).json(createdTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      title,
      destination,
      description,
      price,
      duration,
      startDate,
      endDate,
      maxPeople,
      image,
    } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (trip) {
      trip.title = title || trip.title;
      trip.destination = destination || trip.destination;
      trip.description = description || trip.description;
      trip.price = price || trip.price;
      trip.duration = duration || trip.duration;
      trip.startDate = startDate || trip.startDate;
      trip.endDate = endDate || trip.endDate;
      trip.maxPeople = maxPeople || trip.maxPeople;
      trip.image = image || trip.image;

      const updatedTrip = await trip.save();
      res.json(updatedTrip);
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
      await Trip.findByIdAndDelete(req.params.id);
      res.json({ message: "Trip removed" });
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Book a trip
// @route   POST /api/trips/:id/book
// @access  Private
router.post("/:id/book", protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
      if (trip.currentBookings < trip.maxPeople) {
        trip.currentBookings += 1;
        await trip.save();
        res.json({ message: "Trip booked successfully", trip });
      } else {
        res.status(400).json({ message: "Trip is fully booked" });
      }
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// Trip data model (schema)
const mongoose = require("mongoose");

const tripSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a trip title"],
    },
    destination: {
      type: String,
      required: [true, "Please add a destination"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    duration: {
      type: Number, // Duration in days
      required: [true, "Please add duration"],
    },
    startDate: {
      type: Date,
      required: [true, "Please add start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please add end date"],
    },
    maxPeople: {
      type: Number,
      required: [true, "Please add max people"],
    },
    currentBookings: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/400x200",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);

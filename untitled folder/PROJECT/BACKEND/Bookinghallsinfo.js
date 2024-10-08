const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  hallName: {
    type: String,
    required: true,
  },
  hallDescription: {
    type: String,
    required: true,
  },
  imageUri: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  isBooked: { type: Boolean, default: false },
  time : { type : Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);

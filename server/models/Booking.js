const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  // Room info snapshot
  roomId:      { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  roomNumber:  { type: String, required: true },
  floor:       { type: String },
  roomType:    { type: String },
  rent:        { type: Number },

  // Guest info
  name:        { type: String, required: true, trim: true },
  phone:       { type: String, required: true, trim: true },
  email:       { type: String, trim: true },
  moveInDate:  { type: String },
  message:     { type: String, default: "" },

  // Status
  status:      { type: String, enum: ["Pending","Confirmed","Cancelled"], default: "Pending" },
  whatsappSent:{ type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now },
})

module.exports = mongoose.model("Booking", bookingSchema)

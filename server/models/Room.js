const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
  floor:         { type: String, required: true, trim: true },
  roomNumber:    { type: String, required: true, trim: true, unique: true },
  totalBeds:     { type: Number, required: true, min: 1 },
  availableBeds: { type: Number, required: true, min: 0 },
  type:          { type: String, enum: ["AC", "Non-AC"], required: true },
  rent:          { type: Number, required: true },
  features:      { type: [String], default: [] },
  status:        { type: String, enum: ["Available", "Full", "Maintenance"], default: "Available" },
  description:   { type: String, default: "" },
  image:         { type: String, default: "" },
  images:        { type: [String], default: [] },
  createdAt:     { type: Date, default: Date.now },
})

// Auto-set status based on beds
roomSchema.pre("save", function(next) {
  if (this.availableBeds === 0) this.status = "Full"
  else if (this.status === "Full" && this.availableBeds > 0) this.status = "Available"
  next()
})

module.exports = mongoose.model("Room", roomSchema)

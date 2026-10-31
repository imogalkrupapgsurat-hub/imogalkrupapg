const mongoose = require("mongoose")

const gallerySchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true },
  category:  { type: String, required: true, enum: ["Rooms","Kitchen","Common Area","Building","Food","Other"], default: "Other" },
  filename:  { type: String, required: true },   // stored filename or original name
  url:       { type: String, required: true },   // public URL (Cloudinary or local)
  public_id: { type: String, default: "" },      // Cloudinary asset public_id
  size:      { type: Number },                   // bytes
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Gallery", gallerySchema)

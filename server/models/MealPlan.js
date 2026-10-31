const mongoose = require("mongoose")

const mealTimingSchema = new mongoose.Schema({
  meal:  { type: String, required: true },   // Breakfast / Lunch / Dinner
  time:  { type: String, required: true },   // 7:30 - 9:00 AM
  items: { type: String, default: "" },      // comma-separated items
}, { _id: false })

const mealPlanSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  price:       { type: Number, required: true, min: 0 },
  per:         { type: String, default: "month" },
  description: { type: String, default: "" },
  items:       { type: [String], default: [] },   // bullet list of includes
  timings:     { type: [mealTimingSchema], default: [] },
  isPopular:   { type: Boolean, default: false },
  isActive:    { type: Boolean, default: true },
  color:       { type: String, default: "from-amber-400 to-orange-500" },
  sortOrder:   { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now },
})

module.exports = mongoose.model("MealPlan", mealPlanSchema)

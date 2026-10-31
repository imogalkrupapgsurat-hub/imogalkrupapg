const express  = require("express")
const router   = express.Router()
const MealPlan = require("../models/MealPlan")
const auth     = require("../middleware/auth")

// Public: get all active plans
router.get("/", async (req, res) => {
  try {
    const filter = {}
    if (req.query.all !== "true") filter.isActive = true   // public sees only active
    const plans = await MealPlan.find(filter).sort({ sortOrder: 1, createdAt: 1 })
    res.json({ success: true, data: plans })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Public: single plan
router.get("/:id", async (req, res) => {
  try {
    const plan = await MealPlan.findById(req.params.id)
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" })
    res.json({ success: true, data: plan })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Admin: create
router.post("/", auth, async (req, res) => {
  try {
    const plan = new MealPlan(req.body)
    await plan.save()
    res.status(201).json({ success: true, data: plan, message: "Meal plan created" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// Admin: update
router.put("/:id", auth, async (req, res) => {
  try {
    const plan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" })
    res.json({ success: true, data: plan, message: "Meal plan updated" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// Admin: delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const plan = await MealPlan.findByIdAndDelete(req.params.id)
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" })
    res.json({ success: true, message: "Meal plan deleted" })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router

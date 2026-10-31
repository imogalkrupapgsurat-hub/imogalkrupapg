const express  = require("express")
const router   = express.Router()
const Booking  = require("../models/Booking")
const auth     = require("../middleware/auth")

// Public: create booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, whatsappSent: true })
    await booking.save()
    res.status(201).json({ success: true, data: booking, message: "Booking saved successfully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// Admin: get all bookings
router.get("/", auth, async (req, res) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status
    const bookings = await Booking.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, data: bookings })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Admin: update booking status
router.put("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" })
    res.json({ success: true, data: booking })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// Admin: delete booking
router.delete("/:id", auth, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Booking deleted" })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router

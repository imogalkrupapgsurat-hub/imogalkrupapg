const express  = require("express")
const router   = express.Router()
const jwt      = require("jsonwebtoken")
const Admin    = require("../models/Admin")

const SECRET = process.env.JWT_SECRET || "mogalkrupa_secret_2024"

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username })
    if (!admin) return res.status(401).json({ success: false, message: "Invalid credentials" })
    const ok = await admin.comparePassword(password)
    if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" })
    const token = jwt.sign({ id: admin._id, username: admin.username }, SECRET, { expiresIn: "7d" })
    res.json({ success: true, token, username: admin.username })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Verify token
router.get("/verify", require("../middleware/auth"), (req, res) => {
  res.json({ success: true, user: req.admin })
})

// Seed default admin (run once)
router.post("/seed", async (req, res) => {
  try {
    const exists = await Admin.findOne({ username: "admin" })
    if (exists) return res.json({ success: false, message: "Admin already exists" })
    const admin = new Admin({ username: "admin", password: "mogalkrupa@2024" })
    await admin.save()
    res.json({ success: true, message: "Admin created. user: admin | pass: mogalkrupa@2024" })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router

const express = require("express")
const router  = express.Router()
const multer  = require("multer")
const path    = require("path")
const fs      = require("fs")
const { v4: uuidv4 } = require("uuid")
const Room    = require("../models/Room")
const auth    = require("../middleware/auth")
const {
  isCloudinaryConfigured,
  uploadStreamToCloudinary,
} = require("../config/cloudinary")

// Multer in-memory storage for Cloudinary upload, with fallback to disk
const memoryStorage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/
  const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)
  ok ? cb(null, true) : cb(new Error("Only images (jpeg, jpg, png, webp, gif) are allowed"))
}
const upload = multer({ storage: memoryStorage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })

// ── Admin: Upload room image to Cloudinary ──
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No image file provided" })

    let imageUrl = ""
    if (isCloudinaryConfigured()) {
      const cldResult = await uploadStreamToCloudinary(req.file.buffer, {
        folder: "mogal_krupa_pg/rooms",
      })
      imageUrl = cldResult.secure_url
    } else {
      const dir = path.join(__dirname, "../uploads/rooms")
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      const ext = path.extname(req.file.originalname).toLowerCase()
      const filename = `room-${uuidv4()}${ext}`
      fs.writeFileSync(path.join(dir, filename), req.file.buffer)
      imageUrl = `/uploads/rooms/${filename}`
    }

    res.json({
      success: true,
      url: imageUrl,
      isCloudinary: imageUrl.includes("cloudinary.com"),
      message: "Image uploaded successfully",
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Public: Get all rooms (with optional filters)
router.get("/", async (req, res) => {
  try {
    const filter = {}
    if (req.query.type)   filter.type   = req.query.type
    if (req.query.status) filter.status = req.query.status
    if (req.query.floor)  filter.floor  = req.query.floor
    const rooms = await Room.find(filter).sort({ floor: 1, roomNumber: 1 })
    res.json({ success: true, data: rooms })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Public: Get single room
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    if (!room) return res.status(404).json({ success: false, message: "Room not found" })
    res.json({ success: true, data: room })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Admin: Create room
router.post("/", auth, async (req, res) => {
  try {
    const room = new Room(req.body)
    await room.save()
    res.status(201).json({ success: true, data: room, message: "Room added successfully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// Admin: Update room
router.put("/:id", auth, async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!room) return res.status(404).json({ success: false, message: "Room not found" })
    res.json({ success: true, data: room, message: "Room updated successfully" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// Admin: Delete room
router.delete("/:id", auth, async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id)
    if (!room) return res.status(404).json({ success: false, message: "Room not found" })
    res.json({ success: true, message: "Room deleted successfully" })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router

const express = require("express")
const router  = express.Router()
const multer  = require("multer")
const path    = require("path")
const fs      = require("fs")
const { v4: uuidv4 } = require("uuid")
const Gallery = require("../models/Gallery")
const auth    = require("../middleware/auth")
const {
  isCloudinaryConfigured,
  uploadStreamToCloudinary,
  deleteFromCloudinary,
} = require("../config/cloudinary")

// Multer in-memory storage for Cloudinary upload, with fallback to disk
const memoryStorage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/
  const ok = allowed.test(path.extname(file.originalname).toLowerCase())
            && allowed.test(file.mimetype)
  ok ? cb(null, true) : cb(new Error("Only images allowed (jpg, png, webp, gif)"))
}
const upload = multer({ storage: memoryStorage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })

const BASE_URL = process.env.BASE_URL || "http://localhost:5000"

// ── Check Cloudinary configuration status ──
router.get("/cloudinary-status", (req, res) => {
  res.json({
    success: true,
    isCloudinary: isCloudinaryConfigured(),
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  })
})

// ── Public: Get all gallery images ──
router.get("/", async (req, res) => {
  try {
    const filter = {}
    if (req.query.category) filter.category = req.query.category
    const images = await Gallery.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, data: images })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ── Admin: Upload single image to Cloudinary ──
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" })
    const { title, category } = req.body

    let imageUrl = ""
    let publicId = ""

    if (isCloudinaryConfigured()) {
      // Direct Cloudinary Upload
      const cldResult = await uploadStreamToCloudinary(req.file.buffer, {
        folder: "mogal_krupa_pg/gallery",
      })
      imageUrl = cldResult.secure_url
      publicId = cldResult.public_id
    } else {
      // Fallback to local storage if Cloudinary keys not provided in .env
      const dir = path.join(__dirname, "../uploads/gallery")
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      const ext = path.extname(req.file.originalname).toLowerCase()
      const filename = `${uuidv4()}${ext}`
      fs.writeFileSync(path.join(dir, filename), req.file.buffer)
      imageUrl = `${BASE_URL}/uploads/gallery/${filename}`
    }

    const gallery = new Gallery({
      title:     title || req.file.originalname,
      category:  category || "Other",
      filename:  req.file.originalname,
      url:       imageUrl,
      public_id: publicId,
      size:      req.file.size,
    })
    await gallery.save()

    res.status(201).json({
      success: true,
      data: gallery,
      isCloudinary: !!publicId,
      message: publicId
        ? "Image uploaded to Cloudinary successfully!"
        : "Image uploaded locally (Cloudinary credentials not set in .env)",
    })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// ── Admin: Upload multiple images (bulk) ──
router.post("/upload-many", auth, upload.array("images", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ success: false, message: "No files uploaded" })
    const { category } = req.body

    const docs = []
    for (const file of req.files) {
      let imageUrl = ""
      let publicId = ""

      if (isCloudinaryConfigured()) {
        const cldResult = await uploadStreamToCloudinary(file.buffer, {
          folder: "mogal_krupa_pg/gallery",
        })
        imageUrl = cldResult.secure_url
        publicId = cldResult.public_id
      } else {
        const dir = path.join(__dirname, "../uploads/gallery")
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        const ext = path.extname(file.originalname).toLowerCase()
        const filename = `${uuidv4()}${ext}`
        fs.writeFileSync(path.join(dir, filename), file.buffer)
        imageUrl = `${BASE_URL}/uploads/gallery/${filename}`
      }

      docs.push({
        title:     file.originalname.replace(/\.[^.]+$/, ""),
        category:  category || "Other",
        filename:  file.originalname,
        url:       imageUrl,
        public_id: publicId,
        size:      file.size,
      })
    }

    const saved = await Gallery.insertMany(docs)
    res.status(201).json({
      success: true,
      data: saved,
      message: `${saved.length} images uploaded successfully`,
    })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// ── Admin: Update image meta ──
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, category } = req.body
    const img = await Gallery.findByIdAndUpdate(req.params.id, { title, category }, { new: true })
    if (!img) return res.status(404).json({ success: false, message: "Image not found" })
    res.json({ success: true, data: img })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// ── Admin: Delete image ──
router.delete("/:id", auth, async (req, res) => {
  try {
    const img = await Gallery.findByIdAndDelete(req.params.id)
    if (!img) return res.status(404).json({ success: false, message: "Image not found" })

    // If hosted on Cloudinary, delete from Cloudinary
    if (img.public_id) {
      await deleteFromCloudinary(img.public_id)
    } else {
      // Local file cleanup
      const filePath = path.join(__dirname, "../uploads/gallery", img.filename)
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }

    res.json({ success: true, message: "Image deleted successfully" })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router

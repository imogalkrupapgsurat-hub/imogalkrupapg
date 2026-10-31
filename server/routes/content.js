const express     = require("express")
const router      = express.Router()
const SiteContent = require("../models/SiteContent")
const auth        = require("../middleware/auth")

// Public: get site content in Gujarati
router.get("/", async (req, res) => {
  try {
    const content = await SiteContent.getSingleton()
    res.json({ success: true, data: content })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Admin: update site content in Gujarati
router.put("/", auth, async (req, res) => {
  try {
    let content = await SiteContent.findOne()
    if (!content) {
      content = new SiteContent(req.body)
    } else {
      Object.assign(content, req.body)
      content.updatedAt = new Date()
    }
    await content.save()
    res.json({ success: true, data: content, message: "વેબસાઇટ કન્ટેન્ટ સફળતાપૂર્વક અપડેટ થયું!" })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

module.exports = router

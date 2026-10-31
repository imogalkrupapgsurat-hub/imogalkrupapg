const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173" ||
    "http://192.168.0.103:5173/",
  credentials: true
}))
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/rooms", require("./routes/rooms"))
app.use("/api/contact", require("./routes/contact"))
app.use("/api/booking", require("./routes/booking"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/gallery", require("./routes/gallery"))
app.use("/api/mealplans", require("./routes/mealplans"))
app.use("/api/content", require("./routes/content"))

app.get("/", (req, res) => res.json({ message: "Mogal Krupa PG API running" }))

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mogalkrupapg")
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  })
  .catch(err => console.error("MongoDB error:", err))

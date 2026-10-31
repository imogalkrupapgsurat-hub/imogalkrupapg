const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET || "mogalkrupa_secret_2024"

module.exports = (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" })
  }
  try {
    const token = header.split(" ")[1]
    req.admin = jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" })
  }
}

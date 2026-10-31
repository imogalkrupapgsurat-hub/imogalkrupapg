const cloudinary = require("cloudinary").v2
require("dotenv").config()

const isCloudinaryConfigured = () => {
  return !!(
    (process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET) ||
    process.env.CLOUDINARY_URL
  )
}

if (isCloudinaryConfigured()) {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL })
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key:    process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }
}

/**
 * Uploads a file buffer directly to Cloudinary using upload_stream
 * @param {Buffer} buffer - File buffer from multer memory storage or fs
 * @param {Object} options - Cloudinary upload options (folder, tags, etc.)
 * @returns {Promise<Object>} Cloudinary upload result
 */
const uploadStreamToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: "image",
      folder: options.folder || "mogal_krupa_pg",
      transformation: options.transformation || [{ quality: "auto", fetch_format: "auto" }],
      ...options,
    }

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })

    stream.end(buffer)
  })
}

/**
 * Deletes an image from Cloudinary by public_id
 * @param {string} public_id
 */
const deleteFromCloudinary = async (public_id) => {
  if (!isCloudinaryConfigured() || !public_id) return null
  try {
    return await cloudinary.uploader.destroy(public_id)
  } catch (err) {
    console.error("Cloudinary delete error:", err.message)
    return null
  }
}

module.exports = {
  cloudinary,
  isCloudinaryConfigured,
  uploadStreamToCloudinary,
  deleteFromCloudinary,
}

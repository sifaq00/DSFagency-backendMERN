const express = require("express");
const router = express.Router();
const { getHero, updateHero } = require("../controllers/heroController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage for hero images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hero",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }],
  },
});

const upload = multer({ storage });

// Public route
router.get("/", getHero);

// Admin route (protected)
router.put("/", authMiddleware, upload.single("heroImage"), updateHero);

module.exports = router;

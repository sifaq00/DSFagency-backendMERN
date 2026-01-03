const express = require("express");
const { getAbout, updateAbout } = require("../controllers/aboutController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

const router = express.Router();

// Setup Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "about",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }],
  },
});

const upload = multer({ storage });

router.get("/", getAbout);
router.put("/", authMiddleware, upload.single("aboutImage"), updateAbout);

module.exports = router;

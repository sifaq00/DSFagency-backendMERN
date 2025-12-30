const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Konfigurasi Multer untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Simpan di folder uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Format nama file
  },
});

const upload = multer({ storage });

// Route untuk mendapatkan semua testimonials
router.get("/", getTestimonials);

// Route untuk membuat testimonial (dengan upload gambar)
router.post("/", authMiddleware, upload.single("image"), createTestimonial);

// Route untuk mengupdate testimonial (dengan upload gambar)
router.put("/:id", authMiddleware, upload.single("image"), updateTestimonial);

// Route untuk menghapus testimonial
router.delete("/:id", authMiddleware, deleteTestimonial);

module.exports = router;
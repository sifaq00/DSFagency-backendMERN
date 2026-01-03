const express = require("express");
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadTestimonial } = require("../config/cloudinary");

const router = express.Router();

// Route untuk mendapatkan semua testimonials
router.get("/", getTestimonials);

// Route untuk membuat testimonial (dengan upload gambar)
router.post("/", authMiddleware, uploadTestimonial.single("image"), createTestimonial);

// Route untuk mengupdate testimonial (dengan upload gambar)
router.put("/:id", authMiddleware, uploadTestimonial.single("image"), updateTestimonial);

// Route untuk menghapus testimonial
router.delete("/:id", authMiddleware, deleteTestimonial);

module.exports = router;
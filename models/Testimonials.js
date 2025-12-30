const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: "" } // 🔥 Default ke string kosong jika tidak ada gambar
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);

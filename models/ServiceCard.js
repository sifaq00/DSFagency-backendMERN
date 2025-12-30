const mongoose = require("mongoose");

const ServiceCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Deskripsi singkat
  image: { type: String } // URL gambar
});

module.exports = mongoose.model("ServiceCard", ServiceCardSchema);
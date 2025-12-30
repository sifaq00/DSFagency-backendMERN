const mongoose = require("mongoose");

const serviceDetailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }, // Path ke gambar
});

module.exports = mongoose.model("ServiceDetail", serviceDetailSchema);
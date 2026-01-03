const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema({
  content: { type: String, required: true },
  advantages: { type: [String], default: [] },
  aboutImage: { type: String, default: "" },
});

module.exports = mongoose.model("AboutUs", AboutUsSchema);

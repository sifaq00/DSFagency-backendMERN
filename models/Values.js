const mongoose = require("mongoose");

const ValuesSchema = new mongoose.Schema({
  vision: { type: String, required: true },
  mission: { type: String, required: true }
});

module.exports = mongoose.model("Values", ValuesSchema);

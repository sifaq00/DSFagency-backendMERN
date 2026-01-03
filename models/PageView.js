const mongoose = require("mongoose");

const PageViewSchema = new mongoose.Schema(
  {
    path: { type: String, default: "/" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PageView", PageViewSchema);

const mongoose = require("mongoose");

const PageViewSchema = new mongoose.Schema(
  {
    path: { type: String, default: "/" },
    userAgent: { type: String, default: "" },
    visitorId: { type: String, default: "" }, // Unique visitor identifier
    ip: { type: String, default: "" },
    device: { 
      type: String, 
      enum: ["desktop", "mobile", "tablet", "unknown"],
      default: "unknown" 
    },
    browser: { type: String, default: "" },
    os: { type: String, default: "" },
  },
  { timestamps: true }
);

// Index for faster queries
PageViewSchema.index({ createdAt: -1 });
PageViewSchema.index({ visitorId: 1, createdAt: -1 });

module.exports = mongoose.model("PageView", PageViewSchema);

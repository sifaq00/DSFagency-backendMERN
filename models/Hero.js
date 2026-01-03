const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema(
  {
    headline: { type: String, default: "Transform Your Digital Presence" },
    subheadline: { type: String, default: "We craft stunning websites and digital experiences" },
    ctaText: { type: String, default: "Hubungi Kami" },
    ctaLink: { type: String, default: "#Contacts" },
    backgroundImage: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", HeroSchema);

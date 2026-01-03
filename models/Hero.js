const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema(
  {
    badgeText: { type: String, default: "Digital Marketing Agency" },
    headline: { type: String, default: "Grow Your Digital Business" },
    subheadline: { type: String, default: "Solusi Digital Marketing profesional untuk UMKM dan bisnis yang ingin berkembang lebih cepat dan terukur." },
    ctaText: { type: String, default: "Get Started" },
    ctaLink: { type: String, default: "#Contacts" },
    secondaryCtaText: { type: String, default: "Learn More" },
    secondaryCtaLink: { type: String, default: "#About" },
    heroImage: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", HeroSchema);

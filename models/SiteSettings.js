const mongoose = require("mongoose");

const SiteSettingsSchema = new mongoose.Schema(
  {
    // Contact Info
    email: { type: String, default: "hello@dsfdigital.com" },
    phone: { type: String, default: "+62 812 3456 7890" },
    whatsapp: { type: String, default: "+6281234567890" },
    address: { type: String, default: "Jakarta, Indonesia" },
    
    // Social Media Links
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    youtube: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    
    // Company Info
    companyName: { type: String, default: "DSF Digital Agency" },
    tagline: { type: String, default: "Your Digital Partner" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteSettings", SiteSettingsSchema);

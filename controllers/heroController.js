const Hero = require("../models/Hero");
const cloudinary = require("../config/cloudinary");

// Get hero content (public)
const getHero = async (req, res) => {
  try {
    let hero = await Hero.findOne({ isActive: true });
    if (!hero) {
      // Create default hero if not exists
      hero = await Hero.create({});
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data hero" });
  }
};

// Update hero content (admin)
const updateHero = async (req, res) => {
  try {
    const { badgeText, headline, subheadline, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink } = req.body;
    
    let hero = await Hero.findOne({ isActive: true });
    
    // Handle image - prioritize uploaded file, then existing URL from body
    let imageUrl = hero?.heroImage || "";
    
    if (req.file) {
      // New file uploaded via multer
      // Delete old image from cloudinary if exists
      if (hero?.heroImage && hero.heroImage.includes("cloudinary")) {
        try {
          const publicId = hero.heroImage.split("/").slice(-2).join("/").split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (deleteError) {
          console.log("Could not delete old image:", deleteError.message);
        }
      }
      imageUrl = req.file.path;
    } else if (req.body.heroImage && req.body.heroImage !== "undefined" && req.body.heroImage !== "null") {
      // Keep existing URL from body if no new file
      imageUrl = req.body.heroImage;
    }
    
    const updateData = {
      badgeText: badgeText || "",
      headline: headline || "",
      subheadline: subheadline || "",
      ctaText: ctaText || "",
      ctaLink: ctaLink || "",
      secondaryCtaText: secondaryCtaText || "",
      secondaryCtaLink: secondaryCtaLink || "",
      heroImage: imageUrl,
    };
    
    if (!hero) {
      hero = await Hero.create(updateData);
    } else {
      hero = await Hero.findByIdAndUpdate(hero._id, updateData, { new: true });
    }
    
    res.json(hero);
  } catch (error) {
    console.error("Error updating hero:", error);
    res.status(500).json({ message: "Gagal mengupdate hero", error: error.message });
  }
};

module.exports = {
  getHero,
  updateHero,
};

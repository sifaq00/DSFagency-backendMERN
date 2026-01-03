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
    const { badgeText, headline, subheadline, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink, heroImage } = req.body;
    
    let hero = await Hero.findOne({ isActive: true });
    
    // Handle image upload if file is provided
    let imageUrl = heroImage;
    if (req.file) {
      // Delete old image from cloudinary if exists
      if (hero?.heroImage && hero.heroImage.includes("cloudinary")) {
        const publicId = hero.heroImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`hero/${publicId}`);
      }
      imageUrl = req.file.path;
    }
    
    const updateData = {
      badgeText,
      headline,
      subheadline,
      ctaText,
      ctaLink,
      secondaryCtaText,
      secondaryCtaLink,
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
    res.status(500).json({ message: "Gagal mengupdate hero" });
  }
};

module.exports = {
  getHero,
  updateHero,
};

const Hero = require("../models/Hero");

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
    const { headline, subheadline, ctaText, ctaLink } = req.body;
    
    let hero = await Hero.findOne({ isActive: true });
    if (!hero) {
      hero = await Hero.create({ headline, subheadline, ctaText, ctaLink });
    } else {
      hero = await Hero.findByIdAndUpdate(
        hero._id,
        { headline, subheadline, ctaText, ctaLink },
        { new: true }
      );
    }
    
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate hero" });
  }
};

module.exports = {
  getHero,
  updateHero,
};

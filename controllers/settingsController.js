const SiteSettings = require("../models/SiteSettings");

// Get site settings (public)
const getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // Create default settings if not exists
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil pengaturan" });
  }
};

// Update site settings (admin)
const updateSettings = async (req, res) => {
  try {
    const {
      email,
      phone,
      whatsapp,
      address,
      instagram,
      facebook,
      twitter,
      linkedin,
      youtube,
      tiktok,
      companyName,
      tagline,
    } = req.body;

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(
        settings._id,
        {
          email,
          phone,
          whatsapp,
          address,
          instagram,
          facebook,
          twitter,
          linkedin,
          youtube,
          tiktok,
          companyName,
          tagline,
        },
        { new: true }
      );
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate pengaturan" });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};

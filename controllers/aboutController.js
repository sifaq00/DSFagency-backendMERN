const About = require("../models/AboutUs");

// Get About Us
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "Data About Us tidak ditemukan" });
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};

// Update About Us
exports.updateAbout = async (req, res) => {
    try {
      const { content, advantages } = req.body;
  
      if (!content || !Array.isArray(advantages)) {
        return res.status(400).json({ message: "Data tidak valid!" });
      }
  
      const about = await About.findOneAndUpdate(
        {}, // Cari dokumen pertama (karena hanya satu)
        { content, advantages },
        { new: true, upsert: true } // Buat jika tidak ada
      );
  
      res.json({ message: "About Us berhasil diperbarui", about });
    } catch (error) {
      res.status(500).json({ message: "Gagal menyimpan data", error: error.message });
    }
  };
const About = require("../models/AboutUs");
const { cloudinary } = require("../config/cloudinary");

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
    const { content, advantages, aboutImage } = req.body;

    // Parse advantages jika string
    let parsedAdvantages = advantages;
    if (typeof advantages === "string") {
      try {
        parsedAdvantages = JSON.parse(advantages);
      } catch {
        parsedAdvantages = [];
      }
    }

    if (!content) {
      return res.status(400).json({ message: "Content tidak boleh kosong!" });
    }

    // Get existing data
    const existingAbout = await About.findOne();

    // Handle image
    let imageUrl = existingAbout?.aboutImage || "";

    // Jika ada file upload baru
    if (req.file) {
      // Hapus gambar lama dari Cloudinary jika ada
      if (existingAbout?.aboutImage) {
        const publicId = existingAbout.aboutImage.split("/").slice(-2).join("/").split(".")[0];
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Gagal hapus gambar lama:", err);
        }
      }
      imageUrl = req.file.path;
    } else if (aboutImage !== undefined) {
      // Jika aboutImage dikirim (bisa kosong untuk hapus, atau URL existing)
      if (aboutImage === "" && existingAbout?.aboutImage) {
        // Hapus gambar dari Cloudinary
        const publicId = existingAbout.aboutImage.split("/").slice(-2).join("/").split(".")[0];
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Gagal hapus gambar:", err);
        }
        imageUrl = "";
      } else if (aboutImage) {
        imageUrl = aboutImage;
      }
    }

    const about = await About.findOneAndUpdate(
      {},
      { content, advantages: parsedAdvantages, aboutImage: imageUrl },
      { new: true, upsert: true }
    );

    res.json({ message: "About Us berhasil diperbarui", about });
  } catch (error) {
    console.error("Error update about:", error);
    res.status(500).json({ message: "Gagal menyimpan data", error: error.message });
  }
};
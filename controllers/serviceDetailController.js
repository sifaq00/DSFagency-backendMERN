const ServiceDetail = require("../models/ServiceDetail");

// Get all service details
exports.getServiceDetails = async (req, res) => {
  try {
    const serviceDetails = await ServiceDetail.find();
    res.json(serviceDetails);
  } catch (error) {
    console.error("Error fetching service details:", error); // Log error
    res.status(500).json({ message: "Gagal mengambil data service details" });
  }
};

// Create service detail dengan upload gambar
exports.createServiceDetail = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Judul dan deskripsi harus diisi" });
    }

    const image = req.file ? req.file.path : ""; // Cloudinary URL
    const newServiceDetail = new ServiceDetail({ title, description, image });
    await newServiceDetail.save();

    res.status(201).json(newServiceDetail);
  } catch (error) {
    console.error("Error creating service detail:", error); // Log error
    res.status(500).json({ message: "Gagal membuat service detail" });
  }
};

// Update service detail dengan upload gambar baru
exports.updateServiceDetail = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : req.body.image; // Cloudinary URL

    const updatedServiceDetail = await ServiceDetail.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );

    if (!updatedServiceDetail) {
      return res.status(404).json({ message: "Service detail tidak ditemukan" });
    }

    res.json(updatedServiceDetail);
  } catch (error) {
    console.error("Error updating service detail:", error); // Log error
    res.status(500).json({ message: "Gagal memperbarui service detail" });
  }
};

// Delete service detail
exports.deleteServiceDetail = async (req, res) => {
  try {
    const deletedServiceDetail = await ServiceDetail.findByIdAndDelete(req.params.id);
    if (!deletedServiceDetail) {
      return res.status(404).json({ message: "Service detail tidak ditemukan" });
    }

    res.json({ message: "Service detail berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting service detail:", error); // Log error
    res.status(500).json({ message: "Gagal menghapus service detail" });
  }
};
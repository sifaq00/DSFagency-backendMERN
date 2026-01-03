const ServiceCard = require("../models/ServiceCard");

// Get all service cards
exports.getServiceCards = async (req, res) => {
  try {
    const serviceCards = await ServiceCard.find();
    res.json(serviceCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create service card dengan upload gambar
exports.createServiceCard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : ""; // Cloudinary URL

    const newServiceCard = new ServiceCard({ title, description, image });
    await newServiceCard.save();

    res.status(201).json(newServiceCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update service card dengan upload gambar baru
exports.updateServiceCard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : req.body.image; // Cloudinary URL

    const updatedServiceCard = await ServiceCard.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );

    res.json(updatedServiceCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete service card
exports.deleteServiceCard = async (req, res) => {
  try {
    await ServiceCard.findByIdAndDelete(req.params.id);
    res.json({ message: "Service card deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Client = require("../models/Client");

// CREATE client dengan logo
exports.createClient = async (req, res) => {
  try {
    const { name } = req.body;
    const logo = req.file ? req.file.path : ""; // Cloudinary mengembalikan path sebagai URL

    if (!logo) {
      return res.status(400).json({ message: "Logo harus diupload" });
    }

    const newClient = new Client({ name, logo });
    await newClient.save();

    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE client dengan logo baru
exports.updateClient = async (req, res) => {
  try {
    const { name } = req.body;
    const logo = req.file ? req.file.path : req.body.logo; // Gunakan logo baru jika ada

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { name, logo },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client tidak ditemukan" });
    }

    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 }); // Urutkan dari yang terbaru
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE client
exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    
    if (!deletedClient) {
      return res.status(404).json({ message: "Client tidak ditemukan" });
    }

    res.json({ message: "Client berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

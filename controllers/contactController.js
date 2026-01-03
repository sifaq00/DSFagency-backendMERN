const Contact = require("../models/Contact");

// Get all contacts (admin)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data pesan" });
  }
};

// Get unread count
const getUnreadCount = async (req, res) => {
  try {
    const count = await Contact.countDocuments({ isRead: false });
    res.json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil jumlah pesan" });
  }
};

// Submit contact form (public)
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Nama, email, dan pesan harus diisi" });
    }
    
    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ message: "Pesan berhasil dikirim!", contact });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengirim pesan" });
  }
};

// Mark as read
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate status" });
  }
};

// Reply to contact
const replyContact = async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { 
        isReplied: true, 
        repliedAt: new Date(),
        replyMessage 
      },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Gagal membalas pesan" });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    }
    res.json({ message: "Pesan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus pesan" });
  }
};

module.exports = {
  getContacts,
  getUnreadCount,
  submitContact,
  markAsRead,
  replyContact,
  deleteContact,
};

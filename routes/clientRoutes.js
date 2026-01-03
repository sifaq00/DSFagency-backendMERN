const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Konfigurasi Multer untuk upload logo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Simpan di folder uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Format nama file
  },
});

const upload = multer({ storage });

// Route untuk mendapatkan semua clients
router.get("/", getClients);

// Route untuk membuat client (dengan upload logo)
router.post("/", authMiddleware, upload.single("logo"), createClient);

// Route untuk mengupdate client (dengan upload logo)
router.put("/:id", authMiddleware, upload.single("logo"), updateClient);

// Route untuk menghapus client
router.delete("/:id", authMiddleware, deleteClient);

module.exports = router;

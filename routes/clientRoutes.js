const express = require("express");
const {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadClient } = require("../config/cloudinary");

const router = express.Router();

// Route untuk mendapatkan semua clients
router.get("/", getClients);

// Route untuk membuat client (dengan upload logo)
router.post("/", authMiddleware, uploadClient.single("logo"), createClient);

// Route untuk mengupdate client (dengan upload logo)
router.put("/:id", authMiddleware, uploadClient.single("logo"), updateClient);

// Route untuk menghapus client
router.delete("/:id", authMiddleware, deleteClient);

module.exports = router;

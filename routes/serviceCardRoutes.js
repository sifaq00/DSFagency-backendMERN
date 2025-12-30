const express = require("express");
const {
  getServiceCards,
  createServiceCard,
  updateServiceCard,
  deleteServiceCard,
  upload,
} = require("../controllers/serviceCardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getServiceCards);
router.post("/", authMiddleware, upload.single("image"), createServiceCard); // Tambahkan upload.single("image")
router.put("/:id", authMiddleware, upload.single("image"), updateServiceCard); // Tambahkan upload.single("image")
router.delete("/:id", authMiddleware, deleteServiceCard);

module.exports = router;
const express = require("express");
const {
  getServiceCards,
  createServiceCard,
  updateServiceCard,
  deleteServiceCard,
} = require("../controllers/serviceCardController");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadServiceCard } = require("../config/cloudinary");

const router = express.Router();

router.get("/", getServiceCards);
router.post("/", authMiddleware, uploadServiceCard.single("image"), createServiceCard);
router.put("/:id", authMiddleware, uploadServiceCard.single("image"), updateServiceCard);
router.delete("/" + ":id", authMiddleware, deleteServiceCard);

module.exports = router;
const express = require("express");
const {
  getServiceDetails,
  createServiceDetail,
  updateServiceDetail,
  deleteServiceDetail,
  upload,
} = require("../controllers/serviceDetailController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getServiceDetails);
router.post("/", authMiddleware, upload.single("image"), createServiceDetail); // Pastikan upload.single("image") digunakan
router.put("/:id", authMiddleware, upload.single("image"), updateServiceDetail); // Pastikan upload.single("image") digunakan
router.delete("/:id", authMiddleware, deleteServiceDetail);

module.exports = router;
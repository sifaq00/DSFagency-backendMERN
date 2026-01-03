const express = require("express");
const {
  getServiceDetails,
  createServiceDetail,
  updateServiceDetail,
  deleteServiceDetail,
} = require("../controllers/serviceDetailController");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadServiceDetail } = require("../config/cloudinary");

const router = express.Router();

router.get("/", getServiceDetails);
router.post("/", authMiddleware, uploadServiceDetail.single("image"), createServiceDetail);
router.put("/:id", authMiddleware, uploadServiceDetail.single("image"), updateServiceDetail);
router.delete("/:id", authMiddleware, deleteServiceDetail);

module.exports = router;
const express = require("express");
const { getAbout, updateAbout } = require("../controllers/aboutController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAbout);
router.put("/", authMiddleware, updateAbout); // Gunakan "/update" agar lebih jelas


module.exports = router;

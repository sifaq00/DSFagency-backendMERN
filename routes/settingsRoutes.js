const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/settingsController");
const authMiddleware = require("../middleware/authMiddleware");

// Public route
router.get("/", getSettings);

// Admin route (protected)
router.put("/", authMiddleware, updateSettings);

module.exports = router;

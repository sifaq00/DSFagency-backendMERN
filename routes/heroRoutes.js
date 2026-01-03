const express = require("express");
const router = express.Router();
const { getHero, updateHero } = require("../controllers/heroController");
const authMiddleware = require("../middleware/authMiddleware");

// Public route
router.get("/", getHero);

// Admin route (protected)
router.put("/", authMiddleware, updateHero);

module.exports = router;

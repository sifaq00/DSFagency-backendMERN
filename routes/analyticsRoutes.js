const express = require("express");
const { getAnalytics, trackVisit } = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAnalytics);
router.post("/track", trackVisit);

module.exports = router;

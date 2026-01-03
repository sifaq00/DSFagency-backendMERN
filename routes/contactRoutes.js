const express = require("express");
const router = express.Router();
const {
  getContacts,
  getUnreadCount,
  submitContact,
  markAsRead,
  replyContact,
  deleteContact,
} = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");

// Public route
router.post("/", submitContact);

// Admin routes (protected)
router.get("/", authMiddleware, getContacts);
router.get("/unread", authMiddleware, getUnreadCount);
router.put("/:id/read", authMiddleware, markAsRead);
router.put("/:id/reply", authMiddleware, replyContact);
router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;

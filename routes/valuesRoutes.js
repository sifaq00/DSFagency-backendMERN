const express = require("express");
const { getValues, updateValues } = require("../controllers/valuesController");
const authMiddleware = require("../middleware/authMiddleware"); // Proteksi dengan JWT

const router = express.Router();

router.get("/", getValues); // Ambil data Values
router.put("/", authMiddleware, updateValues); // Update Values (Harus login)

module.exports = router;

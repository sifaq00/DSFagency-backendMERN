const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); 
const User = require('../models/User'); // 🔥 Jangan lupa import model User!

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Get all users (Hanya bisa diakses jika login)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await User.find(); // ✅ Sekarang User sudah terdefinisi
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

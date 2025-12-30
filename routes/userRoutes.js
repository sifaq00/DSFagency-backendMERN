const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Cek apakah email sudah ada
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await user.deleteOne();
        res.json({ message: "User berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

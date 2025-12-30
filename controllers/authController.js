const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Cek apakah email sudah terdaftar
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email sudah digunakan" });

        // Simpan user ke database (password otomatis di-hash karena di model)
        user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: "User berhasil didaftarkan" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cek apakah user ada di database
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email tidak ditemukan" });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password salah" });

        // Generate token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

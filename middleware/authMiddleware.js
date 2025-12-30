const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Gunakan `req.headers.authorization` yang lebih umum

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1]; // Ambil token setelah "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
        req.user = decoded; // Simpan data user di request
        next(); // Lanjutkan ke route berikutnya
    } catch (err) {
        return res.status(401).json({ message: "Token tidak valid" });
    }
};

module.exports = authMiddleware;

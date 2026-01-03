const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage untuk Clients
const clientStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dfs-clients",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// Storage untuk Testimonials
const testimonialStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dfs-testimonials",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 300, height: 300, crop: "fill", gravity: "face" }],
  },
});

// Storage untuk Service Cards
const serviceCardStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dfs-service-cards",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});

// Storage untuk Service Details
const serviceDetailStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dfs-service-details",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  },
});

// Multer instances
const uploadClient = multer({ storage: clientStorage });
const uploadTestimonial = multer({ storage: testimonialStorage });
const uploadServiceCard = multer({ storage: serviceCardStorage });
const uploadServiceDetail = multer({ storage: serviceDetailStorage });

module.exports = {
  cloudinary,
  uploadClient,
  uploadTestimonial,
  uploadServiceCard,
  uploadServiceDetail,
};

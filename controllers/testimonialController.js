const Testimonial = require("../models/Testimonials");

// CREATE testimonial dengan gambar
exports.createTestimonial = async (req, res) => {
  try {
    const { author, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ""; // Simpan path gambar

    const newTestimonial = new Testimonial({ author, content, image });
    await newTestimonial.save();

    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE testimonial dengan gambar baru
exports.updateTestimonial = async (req, res) => {
  try {
    const { author, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Gunakan gambar baru jika ada

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { author, content, image },
      { new: true }
    );

    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
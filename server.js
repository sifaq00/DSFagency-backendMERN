const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const valuesRoutes = require("./routes/valuesRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const serviceCardRoutes = require("./routes/serviceCardRoutes");
const serviceDetailRoutes = require("./routes/serviceDetailRoutes");

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use("/api/values", valuesRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/service-card", serviceCardRoutes);
app.use("/api/service-detail", serviceDetailRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api", (req, res) => {
    res.json({ message: "API is working!" });
  });


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
  });

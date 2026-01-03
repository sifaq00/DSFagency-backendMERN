const User = require("../models/User");
const Client = require("../models/Client");
const Testimonial = require("../models/Testimonials");
const ServiceCard = require("../models/ServiceCard");
const ServiceDetail = require("../models/ServiceDetail");
const AboutUs = require("../models/AboutUs");
const Values = require("../models/Values");

const getMostRecentDate = (...dates) => {
  const validDates = dates.filter(Boolean);
  if (!validDates.length) return null;
  return validDates.sort((a, b) => b - a)[0];
};

const getAnalytics = async (req, res) => {
  try {
    const [
      userCount,
      clientCount,
      testimonialCount,
      serviceCardCount,
      serviceDetailCount,
      aboutCount,
      valuesCount,
      latestClient,
      latestUser,
    ] = await Promise.all([
      User.countDocuments(),
      Client.countDocuments(),
      Testimonial.countDocuments(),
      ServiceCard.countDocuments(),
      ServiceDetail.countDocuments(),
      AboutUs.countDocuments(),
      Values.countDocuments(),
      Client.findOne().sort({ updatedAt: -1 }).select("updatedAt"),
      User.findOne().sort({ updatedAt: -1 }).select("updatedAt"),
    ]);

    const lastUpdated = getMostRecentDate(
      latestClient?.updatedAt,
      latestUser?.updatedAt
    );

    res.json({
      totals: {
        users: userCount,
        clients: clientCount,
        testimonials: testimonialCount,
        serviceCards: serviceCardCount,
        serviceDetails: serviceDetailCount,
      },
      contentStatus: {
        aboutSections: aboutCount,
        valuesSections: valuesCount,
      },
      lastUpdated: lastUpdated ? lastUpdated.toISOString() : null,
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal memuat data analytics" });
  }
};

module.exports = {
  getAnalytics,
};

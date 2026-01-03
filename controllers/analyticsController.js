const User = require("../models/User");
const Client = require("../models/Client");
const Testimonial = require("../models/Testimonials");
const ServiceCard = require("../models/ServiceCard");
const ServiceDetail = require("../models/ServiceDetail");
const AboutUs = require("../models/AboutUs");
const Values = require("../models/Values");
const PageView = require("../models/PageView");

const getMostRecentDate = (...dates) => {
  const validDates = dates.filter(Boolean);
  if (!validDates.length) return null;
  return validDates.sort((a, b) => b - a)[0];
};

const buildDateBuckets = (days) => {
  const buckets = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Tentukan format label berdasarkan periode
  let labelFormat;
  if (days <= 31) {
    // 14 hari atau 1 bulan: tampilkan tanggal dan bulan singkat (misal: "01 Jan")
    labelFormat = { day: "2-digit", month: "short" };
  } else if (days <= 180) {
    // 6 bulan: tampilkan bulan dan tahun (misal: "Jan 2026")
    labelFormat = { month: "short", year: "numeric" };
  } else {
    // 1 tahun: tampilkan bulan saja (misal: "Jan")
    labelFormat = { month: "short" };
  }
  
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    buckets.push({
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("id-ID", labelFormat),
      count: 0,
    });
  }
  return buckets;
};

const getAnalytics = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 14;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days - 1));
    startDate.setHours(0, 0, 0, 0);

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
      pageViews,
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
      PageView.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const lastUpdated = getMostRecentDate(
      latestClient?.updatedAt,
      latestUser?.updatedAt
    );

    const buckets = buildDateBuckets(days);
    const bucketMap = new Map(buckets.map((b) => [b.key, b]));
    pageViews.forEach((item) => {
      const bucket = bucketMap.get(item._id);
      if (bucket) bucket.count = item.count;
    });

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
      traffic: buckets,
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal memuat data analytics" });
  }
};

const trackVisit = async (req, res) => {
  try {
    const path = req.body?.path || "/";
    await PageView.create({ path, userAgent: req.headers["user-agent"] || "" });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: "Gagal mencatat kunjungan" });
  }
};

module.exports = {
  getAnalytics,
  trackVisit,
};

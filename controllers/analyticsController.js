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

// Parse user agent to detect device, browser, and OS
const parseUserAgent = (userAgent) => {
  const ua = userAgent.toLowerCase();
  
  // Detect device type
  let device = "desktop";
  if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua)) {
    device = "mobile";
  } else if (/tablet|ipad/i.test(ua)) {
    device = "tablet";
  }
  
  // Detect browser
  let browser = "unknown";
  if (ua.includes("edg/")) browser = "Edge";
  else if (ua.includes("chrome")) browser = "Chrome";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("safari")) browser = "Safari";
  else if (ua.includes("opera") || ua.includes("opr")) browser = "Opera";
  
  // Detect OS
  let os = "unknown";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
  
  return { device, browser, os };
};

// Get client IP address
const getClientIP = (req) => {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
         req.headers["x-real-ip"] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         "unknown";
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
      uniqueVisitors,
      deviceStats,
      browserStats,
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
      // Total views per day
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
      // Unique visitors count (by visitorId)
      PageView.aggregate([
        { $match: { createdAt: { $gte: startDate }, visitorId: { $ne: "" } } },
        { $group: { _id: "$visitorId" } },
        { $count: "total" },
      ]),
      // Device breakdown
      PageView.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: "$device", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      // Browser breakdown
      PageView.aggregate([
        { $match: { createdAt: { $gte: startDate }, browser: { $ne: "" } } },
        { $group: { _id: "$browser", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
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

    // Calculate total views
    const totalViews = buckets.reduce((sum, b) => sum + b.count, 0);

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
      visitorStats: {
        totalViews,
        uniqueVisitors: uniqueVisitors[0]?.total || 0,
        devices: deviceStats.reduce((acc, d) => {
          if (d._id) acc[d._id] = d.count;
          return acc;
        }, {}),
        browsers: browserStats.reduce((acc, b) => {
          if (b._id) acc[b._id] = b.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Gagal memuat data analytics" });
  }
};

const trackVisit = async (req, res) => {
  try {
    const path = req.body?.path || "/";
    const visitorId = req.body?.visitorId || "";
    const userAgent = req.headers["user-agent"] || "";
    const ip = getClientIP(req);
    const { device, browser, os } = parseUserAgent(userAgent);
    
    await PageView.create({ 
      path, 
      userAgent,
      visitorId,
      ip,
      device,
      browser,
      os,
    });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: "Gagal mencatat kunjungan" });
  }
};

module.exports = {
  getAnalytics,
  trackVisit,
};

const Values = require("../models/Values");

// Ambil Data Values
exports.getValues = async (req, res) => {
  try {
    const values = await Values.findOne();
    if (!values) return res.status(404).json({ message: "Data Values tidak ditemukan" });
    res.json(values);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Values
exports.updateValues = async (req, res) => {
  try {
    let values = await Values.findOne();
    if (!values) {
      values = new Values(req.body);
    } else {
      values.vision = req.body.vision || values.vision;
      values.mission = req.body.mission || values.mission;
    }
    await values.save();
    res.json({ message: "Values berhasil diperbarui", values });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

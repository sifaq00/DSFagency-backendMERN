const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama client harus diisi"],
      trim: true,
    },
    logo: {
      type: String,
      required: [true, "Logo harus diupload"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);

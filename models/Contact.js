const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isReplied: { type: Boolean, default: false },
    repliedAt: { type: Date },
    replyMessage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);

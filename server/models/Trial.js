const mongoose = require("mongoose");

const trialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    preferredTime: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trial", trialSchema);

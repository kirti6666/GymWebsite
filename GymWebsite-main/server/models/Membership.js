const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    benefits: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);

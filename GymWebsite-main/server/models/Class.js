const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);

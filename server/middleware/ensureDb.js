const mongoose = require("mongoose");

function ensureDb(_req, res, next) {
  if (mongoose.connection.readyState === 1) {
    return next();
  }
  return res.status(503).json({
    message:
      "Database is not connected. Install and start MongoDB, then set MONGO_URI in server/.env (see .env.example)."
  });
}

module.exports = ensureDb;

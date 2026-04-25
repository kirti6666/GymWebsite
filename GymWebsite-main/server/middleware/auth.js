const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "urbanfit-dev-secret-change-in-production";

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not signed in." });
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session." });
  }
}

module.exports = { authRequired, JWT_SECRET };

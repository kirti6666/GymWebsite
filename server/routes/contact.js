const express = require("express");
const Contact = require("../models/Contact");
const ensureDb = require("../middleware/ensureDb");

const router = express.Router();

router.post("/", ensureDb, async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "",
      message: message.trim()
    });
    return res.status(201).json({
      message: "Message received. We will contact you soon.",
      contact
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

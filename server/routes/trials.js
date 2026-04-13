const express = require("express");
const Trial = require("../models/Trial");
const ensureDb = require("../middleware/ensureDb");

const router = express.Router();

router.post("/", ensureDb, async (req, res, next) => {
  try {
    const { name, phone, email, preferredTime } = req.body;
    if (!name || !phone || !email || !preferredTime) {
      return res.status(400).json({
        message: "Name, phone, email, and preferred time are required."
      });
    }
    const trial = await Trial.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      preferredTime: preferredTime.trim()
    });
    return res.status(201).json({
      message: "Trial request received. We will contact you shortly.",
      trial
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

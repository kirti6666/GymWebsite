const express = require("express");
const GymClass = require("../models/Class");
const { classes: fallbackClasses } = require("../data/defaultData");

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const classes = await GymClass.find().lean();
    res.json(classes.length ? classes : fallbackClasses);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

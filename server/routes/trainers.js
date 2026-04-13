const express = require("express");
const Trainer = require("../models/Trainer");
const { trainers: fallbackTrainers } = require("../data/defaultData");

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const trainers = await Trainer.find().lean();
    res.json(trainers.length ? trainers : fallbackTrainers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

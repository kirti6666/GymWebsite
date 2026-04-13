const express = require("express");
const Membership = require("../models/Membership");
const { memberships: fallbackMemberships } = require("../data/defaultData");

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const memberships = await Membership.find().lean();
    res.json(memberships.length ? memberships : fallbackMemberships);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

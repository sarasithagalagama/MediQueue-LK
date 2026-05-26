const express = require("express");
const ClinicProfile = require("../models/ClinicProfile");
const asyncHandler = require("../middleware/asyncHandler");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const clinic = await ClinicProfile.findOne().sort({ createdAt: -1 });
    res.json(clinic || {});
  }),
);

router.put(
  "/",
  protect,
  authorize("ADMIN"),
  asyncHandler(async (req, res) => {
    const clinic = await ClinicProfile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json(clinic);
  }),
);

module.exports = router;

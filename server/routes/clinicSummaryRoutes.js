const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ClinicProfile = require("../models/ClinicProfile");
const DoctorProfile = require("../models/DoctorProfile");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const clinic = await ClinicProfile.findOne().sort({ createdAt: -1 });
    const doctor = await DoctorProfile.findOne().sort({ createdAt: -1 });
    res.json({ clinic, doctor });
  }),
);

module.exports = router;

const express = require("express");
const DoctorProfile = require("../models/DoctorProfile");
const { protect, authorize } = require("../middleware/auth");
const { buildCrudRouter } = require("../utils/buildCrudRouter");

const router = express.Router();

router.use(protect, authorize("ADMIN"));
router.use(
  buildCrudRouter(DoctorProfile, {
    searchFields: ["fullName", "specialization", "slmcRegNo"],
  }),
);

module.exports = router;

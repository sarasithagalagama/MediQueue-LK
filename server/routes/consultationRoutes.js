const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const Consultation = require("../models/Consultation");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR"));

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const consultation = await Consultation.create(req.body);
    res.status(201).json(consultation);
  }),
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const consultation = await Consultation.findById(req.params.id);
    res.json(consultation || {});
  }),
);

router.get(
  "/patient/:patientId",
  asyncHandler(async (req, res) => {
    const consultations = await Consultation.find({
      patientId: req.params.patientId,
    }).sort({ createdAt: -1 });
    res.json(consultations);
  }),
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.json(consultation);
  }),
);

module.exports = router;

const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const ClinicProfile = require("../models/ClinicProfile");
const DoctorProfile = require("../models/DoctorProfile");
const ContactInquiry = require("../models/ContactInquiry");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/clinic",
  asyncHandler(async (req, res) => {
    const clinic = await ClinicProfile.findOne().sort({ createdAt: -1 });
    res.json(clinic || {});
  }),
);

router.get(
  "/doctor",
  asyncHandler(async (req, res) => {
    const doctor = await DoctorProfile.findOne().sort({ createdAt: -1 });
    res.json(doctor || {});
  }),
);

router.get(
  "/services",
  asyncHandler(async (req, res) => {
    res.json([
      "General consultation",
      "Follow-up consultation",
      "Report review",
      "Medical certificates",
      "Prescription services",
      "Basic medicine issuing",
    ]);
  }),
);

router.post(
  "/contact",
  asyncHandler(async (req, res) => {
    const inquiry = await ContactInquiry.create(req.body);
    res.status(201).json(inquiry);
  }),
);

router.post(
  "/book-appointment",
  asyncHandler(async (req, res) => {
    const {
      patientName,
      phone,
      nic,
      preferredDate,
      preferredTime,
      reason,
      type,
    } = req.body;
    const patient = await Patient.findOneAndUpdate(
      { phone },
      { fullName: patientName, phone, nic: nic || "" },
      { new: true, upsert: true, runValidators: true },
    );

    const doctor = await DoctorProfile.findOne().sort({ createdAt: -1 });
    if (!doctor) {
      res.status(400);
      throw new Error("No doctor profile found");
    }

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor.userId,
      date: preferredDate,
      timeSlot: preferredTime,
      reason,
      type: type || "NEW_CONSULTATION",
      status: "PENDING",
    });

    res.status(201).json(appointment);
  }),
);

module.exports = router;

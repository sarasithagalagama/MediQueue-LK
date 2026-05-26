const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const Appointment = require("../models/Appointment");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT"));

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const conflict = await Appointment.findOne({
      doctorId: req.body.doctorId,
      date: req.body.date,
      timeSlot: req.body.timeSlot,
      status: { $in: ["PENDING", "CONFIRMED"] },
    });

    if (conflict) {
      res.status(400);
      throw new Error("Appointment already exists for this slot");
    }

    const appointment = await Appointment.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(appointment);
  }),
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const appointments = await Appointment.find().sort({
      date: 1,
      timeSlot: 1,
    });
    res.json(appointments);
  }),
);

router.get(
  "/today",
  asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const appointments = await Appointment.find({
      date: { $gte: today, $lt: tomorrow },
    }).sort({ timeSlot: 1 });
    res.json(appointments);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found");
    }
    res.json(appointment);
  }),
);

router.put(
  "/:id/status",
  asyncHandler(async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    res.json(appointment);
  }),
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.json(appointment);
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "CANCELLED" },
      { new: true },
    );
    res.json(appointment);
  }),
);

module.exports = router;

const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const Queue = require("../models/Queue");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST"));

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const date = new Date(req.body.date || Date.now());
    date.setHours(0, 0, 0, 0);
    const lastToken = await Queue.findOne({
      doctorId: req.body.doctorId,
      date,
    }).sort({ tokenNumber: -1 });
    const tokenNumber = (lastToken?.tokenNumber || 0) + 1;
    const queue = await Queue.create({ ...req.body, tokenNumber, date });
    res.status(201).json(queue);
  }),
);

router.get(
  "/today",
  asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const queue = await Queue.find({
      date: { $gte: today, $lt: tomorrow },
    }).sort({ tokenNumber: 1 });
    res.json(queue);
  }),
);

router.get(
  "/current",
  asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const current =
      (await Queue.findOne({ date: today, status: "IN_CONSULTATION" }).sort({
        tokenNumber: 1,
      })) ||
      (await Queue.findOne({ date: today, status: "WAITING" }).sort({
        tokenNumber: 1,
      }));
    res.json(current || {});
  }),
);

router.get(
  "/patient/:patientId",
  asyncHandler(async (req, res) => {
    const queue = await Queue.find({ patientId: req.params.patientId }).sort({
      createdAt: -1,
    });
    res.json(queue);
  }),
);

router.put(
  "/:id/status",
  asyncHandler(async (req, res) => {
    const queue = await Queue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    res.json(queue);
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const queue = await Queue.findByIdAndUpdate(
      req.params.id,
      { status: "CANCELLED" },
      { new: true },
    );
    res.json(queue);
  }),
);

module.exports = router;

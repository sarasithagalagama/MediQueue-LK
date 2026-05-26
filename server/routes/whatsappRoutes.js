const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const Appointment = require("../models/Appointment");
const Queue = require("../models/Queue");
const Payment = require("../models/Payment");
const Patient = require("../models/Patient");
const { buildWhatsAppLink } = require("../utils/whatsapp");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST"));

router.get(
  "/appointment/:appointmentId",
  asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(
      req.params.appointmentId,
    ).populate("patientId");
    const link = buildWhatsAppLink(
      appointment?.patientId?.phone,
      `Hello ${appointment?.patientId?.fullName || ""}, your appointment on ${appointment?.date?.toDateString?.() || ""} is ${appointment?.status || ""}.`,
    );
    res.json({ link });
  }),
);

router.get(
  "/token/:queueId",
  asyncHandler(async (req, res) => {
    const queue = await Queue.findById(req.params.queueId).populate(
      "patientId",
    );
    const link = buildWhatsAppLink(
      queue?.patientId?.phone,
      `Hello ${queue?.patientId?.fullName || ""}, your token number is ${queue?.tokenNumber || ""} and status is ${queue?.status || ""}.`,
    );
    res.json({ link });
  }),
);

router.get(
  "/payment/:paymentId",
  asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.paymentId).populate(
      "patientId",
    );
    const link = buildWhatsAppLink(
      payment?.patientId?.phone,
      `Hello ${payment?.patientId?.fullName || ""}, your payment receipt ${payment?.receiptNo || ""} totals Rs. ${payment?.totalPayable || 0}.`,
    );
    res.json({ link });
  }),
);

router.get(
  "/custom",
  asyncHandler(async (req, res) => {
    const link = buildWhatsAppLink(
      req.query.phone,
      req.query.message || "Hello from MediQueue LK",
    );
    res.json({ link });
  }),
);

module.exports = router;

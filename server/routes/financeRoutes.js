const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const Payment = require("../models/Payment");
const MedicineSale = require("../models/MedicineSale");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR"));

const rangeQuery = (days) => {
  const start = new Date();
  start.setDate(start.getDate() - days);
  return { createdAt: { $gte: start } };
};

router.get(
  "/today",
  asyncHandler(async (req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const payments = await Payment.find({
      createdAt: { $gte: start, $lt: end },
    });
    res.json({
      total: payments.reduce(
        (sum, payment) => sum + (payment.amountPaid || 0),
        0,
      ),
      payments,
    });
  }),
);

router.get(
  "/weekly",
  asyncHandler(async (req, res) => {
    const payments = await Payment.find(rangeQuery(7));
    res.json({
      total: payments.reduce(
        (sum, payment) => sum + (payment.amountPaid || 0),
        0,
      ),
      payments,
    });
  }),
);

router.get(
  "/monthly",
  asyncHandler(async (req, res) => {
    const payments = await Payment.find(rangeQuery(30));
    res.json({
      total: payments.reduce(
        (sum, payment) => sum + (payment.amountPaid || 0),
        0,
      ),
      payments,
    });
  }),
);

router.get(
  "/yearly",
  asyncHandler(async (req, res) => {
    const payments = await Payment.find(rangeQuery(365));
    res.json({
      total: payments.reduce(
        (sum, payment) => sum + (payment.amountPaid || 0),
        0,
      ),
      payments,
    });
  }),
);

router.get(
  "/payment-method-summary",
  asyncHandler(async (req, res) => {
    const summary = await Payment.aggregate([
      {
        $group: {
          _id: "$method",
          total: { $sum: "$amountPaid" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(summary);
  }),
);

router.get(
  "/pending-payments",
  asyncHandler(async (req, res) => {
    const payments = await Payment.find({
      status: { $in: ["UNPAID", "PARTIAL"] },
    });
    res.json(payments);
  }),
);

router.get(
  "/medicine-sales",
  asyncHandler(async (req, res) => {
    const sales = await MedicineSale.find().sort({ createdAt: -1 });
    res.json(sales);
  }),
);

router.get(
  "/expected-vs-collected",
  asyncHandler(async (req, res) => {
    const payments = await Payment.find();
    const expected = payments.reduce(
      (sum, payment) => sum + (payment.totalPayable || 0),
      0,
    );
    const collected = payments.reduce(
      (sum, payment) => sum + (payment.amountPaid || 0),
      0,
    );
    res.json({ expected, collected, difference: collected - expected });
  }),
);

module.exports = router;

const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const Payment = require("../models/Payment");
const PaymentAuditLog = require("../models/PaymentAuditLog");
const DiscountApproval = require("../models/DiscountApproval");
const { formatReceiptNo } = require("../utils/receipt");
const { buildPdfBuffer } = require("../utils/pdf");
const { protect, authorize } = require("../middleware/auth");

const MAX_RECEPTIONIST_DISCOUNT = 100;
const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST"));

const calculatePayment = (payment) => {
  payment.totalPayable = Math.max(
    (payment.consultationFee || 0) +
      (payment.medicineFee || 0) +
      (payment.otherCharges || 0) -
      (payment.discount || 0),
    0,
  );
  payment.balance = Math.max(
    payment.totalPayable - (payment.amountPaid || 0),
    0,
  );
  payment.status =
    payment.balance === 0
      ? "PAID"
      : payment.amountPaid > 0
        ? "PARTIAL"
        : "UNPAID";
  return payment;
};

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const count = await Payment.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });
    const receiptNo =
      req.body.receiptNo || formatReceiptNo(new Date(), count + 1);
    const payload = { ...req.body, receiptNo, collectedBy: req.user._id };

    if (
      req.user.role === "RECEPTIONIST" &&
      Number(payload.discount || 0) > MAX_RECEPTIONIST_DISCOUNT
    ) {
      await DiscountApproval.create({
        paymentId: payload.paymentId || undefined,
        requestedBy: req.user._id,
        discountAmount: Number(payload.discount),
        reason: payload.discountReason || "Requested by receptionist",
        status: "PENDING",
      });
      payload.discount = 0;
    }

    const payment = calculatePayment(new Payment(payload));
    await payment.save();

    await PaymentAuditLog.create({
      paymentId: payment._id,
      action: "CREATED",
      performedBy: req.user._id,
      newValue: payment.toObject(),
      reason: payment.notes || "Payment created",
    });

    res.status(201).json(payment);
  }),
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  }),
);

router.get(
  "/today",
  asyncHandler(async (req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const payments = await Payment.find({
      createdAt: { $gte: start, $lt: end },
    }).sort({ createdAt: -1 });
    res.json(payments);
  }),
);

router.get(
  "/pending",
  asyncHandler(async (req, res) => {
    const payments = await Payment.find({
      status: { $in: ["UNPAID", "PARTIAL"] },
    }).sort({ createdAt: -1 });
    res.json(payments);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    res.json(payment || {});
  }),
);

router.put(
  "/:id/request-edit",
  asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    await PaymentAuditLog.create({
      paymentId: payment._id,
      action: "EDIT_REQUESTED",
      performedBy: req.user._id,
      oldValue: payment.toObject(),
      newValue: req.body,
      reason: req.body.reason || "Edit requested",
    });
    res.json({ message: "Edit request logged", payment });
  }),
);

router.put(
  "/:id/approve-edit",
  authorize("ADMIN", "DOCTOR"),
  asyncHandler(async (req, res) => {
    const existing = await Payment.findById(req.params.id);
    const updated = calculatePayment(
      Object.assign(existing, req.body, { approvedBy: req.user._id }),
    );
    await updated.save();
    await PaymentAuditLog.create({
      paymentId: updated._id,
      action: "EDIT_APPROVED",
      performedBy: req.user._id,
      approvedBy: req.user._id,
      oldValue: existing.toObject(),
      newValue: updated.toObject(),
      reason: req.body.reason || "Edit approved",
    });
    res.json(updated);
  }),
);

router.put(
  "/:id/void",
  authorize("ADMIN", "DOCTOR"),
  asyncHandler(async (req, res) => {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: "VOIDED",
        approvedBy: req.user._id,
        notes: req.body.reason || "",
      },
      { new: true },
    );
    await PaymentAuditLog.create({
      paymentId: payment._id,
      action: "VOIDED",
      performedBy: req.user._id,
      approvedBy: req.user._id,
      reason: req.body.reason || "Voided payment",
    });
    res.json(payment);
  }),
);

router.put(
  "/:id/refund",
  authorize("ADMIN", "DOCTOR"),
  asyncHandler(async (req, res) => {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        status: "REFUNDED",
        approvedBy: req.user._id,
        refundReason: req.body.reason || "",
      },
      { new: true },
    );
    await PaymentAuditLog.create({
      paymentId: payment._id,
      action: "REFUNDED",
      performedBy: req.user._id,
      approvedBy: req.user._id,
      reason: req.body.reason || "Refunded payment",
    });
    res.json(payment);
  }),
);

router.get(
  "/:id/audit-log",
  asyncHandler(async (req, res) => {
    const logs = await PaymentAuditLog.find({ paymentId: req.params.id }).sort({
      createdAt: 1,
    });
    res.json(logs);
  }),
);

router.get(
  "/:id/receipt",
  asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    const buffer = await buildPdfBuffer((doc) => {
      doc.fontSize(18).text("MediQueue LK Receipt", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`Receipt No: ${payment.receiptNo}`);
      doc.text(`Consultation Fee: Rs. ${payment.consultationFee}`);
      doc.text(`Medicine Fee: Rs. ${payment.medicineFee}`);
      doc.text(`Other Charges: Rs. ${payment.otherCharges}`);
      doc.text(`Discount: Rs. ${payment.discount}`);
      doc.text(`Total Payable: Rs. ${payment.totalPayable}`);
      doc.text(`Amount Paid: Rs. ${payment.amountPaid}`);
      doc.text(`Balance: Rs. ${payment.balance}`);
      doc.text(`Method: ${payment.method}`);
      doc.text(`Status: ${payment.status}`);
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=receipt-${payment.receiptNo}.pdf`,
    );
    res.send(buffer);
  }),
);

module.exports = router;

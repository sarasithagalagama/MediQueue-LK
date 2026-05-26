const DiscountApproval = require("../models/DiscountApproval");
const Payment = require("../models/Payment");
const PaymentAuditLog = require("../models/PaymentAuditLog");
const { protect, authorize } = require("../middleware/auth");
const asyncHandler = require("../middleware/asyncHandler");
const express = require("express");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("ADMIN", "DOCTOR", "RECEPTIONIST"),
  asyncHandler(async (req, res) => {
    const approval = await DiscountApproval.create({
      ...req.body,
      requestedBy: req.user._id,
      status: "PENDING",
    });
    await PaymentAuditLog.create({
      paymentId: approval.paymentId,
      action: "DISCOUNT_REQUESTED",
      performedBy: req.user._id,
      reason: approval.reason,
      newValue: { discountAmount: approval.discountAmount },
    });
    res.status(201).json(approval);
  }),
);

router.get(
  "/pending",
  protect,
  authorize("ADMIN", "DOCTOR"),
  asyncHandler(async (req, res) => {
    const approvals = await DiscountApproval.find({ status: "PENDING" }).sort({
      createdAt: -1,
    });
    res.json(approvals);
  }),
);

router.put(
  "/:id/approve",
  protect,
  authorize("ADMIN", "DOCTOR"),
  asyncHandler(async (req, res) => {
    const approval = await DiscountApproval.findByIdAndUpdate(
      req.params.id,
      { status: "APPROVED", approvedBy: req.user._id, approvedAt: new Date() },
      { new: true },
    );
    await Payment.findByIdAndUpdate(approval.paymentId, {
      discount: approval.discountAmount,
      approvedBy: req.user._id,
    });
    await PaymentAuditLog.create({
      paymentId: approval.paymentId,
      action: "DISCOUNT_APPROVED",
      performedBy: req.user._id,
      approvedBy: req.user._id,
      reason: approval.reason,
    });
    res.json(approval);
  }),
);

router.put(
  "/:id/reject",
  protect,
  authorize("ADMIN", "DOCTOR"),
  asyncHandler(async (req, res) => {
    const approval = await DiscountApproval.findByIdAndUpdate(
      req.params.id,
      { status: "REJECTED", approvedBy: req.user._id, approvedAt: new Date() },
      { new: true },
    );
    await PaymentAuditLog.create({
      paymentId: approval.paymentId,
      action: "DISCOUNT_REJECTED",
      performedBy: req.user._id,
      approvedBy: req.user._id,
      reason: approval.reason,
    });
    res.json(approval);
  }),
);

module.exports = router;

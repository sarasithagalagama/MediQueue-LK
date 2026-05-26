const mongoose = require("mongoose");

const paymentAuditLogSchema = new mongoose.Schema(
  {
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    action: {
      type: String,
      enum: [
        "CREATED",
        "UPDATED",
        "VOIDED",
        "REFUNDED",
        "DISCOUNT_REQUESTED",
        "DISCOUNT_APPROVED",
        "DISCOUNT_REJECTED",
        "EDIT_REQUESTED",
        "EDIT_APPROVED",
        "EDIT_REJECTED",
      ],
      required: true,
    },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    oldValue: { type: mongoose.Schema.Types.Mixed },
    newValue: { type: mongoose.Schema.Types.Mixed },
    reason: { type: String, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model("PaymentAuditLog", paymentAuditLogSchema);

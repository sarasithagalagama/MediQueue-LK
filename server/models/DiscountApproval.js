const mongoose = require("mongoose");

const discountApprovalSchema = new mongoose.Schema(
  {
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    discountAmount: { type: Number, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    approvedAt: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model("DiscountApproval", discountApprovalSchema);

const mongoose = require("mongoose");

const cashClosingSchema = new mongoose.Schema(
  {
    closingDate: { type: Date, required: true },
    receptionistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    systemCashTotal: { type: Number, default: 0 },
    countedCashTotal: { type: Number, default: 0 },
    cashDifference: { type: Number, default: 0 },
    systemCardTotal: { type: Number, default: 0 },
    countedCardTotal: { type: Number, default: 0 },
    cardDifference: { type: Number, default: 0 },
    systemBankTransferTotal: { type: Number, default: 0 },
    countedBankTransferTotal: { type: Number, default: 0 },
    bankTransferDifference: { type: Number, default: 0 },
    totalSystemAmount: { type: Number, default: 0 },
    totalCountedAmount: { type: Number, default: 0 },
    totalDifference: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["PENDING_REVIEW", "APPROVED", "DIFFERENCE_FOUND"],
      default: "PENDING_REVIEW",
    },
    notes: { type: String, default: "" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model("CashClosing", cashClosingSchema);

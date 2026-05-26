const mongoose = require("mongoose");

const stockAdjustmentSchema = new mongoose.Schema(
  {
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    oldQuantity: { type: Number, required: true },
    newQuantity: { type: Number, required: true },
    changedQuantity: { type: Number, required: true },
    reason: {
      type: String,
      enum: [
        "NEW_STOCK_PURCHASE",
        "PATIENT_SALE",
        "EXPIRED_REMOVAL",
        "DAMAGED_MEDICINE",
        "STOCK_CORRECTION",
        "RETURNED_MEDICINE",
        "TRANSFERRED_OUT",
      ],
      required: true,
    },
    valueDifference: { type: Number, default: 0 },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvalStatus: {
      type: String,
      enum: ["NOT_REQUIRED", "PENDING", "APPROVED", "REJECTED"],
      default: "NOT_REQUIRED",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model("StockAdjustment", stockAdjustmentSchema);

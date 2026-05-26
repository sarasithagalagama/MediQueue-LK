const mongoose = require("mongoose");

const stockAlertSchema = new mongoose.Schema(
  {
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
    alertType: {
      type: String,
      enum: [
        "LOW_STOCK",
        "OUT_OF_STOCK",
        "NEAR_EXPIRY",
        "EXPIRED",
        "STOCK_MISMATCH",
        "SALE_WITHOUT_PAYMENT",
        "PAYMENT_WITHOUT_MEDICINE_SALE",
      ],
      required: true,
    },
    message: { type: String, required: true },
    severity: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "RESOLVED", "DISMISSED"],
      default: "ACTIVE",
    },
    resolvedAt: { type: Date },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model("StockAlert", stockAlertSchema);

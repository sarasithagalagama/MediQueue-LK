const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
    },
    receiptNo: { type: String, required: true, unique: true },
    consultationFee: { type: Number, default: 0 },
    medicineFee: { type: Number, default: 0 },
    otherCharges: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalPayable: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    method: {
      type: String,
      enum: ["CASH", "CARD", "BANK_TRANSFER", "ONLINE_TRANSFER"],
      default: "CASH",
    },
    status: {
      type: String,
      enum: ["PAID", "UNPAID", "PARTIAL", "REFUNDED", "VOIDED"],
      default: "UNPAID",
    },
    collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    discountReason: { type: String, default: "" },
    refundReason: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Payment", paymentSchema);

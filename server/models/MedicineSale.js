const mongoose = require("mongoose");

const saleLineSchema = new mongoose.Schema(
  {
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
    name: { type: String, required: true },
    batchNumber: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false },
);

const medicineSaleSchema = new mongoose.Schema(
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
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    medicines: [saleLineSchema],
    totalAmount: { type: Number, required: true },
    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "REFUNDED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("MedicineSale", medicineSaleSchema);

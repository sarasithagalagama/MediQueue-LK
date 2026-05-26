const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    reason: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "NEW_CONSULTATION",
        "FOLLOW_UP",
        "REPORT_REVIEW",
        "MEDICAL_CERTIFICATE",
      ],
      default: "NEW_CONSULTATION",
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"],
      default: "PENDING",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

appointmentSchema.index(
  { doctorId: 1, date: 1, timeSlot: 1 },
  { unique: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);

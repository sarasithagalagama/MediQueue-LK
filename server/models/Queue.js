const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
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
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    tokenNumber: { type: Number, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["WAITING", "IN_CONSULTATION", "COMPLETED", "CANCELLED", "NO_SHOW"],
      default: "WAITING",
    },
  },
  { timestamps: true },
);

queueSchema.index({ doctorId: 1, date: 1, tokenNumber: 1 }, { unique: true });

module.exports = mongoose.model("Queue", queueSchema);

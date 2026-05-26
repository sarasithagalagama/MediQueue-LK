const mongoose = require("mongoose");

const medicineLineSchema = new mongoose.Schema(
  {
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    instructions: { type: String, default: "" },
  },
  { _id: false },
);

const prescriptionSchema = new mongoose.Schema(
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
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },
    medicines: [medicineLineSchema],
    advice: { type: String, default: "" },
    nextVisitDate: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Prescription", prescriptionSchema);

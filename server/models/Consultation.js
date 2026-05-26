const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
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
    symptoms: { type: String, default: "" },
    diagnosis: { type: String, default: "" },
    notes: { type: String, default: "" },
    advice: { type: String, default: "" },
    followUpDate: { type: Date },
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
    },
    medicalCertificateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalCertificate",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Consultation", consultationSchema);

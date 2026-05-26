const mongoose = require("mongoose");

const medicalCertificateSchema = new mongoose.Schema(
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
    certificateNo: { type: String, required: true, unique: true },
    examinedDate: { type: Date, required: true },
    diagnosis: { type: String, required: true },
    restFrom: { type: Date, required: true },
    restTo: { type: Date, required: true },
    purpose: {
      type: String,
      enum: ["WORK", "SCHOOL", "UNIVERSITY", "OTHER"],
      default: "WORK",
    },
    remarks: { type: String, default: "" },
    issuedDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("MedicalCertificate", medicalCertificateSchema);

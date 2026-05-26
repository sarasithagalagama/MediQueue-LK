const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    nic: { type: String, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: "OTHER",
    },
    dateOfBirth: { type: Date },
    address: { type: String, trim: true },
    allergies: [{ type: String, trim: true }],
    medicalHistory: { type: String, default: "" },
    emergencyContact: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Patient", patientSchema);

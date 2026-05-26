const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: { type: String, required: true },
    qualifications: { type: String, required: true },
    specialization: { type: String, required: true },
    slmcRegNo: { type: String, required: true, unique: true },
    experience: { type: String, default: "" },
    availableDays: [{ type: String }],
    consultationStartTime: { type: String, default: "08:00" },
    consultationEndTime: { type: String, default: "20:00" },
    consultationFee: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("DoctorProfile", doctorProfileSchema);

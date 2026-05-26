const mongoose = require("mongoose");

const clinicProfileSchema = new mongoose.Schema(
  {
    clinicName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    email: { type: String, required: true },
    openingHours: { type: String, required: true },
    description: { type: String, default: "" },
    logo: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ClinicProfile", clinicProfileSchema);

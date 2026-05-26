const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT"],
      default: "PATIENT",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);

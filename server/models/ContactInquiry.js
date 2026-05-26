const mongoose = require("mongoose");

const contactInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["NEW", "READ", "REPLIED"], default: "NEW" },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model("ContactInquiry", contactInquirySchema);

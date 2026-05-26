const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    genericName: { type: String, default: "" },
    brandName: { type: String, default: "" },
    category: { type: String, default: "" },
    batchNumber: { type: String, required: true },
    supplierName: { type: String, default: "" },
    purchaseDate: { type: Date },
    expiryDate: { type: Date, required: true },
    quantity: { type: Number, default: 0 },
    unitType: {
      type: String,
      enum: ["TABLET", "CAPSULE", "BOTTLE", "TUBE", "SACHET", "ML", "OTHER"],
      default: "TABLET",
    },
    purchasePrice: { type: Number, default: 0 },
    sellingPrice: { type: Number, default: 0 },
    lowStockLevel: { type: Number, default: 10 },
    storageNotes: { type: String, default: "" },
    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "LOW_STOCK",
        "OUT_OF_STOCK",
        "NEAR_EXPIRY",
        "EXPIRED",
        "DISCONTINUED",
      ],
      default: "AVAILABLE",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Medicine", medicineSchema);

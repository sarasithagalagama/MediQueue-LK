const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const Medicine = require("../models/Medicine");
const StockAdjustment = require("../models/StockAdjustment");
const StockAlert = require("../models/StockAlert");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST"));

const updateMedicineStatus = (medicine) => {
  const now = new Date();
  const expiry = new Date(medicine.expiryDate);
  const daysToExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

  if (medicine.status === "DISCONTINUED") return "DISCONTINUED";
  if (medicine.quantity <= 0) return "OUT_OF_STOCK";
  if (daysToExpiry < 0) return "EXPIRED";
  if (daysToExpiry <= 30) return "NEAR_EXPIRY";
  if (medicine.quantity <= medicine.lowStockLevel) return "LOW_STOCK";
  return "AVAILABLE";
};

const ensureAlert = async (medicine, alertType, message, severity) => {
  await StockAlert.create({
    medicineId: medicine._id,
    alertType,
    message,
    severity,
  });
};

router.get(
  "/summary",
  asyncHandler(async (req, res) => {
    const medicines = await Medicine.find();
    const summary = medicines.reduce(
      (acc, medicine) => {
        acc.totalMedicines += 1;
        acc.totalValue +=
          (medicine.quantity || 0) * (medicine.purchasePrice || 0);
        acc[medicine.status] = (acc[medicine.status] || 0) + 1;
        return acc;
      },
      { totalMedicines: 0, totalValue: 0 },
    );
    res.json(summary);
  }),
);

router.get(
  "/low-stock",
  asyncHandler(async (req, res) => {
    const medicines = await Medicine.find({
      quantity: { $gt: 0 },
      $expr: { $lte: ["$quantity", "$lowStockLevel"] },
    }).sort({ name: 1 });
    res.json(medicines);
  }),
);

router.get(
  "/out-of-stock",
  asyncHandler(async (req, res) => {
    const medicines = await Medicine.find({ quantity: 0 });
    res.json(medicines);
  }),
);

router.get(
  "/near-expiry",
  asyncHandler(async (req, res) => {
    const now = new Date();
    const nearExpiry = new Date();
    nearExpiry.setDate(now.getDate() + 30);
    const medicines = await Medicine.find({
      expiryDate: { $gte: now, $lte: nearExpiry },
    });
    res.json(medicines);
  }),
);

router.get(
  "/expired",
  asyncHandler(async (req, res) => {
    const medicines = await Medicine.find({ expiryDate: { $lt: new Date() } });
    res.json(medicines);
  }),
);

router.post(
  "/adjust",
  asyncHandler(async (req, res) => {
    const medicine = await Medicine.findById(req.body.medicineId);
    if (!medicine) {
      res.status(404);
      throw new Error("Medicine not found");
    }

    const oldQuantity = medicine.quantity;
    const newQuantity = Number(req.body.newQuantity);
    const changedQuantity = newQuantity - oldQuantity;
    medicine.quantity = newQuantity;
    medicine.status = updateMedicineStatus(medicine);
    medicine.updatedBy = req.user._id;
    await medicine.save();

    const approvalStatus =
      Math.abs(changedQuantity) > 20 && req.user.role === "RECEPTIONIST"
        ? "PENDING"
        : "APPROVED";
    const adjustment = await StockAdjustment.create({
      medicineId: medicine._id,
      oldQuantity,
      newQuantity,
      changedQuantity,
      reason: req.body.reason,
      valueDifference: changedQuantity * (medicine.purchasePrice || 0),
      performedBy: req.user._id,
      approvalStatus,
      notes: req.body.notes || "",
    });

    if (medicine.status === "LOW_STOCK")
      await ensureAlert(
        medicine,
        "LOW_STOCK",
        `${medicine.name} is low in stock`,
        "HIGH",
      );
    if (medicine.status === "OUT_OF_STOCK")
      await ensureAlert(
        medicine,
        "OUT_OF_STOCK",
        `${medicine.name} is out of stock`,
        "CRITICAL",
      );
    if (medicine.status === "NEAR_EXPIRY")
      await ensureAlert(
        medicine,
        "NEAR_EXPIRY",
        `${medicine.name} is near expiry`,
        "MEDIUM",
      );
    if (medicine.status === "EXPIRED")
      await ensureAlert(
        medicine,
        "EXPIRED",
        `${medicine.name} has expired`,
        "CRITICAL",
      );

    res.status(201).json(adjustment);
  }),
);

router.get(
  "/adjustments",
  asyncHandler(async (req, res) => {
    const adjustments = await StockAdjustment.find().sort({ createdAt: -1 });
    res.json(adjustments);
  }),
);

router.get(
  "/history/:medicineId",
  asyncHandler(async (req, res) => {
    const history = await StockAdjustment.find({
      medicineId: req.params.medicineId,
    }).sort({ createdAt: -1 });
    res.json(history);
  }),
);

module.exports = router;

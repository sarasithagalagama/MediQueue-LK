const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const MedicineSale = require("../models/MedicineSale");
const Medicine = require("../models/Medicine");
const StockAdjustment = require("../models/StockAdjustment");
const StockAlert = require("../models/StockAlert");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR", "RECEPTIONIST"));

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const items = [];
    let totalAmount = 0;

    for (const item of req.body.medicines || []) {
      const medicine = await Medicine.findById(item.medicineId);
      if (!medicine) {
        res.status(404);
        throw new Error("Medicine not found");
      }
      if (new Date(medicine.expiryDate) < new Date()) {
        res.status(400);
        throw new Error(`Expired medicine cannot be sold: ${medicine.name}`);
      }
      if (medicine.quantity < item.quantity) {
        res.status(400);
        throw new Error(`Insufficient stock for ${medicine.name}`);
      }

      const total = item.quantity * item.unitPrice;
      totalAmount += total;
      items.push({
        medicineId: medicine._id,
        name: medicine.name,
        batchNumber: medicine.batchNumber,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total,
      });

      const oldQuantity = medicine.quantity;
      medicine.quantity -= item.quantity;
      medicine.status =
        medicine.quantity <= 0
          ? "OUT_OF_STOCK"
          : medicine.quantity <= medicine.lowStockLevel
            ? "LOW_STOCK"
            : medicine.status;
      await medicine.save();

      await StockAdjustment.create({
        medicineId: medicine._id,
        oldQuantity,
        newQuantity: medicine.quantity,
        changedQuantity: -item.quantity,
        reason: "PATIENT_SALE",
        valueDifference: -total,
        performedBy: req.user._id,
        approvalStatus: "APPROVED",
      });
    }

    const sale = await MedicineSale.create({
      ...req.body,
      medicines: items,
      totalAmount,
      soldBy: req.user._id,
      status: req.body.status || "PENDING",
    });

    if (!req.body.paymentId) {
      await StockAlert.create({
        alertType: "SALE_WITHOUT_PAYMENT",
        message: "Medicine sale created without linked payment",
        severity: "HIGH",
      });
    }

    res.status(201).json(sale);
  }),
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const sales = await MedicineSale.find().sort({ createdAt: -1 });
    res.json(sales);
  }),
);

router.get(
  "/today",
  asyncHandler(async (req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const sales = await MedicineSale.find({
      createdAt: { $gte: start, $lt: end },
    }).sort({ createdAt: -1 });
    res.json(sales);
  }),
);

router.get(
  "/monthly",
  asyncHandler(async (req, res) => {
    const sales = await MedicineSale.find({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    }).sort({ createdAt: -1 });
    res.json(sales);
  }),
);

router.get(
  "/patient/:patientId",
  asyncHandler(async (req, res) => {
    const sales = await MedicineSale.find({
      patientId: req.params.patientId,
    }).sort({ createdAt: -1 });
    res.json(sales);
  }),
);

router.put(
  "/:id/cancel",
  asyncHandler(async (req, res) => {
    const sale = await MedicineSale.findById(req.params.id);
    if (!sale) {
      res.status(404);
      throw new Error("Sale not found");
    }
    sale.status = req.body.status || "CANCELLED";
    await sale.save();
    res.json(sale);
  }),
);

module.exports = router;

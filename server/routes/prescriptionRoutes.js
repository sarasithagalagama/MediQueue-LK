const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const Prescription = require("../models/Prescription");
const { buildPdfBuffer } = require("../utils/pdf");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR"));

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const prescription = await Prescription.create(req.body);
    res.status(201).json(prescription);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const prescription = await Prescription.findById(req.params.id);
    res.json(prescription || {});
  }),
);

router.get(
  "/patient/:patientId",
  asyncHandler(async (req, res) => {
    const prescriptions = await Prescription.find({
      patientId: req.params.patientId,
    }).sort({ createdAt: -1 });
    res.json(prescriptions);
  }),
);

router.get(
  "/:id/pdf",
  asyncHandler(async (req, res) => {
    const prescription = await Prescription.findById(req.params.id).populate(
      "patientId doctorId consultationId",
    );
    if (!prescription) {
      res.status(404);
      throw new Error("Prescription not found");
    }

    const buffer = await buildPdfBuffer((doc) => {
      doc.fontSize(18).text("MediQueue LK Prescription", { align: "center" });
      doc.moveDown();
      doc
        .fontSize(12)
        .text(`Patient: ${prescription.patientId?.fullName || ""}`);
      doc.text(`Doctor: ${prescription.doctorId?.name || ""}`);
      doc.moveDown();
      prescription.medicines.forEach((medicine, index) => {
        doc.text(
          `${index + 1}. ${medicine.name} - ${medicine.dosage} - ${medicine.frequency} - ${medicine.duration}`,
        );
        if (medicine.instructions) doc.text(`   ${medicine.instructions}`);
      });
      if (prescription.advice) {
        doc.moveDown();
        doc.text(`Advice: ${prescription.advice}`);
      }
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=prescription-${prescription._id}.pdf`,
    );
    res.send(buffer);
  }),
);

module.exports = router;

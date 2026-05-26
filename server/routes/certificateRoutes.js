const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const MedicalCertificate = require("../models/MedicalCertificate");
const { buildPdfBuffer } = require("../utils/pdf");
const { formatCertificateNo } = require("../utils/receipt");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR"));

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const count = await MedicalCertificate.countDocuments();
    const certificateNo =
      req.body.certificateNo || formatCertificateNo(new Date(), count + 1);
    const certificate = await MedicalCertificate.create({
      ...req.body,
      certificateNo,
    });
    res.status(201).json(certificate);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const certificate = await MedicalCertificate.findById(req.params.id);
    res.json(certificate || {});
  }),
);

router.get(
  "/patient/:patientId",
  asyncHandler(async (req, res) => {
    const certificates = await MedicalCertificate.find({
      patientId: req.params.patientId,
    }).sort({ createdAt: -1 });
    res.json(certificates);
  }),
);

router.get(
  "/:id/pdf",
  asyncHandler(async (req, res) => {
    const certificate = await MedicalCertificate.findById(
      req.params.id,
    ).populate("patientId doctorId consultationId");
    if (!certificate) {
      res.status(404);
      throw new Error("Certificate not found");
    }

    const buffer = await buildPdfBuffer((doc) => {
      doc.fontSize(18).text("Medical Leave Certificate", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`Certificate No: ${certificate.certificateNo}`);
      doc.text(`Patient: ${certificate.patientId?.fullName || ""}`);
      doc.text(`Doctor: ${certificate.doctorId?.name || ""}`);
      doc.text(`Examined Date: ${certificate.examinedDate.toDateString()}`);
      doc.text(`Diagnosis: ${certificate.diagnosis}`);
      doc.text(`Rest From: ${certificate.restFrom.toDateString()}`);
      doc.text(`Rest To: ${certificate.restTo.toDateString()}`);
      doc.text(`Purpose: ${certificate.purpose}`);
      if (certificate.remarks) doc.text(`Remarks: ${certificate.remarks}`);
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=certificate-${certificate._id}.pdf`,
    );
    res.send(buffer);
  }),
);

module.exports = router;

const Appointment = require("../models/Appointment");
const Queue = require("../models/Queue");
const Consultation = require("../models/Consultation");
const Prescription = require("../models/Prescription");
const MedicalCertificate = require("../models/MedicalCertificate");
const Payment = require("../models/Payment");
const Medicine = require("../models/Medicine");
const StockAlert = require("../models/StockAlert");
const CashClosing = require("../models/CashClosing");

function startOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

exports.dashboard = async (req, res, next) => {
  try {
    const doctorId = req.user && req.user.id;
    const todayStart = startOfDay();
    const todayEnd = endOfDay();

    const todayPatients = await Queue.countDocuments({
      doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
      status: { $in: ["WAITING", "ASSIGNED", "CONSULTING"] },
    });

    const current = await Queue.findOne({
      doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
      status: "CONSULTING",
    }).populate("patientId");

    const completedConsultations = await Consultation.countDocuments({
      doctorId,
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    const consultations = await Consultation.find({
      doctorId,
      createdAt: { $gte: todayStart, $lte: todayEnd },
    }).select("_id");
    const consultationIds = consultations.map((c) => c._id);

    const pendingPayments = await Payment.countDocuments({
      consultationId: { $in: consultationIds },
      status: { $ne: "PAID" },
    });

    const alerts = await StockAlert.find({ resolved: false })
      .sort({ severity: -1 })
      .limit(5);

    const financeAgg = await Payment.aggregate([
      { $match: { consultationId: { $in: consultationIds } } },
      {
        $group: {
          _id: null,
          totalPayable: { $sum: "$totalPayable" },
          amountPaid: { $sum: "$amountPaid" },
        },
      },
    ]);

    const finance = financeAgg[0] || { totalPayable: 0, amountPaid: 0 };

    res.json({
      todayPatients,
      currentToken: current ? current.tokenNumber : null,
      currentPatient: current ? current.patientId : null,
      completedConsultations,
      pendingPayments,
      alerts,
      finance,
    });
  } catch (err) {
    next(err);
  }
};

exports.queue = async (req, res, next) => {
  try {
    const doctorId = req.user && req.user.id;
    const todayStart = startOfDay();
    const todayEnd = endOfDay();
    const list = await Queue.find({
      doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
    })
      .populate("patientId")
      .sort({ tokenNumber: 1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.currentPatient = async (req, res, next) => {
  try {
    const doctorId = req.user && req.user.id;
    const todayStart = startOfDay();
    const todayEnd = endOfDay();
    const current = await Queue.findOne({
      doctorId,
      date: { $gte: todayStart, $lte: todayEnd },
      status: "CONSULTING",
    })
      .populate("patientId")
      .populate({ path: "appointmentId", populate: "patientId" });
    if (!current)
      return res.status(404).json({ message: "No current patient" });
    res.json(current);
  } catch (err) {
    next(err);
  }
};

exports.patients = async (req, res, next) => {
  try {
    const doctorId = req.user && req.user.id;
    const recent = await Consultation.find({ doctorId })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("patientId");
    const patients = recent.map((c) => c.patientId).filter(Boolean);
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

exports.consultations = async (req, res, next) => {
  try {
    const doctorId = req.user && req.user.id;
    const items = await Consultation.find({ doctorId })
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("patientId");
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.prescriptions = async (req, res, next) => {
  try {
    const doctorId = req.user && req.user.id;
    const items = await Prescription.find({ doctorId })
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("patientId");
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.certificates = async (req, res, next) => {
  try {
    const doctorId = req.user && req.user.id;
    const items = await MedicalCertificate.find({ doctorId })
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("patientId");
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.finance = async (req, res, next) => {
  try {
    const doctorId = req.user && req.user.id;
    const consultations = await Consultation.find({ doctorId }).select("_id");
    const consultationIds = consultations.map((c) => c._id);
    const payments = await Payment.find({
      consultationId: { $in: consultationIds },
    })
      .sort({ createdAt: -1 })
      .limit(200);
    res.json({ payments });
  } catch (err) {
    next(err);
  }
};

exports.medicineStock = async (req, res, next) => {
  try {
    const list = await Medicine.find().sort({ name: 1 }).limit(200);
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.stockAlerts = async (req, res, next) => {
  try {
    const list = await StockAlert.find().sort({ createdAt: -1 }).limit(200);
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.cashClosings = async (req, res, next) => {
  try {
    const items = await CashClosing.find().sort({ createdAt: -1 }).limit(200);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

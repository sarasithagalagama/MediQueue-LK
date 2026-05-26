const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");
const Patient = require("../models/Patient");
const DoctorProfile = require("../models/DoctorProfile");
const ClinicProfile = require("../models/ClinicProfile");
const Appointment = require("../models/Appointment");
const Queue = require("../models/Queue");
const Consultation = require("../models/Consultation");
const Prescription = require("../models/Prescription");
const MedicalCertificate = require("../models/MedicalCertificate");
const Medicine = require("../models/Medicine");
const MedicineSale = require("../models/MedicineSale");
const StockAdjustment = require("../models/StockAdjustment");
const StockAlert = require("../models/StockAlert");
const Payment = require("../models/Payment");
const PaymentAuditLog = require("../models/PaymentAuditLog");
const CashClosing = require("../models/CashClosing");

const run = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Patient.deleteMany({}),
    DoctorProfile.deleteMany({}),
    ClinicProfile.deleteMany({}),
    Appointment.deleteMany({}),
    Queue.deleteMany({}),
    Consultation.deleteMany({}),
    Prescription.deleteMany({}),
    MedicalCertificate.deleteMany({}),
    Medicine.deleteMany({}),
    MedicineSale.deleteMany({}),
    StockAdjustment.deleteMany({}),
    StockAlert.deleteMany({}),
    Payment.deleteMany({}),
    PaymentAuditLog.deleteMany({}),
    CashClosing.deleteMany({}),
  ]);

  const password = await bcrypt.hash("Password@123", 10);

  const admin = await User.create({
    name: "System Admin",
    email: "admin@mediqueuelk.com",
    phone: "0770000001",
    password,
    role: "ADMIN",
  });

  const doctorUser = await User.create({
    name: "Dr. Sahan Perera",
    email: "doctor@mediqueuelk.com",
    phone: "0770000002",
    password,
    role: "DOCTOR",
  });

  const receptionist = await User.create({
    name: "Nimali Fernando",
    email: "reception@mediqueuelk.com",
    phone: "0770000003",
    password,
    role: "RECEPTIONIST",
  });

  const patientUser = await User.create({
    name: "Kasun Silva",
    email: "patient@mediqueuelk.com",
    phone: "0770000004",
    password,
    role: "PATIENT",
  });

  await ClinicProfile.create({
    clinicName: "MediQueue LK Clinic",
    address: "123 Galle Road, Colombo, Sri Lanka",
    phone: "+94 11 234 5678",
    whatsappNumber: "+94771234567",
    email: "hello@mediqueuelk.com",
    openingHours: "Mon-Sat 8:00 AM - 8:00 PM",
    description:
      "Private practice management for Sri Lankan outpatient clinics.",
    logo: "",
  });

  await DoctorProfile.create({
    userId: doctorUser._id,
    fullName: "Dr. Sahan Perera",
    qualifications: "MBBS, MD Family Medicine",
    specialization: "Family Medicine & Primary Care",
    slmcRegNo: "SLMC-12345",
    experience: "12 years",
    availableDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    consultationStartTime: "08:00",
    consultationEndTime: "20:00",
    consultationFee: 1500,
  });

  const patient1 = await Patient.create({
    fullName: "Kasun Silva",
    nic: "199012345678",
    phone: "0771111111",
    gender: "MALE",
    dateOfBirth: new Date("1990-02-15"),
    address: "Nugegoda, Sri Lanka",
    allergies: ["Penicillin"],
    medicalHistory: "Seasonal asthma",
    emergencyContact: "0771112222",
  });

  const patient2 = await Patient.create({
    fullName: "Tharushi Perera",
    nic: "199312345678",
    phone: "0772222222",
    gender: "FEMALE",
    dateOfBirth: new Date("1993-07-20"),
    address: "Kandy, Sri Lanka",
    allergies: [],
    medicalHistory: "No major issues",
    emergencyContact: "0772223333",
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const appointment1 = await Appointment.create({
    patientId: patient1._id,
    doctorId: doctorUser._id,
    date: today,
    timeSlot: "09:00",
    reason: "Fever and cough",
    type: "NEW_CONSULTATION",
    status: "CONFIRMED",
    createdBy: receptionist._id,
  });

  const appointment2 = await Appointment.create({
    patientId: patient2._id,
    doctorId: doctorUser._id,
    date: today,
    timeSlot: "09:15",
    reason: "Follow-up blood report review",
    type: "REPORT_REVIEW",
    status: "PENDING",
    createdBy: receptionist._id,
  });

  const queue1 = await Queue.create({
    patientId: patient1._id,
    doctorId: doctorUser._id,
    appointmentId: appointment1._id,
    tokenNumber: 1,
    date: today,
    status: "IN_CONSULTATION",
  });

  await Queue.create({
    patientId: patient2._id,
    doctorId: doctorUser._id,
    appointmentId: appointment2._id,
    tokenNumber: 2,
    date: today,
    status: "WAITING",
  });

  const consultation = await Consultation.create({
    patientId: patient1._id,
    doctorId: doctorUser._id,
    appointmentId: appointment1._id,
    symptoms: "Fever, cough, body aches",
    diagnosis: "Viral upper respiratory infection",
    notes: "Hydration and rest advised",
    advice: "Take medication after meals",
  });

  await Prescription.create({
    patientId: patient1._id,
    doctorId: doctorUser._id,
    consultationId: consultation._id,
    medicines: [
      {
        name: "Paracetamol 500mg",
        dosage: "500mg",
        frequency: "TDS",
        duration: "5 days",
        instructions: "After meals",
      },
    ],
    advice: "Drink plenty of fluids",
    nextVisitDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
  });

  await MedicalCertificate.create({
    patientId: patient2._id,
    doctorId: doctorUser._id,
    consultationId: consultation._id,
    certificateNo: "CERT-20260526-0001",
    examinedDate: today,
    diagnosis: "Acute gastritis",
    restFrom: today,
    restTo: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
    purpose: "WORK",
    remarks: "Needs rest for recovery",
  });

  const medicine1 = await Medicine.create({
    name: "Paracetamol",
    genericName: "Acetaminophen",
    brandName: "Panadol",
    category: "Pain Relief",
    batchNumber: "BATCH-001",
    supplierName: "Local Pharma",
    purchaseDate: new Date("2026-05-01"),
    expiryDate: new Date("2026-12-31"),
    quantity: 5,
    unitType: "TABLET",
    purchasePrice: 2,
    sellingPrice: 5,
    lowStockLevel: 10,
    storageNotes: "Store in a cool dry place",
    status: "LOW_STOCK",
    createdBy: admin._id,
    updatedBy: admin._id,
  });

  const medicine2 = await Medicine.create({
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    brandName: "Amoxi",
    category: "Antibiotic",
    batchNumber: "BATCH-002",
    supplierName: "Local Pharma",
    purchaseDate: new Date("2025-12-01"),
    expiryDate: new Date("2025-12-31"),
    quantity: 0,
    unitType: "CAPSULE",
    purchasePrice: 4,
    sellingPrice: 10,
    lowStockLevel: 10,
    storageNotes: "Keep sealed",
    status: "OUT_OF_STOCK",
    createdBy: admin._id,
    updatedBy: admin._id,
  });

  const medicine3 = await Medicine.create({
    name: "Cough Syrup",
    genericName: "Dextromethorphan",
    brandName: "CoughFree",
    category: "Cough Relief",
    batchNumber: "BATCH-003",
    supplierName: "Local Pharma",
    purchaseDate: new Date("2026-04-10"),
    expiryDate: new Date("2026-06-10"),
    quantity: 15,
    unitType: "BOTTLE",
    purchasePrice: 80,
    sellingPrice: 150,
    lowStockLevel: 8,
    storageNotes: "Refrigerate after opening",
    status: "NEAR_EXPIRY",
    createdBy: admin._id,
    updatedBy: admin._id,
  });

  const medicine4 = await Medicine.create({
    name: "Expired Tablet",
    genericName: "Test",
    brandName: "OldStock",
    category: "Test",
    batchNumber: "BATCH-004",
    supplierName: "Local Pharma",
    purchaseDate: new Date("2025-01-10"),
    expiryDate: new Date("2025-12-01"),
    quantity: 12,
    unitType: "TABLET",
    purchasePrice: 3,
    sellingPrice: 6,
    lowStockLevel: 5,
    storageNotes: "Expired sample item",
    status: "EXPIRED",
    createdBy: admin._id,
    updatedBy: admin._id,
  });

  await MedicineSale.create({
    patientId: patient1._id,
    appointmentId: appointment1._id,
    consultationId: consultation._id,
    medicines: [
      {
        medicineId: medicine1._id,
        name: medicine1.name,
        batchNumber: medicine1.batchNumber,
        quantity: 2,
        unitPrice: medicine1.sellingPrice,
        total: 10,
      },
    ],
    totalAmount: 10,
    soldBy: receptionist._id,
    status: "CONFIRMED",
  });

  await Payment.create({
    patientId: patient1._id,
    appointmentId: appointment1._id,
    consultationId: consultation._id,
    receiptNo: "REC-20260526-0001",
    consultationFee: 1500,
    medicineFee: 10,
    otherCharges: 0,
    discount: 0,
    totalPayable: 1510,
    amountPaid: 1510,
    balance: 0,
    method: "CASH",
    status: "PAID",
    collectedBy: receptionist._id,
    approvedBy: doctorUser._id,
    notes: "Seeded paid payment",
  });

  const partialPayment = await Payment.create({
    patientId: patient2._id,
    appointmentId: appointment2._id,
    consultationId: null,
    receiptNo: "REC-20260526-0002",
    consultationFee: 1500,
    medicineFee: 0,
    otherCharges: 0,
    discount: 100,
    totalPayable: 1400,
    amountPaid: 500,
    balance: 900,
    method: "CARD",
    status: "PARTIAL",
    collectedBy: receptionist._id,
    notes: "Seeded partial payment",
  });

  const pendingPayment = await Payment.create({
    patientId: patient2._id,
    appointmentId: appointment2._id,
    consultationId: null,
    receiptNo: "REC-20260526-0003",
    consultationFee: 1500,
    medicineFee: 0,
    otherCharges: 0,
    discount: 0,
    totalPayable: 1500,
    amountPaid: 0,
    balance: 1500,
    method: "BANK_TRANSFER",
    status: "UNPAID",
    collectedBy: receptionist._id,
    notes: "Pending payment example",
  });

  await PaymentAuditLog.create([
    {
      paymentId: partialPayment._id,
      action: "CREATED",
      performedBy: receptionist._id,
      newValue: partialPayment.toObject(),
      reason: "Seeded partial payment",
    },
    {
      paymentId: pendingPayment._id,
      action: "CREATED",
      performedBy: receptionist._id,
      newValue: pendingPayment.toObject(),
      reason: "Seeded pending payment",
    },
  ]);

  await StockAlert.create([
    {
      medicineId: medicine1._id,
      alertType: "LOW_STOCK",
      message: "Paracetamol is low in stock",
      severity: "HIGH",
      status: "ACTIVE",
    },
    {
      medicineId: medicine2._id,
      alertType: "OUT_OF_STOCK",
      message: "Amoxicillin is out of stock",
      severity: "CRITICAL",
      status: "ACTIVE",
    },
    {
      medicineId: medicine3._id,
      alertType: "NEAR_EXPIRY",
      message: "Cough Syrup is near expiry",
      severity: "MEDIUM",
      status: "ACTIVE",
    },
    {
      medicineId: medicine4._id,
      alertType: "EXPIRED",
      message: "Expired Tablet has expired",
      severity: "CRITICAL",
      status: "ACTIVE",
    },
    {
      alertType: "PAYMENT_WITHOUT_MEDICINE_SALE",
      message: "Payment exists without linked medicine sale",
      severity: "MEDIUM",
      status: "ACTIVE",
    },
  ]);

  await CashClosing.create({
    closingDate: today,
    receptionistId: receptionist._id,
    systemCashTotal: 1510,
    countedCashTotal: 1500,
    cashDifference: -10,
    systemCardTotal: 500,
    countedCardTotal: 500,
    cardDifference: 0,
    systemBankTransferTotal: 1500,
    countedBankTransferTotal: 1500,
    bankTransferDifference: 0,
    totalSystemAmount: 3510,
    totalCountedAmount: 3500,
    totalDifference: -10,
    status: "DIFFERENCE_FOUND",
    notes: "Seeded closing with mismatch for review",
  });

  console.log("Seed completed successfully");
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const publicRoutes = require("./routes/publicRoutes");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const doctorDashboardRoutes = require("./routes/doctorDashboardRoutes");
const clinicProfileRoutes = require("./routes/clinicProfileRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const queueRoutes = require("./routes/queueRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cashClosingRoutes = require("./routes/cashClosingRoutes");
const discountRoutes = require("./routes/discountRoutes");
const financeRoutes = require("./routes/financeRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const stockRoutes = require("./routes/stockRoutes");
const medicineSalesRoutes = require("./routes/medicineSalesRoutes");
const stockAlertRoutes = require("./routes/stockAlertRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "MediQueue LK API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/doctor", doctorDashboardRoutes);
app.use("/api/clinic-profile", clinicProfileRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/medical-certificates", certificateRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cash-closings", cashClosingRoutes);
app.use("/api/discount-approvals", discountRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/medicine-sales", medicineSalesRoutes);
app.use("/api/stock-alerts", stockAlertRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/reports", reportsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });

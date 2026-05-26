import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import ServicesPage from "../pages/public/ServicesPage";
import DoctorPage from "../pages/public/DoctorPage";
import ContactPage from "../pages/public/ContactPage";
import BookAppointmentPage from "../pages/public/BookAppointmentPage";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";
import AdminDashboardPage from "../pages/admin/DashboardPage";
import AdminFinancePage from "../pages/admin/FinancePage";

import DoctorLayout from "../layouts/DoctorLayout";
import DoctorDashboardPage from "../pages/doctor/DashboardPage";
import QueuePage from "../pages/doctor/QueuePage";
import CurrentPatientPage from "../pages/doctor/CurrentPatientPage";
import PatientsPage from "../pages/doctor/PatientsPage";
import ConsultationsPage from "../pages/doctor/ConsultationsPage";
import PrescriptionsPage from "../pages/doctor/PrescriptionsPage";
import MedicalCertificatesPage from "../pages/doctor/MedicalCertificatesPage";
import DoctorFinancePage from "../pages/doctor/DoctorFinancePage";
import MedicineStockPage from "../pages/doctor/MedicineStockPage";
import StockAlertsPage from "../pages/doctor/StockAlertsPage";
import CashClosingsPage from "../pages/doctor/CashClosingsPage";

import ReceptionistLayout from "../layouts/ReceptionistLayout";
import ReceptionistDashboardPage from "../pages/receptionist/DashboardPage";
import ReceptionistPaymentsPage from "../pages/receptionist/PaymentsPage";
import ReceptionistMedicineSalesPage from "../pages/receptionist/MedicineSalesPage";
import ReceptionistMedicineStockPage from "../pages/receptionist/MedicineStockPage";

import PatientLayout from "../layouts/PatientLayout";
import PatientDashboardPage from "../pages/patient/DashboardPage";

import RolePage from "../pages/shared/RolePage";

function buildPage(title, description, highlights = []) {
  return (
    <RolePage title={title} description={description} highlights={highlights} />
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route
          path="/admin/users"
          element={buildPage(
            "Users",
            "Manage user access, roles, and activation states.",
            [
              "Create or update clinic users",
              "Guard roles by backend permissions",
            ],
          )}
        />
        <Route
          path="/admin/patients"
          element={buildPage(
            "Patients",
            "Maintain patient records and registration history.",
            ["Search by name, NIC, or phone", "Review patient medical history"],
          )}
        />
        <Route
          path="/admin/appointments"
          element={buildPage(
            "Appointments",
            "Confirm, review, and manage clinic bookings.",
            [
              "Prevent duplicate booking slots",
              "Track appointment status flow",
            ],
          )}
        />
        <Route
          path="/admin/doctors"
          element={buildPage(
            "Doctors",
            "Manage doctor profiles, schedules, and fees.",
            ["SLMC registration tracking", "Consultation fee management"],
          )}
        />
        <Route
          path="/admin/clinic-profile"
          element={buildPage(
            "Clinic Profile",
            "Update public clinic details and branding.",
            [
              "Address, phone, WhatsApp, and opening hours",
              "Public homepage content source",
            ],
          )}
        />
        <Route
          path="/admin/medicines"
          element={buildPage(
            "Medicines",
            "Maintain medicine master data and stock metadata.",
            [
              "Batch numbers and expiry control",
              "Discontinued medicines stay visible",
            ],
          )}
        />
        <Route path="/admin/finance" element={<AdminFinancePage />} />
        <Route
          path="/admin/reports"
          element={buildPage(
            "Reports",
            "Review operational and financial summaries.",
            [
              "Appointments, revenue, stock, and closings",
              "Use for management oversight",
            ],
          )}
        />
        <Route
          path="/admin/settings"
          element={buildPage(
            "Settings",
            "Configure clinic-wide controls and thresholds.",
            ["Discount caps and workflow rules", "Operating preferences"],
          )}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRoles={["DOCTOR"]}>
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
        <Route path="/doctor/queue" element={<QueuePage />} />
        <Route
          path="/doctor/current-patient"
          element={<CurrentPatientPage />}
        />
        <Route path="/doctor/patients" element={<PatientsPage />} />
        <Route path="/doctor/consultations" element={<ConsultationsPage />} />
        <Route path="/doctor/prescriptions" element={<PrescriptionsPage />} />
        <Route
          path="/doctor/medical-certificates"
          element={<MedicalCertificatesPage />}
        />
        <Route path="/doctor/finance" element={<DoctorFinancePage />} />
        <Route path="/doctor/medicine-stock" element={<MedicineStockPage />} />
        <Route path="/doctor/stock-alerts" element={<StockAlertsPage />} />
        <Route
          path="/doctor/reports"
          element={buildPage("Reports", "Doctor-focused operational reports.", [
            "Clinical throughput and finance snapshots",
            "Stock and certificate summaries",
          ])}
        />
        <Route
          path="/doctor/payment-audit"
          element={buildPage(
            "Payment Audit",
            "Inspect sensitive payment history and changes.",
            ["Audit logs for every change", "Fraud-control visibility"],
          )}
        />
        <Route path="/doctor/cash-closings" element={<CashClosingsPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRoles={["RECEPTIONIST"]}>
            <ReceptionistLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/receptionist/dashboard"
          element={<ReceptionistDashboardPage />}
        />
        <Route
          path="/receptionist/patients"
          element={buildPage(
            "Register Patient",
            "Create or update patient records at the front desk.",
            ["Fast registration workflow", "Use phone or NIC to search"],
          )}
        />
        <Route
          path="/receptionist/appointments"
          element={buildPage(
            "Appointments",
            "Confirm and manage appointment requests.",
            ["Pending and confirmed states", "Clinic scheduling control"],
          )}
        />
        <Route
          path="/receptionist/queue"
          element={buildPage(
            "Queue",
            "Assign tokens and move patients through the queue.",
            [
              "Auto token numbering per doctor/day",
              "Waiting, consulting, completed states",
            ],
          )}
        />
        <Route
          path="/receptionist/payments"
          element={<ReceptionistPaymentsPage />}
        />
        <Route
          path="/receptionist/medicine-sales"
          element={<ReceptionistMedicineSalesPage />}
        />
        <Route
          path="/receptionist/whatsapp"
          element={buildPage(
            "WhatsApp Messages",
            "Generate WhatsApp Web links for reminders and updates.",
            ["No SMS gateway", "Appointment and receipt reminders"],
          )}
        />
        <Route
          path="/receptionist/medicine-stock"
          element={<ReceptionistMedicineStockPage />}
        />
        <Route
          path="/receptionist/print-documents"
          element={buildPage(
            "Print Documents",
            "Print receipts, prescriptions, and certificates.",
            ["PDF generation ready", "Queue and receipt printing"],
          )}
        />
        <Route
          path="/receptionist/cash-closing"
          element={buildPage(
            "Daily Cash Closing",
            "Submit and review daily counted totals.",
            ["Cash, card, and bank comparisons", "Mismatch review flow"],
          )}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRoles={["PATIENT"]}>
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
        <Route
          path="/patient/book-appointment"
          element={buildPage(
            "Book Appointment",
            "Submit a public or logged-in booking request.",
            ["Choose date, time, and reason", "Stored as pending request"],
          )}
        />
        <Route
          path="/patient/appointments"
          element={buildPage(
            "My Appointments",
            "See appointment status and history.",
            [
              "Pending, confirmed, completed, cancelled",
              "Linked to your clinic visits",
            ],
          )}
        />
        <Route
          path="/patient/queue-status"
          element={buildPage(
            "Queue Status",
            "Track your current token and position.",
            ["Live queue view", "Current consultation status"],
          )}
        />
        <Route
          path="/patient/prescriptions"
          element={buildPage(
            "My Prescriptions",
            "Review issued prescriptions and medicines.",
            [
              "Printable and PDF-ready records",
              "Consultation-linked prescriptions",
            ],
          )}
        />
        <Route
          path="/patient/medical-certificates"
          element={buildPage(
            "My Medical Certificates",
            "Access medical leave certificates.",
            ["Issued date and diagnosis", "Printable certificate records"],
          )}
        />
        <Route
          path="/patient/profile"
          element={buildPage(
            "Profile",
            "View and update your patient profile.",
            ["Phone, address, and emergency contact", "Basic health history"],
          )}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

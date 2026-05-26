import RoleLayout from "./RoleLayout";

const navItems = [
  { to: "/doctor/dashboard", label: "Dashboard" },
  { to: "/doctor/queue", label: "Today’s Queue" },
  { to: "/doctor/current-patient", label: "Current Patient" },
  { to: "/doctor/patients", label: "Patients" },
  { to: "/doctor/consultations", label: "Consultations" },
  { to: "/doctor/prescriptions", label: "Prescriptions" },
  { to: "/doctor/medical-certificates", label: "Certificates" },
  { to: "/doctor/finance", label: "Finance" },
  { to: "/doctor/medicine-stock", label: "Medicine stock" },
  { to: "/doctor/stock-alerts", label: "Stock alerts" },
  { to: "/doctor/reports", label: "Reports" },
  { to: "/doctor/payment-audit", label: "Payment audit" },
  { to: "/doctor/cash-closings", label: "Cash closings" },
];

export default function DoctorLayout() {
  return (
    <RoleLayout
      title="Doctor dashboard"
      subtitle="Clinical control panel"
      navItems={navItems}
    />
  );
}

import RoleLayout from "./RoleLayout";

const navItems = [
  { to: "/receptionist/dashboard", label: "Dashboard" },
  { to: "/receptionist/patients", label: "Register patient" },
  { to: "/receptionist/appointments", label: "Appointments" },
  { to: "/receptionist/queue", label: "Queue" },
  { to: "/receptionist/payments", label: "Payments" },
  { to: "/receptionist/medicine-sales", label: "Medicine sales" },
  { to: "/receptionist/whatsapp", label: "WhatsApp" },
  { to: "/receptionist/medicine-stock", label: "Medicine stock" },
  { to: "/receptionist/print-documents", label: "Print documents" },
  { to: "/receptionist/cash-closing", label: "Cash closing" },
];

export default function ReceptionistLayout() {
  return (
    <RoleLayout
      title="Receptionist dashboard"
      subtitle="Front desk operations"
      navItems={navItems}
    />
  );
}

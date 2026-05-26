import RoleLayout from "./RoleLayout";

const navItems = [
  { to: "/patient/dashboard", label: "Dashboard" },
  { to: "/patient/book-appointment", label: "Book appointment" },
  { to: "/patient/appointments", label: "My appointments" },
  { to: "/patient/queue-status", label: "Queue status" },
  { to: "/patient/prescriptions", label: "My prescriptions" },
  { to: "/patient/medical-certificates", label: "My certificates" },
  { to: "/patient/profile", label: "Profile" },
];

export default function PatientLayout() {
  return (
    <RoleLayout
      title="Patient dashboard"
      subtitle="Personal clinic access"
      navItems={navItems}
    />
  );
}

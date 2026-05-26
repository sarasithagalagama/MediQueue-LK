import RoleLayout from "./RoleLayout";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/patients", label: "Patients" },
  { to: "/admin/appointments", label: "Appointments" },
  { to: "/admin/doctors", label: "Doctors" },
  { to: "/admin/clinic-profile", label: "Clinic profile" },
  { to: "/admin/medicines", label: "Medicines" },
  { to: "/admin/finance", label: "Finance" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminLayout() {
  return (
    <RoleLayout
      title="Admin dashboard"
      subtitle="Clinic administration"
      navItems={navItems}
    />
  );
}

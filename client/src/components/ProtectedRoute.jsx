import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-slate-500">
        Loading session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    const redirectMap = {
      ADMIN: "/admin/dashboard",
      DOCTOR: "/doctor/dashboard",
      RECEPTIONIST: "/receptionist/dashboard",
      PATIENT: "/patient/dashboard",
    };
    return <Navigate to={redirectMap[user.role] || "/"} replace />;
  }

  return children;
}

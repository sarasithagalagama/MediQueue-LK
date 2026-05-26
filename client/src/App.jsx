import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PublicLayout from "./layouts/PublicLayout";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

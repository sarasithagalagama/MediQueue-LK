import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(form);
      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "DOCTOR") navigate("/doctor/dashboard");
      else if (user.role === "RECEPTIONIST")
        navigate("/receptionist/dashboard");
      else navigate("/patient/dashboard");
    } catch (loginError) {
      setError(loginError.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-md items-center px-4 py-12 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="card w-full space-y-4 p-8">
        <h1 className="text-3xl font-black text-slate-900">Login</h1>
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="Email"
        />
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
          placeholder="Password"
        />
        {error ? (
          <p className="text-sm font-medium text-red-600">{error}</p>
        ) : null}
        <button className="btn-primary w-full" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

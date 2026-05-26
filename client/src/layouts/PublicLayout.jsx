import { Link, NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/doctor", label: "Doctor" },
  { to: "/contact", label: "Contact" },
];

export default function PublicLayout() {
  return (
    <div className="min-h-screen text-slate-900">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-clinic-600 text-lg font-bold text-white">
              M
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clinic-700">
                MediQueue LK
              </p>
              <p className="text-xs text-slate-500">
                Private doctor practice management
              </p>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? "bg-clinic-50 text-clinic-800" : "text-slate-600 hover:bg-slate-100"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
            <Link to="/book-appointment" className="btn-primary">
              Book Appointment
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

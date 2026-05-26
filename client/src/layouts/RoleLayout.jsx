import { Link, NavLink, Outlet } from "react-router-dom";

export default function RoleLayout({
  title,
  subtitle,
  navItems,
  accent = "clinic",
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-slate-950 text-white lg:flex lg:flex-col">
          <div className="border-b border-white/10 p-6">
            <Link to="/" className="block">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
                MediQueue LK
              </p>
              <p className="mt-2 text-2xl font-black tracking-tight">{title}</p>
              <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 text-xs text-slate-400">
            Clinic operations dashboard
          </div>
        </aside>
        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-clinic-700">
                  {title}
                </p>
                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  {subtitle}
                </h1>
              </div>
              <Link to="/" className="btn-secondary">
                Public site
              </Link>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

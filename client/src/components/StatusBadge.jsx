export default function StatusBadge({ children, tone = "default" }) {
  const toneClasses = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-rose-100 text-rose-800",
    info: "bg-cyan-100 text-cyan-800",
    purple: "bg-fuchsia-100 text-fuchsia-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone] || toneClasses.default}`}
    >
      {children}
    </span>
  );
}

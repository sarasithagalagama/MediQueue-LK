export default function StatCard({ label, value, note, tone = "default" }) {
  const toneClasses = {
    default: "bg-white",
    good: "bg-emerald-50",
    warning: "bg-amber-50",
    danger: "bg-rose-50",
    info: "bg-cyan-50",
  };

  return (
    <div className={`card p-6 ${toneClasses[tone] || toneClasses.default}`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">
        {value}
      </p>
      {note ? <p className="mt-2 text-sm text-slate-600">{note}</p> : null}
    </div>
  );
}

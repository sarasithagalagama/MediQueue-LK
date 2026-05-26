import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

const financeRows = [
  { label: "Cash", value: "Rs. 45,000" },
  { label: "Card", value: "Rs. 12,500" },
  { label: "Bank", value: "Rs. 18,000" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total patients"
          value="248"
          note="Registered patient records"
          tone="good"
        />
        <StatCard
          label="Today’s appointments"
          value="18"
          note="3 pending confirmation"
          tone="info"
        />
        <StatCard
          label="Today’s income"
          value="Rs. 31,500"
          note="Collections across methods"
          tone="good"
        />
        <StatCard
          label="Monthly income"
          value="Rs. 612,000"
          note="Current month total"
          tone="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-slate-900">
              Operational alerts
            </h3>
            <StatusBadge tone="danger">Action required</StatusBadge>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>Low stock medicines: 6</p>
            <p>Expired medicines: 2</p>
            <p>Pending payments: 4</p>
            <p>Certificates issued today: 3</p>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900">Finance snapshot</h3>
          <div className="mt-4 space-y-3">
            {financeRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
              >
                <span className="text-sm text-slate-600">{row.label}</span>
                <span className="font-semibold text-slate-900">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

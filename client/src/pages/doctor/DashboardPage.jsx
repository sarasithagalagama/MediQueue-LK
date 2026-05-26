import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today’s patients"
          value="12"
          note="Confirmed and waiting"
          tone="good"
        />
        <StatCard
          label="Current token"
          value="#05"
          note="Latest consultation in progress"
          tone="info"
        />
        <StatCard
          label="Completed consultations"
          value="8"
          note="Completed today"
          tone="good"
        />
        <StatCard
          label="Pending payments"
          value="3"
          note="Needs review"
          tone="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Alerts</h3>
            <StatusBadge tone="danger">Review now</StatusBadge>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>Low stock medicines: 5</p>
            <p>Out of stock medicines: 2</p>
            <p>Near expiry medicines: 4</p>
            <p>Expired medicines: 1</p>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900">Finance check</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <MiniStat label="Expected" value="Rs. 38,000" />
            <MiniStat label="Collected" value="Rs. 34,500" />
            <MiniStat label="Medicine sales" value="Rs. 7,250" />
            <MiniStat label="Cash closing" value="Difference found" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-semibold text-slate-900">{value}</p>
    </div>
  );
}

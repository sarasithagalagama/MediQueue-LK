import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today’s appointments"
          value="16"
          note="Clinic schedule overview"
          tone="good"
        />
        <StatCard
          label="Waiting patients"
          value="7"
          note="Current queue flow"
          tone="info"
        />
        <StatCard
          label="Today’s collections"
          value="Rs. 29,300"
          note="Cash, card, bank totals"
          tone="good"
        />
        <StatCard
          label="Cash closing"
          value="Review required"
          note="Mismatch detected"
          tone="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Today</h3>
            <StatusBadge tone="warning">Busy desk</StatusBadge>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>Receipts issued: 14</p>
            <p>Cash collected: Rs. 18,000</p>
            <p>Card payments: Rs. 7,500</p>
            <p>Bank transfers: Rs. 3,800</p>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900">Low stock alerts</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>Paracetamol stock below threshold</p>
            <p>Amoxicillin out of stock</p>
            <p>Cough Syrup near expiry</p>
          </div>
        </div>
      </div>
    </div>
  );
}

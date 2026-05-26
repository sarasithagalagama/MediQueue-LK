import StatCard from "../../components/StatCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Upcoming appointments"
          value="2"
          note="Your next visits"
          tone="good"
        />
        <StatCard
          label="Queue status"
          value="Token #05"
          note="Current waiting position"
          tone="info"
        />
        <StatCard
          label="Prescriptions"
          value="4"
          note="Accessible documents"
          tone="warning"
        />
        <StatCard
          label="Certificates"
          value="1"
          note="Medical leave records"
          tone="good"
        />
      </div>
      <div className="card p-6">
        <h3 className="text-lg font-bold text-slate-900">Quick actions</h3>
        <p className="mt-2 text-sm text-slate-600">
          Book an appointment, check your queue, and review your clinic
          documents here.
        </p>
      </div>
    </div>
  );
}

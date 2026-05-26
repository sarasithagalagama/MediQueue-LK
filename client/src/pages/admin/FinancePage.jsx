import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import RolePage from "../shared/RolePage";

const data = [
  { day: "Mon", revenue: 22000 },
  { day: "Tue", revenue: 31000 },
  { day: "Wed", revenue: 18000 },
  { day: "Thu", revenue: 40000 },
  { day: "Fri", revenue: 35500 },
  { day: "Sat", revenue: 28900 },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <RolePage
        title="Finance"
        description="Track expected vs collected income, payment methods, and medicine sales."
        highlights={[
          "Today income, weekly trend, and monthly summaries",
          "Expected vs collected income view",
          "Doctor finance check support",
        ]}
      />
      <div className="card h-80 p-6">
        <h3 className="text-lg font-bold text-slate-900">Revenue trend</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0f6c5a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

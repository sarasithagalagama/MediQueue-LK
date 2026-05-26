import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StockAlertsPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/stock-alerts")
      .then((res) => setList(res.data))
      .catch(() => setList([]));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Stock Alerts</h2>
      <div className="mt-4 space-y-2">
        {list.length === 0 && <p>No alerts.</p>}
        {list.map((a) => (
          <div key={a._id} className="card p-3">
            <div className="font-semibold">{a.message}</div>
            <div className="text-sm text-slate-600">Severity: {a.severity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

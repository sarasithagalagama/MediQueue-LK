import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function CashClosingsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/cash-closings")
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Cash Closings</h2>
      <div className="mt-4 space-y-2">
        {items.length === 0 && <p>No closings found.</p>}
        {items.map((c) => (
          <div key={c._id} className="card p-3">
            <div className="font-semibold">
              {new Date(c.createdAt).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">
              Declared: {c.declaredTotal}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

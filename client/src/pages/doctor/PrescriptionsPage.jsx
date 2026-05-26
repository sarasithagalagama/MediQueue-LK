import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PrescriptionsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/prescriptions")
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Prescriptions</h2>
      <div className="mt-4 space-y-2">
        {items.length === 0 && <p>No prescriptions found.</p>}
        {items.map((p) => (
          <div key={p._id} className="card p-3">
            <div className="font-semibold">{p.patientId?.name}</div>
            <div className="text-sm text-slate-600">
              {new Date(p.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

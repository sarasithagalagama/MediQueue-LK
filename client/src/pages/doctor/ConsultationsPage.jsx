import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ConsultationsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/consultations")
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Consultations</h2>
      <div className="mt-4 space-y-2">
        {items.length === 0 && <p>No consultations found.</p>}
        {items.map((c) => (
          <div key={c._id} className="card p-3">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{c.patientId?.name}</div>
                <div className="text-sm text-slate-600">
                  {new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="text-sm text-slate-500">{c.diagnosis || "-"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

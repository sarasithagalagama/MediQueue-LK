import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MedicalCertificatesPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/certificates")
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Medical Certificates</h2>
      <div className="mt-4 space-y-2">
        {items.length === 0 && <p>No certificates found.</p>}
        {items.map((c) => (
          <div key={c._id} className="card p-3">
            <div className="font-semibold">{c.patientId?.name}</div>
            <div className="text-sm text-slate-600">{c.daysOff} days</div>
          </div>
        ))}
      </div>
    </div>
  );
}

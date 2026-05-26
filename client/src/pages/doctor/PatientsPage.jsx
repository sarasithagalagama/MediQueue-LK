import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/patients")
      .then((res) => setPatients(res.data))
      .catch(() => setPatients([]));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Patients</h2>
      <div className="mt-4 space-y-2">
        {patients.length === 0 && <p>No recent patients.</p>}
        {patients.map((p) => (
          <div key={p._id} className="card p-3">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-slate-600">{p.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

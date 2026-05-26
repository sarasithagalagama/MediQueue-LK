import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DoctorFinancePage() {
  const [data, setData] = useState({ payments: [] });

  useEffect(() => {
    api
      .get("/doctor/finance")
      .then((res) => setData(res.data))
      .catch(() => setData({ payments: [] }));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Finance Check</h2>
      <div className="mt-4 space-y-2">
        {data.payments.length === 0 && <p>No payments found.</p>}
        {data.payments.map((p) => (
          <div key={p._id} className="card p-3">
            <div className="font-semibold">Receipt: {p.receiptNo}</div>
            <div className="text-sm text-slate-600">
              Total: {p.totalPayable} — Paid: {p.amountPaid}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

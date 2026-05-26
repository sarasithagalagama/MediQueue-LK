import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MedicineStockPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/medicine-stock")
      .then((res) => setList(res.data))
      .catch(() => setList([]));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Medicine Stock</h2>
      <div className="mt-4 space-y-2">
        {list.length === 0 && <p>No medicines found.</p>}
        {list.map((m) => (
          <div key={m._id} className="card p-3 flex justify-between">
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-slate-600">
                Batch: {m.batchNo || "-"}
              </div>
            </div>
            <div className="text-sm">{m.stock || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

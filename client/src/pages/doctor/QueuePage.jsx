import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function QueuePage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api
      .get("/doctor/queue")
      .then((res) => setList(res.data))
      .catch(() => setList([]));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Today's Queue</h2>
      <div className="mt-4 space-y-2">
        {list.length === 0 && <p>No patients in queue.</p>}
        {list.map((q) => (
          <div key={q._id} className="card p-3">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Token #{q.tokenNumber}</div>
                <div className="text-sm text-slate-600">
                  {q.patientId?.name}
                </div>
              </div>
              <div className="text-sm text-slate-500">{q.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

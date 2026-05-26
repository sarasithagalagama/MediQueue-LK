import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function CurrentPatientPage() {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    api
      .get("/doctor/current-patient")
      .then((res) => setCurrent(res.data))
      .catch(() => setCurrent(null));
  }, []);

  if (!current) return <p>No current patient.</p>;

  return (
    <div>
      <h2 className="text-lg font-bold">Current Patient</h2>
      <div className="card p-4 mt-4">
        <p className="font-semibold">Token #{current.tokenNumber}</p>
        <p className="mt-1">Name: {current.patientId?.name}</p>
        <p className="mt-1">Phone: {current.patientId?.phone}</p>
        <p className="mt-1">Notes: {current.notes}</p>
      </div>
    </div>
  );
}

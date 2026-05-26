import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ReceptionistMedicineStockPage() {
  const [medicines, setMedicines] = useState([]);
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    medicineId: "",
    newQuantity: "",
    reason: "STOCK_CORRECTION",
    notes: "",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [mRes, aRes] = await Promise.all([
        api.get("/medicines"),
        api.get("/stock/adjustments"),
      ]);
      setMedicines(mRes.data || []);
      setAdjustments(aRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submitAdjustment = async (e) => {
    e.preventDefault();
    if (!form.medicineId) return alert("Select a medicine");
    try {
      const payload = {
        medicineId: form.medicineId,
        newQuantity: Number(form.newQuantity),
        reason: form.reason,
        notes: form.notes,
      };
      const res = await api.post("/stock/adjust", payload);
      alert("Adjustment requested");
      setAdjustments((a) => [res.data, ...a]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit adjustment");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Medicine Stock</h2>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-4">
          <h3 className="font-semibold">Stock List</h3>
          {loading && <div>Loading...</div>}
          <div className="mt-3 space-y-2">
            {medicines.map((m) => (
              <div
                key={m._id}
                className="p-2 border rounded flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-slate-600">
                    Batch: {m.batchNumber} | Qty: {m.quantity} | Status:{" "}
                    {m.status}
                  </div>
                </div>
                <div className="text-right">Rs. {m.sellingPrice}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4 lg:col-span-2">
          <h3 className="font-semibold">Request Stock Adjustment</h3>
          <form onSubmit={submitAdjustment} className="mt-3 space-y-3">
            <div>
              <label className="block text-sm">Medicine</label>
              <select
                name="medicineId"
                value={form.medicineId}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="">Select a medicine</option>
                {medicines.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name} — Batch {m.batchNumber} — Qty {m.quantity}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm">New Quantity</label>
              <input
                name="newQuantity"
                value={form.newQuantity}
                onChange={handleChange}
                className="input w-full"
                type="number"
              />
            </div>

            <div>
              <label className="block text-sm">Reason</label>
              <select
                name="reason"
                value={form.reason}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="STOCK_CORRECTION">Stock Correction</option>
                <option value="NEW_STOCK_PURCHASE">New Stock Purchase</option>
                <option value="EXPIRED_REMOVAL">Expired Removal</option>
                <option value="DAMAGED_MEDICINE">Damaged Medicine</option>
                <option value="RETURNED_MEDICINE">Returned Medicine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="input w-full"
              />
            </div>

            <div>
              <button className="btn btn-primary">Submit Adjustment</button>
            </div>
          </form>

          <div className="mt-6">
            <h4 className="font-semibold">Recent Adjustments</h4>
            <div className="mt-3 space-y-2">
              {adjustments.map((a) => (
                <div key={a._id} className="p-2 border rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        {a.medicineId?.name || a.medicineId}
                      </div>
                      <div className="text-sm text-slate-600">
                        Changed: {a.changedQuantity} — Reason: {a.reason}
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">
                      Status: {a.approvalStatus}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

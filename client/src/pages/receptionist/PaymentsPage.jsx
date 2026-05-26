import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ReceptionistPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientId: "",
    consultationFee: 0,
    medicineFee: 0,
    otherCharges: 0,
    discount: 0,
    amountPaid: 0,
    method: "CASH",
    notes: "",
  });

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/payments");
      setPayments(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        consultationFee: Number(form.consultationFee || 0),
        medicineFee: Number(form.medicineFee || 0),
        otherCharges: Number(form.otherCharges || 0),
        discount: Number(form.discount || 0),
        amountPaid: Number(form.amountPaid || 0),
      };
      const res = await api.post("/payments", payload);
      setPayments((p) => [res.data, ...p]);
      setForm({
        patientId: "",
        consultationFee: 0,
        medicineFee: 0,
        otherCharges: 0,
        discount: 0,
        amountPaid: 0,
        method: "CASH",
        notes: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create payment");
    }
  };

  const refresh = () => fetchPayments();

  const openReceipt = (id) => {
    // fetch PDF using auth header, create blob URL and open in new tab
    (async () => {
      try {
        const token = localStorage.getItem("mediqueue_token");
        const res = await fetch(
          `${api.defaults.baseURL}/payments/${id}/receipt`,
          {
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          },
        );
        if (!res.ok) throw new Error("Failed to fetch receipt");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } catch (err) {
        console.error(err);
        alert(err.message || "Could not load receipt");
      }
    })();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payments</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-semibold">New Payment</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="block text-sm">Patient ID</label>
              <input
                name="patientId"
                value={form.patientId}
                onChange={handleChange}
                className="input w-full"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <label className="block text-sm">Consultation Fee</label>
                <input
                  name="consultationFee"
                  value={form.consultationFee}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm">Medicine Fee</label>
                <input
                  name="medicineFee"
                  value={form.medicineFee}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm">Other Charges</label>
                <input
                  name="otherCharges"
                  value={form.otherCharges}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <label className="block text-sm">Discount</label>
                <input
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm">Amount Paid</label>
                <input
                  name="amountPaid"
                  value={form.amountPaid}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm">Method</label>
              <select
                name="method"
                value={form.method}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
                <option value="BANK">Bank</option>
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
              <button className="btn btn-primary">Create Payment</button>
            </div>
          </form>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold">Recent Payments</h3>
          <div className="mt-4 space-y-3">
            {loading && <div>Loading...</div>}
            {!loading && payments.length === 0 && <div>No payments yet</div>}
            {!loading && (
              <div className="space-y-3">
                {payments.map((p) => (
                  <div key={p._id} className="p-3 border rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">
                          Receipt: {p.receiptNo}
                        </div>
                        <div className="text-sm text-slate-600">
                          Patient: {p.patientId || "—"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          Rs. {p.amountPaid || 0}
                        </div>
                        <div className="text-sm text-slate-600">{p.status}</div>
                        <div className="mt-2 flex items-center justify-end gap-2">
                          <button
                            onClick={() => openReceipt(p._id)}
                            className="btn btn-sm btn-outline"
                          >
                            View Receipt
                          </button>
                          <button onClick={refresh} className="btn btn-sm">
                            Refresh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

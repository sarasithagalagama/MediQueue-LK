import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ReceptionistMedicineSalesPage() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [createPayment, setCreatePayment] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [amountPaid, setAmountPaid] = useState(0);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const res = await api.get("/medicines");
      setMedicines(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (medicine) => {
    const existing = cart.find((c) => c.medicineId === medicine._id);
    if (existing) {
      setCart((c) =>
        c.map((it) =>
          it.medicineId === medicine._id
            ? { ...it, quantity: it.quantity + 1 }
            : it,
        ),
      );
    } else {
      setCart((c) => [
        ...c,
        {
          medicineId: medicine._id,
          name: medicine.name,
          unitPrice: medicine.sellingPrice || 0,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQty = (medicineId, qty) => {
    setCart((c) =>
      c.map((it) =>
        it.medicineId === medicineId ? { ...it, quantity: Number(qty) } : it,
      ),
    );
  };

  const removeItem = (medicineId) =>
    setCart((c) => c.filter((it) => it.medicineId !== medicineId));

  const total = cart.reduce(
    (s, it) => s + (it.unitPrice || 0) * (it.quantity || 0),
    0,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId) return alert("Patient ID is required");
    if (cart.length === 0) return alert("Add at least one medicine");
    try {
      const payload = {
        patientId,
        medicines: cart.map((it) => ({
          medicineId: it.medicineId,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
        })),
        status: "COMPLETED",
      };
      const res = await api.post("/medicine-sales", payload);
      const sale = res.data;
      alert("Sale created: " + sale._id);
      // Optionally create payment for the sale
      if (createPayment) {
        try {
          const payPayload = {
            patientId,
            consultationFee: 0,
            medicineFee: total,
            otherCharges: 0,
            discount: 0,
            amountPaid: Number(amountPaid || total),
            method: paymentMethod,
            notes: `Payment for medicine sale ${sale._id}`,
          };
          const pRes = await api.post("/payments", payPayload);
          const payment = pRes.data;
          alert("Payment created: " + payment._id);
          // open receipt pdf
          const receiptUrl = `${api.defaults.baseURL}/payments/${payment._id}/receipt`;
          window.open(receiptUrl, "_blank");
        } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || "Failed to create payment");
        }
      }
      setCart([]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create sale");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Medicine Sales</h2>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card p-4">
          <h3 className="font-semibold">Medicines</h3>
          {loading && <div>Loading...</div>}
          {!loading && medicines.length === 0 && <div>No medicines found</div>}
          <div className="mt-3 space-y-2">
            {medicines.slice(0, 50).map((m) => (
              <div
                key={m._id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-slate-600">
                    Batch: {m.batchNumber} | Qty: {m.quantity}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Rs. {m.sellingPrice}</div>
                  <button onClick={() => addToCart(m)} className="btn btn-sm">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4 lg:col-span-2">
          <h3 className="font-semibold">Sale</h3>
          <form onSubmit={handleSubmit} className="mt-3 space-y-3">
            <div>
              <label className="block text-sm">Patient ID</label>
              <input
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="input w-full"
              />
            </div>

            <div>
              <h4 className="font-medium">Cart</h4>
              {cart.length === 0 && (
                <div className="text-sm text-slate-600">Cart is empty</div>
              )}
              <div className="mt-2 space-y-2">
                {cart.map((it) => (
                  <div
                    key={it.medicineId}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-sm text-slate-600">
                        Rs. {it.unitPrice}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={it.quantity}
                        onChange={(e) =>
                          updateQty(it.medicineId, e.target.value)
                        }
                        className="input w-20"
                      />
                      <div className="font-semibold">
                        Rs. {(it.unitPrice * it.quantity).toFixed(2)}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(it.medicineId)}
                        className="btn btn-ghost"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-semibold">Total</div>
              <div className="text-xl font-bold">Rs. {total.toFixed(2)}</div>
            </div>

            <div className="grid gap-3 lg:grid-cols-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={createPayment}
                  onChange={(e) => setCreatePayment(e.target.checked)}
                />
                <span className="text-sm">Also create payment now</span>
              </label>

              {createPayment && (
                <div>
                  <label className="block text-sm">Amount Paid</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={amountPaid || total}
                    onChange={(e) => setAmountPaid(e.target.value)}
                  />
                </div>
              )}

              {createPayment && (
                <div>
                  <label className="block text-sm">Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="input w-full"
                  >
                    <option value="CASH">Cash</option>
                    <option value="CARD">Card</option>
                    <option value="MOBILE">Mobile</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <button className="btn btn-primary">Create Sale</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

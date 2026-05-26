export default function BookAppointmentPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="card p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clinic-700">
          Appointment booking
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
          Request your clinic appointment
        </h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Patient name"
          />
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Phone"
          />
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="NIC (optional)"
          />
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3"
            type="date"
          />
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3"
            type="time"
          />
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
            placeholder="Reason for visit"
          />
        </div>
        <button type="button" className="btn-primary mt-6">
          Submit booking request
        </button>
      </div>
    </section>
  );
}

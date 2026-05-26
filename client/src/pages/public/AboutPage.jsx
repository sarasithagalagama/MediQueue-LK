export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="card p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clinic-700">
          About the clinic
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
          Practical, patient-first clinic management.
        </h1>
        <div className="mt-6 space-y-4 text-slate-600">
          <p>
            MediQueue LK is designed for a Sri Lankan private doctor practice
            where reception, treatment, stock, and finance all move through one
            controlled workflow.
          </p>
          <p>
            The system keeps the doctor focused on care, while reception handles
            registration, queues, payments, and WhatsApp communication using
            safe web links only.
          </p>
          <p>
            Its main aim is to reduce errors, improve visibility, and keep every
            payment and stock change traceable.
          </p>
        </div>
      </div>
    </section>
  );
}

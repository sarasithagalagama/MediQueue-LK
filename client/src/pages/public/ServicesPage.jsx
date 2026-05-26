const services = [
  "General consultation",
  "Follow-up consultation",
  "Report review",
  "Medical certificates",
  "Prescription services",
  "Basic medicine issuing",
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight text-slate-900">
        Clinic services
      </h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div key={service} className="card p-6">
            <p className="text-lg font-semibold text-slate-900">{service}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Structured for fast patient flow and accurate documentation.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

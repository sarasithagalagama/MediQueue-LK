import { Link } from "react-router-dom";

const services = [
  "General Consultation",
  "Follow-up Care",
  "Medical Certificates",
  "Prescriptions",
  "Medicine Issuing",
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-full bg-clinic-50 px-4 py-2 text-sm font-semibold text-clinic-800 ring-1 ring-clinic-100">
            Sri Lankan private practice operations platform
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
              Fast clinic workflows for doctor, receptionist, and patient.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              MediQueue LK handles appointments, queue tokens, prescriptions,
              medical certificates, payments, stock, alerts, and finance checks
              in one practical system.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-primary" to="/book-appointment">
              Book appointment
            </Link>
            <Link className="btn-secondary" to="/contact">
              Contact clinic
            </Link>
            <Link className="btn-secondary" to="/login">
              Login
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <InfoCard label="Doctor" value="Dr. Sahan Perera" />
            <InfoCard label="Opening hours" value="Mon-Sat 8:00 AM - 8:00 PM" />
            <InfoCard label="WhatsApp" value="Quick Web links only" />
          </div>
        </div>
        <div className="card overflow-hidden p-6">
          <div className="rounded-3xl bg-gradient-to-br from-clinic-700 to-clinic-500 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/75">
              Clinic dashboard preview
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Today’s tokens",
                "Pending payments",
                "Low stock",
                "Cash closing",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-4 backdrop-blur"
                >
                  <p className="text-sm text-white/80">{item}</p>
                  <p className="mt-2 text-2xl font-bold">
                    {Math.floor(Math.random() * 50) + 8}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

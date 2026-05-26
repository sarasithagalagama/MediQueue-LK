export default function DoctorPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="card p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clinic-700">
          Doctor profile
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
          Dr. Sahan Perera
        </h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ProfileField
            label="Qualifications"
            value="MBBS, MD Family Medicine"
          />
          <ProfileField
            label="Specialization"
            value="Family Medicine & Primary Care"
          />
          <ProfileField label="SLMC registration" value="SLMC-12345" />
          <ProfileField label="Consultation hours" value="8:00 AM - 8:00 PM" />
        </div>
      </div>
    </section>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
    </div>
  );
}

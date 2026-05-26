export default function RolePage({ title, description, highlights = [] }) {
  return (
    <section className="space-y-6">
      <div className="card p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clinic-700">
          Module
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-slate-600">{description}</p>
      </div>
      {highlights.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item}
              className="card p-5 text-sm font-medium text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

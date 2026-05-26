export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-clinic-700">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
            Reach the clinic directly
          </h1>
          <div className="mt-6 space-y-4 text-slate-600">
            <Info label="Address" value="123 Galle Road, Colombo, Sri Lanka" />
            <Info label="Phone" value="+94 11 234 5678" />
            <Info label="WhatsApp" value="+94 77 123 4567" />
            <Info label="Email" value="hello@mediqueuelk.com" />
            <Info label="Opening hours" value="Mon-Sat, 8:00 AM - 8:00 PM" />
          </div>
        </div>
        <form className="card space-y-4 p-8">
          <h2 className="text-2xl font-bold text-slate-900">Send inquiry</h2>
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Your name"
          />
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Email"
          />
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Phone"
          />
          <textarea
            className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Message"
          />
          <button type="button" className="btn-primary">
            Submit inquiry
          </button>
        </form>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  );
}

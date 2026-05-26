export default function RegisterPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-md items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="card w-full space-y-4 p-8">
        <h1 className="text-3xl font-black text-slate-900">
          Patient registration
        </h1>
        <p className="text-sm text-slate-600">
          Optional public registration page for patient accounts.
        </p>
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Full name"
        />
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Email"
        />
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Phone"
        />
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          type="password"
          placeholder="Password"
        />
        <button type="button" className="btn-primary w-full">
          Create account
        </button>
      </div>
    </section>
  );
}

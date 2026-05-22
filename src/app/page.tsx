export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#191716]">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-10">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b675f]">
          DGG Frontpage
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
          Next.js 16 with Decap CMS on Node 24.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#514d46]">
          This starter uses the App Router, TypeScript, Tailwind CSS, and a
          static Decap CMS admin mounted at <code>/admin</code>.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            className="rounded-md bg-[#191716] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3630]"
            href="/admin/"
          >
            Open CMS
          </a>
          <a
            className="rounded-md border border-[#c9c0b1] px-5 py-3 text-sm font-semibold text-[#191716] transition hover:bg-white"
            href="https://decapcms.org/docs/intro/"
            target="_blank"
            rel="noreferrer"
          >
            Decap Docs
          </a>
        </div>
      </section>
      </main>
  );
}

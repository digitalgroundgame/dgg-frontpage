import { formatPostDate, getPosts } from "@/lib/posts";

export default function Home() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <section className="mx-auto flex min-h-[72vh] w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-10">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
          DGG Frontpage
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
          Next.js 16 with Decap CMS on Node 24.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-charcoal">
          This starter uses the App Router, TypeScript, Tailwind CSS, and a
          static Decap CMS admin mounted at <code>/admin</code>.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            className="rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold text-near-white-blue transition hover:bg-accent-red"
            href="/admin/"
          >
            Open CMS
          </a>
          <a
            className="rounded-md border border-brand-blue px-5 py-3 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-near-white-blue"
            href="https://decapcms.org/docs/intro/"
            target="_blank"
            rel="noreferrer"
          >
            Decap Docs
          </a>
        </div>
      </section>
      <section className="border-t border-brand-blue bg-near-white-blue px-6 py-14 sm:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red">
                Posts
              </p>
              <h2 className="mt-2 text-3xl font-semibold">Latest from Decap</h2>
            </div>
            <span className="text-sm text-brand-blue">
              {posts.length} {posts.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-4">
              {posts.map((post) => (
                <article
                  className="rounded-md border border-brand-blue bg-near-white-blue p-5"
                  key={post.slug}
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm text-brand-blue">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    {post.draft ? (
                      <span className="rounded bg-red px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-near-white-blue">
                        Draft
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                  {post.excerpt ? (
                    <p className="mt-3 max-w-3xl leading-7 text-charcoal">
                      {post.excerpt}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-md border border-dashed border-brand-blue p-5 text-charcoal">
              No posts found in <code>content/posts</code>.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

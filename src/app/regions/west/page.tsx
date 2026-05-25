import { BlogMarkdown } from "@/components/blog-markdown";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WestRegionMap } from "@/components/west-region-map";
import {
  formatDispatchDate,
  getWestRegionDispatchEntries,
} from "@/lib/west-region-dispatch";

export default function WestRegionPage() {
  const dispatchEntries = getWestRegionDispatchEntries();

  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <WestRegionMap />

      <section className="px-8 py-16 sm:px-12" id="west-region-dispatch">
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid gap-4">
            <div>
              <h1 className="type-kicker text-light-charcoal">
                West Region Dispatch
              </h1>
            </div>
            <p className="type-body max-w-2xl">
              A running blog for regional updates and practical ways to get
              involved.
            </p>
          </div>

          {dispatchEntries.length > 0 ? (
            <div className="mt-10 grid gap-6">
              {dispatchEntries.map((entry) => (
                <article className="text-charcoal" key={entry.slug}>
                  <header className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)] md:items-start">
                    <div>
                      <time
                        className="type-label text-light-charcoal"
                        dateTime={entry.date}
                      >
                        {formatDispatchDate(entry.date)}
                      </time>
                      <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                        {entry.title}
                      </h1>
                    </div>

                    <div className="text-charcoal">
                      <p className="type-label">
                        {entry.author?.name ?? entry.authorSlug}
                      </p>
                      {entry.author?.bio ? (
                        <p className="type-small-body mt-2">
                          {entry.author.bio}
                        </p>
                      ) : null}
                    </div>
                  </header>

                  <div className="mt-8">
                    {entry.body ? (
                      <BlogMarkdown>{entry.body}</BlogMarkdown>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 bg-charcoal p-6 text-near-white-blue">
              <p className="type-body">
                West Region Dispatch entries will appear here once they are
                published in the CMS.
              </p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

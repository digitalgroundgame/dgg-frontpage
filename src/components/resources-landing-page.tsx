import { BlogCardPreview } from "@/components/blog-card-preview";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatResourceDate, getResourceEntries } from "@/lib/resources";

const ARTICLE_BASE_HREF = "/resources";

function formatAuthors(authors: string[]) {
  return authors.length > 0 ? authors.join(", ") : undefined;
}

export function ResourcesLandingPage() {
  const resources = getResourceEntries();

  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-8 pt-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <p className="type-label text-brand-blue">Digital Ground Game</p>
          <h1 className="type-kicker mt-3 text-light-charcoal">Resources</h1>
          <div className="mt-8 grid gap-6 text-light-charcoal"></div>
        </div>
      </section>

      <section className="px-8 pb-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          {resources.length > 0 ? (
            <div className="mt-8 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((entry) => (
                <BlogCardPreview
                  authorName={formatAuthors(entry.authors)}
                  date={entry.date}
                  formattedDate={formatResourceDate(entry.date)}
                  key={entry.slug}
                  readMoreHref={`${ARTICLE_BASE_HREF}/${entry.slug}`}
                  slug={entry.slug}
                  title={entry.title}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 bg-brand-blue p-6 text-near-white-blue">
              <p className="type-small-body">
                Resources will appear here once they are published in the CMS.
              </p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

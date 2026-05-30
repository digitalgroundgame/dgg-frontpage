import { BlogCardPreview } from "@/components/widgets/blog-card-preview";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import {
  formatDispatchDate,
  getCallToActionDispatchEntries,
  type CallToActionDispatchEntry,
} from "@/lib/call-to-action-dispatch";
import type { Metadata } from "next";

const DISPATCH_BASE_HREF = "/call-to-action";

function dispatchPreviewProps(entry: CallToActionDispatchEntry) {
  return {
    title: entry.title,
    date: entry.date,
    formattedDate: formatDispatchDate(entry.date),
    slug: entry.slug,
    authorName:
      entry.authors.length > 0
        ? entry.authors.map((author) => author.name).join(", ")
        : entry.authorSlugs.join(", "),
    readMoreHref: `${DISPATCH_BASE_HREF}/${entry.slug}`,
  };
}

export const metadata: Metadata = {
  title: "Call to Action | Digital Ground Game",
  description:
    "All Call to Action posts — weekly CTAs, and ways to get involved.",
};

export default function CallToActionDispatchListPage() {
  const dispatchEntries = getCallToActionDispatchEntries();

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-8 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-4">
            <h1 className="type-kicker text-light-charcoal">Call to Action</h1>
            <p className="type-body max-w-2xl">
              Every dispatch from the Call to Action program.
            </p>
          </div>

          {dispatchEntries.length > 0 ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {dispatchEntries.map((entry) => (
                <BlogCardPreview
                  key={entry.slug}
                  {...dispatchPreviewProps(entry)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 bg-charcoal p-6 text-near-white-blue">
              <p className="type-body">
                Call to Action entries will appear here once they are published
                in the CMS.
              </p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

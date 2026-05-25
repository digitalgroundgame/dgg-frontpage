import { BlogCardPreview } from "@/components/blog-card-preview";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatDispatchDate,
  getWestRegionDispatchEntries,
  type WestRegionDispatchEntry,
} from "@/lib/west-region-dispatch";
import type { Metadata } from "next";
import Link from "next/link";

const DISPATCH_BASE_HREF = "/regions/west/dispatch";

function dispatchPreviewProps(entry: WestRegionDispatchEntry) {
  return {
    title: entry.title,
    date: entry.date,
    formattedDate: formatDispatchDate(entry.date),
    slug: entry.slug,
    authorName: entry.author?.name ?? entry.authorSlug,
    readMoreHref: `${DISPATCH_BASE_HREF}/${entry.slug}`,
  };
}

export const metadata: Metadata = {
  title: "West Region Dispatch | Digital Ground Game",
  description:
    "All West Region Dispatch posts — regional updates and practical ways to get involved.",
};

export default function WestRegionDispatchListPage() {
  const dispatchEntries = getWestRegionDispatchEntries();

  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-8 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-4">
            <p className="type-label text-light-charcoal">
              <Link
                className="transition hover:text-brand-blue"
                href="/regions/west"
              >
                West Region
              </Link>
            </p>
            <h1 className="type-kicker text-light-charcoal">
              West Region Dispatch
            </h1>
            <p className="type-body max-w-2xl">
              Every dispatch from the West Region.
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

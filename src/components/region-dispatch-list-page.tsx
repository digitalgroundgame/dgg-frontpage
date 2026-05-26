import { BlogCardPreview } from "@/components/blog-card-preview";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatDispatchDate,
  getRegionDispatchEntries,
  type RegionDispatchEntry,
} from "@/lib/region-dispatch";
import type { RegionDispatchConfig } from "@/lib/regions";
import Link from "next/link";

type RegionDispatchListPageProps = {
  region: RegionDispatchConfig;
};

export function RegionDispatchListPage({
  region,
}: RegionDispatchListPageProps) {
  const dispatchEntries = getRegionDispatchEntries(region.contentCollection);
  const regionHref = `/regions/${region.slug}`;
  const dispatchBaseHref = `${regionHref}/dispatch`;

  function dispatchPreviewProps(entry: RegionDispatchEntry) {
    return {
      title: entry.title,
      date: entry.date,
      formattedDate: formatDispatchDate(entry.date),
      slug: entry.slug,
      authorName: entry.author?.name ?? entry.authorSlug,
      readMoreHref: `${dispatchBaseHref}/${entry.slug}`,
    };
  }

  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-8 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-4">
            <p className="type-label text-light-charcoal">
              <Link
                className="transition hover:text-brand-blue"
                href={regionHref}
              >
                {region.name}
              </Link>
            </p>
            <h1 className="type-kicker text-light-charcoal">
              {region.dispatchName}
            </h1>
            <p className="type-body max-w-2xl">
              Every dispatch from the {region.name} Region.
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
                {region.dispatchName} entries will appear here once they are
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

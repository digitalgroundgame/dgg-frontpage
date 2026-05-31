import { Article } from "@/components/page-blocks/article";
import { DispatchPreviewGrid } from "@/components/page-blocks/dispatch-preview-grid";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import {
  formatDispatchDate,
  getRegionDispatchEntries,
  getRegionDispatchEntryBySlug,
} from "@/lib/region-dispatch";
import type { RegionDispatchConfig } from "@/lib/regions";
import Link from "next/link";
import { notFound } from "next/navigation";

type RegionDispatchEntryPageProps = {
  region: RegionDispatchConfig;
  slug: string;
};

export function RegionDispatchEntryPage({
  region,
  slug,
}: RegionDispatchEntryPageProps) {
  const entry = getRegionDispatchEntryBySlug(region.contentCollection, slug);

  if (!entry) {
    notFound();
  }

  const regionHref = `/regions/${region.slug}`;
  const dispatchBaseHref = `${regionHref}/dispatch`;
  const otherDispatches = getRegionDispatchEntries(region.contentCollection)
    .filter((dispatch) => dispatch.slug !== slug)
    .slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <article className="px-8 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-3xl">
          <p className="type-label text-light-charcoal">
            <Link
              className="transition hover:text-brand-blue"
              href={regionHref}
            >
              {region.name}
            </Link>
            {" / "}
            <Link
              className="transition hover:text-brand-blue"
              href={dispatchBaseHref}
            >
              Dispatch
            </Link>
          </p>

          <div className="mt-6">
            <Article
              authors={entry.authors}
              authorSlugs={entry.authorSlugs}
              body={entry.body}
              dateTime={entry.date}
              formattedDate={formatDispatchDate(entry.date)}
              headingLevel="h1"
              heroFilter={entry.heroFilter}
              heroPhoto={entry.heroPhoto}
              title={entry.title}
            />
          </div>
        </div>
      </article>

      {otherDispatches.length > 0 ? (
        <section className="px-8 py-16 sm:px-12 lg:px-20">
          <DispatchPreviewGrid
            baseHref={dispatchBaseHref}
            entries={otherDispatches}
            formatDate={formatDispatchDate}
            title="More dispatches"
          />
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}

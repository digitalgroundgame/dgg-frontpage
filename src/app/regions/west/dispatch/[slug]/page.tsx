import { DispatchArticle } from "@/components/dispatch-article";
import { DispatchPreviewGrid } from "@/components/dispatch-preview-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatDispatchDate,
  getWestRegionDispatchEntries,
  getWestRegionDispatchEntryBySlug,
} from "@/lib/west-region-dispatch";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const DISPATCH_BASE_HREF = "/regions/west/dispatch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getWestRegionDispatchEntries().map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWestRegionDispatchEntryBySlug(slug);

  if (!entry) {
    return { title: "Dispatch not found | Digital Ground Game" };
  }

  return {
    title: `${entry.title} | West Region Dispatch`,
    description: `West Region Dispatch update: ${entry.title}.`,
  };
}

export default async function WestRegionDispatchPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getWestRegionDispatchEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const otherDispatches = getWestRegionDispatchEntries()
    .filter((dispatch) => dispatch.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <article className="px-8 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-3xl">
          <p className="type-label text-light-charcoal">
            <Link
              className="transition hover:text-brand-blue"
              href="/regions/west"
            >
              West Region
            </Link>
            {" / "}
            <Link
              className="transition hover:text-brand-blue"
              href={DISPATCH_BASE_HREF}
            >
              Dispatch
            </Link>
          </p>

          <div className="mt-6">
            <DispatchArticle
              author={entry.author}
              authorSlug={entry.authorSlug}
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
        <section className="px-8 py-16 sm:px-12">
          <DispatchPreviewGrid
            baseHref={DISPATCH_BASE_HREF}
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

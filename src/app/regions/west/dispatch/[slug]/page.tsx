import { BlogMarkdown } from "@/components/blog-markdown";
import { WestRegionDispatchPreviewGrid } from "@/components/west-region-dispatch-preview-grid";
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

          <header className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)] md:items-start">
            <div>
              <time className="type-label text-light-charcoal" dateTime={entry.date}>
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
                <p className="type-small-body mt-2">{entry.author.bio}</p>
              ) : null}
            </div>
          </header>

          <div className="mt-8">
            {entry.body ? <BlogMarkdown>{entry.body}</BlogMarkdown> : null}
          </div>
        </div>
      </article>

      {otherDispatches.length > 0 ? (
        <section className="px-8 py-16 sm:px-12">
          <WestRegionDispatchPreviewGrid
            entries={otherDispatches}
            title="More dispatches"
          />
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}

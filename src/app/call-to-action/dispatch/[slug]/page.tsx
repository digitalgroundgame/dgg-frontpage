import { DispatchArticle } from "@/components/page-blocks/dispatch-article";
import { DispatchPreviewGrid } from "@/components/page-blocks/dispatch-preview-grid";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import {
  formatDispatchDate,
  getCallToActionDispatchEntries,
  getCallToActionDispatchEntryBySlug,
} from "@/lib/call-to-action-dispatch";
import { getPostImageMetadata } from "@/lib/post-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const DISPATCH_BASE_HREF = "/call-to-action/dispatch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCallToActionDispatchEntries().map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCallToActionDispatchEntryBySlug(slug);

  if (!entry) {
    return { title: "Dispatch not found | Digital Ground Game" };
  }

  return {
    title: `${entry.title} | Call to Action Dispatch`,
    description: `Call to Action Dispatch: ${entry.title}.`,
    ...getPostImageMetadata(entry.heroPhoto, entry.title),
  };
}

export default async function CallToActionDispatchPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getCallToActionDispatchEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const otherDispatches = getCallToActionDispatchEntries()
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
              href="/call-to-action"
            >
              Call to Action
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

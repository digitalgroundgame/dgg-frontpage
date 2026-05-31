import { Article } from "@/components/page-blocks/article";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import {
  formatResourceDate,
  getResourceEntries,
  getResourceEntryBySlug,
} from "@/lib/resources";
import { getPostImageMetadata } from "@/lib/post-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getResourceEntries().map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResourceEntryBySlug(slug);

  if (!entry) {
    return { title: "Resource not found | Digital Ground Game" };
  }

  return {
    title: `${entry.title} | Resources`,
    description: `Digital Ground Game resource: ${entry.title}.`,
    ...getPostImageMetadata(entry.heroPhoto, entry.title),
  };
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getResourceEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <article className="px-8 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-3xl">
          <p className="type-label text-light-charcoal">
            <Link className="transition hover:text-brand-blue" href="/resources">
              Resources
            </Link>
          </p>

          <div className="mt-6">
            <Article
              authors={entry.authors}
              authorSlugs={entry.authorSlugs}
              body={entry.body}
              dateTime={entry.date}
              formattedDate={formatResourceDate(entry.date)}
              headingLevel="h1"
              heroFilter={entry.heroFilter}
              heroPhoto={entry.heroPhoto}
              title={entry.title}
            />
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

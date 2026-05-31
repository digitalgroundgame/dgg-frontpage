import { Article } from "@/components/page-blocks/article";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import {
  formatTalkingPointDate,
  getTalkingPointEntries,
  getTalkingPointEntryBySlug,
} from "@/lib/talking-points";
import { getPostImageMetadata } from "@/lib/post-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getTalkingPointEntries().map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getTalkingPointEntryBySlug(slug);

  if (!entry) {
    return { title: "Talking point not found | Digital Ground Game" };
  }

  return {
    title: `${entry.title} | Talking Points Repository`,
    description: `Talking Points Repository article: ${entry.title}.`,
    ...getPostImageMetadata(entry.heroPhoto, entry.title),
  };
}

export default async function TalkingPointArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getTalkingPointEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <article className="px-8 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-3xl">
          <p className="type-label text-light-charcoal">
            <Link
              className="transition hover:text-brand-blue"
              href="/talking-points-repo"
            >
              Talking Points Repository
            </Link>
          </p>

          <div className="mt-6">
            <Article
              authors={entry.authors}
              authorSlugs={entry.authorSlugs}
              body={entry.body}
              dateTime={entry.date}
              formattedDate={formatTalkingPointDate(entry.date)}
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

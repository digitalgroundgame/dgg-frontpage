import { BlogMarkdown } from "@/components/page-blocks/blog-markdown";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import {
  formatTalkingPointDate,
  getTalkingPointEntries,
  getTalkingPointEntryBySlug,
} from "@/lib/talking-points";
import { getPostImageMetadata } from "@/lib/post-metadata";
import type { Metadata } from "next";
import Image from "next/image";
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

          <header className="mt-6">
            {entry.heroPhoto ? (
              <div className="relative aspect-[1200/630] overflow-hidden bg-charcoal">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 768px) 48rem, 100vw"
                  src={entry.heroPhoto}
                />
                {entry.heroFilter ? (
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/55 to-transparent" />
                ) : (
                  <div className="absolute inset-0 bg-black/45" />
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 text-near-white-blue sm:p-6">
                  <time
                    className="type-label text-near-white-blue/85"
                    dateTime={entry.date}
                  >
                    {formatTalkingPointDate(entry.date)}
                  </time>
                  <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                    {entry.title}
                  </h1>
                </div>
              </div>
            ) : (
              <>
                <time className="type-label text-light-charcoal" dateTime={entry.date}>
                  {formatTalkingPointDate(entry.date)}
                </time>
                <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
                  {entry.title}
                </h1>
              </>
            )}
            {entry.authors.length > 0 ? (
              <p className="type-label mt-5 text-brand-blue">
                {entry.authors.join(", ")}
              </p>
            ) : null}
          </header>

          <div className="mt-16">
            {entry.body ? <BlogMarkdown>{entry.body}</BlogMarkdown> : null}
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

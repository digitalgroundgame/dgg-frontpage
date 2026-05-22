import { BlogCardPreview } from "@/components/widgets/blog-card-preview";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import { formatResourceDate, getResourceEntries } from "@/lib/resources";
import {
  formatTalkingPointDate,
  getTalkingPointEntries,
} from "@/lib/talking-points";
import type { Author } from "@/lib/authors";
import type { ReactNode } from "react";

type LandingEntry = {
  authorSlugs: string[];
  authors: Author[];
  date: string;
  slug: string;
  title: string;
};

type ContentLandingPageProps = {
  articleBaseHref: string;
  credits?: ReactNode;
  description?: ReactNode;
  emptyMessage: string;
  entries: LandingEntry[];
  eyebrow: string;
  formatDate: (date: string) => string;
  title: string;
};

function formatAuthors(entry: LandingEntry) {
  if (entry.authors.length > 0) {
    return entry.authors.map((author) => author.name).join(", ");
  }

  return entry.authorSlugs.length > 0
    ? entry.authorSlugs.join(", ")
    : undefined;
}

function ContentLandingPage({
  articleBaseHref,
  credits,
  description,
  emptyMessage,
  entries,
  eyebrow,
  formatDate,
  title,
}: ContentLandingPageProps) {
  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-8 pt-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <p className="type-label text-brand-blue">{eyebrow}</p>
          <h1 className="type-kicker mt-3 text-light-charcoal">{title}</h1>
          {description ? (
            <div className="mt-8 grid gap-6 text-light-charcoal">
              {description}
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-8 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          {entries.length > 0 ? (
            <div className="mt-8 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <BlogCardPreview
                  authorName={formatAuthors(entry)}
                  date={entry.date}
                  formattedDate={formatDate(entry.date)}
                  key={entry.slug}
                  readMoreHref={`${articleBaseHref}/${entry.slug}`}
                  slug={entry.slug}
                  title={entry.title}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 bg-brand-blue p-6 text-near-white-blue">
              <p className="type-small-body">{emptyMessage}</p>
            </div>
          )}
        </div>
      </section>

      {credits}

      <SiteFooter />
    </main>
  );
}

export function ResourcesLandingPage() {
  return (
    <ContentLandingPage
      articleBaseHref="/resources"
      emptyMessage="Resources will appear here once they are published in the CMS."
      entries={getResourceEntries()}
      eyebrow="Digital Ground Game"
      formatDate={formatResourceDate}
      title="Resources"
    />
  );
}

export function TalkingPointsLandingPage() {
  return (
    <ContentLandingPage
      articleBaseHref="/talking-points-repo"
      description={
        <>
          <p className="type-small-body">
            The Talking Points Repository is a resource for political
            activism, canvassing, and phonebanking. It is designed to support
            the 2026 U.S. midterm elections and future organizing efforts.
          </p>
          <p className="type-small-body">
            Articles generally have three sections: introduction, persuasion,
            and debate. The introduction provides context. The persuasion
            section offers accessible arguments for undecided or less-informed
            audiences. The debate section covers responses for more adversarial
            conversations, with an emphasis on factual accuracy.
          </p>
          <p className="type-small-body">
            Each article is supported by academic research, studies, relevant
            memes, and video clips. Sources may appear in footnotes, with a
            full bibliography available for each article.
          </p>
          <p className="type-small-body">
            To share
            feedback or contribute, join our Discord and contact Research Team
            leadership.
          </p>
        </>
      }
      emptyMessage="Talking Points articles will appear here once they are published in the CMS."
      entries={getTalkingPointEntries()}
      eyebrow="DGG Research Team"
      formatDate={formatTalkingPointDate}
      title="Talking Points Repository"
    />
  );
}

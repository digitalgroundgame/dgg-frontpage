import { BlogCardPreview } from "@/components/widgets/blog-card-preview";
import Link from "next/link";

export type DispatchPreviewEntry = {
  slug: string;
  title: string;
  date: string;
  authorSlug: string;
  author?: { name: string };
};

type DispatchPreviewGridProps = {
  title: string;
  entries: DispatchPreviewEntry[];
  baseHref: string;
  formatDate: (date: string) => string;
  showViewAllLink?: boolean;
};

function dispatchPreviewProps(
  entry: DispatchPreviewEntry,
  baseHref: string,
  formatDate: (date: string) => string,
) {
  return {
    title: entry.title,
    date: entry.date,
    formattedDate: formatDate(entry.date),
    slug: entry.slug,
    authorName: entry.author?.name ?? entry.authorSlug,
    readMoreHref: `${baseHref}/${entry.slug}`,
  };
}

export function DispatchPreviewGrid({
  title,
  entries,
  baseHref,
  formatDate,
  showViewAllLink = false,
}: DispatchPreviewGridProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h2 className="type-section-title text-light-charcoal">{title}</h2>
      <div className="mt-8 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <BlogCardPreview
            key={entry.slug}
            {...dispatchPreviewProps(entry, baseHref, formatDate)}
          />
        ))}
      </div>
      {showViewAllLink ? (
        <div className="mt-12">
          <Link
            className="type-button inline-flex bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-accent-red"
            href={baseHref}
          >
            View all dispatches
          </Link>
        </div>
      ) : null}
    </div>
  );
}

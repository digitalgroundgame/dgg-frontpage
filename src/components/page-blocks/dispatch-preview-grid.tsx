import { BlogCardPreview } from "@/components/widgets/blog-card-preview";
import { ButtonLink } from "@/components/widgets/button-link";

export type DispatchPreviewEntry = {
  slug: string;
  title: string;
  date: string;
  authorSlugs: string[];
  authors: { name: string }[];
};

type DispatchPreviewGridProps = {
  title: string;
  entries: DispatchPreviewEntry[];
  baseHref: string;
  formatDate: (date: string) => string;
  showViewAllLink?: boolean;
  viewAllLabel?: string;
  viewAllHref?: string;
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
    authorName:
      entry.authors.length > 0
        ? entry.authors.map((author) => author.name).join(", ")
        : entry.authorSlugs.join(", "),
    readMoreHref: `${baseHref}/${entry.slug}`,
  };
}

export function DispatchPreviewGrid({
  title,
  entries,
  baseHref,
  formatDate,
  showViewAllLink = false,
  viewAllLabel = "View all dispatches",
  viewAllHref,
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
          <ButtonLink href={viewAllHref ?? baseHref} primaryHover="blue-black">
            {viewAllLabel}
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}

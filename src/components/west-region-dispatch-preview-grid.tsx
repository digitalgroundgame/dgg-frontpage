import { BlogCardPreview } from "@/components/blog-card-preview";
import {
  formatDispatchDate,
  type WestRegionDispatchEntry,
} from "@/lib/west-region-dispatch";
import Link from "next/link";

const DISPATCH_BASE_HREF = "/regions/west/dispatch";

function dispatchPreviewProps(entry: WestRegionDispatchEntry) {
  return {
    title: entry.title,
    date: entry.date,
    formattedDate: formatDispatchDate(entry.date),
    slug: entry.slug,
    authorName: entry.author?.name ?? entry.authorSlug,
    readMoreHref: `${DISPATCH_BASE_HREF}/${entry.slug}`,
  };
}

type WestRegionDispatchPreviewGridProps = {
  title: string;
  entries: WestRegionDispatchEntry[];
  showViewAllLink?: boolean;
};

export function WestRegionDispatchPreviewGrid({
  title,
  entries,
  showViewAllLink = false,
}: WestRegionDispatchPreviewGridProps) {
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
            {...dispatchPreviewProps(entry)}
          />
        ))}
      </div>
      {showViewAllLink ? (
        <div className="mt-12">
          <Link
            className="type-button inline-flex bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-accent-red"
            href={DISPATCH_BASE_HREF}
          >
            View all dispatches
          </Link>
        </div>
      ) : null}
    </div>
  );
}

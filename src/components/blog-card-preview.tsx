import Link from "next/link";
import { PixelIcon } from "@/components/pixel-icon";

type BlogCardPreviewProps = {
  title: string;
  date: string;
  formattedDate: string;
  slug: string;
  readMoreHref: string;
  authorName?: string;
};

export function BlogCardPreview({
  title,
  date,
  formattedDate,
  readMoreHref,
  authorName,
}: BlogCardPreviewProps) {
  return (
    <article className="group relative h-full">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-2 bg-brand-blue transition-transform duration-200 group-hover:translate-x-3 group-hover:translate-y-3"
      />
      <Link
        aria-label={`Read dispatch: ${title}`}
        className="relative flex h-full flex-col bg-charcoal p-6 text-near-white-blue transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        href={readMoreHref}
      >
        <time className="type-label text-near-white-blue/80" dateTime={date}>
          {formattedDate}
        </time>
        <PixelIcon
          aria-hidden="true"
          className="absolute right-3 top-3 text-near-white-blue"
          name="content-files-open-book"
        />
        <h2 className="mt-3 flex-1 text-2xl font-black leading-tight">
          {title}
        </h2>
        {authorName ? (
          <p className="type-label mt-2">{authorName}</p>
        ) : null}
      </Link>
    </article>
  );
}

import { AuthorAvatar } from "@/components/widgets/author-avatar";
import { BlogMarkdown } from "@/components/page-blocks/blog-markdown";
import { LocalDate } from "@/components/widgets/local-date";
import type { Author } from "@/lib/authors";
import Image from "next/image";

type ArticleProps = {
  dateTime: string;
  formattedDate: string;
  title: string;
  heroPhoto?: string;
  heroFilter?: boolean;
  heroTextDark?: boolean;
  authorSlugs?: string[];
  authors?: Author[];
  body: string;
  headingLevel?: "h1" | "h2";
};

export function Article({
  dateTime,
  formattedDate,
  title,
  heroPhoto,
  heroFilter = false,
  heroTextDark = false,
  authorSlugs = [],
  authors = [],
  body,
  headingLevel = "h2",
}: ArticleProps) {
  const TitleTag = headingLevel;
  const fallbackAuthorNames = authorSlugs.join(", ");
  const authorName =
    authors.length > 0
      ? authors.map((displayAuthor) => displayAuthor.name).join(", ")
      : fallbackAuthorNames;
  const authorTitle =
    authors.length === 1
      ? (authors[0].orgTitle ?? authors[0].bio ?? "")
      : "";
  const photoAuthors = authors.filter((author) => author.picture);
  const shouldShowSingleAvatar = authors.length <= 1 && Boolean(authorName);
  const shouldShowPhotoAuthors = authors.length > 1 && photoAuthors.length > 0;
  const shouldShowFallbackAvatar =
    authors.length > 1 && photoAuthors.length === 0 && Boolean(authorName);
  const heroTextClassName = heroTextDark
    ? "text-charcoal"
    : "text-near-white-blue";
  const heroDateClassName = heroTextDark
    ? "text-light-charcoal"
    : "text-near-white-blue/85";

  return (
    <article className="text-charcoal">
      <header>
        {heroPhoto ? (
          <div className="relative -mx-8 aspect-[1200/630] overflow-hidden bg-charcoal sm:-mx-12 md:mx-0">
            <Image
              alt=""
              className="object-cover"
              fill
              priority={headingLevel === "h1"}
              sizes="(min-width: 768px) 48rem, 100vw"
              src={heroPhoto}
            />
            {heroFilter ? (
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/55 to-transparent" />
            ) : null}
            <div
              className={`absolute inset-x-0 bottom-0 p-5 sm:p-6 ${heroTextClassName}`}
            >
              <LocalDate
                className={`type-label ${heroDateClassName}`}
                dateTime={dateTime}
                fallback={formattedDate}
              />
              <TitleTag className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                {title}
              </TitleTag>
            </div>
          </div>
        ) : (
          <div>
            <LocalDate
              className="type-label text-light-charcoal"
              dateTime={dateTime}
              fallback={formattedDate}
            />
            <TitleTag className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              {title}
            </TitleTag>
          </div>
        )}

        <div className="relative mt-5">
          <div className="relative flex items-center gap-4 bg-near-white-blue text-charcoal">
            {shouldShowSingleAvatar ? (
              <AuthorAvatar name={authorName} picture={authors[0]?.picture} />
            ) : null}
            {shouldShowPhotoAuthors ? (
              <div className="flex shrink-0 -space-x-3">
                {photoAuthors.map((author) => (
                  <div
                    className="rounded-full ring-2 ring-near-white-blue"
                    key={author.slug}
                  >
                    <AuthorAvatar name={author.name} picture={author.picture} />
                  </div>
                ))}
              </div>
            ) : null}
            {shouldShowFallbackAvatar ? (
              <AuthorAvatar name={authorName} />
            ) : null}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {authorName ? (
                <p className="type-label shrink-0">{authorName}</p>
              ) : null}
              {authorTitle ? (
                <p className="type-small-body text-light-charcoal">
                  {authorTitle}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="mt-20">
        {body ? <BlogMarkdown>{body}</BlogMarkdown> : null}
      </div>
    </article>
  );
}

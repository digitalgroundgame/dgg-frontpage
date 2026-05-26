import { AuthorAvatar } from "@/components/author-avatar";
import { BlogMarkdown } from "@/components/blog-markdown";
import type { DispatchAuthor } from "@/lib/call-to-action-dispatch";
import Image from "next/image";

type DispatchArticleProps = {
  dateTime: string;
  formattedDate: string;
  title: string;
  heroPhoto?: string;
  heroFilter?: boolean;
  authorSlug: string;
  author?: DispatchAuthor;
  body: string;
  headingLevel?: "h1" | "h2";
};

export function DispatchArticle({
  dateTime,
  formattedDate,
  title,
  heroPhoto,
  heroFilter = false,
  authorSlug,
  author,
  body,
  headingLevel = "h2",
}: DispatchArticleProps) {
  const TitleTag = headingLevel;
  const authorName = author?.name ?? authorSlug;
  const authorTitle = author?.orgTitle ?? author?.bio ?? "";

  return (
    <article className="text-charcoal">
      <header>
        {heroPhoto ? (
          <div className="relative aspect-[1200/630] overflow-hidden bg-charcoal">
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
            ) : (
              <div className="absolute inset-0 bg-black/45" />
            )}
            <div className="absolute inset-x-0 bottom-0 p-5 text-near-white-blue sm:p-6">
              <time
                className="type-label text-near-white-blue/85"
                dateTime={dateTime}
              >
                {formattedDate}
              </time>
              <TitleTag className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                {title}
              </TitleTag>
            </div>
          </div>
        ) : (
          <div>
            <time
              className="type-label text-light-charcoal"
              dateTime={dateTime}
            >
              {formattedDate}
            </time>
            <TitleTag className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              {title}
            </TitleTag>
          </div>
        )}

        <div className="relative mt-5">
          <div className="relative flex items-center gap-4 bg-near-white-blue text-charcoal">
            <AuthorAvatar name={authorName} picture={author?.picture} />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="type-label shrink-0">{authorName}</p>
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

import { AuthorAvatar } from "@/components/author-avatar";
import { BlogMarkdown } from "@/components/blog-markdown";
import type { DispatchAuthor } from "@/lib/call-to-action-dispatch";

type DispatchArticleProps = {
  dateTime: string;
  formattedDate: string;
  title: string;
  authorSlug: string;
  author?: DispatchAuthor;
  body: string;
  headingLevel?: "h1" | "h2";
};

export function DispatchArticle({
  dateTime,
  formattedDate,
  title,
  authorSlug,
  author,
  body,
  headingLevel = "h2",
}: DispatchArticleProps) {
  const TitleTag = headingLevel;
  const authorName = author?.name ?? authorSlug;

  return (
    <article className="text-charcoal">
      <header>
        <div>
          <time className="type-label text-light-charcoal" dateTime={dateTime}>
            {formattedDate}
          </time>
          <TitleTag className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            {title}
          </TitleTag>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-charcoal md:flex-nowrap">
          <AuthorAvatar name={authorName} picture={author?.picture} />
          <div>
            <p className="type-label shrink-0">{authorName}</p>
            {author?.bio ? (
              <p className="type-small-body">{author.bio}</p>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mt-8">
        {body ? <BlogMarkdown>{body}</BlogMarkdown> : null}
      </div>
    </article>
  );
}

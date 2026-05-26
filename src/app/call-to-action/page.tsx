import { BlogMarkdown } from "@/components/blog-markdown";
import { DispatchPreviewGrid } from "@/components/dispatch-preview-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatDispatchDate,
  getCallToActionDispatchEntries,
  type CallToActionDispatchEntry,
} from "@/lib/call-to-action-dispatch";
import Link from "next/link";

const DISPATCH_LIST_HREF = "/call-to-action/dispatch";

function DispatchArticle({ entry }: { entry: CallToActionDispatchEntry }) {
  return (
    <article className="text-charcoal">
      <header>
        <div>
          <time
            className="type-label text-light-charcoal"
            dateTime={entry.date}
          >
            {formatDispatchDate(entry.date)}
          </time>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            {entry.title}
          </h2>
        </div>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-charcoal md:flex-nowrap">
          <p className="type-label shrink-0">
            {entry.author?.name ?? entry.authorSlug}
          </p>
          {entry.author?.bio ? (
            <p className="type-small-body">{entry.author.bio}</p>
          ) : null}
        </div>
      </header>

      <div className="mt-8">
        {entry.body ? <BlogMarkdown>{entry.body}</BlogMarkdown> : null}
      </div>
    </article>
  );
}

export default function CallToActionPage() {
  const dispatchEntries = getCallToActionDispatchEntries();
  const latestDispatch = dispatchEntries[0];
  const olderDispatches = dispatchEntries.slice(1, 4);

  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />
      <section
        className="px-8 pt-8 pb-16 sm:px-12"
        id="call-to-action-dispatch"
      >
        <div className="mx-auto w-full max-w-3xl">
          <div className="grid gap-4">
            <div>
              <h2 className="type-kicker text-light-charcoal">
                <Link
                  className="transition hover:text-brand-blue"
                  href={DISPATCH_LIST_HREF}
                >
                  Call to Action Dispatch
                </Link>
              </h2>
            </div>
            <p className="type-body">
              A running blog for weekly CTAs, serverwide news, and ways to get
              involved.
            </p>
          </div>

          {latestDispatch ? (
            <div className="mt-10">
              <DispatchArticle entry={latestDispatch} />
            </div>
          ) : (
            <div className="mt-10 bg-charcoal p-6 text-near-white-blue">
              <p className="type-body">
                Call to Action Dispatch entries will appear here once they are
                published in the CMS.
              </p>
            </div>
          )}
        </div>

        {olderDispatches.length > 0 ? (
          <div className="mt-16">
            <DispatchPreviewGrid
              baseHref={DISPATCH_LIST_HREF}
              entries={olderDispatches}
              formatDate={formatDispatchDate}
              showViewAllLink={dispatchEntries.length > 1}
              title="Previous dispatches"
            />
          </div>
        ) : null}
      </section>

      <SiteFooter />
    </main>
  );
}

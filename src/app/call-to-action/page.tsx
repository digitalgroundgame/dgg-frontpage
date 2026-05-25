import { BlogMarkdown } from "@/components/blog-markdown";
import { DispatchPreviewGrid } from "@/components/dispatch-preview-grid";
import { PixelIcon } from "@/components/pixel-icon";
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
      <header className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(14rem,18rem)] md:items-start">
        <div>
          <time className="type-label text-light-charcoal" dateTime={entry.date}>
            {formatDispatchDate(entry.date)}
          </time>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            {entry.title}
          </h2>
        </div>

        <div className="text-charcoal">
          <p className="type-label">
            {entry.author?.name ?? entry.authorSlug}
          </p>
          {entry.author?.bio ? (
            <p className="type-small-body mt-2">{entry.author.bio}</p>
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

      <section className="bg-near-white-blue text-charcoal">
        <div className="mx-auto w-full max-w-7xl py-10 lg:py-14">
          <div className="mx-auto max-w-4xl px-8 text-center sm:px-12">
            <h1 className="type-hero">Call to Action</h1>
            <p className="type-body mx-auto mt-6 max-w-2xl text-light-charcoal">
              Weekly actions and practical ways to participate in Digital
              Ground Game.
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 pb-20 sm:px-12">
        <div className="mx-auto flex w-full max-w-4xl justify-center">
          <a
            className="type-button flex w-full max-w-xs items-center justify-center gap-2 bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-accent-red"
            href="https://discord.gg/digitalgroundgame"
            rel="noopener noreferrer"
            target="_blank"
          >
            <PixelIcon className="h-5 w-5 shrink-0" name="hierarchy" />
            Join on Discord
          </a>
        </div>
      </section>

      <section className="px-8 pt-8 pb-16 sm:px-12" id="call-to-action-dispatch">
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
            <p className="type-body max-w-2xl">
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

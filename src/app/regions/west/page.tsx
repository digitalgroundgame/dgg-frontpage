import { BlogMarkdown } from "@/components/blog-markdown";
import { PixelIcon } from "@/components/pixel-icon";
import { WestRegionDispatchPreviewGrid } from "@/components/west-region-dispatch-preview-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WestRegionMap } from "@/components/west-region-map";
import {
  formatDispatchDate,
  getWestRegionDispatchEntries,
  type WestRegionDispatchEntry,
} from "@/lib/west-region-dispatch";
import Link from "next/link";

const DISPATCH_LIST_HREF = "/regions/west/dispatch";

function DispatchArticle({ entry }: { entry: WestRegionDispatchEntry }) {
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

export default function WestRegionPage() {
  const dispatchEntries = getWestRegionDispatchEntries();
  const latestDispatch = dispatchEntries[0];
  const olderDispatches = dispatchEntries.slice(1, 4);

  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <WestRegionMap />

      <section className="px-8 pb-20 sm:px-12">
        <div className="mx-auto flex w-full max-w-4xl justify-center">
          <a
            className="type-button flex w-full max-w-xs items-center justify-center gap-2 bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-accent-red"
            href="mailto:west-squad@digitalgroundgame.org"
          >
            <PixelIcon
              className="h-5 w-5 shrink-0"
              name="email-envelope-close"
            />
            West Squad Email
          </a>
        </div>
      </section>

      <section className="px-8 pt-8 pb-16 sm:px-12" id="west-region-dispatch">
        <div className="mx-auto w-full max-w-3xl">
          <div className="grid gap-4">
            <div>
              <h1 className="type-kicker text-light-charcoal">
                <Link
                  className="transition hover:text-brand-blue"
                  href={DISPATCH_LIST_HREF}
                >
                  West Region Dispatch
                </Link>
              </h1>
            </div>
            <p className="type-body max-w-2xl">
              A running blog for regional updates and practical ways to get
              involved.
            </p>
          </div>

          {latestDispatch ? (
            <>
              <div className="mt-10">
                <DispatchArticle entry={latestDispatch} />
              </div>
            </>
          ) : (
            <div className="mt-10 bg-charcoal p-6 text-near-white-blue">
              <p className="type-body">
                West Region Dispatch entries will appear here once they are
                published in the CMS.
              </p>
            </div>
          )}
        </div>

        {olderDispatches.length > 0 ? (
          <div className="mt-16">
            <WestRegionDispatchPreviewGrid
              entries={olderDispatches}
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

import { DispatchArticle } from "@/components/dispatch-article";
import { PixelIcon } from "@/components/pixel-icon";
import { DispatchPreviewGrid } from "@/components/dispatch-preview-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WestRegionMap } from "@/components/west-region-map";
import {
  formatDispatchDate,
  getWestRegionDispatchEntries,
} from "@/lib/west-region-dispatch";
import Link from "next/link";

const DISPATCH_LIST_HREF = "/regions/west/dispatch";

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
            <div className="mt-10">
              <DispatchArticle
                author={latestDispatch.author}
                authorSlug={latestDispatch.authorSlug}
                body={latestDispatch.body}
                dateTime={latestDispatch.date}
                formattedDate={formatDispatchDate(latestDispatch.date)}
                title={latestDispatch.title}
              />
            </div>
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

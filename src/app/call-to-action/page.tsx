import { Article } from "@/components/page-blocks/article";
import { DispatchPreviewGrid } from "@/components/page-blocks/dispatch-preview-grid";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import {
  formatDispatchDate,
  getCallToActionDispatchEntries,
} from "@/lib/call-to-action-dispatch";
import { getPostImageMetadata } from "@/lib/post-metadata";
import type { Metadata } from "next";

const DISPATCH_LIST_HREF = "/call-to-action/all";
const CTA_BASE_HREF = "/call-to-action";

export function generateMetadata(): Metadata {
  const latestDispatch = getCallToActionDispatchEntries()[0];
  const latestDispatchTitle = latestDispatch && `CTA: ${latestDispatch.title}`;
  const latestDispatchMetadata =
    latestDispatch && latestDispatchTitle
      ? getPostImageMetadata(latestDispatch.heroPhoto, latestDispatchTitle)
      : {};

  return {
    title: latestDispatchTitle ?? "Call to Action | Digital Ground Game",
    description: "Weekly Digital Ground Game calls to action and ways to get involved.",
    ...latestDispatchMetadata,
    ...(latestDispatch
      ? {
          openGraph: {
            ...latestDispatchMetadata.openGraph,
            title: latestDispatchTitle,
          },
          twitter: {
            ...latestDispatchMetadata.twitter,
            title: latestDispatchTitle,
          },
        }
      : {}),
  };
}

export default function CallToActionPage() {
  const dispatchEntries = getCallToActionDispatchEntries();
  const latestDispatch = dispatchEntries[0];
  const olderDispatches = dispatchEntries.slice(1, 4);

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />
      <section
        className="px-8 pt-8 pb-16 sm:px-12 lg:px-20"
        id="call-to-action-dispatch"
      >
        <div className="mx-auto w-full max-w-3xl">
          <div className="grid gap-4">
            <div>
              <h2 className="type-kicker text-light-charcoal">
                <span className="inline-flex items-center gap-1.5">
                  Call to Action
                  <PixelIcon
                    className="h-16 w-16 shrink-0"
                    name="interface-essential-speaker-announce"
                  />
                </span>
              </h2>
            </div>
            <p className="type-body">
              A running blog for weekly CTAs, and ways to get involved.
            </p>
          </div>

          {latestDispatch ? (
            <div className="mt-10">
              <Article
                authors={latestDispatch.authors}
                authorSlugs={latestDispatch.authorSlugs}
                body={latestDispatch.body}
                dateTime={latestDispatch.date}
                formattedDate={formatDispatchDate(latestDispatch.date)}
                heroFilter={latestDispatch.heroFilter}
                heroPhoto={latestDispatch.heroPhoto}
                title={latestDispatch.title}
              />
            </div>
          ) : (
            <div className="mt-10 bg-charcoal p-6 text-near-white-blue">
              <p className="type-body">
                Call to Action entries will appear here once they are published
                in the CMS.
              </p>
            </div>
          )}
        </div>

        {olderDispatches.length > 0 ? (
          <div className="mt-16">
            <DispatchPreviewGrid
              baseHref={CTA_BASE_HREF}
              entries={olderDispatches}
              formatDate={formatDispatchDate}
              showViewAllLink={dispatchEntries.length > 1}
              title="Previous CTAs"
              viewAllLabel="View all CTAs"
              viewAllHref={DISPATCH_LIST_HREF}
            />
          </div>
        ) : null}
      </section>

      <SiteFooter />
    </main>
  );
}

import { Article } from "@/components/page-blocks/article";
import { DispatchPreviewGrid } from "@/components/page-blocks/dispatch-preview-grid";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { RegionMap } from "@/components/regions/region-map";
import { PeopleGrid } from "@/components/regions/people-grid";
import { PhotoList } from "@/components/regions/photo-list";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import { getRegionPeople, getRegionPhotos } from "@/lib/region-content";
import type { RegionConfig } from "@/lib/regions";
import {
  formatDispatchDate,
  getRegionDispatchEntries,
} from "@/lib/region-dispatch";
import Link from "next/link";

type RegionPageProps = {
  region: RegionConfig;
};

export function RegionPage({ region }: RegionPageProps) {
  const dispatchEntries = region.contentCollection
    ? getRegionDispatchEntries(region.contentCollection)
    : [];
  const latestDispatch = dispatchEntries[0];
  const olderDispatches = dispatchEntries.slice(1, 4);
  const dispatchListHref = `/regions/${region.slug}/dispatch`;
  const people = getRegionPeople(region.slug);
  const photos = getRegionPhotos(region.slug);

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <RegionMap
        stateIds={region.stateIds}
        tagline={region.tagline}
        title={`${region.name} Region`}
      />

      <section className="px-8 pb-20 sm:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-4xl justify-center">
          <a
            className="type-button flex w-full max-w-md items-center justify-center gap-2 bg-brand-blue px-5 py-3 text-center text-near-white-blue transition hover:bg-accent-red sm:w-auto sm:min-w-xs sm:max-w-full"
            href={`mailto:${region.email}`}
          >
            <PixelIcon
              className="h-5 w-5 shrink-0"
              name="email-envelope-close"
            />
            {region.emailLabel}
          </a>
        </div>
      </section>

      <PeopleGrid people={people} />

      {region.contentCollection &&
      region.dispatchName &&
      region.dispatchDescription ? (
        <section
          className="px-8 pt-8 pb-16 sm:px-12 lg:px-20"
          id={`${region.slug}-dispatch`}
        >
          <div className="mx-auto w-full max-w-3xl">
            <div className="grid gap-4">
              <div>
                <h1 className="type-kicker text-light-charcoal">
                  <Link
                    className="transition hover:text-brand-blue"
                    href={dispatchListHref}
                  >
                    {region.dispatchName}
                  </Link>
                </h1>
              </div>
              <p className="type-body max-w-2xl">
                {region.dispatchDescription}
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
                  {region.dispatchName} entries will appear here once they are
                  published in the CMS.
                </p>
              </div>
            )}
          </div>

          {olderDispatches.length > 0 ? (
            <div className="mt-16">
              <DispatchPreviewGrid
                baseHref={dispatchListHref}
                entries={olderDispatches}
                formatDate={formatDispatchDate}
                showViewAllLink={dispatchEntries.length > 1}
                title="Previous dispatches"
              />
            </div>
          ) : null}
        </section>
      ) : null}

      <PhotoList photos={photos} regionName={region.name} />

      <SiteFooter />
    </main>
  );
}

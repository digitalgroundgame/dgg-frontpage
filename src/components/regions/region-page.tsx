import { Article } from "@/components/page-blocks/article";
import { ButtonLink } from "@/components/widgets/button-link";
import { DispatchPreviewGrid } from "@/components/page-blocks/dispatch-preview-grid";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { RegionMap } from "@/components/regions/region-map";
import { PeopleGrid } from "@/components/regions/people-grid";
import { PhotoList } from "@/components/regions/photo-list";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import { getRegionContent } from "@/lib/region-content";
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
  const { instagramLink, people, photos } = getRegionContent(region.slug);

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <RegionMap
        stateIds={region.stateIds}
        tagline={region.tagline}
        title={`${region.name} Region`}
      />

      <section className="px-8 pb-20 sm:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-4">
          <ButtonLink
            className="flex w-full max-w-md justify-center text-center sm:w-auto sm:min-w-xs sm:max-w-full"
            href={`mailto:${region.email}`}
            primaryHover="blue-black"
          >
            <PixelIcon
              className="h-5 w-5 shrink-0"
              name="email-envelope-close"
            />
            {region.emailLabel}
          </ButtonLink>
          {instagramLink ? (
            <ButtonLink
              className="flex w-full max-w-md justify-center text-center sm:w-auto sm:min-w-xs sm:max-w-full"
              href={instagramLink.href}
              primaryHover="black-blue"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PixelIcon
                className="h-5 w-5 shrink-0"
                name="logo-social-media-instagram"
              />
              {region.name} Insta
            </ButtonLink>
          ) : null}
        </div>
      </section>

      <PeopleGrid people={people} />

      {region.contentCollection &&
      region.dispatchName &&
      region.dispatchDescription &&
      latestDispatch ? (
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

            <div className="mt-10">
              <Article
                authors={latestDispatch.authors}
                authorSlugs={latestDispatch.authorSlugs}
                body={latestDispatch.body}
                dateTime={latestDispatch.date}
                formattedDate={formatDispatchDate(latestDispatch.date)}
                heroPhoto={latestDispatch.heroPhoto}
                title={latestDispatch.title}
              />
            </div>
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

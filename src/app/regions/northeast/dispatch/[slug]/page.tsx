import { RegionDispatchEntryPage } from "@/components/regions/region-dispatch-entry-page";
import {
  getRegionDispatchEntries,
  getRegionDispatchEntryBySlug,
} from "@/lib/region-dispatch";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getRegionDispatchEntries(regions.northeast.contentCollection).map(
    (entry) => ({
      slug: entry.slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getRegionDispatchEntryBySlug(
    regions.northeast.contentCollection,
    slug,
  );

  if (!entry) {
    return { title: "Dispatch not found | Digital Ground Game" };
  }

  return {
    title: `${entry.title} | ${regions.northeast.dispatchName}`,
    description: `${regions.northeast.dispatchName} update: ${entry.title}.`,
  };
}

export default async function NortheastNewsPage({ params }: PageProps) {
  const { slug } = await params;

  return <RegionDispatchEntryPage region={regions.northeast} slug={slug} />;
}

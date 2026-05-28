import { RegionDispatchEntryPage } from "@/components/regions/region-dispatch-entry-page";
import {
  getRegionDispatchEntries,
  getRegionDispatchEntryBySlug,
} from "@/lib/region-dispatch";
import { getPostImageMetadata } from "@/lib/post-metadata";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getRegionDispatchEntries(regions.west.contentCollection).map(
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
    regions.west.contentCollection,
    slug,
  );

  if (!entry) {
    return { title: "Dispatch not found | Digital Ground Game" };
  }

  return {
    title: `${entry.title} | ${regions.west.dispatchName}`,
    description: `${regions.west.dispatchName} update: ${entry.title}.`,
    ...getPostImageMetadata(entry.heroPhoto, entry.title),
  };
}

export default async function WestRegionDispatchPage({ params }: PageProps) {
  const { slug } = await params;

  return <RegionDispatchEntryPage region={regions.west} slug={slug} />;
}

import { RegionPage } from "@/components/regions/region-page";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Northeast Region | Digital Ground Game",
};

export default function NortheastRegionPage() {
  return <RegionPage region={regions.northeast} />;
}

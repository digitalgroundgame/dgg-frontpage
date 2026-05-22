import { RegionPage } from "@/components/regions/region-page";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "West Region | Digital Ground Game",
};

export default function WestRegionPage() {
  return <RegionPage region={regions.west} />;
}

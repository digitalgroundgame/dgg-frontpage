import { RegionPage } from "@/components/region-page";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "South Region | Digital Ground Game",
};

export default function SouthRegionPage() {
  return <RegionPage region={regions.south} />;
}

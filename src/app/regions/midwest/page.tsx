import { RegionPage } from "@/components/region-page";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midwest Region | Digital Ground Game",
};

export default function MidwestRegionPage() {
  return <RegionPage region={regions.midwest} />;
}

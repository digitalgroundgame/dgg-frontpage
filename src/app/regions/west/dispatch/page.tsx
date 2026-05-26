import { RegionDispatchListPage } from "@/components/region-dispatch-list-page";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "West Region Dispatch | Digital Ground Game",
  description:
    "All West Region Dispatch posts - regional updates and practical ways to get involved.",
};

export default function WestRegionDispatchListPage() {
  return <RegionDispatchListPage region={regions.west} />;
}

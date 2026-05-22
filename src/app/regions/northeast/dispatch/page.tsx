import { RegionDispatchListPage } from "@/components/regions/region-dispatch-list-page";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Northeast News | Digital Ground Game",
  description:
    "All Northeast News posts - regional updates and practical ways to get involved.",
};

export default function NortheastNewsListPage() {
  return <RegionDispatchListPage region={regions.northeast} />;
}

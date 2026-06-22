import { RegionDispatchListPage } from "@/components/regions/region-dispatch-list-page";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midwest News | Digital Ground Game",
  description:
    "All Midwest News posts - regional updates and practical ways to get involved.",
};

export default function MidwestNewsListPage() {
  return <RegionDispatchListPage region={regions.midwest} />;
}

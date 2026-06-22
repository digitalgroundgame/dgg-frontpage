import { RegionDispatchListPage } from "@/components/regions/region-dispatch-list-page";
import { regions } from "@/lib/regions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "South News | Digital Ground Game",
  description:
    "All South News posts - regional updates and practical ways to get involved.",
};

export default function SouthNewsListPage() {
  return <RegionDispatchListPage region={regions.south} />;
}

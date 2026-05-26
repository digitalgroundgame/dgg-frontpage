import {
  formatDispatchDate,
  getRegionDispatchEntries,
  getRegionDispatchEntryBySlug,
  type DispatchAuthor,
  type RegionDispatchEntry,
} from "@/lib/region-dispatch";
import { regions } from "@/lib/regions";

export type { DispatchAuthor };
export type WestRegionDispatchEntry = RegionDispatchEntry;

export function getWestRegionDispatchEntries(): RegionDispatchEntry[] {
  return getRegionDispatchEntries(regions.west.contentCollection);
}

export function getWestRegionDispatchEntryBySlug(
  slug: string,
): RegionDispatchEntry | undefined {
  return getRegionDispatchEntryBySlug(regions.west.contentCollection, slug);
}

export { formatDispatchDate };

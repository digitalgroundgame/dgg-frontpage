import type { Author } from "@/lib/authors";
import {
  formatDispatchDate,
  getRegionDispatchEntries,
  getRegionDispatchEntryBySlug,
  type RegionDispatchEntry,
} from "@/lib/region-dispatch";
import { regions } from "@/lib/regions";

export type { Author };
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

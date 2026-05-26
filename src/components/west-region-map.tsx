import { RegionMap } from "@/components/region-map";
import { regions } from "@/lib/regions";

export function WestRegionMap() {
  return (
    <RegionMap
      stateIds={regions.west.stateIds}
      title={`${regions.west.name} Region`}
    />
  );
}

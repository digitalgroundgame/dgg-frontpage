import { PixelIcon } from "@/components/pixel-icon";
import { geoAlbersUsa, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import usAtlas from "us-atlas/states-10m.json";

const stateNamesById: Record<string, string> = {
  "01": "Alabama",
  "02": "Alaska",
  "04": "Arizona",
  "05": "Arkansas",
  "06": "California",
  "08": "Colorado",
  "09": "Connecticut",
  "10": "Delaware",
  "11": "District of Columbia",
  "12": "Florida",
  "13": "Georgia",
  "15": "Hawaii",
  "16": "Idaho",
  "17": "Illinois",
  "18": "Indiana",
  "19": "Iowa",
  "20": "Kansas",
  "21": "Kentucky",
  "22": "Louisiana",
  "23": "Maine",
  "24": "Maryland",
  "25": "Massachusetts",
  "26": "Michigan",
  "27": "Minnesota",
  "28": "Mississippi",
  "29": "Missouri",
  "30": "Montana",
  "31": "Nebraska",
  "32": "Nevada",
  "33": "New Hampshire",
  "34": "New Jersey",
  "35": "New Mexico",
  "36": "New York",
  "37": "North Carolina",
  "38": "North Dakota",
  "39": "Ohio",
  "40": "Oklahoma",
  "41": "Oregon",
  "42": "Pennsylvania",
  "44": "Rhode Island",
  "45": "South Carolina",
  "46": "South Dakota",
  "47": "Tennessee",
  "48": "Texas",
  "49": "Utah",
  "50": "Vermont",
  "51": "Virginia",
  "53": "Washington",
  "54": "West Virginia",
  "55": "Wisconsin",
  "56": "Wyoming",
};

type StateFeature = Feature<Geometry, { name?: string }> & {
  id?: string | number;
};

type RegionMapProps = {
  title: string;
  tagline?: string;
  stateIds: string[];
};

function getStateId(state: StateFeature): string {
  return String(state.id ?? "").padStart(2, "0");
}

function buildMapStates() {
  const topology = usAtlas as unknown as Topology<{
    states: { type: "GeometryCollection"; geometries: [] };
  }>;
  const stateCollection = feature(topology, topology.objects.states);
  const projection = geoAlbersUsa().fitSize(
    [960, 560],
    stateCollection as FeatureCollection<Geometry>,
  );
  const path = geoPath(projection);

  return (stateCollection as { features: StateFeature[] }).features.map(
    (state) => {
      const id = getStateId(state);

      return {
        id,
        name: stateNamesById[id] ?? state.properties?.name ?? id,
        path: path(state) ?? "",
      };
    },
  );
}

const mapStates = buildMapStates();

function StateRow({
  className = "",
  states,
}: {
  className?: string;
  states: { id: string; name: string }[];
}) {
  return (
    <ul
      className={[
        "mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-0 px-4 text-center sm:gap-x-5 sm:gap-y-0.5 sm:px-12 md:gap-x-6",
        className,
      ].join(" ")}
    >
      {states.map((state) => (
        <li
          className="font-sans text-xl font-black uppercase tracking-[0.04em] text-charcoal px-1 py-0 max-[27rem]:text-xs max-[27rem]:tracking-[0.02em] max-[27rem]:px-0.5"
          key={state.id}
        >
          {state.name}
        </li>
      ))}
    </ul>
  );
}

export function RegionMap({ title, tagline, stateIds }: RegionMapProps) {
  const highlightedIds = new Set(stateIds);
  const highlightedStates = stateIds.map((id) => ({
    id,
    name: stateNamesById[id] ?? id,
  }));

  return (
    <section className="bg-near-white-blue text-charcoal">
      <div className="mx-auto w-full max-w-7xl py-10 lg:py-14">
        <div className="mx-auto max-w-4xl px-8 text-center sm:px-12">
          <h1 className="type-hero inline-flex items-center justify-center gap-3">
            <PixelIcon className="h-16 w-16 shrink-0" name="navigation-compass" />
            {title}
          </h1>
        </div>

        {tagline ? (
          <p className="type-body mx-auto mt-8 max-w-3xl px-8 text-center text-light-charcoal sm:px-12">
            {tagline}
          </p>
        ) : null}

        <div className="overflow-x-clip overflow-y-visible px-3 pb-10 pt-2 sm:-mt-6 sm:px-8">
          <div className="mx-auto max-w-5xl min-w-0 [perspective-origin:center_12%] [perspective:1400px]">
            <svg
              aria-label={`${title} states highlighted on a United States map`}
              className="block h-auto w-full overflow-visible [filter:drop-shadow(0_40px_40px_rgb(36_36_36_/_0.24))] [transform-origin:center_center] [transform:rotateX(45deg)]"
              role="img"
              viewBox="0 0 960 560"
            >
              <g>
                {mapStates.map((state) => (
                  <path
                    className={[
                      "stroke-near-white-blue",
                      highlightedIds.has(state.id)
                        ? "fill-brand-blue"
                        : "fill-light-charcoal/35",
                    ].join(" ")}
                    d={state.path}
                    key={state.id}
                    strokeWidth={1.2}
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>

        <StateRow className="-mt-8" states={highlightedStates} />
      </div>
    </section>
  );
}

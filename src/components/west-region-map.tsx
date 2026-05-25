"use client";

import { geoAlbersUsa, geoPath } from "d3-geo";
import { useMemo, useState } from "react";
import { feature } from "topojson-client";
import usAtlas from "us-atlas/states-10m.json";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Topology } from "topojson-specification";

const westStateNamesById: Record<string, string> = {
  "02": "Alaska",
  "04": "Arizona",
  "06": "California",
  "08": "Colorado",
  "15": "Hawaii",
  "16": "Idaho",
  "30": "Montana",
  "32": "Nevada",
  "35": "New Mexico",
  "41": "Oregon",
  "49": "Utah",
  "53": "Washington",
  "56": "Wyoming",
};

const westStates = Object.entries(westStateNamesById).map(([id, name]) => ({
  id,
  name,
}));

type StateFeature = Feature<Geometry, { name?: string }> & {
  id?: string | number;
};

function getStateId(state: StateFeature): string {
  return String(state.id ?? "").padStart(2, "0");
}

function StateRow({
  className = "",
  states,
  setActiveStateId,
}: {
  className?: string;
  states: typeof westStates;
  setActiveStateId: (stateId: string | null) => void;
}) {
  return (
    <ul
      className={[
        "mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-0 px-4 text-center sm:gap-x-5 sm:gap-y-0.5 sm:px-12 md:gap-x-6",
        className,
      ].join(" ")}
    >
      {states.map((state) => (
        <li key={state.id}>
          <button
            className="font-sans text-xl font-black uppercase tracking-[0.04em] text-charcoal px-1 py-0 max-[27rem]:text-xs max-[27rem]:tracking-[0.02em] max-[27rem]:px-0.5"
            onBlur={() => setActiveStateId(null)}
            onFocus={() => setActiveStateId(state.id)}
            onMouseEnter={() => setActiveStateId(state.id)}
            onMouseLeave={() => setActiveStateId(null)}
            type="button"
          >
            {state.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export function WestRegionMap() {
  const [activeStateId, setActiveStateId] = useState<string | null>(null);

  const states = useMemo(() => {
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
          name: westStateNamesById[id] ?? state.properties?.name ?? id,
          path: path(state) ?? "",
          isWest: id in westStateNamesById,
        };
      },
    );
  }, []);

  return (
    <section className="bg-near-white-blue text-charcoal">
      <div className="mx-auto w-full max-w-7xl py-10 lg:py-14">
        <div className="mx-auto max-w-4xl px-8 text-center sm:px-12">
          <h1 className="type-hero">West Region</h1>
        </div>

        <div className="overflow-x-clip overflow-y-visible px-3 pb-10 pt-2 sm:-mt-10 sm:px-8">
          <div className="mx-auto max-w-5xl min-w-0 [perspective-origin:center_12%] [perspective:1400px]">
            <svg
              aria-labelledby="west-region-map-title"
              className="block h-auto w-full overflow-visible [filter:drop-shadow(0_40px_40px_rgb(36_36_36_/_0.24))] [transform-origin:center_center] [transform:rotateX(45deg)] transition-transform duration-500 ease-out"
              role="img"
              viewBox="0 0 960 560"
            >
              <title id="west-region-map-title">
                West region states highlighted on a United States map
              </title>
              <g>
                {states.map((state) => {
                  const isActive = activeStateId === state.id;

                  return (
                    <a
                      aria-label={state.name}
                      href="#west-region-dispatch"
                      key={state.id}
                      onBlur={() => setActiveStateId(null)}
                      onFocus={() => setActiveStateId(state.id)}
                      onMouseEnter={() => setActiveStateId(state.id)}
                      onMouseLeave={() => setActiveStateId(null)}
                    >
                      <path
                        className={[
                          "stroke-near-white-blue transition-[fill,stroke-width,filter] duration-200",
                          state.isWest
                            ? isActive
                              ? "fill-accent-red [filter:brightness(1.12)]"
                              : "fill-brand-blue"
                            : "fill-light-charcoal/35",
                        ].join(" ")}
                        d={state.path}
                        strokeWidth={isActive ? 2.8 : 1.2}
                      />
                    </a>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>

        <StateRow
          className="-mt-8"
          setActiveStateId={setActiveStateId}
          states={westStates}
        />
      </div>
    </section>
  );
}

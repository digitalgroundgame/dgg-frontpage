import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import {
  doorSources,
  fieldOperations,
  midtermOutcomes,
  midtermReach,
  midtermResultGroups,
  statewideRaces,
  type MidtermResultGroup,
} from "@/lib/midterm-results";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 Midterms Results | Digital Ground Game",
  description:
    "125,253 doors knocked across 42 races in 20 states. Explore Digital Ground Game’s 2026 midterms organizing and results as of November 4, 2026.",
};

const formatNumber = (value: number) => value.toLocaleString("en-US");

function ResultsTable({ group }: { group: MidtermResultGroup }) {
  return (
    <article>
      <div className="flex flex-wrap items-end justify-between gap-3 bg-charcoal px-5 py-5 text-near-white-blue sm:px-6">
        <div>
          <h3 className="text-2xl font-black uppercase">{group.name}</h3>
          <p className="mt-1 text-sm !font-medium text-near-white-blue/80">{group.summary}</p>
        </div>
        <p className="text-2xl !font-black tabular-nums">
          {formatNumber(group.doors)} <span className="text-sm font-medium uppercase">doors</span>
        </p>
      </div>
      <div
        aria-label={`${group.name} race results`}
        className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-brand-blue"
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[40rem] text-left">
          <caption className="sr-only">{group.name}: race results as of November 4, 2026</caption>
          <thead className="bg-charcoal/10 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-5 py-3 sm:px-6" scope="col">Race</th>
              <th className="px-4 py-3" scope="col">Candidate</th>
              <th className="px-4 py-3" scope="col">Organizing</th>
              <th className="px-5 py-3 text-right sm:px-6" scope="col">Doors</th>
            </tr>
          </thead>
          <tbody>
            {group.races.map((race) => (
              <tr
                className={race.level === "state-local" ? "bg-charcoal/5" : "bg-brand-blue/5"}
                key={race.race}
              >
                <th className="px-5 py-4 align-top sm:px-6" scope="row">
                  <span className="block text-lg font-bold">{race.race}</span>
                  <span className="text-xs font-medium uppercase tracking-wide text-light-charcoal">
                    {race.level === "state-local" ? "State & local" : "Federal"}
                  </span>
                </th>
                <td className="px-4 py-4 align-top">
                  <span className="text-lg font-bold">{race.candidate}</span>
                  {race.leading ? (
                    <span className="ml-1 font-black text-brand-blue">
                      <span aria-hidden="true">*</span>
                      <span className="sr-only"> (leading, not yet called)</span>
                    </span>
                  ) : null}
                  <div className="mt-1 flex flex-wrap gap-1.5 text-xs font-bold uppercase">
                    {race.flip ? (
                      <span className="bg-brand-blue px-2 py-0.5 text-near-white-blue">Flip</span>
                    ) : null}
                    {race.leading ? (
                      <span className="bg-charcoal/10 px-2 py-0.5">Leading</span>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-light-charcoal">{race.organizing ?? "—"}</td>
                <td className="px-5 py-4 text-right align-top font-bold tabular-nums sm:px-6">
                  {race.doors ? formatNumber(race.doors) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export default function MidtermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-8 pb-16 pt-10 sm:px-12 lg:px-20 lg:pb-20 lg:pt-16">
        <div className="mx-auto w-full max-w-6xl">
          <p className="type-label text-brand-blue">2026 Midterms</p>
          <h1 className="type-hero mt-4 max-w-4xl uppercase">
            The Digital Ground Game <span className="text-brand-blue">Difference</span>
          </h1>
          <p className="type-body mt-6 max-w-2xl">
            From fellowship houses to regional squads, our volunteers knocked
            doors and helped candidates across the country.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-[2fr_1fr_1fr] sm:items-end sm:gap-8">
            {[
              { value: midtermReach.doors, label: "Doors knocked" },
              { value: midtermReach.races, label: "Races reached" },
              { value: midtermReach.states, label: "States" },
            ].map((stat, index) => (
              <div className="flex flex-col" key={stat.label}>
                <dt className="type-label order-2 mt-2">{stat.label}</dt>
                <dd className={`font-black leading-none tracking-tight text-brand-blue tabular-nums ${index === 0 ? "text-6xl md:text-7xl lg:text-8xl" : "text-5xl md:text-6xl lg:text-7xl"}`}>
                  {formatNumber(stat.value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-blue px-8 py-14 text-near-white-blue sm:px-12 lg:px-20">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/3 bg-dark-blue" />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="type-section-title">Races we helped in</h2>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
            {[
              { value: midtermOutcomes.wins, label: "Won" },
              { value: midtermOutcomes.leading, label: "Leading*" },
              { value: midtermOutcomes.flips, label: "Flips" },
              { value: midtermOutcomes.states, label: "States in results" },
            ].map((stat) => (
              <div className="flex flex-col" key={stat.label}>
                <dt className="type-label order-2 mt-2">{stat.label}</dt>
                <dd className="text-6xl font-black leading-none tabular-nums sm:text-7xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-8 py-16 sm:px-12 lg:px-20 lg:py-20">
        <figure aria-labelledby="door-sources-title" className="mx-auto w-full max-w-6xl">
          <figcaption>
            <h2 className="type-section-title" id="door-sources-title">Where the doors came from</h2>
            <p className="type-body mt-3">Two houses. Four events. Four regional squads.</p>
          </figcaption>
          <div aria-hidden="true" className="mt-8 flex h-8 w-full gap-1 sm:h-12">
            {doorSources.map((source) => (
              <div className={source.color} key={source.label} style={{ flexGrow: source.doors, flexBasis: 0 }} />
            ))}
          </div>
          <dl className="mt-6 grid gap-6 sm:grid-cols-3">
            {doorSources.map((source) => (
              <div key={source.label}>
                <dt className="flex items-center gap-2 text-xl font-bold">
                  <span aria-hidden="true" className={`h-3 w-3 shrink-0 ${source.color}`} />
                  {source.label}
                </dt>
                <dd className="mt-2">
                  <span className="text-4xl font-black tabular-nums">{formatNumber(source.doors)}</span>
                  <span className="ml-2 text-light-charcoal">doors · {source.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        </figure>
      </section>

      <section className="bg-charcoal/5 px-8 py-16 sm:px-12 lg:px-20 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div>
            <h2 className="type-section-title">Where we knocked doors</h2>
            <p className="type-body mt-4">
              A ground game spanning 20 states, with fellowship houses in Lansing
              and Toledo and canvass events in Detroit, Cleveland, San Antonio,
              and Phoenix.
            </p>
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {fieldOperations.map((operation) => (
                <li className="flex flex-wrap items-center justify-between gap-2 bg-near-white-blue p-4" key={operation.name}>
                  <div>
                    <h3 className="text-lg font-bold">{operation.name}</h3>
                    <p className="text-sm text-light-charcoal">{operation.race} · {operation.type}</p>
                  </div>
                  <span className="text-xl font-black text-brand-blue tabular-nums">
                    {formatNumber(operation.doors)} <span className="text-sm font-medium">doors</span>
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="type-label mt-8">Statewide races</h3>
            <ul className="mt-3 grid gap-2 text-lg md:grid-cols-2">
              {statewideRaces.map((race) => <li key={race}>{race}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-8 py-16 sm:px-12 lg:px-20 lg:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="type-section-title">The races behind the results</h2>
          <p className="type-body mt-4 max-w-3xl">
            Federal, state, and local races supported by our houses, events,
            and regional squads.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold">
            <span className="inline-flex items-center gap-2">
              <span className="bg-brand-blue px-2 py-0.5 text-xs uppercase text-near-white-blue">Flip</span>
              Taken from a Republican
            </span>
            <span><span className="text-brand-blue">*</span> Leading, not yet called</span>
          </div>
          <div className="mt-8 grid gap-10">
            {midtermResultGroups.map((group) => <ResultsTable group={group} key={group.name} />)}
          </div>
          <div className="mt-8 max-w-4xl space-y-3 text-light-charcoal">
            <p className="type-small-body">
              All results are unofficial and reflect November 4, 2026. Asterisks
              mark races that were leading but not yet called. Flip labels on
              those races are also provisional.
            </p>
            <p className="type-small-body">
              Senate rows count the house and event doors in that state; those
              same doors also appear under each House race. Do not add the race
              rows together. Squads counted doors by region, not by race. The
              Bucks County canvass (PA-1) is part of the Northeast squad total.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

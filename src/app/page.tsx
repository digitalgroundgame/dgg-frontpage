import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const gains = [
  "Real political impact",
  "Leadership development",
  "Evidence-based action",
];

const initiatives = [
  {
    value: "4",
    label: "Regional squads",
    description:
      "Organized teams across the West, South, Midwest, and Northeast regions of the US.",
  },
  {
    value: "6+",
    label: "Specialized teams",
    description:
      "Media Communication, Research, Software Development, and more driving our mission forward.",
  },
  {
    value: "100%",
    label: "Action-Oriented",
    description:
      "Every effort contributes to real, tangible results in defending democracy and advancing liberal values.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="mx-auto w-full max-w-6xl px-8 py-16 text-center sm:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="type-hero max-w-4xl">
            Vote Loud,{" "}
            <span className="relative inline-block">
              <span
                aria-hidden="true"
                className="absolute left-1.5 top-1.5 text-accent-red"
              >
                Lead
              </span>
              <span className="relative">Lead</span>
            </span>{" "}
            Louder
          </h1>
          <p className="type-subtitle mt-6">
            We are a national, community-driven movement dedicated to defending
            and advancing liberal democratic values through practical,
            evidence-based political action.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              className="bg-brand-blue px-5 py-3 text-lg font-bold text-near-white-blue transition hover:bg-accent-red"
              href="https://discord.gg/digitalgroundgame"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>

      <section className="bg-light-charcoal px-8 py-16 text-near-white-blue sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1fr_minmax(260px,0.35fr)] md:items-center">
          <div>
            <p className="type-kicker text-accent-red">2026 Canvassing</p>
            <h2 className="type-section-title mt-4 max-w-4xl">
              Register your interest in joining the program.
            </h2>
          </div>
          <a
            className="inline-flex justify-self-center bg-accent-red px-6 py-4 text-lg font-bold text-near-white-blue transition hover:bg-black"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdZmxO4SWAD0ARyjik9jFxJsh2ioHgIGKwRVkLSifv2RgFZQQ/viewform"
          >
            Interest Form
          </a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-blue px-8 py-16 text-near-white-blue sm:px-12">
        <div
          aria-hidden="true"
          className="absolute -bottom-2/3 -right-48 aspect-square h-[133%] min-h-[36rem] rounded-full bg-dark-blue"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8">
          <div>
            <p className="type-statement max-w-4xl">
              We are dedicated to free expression, equality under the law, and
              the power of markets to drive prosperity through practical,
              action-oriented organizing.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-8 py-20 sm:px-12 md:grid-cols-2">
        <div>
          <h2 className="type-section-title">
            Building Lasting Political Power
          </h2>
          <p className="type-body mt-5">
            We aim to build lasting political power, develop the next generation
            of leaders, and ensure that when today&apos;s leaders are gone, we
            are ready-and worthy-to inherit the responsibility of shaping the
            future.
          </p>
          <p className="type-body mt-5">
            Our long-term vision guides our actions and decisions, inspiring us
            to push towards a better future for all.
          </p>
        </div>
        <div>
          <h2 className="type-section-title">Explore our key initiatives</h2>
          <p className="type-body mt-5">
            From electoral engagement to research and policy development, we
            tackle initiatives that advance liberal democratic values and build
            real political power.
          </p>
          <a
            className="mt-6 inline-flex bg-brand-blue px-5 py-3 text-lg font-bold text-near-white-blue transition hover:bg-accent-red"
            href="/about-us"
          >
            Learn More
          </a>
        </div>
      </section>

      <section className="bg-dark-blue px-8 py-16 text-near-white-blue sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <h2 className="text-5xl font-black leading-tight">
              Organizing for Real
            </h2>
            <p className="mt-3 bg-accent-red px-5 py-4 text-5xl font-black leading-tight">
              Political Impact
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-black">
              Regional squads, National impact
            </h3>
            <p className="type-body mt-4">
              We organize members into regional &quot;squads&quot; that tackle
              political initiatives starting from the local level, building the
              foundation to strengthen national mobilization.
            </p>
            <p className="type-body mt-4">
              Whether it&apos;s showing up to events, mobilizing voters,
              creating educational resources, or leading projects, we&apos;re
              dedicated to finding pragmatic results that move us forward.
            </p>
            <a
              className="mt-6 inline-flex bg-near-white-blue px-5 py-3 text-lg font-bold text-brand-blue transition hover:bg-charcoal hover:text-near-white-blue"
              href="/contact-us"
            >
              Get in Contact
            </a>
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-8 py-16 text-near-white-blue sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-5 md:grid-cols-3">
          {initiatives.map((initiative) => (
            <article
              className="bg-near-white-blue p-5 text-charcoal"
              key={initiative.label}
            >
              <p className="text-5xl font-black text-accent-red">
                {initiative.value}
              </p>
              <h3 className="mt-4 text-xl font-black">{initiative.label}</h3>
              <p className="type-small-body mt-3">{initiative.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-8 py-20 text-center sm:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="type-section-title">
            Defending democracy, one action at a time.
          </h2>
          <p className="type-body mt-5">
            Join us in the fight for democracy, reason, and progress. The fight
            isn&apos;t over-it&apos;s ours to win.
          </p>
        </div>
        <div className="mt-14">
          <h3 className="type-label text-accent-red">What you will gain</h3>
          <ul className="mt-6 flex flex-col justify-center gap-x-10 gap-y-4 text-xl font-black text-dark-blue sm:flex-row sm:flex-wrap">
            {gains.map((gain) => (
              <li className="uppercase tracking-[0.04em]" key={gain}>
                {gain}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

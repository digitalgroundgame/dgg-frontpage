import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";

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
              className="type-button bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-accent-red"
              href="https://discord.gg/digitalgroundgame"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-br from-near-white-blue to-brand-blue px-8 py-16 text-charcoal sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1fr_minmax(260px,0.35fr)] md:items-center">
          <div>
            <p className="type-kicker">2026 Canvassing</p>
            <h2 className="type-section-title mt-4 max-w-4xl">
              Register your interest in joining the program.
            </h2>
          </div>
          <a
            className="type-button inline-flex justify-self-center bg-charcoal px-6 py-3 text-near-white-blue transition hover:bg-black"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdZmxO4SWAD0ARyjik9jFxJsh2ioHgIGKwRVkLSifv2RgFZQQ/viewform"
          >
            Interest Form
          </a>
        </div>
      </section>

      <section
        aria-label="Digital Ground Game members"
        className="relative h-[34vh] min-h-72 w-full overflow-hidden sm:h-[44vh] md:h-[56vh] lg:h-[70vh] lg:min-h-[28rem]"
      >
        <Image
          alt="Digital Ground Game members gathered together"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/group-wide.webp"
        />
      </section>

      <section className="bg-near-white-blue px-8 py-16 text-charcoal sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="type-statement max-w-4xl">
            We are dedicated to free expression, equality under the law, and the
            power of markets to drive prosperity through practical,
            action-oriented organizing.
          </p>
        </div>
      </section>

      <section className="grid bg-near-white-blue text-charcoal md:grid-cols-2">
        <div className="relative min-h-[22rem] md:min-h-[36rem]">
          <Image
            alt="People marching with signs and American flags"
            className="object-cover"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            src="/initiative-photo.webp"
          />
          <a
            aria-label="Photo credit: Andi on Instagram"
            className="type-button absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 bg-near-white-blue px-3 py-2 text-charcoal transition hover:bg-accent-red hover:text-near-white-blue"
            href="https://www.instagram.com/photos.andi/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              id="Photography-Taking-Pictures-Circle-Alternate--Streamline-Pixel"
              height={32}
              width={32}
              aria-hidden="true"
              className="h-6 w-6 shrink-0"
            >
              <desc>
                Photography Taking Pictures Circle Alternate Streamline Icon:
                https://streamlinehq.com
              </desc>
              <title>photography-taking-pictures-circle-alternate</title>
              <g>
                <path
                  d="M30.48 12.19H32v7.62h-1.52Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M28.96 19.81h1.52v3.05h-1.52Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M28.96 9.15h1.52v3.04h-1.52Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M27.43 22.86h1.53v3.05h-1.53Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M27.43 6.1h1.53v3.05h-1.53Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M25.91 25.91h1.52v1.52h-1.52Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M25.91 4.58h1.52V6.1h-1.52Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M24.39 12.19h1.52v10.67h-1.52Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M22.86 27.43h3.05v1.53h-3.05Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M22.86 3.05h3.05v1.53h-3.05Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M7.62 22.86h16.77v1.52H7.62Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M21.34 13.72h1.52v1.52h-1.52Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M19.81 28.96h3.05v1.52h-3.05Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M19.81 10.67h4.58v1.52h-4.58Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M19.81 1.53h3.05v1.52h-3.05Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="m18.29 18.29 -1.52 0 0 -1.52 -1.53 0 0 -1.53 3.05 0 0 -1.52 -4.57 0 0 1.52 -1.52 0 0 4.57 1.52 0 0 1.53 4.57 0 0 -1.53 1.52 0 0 -4.57 -1.52 0 0 3.05z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M18.29 9.15h1.52v1.52h-1.52Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M12.2 30.48h7.61V32H12.2Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M13.72 7.62h4.57v1.53h-4.57Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M12.2 0h7.61v1.53H12.2Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M12.2 9.15h1.52v1.52H12.2Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M9.15 28.96h3.05v1.52H9.15Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M9.15 1.53h3.05v1.52H9.15Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M7.62 10.67h4.58v1.52H7.62Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M6.1 27.43h3.05v1.53H6.1Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M6.1 3.05h3.05v1.53H6.1Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M6.1 12.19h1.52v10.67H6.1Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M4.58 25.91H6.1v1.52H4.58Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M4.58 4.58H6.1V6.1H4.58Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M3.05 22.86h1.53v3.05H3.05Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M3.05 6.1h1.53v3.05H3.05Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M1.53 19.81h1.52v3.05H1.53Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M1.53 9.15h1.52v3.04H1.53Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
                <path
                  d="M0 12.19h1.53v7.62H0Z"
                  fill="currentColor"
                  strokeWidth={1}
                />
              </g>
            </svg>
            <span>Andi @photos.andi</span>
          </a>
        </div>
        <div className="px-8 py-20 sm:px-12 md:flex md:items-center">
          <div className="max-w-xl">
            <h2 className="type-section-title">
              Building Lasting Political Power
            </h2>
            <p className="type-body mt-5">
              We aim to build lasting political power, develop the next
              generation of leaders, and ensure that when today&apos;s leaders
              are gone, we are ready-and worthy-to inherit the responsibility of
              shaping the future.
            </p>
            <p className="type-body mt-5">
              Our long-term vision guides our actions and decisions, inspiring
              us to push towards a better future for all.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-8 py-16 text-near-white-blue sm:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="type-section-title">
            Defending democracy, one action at a time.
          </h2>
          <p className="type-body mt-5">
            Join us in the fight for democracy, reason, and progress. The fight
            isn&apos;t over - it&apos;s ours to win.
          </p>
        </div>
        <div className="mt-14 text-center">
          <h3 className="type-label text-accent-red">What you will gain</h3>
          <ul className="mt-6 flex flex-col justify-center gap-x-10 gap-y-4 text-xl font-black text-near-white-blue sm:flex-row sm:flex-wrap">
            {gains.map((gain) => (
              <li className="uppercase tracking-[0.04em]" key={gain}>
                {gain}
              </li>
            ))}
          </ul>
          <a
            className="type-button mt-8 inline-flex bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-accent-red"
            href="https://discord.gg/digitalgroundgame"
          >
            Join Discord
          </a>
        </div>
        <div className="mx-auto mt-14 grid w-full max-w-6xl gap-5 md:grid-cols-3">
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

      <section className="relative overflow-hidden bg-brand-blue px-8 py-16 text-near-white-blue sm:px-12">
        <div
          aria-hidden="true"
          className="absolute -bottom-2/3 -right-48 aspect-square h-[180%] min-h-[36rem] rounded-full bg-dark-blue"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
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
              className="type-button mt-6 inline-flex bg-near-white-blue px-5 py-3 text-brand-blue transition hover:bg-charcoal hover:text-near-white-blue"
              href="mailto:info@digitalgroundgame.org"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

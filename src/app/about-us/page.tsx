import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon, type PixelIconName } from "@/components/widgets/pixel-icon";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import Image from "next/image";
import type { Metadata } from "next";

const accomplishments = [
  {
    value: "360,000+",
    label: "Door knocks",
    description: "Completed during the 2024 election cycle.",
  },
  {
    value: "Ohio",
    label: "Historic canvass",
    description:
      "Led the largest independent canvassing event in state history.",
  },
  {
    value: "8",
    label: "States",
    description:
      "Supported by 7 canvassing houses and 4 large events last cycle.",
  },
  {
    value: "2024",
    label: "Largest rookie ground game",
    description: "Built the largest rookie ground game in the 2024 election.",
  },
];

const teams: {
  name: string;
  focus: string;
  icon: PixelIconName;
  description: string;
}[] = [
  {
    name: "Dev Team",
    focus: "Development & Technology",
    icon: "coding-apps-websites-programming-hold-code",
    description:
      "Handles programming and development for projects including websites, bots, and Digital Ground Game infrastructure.",
  },
  {
    name: "Research Team",
    focus: "Policy & Analysis",
    icon: "search-check",
    description:
      "Conducts research on key issues, maintains talking point resources, and provides evidence-based analysis for political initiatives and electoral efforts.",
  },
  {
    name: "Media Team",
    focus: "Social Media & Messaging",
    icon: "interface-essential-speaker-announce",
    description:
      "Produces content that informs and mobilizes voters while coordinating with creators who support liberal and Democratic messaging.",
  },
];

export const metadata: Metadata = {
  title: "About Us | Digital Ground Game",
  description:
    "Learn about Digital Ground Game's mission, accomplishments, and volunteer teams.",
};

export default function AboutUsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="mx-auto w-full max-w-6xl px-8 py-16 text-center sm:px-12 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="type-kicker text-light-charcoal">About Us</p>
          <h1 className="type-hero mt-4 max-w-4xl">
            Building political power for the present and the future.
          </h1>
          <p className="type-subtitle mt-6">
            We are unwavering in our commitment to democracy, free expression,
            equality under the law, and the power of markets to drive
            prosperity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="https://discord.gg/digitalgroundgame"
              primaryHover="blue-black"
              rel="noopener noreferrer"
              target="_blank"
            >
              Become a Volunteer
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="grid bg-near-white-blue text-charcoal md:grid-cols-2">
        <div className="relative min-h-[22rem] md:min-h-[36rem]">
          <Image
            alt="Digital Ground Game members gathered together"
            className="object-cover"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            src="/about-us-team.webp"
          />
        </div>
        <div className="px-8 py-20 sm:px-12 lg:px-20 md:flex md:items-center">
          <div className="max-w-xl">
            <p className="type-kicker text-light-charcoal">Our Mission</p>
            <h2 className="type-section-title mt-4">
              Flexible, pragmatic, and committed to progress.
            </h2>
            <p className="type-body mt-5">
              We believe in our values and are committed to upholding them,
              while staying flexible and pragmatic about how to achieve
              progress.
            </p>
            <p className="type-body mt-5">
              Our mission is not just about the present, but also about the
              future: building lasting political power and developing the next
              generation of leaders.
            </p>
            <ButtonLink
              className="mt-8"
              href="https://secure.actblue.com/donate/dgg"
              primaryHover="red-black"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PixelIcon className="h-5 w-5 shrink-0" name="money-bag" />
              Donate Now
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-8 py-28 md:py-32 text-near-white-blue sm:px-12 lg:px-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-charcoal [clip-path:polygon(0_0,100%_0,100%_76%,0_100%)]"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-sans text-[1.85rem] font-black uppercase leading-none text-near-white-blue/80 min-[390px]:text-[2.15rem] sm:text-5xl md:text-6xl">
              Our <span className="block">Accomplishments</span>
            </p>
            <h2 className="type-section-title mt-4">
              Practical organizing with measurable results.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {accomplishments.map((item) => (
              <article
                className="bg-near-white-blue p-5 text-charcoal"
                key={item.label}
              >
                <p className="text-5xl font-black text-brand-blue">
                  {item.value}
                </p>
                <h3 className="mt-4 text-xl font-black">{item.label}</h3>
                <p className="type-small-body mt-3">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-blue px-8 py-28 md:py-32 text-near-white-blue sm:px-12 lg:px-20">
        <div
          aria-hidden="true"
          className="absolute -bottom-64 -left-48 aspect-square h-[42rem] rounded-full bg-dark-blue"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <p className="type-kicker text-near-white-blue/80">Our Teams</p>
            <h2 className="mt-4 text-5xl font-black leading-tight">
              Specialized teams turn energy into action.
            </h2>
          </div>
          <div className="grid gap-5">
            {teams.map((team) => (
              <article
                className="bg-near-white-blue p-5 text-charcoal"
                key={team.name}
              >
                <div className="flex items-start gap-4">
                  <PixelIcon
                    className="h-9 w-9 shrink-0 text-brand-blue"
                    name={team.icon}
                  />
                  <div>
                    <h3 className="text-2xl font-black">{team.name}</h3>
                    <p className="type-label mt-1 text-brand-blue">
                      {team.focus}
                    </p>
                    <p className="type-body mt-3">{team.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-near-white-blue px-8 py-16 text-charcoal sm:px-12 lg:px-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[minmax(0,42rem)_1fr] md:items-center">
          <div>
            <p className="type-kicker text-light-charcoal">Get Involved</p>
            <h2 className="type-section-title mt-4">
              Help defend democracy, one action at a time.
            </h2>
          </div>
          <div className="flex justify-center md:justify-end">
            <ButtonLink
              className="px-6"
              href="https://discord.gg/digitalgroundgame"
              primaryHover="black-blue"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PixelIcon className="h-7 w-7 shrink-0" name="hierarchy" />
              Join Discord
            </ButtonLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

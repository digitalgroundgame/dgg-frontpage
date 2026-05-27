import { BrandCtaSection } from "@/components/brand-cta-section";
import { PixelIcon, type PixelIconName } from "@/components/pixel-icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Digital Ground Game",
};

const gains: { label: string; icon: PixelIconName }[] = [
  { label: "Real political impact", icon: "hand-like" },
  { label: "Leadership development", icon: "star" },
  { label: "Evidence-based action", icon: "search-check" },
];

const initiatives = [
  {
    value: "5",
    label: "Regional squads",
    description:
      "Organized teams across the West, South, Midwest, Northeast, and International regions.",
  },
  {
    value: "6+",
    label: "Specialized teams",
    description:
      "Media, Research, Outreach, Software Development, and more driving our mission forward.",
  },
  {
    value: "100%",
    label: "Action-Oriented",
    description:
      "Every effort contributes to real, tangible results in defending democracy and advancing liberal values.",
  },
];

const socialFeeds = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/digitalgroundgame",
    icon: "logo-social-media-facebook-circle",
  },
  {
    label: "X",
    href: "https://x.com/digitalgroundg/",
    icon: "logo-social-media-twitter-circle",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DigitalGroundGame",
    icon: "logo-social-media-youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/digitalgroundgame",
    icon: "logo-social-media-instagram",
  },
  {
    label: "LinkedIn",
    href: "https://digitalgroundgame.org/website/social/linkedin",
    icon: "logo-linkedin",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@digitalgroundgame",
  },
] satisfies {
  label: string;
  href: string;
  icon?: PixelIconName;
}[];

export default function Home() {
  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
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
              rel="noopener noreferrer"
              target="_blank"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>

      <section className="bg-near-white-blue px-8 py-16 text-charcoal sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[minmax(0,42rem)_1fr] md:items-center">
          <div className="max-w-2xl">
            <p className="type-kicker text-light-charcoal">
              2026 <span className="text-black">Canvassing</span>
            </p>
            <h2 className="type-section-title mt-4 max-w-4xl text-light-charcoal">
              Register your interest in joining the program.
            </h2>
          </div>
          <div className="flex justify-center md:h-full md:items-center">
            <a
              className="type-button inline-flex items-center gap-2 bg-charcoal px-6 py-3 text-near-white-blue transition hover:bg-accent-red"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdZmxO4SWAD0ARyjik9jFxJsh2ioHgIGKwRVkLSifv2RgFZQQ/viewform"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PixelIcon
                className="h-7 w-7 shrink-0"
                name="business-product-check"
              />
              Interest Form
            </a>
          </div>
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

      <section className="bg-charcoal px-8 py-16 text-near-white-blue sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="type-kicker text-near-white-blue/80">
              What&apos;s New
            </p>
            <h2 className="type-section-title mt-4">
              Follow the latest from Digital Ground Game.
            </h2>
          </div>

          <div className="mt-10 grid justify-items-center gap-6">
            <div className="social-embed-card w-full overflow-hidden">
              <blockquote
                cite="https://www.tiktok.com/@digitalgroundgame"
                className="tiktok-embed"
                data-embed-type="creator"
                data-unique-id="digitalgroundgame"
              >
                <section>
                  <a
                    className="text-brand-blue transition hover:text-charcoal"
                    href="https://www.tiktok.com/@digitalgroundgame"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    @digitalgroundgame
                  </a>
                </section>
              </blockquote>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {socialFeeds.map((feed) => (
                <a
                  className="type-button inline-flex items-center gap-2 bg-brand-blue px-4 py-3 text-near-white-blue transition hover:bg-accent-red"
                  href={feed.href}
                  key={feed.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {feed.icon ? (
                    <PixelIcon className="h-5 w-5 shrink-0" name={feed.icon} />
                  ) : null}
                  {feed.label}
                </a>
              ))}
            </div>
          </div>
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
            rel="noopener noreferrer"
            target="_blank"
          >
            <PixelIcon className="h-6 w-6 shrink-0" name="camera-circle" />
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

      <section className="relative overflow-hidden px-8 py-16 text-near-white-blue sm:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-charcoal [clip-path:polygon(0_0,100%_0,100%_67%,0_100%)]"
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] md:items-start">
          <div className="max-w-2xl">
            <h2 className="type-section-title">
              Defending democracy, one action at a time.
            </h2>
            <p className="type-body mt-5">
              Join us in the fight for democracy, reason, and progress. The
              fight isn&apos;t over - it&apos;s ours to win.
            </p>
            <a
              className="type-button mt-8 inline-flex bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-accent-red"
              href="https://discord.gg/digitalgroundgame"
              rel="noopener noreferrer"
              target="_blank"
            >
              Join Discord
            </a>
          </div>
          <div className="grid w-full max-w-sm place-items-center bg-near-white-blue p-6 text-charcoal">
            <div className="w-fit max-w-full">
              <h3 className="type-label text-2xl text-accent-red">
                What you will gain
              </h3>
              <ul className="mt-5 grid gap-3 text-xl font-black text-charcoal">
                {gains.map((gain) => (
                  <li
                    className="flex items-center gap-3 uppercase tracking-[0.04em]"
                    key={gain.label}
                  >
                    <PixelIcon className="h-7 w-7 shrink-0" name={gain.icon} />
                    {gain.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-14 grid w-full max-w-6xl gap-5 md:grid-cols-3">
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

      <BrandCtaSection
        body={[
          'We organize members into regional "squads" that tackle political initiatives starting from the local level, building the foundation to strengthen national mobilization.',
          "Whether it's showing up to events, mobilizing voters, creating educational resources, or leading projects, we're dedicated to finding pragmatic results that move us forward.",
        ]}
        cta={{
          href: "mailto:info@digitalgroundgame.org",
          icon: "email-envelope-close",
          label: "Email Us",
        }}
        subtitle="Regional squads, National impact"
        title="Organizing for Real Political Impact"
      />

      <SiteFooter />
    </main>
  );
}

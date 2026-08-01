import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { getTierIvSustainerNames } from "@/lib/action-network";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sustainers | Digital Ground Game",
  description: "Digital Ground Game Sustainer Program membership tiers and benefits.",
};

const tiers = [
  {
    tier: "Tier 1",
    price: "$5",
    includes: null,
    perks: [
      {
        title: 'Bi-weekly "Field Notes."',
        description: "Behind-the-scenes canvasser updates, photos, and victory screenshots.",
      },
      {
        title: "Community status.",
        description: "Special role and icon in our Discord.",
      },
      {
        title: "Digital rewards.",
        description: "Exclusive phone wallpapers and printable posters.",
      },
      {
        title: "Membership card.",
        description: "Official DGG digital membership card.",
      },
    ],
  },
  {
    tier: "Tier 2",
    price: "$15",
    includes: "All Tier 1 perks, plus…",
    perks: [
      {
        title: "Exclusive sticker drops.",
        description: "Receive new physical sticker designs as they launch.",
      },
      {
        title: "Sponsor a shift.",
        description: "Personal impact emails directly from our canvassers showing the doors you funded.",
      },
    ],
  },
  {
    tier: "Tier 3",
    price: "$25",
    includes: "All Tier 1 & 2 perks, plus…",
    perks: [
      {
        title: "Anniversary merch.",
        description: "Exclusive Sustainer T-shirt at your 6-month milestone.",
      },
      {
        title: "Priority input.",
        description: "Weighted survey votes on future locations and local issues.",
      },
      {
        title: "Quarterly strategy briefings.",
        description: "Exclusive calls with data updates and Q&A sessions with leadership.",
      },
    ],
  },
  {
    tier: "Tier 4",
    price: "$50",
    includes: "All Tier 1, 2, and 3 perks, plus…",
    perks: [
      {
        title: "Executive round-table.",
        description: "Annual VIP video call with our Executive Director.",
      },
      {
        title: "Priority inbox.",
        description: "Dedicated, direct email line to DGG leadership.",
      },
      {
        title: "Public recognition.",
        description: 'Listed as a “Founding Sustainer” on our website.',
      },
      {
        title: "VIP access.",
        description: "Annual VIP ticket to a DGG-hosted event.",
      },
    ],
  },
];

export default async function SustainersPage() {
  const tierIvSustainerNames = await getTierIvSustainerNames();

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-6 py-10 sm:px-12 lg:px-20 lg:py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 text-center">
          <h1 className="type-hero flex max-w-4xl flex-wrap items-center justify-center gap-x-4 text-black uppercase">
            <span>Sustainer</span>
            <span className="max-[32rem]:flex max-[32rem]:w-full max-[32rem]:justify-center">
              <PixelIcon
                className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
                name="business-product-piggy-bank"
              />
            </span>
            <span>Program</span>
          </h1>
          <p className="type-subtitle max-w-2xl text-light-charcoal">
            Show your support and help power the work all year long.
          </p>
          <div className="flex justify-center pt-2">
            <ButtonLink
              href="https://secure.actblue.com/donate/dggsubscriber"
              primaryHover="black-blue"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PixelIcon
                className="h-5 w-5 shrink-0"
                name="interface-essential-cursor-click-point"
              />
              Become a Sustainer
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="flex-1 px-6 pb-12 sm:px-12 lg:px-20 lg:pb-16">
        <div className="mx-auto grid w-full max-w-6xl gap-5">
          {tiers.map((tier) => (
            <article
              className="grid overflow-hidden bg-near-white-blue md:grid-cols-[13rem_minmax(0,1fr)]"
              key={tier.tier}
            >
              <div className="flex flex-col items-center justify-center bg-brand-blue px-6 py-8 text-center text-near-white-blue">
                <p className="text-2xl font-black uppercase leading-none">{tier.tier}</p>
                <p className="mt-2 font-roboto-condensed text-6xl font-black leading-none sm:text-7xl">
                  {tier.price}
                </p>
                <p className="mt-2 text-2xl font-black uppercase leading-none">
                  Per Month
                </p>
              </div>
              <div className="px-6 py-7 sm:px-8">
                {tier.includes ? (
                  <p className="type-label w-fit bg-charcoal px-3 py-2 text-near-white-blue">
                    {tier.includes}
                  </p>
                ) : null}
                <ul className={tier.includes ? "mt-5 grid gap-4" : "grid gap-4"}>
                  {tier.perks.map((perk) => (
                    <li className="type-body" key={perk.title}>
                      <span aria-hidden="true" className="mr-2 text-brand-blue">•</span>
                      <span className="font-black text-brand-blue">{perk.title}</span>{" "}
                      <span>{perk.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {tierIvSustainerNames.length > 0 ? (
        <section className="bg-near-white-blue px-6 py-12 text-black sm:px-12 lg:px-20 lg:py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">
            <div>
              <h2 className="type-section-title mt-3 uppercase">Founding Sustainers</h2>
              <p className="type-body mt-4 max-w-xl text-black">
                A special thank you to our Tier IV supporters. Your incredible support drives our core field operations and keeps our organizers on the ground.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2" aria-label="Founding Sustainers">
              {tierIvSustainerNames.map((name) => (
                <li
                  className="bg-brand-blue px-5 py-4 text-center font-roboto-condensed text-xl font-black text-near-white-blue"
                  key={name}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}

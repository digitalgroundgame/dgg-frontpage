import { PixelIcon } from "@/components/pixel-icon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Squad | Digital Ground Game",
  description:
    "Digital Ground Game's international squad keeps Americans abroad and global allies connected to the work back home.",
};

export default function InternationalRegionPage() {
  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="mx-auto w-full max-w-6xl px-8 py-16 text-center sm:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="type-kicker text-light-charcoal">International Squad</p>
          <h1 className="type-hero mt-4 max-w-4xl">
            Caring about what happens back home does not stop at the border.
          </h1>
          <p className="type-subtitle mt-6">
            Digital Ground Game members abroad stay connected to the organizing,
            protests, and day-to-day ground game happening stateside.
          </p>
        </div>
      </section>

      <section className="bg-near-white-blue px-8 py-16 text-charcoal sm:px-12">
        <div className="mx-auto w-full max-w-3xl">
          <p className="type-body">
            Politics is a team sport, and Digital Ground Game leans heavily on
            its international members. Hailing from countries around the world,
            the International Squad is made up of Americans abroad and foreign
            friends alike.
          </p>
          <p className="type-body mt-5">
            Distance does not mean disengagement. We meet regularly to stay
            plugged into the organizing, the protests, and the practical work
            happening across the United States.
          </p>
        </div>
      </section>

      <section className="bg-brand-blue px-8 py-16 text-near-white-blue sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[minmax(0,42rem)_1fr] md:items-center">
          <div className="max-w-2xl">
            <p className="type-kicker text-near-white-blue">
              Are You Registered To Vote?
            </p>
            <p className="type-body mt-5">
              Living abroad can make voting from home harder to navigate. We
              have partnered with VoteFromAbroad to streamline the process for
              Americans living outside the United States.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <a
              className="type-button inline-flex items-center gap-2 bg-near-white-blue px-6 py-3 text-brand-blue transition hover:bg-charcoal hover:text-near-white-blue"
              href="https://voteabroad.org/ccJP-DGG-2026"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PixelIcon
                className="h-6 w-6 shrink-0"
                name="business-product-check"
              />
              Learn More
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

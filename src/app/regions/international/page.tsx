import { BrandCtaSection } from "@/components/page-blocks/brand-cta-section";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "International Squad | Digital Ground Game",
  description:
    "Digital Ground Game's international squad keeps Americans abroad and global allies connected to the work back home.",
};

export default function InternationalRegionPage() {
  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="mx-auto w-full max-w-6xl px-8 py-16 text-center sm:px-12 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="type-hero inline-flex max-w-4xl items-center justify-center gap-3">
            <PixelIcon className="h-16 w-16 shrink-0" name="navigation-compass" />
            International Squad
          </h1>
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden sm:mt-12">
            <Image
              alt="World map"
              className="h-auto w-full -translate-x-2"
              height={857}
              src="/world.svg"
              width={2000}
            />
          </div>
          <p className="type-section-title mt-12 text-light-charcoal">
            Caring about what happens back home does not stop at the border.
          </p>
          <p className="type-subtitle mt-6">
            Digital Ground Game members abroad stay connected to the organizing,
            protests, and day-to-day ground game happening stateside.
          </p>
        </div>
      </section>

      <BrandCtaSection
        body={[
          "Living abroad can make voting from home harder to navigate. We have partnered with VoteFromAbroad to streamline the process for Americans living outside the United States.",
        ]}
        cta={{
          external: true,
          href: "https://voteabroad.org/ccJP-DGG-2026",
          icon: "internet-network-arrow-sync",
          label: "VoteFromAbroad",
        }}
        eyebrow="Vote From Abroad"
        title="Are You Registered To Vote?"
      />

      <section className="bg-near-white-blue px-8 py-16 text-charcoal sm:px-12 lg:px-20">
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

      <SiteFooter />
    </main>
  );
}

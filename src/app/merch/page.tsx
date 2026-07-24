import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch | Digital Ground Game",
  description: "Digital Ground Game merch store placeholder.",
};

export default function MerchPage() {
  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="mx-auto w-full max-w-6xl px-8 py-16 text-center sm:px-12 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="type-kicker text-light-charcoal">Merch</p>
          <h1 className="type-hero mt-4 max-w-4xl">
            Digital Ground Game merch is coming soon.
          </h1>
          <p className="type-subtitle mt-6">
            We are setting up the store now. Check back soon for official
            Digital Ground Game gear.
          </p>
        </div>
      </section>

      <section className="bg-brand-blue px-8 py-16 text-near-white-blue sm:px-12 lg:px-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[minmax(0,42rem)_1fr] md:items-center">
          <div>
            <p className="type-kicker text-near-white-blue/90">
              In The Meantime
            </p>
            <h2 className="type-section-title mt-4">
              Help us build political power while the store gets ready.
            </h2>
          </div>
          <div className="flex justify-center md:justify-end">
            <ButtonLink
              className="px-6"
              href="https://secure.actblue.com/donate/dgg"
              primaryHover="red-black"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PixelIcon className="h-7 w-7 shrink-0" name="money-bag" />
              Donate
            </ButtonLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

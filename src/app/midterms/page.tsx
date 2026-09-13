import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midterms Canvassing Events | Digital Ground Game",
  description:
    "Sign up for midterm canvassing weekends in Cleveland, Phoenix, Detroit, and San Antonio.",
};

const midtermEvents = [
  {
    city: "Cleveland",
    state: "Ohio",
    dates: "September 26 + 27",
    signupUrl: "https://forms.gle/Wdg9y2E8s8w2NT738",
  },
  {
    city: "Phoenix",
    state: "Arizona",
    dates: "October 3 + 4",
    signupUrl: "https://forms.gle/HTvE6N4vWJ7jKim56",
  },
  {
    city: "Detroit",
    state: "Michigan",
    dates: "October 17 + 18",
    signupUrl: "https://forms.gle/SQMq2C9Hheex3KfRA",
  },
  {
    city: "San Antonio",
    state: "Texas",
    dates: "October 31 + November 1",
    signupUrl: "https://forms.gle/GeC5q5YhKZwbyB7g8",
  },
];

export default function MidtermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-8 py-10 text-center sm:px-12 lg:px-20 lg:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
          <h1 className="type-hero uppercase max-w-5xl">2026 Midterms Canvassing Events</h1>
          <p className="type-body mt-5 max-w-xl">
            Join us for a weekend of midterm canvassing and organizing in one
            of four cities.
          </p>
        </div>
      </section>

      <section className="flex-1 px-8 pb-20 sm:px-12 lg:px-20 lg:pb-30">
        <div className="mx-auto w-full max-w-6xl">

          <div className="grid gap-8 md:grid-cols-2 md:gap-x-12">
            {midtermEvents.map((event) => (
              <article
                className="grid gap-4 py-4 sm:py-6"
                key={event.city}
              >
                <div>
                  <h3 className="type-section-title">
                    {event.city}, {event.state}
                  </h3>
                  <p className="type-label mt-2 text-charcoal">
                    {event.dates}
                  </p>
                </div>

                <ButtonLink
                  className="justify-self-start"
                  href={event.signupUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <PixelIcon
                    className="h-5 w-5 shrink-0"
                    name="interface-essential-cursor-click-point"
                  />
                  Sign Up
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

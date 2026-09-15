import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midterms Canvassing Events | Digital Ground Game",
  description:
    "Sign up for midterm canvassing events in Cleveland, Phoenix, Detroit, San Antonio, and Pennsylvania.",
};

const midtermEvents = [
  {
    location: "Cleveland, Ohio",
    dates: "September 26 + 27",
    signupUrl: "https://forms.gle/Wdg9y2E8s8w2NT738",
  },
  {
    location: "Phoenix, Arizona",
    dates: "October 3 + 4",
    signupUrl: "https://forms.gle/HTvE6N4vWJ7jKim56",
  },
  {
    location: "Detroit, Michigan",
    dates: "October 17 + 18",
    signupUrl: "https://forms.gle/SQMq2C9Hheex3KfRA",
  },
  {
    location: "Bucks County, Pennsylvania",
    dates: "October 24",
    signupUrl:
      "https://forms.gle/nJrmY88fjEtU7Q386",
  },
  {
    location: "San Antonio, Texas",
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

        </div>
      </section>

      <section className="flex-1 px-8 pb-20 sm:px-12 lg:px-20 lg:pb-30">
        <div className="mx-auto w-full max-w-6xl">

          <div className="grid gap-8 md:grid-cols-2 md:gap-x-12">
            {midtermEvents.map((event) => (
              <article
                className="grid gap-4 py-4 sm:py-6"
                key={event.location}
              >
                <div>
                  <h3 className="type-section-title">
                    {event.location}
                  </h3>
                  <p className="type-label mt-2 text-charcoal">{event.dates}</p>
                </div>

                <ButtonLink
                  className="justify-self-start self-start"
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

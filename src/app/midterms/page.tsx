import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import { ButtonLink } from "@/components/widgets/button-link";
import { LocalEventTime } from "@/components/widgets/local-event-time";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { getCanvassingEvents, getPhonebankingEvents } from "@/lib/midterm-events";
import { formatCanvassingDates } from "@/lib/midterm-schedule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midterms Canvassing & Phonebanking Events | Digital Ground Game",
  description:
    "Sign up for midterm canvassing events and phonebanking sessions with Digital Ground Game.",
};

function EventAction({
  completed,
  signupUrl,
}: {
  completed: boolean;
  signupUrl: string;
}) {
  if (completed) {
    return (
      <span className="type-button-condensed justify-self-start bg-charcoal/10 px-4 py-2 text-charcoal">
        Completed
      </span>
    );
  }

  if (!signupUrl) return null;

  return (
    <ButtonLink
      className="justify-self-start self-start"
      href={signupUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <PixelIcon
        className="h-5 w-5 shrink-0"
        name="interface-essential-cursor-click-point"
      />
      Sign Up
    </ButtonLink>
  );
}

export default function MidtermsPage() {
  const canvassingEvents = getCanvassingEvents();
  const phonebankingEvents = getPhonebankingEvents();

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-8 py-10 text-center sm:px-12 lg:px-20 lg:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
          <h1 className="type-hero uppercase max-w-5xl">2026 Midterms Events</h1>
        </div>
      </section>

      <section className="px-8 pb-20 sm:px-12 lg:px-20 lg:pb-30">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="type-section-title mb-8">Canvassing Events</h2>
          <div className="grid gap-8 md:grid-cols-2 md:gap-x-12">
            {canvassingEvents.map((event) => (
              <article
                className="grid gap-4 bg-charcoal/5 p-6 sm:py-6"
                key={event.slug}
              >
                <div>
                  <h3 className={`type-section-title ${event.completed ? "text-light-charcoal" : ""}`}>
                    {event.title}
                  </h3>
                  <p className={`type-label mt-2 ${event.completed ? "text-light-charcoal" : "text-charcoal"}`}>
                    {formatCanvassingDates(event.startDate, event.endDate)}
                  </p>
                </div>
                <EventAction completed={event.completed} signupUrl={event.signupUrl} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex-1 px-8 pb-20 sm:px-12 lg:px-20 lg:pb-30">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="type-section-title">Phonebanking Events</h2>
          <p className="type-body mt-2">
            Couldn&apos;t make it to the canvassing events? Phone with Digital Ground Game instead
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-12">
            {phonebankingEvents.map((event) => (
              <article
                className={`grid content-start gap-4 bg-charcoal/5 p-6 sm:py-6 ${event.completed ? "text-light-charcoal" : ""}`}
                key={event.slug}
              >
                <LocalEventTime start={event.start} end={event.end} />
                <p className="type-body">{event.title}</p>
                <EventAction completed={event.completed} signupUrl={event.signupUrl} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

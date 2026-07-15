import { PublicEventsCalendar } from "@/components/events/public-events-calendar";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { loadPublicCalendar, type PublicCalendarEvent } from "@/lib/events-calendar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Digital Ground Game",
  description: "Join Digital Ground Game events and organize with our community.",
  openGraph: {
    images: [
      {
        url: "/events-og.png",
        width: 1200,
        height: 630,
        alt: "Digital Ground Game Events",
      },
    ],
  },
};

export default async function EventsPage() {
  const now = new Date();
  const initialRangeStart = new Date(now);
  const initialRangeEnd = new Date(now);
  initialRangeStart.setUTCDate(initialRangeStart.getUTCDate() - 45);
  initialRangeEnd.setUTCFullYear(initialRangeEnd.getUTCFullYear() + 1);

  let initialEvents: PublicCalendarEvent[] = [];
  let initialLoadSucceeded = false;

  try {
    initialEvents = await loadPublicCalendar(initialRangeStart, initialRangeEnd);
    initialLoadSucceeded = true;
  } catch (error) {
    console.error("Unable to preload public events calendar", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-8 sm:py-10">
          <div className="mx-auto flex max-w-6xl items-start gap-5 px-6 sm:px-12 lg:px-20">
            <PixelIcon
              className="mt-1 h-12 w-12 shrink-0 sm:h-14 sm:w-14"
              name="interface-essential-calendar-appointment"
            />
            <div className="max-w-3xl">
              <h1 className="type-hero uppercase">Events</h1>
              <p className="type-body mt-5">
                Join Digital Ground Game meetings, workshops, community events,
                and organizing opportunities. Select an event for details and
                its Discord link.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 w-full max-w-[1440px] px-6">
            <PublicEventsCalendar
              initialDate={now.toISOString().slice(0, 10)}
              initialEvents={initialEvents}
              initialLoadSucceeded={initialLoadSucceeded}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

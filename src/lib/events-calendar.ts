import "server-only";

import ICAL from "ical.js";

export const EVENTS_CALENDAR_URL =
  "https://calendar.google.com/calendar/ical/c_558b7955537810ad93b69f714c889e6a5773ae520471dcfea3d84bf233bd6d28%40group.calendar.google.com/public/basic.ics";

export type PublicCalendarEvent = {
  allDay: boolean;
  description: string;
  end: string;
  id: string;
  links: string[];
  location: string;
  start: string;
  title: string;
};

const urlPattern = /https?:\/\/[^\s<>]+/g;

function cleanUrl(value: string) {
  return value.replace(/[),.;]+$/, "");
}

function extractLinks(description: string, component: ICAL.Component) {
  const descriptionLinks = Array.from(description.matchAll(urlPattern), (match) =>
    cleanUrl(match[0]),
  );
  const propertyUrl = component.getFirstPropertyValue("url");
  const links =
    typeof propertyUrl === "string"
      ? [...descriptionLinks, propertyUrl]
      : descriptionLinks;

  return Array.from(new Set(links));
}

function cleanDescription(description: string) {
  return description
    .replace(urlPattern, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function serializeTime(value: ICAL.Time) {
  return value.isDate ? value.toString() : value.toJSDate().toISOString();
}

function eventOverlapsRange(
  start: ICAL.Time,
  end: ICAL.Time,
  rangeStart: Date,
  rangeEnd: Date,
) {
  return start.toJSDate() < rangeEnd && end.toJSDate() > rangeStart;
}

function serializeOccurrence(
  event: ICAL.Event,
  recurrenceId: ICAL.Time,
  start: ICAL.Time,
  end: ICAL.Time,
): PublicCalendarEvent | null {
  const status = event.component.getFirstPropertyValue("status");
  if (status === "CANCELLED") return null;

  const description = event.description || "";

  return {
    allDay: start.isDate,
    description: cleanDescription(description),
    end: serializeTime(end),
    id: `${event.uid}:${recurrenceId.toString()}`,
    links: extractLinks(description, event.component),
    location: event.location || "",
    start: serializeTime(start),
    title: event.summary || "Untitled event",
  };
}

export function parsePublicCalendar(
  source: string,
  rangeStart: Date,
  rangeEnd: Date,
) {
  const root = new ICAL.Component(ICAL.parse(source));
  const components = root.getAllSubcomponents("vevent");
  const events: PublicCalendarEvent[] = [];

  for (const component of components) {
    const event = new ICAL.Event(component);
    if (event.isRecurrenceException()) continue;

    if (!event.isRecurring()) {
      if (!eventOverlapsRange(event.startDate, event.endDate, rangeStart, rangeEnd)) {
        continue;
      }

      const serialized = serializeOccurrence(
        event,
        event.startDate,
        event.startDate,
        event.endDate,
      );
      if (serialized) events.push(serialized);
      continue;
    }

    const iterator = event.iterator();
    let occurrence = iterator.next();
    let guard = 0;

    while (occurrence && guard < 5000) {
      guard += 1;
      if (occurrence.toJSDate() >= rangeEnd) break;

      const details = event.getOccurrenceDetails(occurrence);
      if (
        eventOverlapsRange(
          details.startDate,
          details.endDate,
          rangeStart,
          rangeEnd,
        )
      ) {
        const serialized = serializeOccurrence(
          details.item,
          details.recurrenceId,
          details.startDate,
          details.endDate,
        );
        if (serialized) events.push(serialized);
      }

      occurrence = iterator.next();
    }
  }

  return events.sort((a, b) => a.start.localeCompare(b.start));
}

export async function loadPublicCalendar(
  rangeStart: Date,
  rangeEnd: Date,
) {
  const response = await fetch(EVENTS_CALENDAR_URL, {
    headers: { Accept: "text/calendar" },
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`Calendar feed returned ${response.status}.`);
  }

  return parsePublicCalendar(await response.text(), rangeStart, rangeEnd);
}

export type CanvassingEvent = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  signupUrl: string;
};

export type PhonebankingEvent = {
  slug: string;
  title: string;
  start: string;
  end: string;
  completed: boolean;
  signupUrl: string;
};

// Upcoming events run chronologically; completed events show the most recent first.
export function sortMidtermEvents<T extends { completed: boolean }>(
  events: T[],
  getStart: (event: T) => string,
): T[] {
  return [...events].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const chronological = Date.parse(getStart(a)) - Date.parse(getStart(b));
    return a.completed ? -chronological : chronological;
  });
}

export function formatCanvassingDates(startDate: string, endDate: string) {
  // Date-only events must keep their calendar dates in every visitor's timezone.
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return formatter.formatRange(
    new Date(`${startDate}T00:00:00Z`),
    new Date(`${endDate}T00:00:00Z`),
  );
}

export function formatPhonebankingSchedule(
  start: string,
  end: string,
  timeZone: string,
) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    timeZone,
  });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });
  const timeZoneName = new Intl.DateTimeFormat("en-US", {
    timeZoneName: "longGeneric",
    timeZone,
  }).formatToParts(startDate).find((part) => part.type === "timeZoneName")?.value ?? timeZone;

  return {
    date: dateFormatter.formatRange(startDate, endDate),
    time: `${timeFormatter.formatRange(startDate, endDate)} ${timeZoneName}`,
  };
}

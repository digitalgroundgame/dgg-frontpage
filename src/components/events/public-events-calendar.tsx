"use client";

import type { PublicCalendarEvent } from "@/lib/events-calendar";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
type CalendarView = "month" | "week";
const subscribeToHydration = () => () => {};

function localDateFromKey(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfMonth(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), 1);
}

function addMonths(value: Date, count: number) {
  return new Date(value.getFullYear(), value.getMonth() + count, 1);
}

function addDays(value: Date, count: number) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate() + count);
}

function dateKey(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function eventDate(event: PublicCalendarEvent) {
  if (event.allDay) {
    const [year, month, day] = event.start.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(event.start);
}

function eventDateKey(event: PublicCalendarEvent) {
  return dateKey(eventDate(event));
}

function formatEventTime(event: PublicCalendarEvent) {
  if (event.allDay) return "All day";

  return formatCompactTime(new Date(event.start));
}

function formatCompactTime(value: Date) {
  const hour = value.getHours() % 12 || 12;
  const minutes = value.getMinutes();
  const suffix = value.getHours() < 12 ? "A" : "P";

  return minutes === 0
    ? `${hour}${suffix}`
    : `${hour}:${String(minutes).padStart(2, "0")}${suffix}`;
}

function formatEventDate(event: PublicCalendarEvent) {
  const start = eventDate(event);
  const date = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(start);

  if (event.allDay) return `${date} · All day`;

  const timeZoneName = new Intl.DateTimeFormat(undefined, {
    timeZoneName: "short",
  })
    .formatToParts(new Date(event.end))
    .find((part) => part.type === "timeZoneName")?.value;

  return `${date} · ${formatCompactTime(new Date(event.start))}–${formatCompactTime(
    new Date(event.end),
  )}${timeZoneName ? ` ${timeZoneName}` : ""}`;
}

function getCalendarDays(cursor: Date) {
  const first = startOfMonth(cursor);
  const gridStart = addDays(first, -first.getDay());
  const last = new Date(first.getFullYear(), first.getMonth() + 1, 0);
  const gridEnd = addDays(last, 6 - last.getDay());
  const days: Date[] = [];

  for (let day = gridStart; day <= gridEnd; day = addDays(day, 1)) {
    days.push(day);
  }

  return days;
}

function getWeekDays(cursor: Date) {
  const first = addDays(cursor, -cursor.getDay());
  return Array.from({ length: 7 }, (_, index) => addDays(first, index));
}

function formatWeekLabel(days: Date[]) {
  const first = days[0];
  const last = days[days.length - 1];
  const month = new Intl.DateTimeFormat(undefined, { month: "short" });
  const sameMonth =
    first.getFullYear() === last.getFullYear() &&
    first.getMonth() === last.getMonth();

  if (sameMonth) {
    return `${month.format(first)} ${first.getDate()}–${last.getDate()}, ${last.getFullYear()}`;
  }

  return `${month.format(first)} ${first.getDate()}–${month.format(last)} ${last.getDate()}, ${last.getFullYear()}`;
}

function CalendarNavigation({
  next,
  period,
  previous,
  today,
}: {
  next: () => void;
  period: "month" | "week";
  previous?: () => void;
  today: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        aria-hidden={previous ? undefined : true}
        aria-label={previous ? `Previous ${period}` : undefined}
        className={`grid h-10 w-10 place-items-center bg-near-white-blue text-2xl font-black text-charcoal transition hover:bg-brand-blue hover:text-near-white-blue ${
          previous ? "cursor-pointer" : "pointer-events-none invisible"
        }`}
        onClick={previous}
        tabIndex={previous ? undefined : -1}
        type="button"
      >
        ‹
      </button>
      <button
        className="cursor-pointer bg-near-white-blue px-4 py-2 font-bold text-charcoal transition hover:bg-brand-blue hover:text-near-white-blue"
        onClick={today}
        type="button"
      >
        Today
      </button>
      <button
        aria-label={`Next ${period}`}
        className="grid h-10 w-10 cursor-pointer place-items-center bg-near-white-blue text-2xl font-black text-charcoal transition hover:bg-brand-blue hover:text-near-white-blue"
        onClick={next}
        type="button"
      >
        ›
      </button>
    </div>
  );
}

function EventButton({
  event,
  large = false,
  onSelect,
}: {
  event: PublicCalendarEvent;
  large?: boolean;
  onSelect: (event: PublicCalendarEvent, anchor: HTMLButtonElement) => void;
}) {
  return (
    <button
      className={`flex w-full min-w-0 cursor-pointer bg-brand-blue text-left leading-tight text-near-white-blue transition hover:bg-black focus-visible:bg-black ${
        large
          ? "flex-col items-start gap-1 px-3 py-2 text-sm"
          : "items-baseline gap-1 px-2 py-1 text-xs"
      }`}
      data-calendar-event
      onClick={(clickEvent) => onSelect(event, clickEvent.currentTarget)}
      type="button"
    >
      <span className="shrink-0 font-black">{formatEventTime(event)}</span>
      <span className={large ? "font-bold" : "truncate font-bold"}>
        {event.title}
      </span>
    </button>
  );
}

function EventDetails({
  event,
  inline = false,
}: {
  event: PublicCalendarEvent;
  inline?: boolean;
}) {
  return (
    <section
      aria-live="polite"
      className={`grid gap-4 bg-charcoal text-near-white-blue ${
        inline
          ? "px-5 py-6"
          : "max-h-[min(32rem,calc(100vh-2rem))] w-96 overflow-y-auto p-6 shadow-2xl"
      }`}
    >
      {!inline && (
        <div>
          <p className="font-bold text-accent-red">{formatEventDate(event)}</p>
          <h3 className="mt-2 text-3xl font-black">{event.title}</h3>
        </div>
      )}
      {event.location && (
        <p className="type-small-body text-near-white-blue">{event.location}</p>
      )}
      {event.description && (
        <p className="type-small-body whitespace-pre-line text-near-white-blue">
          {event.description}
        </p>
      )}
      {event.links.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {event.links.map((href, index) => (
            <a
              className="cursor-pointer bg-brand-blue px-5 py-3 font-black uppercase text-near-white-blue transition hover:bg-accent-red"
              href={href}
              key={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {index === 0 ? "Open event" : `Event link ${index + 1}`}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export function PublicEventsCalendar({
  initialDate,
  initialEvents,
  initialLoadSucceeded,
}: {
  initialDate: string;
  initialEvents: PublicCalendarEvent[];
  initialLoadSucceeded: boolean;
}) {
  const firstDate = useMemo(() => localDateFromKey(initialDate), [initialDate]);
  const [cursor, setCursor] = useState(firstDate);
  const [view, setView] = useState<CalendarView>("week");
  const [selectedEvent, setSelectedEvent] =
    useState<PublicCalendarEvent | null>(null);
  const [expandedAgendaEventIds, setExpandedAgendaEventIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [popoverPosition, setPopoverPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  const days = useMemo(() => getCalendarDays(cursor), [cursor]);
  const weekDays = useMemo(() => getWeekDays(cursor), [cursor]);
  const firstWeek = useMemo(() => getWeekDays(firstDate), [firstDate]);

  const eventsByDay = useMemo(() => {
    const grouped = new Map<string, PublicCalendarEvent[]>();
    for (const event of hasHydrated ? initialEvents : []) {
      const key = eventDateKey(event);
      grouped.set(key, [...(grouped.get(key) || []), event]);
    }
    return grouped;
  }, [initialEvents, hasHydrated]);

  const agendaEvents = useMemo(() => {
    const weekKeys = new Set(weekDays.map(dateKey));
    return (hasHydrated ? initialEvents : []).filter((event) =>
      weekKeys.has(eventDateKey(event)),
    );
  }, [initialEvents, hasHydrated, weekDays]);

  function goToDate(value: Date) {
    setSelectedEvent(null);
    setExpandedAgendaEventIds(new Set());
    setPopoverPosition(null);
    setCursor(value);
  }

  function switchView(nextView: CalendarView) {
    setView(nextView);
    closeEventDetails();
  }

  function closeEventDetails() {
    setSelectedEvent(null);
    setExpandedAgendaEventIds(new Set());
    setPopoverPosition(null);
  }

  useEffect(() => {
    if (!popoverPosition) return;

    function closeWhenClickingOutside(event: PointerEvent) {
      if (popoverRef.current?.contains(event.target as Node)) return;
      if ((event.target as Element).closest("[data-calendar-event]")) return;
      setSelectedEvent(null);
      setPopoverPosition(null);
    }

    document.addEventListener("pointerdown", closeWhenClickingOutside);
    return () => document.removeEventListener("pointerdown", closeWhenClickingOutside);
  }, [popoverPosition]);

  function selectCalendarEvent(
    event: PublicCalendarEvent,
    anchor: HTMLButtonElement,
  ) {
    if (selectedEvent?.id === event.id) {
      closeEventDetails();
      return;
    }

    const rect = anchor.getBoundingClientRect();
    const popoverWidth = 384;
    const gap = 8;
    const left =
      window.scrollX +
      Math.min(
        Math.max(rect.left, 16),
        window.innerWidth - popoverWidth - 16,
      );

    setSelectedEvent(event);
    setPopoverPosition({
      left,
      top: window.scrollY + rect.top - gap,
    });
  }

  function toggleAgendaEvent(eventId: string) {
    setExpandedAgendaEventIds((current) => {
      const next = new Set(current);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  }

  const todayKey = dateKey(new Date());
  const monthLabel = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(cursor);
  const weekLabel = formatWeekLabel(weekDays);
  const canGoBackAWeek = weekDays[0] > firstWeek[0];
  const canGoBackAMonth = startOfMonth(cursor) > startOfMonth(firstDate);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 bg-charcoal p-4 text-near-white-blue sm:p-5">
        <div className="md:hidden">
          <CalendarNavigation
            next={() => goToDate(addDays(cursor, 7))}
            period="week"
            previous={
              canGoBackAWeek
                ? () => goToDate(addDays(cursor, -7))
                : undefined
            }
            today={() => goToDate(new Date())}
          />
        </div>
        <div className="hidden md:block">
          <CalendarNavigation
            next={() =>
              goToDate(
                view === "week" ? addDays(cursor, 7) : addMonths(cursor, 1),
              )
            }
            period={view}
            previous={
              view === "week"
                ? canGoBackAWeek
                  ? () => goToDate(addDays(cursor, -7))
                  : undefined
                : canGoBackAMonth
                  ? () => goToDate(addMonths(cursor, -1))
                  : undefined
            }
            today={() => goToDate(new Date())}
          />
        </div>
        <h2 className="text-2xl font-black uppercase sm:text-3xl">
          <span className="md:hidden">{weekLabel}</span>
          <span className="hidden md:inline">
            {view === "week" ? weekLabel : monthLabel}
          </span>
        </h2>
        <div
          aria-label="Calendar view"
          className="hidden bg-near-white-blue p-1 md:flex"
          role="tablist"
        >
          {(["week", "month"] as const).map((option) => (
            <button
              aria-selected={view === option}
              className={`cursor-pointer px-4 py-2 font-black uppercase transition ${
                view === option
                  ? "bg-brand-blue text-near-white-blue"
                  : "text-charcoal hover:bg-charcoal hover:text-near-white-blue"
              }`}
              key={option}
              onClick={() => switchView(option)}
              role="tab"
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {!initialLoadSucceeded ? (
        <div className="bg-accent-red px-6 py-12 text-center text-xl font-bold text-near-white-blue">
          The events calendar is temporarily unavailable.
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden bg-charcoal/15 px-px pb-px md:block">
            {view === "month" ? (
              <div className="grid grid-cols-7 gap-px">
                {weekdays.map((weekday) => (
                  <div
                    className="bg-light-charcoal px-3 py-3 text-sm font-black uppercase tracking-wider text-near-white-blue"
                    key={weekday}
                  >
                    {weekday}
                  </div>
                ))}
                {days.map((day) => {
                  const key = dateKey(day);
                  const dayEvents = eventsByDay.get(key) || [];
                  const outsideMonth = day.getMonth() !== cursor.getMonth();

                  return (
                    <div
                      className={`p-2 ${
                        outsideMonth
                          ? "bg-brand-blue/5 text-charcoal/45"
                          : "bg-near-white-blue"
                      }`}
                      key={key}
                    >
                      <span
                        className={`mb-2 grid h-8 w-8 place-items-center font-black ${
                          key === todayKey
                            ? "bg-accent-red text-near-white-blue"
                            : ""
                        }`}
                      >
                        {day.getDate()}
                      </span>
                      <div className="grid gap-1">
                        {dayEvents.map((event) => (
                          <EventButton
                            event={event}
                            key={event.id}
                            onSelect={selectCalendarEvent}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-px">
                {weekDays.map((day, index) => {
                  const key = dateKey(day);
                  return (
                    <div
                      className="bg-light-charcoal px-3 py-3 text-near-white-blue"
                      key={key}
                    >
                      <span className="block text-xs font-black uppercase tracking-wider">
                        {weekdays[index]}
                      </span>
                      <span className="mt-1 block text-2xl font-black">
                        {day.getDate()}
                      </span>
                    </div>
                  );
                })}
                {weekDays.map((day) => {
                  const key = dateKey(day);
                  const dayEvents = eventsByDay.get(key) || [];
                  return (
                    <div
                      className="bg-near-white-blue p-2"
                      key={key}
                    >
                      <div className="grid gap-2">
                        {dayEvents.map((event) => (
                          <EventButton
                            event={event}
                            key={event.id}
                            large
                            onSelect={selectCalendarEvent}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid gap-3 bg-brand-blue/5 p-4 md:hidden">
            {agendaEvents.length === 0 ? (
              <p className="type-body py-10 text-center">
                No events are scheduled this week.
              </p>
            ) : (
              agendaEvents.map((event) => (
                <div key={event.id}>
                  <button
                    aria-expanded={expandedAgendaEventIds.has(event.id)}
                    className="grid w-full cursor-pointer grid-cols-[4.5rem_1fr] bg-near-white-blue text-left transition hover:bg-charcoal hover:text-near-white-blue"
                    onClick={() => toggleAgendaEvent(event.id)}
                    type="button"
                  >
                    <span className="grid content-center bg-brand-blue px-3 py-4 text-center font-black uppercase text-near-white-blue">
                      <span className="text-xs">
                        {new Intl.DateTimeFormat(undefined, {
                          month: "short",
                        }).format(eventDate(event))}
                      </span>
                      <span className="text-2xl">{eventDate(event).getDate()}</span>
                    </span>
                    <span className="grid content-center gap-1 px-4 py-3">
                      <span className="text-sm font-bold">
                        {formatEventTime(event)}
                      </span>
                      <span className="text-lg font-black">{event.title}</span>
                    </span>
                  </button>
                  {expandedAgendaEventIds.has(event.id) && (
                    <EventDetails
                      event={event}
                      inline
                    />
                  )}
                </div>
              ))
            )}
          </div>

        </>
      )}

      {selectedEvent && popoverPosition && (
        <div
          className="absolute z-50 hidden -translate-y-full md:block"
          ref={popoverRef}
          style={popoverPosition}
        >
          <EventDetails event={selectedEvent} />
        </div>
      )}
    </div>
  );
}

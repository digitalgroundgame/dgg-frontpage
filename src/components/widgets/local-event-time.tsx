"use client";

import { useSyncExternalStore } from "react";
import { formatPhonebankingSchedule } from "@/lib/midterm-schedule";

const subscribeToHydration = () => () => {};
const getServerTimeZone = () => "America/New_York";
const getLocalTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export function LocalEventTime({ start, end }: { start: string; end: string }) {
  const timeZone = useSyncExternalStore(
    subscribeToHydration,
    getLocalTimeZone,
    getServerTimeZone,
  );
  const schedule = formatPhonebankingSchedule(start, end, timeZone);

  return (
    <div>
      <h3 className="type-section-title">{schedule.date}</h3>
      <p className="type-label mt-2">
        <time dateTime={start}>{schedule.time}</time>
      </p>
    </div>
  );
}

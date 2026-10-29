import assert from "node:assert/strict";
import test from "node:test";
import {
  formatCanvassingDates,
  formatPhonebankingSchedule,
  sortMidtermEvents,
} from "./midterm-schedule.ts";

test("upcoming events sort chronologically before completed events", () => {
  const events = [
    { id: "old", start: "2026-09-26", completed: true },
    { id: "later", start: "2026-11-02", completed: false },
    { id: "recent", start: "2026-10-24", completed: true },
    { id: "next", start: "2026-10-31", completed: false },
  ];
  const originalOrder = events.map((event) => event.id);
  assert.deepEqual(
    sortMidtermEvents(events, (event) => event.start).map((event) => event.id),
    ["next", "later", "recent", "old"],
  );
  assert.deepEqual(events.map((event) => event.id), originalOrder);
});

test("timestamp sorting compares instants with different UTC offsets", () => {
  const events = [
    { start: "2026-11-01T01:15:00-05:00", completed: false },
    { start: "2026-11-01T01:45:00-04:00", completed: false },
  ];
  assert.equal(sortMidtermEvents(events, (event) => event.start)[0], events[1]);
});

test("Eastern sessions convert to Pacific time across the daylight-saving change", () => {
  const october = formatPhonebankingSchedule(
    "2026-10-31T12:00:00-04:00", "2026-10-31T13:30:00-04:00", "America/Los_Angeles",
  );
  const november = formatPhonebankingSchedule(
    "2026-11-01T15:00:00-05:00", "2026-11-01T16:30:00-05:00", "America/Los_Angeles",
  );
  assert.match(october.time, /9:00.*10:30.*AM.*Pacific Time/);
  assert.match(november.time, /12:00.*1:30.*PM.*Pacific Time/);
});

test("Eastern timezone label stays generic during daylight and standard time", () => {
  for (const [start, end] of [
    ["2026-10-31T12:00:00-04:00", "2026-10-31T13:30:00-04:00"],
    ["2026-11-01T15:00:00-05:00", "2026-11-01T16:30:00-05:00"],
  ]) {
    const schedule = formatPhonebankingSchedule(start, end, "America/New_York");
    assert.match(schedule.time, /Eastern Time/);
    assert.doesNotMatch(schedule.time, /EDT|EST|Daylight|Standard/);
  }
});

test("conversion updates the date and preserves ranges crossing local midnight", () => {
  const tokyo = formatPhonebankingSchedule(
    "2026-10-28T19:00:00-04:00", "2026-10-28T20:30:00-04:00", "Asia/Tokyo",
  );
  assert.equal(tokyo.date, "October 29");
  assert.match(tokyo.time, /8:00.*9:30.*AM/);

  const london = formatPhonebankingSchedule(
    "2026-10-28T19:00:00-04:00", "2026-10-28T20:30:00-04:00", "Europe/London",
  );
  assert.match(london.date, /October 28.*29/);
});

test("canvassing keeps single-day and multi-day calendar dates", () => {
  assert.equal(formatCanvassingDates("2026-10-24", "2026-10-24"), "October 24");
  assert.match(
    formatCanvassingDates("2026-10-31", "2026-11-01"),
    /October 31.*November 1/,
  );
});

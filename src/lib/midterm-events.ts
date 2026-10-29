import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  sortMidtermEvents,
  type CanvassingEvent,
  type PhonebankingEvent,
} from "@/lib/midterm-schedule";

function readEvents(folder: string) {
  const directory = path.join(process.cwd(), "content", folder);
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
      data: matter(fs.readFileSync(path.join(directory, filename), "utf8")).data,
    }));
}

function dateString(value: unknown): string {
  return value instanceof Date ? value.toISOString() : String(value ?? "");
}

export function getCanvassingEvents(): CanvassingEvent[] {
  const events = readEvents("midterms-canvassing").map(({ slug, data }) => ({
    slug,
    title: String(data.title ?? slug),
    startDate: dateString(data.startDate).slice(0, 10),
    endDate: dateString(data.endDate ?? data.startDate).slice(0, 10),
    completed: data.completed === true,
    signupUrl: String(data.signupUrl ?? ""),
  }));
  return sortMidtermEvents(events, (event) => event.startDate);
}

export function getPhonebankingEvents(): PhonebankingEvent[] {
  const events = readEvents("midterms-phonebanking").map(({ slug, data }) => ({
    slug,
    title: String(data.title ?? slug),
    start: dateString(data.start),
    end: dateString(data.end),
    completed: data.completed === true,
    signupUrl: String(data.signupUrl ?? ""),
  }));
  return sortMidtermEvents(events, (event) => event.start);
}

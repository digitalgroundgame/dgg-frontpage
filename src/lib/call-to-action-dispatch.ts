import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type Author, getAuthors } from "@/lib/authors";

export type CallToActionDispatchEntry = {
  slug: string;
  title: string;
  date: string;
  heroPhoto: string;
  authorSlugs: string[];
  authors: Author[];
  body: string;
};

const dispatchDirectory = path.join(
  process.cwd(),
  "content/call-to-action-dispatch",
);

function readMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"));
}

function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  return value ? [String(value)] : [];
}

function toDispatchEntry(
  filename: string,
  authorsBySlug: Map<string, Author>,
): CallToActionDispatchEntry {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(dispatchDirectory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const date = data.date instanceof Date ? data.date.toISOString() : data.date;
  const authorSlugs = toStringList(data.authors);
  const authors = authorSlugs
    .map((authorSlug) => authorsBySlug.get(authorSlug))
    .filter((author): author is Author => Boolean(author));

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(date ?? ""),
    heroPhoto: String(data.heroPhoto ?? ""),
    authorSlugs,
    authors,
    body: content.trim(),
  };
}

export function getCallToActionDispatchEntries(): CallToActionDispatchEntry[] {
  const authorsBySlug = new Map(
    getAuthors().map((author) => [author.slug, author]),
  );

  return readMarkdownFiles(dispatchDirectory)
    .map((filename) => toDispatchEntry(filename, authorsBySlug))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getCallToActionDispatchEntryBySlug(
  slug: string,
): CallToActionDispatchEntry | undefined {
  return getCallToActionDispatchEntries().find((entry) => entry.slug === slug);
}

export function formatDispatchDate(date: string): string {
  if (!date) {
    return "Undated";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

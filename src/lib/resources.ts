import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  type Author,
  getAuthors,
} from "@/lib/authors";

export type ResourceEntry = {
  slug: string;
  title: string;
  date: string;
  authorSlugs: string[];
  authors: Author[];
  heroPhoto: string;
  body: string;
};

const resourcesDirectory = path.join(process.cwd(), "content/resources");

function readMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"));
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "object" && item !== null && "name" in item) {
          return String(item.name);
        }

        return String(item);
      })
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function toResourceEntry(filename: string): ResourceEntry {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(resourcesDirectory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const date = data.date instanceof Date ? data.date.toISOString() : data.date;
  const authorSlugs = toStringArray(data.authors);
  const allAuthors = getAuthors();
  const authorsBySlug = new Map(
    allAuthors.map((author) => [author.slug, author]),
  );
  const authorsByName = new Map(
    allAuthors.map((author) => [author.name, author]),
  );
  const authors = authorSlugs
    .map(
      (authorSlug) =>
        authorsBySlug.get(authorSlug) ?? authorsByName.get(authorSlug),
    )
    .filter((author): author is Author => Boolean(author));

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(date ?? ""),
    authorSlugs,
    authors,
    heroPhoto: String(data.heroPhoto ?? ""),
    body: content.trim(),
  };
}

export function getResourceEntries(): ResourceEntry[] {
  return readMarkdownFiles(resourcesDirectory)
    .map(toResourceEntry)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getResourceEntryBySlug(
  slug: string,
): ResourceEntry | undefined {
  return getResourceEntries().find((entry) => entry.slug === slug);
}

export function formatResourceDate(date: string): string {
  if (!date) {
    return "Undated";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

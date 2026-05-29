import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ResourceEntry = {
  slug: string;
  title: string;
  date: string;
  authors: string[];
  heroPhoto: string;
  heroFilter: boolean;
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

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(date ?? ""),
    authors: toStringArray(data.authors),
    heroPhoto: String(data.heroPhoto ?? ""),
    heroFilter: Boolean(data.heroFilter),
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

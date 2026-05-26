import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type DispatchAuthor = {
  slug: string;
  name: string;
  picture: string;
  bio: string;
};

export type RegionDispatchEntry = {
  slug: string;
  title: string;
  date: string;
  heroPhoto: string;
  heroFilter: boolean;
  authorSlug: string;
  author?: DispatchAuthor;
  body: string;
};

const authorsDirectory = path.join(process.cwd(), "content/authors");

function readMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"));
}

function toAuthor(filename: string): DispatchAuthor {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(authorsDirectory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);

  return {
    slug,
    name: String(data.name ?? slug),
    picture: String(data.picture ?? ""),
    bio: String(data.bio ?? ""),
  };
}

export function getDispatchAuthors(): DispatchAuthor[] {
  return readMarkdownFiles(authorsDirectory).map(toAuthor);
}

function toDispatchEntry(
  filename: string,
  directory: string,
  authorsBySlug: Map<string, DispatchAuthor>,
): RegionDispatchEntry {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(directory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const date = data.date instanceof Date ? data.date.toISOString() : data.date;
  const authorSlug = String(data.author ?? "");

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(date ?? ""),
    heroPhoto: String(data.heroPhoto ?? ""),
    heroFilter: Boolean(data.heroFilter),
    authorSlug,
    author: authorsBySlug.get(authorSlug),
    body: content.trim(),
  };
}

export function getRegionDispatchEntries(
  contentCollection: string,
): RegionDispatchEntry[] {
  const dispatchDirectory = path.join(
    process.cwd(),
    "content",
    contentCollection,
  );
  const authorsBySlug = new Map(
    getDispatchAuthors().map((author) => [author.slug, author]),
  );

  return readMarkdownFiles(dispatchDirectory)
    .map((filename) =>
      toDispatchEntry(filename, dispatchDirectory, authorsBySlug),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getRegionDispatchEntryBySlug(
  contentCollection: string,
  slug: string,
): RegionDispatchEntry | undefined {
  return getRegionDispatchEntries(contentCollection).find(
    (entry) => entry.slug === slug,
  );
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

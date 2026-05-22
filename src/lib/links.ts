import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type LinkEntry = {
  slug: string;
  title: string;
  href: string;
  order: number;
};

const linksDirectory = path.join(process.cwd(), "content/links");

function toLinkEntry(filename: string): LinkEntry {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(linksDirectory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);

  return {
    slug,
    title: String(data.title ?? slug),
    href: String(data.href ?? "#"),
    order: Number(data.order ?? 0),
  };
}

export function getLinkEntries(): LinkEntry[] {
  if (!fs.existsSync(linksDirectory)) {
    return [];
  }

  return fs
    .readdirSync(linksDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(toLinkEntry)
    .sort((a, b) => a.order - b.order);
}

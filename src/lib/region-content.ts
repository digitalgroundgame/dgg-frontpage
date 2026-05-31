import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  getAuthors,
  type Author,
} from "@/lib/authors";

export type RegionPhoto = {
  slug: string;
  region: string;
  image: string;
  alt: string;
  caption: string;
  order: number;
};

const regionsDirectory = path.join(process.cwd(), "content/regions");

function readMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"));
}

function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item)).filter(Boolean);
}

export function getRegionPeople(regionSlug: string): Author[] {
  const filePath = path.join(regionsDirectory, regionSlug, "people/index.md");

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);
  const authorsBySlug = new Map(
    getAuthors().map((author) => [author.slug, author]),
  );

  return toStringList(data.authors)
    .map((authorSlug) => authorsBySlug.get(authorSlug))
    .filter((author): author is Author => Boolean(author));
}

function toRegionPhoto(filename: string): RegionPhoto {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(regionsDirectory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);

  return {
    slug,
    region: String(data.region ?? ""),
    image: String(data.image ?? ""),
    alt: String(data.alt ?? ""),
    caption: String(data.caption ?? ""),
    order: Number(data.order ?? 0),
  };
}

export function getRegionPhotos(regionSlug: string): RegionPhoto[] {
  const photosDirectory = path.join(regionsDirectory, regionSlug, "photos");

  return readMarkdownFiles(photosDirectory)
    .map((filename) => toRegionPhoto(path.join(regionSlug, "photos", filename)))
    .filter((photo) => photo.image)
    .sort((a, b) => a.order - b.order || a.alt.localeCompare(b.alt));
}

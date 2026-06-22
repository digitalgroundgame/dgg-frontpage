import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  getAuthors,
  type Author,
} from "@/lib/authors";

export type RegionPhoto = {
  slug: string;
  image: string;
  alt: string;
  caption: string;
  order: number;
};

export type RegionInstagramLink = {
  href: string;
};

export type RegionContent = {
  people: Author[];
  photos: RegionPhoto[];
  instagramLink?: RegionInstagramLink;
};

const regionsDirectory = path.join(process.cwd(), "content/regions");

function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item)).filter(Boolean);
}

function toRecordList(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is Record<string, unknown> =>
      typeof item === "object" && item !== null && !Array.isArray(item),
  );
}

function getRegionData(regionSlug: string): Record<string, unknown> {
  const filePath = path.join(regionsDirectory, regionSlug, "index.md");

  if (!fs.existsSync(filePath)) {
    return {};
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);

  return data;
}

function getRegionPeople(data: Record<string, unknown>): Author[] {
  const authorsBySlug = new Map(
    getAuthors().map((author) => [author.slug, author]),
  );

  return toStringList(data.authors)
    .map((authorSlug) => authorsBySlug.get(authorSlug))
    .filter((author): author is Author => Boolean(author));
}

function toRegionPhoto(
  photo: Record<string, unknown>,
  index: number,
): RegionPhoto {
  return {
    slug: String(photo.slug ?? photo.image ?? `photo-${index + 1}`),
    image: String(photo.image ?? ""),
    alt: String(photo.alt ?? ""),
    caption: String(photo.caption ?? ""),
    order: Number(photo.order ?? 0),
  };
}

function getRegionPhotos(data: Record<string, unknown>): RegionPhoto[] {
  return toRecordList(data.photos)
    .map(toRegionPhoto)
    .filter((photo) => photo.image)
    .sort((a, b) => a.order - b.order || a.alt.localeCompare(b.alt));
}

function toInstagramHref(value: unknown): string {
  const href = String(value ?? "").trim();

  if (!href) {
    return "";
  }

  try {
    const url = new URL(href);
    const hostname = url.hostname.toLowerCase();
    const isInstagramHost =
      hostname === "instagram.com" || hostname === "www.instagram.com";

    if (url.protocol === "https:" && isInstagramHost && url.pathname !== "/") {
      return url.toString();
    }
  } catch {
    return "";
  }

  return "";
}

function getRegionInstagramLink(
  data: Record<string, unknown>,
): RegionInstagramLink | undefined {
  const href = toInstagramHref(data.instagramHref);

  if (!href) {
    return undefined;
  }

  return {
    href,
  };
}

export function getRegionContent(regionSlug: string): RegionContent {
  const data = getRegionData(regionSlug);

  return {
    people: getRegionPeople(data),
    photos: getRegionPhotos(data),
    instagramLink: getRegionInstagramLink(data),
  };
}

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  draft: boolean;
  excerpt: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

function toPost(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const date = data.date instanceof Date ? data.date.toISOString() : data.date;

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(date ?? ""),
    draft: Boolean(data.draft),
    excerpt: content.trim().split(/\n{2,}/)[0] ?? "",
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(toPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatPostDate(date: string): string {
  if (!date) {
    return "Undated";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

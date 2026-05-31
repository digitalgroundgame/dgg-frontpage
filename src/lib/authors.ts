import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Author = {
  slug: string;
  name: string;
  picture: string;
  orgTitle: string;
  bio: string;
};

const authorsDirectory = path.join(process.cwd(), "content/people");

function readMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"));
}

function toAuthor(filename: string): Author {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(authorsDirectory, filename);
  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);

  return {
    slug,
    name: String(data.name ?? slug),
    picture: String(data.picture ?? ""),
    orgTitle: String(data.orgTitle ?? data.bio ?? ""),
    bio: String(data.bio ?? ""),
  };
}

export function getAuthors(): Author[] {
  return readMarkdownFiles(authorsDirectory).map(toAuthor);
}

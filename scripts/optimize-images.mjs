#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const repoRoot = process.cwd();
const uploadsDir = path.join(repoRoot, "public", "uploads");
const checkOnly = process.argv.includes("--check");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const referenceRoots = ["content", "src", "public/admin"];
const referenceExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".md",
  ".mdx",
  ".html",
]);

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return listImages(entryPath);
      }

      if (!entry.isFile()) {
        return [];
      }

      return supportedExtensions.has(path.extname(entry.name).toLowerCase())
        ? [entryPath]
        : [];
    }),
  );

  return files.flat();
}

function formatAsWebp(image) {
  return image.webp({
    effort: 6,
    quality: 82,
  });
}

async function listReferenceFiles(dir) {
  if (!(await fileExists(dir))) {
    return [];
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return listReferenceFiles(entryPath);
      }

      if (!entry.isFile()) {
        return [];
      }

      return referenceExtensions.has(path.extname(entry.name).toLowerCase())
        ? [entryPath]
        : [];
    }),
  );

  return files.flat();
}

async function updateReferences(fromPublicPath, toPublicPath) {
  const roots = referenceRoots.map((root) => path.join(repoRoot, root));
  const files = (await Promise.all(roots.map(listReferenceFiles))).flat();
  const updated = [];

  for (const filePath of files) {
    const original = await fs.readFile(filePath, "utf8");
    const next = original.split(fromPublicPath).join(toPublicPath);

    if (next === original) {
      continue;
    }

    updated.push(filePath);

    if (!checkOnly) {
      await fs.writeFile(filePath, next);
    }
  }

  return updated;
}

async function optimizeImage(filePath) {
  const original = await fs.readFile(filePath);
  const parsedPath = path.parse(filePath);
  const extension = parsedPath.ext.toLowerCase();

  if (extension === ".webp") {
    return {
      filePath,
      outputPath: filePath,
      originalBytes: original.length,
      optimizedBytes: original.length,
      changed: false,
    };
  }

  const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);
  const publicPath = `/${path.relative(path.join(repoRoot, "public"), filePath)}`;
  const outputPublicPath = `/${path.relative(path.join(repoRoot, "public"), outputPath)}`;
  const image = sharp(original, { animated: true }).rotate();
  const metadata = await image.metadata();

  if (metadata.pages && metadata.pages > 1) {
    return {
      filePath,
      skipped: "animated image",
    };
  }

  const pipeline = formatAsWebp(image);

  const optimized = await pipeline.toBuffer();

  if (!checkOnly) {
    await fs.writeFile(outputPath, optimized);
    await fs.rm(filePath);
  }

  const updatedReferences = await updateReferences(publicPath, outputPublicPath);

  return {
    filePath,
    outputPath,
    originalBytes: original.length,
    optimizedBytes: optimized.length,
    updatedReferences,
    changed: true,
  };
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function relativePath(filePath) {
  return path.relative(repoRoot, filePath);
}

if (!(await fileExists(uploadsDir))) {
  console.log("No public/uploads directory found.");
  process.exit(0);
}

const images = await listImages(uploadsDir);
const results = await Promise.all(images.map(optimizeImage));
const changed = results.filter((result) => result.changed);
const skipped = results.filter((result) => result.skipped);

for (const result of changed) {
  const delta = result.originalBytes - result.optimizedBytes;
  const outputLabel =
    result.outputPath === result.filePath
      ? relativePath(result.filePath)
      : `${relativePath(result.filePath)} -> ${relativePath(result.outputPath)}`;
  console.log(
    `${checkOnly ? "Needs optimization" : "Optimized"} ${outputLabel}: ${formatBytes(
      result.originalBytes,
    )} -> ${formatBytes(
      result.optimizedBytes,
    )} saved ${formatBytes(delta)}`,
  );

  if (result.updatedReferences?.length) {
    console.log(
      `Updated references in ${result.updatedReferences.map(relativePath).join(", ")}`,
    );
  }
}

for (const result of skipped) {
  console.log(`Skipped ${relativePath(result.filePath)}: ${result.skipped}`);
}

if (checkOnly && changed.length > 0) {
  console.error(
    `${changed.length} image${changed.length === 1 ? "" : "s"} need optimization. Run pnpm optimize-images.`,
  );
  process.exit(1);
}

const totalOriginalBytes = changed.reduce(
  (sum, result) => sum + result.originalBytes,
  0,
);
const totalOptimizedBytes = changed.reduce(
  (sum, result) => sum + result.optimizedBytes,
  0,
);

if (changed.length === 0) {
  console.log(
    `Checked ${images.length} image${images.length === 1 ? "" : "s"}; no changes needed.`,
  );
} else {
  console.log(
    `${checkOnly ? "Found" : "Optimized"} ${changed.length} image${
      changed.length === 1 ? "" : "s"
    }; total savings ${formatBytes(totalOriginalBytes - totalOptimizedBytes)}.`,
  );
}

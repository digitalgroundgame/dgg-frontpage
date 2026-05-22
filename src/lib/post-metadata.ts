import type { Metadata } from "next";

export function getPostImageMetadata(
  heroPhoto: string,
  title: string,
): Pick<Metadata, "openGraph" | "twitter"> {
  if (!heroPhoto) {
    return {};
  }

  return {
    openGraph: {
      title,
      images: [
        {
          url: heroPhoto,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [heroPhoto],
    },
  };
}

import type { Metadata } from "next";
import { VoteRedirect } from "./vote-redirect";

const destination = "https://voteabroad.org/ccJP-DGG-2026";

export const metadata: Metadata = {
  title: "Register to Vote From Abroad!",
  description: "",
  alternates: {
    canonical: "/vote",
  },
  openGraph: {
    title: "Register to Vote From Abroad!",
    description: "",
    url: "/vote",
    siteName: "Digital Ground Game",
    type: "website",
    images: [
      {
        url: "/uploads/vote-from-abroad-cta-cover.png",
        width: 800,
        height: 418,
        alt: "Register to vote from abroad with Digital Ground Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Register to Vote From Abroad!",
    description: "",
    images: ["/uploads/vote-from-abroad-cta-cover.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function VotePage() {
  return <VoteRedirect destination={destination} />;
}

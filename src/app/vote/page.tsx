import type { Metadata } from "next";
import { VoteRedirect } from "./vote-redirect";

const destination = "https://voteabroad.org/ccJP-DGG-2026";

export const metadata: Metadata = {
  title: "Register to Vote From Abroad | DGG",
  description: "",
  alternates: {
    canonical: "/vote",
  },
  openGraph: {
    title: "Request Your Absentee Ballot | VoteFromAbroad.org",
    description: "",
    url: "/vote",
    siteName: "Digital Ground Game",
    type: "website",
    images: [
      {
        url: "/uploads/vote-from-abroad-cta-cover.webp",
        width: 800,
        height: 418,
        alt: "Register to vote from abroad with VoteFromAbroad.org",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Your Absentee Ballot | VoteFromAbroad.org",
    description: "",
    images: ["/uploads/vote-from-abroad-cta-cover.webp"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function VotePage() {
  return <VoteRedirect destination={destination} />;
}

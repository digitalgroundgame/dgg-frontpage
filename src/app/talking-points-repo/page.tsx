import { TalkingPointsLandingPage } from "@/components/page-blocks/content-landing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talking Points Repository | Digital Ground Game",
  description:
    "DGG Research Team talking points for political activism, canvassing, and phonebanking.",
};

export default function TalkingPointsRepoPage() {
  return <TalkingPointsLandingPage />;
}

import { ResourcesLandingPage } from "@/components/resources-landing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Digital Ground Game",
};

export default function ResourcesPage() {
  return <ResourcesLandingPage />;
}

import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import { MerchStore } from "@/components/merch/merch-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch | Digital Ground Game",
  description: "Support Digital Ground Game with official merchandise.",
};

export default function MerchPage() {
  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />
      <MerchStore />
      <SiteFooter />
    </main>
  );
}

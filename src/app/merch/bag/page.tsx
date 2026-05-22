import { MerchBag } from "@/components/merch/merch-bag";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Bag | Digital Ground Game",
};

export default function MerchBagPage() {
  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />
      <MerchBag />
      <SiteFooter />
    </main>
  );
}

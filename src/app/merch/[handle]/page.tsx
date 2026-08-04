import { MerchProductDetail } from "@/components/merch/merch-product-detail";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch | Digital Ground Game",
};

export default async function MerchProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />
      <MerchProductDetail handle={handle} />
      <SiteFooter />
    </main>
  );
}

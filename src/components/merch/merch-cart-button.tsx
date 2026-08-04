import Link from "next/link";
import { PixelIcon } from "@/components/widgets/pixel-icon";

export function MerchCartButton({ count, className = "" }: { count: number; className?: string }) {
  const backgroundColor = count > 0 ? "bg-accent-red" : "bg-brand-blue";

  return (
    <Link aria-label={`View bag${count > 0 ? `, ${count} items` : ""}`} className={`type-button fixed right-4 top-[calc(env(safe-area-inset-top)+8rem)] z-40 inline-flex items-center gap-2 ${backgroundColor} p-3 text-near-white-blue hover:bg-black sm:right-8 sm:top-[calc(env(safe-area-inset-top)+10.5rem)] lg:right-12 ${className}`} href="/merch/bag" title="View bag">
      <PixelIcon className="h-6 w-6 shrink-0 text-near-white-blue" name="shopping-shipping-bag-1" />
      {count > 0 && <span aria-hidden="true" className="font-bold">{count}</span>}
    </Link>
  );
}

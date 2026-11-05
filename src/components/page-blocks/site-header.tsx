import { SiteNavigation } from "@/components/page-blocks/site-navigation";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { getCallToActionDispatchEntries } from "@/lib/call-to-action-dispatch";
import Link from "next/link";

export function SiteHeader({ showBanner = true }: { showBanner?: boolean }) {
  const currentCallToAction = showBanner
    ? getCallToActionDispatchEntries()[0]
    : undefined;

  return (
    <header className="bg-near-white-blue">
      {currentCallToAction ? (
        <Link
          className="flex items-center justify-center gap-3 bg-charcoal px-6 py-3 text-center text-lg font-bold leading-snug text-near-white-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-near-white-blue sm:text-xl"
          href="/call-to-action"
        >
          <PixelIcon
            className="h-5 w-5 shrink-0 text-accent-red sm:h-6 sm:w-6"
            name="interface-essential-speaker-announce"
          />
          <span>{currentCallToAction.title}</span>
          <span aria-hidden="true" className="shrink-0">→</span>
        </Link>
      ) : null}
      <SiteNavigation />
    </header>
  );
}

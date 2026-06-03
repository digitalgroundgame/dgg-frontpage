import { ButtonLink } from "@/components/widgets/button-link";
import { Logo } from "@/components/widgets/logo";
import { PixelIcon, type PixelIconName } from "@/components/widgets/pixel-icon";
import { getCallToActionDispatchEntries } from "@/lib/call-to-action-dispatch";
import { socialLinks } from "@/lib/social-links";
import type { Metadata } from "next";

const linkInBioSocialLinks: {
  label: string;
  href: string;
  icon?: PixelIconName;
}[] = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@digitalgroundgame",
    icon: "logo-social-media-tiktok",
  },
  ...socialLinks,
];

export const metadata: Metadata = {
  title: "Links | Digital Ground Game",
  description: "Digital Ground Game links, social media, and latest CTA.",
};

export default function LinkInBioPage() {
  const latestDispatch = getCallToActionDispatchEntries()[0];
  const ctaLabel = latestDispatch
    ? `CTA: ${latestDispatch.title}`
    : "Call to Action";

  return (
    <main className="min-h-screen bg-near-white-blue px-6 py-10 text-charcoal sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <div className="text-center">
          <Logo className="mx-auto h-auto w-44 text-brand-blue" />
        </div>

        <div className="mt-10 grid gap-3">
          <ButtonLink
            className="w-full justify-center px-4"
            href="/call-to-action"
            primaryHover="red-black"
          >
            <span className="whitespace-normal text-center">{ctaLabel}</span>
          </ButtonLink>

          {linkInBioSocialLinks.map((link) => (
            <ButtonLink
              className="w-full justify-center px-4"
              href={link.href}
              key={link.label}
              primaryHover="blue-black"
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.icon ? (
                <PixelIcon className="h-5 w-5 shrink-0" name={link.icon} />
              ) : null}
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </section>
    </main>
  );
}

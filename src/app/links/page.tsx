import { IconSocial, type SocialIconName } from "@/components/icons/icon-social";
import { ButtonLink } from "@/components/widgets/button-link";
import { Logo } from "@/components/widgets/logo";
import { getCallToActionDispatchEntries } from "@/lib/call-to-action-dispatch";
import { getLinkEntries } from "@/lib/links";
import Link from "next/link";
import type { Metadata } from "next";

const socialLinks: { label: string; href: string; icon: SocialIconName }[] = [
  { label: "TikTok", href: "https://www.tiktok.com/@digitalgroundgame", icon: "tiktok" },
  { label: "Facebook", href: "https://www.facebook.com/digitalgroundgame", icon: "facebook" },
  { label: "X", href: "https://x.com/digitalgroundg/", icon: "x" },
  { label: "YouTube", href: "https://www.youtube.com/@DigitalGroundGame", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/digitalgroundgame", icon: "instagram" },
  { label: "LinkedIn", href: "https://digitalgroundgame.org/website/social/linkedin", icon: "linkedin" },
  { label: "Threads", href: "https://www.threads.com/@digitalgroundgame", icon: "threads" },
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
  const linkEntries = getLinkEntries().filter(
    (entry) => entry.href !== "/call-to-action",
  );

  return (
    <main className="min-h-screen bg-near-white-blue px-6 py-10 text-charcoal sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <div className="text-center">
          <Link href="/">
            <Logo className="mx-auto h-auto w-44 text-brand-blue" />
          </Link>
        </div>

        <div className="mt-8 grid gap-3">
          <ButtonLink
            className="w-full justify-center px-4"
            href="/call-to-action"
            primaryHover="red-black"
          >
            <span className="whitespace-normal text-center">{ctaLabel}</span>
          </ButtonLink>

          {linkEntries.map((entry) => (
            <ButtonLink
              className="w-full justify-center px-4"
              href={entry.href}
              key={entry.slug}
              primaryHover="blue-black"
              rel={entry.href.startsWith("/") ? undefined : "noopener noreferrer"}
              target={entry.href.startsWith("/") ? undefined : "_blank"}
            >
              <span className="whitespace-normal text-center">{entry.title}</span>
            </ButtonLink>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              aria-label={label}
              className="text-charcoal transition hover:text-brand-blue"
              href={href}
              key={label}
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconSocial className="h-7 w-7" name={icon} />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

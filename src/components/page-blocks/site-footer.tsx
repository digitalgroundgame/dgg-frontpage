import { IconSocial, type SocialIconName } from "@/components/icons/icon-social";
import { ButtonLink } from "@/components/widgets/button-link";
import Link from "next/link";

const followLinks: { label: string; href: string; icon: SocialIconName }[] = [
  { label: "Instagram", href: "https://www.instagram.com/digitalgroundgame", icon: "instagram" },
  { label: "X", href: "https://x.com/digitalgroundg/", icon: "x" },
  { label: "Threads", href: "https://www.threads.com/@digitalgroundgame", icon: "threads" },
  { label: "Bluesky", href: "https://bsky.app/profile/digitalgroundgame.org", icon: "bluesky" },
  { label: "TikTok", href: "https://www.tiktok.com/@digitalgroundgame", icon: "tiktok" },
  { label: "Facebook", href: "https://www.facebook.com/digitalgroundgame", icon: "facebook" },
  { label: "LinkedIn", href: "https://digitalgroundgame.org/website/social/linkedin", icon: "linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/@DigitalGroundGame", icon: "youtube" },
  { label: "Twitch", href: "https://www.twitch.tv/digitalgroundgame", icon: "twitch" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-charcoal px-8 text-near-white-blue sm:px-12 lg:px-20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-xl font-black">Digital Ground Game</h2>
          <p className="mt-3 leading-7">
            Defending democracy, one action at a time.
          </p>
          <ButtonLink
            className="mt-5 px-4 py-2"
            href="https://secure.actblue.com/donate/dgg"
            primaryHover="red-black"
            rel="noopener noreferrer"
            target="_blank"
          >
            Donate Now
          </ButtonLink>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[0.18em] text-near-white-blue">
            Connect with us
          </h3>
          <ul className="mt-4 grid gap-2">
            <li>
              <a
                aria-label="Discord"
                className="text-near-white-blue transition hover:text-accent-red"
                href="https://discord.gg/digitalgroundgame"
                rel="noopener noreferrer"
                target="_blank"
              >
                <IconSocial className="h-6 w-6" name="discord" />
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-accent-red"
                href="mailto:info@digitalgroundgame.org"
              >
                info@digitalgroundgame.org
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[0.18em] text-near-white-blue">
            Extras
          </h3>
          <ul className="mt-4 grid gap-2">
            <li>
              <Link
                className="text-near-white-blue transition hover:text-accent-red"
                href="/resources"
              >
                Resources
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[0.18em] text-near-white-blue">
            Follow us
          </h3>
          <div className="mt-4 flex flex-col gap-2">
            <ul className="flex items-center gap-x-4">
              {followLinks.slice(0, Math.ceil(followLinks.length / 2)).map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    aria-label={label}
                    className="text-near-white-blue transition hover:text-accent-red"
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <IconSocial className="h-6 w-6" name={icon} />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-x-4">
              {followLinks.slice(Math.ceil(followLinks.length / 2)).map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    aria-label={label}
                    className="text-near-white-blue transition hover:text-accent-red"
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <IconSocial className="h-6 w-6" name={icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl py-4 text-center text-sm text-near-white-blue/70">
        Copyright © Digital Ground Game
      </div>
    </footer>
  );
}

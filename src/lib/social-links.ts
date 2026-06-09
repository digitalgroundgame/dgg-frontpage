import type { PixelIconName } from "@/components/widgets/pixel-icon";

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/digitalgroundgame",
    icon: "logo-social-media-instagram",
  },
  {
    label: "X",
    href: "https://x.com/digitalgroundg/",
    icon: "logo-social-media-twitter-circle",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@digitalgroundgame",
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/digitalgroundgame.org",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/digitalgroundgame",
    icon: "logo-social-media-facebook-circle",
  },
  {
    label: "LinkedIn",
    href: "https://digitalgroundgame.org/website/social/linkedin",
    icon: "logo-linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DigitalGroundGame",
    icon: "logo-social-media-youtube",
  },
  {
    label: "Twitch",
    href: "https://www.twitch.tv/digitalgroundgame",
    icon: "logo-social-media-twitch",
  },
] satisfies {
  label: string;
  href: string;
  icon?: PixelIconName;
}[];

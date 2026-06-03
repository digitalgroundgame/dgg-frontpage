import type { PixelIconName } from "@/components/widgets/pixel-icon";

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/digitalgroundgame",
    icon: "logo-social-media-facebook-circle",
  },
  {
    label: "X",
    href: "https://x.com/digitalgroundg/",
    icon: "logo-social-media-twitter-circle",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DigitalGroundGame",
    icon: "logo-social-media-youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/digitalgroundgame",
    icon: "logo-social-media-instagram",
  },
  {
    label: "LinkedIn",
    href: "https://digitalgroundgame.org/website/social/linkedin",
    icon: "logo-linkedin",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@digitalgroundgame",
  },
] satisfies {
  label: string;
  href: string;
  icon?: PixelIconName;
}[];

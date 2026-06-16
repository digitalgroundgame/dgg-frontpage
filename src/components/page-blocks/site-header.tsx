"use client";

import { Logo } from "@/components/widgets/logo";
import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon, type PixelIconName } from "@/components/widgets/pixel-icon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const primaryNavItems: {
  label: string;
  href: string;
  iconName: PixelIconName;
  iconClassName?: string;
}[] = [
  {
    label: "Call to Action",
    href: "/call-to-action",
    iconName: "interface-essential-alert-triangle",
    iconClassName: "text-accent-red",
  },
  {
    label: "Creator Corner",
    href: "/creator-corner",
    iconName: "user-woman-increasing-arrow",
  },
  {
    label: "Register to Vote",
    href: "/register",
    iconName: "hand-writing",
  },
  {
    label: "Talking Points",
    href: "/talking-points-repo",
    iconName: "content-files-newspaper",
  },
  { label: "Resources", href: "/resources", iconName: "flip-vertical-down" },
  { label: "Merch", href: "/merch", iconName: "business-product-price-tag" },
];

const regionItems = [
  { label: "Northeast", href: "/regions/northeast" },
  { label: "West", href: "/regions/west" },
  { label: "Midwest", href: "/regions/midwest" },
  { label: "South", href: "/regions/south" },
  { label: "International", href: "/regions/international" },
];

export function SiteHeader() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function updateScrolledState() {
      setIsScrolled(window.scrollY > 24);
    }

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolledState);
    };
  }, []);

  function closeMobileMenu() {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  }

  return (
    <header className="relative z-40 bg-near-white-blue">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full flex-wrap items-center justify-center gap-5 px-3 sm:px-6 xl:px-25  py-5 header-desktop:justify-between "
      >
        <Link
          aria-label="Digital Ground Game home"
          className="flex h-32 w-fit shrink-0 items-center text-brand-blue"
          href="/"
        >
          <Logo className="h-[calc(100%-1rem)] w-auto" />
          <span className="sr-only">Digital Ground Game</span>
        </Link>

        <div className="hidden gap-2 header-desktop:grid header-desktop:flex-1">
          <div className="grid grid-cols-3 lg:px-5 xl:px-7 lg:gap-x-7 gap-y-2 text-lg lg:text-xl xl:text-2xl font-bold text-charcoal ">
            {primaryNavItems.map((item) => (
              <Link
                className="inline-flex min-w-0 items-center justify-start gap-2 text-left transition hover:text-brand-blue"
                href={item.href}
                key={item.label}
              >
                <PixelIcon
                  className={`h-5 w-5 shrink-0 xl:h-6 xl:w-6 ${
                    item.iconClassName ?? ""
                  }`}
                  name={item.iconName}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-nowrap lg:justify-center gap-x-7 gap-y-2 whitespace-nowrap text-lg">
            {regionItems.map((item) => (
              <Link
                className="transition hover:text-brand-blue"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <details
          className={`group fixed right-6 top-6 z-50 ${
            isScrolled ? "header-desktop:block" : "header-desktop:hidden"
          }`}
          ref={mobileMenuRef}
        >
          <summary className="relative z-50 flex cursor-pointer list-none items-center justify-center bg-brand-blue p-2 text-near-white-blue group-open:[animation:menu-color-ramp_650ms_ease-in-out] [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Menu</span>
            <PixelIcon name="navigation-menu" />
          </summary>
          <div className="fixed inset-0 z-40 grid min-h-dvh content-center gap-10 overflow-y-auto bg-light-charcoal px-6 py-28 text-near-white-blue">
            <div className="mx-auto grid w-full max-w-md gap-8">
              <div className="grid gap-5 text-4xl font-black uppercase leading-none">
                {primaryNavItems.map((item) => (
                  <Link
                    className="inline-flex items-center gap-3 text-left transition hover:text-accent-red"
                    href={item.href}
                    key={item.label}
                    onClick={closeMobileMenu}
                  >
                    <PixelIcon
                      className={`h-7 w-7 shrink-0 ${item.iconClassName ?? ""}`}
                      name={item.iconName}
                    />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="grid gap-3 text-2xl font-bold">
                {regionItems.map((item) => (
                  <Link
                    className="transition hover:text-accent-red"
                    href={item.href}
                    key={item.label}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="grid gap-3 pt-2 text-2xl font-bold">
                <ButtonLink
                  className="w-full justify-start py-4 text-left"
                  href="https://discord.gg/digitalgroundgame"
                  primaryHover="blue-black"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <PixelIcon className="h-5 w-5 shrink-0" name="hierarchy" />
                  Join In
                </ButtonLink>
                <ButtonLink
                  className="w-full justify-start py-4 text-left"
                  href="https://secure.actblue.com/donate/dgg"
                  primaryHover="red-black"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <PixelIcon className="h-5 w-5 shrink-0" name="money-bag" />
                  Donate
                </ButtonLink>
              </div>
            </div>
          </div>
        </details>

        <div className="hidden w-full shrink-0 justify-stretch gap-3 header-desktop:grid header-desktop:w-44">
          <ButtonLink
            className="w-full justify-start whitespace-nowrap"
            href="https://discord.gg/digitalgroundgame"
            primaryHover="blue-black"
            rel="noopener noreferrer"
            target="_blank"
          >
            <PixelIcon className="h-5 w-5 shrink-0" name="hierarchy" />
            Join In
          </ButtonLink>
          <ButtonLink
            className="w-full justify-start whitespace-nowrap"
            href="https://secure.actblue.com/donate/dgg"
            primaryHover="red-black"
            rel="noopener noreferrer"
            target="_blank"
          >
            <PixelIcon className="h-5 w-5 shrink-0" name="money-bag" />
            Donate
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}

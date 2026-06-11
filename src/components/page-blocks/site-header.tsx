"use client";

import { Logo } from "@/components/widgets/logo";
import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const primaryNavItems = [
  { label: "Call to Action", href: "/call-to-action" },
  { label: "Talking Points", href: "/talking-points-repo" },
  { label: "Merch", href: "/merch" },
  { label: "Resources", href: "/resources" },
  { label: "Register to Vote", href: "/register" },
];

const primaryNavRows = [
  primaryNavItems.slice(0, 3),
  primaryNavItems.slice(3, 5),
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
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-5 px-8 py-5 sm:px-12 lg:px-20 header-desktop:justify-between"
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
          <div className="grid text-xl font-bold text-charcoal xl:text-2xl">
            {primaryNavRows.map((row, index) => (
              <div
                className="grid grid-cols-[max-content_max-content_max-content] gap-x-7 gap-y-1"
                key={index}
              >
                {row.map((item) =>
                  item ? (
                    <Link
                      className="transition hover:text-brand-blue"
                      href={item.href}
                      key={item.label}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-hidden="true" key="empty" />
                  ),
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-nowrap gap-x-7 gap-y-2 whitespace-nowrap text-lg">
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
                    className="transition hover:text-accent-red"
                    href={item.href}
                    key={item.label}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
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

        <div className="hidden w-full shrink-0 justify-stretch gap-3 header-desktop:grid header-desktop:w-40">
          <ButtonLink
            className="w-full justify-start"
            href="https://discord.gg/digitalgroundgame"
            primaryHover="blue-black"
            rel="noopener noreferrer"
            target="_blank"
          >
            <PixelIcon className="h-5 w-5 shrink-0" name="hierarchy" />
            Join In
          </ButtonLink>
          <ButtonLink
            className="w-full justify-start"
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

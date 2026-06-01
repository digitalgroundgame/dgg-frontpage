"use client";

import { Logo } from "@/components/widgets/logo";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import Link from "next/link";
import { useRef } from "react";

const primaryNavItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Call to Action", href: "/call-to-action" },
  { label: "Talking Points", href: "/talking-points-repo" },
  { label: "Resources", href: "/resources" },
  { label: "Merch", href: "/merch" },
  { label: "Register to Vote", href: "/register" },
];

const primaryNavRows = [
  primaryNavItems.slice(0, 3),
  primaryNavItems.slice(3, 6),
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

  function closeMobileMenu() {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  }

  return (
    <header className="bg-near-white-blue">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-5 px-8 py-5 sm:px-12 lg:px-20 min-[960px]:justify-between"
      >
        <Link
          aria-label="Digital Ground Game home"
          className="block h-32 w-[215px] shrink-0 text-brand-blue"
          href="/"
        >
          <Logo className="h-full w-full" />
          <span className="sr-only">Digital Ground Game</span>
        </Link>

        <div className="hidden gap-2 min-[960px]:grid min-[960px]:flex-1">
          <div className="grid gap-1 text-lg font-bold text-charcoal xl:text-xl">
            {primaryNavRows.map((row, index) => (
              <div
                className="grid grid-cols-[max-content_max-content_max-content] gap-x-4 gap-y-1"
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
          <div className="flex max-w-[315px] flex-wrap gap-x-4 gap-y-2 text-base">
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
          className="group fixed right-6 top-6 z-50 min-[960px]:hidden"
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
                <a
                  className="type-button inline-flex items-center justify-center gap-2 bg-brand-blue px-5 py-4 text-center text-near-white-blue transition hover:bg-dark-blue"
                  href="https://discord.gg/digitalgroundgame"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <PixelIcon className="h-5 w-5 shrink-0" name="hierarchy" />
                  Join In
                </a>
                <a
                  className="type-button inline-flex items-center justify-center gap-2 bg-accent-red px-5 py-4 text-center text-near-white-blue transition hover:bg-black"
                  href="https://secure.actblue.com/donate/dgg"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <PixelIcon className="h-5 w-5 shrink-0" name="money-bag" />
                  Donate
                </a>
              </div>
            </div>
          </div>
        </details>

        <div className="flex w-full shrink-0 flex-wrap justify-center gap-3 min-[960px]:w-auto min-[960px]:justify-start">
          <a
            className="type-button inline-flex items-center gap-2 bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-dark-blue"
            href="https://discord.gg/digitalgroundgame"
            rel="noopener noreferrer"
            target="_blank"
          >
            <PixelIcon className="h-5 w-5 shrink-0" name="hierarchy" />
            Join In
          </a>
          <a
            className="type-button inline-flex items-center gap-2 bg-accent-red px-5 py-3 text-near-white-blue transition hover:bg-black"
            href="https://secure.actblue.com/donate/dgg"
            rel="noopener noreferrer"
            target="_blank"
          >
            <PixelIcon className="h-5 w-5 shrink-0" name="money-bag" />
            Donate
          </a>
        </div>
      </nav>
    </header>
  );
}

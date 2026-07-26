"use client";

import { Logo } from "@/components/widgets/logo";
import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon, type PixelIconName } from "@/components/widgets/pixel-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  {
    label: "Events",
    href: "/events",
    iconName: "interface-essential-calendar-appointment",
  },
  {
    label: "Sustainers",
    href: "/sustainers",
    iconName: "business-product-piggy-bank",
  },
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
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuTop, setMobileMenuTop] = useState(0);
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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    document.documentElement.classList.add("mobile-menu-open");
    document.body.classList.add("mobile-menu-open");

    let positionFrame = 0;
    let positionTimeout = 0;

    function updateMobileMenuPosition() {
      setMobileMenuTop(window.scrollY);
    }

    function scheduleMobileMenuPositionUpdate() {
      window.cancelAnimationFrame(positionFrame);
      window.clearTimeout(positionTimeout);

      positionFrame = window.requestAnimationFrame(updateMobileMenuPosition);
      positionTimeout = window.setTimeout(updateMobileMenuPosition, 300);
    }

    scheduleMobileMenuPositionUpdate();
    window.addEventListener("orientationchange", scheduleMobileMenuPositionUpdate);
    window.addEventListener("resize", scheduleMobileMenuPositionUpdate);
    window.addEventListener("scroll", scheduleMobileMenuPositionUpdate, {
      passive: true,
    });
    window.visualViewport?.addEventListener(
      "resize",
      scheduleMobileMenuPositionUpdate,
    );
    window.visualViewport?.addEventListener(
      "scroll",
      scheduleMobileMenuPositionUpdate,
    );

    let previousTouchY = 0;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) return;

      if (
        mobileMenuPanelRef.current?.contains(target) ||
        mobileMenuRef.current?.contains(target)
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      closeMobileMenu();
    }

    function handleTouchStart(event: TouchEvent) {
      previousTouchY = event.touches[0]?.clientY ?? 0;
    }

    function handleTouchMove(event: TouchEvent) {
      const panel = mobileMenuPanelRef.current;
      const currentTouchY = event.touches[0]?.clientY ?? previousTouchY;

      if (!panel || !panel.contains(event.target as Node)) {
        event.preventDefault();
        return;
      }

      const isAtTop = panel.scrollTop <= 0;
      const isAtBottom =
        Math.ceil(panel.scrollTop + panel.clientHeight) >= panel.scrollHeight;
      const isDraggingDown = currentTouchY > previousTouchY;
      const isDraggingUp = currentTouchY < previousTouchY;

      if ((isAtTop && isDraggingDown) || (isAtBottom && isDraggingUp)) {
        event.preventDefault();
      }

      previousTouchY = currentTouchY;
    }

    function handleWheel(event: WheelEvent) {
      const panel = mobileMenuPanelRef.current;

      if (!panel || !panel.contains(event.target as Node)) {
        event.preventDefault();
        return;
      }

      const isAtTop = panel.scrollTop <= 0;
      const isAtBottom =
        Math.ceil(panel.scrollTop + panel.clientHeight) >= panel.scrollHeight;

      if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
        event.preventDefault();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.documentElement.classList.remove("mobile-menu-open");
      document.body.classList.remove("mobile-menu-open");
      window.cancelAnimationFrame(positionFrame);
      window.clearTimeout(positionTimeout);
      window.removeEventListener(
        "orientationchange",
        scheduleMobileMenuPositionUpdate,
      );
      window.removeEventListener("resize", scheduleMobileMenuPositionUpdate);
      window.removeEventListener("scroll", scheduleMobileMenuPositionUpdate);
      window.visualViewport?.removeEventListener(
        "resize",
        scheduleMobileMenuPositionUpdate,
      );
      window.visualViewport?.removeEventListener(
        "scroll",
        scheduleMobileMenuPositionUpdate,
      );
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
      setIsMobileMenuOpen(false);
    }
  }

  function handleMobileMenuToggle(event: React.ToggleEvent<HTMLDetailsElement>) {
    const isOpen = event.currentTarget.open;

    if (isOpen) {
      setMobileMenuTop(window.scrollY);
    }

    setIsMobileMenuOpen(isOpen);
  }

  function isActiveLink(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="relative bg-near-white-blue">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full flex-wrap items-center justify-center gap-5 px-3 py-3 sm:px-6 sm:py-5 xl:px-25 header-desktop:justify-between"
      >
        <Link
          aria-label="Digital Ground Game home"
          className="flex h-27 w-fit shrink-0 items-center text-brand-blue sm:h-32"
          href="/"
        >
          <Logo className="h-[calc(100%-1rem)] w-auto" />
          <span className="sr-only">Digital Ground Game</span>
        </Link>

        <div className="hidden gap-2 header-desktop:grid header-desktop:flex-1">
          <div className="header-links-grid grid grid-cols-3 gap-y-2 text-lg font-bold text-charcoal lg:gap-x-7 lg:text-xl xl:text-2xl">
            {primaryNavItems.map((item) => (
              <Link
                aria-current={isActiveLink(item.href) ? "page" : undefined}
                className={`inline-flex min-w-0 items-center justify-start gap-2 text-left transition hover:text-brand-blue ${
                  isActiveLink(item.href) ? "text-brand-blue" : ""
                }`}
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
          <div className="flex flex-nowrap gap-x-7 gap-y-2 whitespace-nowrap text-lg header-desktop:justify-center">
            {regionItems.map((item) => (
              <Link
                aria-current={isActiveLink(item.href) ? "page" : undefined}
                className={`transition hover:text-brand-blue ${
                  isActiveLink(item.href) ? "font-bold text-brand-blue" : ""
                }`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <details
          className={`group fixed left-6 top-[calc(env(safe-area-inset-top)+1.5rem)] z-50 ${
            isScrolled ? "header-desktop:block" : "header-desktop:hidden"
          }`}
          onToggle={handleMobileMenuToggle}
          ref={mobileMenuRef}
        >
          <summary className="relative z-50 flex cursor-pointer list-none items-center justify-center bg-brand-blue p-2 text-near-white-blue group-open:[animation:menu-color-ramp_650ms_ease-in-out] [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Menu</span>
            <PixelIcon name="navigation-menu" />
          </summary>
          {isMobileMenuOpen
            ? createPortal(
                <div
                  className="absolute left-0 z-30 grid h-[calc(100lvh+12rem)] w-full -translate-y-16 touch-pan-y content-start gap-10 overflow-y-auto overscroll-y-contain bg-light-charcoal pb-[calc(env(safe-area-inset-bottom)+12rem)] pl-[calc(env(safe-area-inset-left)+1.5rem)] pr-[calc(env(safe-area-inset-right)+1.5rem)] pt-[calc(env(safe-area-inset-top)+10rem)] text-near-white-blue [-webkit-overflow-scrolling:touch] sm:h-dvh sm:w-[calc(28rem+env(safe-area-inset-left)+env(safe-area-inset-right))] sm:translate-y-0 sm:pb-6 sm:pt-24"
                  ref={mobileMenuPanelRef}
                  style={{ top: mobileMenuTop }}
                >
                  <div className="mx-auto grid w-full max-w-md gap-5">
                    <div className="grid gap-5 text-4xl font-black uppercase leading-none">
                      {primaryNavItems.map((item) => (
                        <Link
                          aria-current={
                            isActiveLink(item.href) ? "page" : undefined
                          }
                          className="inline-flex items-center gap-3 text-left"
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
                    <div className="grid gap-1 text-2xl font-bold">
                      {regionItems.map((item) => (
                        <Link
                          aria-current={
                            isActiveLink(item.href) ? "page" : undefined
                          }
                          href={item.href}
                          key={item.label}
                          onClick={closeMobileMenu}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="grid gap-3 pt-1 text-2xl font-bold">
                      <ButtonLink
                        className="w-44 justify-self-start py-4 text-left"
                        href="https://discord.gg/digitalgroundgame"
                        primaryHover="blue-black"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <PixelIcon
                          className="h-5 w-5 shrink-0"
                          name="hierarchy"
                        />
                        Join In
                      </ButtonLink>
                      <ButtonLink
                        className="w-44 justify-self-start py-4 text-left"
                        href="https://secure.actblue.com/donate/dggsubscriber"
                        primaryHover="red-black"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <PixelIcon
                          className="h-5 w-5 shrink-0"
                          name="money-bag"
                        />
                        Donate
                      </ButtonLink>
                    </div>
                  </div>
                </div>,
                document.body,
              )
            : null}
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
            href="https://secure.actblue.com/donate/dggsubscriber"
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

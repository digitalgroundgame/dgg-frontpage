import Link from "next/link";

const primaryNavItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Call to Action", href: "/call-to-action" },
  { label: "Talking Points", href: "/talking-points-repo/introduction" },
  { label: "Merch", href: "/merch" },
  { label: "Register to Vote", href: "/register" },
];

const primaryNavRows = [
  primaryNavItems.slice(0, 3),
  [...primaryNavItems.slice(3), null],
];

const regionItems = [
  { label: "Northeast", href: "/regions/northeast" },
  { label: "West", href: "/regions/west" },
  { label: "Midwest", href: "/regions/midwest" },
  { label: "South", href: "/regions/south" },
  { label: "International", href: "/regions/international" },
];

export function SiteHeader() {
  return (
    <header className="bg-near-white-blue">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-5 px-8 py-5 sm:px-12 min-[960px]:justify-between"
      >
        <Link
          aria-label="Digital Ground Game home"
          className="block h-32 w-[215px] shrink-0 bg-brand-blue [mask-image:url('/dgg-logo-full.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
          href="/"
        >
          <span className="sr-only">Digital Ground Game</span>
        </Link>

        <div className="hidden gap-2 min-[960px]:grid min-[960px]:flex-1">
          <div className="grid gap-1 text-lg font-bold text-charcoal xl:text-xl">
            {primaryNavRows.map((row, index) => (
              <div
                className="grid grid-cols-[max-content_max-content_max-content] gap-x-4 gap-y-1"
                key={index}
              >
                {row.map((item) => (
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
                  )
                ))}
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

        <details className="group fixed right-6 top-6 z-50 min-[960px]:hidden">
          <summary className="relative z-50 flex cursor-pointer list-none items-center justify-center bg-brand-blue p-2 text-near-white-blue group-open:[animation:menu-color-ramp_650ms_ease-in-out] [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              id="Interface-Essential-Navigation-Menu-3--Streamline-Pixel"
              height={32}
              width={32}
              aria-hidden="true"
            >
              <desc>
                Interface Essential Navigation Menu 3 Streamline Icon:
                https://streamlinehq.com
              </desc>
              <title>interface-essential-navigation-menu-3</title>
              <g>
                <path d="M29.71 3.81h1.53v24.38h-1.53Z" fill="currentColor" strokeWidth={1} />
                <path d="M28.19 28.19h1.52v1.52h-1.52Z" fill="currentColor" strokeWidth={1} />
                <path d="M28.19 2.28h1.52v1.53h-1.52Z" fill="currentColor" strokeWidth={1} />
                <path d="M3.81 29.71h24.38v1.53H3.81Z" fill="currentColor" strokeWidth={1} />
                <path d="m25.14 20.57 -18.28 0 0 1.52 -1.53 0 0 3.05 1.53 0 0 -1.52 18.28 0 0 1.52 1.53 0 0 -3.05 -1.53 0 0 -1.52z" fill="currentColor" strokeWidth={1} />
                <path d="m25.14 12.95 -18.28 0 0 1.52 -1.53 0 0 3.05 1.53 0 0 -1.52 18.28 0 0 1.52 1.53 0 0 -3.05 -1.53 0 0 -1.52z" fill="currentColor" strokeWidth={1} />
                <path d="m25.14 5.33 -18.28 0 0 1.52 -1.53 0 0 3.05 1.53 0 0 -1.52 18.28 0 0 1.52 1.53 0 0 -3.05 -1.53 0 0 -1.52z" fill="currentColor" strokeWidth={1} />
                <path d="M6.86 25.14h18.28v1.52H6.86Z" fill="currentColor" strokeWidth={1} />
                <path d="M6.86 17.52h18.28v1.52H6.86Z" fill="currentColor" strokeWidth={1} />
                <path d="M6.86 9.9h18.28v1.53H6.86Z" fill="currentColor" strokeWidth={1} />
                <path d="M3.81 0.76h24.38v1.52H3.81Z" fill="currentColor" strokeWidth={1} />
                <path d="M2.29 28.19h1.52v1.52H2.29Z" fill="currentColor" strokeWidth={1} />
                <path d="M2.29 2.28h1.52v1.53H2.29Z" fill="currentColor" strokeWidth={1} />
                <path d="M0.76 3.81h1.53v24.38H0.76Z" fill="currentColor" strokeWidth={1} />
              </g>
            </svg>
          </summary>
          <div className="fixed inset-0 z-40 grid min-h-dvh content-center gap-10 overflow-y-auto bg-light-charcoal px-6 py-28 text-near-white-blue">
            <div className="mx-auto grid w-full max-w-md gap-8">
              <div className="grid gap-5 text-4xl font-black uppercase leading-none">
                {primaryNavItems.map((item) => (
                  <Link
                    className="transition hover:text-accent-red"
                    href={item.href}
                    key={item.label}
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
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="grid gap-3 pt-2 text-2xl font-bold">
                <a
                  className="type-button bg-brand-blue px-5 py-4 text-center text-near-white-blue transition hover:bg-dark-blue"
                  href="https://discord.gg/digitalgroundgame"
                >
                  Get Involved
                </a>
                <a
                  className="type-button bg-accent-red px-5 py-4 text-center text-near-white-blue transition hover:bg-black"
                  href="https://secure.actblue.com/donate/dgg"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        </details>

        <div className="flex w-full shrink-0 flex-wrap justify-center gap-3 min-[960px]:w-auto min-[960px]:justify-start">
          <a
            className="type-button bg-brand-blue px-5 py-3 text-near-white-blue transition hover:bg-dark-blue"
            href="https://discord.gg/digitalgroundgame"
          >
            Get Involved
          </a>
          <a
            className="type-button bg-accent-red px-5 py-3 text-near-white-blue transition hover:bg-black"
            href="https://secure.actblue.com/donate/dgg"
          >
            Donate
          </a>
        </div>
      </nav>
    </header>
  );
}

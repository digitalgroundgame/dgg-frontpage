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
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5 sm:px-10"
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

        <details className="relative min-[960px]:hidden">
          <summary className="cursor-pointer list-none bg-brand-blue px-5 py-3 text-xl font-bold text-near-white-blue transition hover:bg-dark-blue [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <div className="absolute left-0 z-10 mt-3 grid w-72 gap-5 bg-light-charcoal p-5 text-near-white-blue">
            <div className="grid gap-3 text-xl font-bold">
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
            <div className="grid gap-2 text-lg">
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
          </div>
        </details>

        <div className="flex shrink-0 flex-wrap gap-3">
          <a
            className="bg-brand-blue px-5 py-3 text-xl font-bold text-near-white-blue transition hover:bg-dark-blue"
            href="https://discord.gg/digitalgroundgame"
          >
            Get Involved
          </a>
          <a
            className="bg-accent-red px-5 py-3 text-xl font-bold text-near-white-blue transition hover:bg-black"
            href="https://secure.actblue.com/donate/dgg"
          >
            Donate
          </a>
        </div>
      </nav>
    </header>
  );
}

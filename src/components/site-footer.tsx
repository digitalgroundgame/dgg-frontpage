const followLinks = [
  { label: "Discord", href: "https://discord.gg/digitalgroundgame" },
  { label: "Facebook", href: "https://www.facebook.com/digitalgroundgame" },
  { label: "X", href: "https://x.com/digitalgroundg/" },
  { label: "YouTube", href: "https://www.youtube.com/@DigitalGroundGame" },
  { label: "Instagram", href: "https://www.instagram.com/digitalgroundgame" },
  { label: "TikTok", href: "https://www.tiktok.com/@digitalgroundgame" },
];

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-near-white-blue">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-8 py-10 sm:grid-cols-2 sm:px-12 lg:grid-cols-3">
        <div>
          <h2 className="text-xl font-black">Digital Ground Game</h2>
          <p className="mt-3 leading-7">
            Defending democracy, one action at a time.
          </p>
          <a
            className="mt-5 inline-flex bg-accent-red px-4 py-2 text-lg font-bold transition hover:bg-black"
            href="https://secure.actblue.com/donate/dgg"
          >
            Donate Now
          </a>
        </div>
        <div>
          <h3 className="font-black uppercase tracking-[0.18em] text-accent-red">
            Connect with us
          </h3>
          <ul className="mt-4 grid gap-2">
            <li>
              <a className="transition hover:text-accent-red" href="/contact-us">
                Contact us
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
          <h3 className="font-black uppercase tracking-[0.18em] text-accent-red">
            Follow us
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {followLinks.map((item) => (
              <li key={item.label}>
                <a className="transition hover:text-accent-red" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-charcoal px-8 py-4 text-center text-sm">
        Copyright © Digital Ground Game
      </div>
    </footer>
  );
}

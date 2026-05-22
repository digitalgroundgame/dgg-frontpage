"use client";

import { useEffect, useRef } from "react";

const TIKTOK_EMBED_SCRIPT = "https://www.tiktok.com/embed.js";

export function TikTokCreatorEmbed() {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = TIKTOK_EMBED_SCRIPT;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="social-embed-card w-full overflow-hidden" ref={embedRef}>
      <blockquote
        cite="https://www.tiktok.com/@digitalgroundgame"
        className="tiktok-embed"
        data-embed-type="creator"
        data-unique-id="digitalgroundgame"
      >
        <section>
          <a
            className="text-brand-blue transition hover:text-charcoal"
            href="https://www.tiktok.com/@digitalgroundgame"
            rel="noopener noreferrer"
            target="_blank"
          >
            @digitalgroundgame
          </a>
        </section>
      </blockquote>
    </div>
  );
}

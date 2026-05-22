"use client";

import { useEffect } from "react";

type VoteRedirectProps = {
  destination: string;
};

export function VoteRedirect({ destination }: VoteRedirectProps) {
  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-near-white-blue px-8 text-center text-charcoal">
      <div>
        <p className="type-kicker text-light-charcoal">Vote From Abroad</p>
        <h1 className="type-section-title mt-4">Sending you to VoteFromAbroad</h1>
        <p className="type-body mt-4">
          If you are not redirected automatically, continue below.
        </p>
        <a
          className="type-body mt-6 inline-block underline"
          href={destination}
          rel="noopener noreferrer"
          target="_blank"
        >
          Continue to VoteFromAbroad
        </a>
      </div>
    </main>
  );
}

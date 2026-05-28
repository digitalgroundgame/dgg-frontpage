import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Register to Vote | Digital Ground Game",
  description: "Check your voter registration with Digital Ground Game.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />
      <Script src="https://go.rally.win/embed.js" strategy="afterInteractive" />

      <section className="mx-auto w-full max-w-6xl px-8 py-16 text-center sm:px-12 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="type-kicker text-light-charcoal">Register To Vote</p>
          <h1 className="type-hero mt-4 max-w-4xl">
            Check your voter registration.
          </h1>
          <p className="type-subtitle mt-6">
            Make sure your registration is current before important election
            deadlines.
          </p>
        </div>
      </section>

      <section className="px-8 pb-16 text-charcoal sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-[600px]">
          <iframe
            allow="web-share; clipboard-write"
            className="min-h-[400px] w-full overflow-hidden border-0"
            scrolling="no"
            src="https://go.rally.win/pm/dgg-vrcheck/go?embed=true"
            title="Digital Ground Game voter registration check"
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

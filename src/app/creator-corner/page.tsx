import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import { SiteFooter } from "@/components/page-blocks/site-footer";
import { SiteHeader } from "@/components/page-blocks/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Corner | Digital Ground Game",
};

const partnershipTypes = [
  "Candidate interviews and Q&As",
  "Livestream discussions",
  "Podcast appearances",
  "Short-form video collaborations",
  "Discord events",
  "Voter education content",
  "Issue-based explainers",
  "Volunteer and canvassing promotion",
  "Clip sharing and amplification",
  "Community calls to action",
  "Assistance in video research",
];

const howItWorks = [
  {
    step: "1",
    title: "We connect with you.",
    body: "We learn about your platform, audience, content style, and what kinds of political or civic engagement feel authentic to you.",
  },
  {
    step: "2",
    title: "We identify the right opportunity.",
    body: "This could be a candidate interview, an issue-based conversation, a livestream Q&A, a voter engagement push, a Discord event, a canvassing promotion, or a short-form content collaboration.",
  },
  {
    step: "3",
    title: "We support the content.",
    body: "Digital Ground Game can help with briefing materials, suggested questions, scheduling, promotion, clips, and follow-up resources for your audience.",
  },
  {
    step: "4",
    title: "Your audience gets a clear action step.",
    body: 'Every collaboration should answer the question: "What can people do next?" That might mean joining the Discord, signing up for the 2026 canvassing program, attending an event, sharing content, or learning more about a candidate or issue.',
  },
];

export default function CreatorCornerPage() {
  return (
    <main className="flex min-h-screen flex-col bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="bg-near-white-blue px-8 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <p className="type-label text-brand-blue">Creator Corner</p>
          <h1 className="type-hero mt-4">Partner With Digital Ground Game</h1>
          <p className="type-subtitle mt-6 max-w-3xl">
            Help Build the Online Infrastructure Democracy Needs
          </p>
          <p className="type-body mt-6 max-w-3xl">
            Digital Ground Game is a national, community-driven movement
            dedicated to defending and advancing liberal democratic values
            through practical, evidence-based political action. We believe
            democracy is strongest when people are informed, engaged, and
            connected to real ways they can make an impact.
          </p>
          <p className="type-body mt-4 max-w-3xl">
            Today, political attention is shaped online. Content creators,
            streamers, podcasters, and online personalities are not just
            commentators. They are trusted messengers, community builders, and
            cultural leaders. Digital Ground Game exists to help connect that
            online influence to meaningful civic action.
          </p>
        </div>
      </section>

      <section className="bg-near-white-blue px-8 py-16 text-charcoal sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="type-section-title">Why Partner With Us?</h2>
          <p className="type-body mt-4 max-w-3xl">
            Creators already know how to reach people where they are. Digital
            Ground Game helps turn that reach into action.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Engage your audience with purpose.",
                body: "Give viewers and followers clear, practical ways to get involved beyond liking, sharing, or commenting.",
              },
              {
                title: "Support democracy without becoming a campaign staffer.",
                body: "Creators can participate in ways that fit their platform, voice, schedule, and comfort level.",
              },
              {
                title: "Reach politically engaged audiences.",
                body: "Digital Ground Game works with creators, volunteers, candidates, and civic organizers who care about democracy, free expression, equality under the law, and building long-term political power.",
              },
              {
                title: "Create content that matters.",
                body: "Partnerships can include interviews, livestreams, candidate Q&As, short-form clips, civic education, event promotion, and volunteer recruitment.",
              },
              {
                title:
                  "Help build the next generation of political leadership.",
                body: "Online communities are where many young voters and first-time activists are forming their political identities. Creators can help bring them into the process.",
              },
            ].map((item) => (
              <article className="bg-light-charcoal p-6 text-near-white-blue" key={item.title}>
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="type-small-body mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-near-white-blue px-8 py-16 text-charcoal sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="type-section-title">How Partnership Works</h2>
          <p className="type-body mt-4 max-w-3xl">
            Digital Ground Game makes partnership simple, flexible, and
            creator-friendly.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {howItWorks.map((item) => (
              <article
                className="bg-charcoal p-6 text-near-white-blue"
                key={item.step}
              >
                <span className="type-kicker text-accent-red">{item.step}</span>
                <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                <p className="type-small-body mt-3">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-8 py-16 text-near-white-blue sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="type-section-title">What We Are Looking For</h2>
          <p className="type-body mt-4">
            We are looking for creators who believe that democracy is worth
            defending and that online communities can be part of real-world
            political change.
          </p>
          <p className="type-body mt-4">
            You do not need to be a policy expert. You do not need to have the
            biggest platform. You do not need to cover politics every day.
          </p>
          <p className="type-body mt-4 font-bold">
            You just need to care about using your voice to help people
            understand what is at stake and how they can get involved.
          </p>
        </div>
      </section>

      <section className="px-8 py-16 text-charcoal sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="type-section-title">Partnership Opportunities</h2>
          <p className="type-body mt-4 max-w-3xl">
            Creators can partner with Digital Ground Game through:
          </p>
          <ul className="mt-8 grid gap-y-3 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3 lg:gap-x-16">
            {partnershipTypes.map((item) => (
              <li className="flex items-center gap-3 py-2" key={item}>
                <span className="text-brand-blue" aria-hidden="true">
                  ▶
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-dark-blue px-8 py-16 text-near-white-blue sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="type-section-title">Why This Matters</h2>
          <p className="type-body mt-4">
            The other side has spent years building powerful online media
            ecosystems. Digital Ground Game is helping build the pro-democracy
            response: creator-driven, community-powered, and focused on turning
            digital energy into real political action.
          </p>
          <p className="type-body mt-4 font-bold">
            When creators partner with Digital Ground Game, they help move
            people from awareness to action.
          </p>
        </div>
      </section>

      <section className="bg-near-white-blue px-8 py-16 text-charcoal sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="type-section-title">
            Let&apos;s Build the Digital Ground Game Together
          </h2>
          <p className="type-body mt-4">
            If you are a creator, streamer, podcaster, commentator, or online
            personality who wants to help defend democracy and grow civic
            participation, we would love to partner with you.
          </p>
          <p className="type-body mt-4 font-bold">
            Join us. Collaborate with us. Bring your audience into the fight for
            democracy.
          </p>
          <p className="type-subtitle mt-8 font-black">
            Next Step: Connect with Digital Ground Game to discuss partnership
            opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink
              href="https://discord.gg/digitalgroundgame"
              primaryHover="blue-black"
              rel="noopener noreferrer"
              target="_blank"
            >
              <PixelIcon className="h-5 w-5 shrink-0" name="hierarchy" />
              Join our Discord
            </ButtonLink>
            <ButtonLink
              href="mailto:tobias@digitalgroundgame.org"
              primaryHover="black-blue"
              rel="noopener noreferrer"
              target="_blank"
            >
              Email creator outreach
            </ButtonLink>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import { BlogCardPreview } from "@/components/blog-card-preview";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  formatTalkingPointDate,
  getTalkingPointEntries,
} from "@/lib/talking-points";

const ARTICLE_BASE_HREF = "/talking-points-repo";

function formatAuthors(authors: string[]) {
  return authors.length > 0 ? authors.join(", ") : undefined;
}

export function TalkingPointsLandingPage() {
  const talkingPoints = getTalkingPointEntries();

  return (
    <main className="min-h-screen bg-near-white-blue text-charcoal">
      <SiteHeader />

      <section className="px-8 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="type-label text-brand-blue">DGG Research Team</p>
          <h1 className="type-kicker mt-3 text-light-charcoal">
            Talking Points Repository
          </h1>
          <div className="mt-8 grid gap-6 text-light-charcoal">
            <p className="type-small-body">
              The Talking Points Repository project is a resource designed for
              members of <strong>DGG (Digital Ground Game)</strong>. These
              materials will be used for future political activism, canvassing,
              and phonebanking operations, beginning with the United States 2026
              midterm elections.
            </p>
            <p className="type-small-body">
              Each article is split into three main sections: introduction,
              persuasion, and debate. The introduction should provide necessary
              context about the topic at hand. The persuasion section is for
              talking to undecided voters, people with limited information about
              the topic, or anyone that the reader is trying to gently and
              politely convince of the Liberal (correct) stance. The debate
              section is reserved for more aggressive conversations where the
              goal is to tear down the opponent and/or remain as factual as
              possible, rhetorical effectiveness be damned.
            </p>
            <p className="type-small-body">
              In addition, each article will be rigorously sourced with academic
              articles, studies, relevant memes, and video clips. These may be
              recorded in footnotes, but each article will have a dedicated
              bibliography page for a complete list.
            </p>
            <p className="type-small-body">
              This project falls under the DGG Research Team, but members of
              other teams have/can still contribute to articles. More articles
              are planned for the future, but the initial release will include
              only three: Immigration, How to Talk to Normies, and Climate
              Change. If you have feedback or are interested in contributing to
              this project, join the Discord and contact Research Team
              Leadership (@legiolegionis) for the specific Talking Points Lead.
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="type-section-title text-light-charcoal">
            All Talking Points
          </h2>
          {talkingPoints.length > 0 ? (
            <div className="mt-8 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {talkingPoints.map((entry) => (
                <BlogCardPreview
                  authorName={formatAuthors(entry.authors)}
                  date={entry.date}
                  formattedDate={formatTalkingPointDate(entry.date)}
                  key={entry.slug}
                  readMoreHref={`${ARTICLE_BASE_HREF}/${entry.slug}`}
                  slug={entry.slug}
                  title={entry.title}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 bg-brand-blue p-6 text-near-white-blue">
              <p className="type-small-body">
                Talking Points articles will appear here once they are published
                in the CMS.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-8 py-16 text-charcoal sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="type-section-title">Credits</h2>
            <p className="type-small-body mt-3 text-light-charcoal">
              Note that each author will be credited under their respective
              articles as well.
            </p>
            <ul className="mt-6 grid gap-3">
              <li className="type-small-body">
                Talking Points Repository Project Lead: Evan Simonetti
                (@legiolegionis)
              </li>
              <li className="type-small-body">
                Project Originally Envisioned by: Patrick Orave (@_linkion)
              </li>
              <li className="type-small-body">
                Cover Art Designed by: Sentimental Trash
              </li>
              <li className="type-small-body">
                Feedback Editors: Bryce (DGG Executive Director), Jacob
                (@elendacil), Pedro Peguero (@ssohpkc)
              </li>
              <li className="type-small-body">Other Editors: @marlow_kurtz</li>
            </ul>
            <div className="mt-8 grid gap-5">
              <div>
                <h3 className="type-label text-brand-blue">Immigration</h3>
                <p className="type-small-body mt-1 text-light-charcoal">
                  Author: Cameron Tomaino
                </p>
              </div>
              <div>
                <h3 className="type-label text-brand-blue">
                  How to Talk to Normies
                </h3>
                <p className="type-small-body mt-1 text-light-charcoal">
                  Authors: Evan Simonetti, @marlow_kurtz, @tseawright
                </p>
              </div>
              <div>
                <h3 className="type-label text-brand-blue">
                  Climate Change
                </h3>
                <p className="type-small-body mt-1 text-light-charcoal">
                  Authors: Jack Darko (@drdarko.), Goob (@ubeyy)
                </p>
                <p className="type-small-body mt-1 text-light-charcoal">
                  Editor: Jacob (@elendacil)
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="type-section-title">Acknowledgements</h2>
            <p className="type-small-body mt-6 text-light-charcoal">
              This project would not be possible without the guidance and
              support of DGG leadership and other team members. Kevin (Research
              Director) and Ky (Head Moderator and former Research Lead) are
              both very helpful and kind people. We must also recognize the Dev
              Team, without whom there would be no website to host this project.
              As a volunteer effort, we are grateful for any and all
              contributions that members have made and will continue to make. A
              final thank you goes to the many academic institutions currently
              trying their hardest to weather the storm of irrationality,
              selfishness, and misguided retribution.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

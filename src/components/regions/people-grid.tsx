import type { Author } from "@/lib/authors";
import Image from "next/image";

type PeopleGridProps = {
  people: Author[];
};

export function PeopleGrid({ people }: PeopleGridProps) {
  if (people.length === 0) {
    return null;
  }

  const isCompact = people.length < 3;
  const containerClassName =
    people.length === 1
      ? "mx-auto w-full max-w-sm"
      : isCompact
        ? "mx-auto w-full max-w-3xl"
        : "mx-auto w-full max-w-6xl";
  const gridClassName =
    people.length === 1
      ? "mt-8 grid justify-items-center gap-8"
      : isCompact
        ? "mt-8 grid gap-8 sm:grid-cols-2"
        : "mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="px-8 pb-16 sm:px-12 lg:px-20">
      <div className={containerClassName}>
        <h2 className="type-kicker text-center text-light-charcoal">
          Meet Our Team
        </h2>
        <div className={gridClassName}>
          {people.map((person) => (
            <article
              className="mx-auto grid max-w-sm justify-items-center gap-4 text-center text-charcoal"
              key={person.slug}
            >
              {person.picture ? (
                <Image
                  alt={person.name}
                  className="aspect-square w-44 rounded-full object-cover"
                  height={176}
                  src={person.picture}
                  width={176}
                />
              ) : null}
              <div>
                <h3 className="font-sans text-2xl font-black leading-tight">
                  {person.name}
                </h3>
                {person.orgTitle ? (
                  <p className="type-label mt-2 text-brand-blue">
                    {person.orgTitle}
                  </p>
                ) : null}
                {person.bio ? (
                  <p className="mt-2 font-roboto text-base leading-6 text-light-charcoal">
                    {person.bio}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

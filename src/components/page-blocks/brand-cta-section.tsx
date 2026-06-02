import { ButtonLink } from "@/components/widgets/button-link";
import { PixelIcon, type PixelIconName } from "@/components/widgets/pixel-icon";

type BrandCtaSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body: string[];
  cta: {
    href: string;
    icon?: PixelIconName;
    label: string;
    external?: boolean;
  };
};

export function BrandCtaSection({
  eyebrow,
  title,
  subtitle,
  body,
  cta,
}: BrandCtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-brand-blue px-8 py-16 text-near-white-blue sm:px-12 lg:px-20">
      <div
        aria-hidden="true"
        className="absolute -bottom-[78%] -left-48 aspect-square h-[180%] min-h-[36rem] rounded-full bg-dark-blue"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div>
          {eyebrow ? (
            <p className="type-label text-near-white-blue/80">{eyebrow}</p>
          ) : null}
          <h2 className="mt-4 text-5xl font-black leading-tight first:mt-0">
            {title}
          </h2>
        </div>
        <div>
          {subtitle ? (
            <h3 className="text-2xl font-black">{subtitle}</h3>
          ) : null}
          {body.map((paragraph) => (
            <p className="type-body mt-4 first:mt-0" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <ButtonLink
            className="mt-6"
            href={cta.href}
            primaryHover="black-blue"
            rel={cta.external ? "noopener noreferrer" : undefined}
            target={cta.external ? "_blank" : undefined}
          >
            {cta.icon ? (
              <PixelIcon className="h-5 w-5 shrink-0" name={cta.icon} />
            ) : null}
            {cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

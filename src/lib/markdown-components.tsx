import type { Components } from "react-markdown";
import Image from "next/image";

export function markdownComponents(invert = false): Components {
  const listMarkerClass = invert
    ? "marker:text-near-white-blue"
    : "marker:text-charcoal";
  const linkClass = invert
    ? "overflow-wrap-anywhere text-near-white-blue underline decoration-brand-blue underline-offset-2 transition hover:text-brand-blue"
    : "overflow-wrap-anywhere text-brand-blue transition hover:text-charcoal";

  return {
    h1: ({ children }) => (
      <h1 className="mt-6 text-3xl font-black leading-tight first:mt-4 font-sans">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 text-3xl font-black leading-tight font-sans">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-5 text-xl font-black leading-tight font-sans">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="overflow-wrap-anywhere mt-4 text-lg leading-7">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        className={`overflow-wrap-anywhere mt-3 list-disc space-y-2 pl-6 text-lg leading-7 ${listMarkerClass}`}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className={`overflow-wrap-anywhere mt-3 list-decimal space-y-2 pl-6 text-lg leading-7 ${listMarkerClass}`}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    a: ({ children, href }) => (
      <a
        className={linkClass}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    ),
    img: ({ alt, src }) => (
      <Image
        alt={alt ?? ""}
        className="mt-6 h-auto w-full border border-charcoal/10"
        height={643}
        src={String(src ?? "")}
        width={680}
      />
    ),
  };
}

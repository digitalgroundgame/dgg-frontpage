import type { Components } from "react-markdown";
import Image from "next/image";

export function markdownComponents(invert = false): Components {
  const listMarkerClass = invert
    ? "marker:text-near-white-blue"
    : "marker:text-charcoal";
  const linkClass = invert
    ? "overflow-wrap-anywhere text-near-white-blue underline decoration-brand-blue underline-offset-2 transition hover:text-brand-blue"
    : "overflow-wrap-anywhere text-brand-blue transition hover:text-charcoal";
  const blockquoteClass = invert
    ? "overflow-wrap-anywhere mt-5 border-l-4 border-brand-blue pl-5 text-near-white-blue/90"
    : "overflow-wrap-anywhere mt-5 border-l-4 border-brand-blue pl-5 text-charcoal/85";
  return {
    h1: ({ children }) => (
      <h1 className="mt-6 text-5xl font-black leading-tight first:mt-4 font-sans">
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
    code: ({ children }) => (
      <code className="border border-charcoal bg-white px-1.5 py-0.5 font-[ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-[0.9em] text-charcoal">
        {children}
      </code>
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
    blockquote: ({ children }) => (
      <blockquote className={blockquoteClass}>{children}</blockquote>
    ),
    hr: () => (
      <hr className="mb-9 mt-8 mx-30 border-0 border-t-1 border-[#A6B9FF]" />
    ),
    table: ({ children }) => (
      <div className="mt-6 w-full overflow-x-auto">
        <table className="mx-auto w-auto border-separate border-spacing-0 text-left text-base leading-7">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="border-b-2 border-brand-blue px-4 py-3 align-top font-black first:pl-0 last:pr-0">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 align-top first:pl-0 last:pr-0">{children}</td>
    ),
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

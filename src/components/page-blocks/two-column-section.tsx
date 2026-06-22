import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/lib/markdown-components";
import Image from "next/image";

type TwoColumnSectionProps = {
  image: string;
  alt: string;
  layout: "image-left" | "image-right";
  text: string;
  invert?: boolean;
};

export function TwoColumnSection({
  image,
  alt,
  layout,
  text,
  invert = false,
}: TwoColumnSectionProps) {
  const imageColumn = (
    <div className="overflow-hidden rounded">
      <Image
        alt={alt}
        className="h-auto w-full"
        height={900}
        sizes="(min-width: 768px) 50vw, 100vw"
        src={image}
        width={1200}
      />
    </div>
  );

  const textColumn = (
    <div className="[&>*:first-child]:mt-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents(invert)}
      >
        {text}
      </ReactMarkdown>
    </div>
  );

  return (
    <section className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
      {layout === "image-left" ? (
        <>
          {imageColumn}
          {textColumn}
        </>
      ) : (
        <>
          {textColumn}
          {imageColumn}
        </>
      )}
    </section>
  );
}

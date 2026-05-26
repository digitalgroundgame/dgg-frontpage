import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/lib/markdown-components";

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
    <div>
      <img
        src={image}
        alt={alt}
        className="w-full rounded object-cover"
      />
    </div>
  );

  const textColumn = (
    <div>
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

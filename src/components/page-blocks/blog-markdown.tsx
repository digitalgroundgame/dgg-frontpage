import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/lib/markdown-components";
import { TwoColumnSection } from "./two-column-section";
import { VideoEmbed } from "./video-embed";

const TWO_COLUMN_RE =
  /{%\s*two-column\s+image="(.*?)"\s+alt="(.*?)"\s+layout="(.*?)"\s*%}\n?([\s\S]*?)\n?{%\s*\/two-column\s*%}/;
const VIDEO_RE = /{%\s*video\s+url="(.*?)"\s+title="(.*?)"\s*%}/;
const COMPONENT_RE =
  /({%\s*two-column\s+.*?%}[\s\S]*?{%\s*\/two-column\s*%}|{%\s*video\s+.*?%})/;

type BlogMarkdownProps = {
  children: string;
  invert?: boolean;
};

function renderMarkdown(markdown: string, invert: boolean) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents(invert)}
    >
      {markdown}
    </ReactMarkdown>
  );
}

export function BlogMarkdown({ children, invert = false }: BlogMarkdownProps) {
  const parts = children.split(COMPONENT_RE);

  if (parts.length === 1) {
    return (
      <div className="font-roboto">
        {renderMarkdown(children, invert)}
      </div>
    );
  }

  return (
    <div className="font-roboto">
      {parts.map((part, i) => {
        const match = part.match(TWO_COLUMN_RE);
        if (match) {
          return (
            <TwoColumnSection
              key={i}
              image={match[1]}
              alt={match[2]}
              layout={match[3] as "image-left" | "image-right"}
              text={match[4]}
              invert={invert}
            />
          );
        }
        const videoMatch = part.match(VIDEO_RE);
        if (videoMatch) {
          return (
            <VideoEmbed key={i} url={videoMatch[1]} title={videoMatch[2]} />
          );
        }
        if (part.trim()) {
          return <div key={i}>{renderMarkdown(part, invert)}</div>;
        }
        return null;
      })}
    </div>
  );
}

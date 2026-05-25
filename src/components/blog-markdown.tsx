import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogMarkdownProps = {
  children: string;
};

export function BlogMarkdown({ children }: BlogMarkdownProps) {
  return (
    <div className="font-roboto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
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
            <p className="mt-4 text-lg leading-7">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mt-3 list-disc space-y-2 pl-6 text-lg leading-7 marker:text-charcoal">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-lg leading-7 marker:text-charcoal">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ children, href }) => (
            <a
              className="text-brand-blue transition hover:text-charcoal"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

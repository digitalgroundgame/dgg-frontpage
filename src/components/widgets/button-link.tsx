import Link from "next/link";
import { Children, isValidElement } from "react";
import { PixelIcon } from "@/components/widgets/pixel-icon";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type PrimaryHover = "blue-black" | "black-blue" | "red-black";

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  primaryHover?: PrimaryHover;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

const primaryHoverClasses: Record<PrimaryHover, string> = {
  "blue-black": "bg-brand-blue text-near-white-blue hover:bg-black",
  "black-blue": "bg-charcoal text-near-white-blue hover:bg-brand-blue",
  "red-black": "bg-accent-red text-near-white-blue hover:bg-black",
};

export function ButtonLink({
  children,
  className,
  href,
  primaryHover = "blue-black",
  ...props
}: ButtonLinkProps) {
  const childArray = Children.toArray(children);
  const hasIcon = isValidElement(childArray[0]) && childArray[0].type === PixelIcon;
  const content = hasIcon ? (
    <>
      <span className="grid w-7 place-items-center">{childArray[0]}</span>
      <span className="whitespace-nowrap">{childArray.slice(1)}</span>
    </>
  ) : (
    <span className="col-span-2 whitespace-nowrap">{children}</span>
  );
  const classes = [
    "type-button inline-grid grid-cols-[1.75rem_auto] items-center gap-2 px-5 py-3 transition",
    primaryHoverClasses[primaryHover],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href.startsWith("/")) {
    return (
      <Link className={classes} href={href} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a className={classes} href={href} {...props}>
      {content}
    </a>
  );
}

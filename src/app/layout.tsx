import type { Metadata } from "next";
import { Press_Start_2P, Roboto_Condensed, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
});

const pixelOperator = localFont({
  src: "../../public/fonts/PixelOperatorHBSC.ttf",
  variable: "--font-pixel-operator",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Digital Ground Game",
  description:
    "Digital Ground Game is a national, community-driven movement defending democracy through practical political action.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoCondensed.variable} ${roboto.variable} ${pressStart2P.variable} ${pixelOperator.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

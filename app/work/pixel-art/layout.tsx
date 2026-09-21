import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixel Art & Animation | Hexadot",
  description:
    "Explore JR Infante's pixel art and animation work, including sprite sheets, animation loops, game-ready assets, and pixel illustrations.",
};

export default function PixelArtLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

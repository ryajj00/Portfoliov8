import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work | JR Infante",
  description:
    "Explore JR Infante's selected work in digital experiences, visual systems, interactive design, and front-end development.",
};

export default function WorkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

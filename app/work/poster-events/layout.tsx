import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Poster Design | JR Infante",
  description:
    "View JR Infante's event poster designs featuring typography, branding, illustration, print production, and social adaptations.",
};

export default function PosterEventsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

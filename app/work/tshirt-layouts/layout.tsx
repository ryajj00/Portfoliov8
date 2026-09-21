import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "T-Shirt Layouts & Apparel Design | JR Infante",
  description:
    "Explore JR Infante's apparel design work, including t-shirt layouts, print placement, vector artwork, and production-ready concepts.",
};

export default function TshirtLayoutsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

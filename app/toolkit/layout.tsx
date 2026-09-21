import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolkit & Skills | JR Infante",
  description:
    "Discover the technologies, design tools, and working principles JR Infante uses to build thoughtful digital experiences.",
};

export default function ToolkitLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

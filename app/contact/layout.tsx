import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact JR Infante",
  description:
    "Get in touch with JR Infante about digital design, front-end development, visual systems, and creative projects.",
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

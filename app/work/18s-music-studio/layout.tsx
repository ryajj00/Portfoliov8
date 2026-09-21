import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "18S Music Studio Booking App | JR Infante",
  description:
    "A music studio booking experience by JR Infante with live room availability, calendar views, and a responsive interface.",
};

export default function MusicStudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

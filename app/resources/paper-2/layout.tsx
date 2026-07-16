import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIE A Level Chemistry Paper 2 Master Guide | Sep Science & Math",
  description: "The complete Cambridge 9701 Chemistry Paper 2 web guide: command words, structured-question strategies, topic priorities, worked answers and revision planning.",
};

export default function PaperTwoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

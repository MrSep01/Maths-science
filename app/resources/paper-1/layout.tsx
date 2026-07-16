import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIE A Level Chemistry Paper 1 Master Guide | Sep Science & Math",
  description: "A structured web guide to Cambridge 9701 Chemistry Paper 1: MCQ strategy, distractor analysis, topic priorities, worked examples and revision planning.",
};

export default function PaperOneLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

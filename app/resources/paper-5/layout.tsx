import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIE A Level Chemistry Paper 5 Master Guide | Sep Science & Math",
  description: "The complete Cambridge 9701 Chemistry Paper 5 web guide: planning, data analysis, graphing, conclusions, evaluation and worked answers.",
};

export default function PaperFiveLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

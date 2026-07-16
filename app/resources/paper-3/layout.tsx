import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIE A Level Chemistry Paper 3 Master Guide | Sep Science & Math",
  description: "The complete Cambridge 9701 Chemistry Paper 3 web guide: practical skills, qualitative analysis, quantitative techniques, evaluation and worked examples.",
};

export default function PaperThreeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

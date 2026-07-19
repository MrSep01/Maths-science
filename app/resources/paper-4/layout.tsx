import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIE A Level Chemistry Paper 4 Master Guide | Sep Science & Math",
  description: "The complete Cambridge 9701 Chemistry Paper 4 web guide: advanced theory, command words, calculations, mechanisms, synthesis, data analysis and worked answers.",
};

export default function PaperFourLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

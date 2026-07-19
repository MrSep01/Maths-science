import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChemistryHeader from "../ChemistryHeader";
import TopicExplorer from "../TopicExplorer";
import { isLevelKey, levelKeys, levelNames, levels } from "../data";

export function generateStaticParams() { return levelKeys.map((level) => ({ level })); }

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  if (!isLevelKey(level)) return {};
  const data = levels[level];
  return { title: `${levelNames[level]} Topics | Cambridge ${data.syllabus}`, description: `Browse every ${data.qualification} ${data.syllabus} topic and specification learning outcome for ${data.years}.` };
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  if (!isLevelKey(level)) notFound();
  const data = levels[level];
  return <main className="chemistry-page level-page">
    <ChemistryHeader />
    <section className={`level-hero level-hero-${level}`}>
      <div className="level-breadcrumb"><Link href="/resources">Resources</Link><span>›</span><Link href="/resources/chemistry-topics">Chemistry topics</Link><span>›</span><b>{levelNames[level]}</b></div>
      <div className="level-hero-grid"><div><p className="eyebrow"><span /> Cambridge {data.syllabus} · {data.years}</p><h1>{levelNames[level]}<br /><em>topic guide.</em></h1><p>{data.qualification}, organised topic by topic with every specification statement mapped to its syllabus code.</p></div><div className="level-hero-stat"><b>{data.topics.length}</b><span>topics in this level</span><small>{data.topics.reduce((sum, topic) => sum + topic.subtopics.length, 0)} specification sections</small></div></div>
    </section>
    <section className="topic-index"><TopicExplorer levelKey={level} topics={data.topics} /></section>
    <section className="syllabus-attribution"><p><b>Source and status:</b> Cambridge {data.syllabus} syllabus for {data.years}. Syllabus wording is reproduced with permission for this independent teaching resource; Cambridge International does not endorse this site.</p><Link href="/resources/chemistry-topics">Choose another level →</Link></section>
  </main>;
}


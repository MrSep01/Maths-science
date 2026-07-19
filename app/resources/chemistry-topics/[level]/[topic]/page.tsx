import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChemistryHeader from "../../ChemistryHeader";
import ProgressButton from "../../ProgressButton";
import AtomicStructureGuide from "../../AtomicStructureGuide";
import { isLevelKey, levelKeys, levelNames, levels, outcomeCount, topicSlug } from "../../data";

export function generateStaticParams() {
  return levelKeys.flatMap((level) => levels[level].topics.map((topic) => ({ level, topic: topicSlug(topic) })));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string; topic: string }> }): Promise<Metadata> {
  const { level, topic } = await params;
  if (!isLevelKey(level)) return {};
  const match = levels[level].topics.find((item) => topicSlug(item) === topic);
  if (!match) return {};
  if (level === "as" && match.number === 1) return {
    title: "AS Atomic Structure | Complete Cambridge 9701 Guide",
    description: "Learn AS Atomic Structure for Cambridge 9701 with clear notes, orbital diagrams, worked examples, ionisation-energy explanations, original questions and answers.",
  };
  return { title: `${match.number}. ${match.title} | ${levelNames[level]}`, description: `Exact Cambridge Chemistry specification learning outcomes for ${match.title}, organised by syllabus section.` };
}

function OutcomeList({ items, tone = "standard" }: { items: { number: string; text: string }[]; tone?: string }) {
  return <ol className={`spec-outcomes ${tone}`}>{items.map((item, index) => <li key={`${item.number}-${index}`}><span>{item.number}</span><p>{item.text}</p></li>)}</ol>;
}

export default async function TopicPage({ params }: { params: Promise<{ level: string; topic: string }> }) {
  const { level, topic } = await params;
  if (!isLevelKey(level)) notFound();
  const data = levels[level];
  const currentIndex = data.topics.findIndex((item) => topicSlug(item) === topic);
  if (currentIndex < 0) notFound();
  const current = data.topics[currentIndex];
  const isAtomicStructure = level === "as" && current.number === 1;
  const previous = data.topics[currentIndex - 1];
  const next = data.topics[currentIndex + 1];
  return <main className="chemistry-page topic-page">
    <ChemistryHeader />
    <section className="topic-hero">
      <div className="level-breadcrumb"><Link href="/resources/chemistry-topics">Chemistry topics</Link><span>›</span><Link href={`/resources/chemistry-topics/${level}`}>{levelNames[level]}</Link><span>›</span><b>Topic {current.number}</b></div>
      <div className="topic-hero-grid"><div><p className="eyebrow"><span /> {current.category} · Cambridge {data.syllabus}</p><h1><span>{String(current.number).padStart(2, "0")}</span>{current.title}</h1><p>{current.subtopics.length} specification sections and {outcomeCount(current)} learning outcomes from the {data.years} syllabus.</p></div><ProgressButton id={`${level}-${topic}`} /></div>
    </section>
    <div className="topic-layout">
      <aside className="topic-sidebar"><p>On this page</p>{current.subtopics.map((sub) => <a href={`#section-${sub.code.replace(".", "-")}`} key={sub.code}><span>{sub.code}</span>{sub.title}</a>)}{isAtomicStructure ? <><a className="sidebar-feature" href="#teaching-guide"><span>Learn</span>Complete teaching guide</a><a className="sidebar-feature" href="#practice"><span>Test</span>Practice and answers</a></> : null}<Link href={`/resources/chemistry-topics/${level}`}>← All {levelNames[level]} topics</Link></aside>
      <article className="specification-content">
        <div className="spec-intro"><p className="eyebrow"><span /> Official specification wording</p><h2>Candidates should<br /><em>be able to:</em></h2><p>Use each statement as a revision checkpoint. The wording below follows the Cambridge specification supplied for this course.</p></div>
        {current.subtopics.map((subtopic) => <section className="spec-section" id={`section-${subtopic.code.replace(".", "-")}`} key={subtopic.code}>
          <div className="spec-section-heading"><span>{subtopic.code}</span><h2>{subtopic.title}</h2></div>
          {subtopic.note ? <p className="spec-note">{subtopic.note}</p> : null}
          {subtopic.outcomes?.length ? <OutcomeList items={subtopic.outcomes} /> : null}
          {subtopic.core?.length ? <div className="spec-tier"><h3><span>C</span> Core</h3><OutcomeList items={subtopic.core} tone="core" /></div> : null}
          {subtopic.supplement?.length ? <div className="spec-tier supplement-tier"><h3><span>S</span> Supplement</h3><OutcomeList items={subtopic.supplement} tone="supplement" /></div> : null}
        </section>)}
        {isAtomicStructure ? <AtomicStructureGuide /> : null}
        <nav className="topic-pagination">
          {previous ? <Link href={`/resources/chemistry-topics/${level}/${topicSlug(previous)}`}><span>← Previous topic</span><b>{previous.number}. {previous.title}</b></Link> : <span />}
          {next ? <Link className="next" href={`/resources/chemistry-topics/${level}/${topicSlug(next)}`}><span>Next topic →</span><b>{next.number}. {next.title}</b></Link> : <span />}
        </nav>
      </article>
    </div>
  </main>;
}

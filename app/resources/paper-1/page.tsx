"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import fullGuide from "./paper1-content.json";

const BOOKING_URL = "https://calendar.app.google/DxK139MN3MRwXxJ6A";
const STORAGE_KEY = "sep-paper-1-progress";

type GuideSection = {
  id: string;
  number: string;
  title: string;
  intro: string;
  chapters: string[];
  formats: string[];
};

const sections: GuideSection[] = [
  {
    id: "introduction",
    number: "01",
    title: "INTRODUCTION TO PAPER 1",
    intro: "Understand the role, format and assessment demands of the multiple-choice paper before applying the question strategies.",
    chapters: ["What is Cambridge A Level Chemistry Paper 1?", "Paper 1 Format: What to Expect", "Assessment Objectives in Paper 1 MCQs", "The Anatomy of a Cambridge MCQ: Understanding the Structure"],
    formats: ["Paper overview", "Format tables", "MCQ anatomy"],
  },
  {
    id: "distractors",
    number: "02",
    title: "ANATOMY OF AN MCQ — DISTRACTORS DECODED",
    intro: "Learn how incorrect options are constructed, then use a repeatable decision process to test every possible answer.",
    chapters: ["How Cambridge Designs Chemistry Distractors", "The 5-Step MCQ Decision Process for Chemistry", "Worked Examples: Distractor Analysis"],
    formats: ["Distractor types", "5-step process", "Worked examples"],
  },
  {
    id: "past-paper-analysis",
    number: "03",
    title: "PAST PAPER ANALYSIS 2018–2025",
    intro: "Use eight years of paper analysis to see how topics, question types and specific concepts recur across examination sessions.",
    chapters: ["Overview: 8 Years of Cambridge Chemistry Paper 1", "Year-by-Year Topic Distribution (2018–2025)", "MCQ Question Type Analysis (2018–2025)", "Most Frequently Tested Specific Concepts (2018–2025)"],
    formats: ["Data tables", "Topic distribution", "Question-type analysis"],
  },
  {
    id: "heatmap",
    number: "04",
    title: "MCQ TOPIC FREQUENCY HEATMAP",
    intro: "Turn the frequency analysis into a visual priority map for deciding where revision time is most likely to have an impact.",
    chapters: ["Visual Priority Heatmap — Paper 1 Topics"],
    formats: ["Interactive heatmap", "Priority key", "Revision focus"],
  },
  {
    id: "answering-strategies",
    number: "05",
    title: "MCQ ANSWERING STRATEGIES",
    intro: "Apply a strategy suited to the particular demand of each MCQ rather than treating every question in the same way.",
    chapters: ["Why Chemistry MCQ Is Different From Structured Questions", "Strategy 1: The Prediction Method", "Strategy 2: The Elimination Framework", "Strategy 3: Handling Data, Graphs & Calculation MCQs", "Strategy 4: Negative Stem Questions", "Strategy 5: Time Management in Paper 1"],
    formats: ["Strategy cards", "Decision prompts", "Timing guidance"],
  },
  {
    id: "topic-priority",
    number: "06",
    title: "CHAPTER-BY-CHAPTER MCQ PRIORITY GUIDE",
    intro: "Review each syllabus area through its priority rating, typical frequency, essential knowledge and common MCQ targets.",
    chapters: ["Topic 2: Atoms, Molecules & Stoichiometry", "Topic 3: Chemical Bonding", "Topic 1: Atomic Structure", "Topic 5: Chemical Energetics", "Topic 7: Equilibria (Including Acids & Bases)", "Topics 16–18: Hydroxy Compounds, Carbonyl Compounds & Carboxylic Acids", "Topics 13–15: Introduction to Organic Chemistry, Hydrocarbons & Halogen Compounds", "Topic 4: States of Matter", "Topic 6: Electrochemistry (Redox)", "Topic 8: Reaction Kinetics", "Topic 9: The Periodic Table: Chemical Periodicity", "Topics 10–12: Group 2, Group 17 & Nitrogen/Sulfur", "Topics 19–22: Nitrogen Compounds, Polymerisation, Organic Synthesis & Analytical Techniques"],
    formats: ["Priority ratings", "Essential knowledge", "Examiner tips"],
  },
  {
    id: "worked-examples",
    number: "07",
    title: "WORKED MCQ EXAMPLES — ALL TOPICS",
    intro: "Follow complete examples that reveal the reasoning process, the correct choice and the failure point behind each distractor.",
    chapters: ["How to Use These Examples", "Topic 2: Stoichiometry", "Topic 3: Chemical Bonding", "Topic 5: Chemical Energetics", "Topic 7: Equilibria", "Topic 3: Intermolecular Forces", "Topic 14: Organic — Alkenes", "Topic 1: Atomic Structure — Successive Ionisation Energies", "Topic 15: Halogenoalkanes — Mechanism", "Topic 22: Analytical — Infrared Spectroscopy"],
    formats: ["Question", "Reasoning", "Distractor analysis"],
  },
  {
    id: "predicted-topics",
    number: "08",
    title: "PREDICTED TOPICS FOR NEXT SESSION",
    intro: "See how predictions are formed from the documented pattern analysis and distinguish confidence levels clearly.",
    chapters: ["Prediction Methodology for Paper 1", "Medium-Confidence Predictions"],
    formats: ["Methodology", "Prediction table", "Confidence key"],
  },
  {
    id: "revision-plan",
    number: "09",
    title: "4-WEEK REVISION PLAN",
    intro: "Move from foundation topics to timed full papers with a week-by-week sequence of focused study and review.",
    chapters: ["How to Revise for Paper 1", "Week 1: Foundation — Critical Topics (2, 3, 13–15)", "Week 2: Foundation — High Priority Topics (1, 5, 7, 16–18)", "Week 3: Moderate Topics + Data MCQ Mastery (4, 6, 8, 9, 10–12, 19–22)", "Week 4: Peak Performance — Full Papers & Predicted Topics"],
    formats: ["Weekly plan", "Daily tasks", "Progress checks"],
  },
  {
    id: "exam-day",
    number: "10",
    title: "EXAM DAY STRATEGIES",
    intro: "Use a disciplined routine before and during the paper to protect time, accuracy and decision quality under pressure.",
    chapters: ["Before You Enter the Exam Hall", "Opening Protocol: The First 5 Minutes", "In-Exam Discipline: The Non-Negotiable Rules", "The A* MCQ Mindset"],
    formats: ["Preparation checklist", "Opening protocol", "Exam discipline"],
  },
  {
    id: "appendix",
    number: "A",
    title: "QUICK REFERENCE APPENDIX",
    intro: "Keep the highest-use comparisons, reaction summaries, reagents, formulae and grade targets together for rapid review.",
    chapters: ["Master Comparison Tables", "1. Bonding Types — Summary", "2. Reaction Mechanism Summary — AS Level Organic", "3. Reagents for Oxidation of Organic Compounds", "4. Key Formulae for Paper 1 Calculations", "5. Paper 1 Grade Boundary Targets"],
    formats: ["Comparison tables", "Formula sheet", "Rapid reference"],
  },
];

function SectionOneContent() {
  return (
    <div className="section-one-content">
      <section className="guide-content-block">
        <h3>What is Cambridge A Level Chemistry Paper 1?</h3>
        <p>Cambridge International A Level Chemistry (9701) Paper 1 is the Multiple Choice paper. It consists of 40 questions, each with four options (A, B, C, D), worth 1 mark each, for a total of 40 marks. Paper 1 accounts for 15.5% of your final A Level grade, or 31% of your AS Level grade. It is sat alongside Paper 2 in the AS Level assessment pathway.</p>
        <p>Paper 1 tests the same AS Level content (Topics 1–22) as Paper 2 — but through a completely different format. Because every question has exactly one correct answer and three distractors (plausible but incorrect options), success in Paper 1 depends on both the depth of your chemical knowledge AND your ability to reason carefully between options under time pressure. There is NO negative marking — every unanswered question is a missed mark.</p>
        <div className="guide-table-wrap">
          <table className="guide-data-table six-column-table">
            <thead><tr><th>Paper</th><th>Description</th><th>Duration</th><th>Marks</th><th>AO</th><th>% of A Level</th></tr></thead>
            <tbody>
              <tr className="current-paper-row"><td>Paper 1</td><td>Multiple Choice — AS Level Content — THIS GUIDE</td><td>1h 15m</td><td>40</td><td>AO1/2</td><td>15.5%</td></tr>
              <tr><td>Paper 2</td><td>AS Level Structured Questions</td><td>1h 15m</td><td>60</td><td>AO1/2</td><td>23%</td></tr>
              <tr><td>Paper 3</td><td>Advanced Practical Skills</td><td>2h</td><td>40</td><td>AO3</td><td>11.5%</td></tr>
              <tr><td>Paper 4</td><td>A Level Structured Questions</td><td>2h</td><td>100</td><td>AO1/2</td><td>38.5%</td></tr>
              <tr><td>Paper 5</td><td>Planning, Analysis &amp; Evaluation</td><td>1h 15m</td><td>30</td><td>AO3</td><td>11.5%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guide-content-block">
        <h3>Paper 1 Format: What to Expect</h3>
        <div className="guide-table-wrap">
          <table className="guide-data-table feature-table">
            <thead><tr><th>Feature</th><th>Detail</th></tr></thead>
            <tbody>
              <tr><td>Total questions</td><td>40 multiple choice questions</td></tr>
              <tr><td>Answer options</td><td>Four options per question: A, B, C, D. Exactly one is correct.</td></tr>
              <tr><td>Marks</td><td>1 mark per correct answer. 40 marks total.</td></tr>
              <tr><td>Negative marking</td><td>NONE. Never leave a question blank — always attempt every question.</td></tr>
              <tr><td>Time</td><td>1 hour 15 minutes = 75 minutes. Approximately 1 minute 52 seconds per question.</td></tr>
              <tr><td>Syllabus coverage</td><td>AS Level content only: Topics 1–22 (same as Paper 2)</td></tr>
              <tr><td>Assessment objectives</td><td>AO1 (Knowledge &amp; Understanding) and AO2 (Handling &amp; Applying Information)</td></tr>
              <tr><td>Question difficulty spread</td><td>Approximately 30% straightforward recall, 40% application, 30% analysis/calculation</td></tr>
              <tr><td>Answer sheet</td><td>Lozenges filled with HB pencil. Erase cleanly if you change your mind.</td></tr>
            </tbody>
          </table>
        </div>
        <aside className="guide-callout key-fact-callout">
          <div className="guide-callout-title"><span>!</span><b>KEY FACT</b></div>
          <div className="guide-callout-items">
            <p>No negative marking: if you are unsure, always eliminate what you can and guess from the remaining options. A blank is ALWAYS zero marks. A guess gives you at least a 25% chance of a mark.</p>
            <p>Paper 1 tests both recall (AO1) and application (AO2). Roughly half the questions require you to apply chemical knowledge to an unfamiliar context, data or calculation — not just recall facts.</p>
            <p>The answer sheet is machine-read. Fill lozenges completely and erase cleanly. Ambiguous marks may not be read correctly.</p>
            <p>Chemistry Paper 1 has a HIGHER proportion of calculation-based MCQs compared to Biology — approximately 8–12 per paper require some arithmetic. Practise mental arithmetic and significant figures.</p>
          </div>
        </aside>
      </section>

      <section className="guide-content-block">
        <h3>Assessment Objectives in Paper 1 MCQs</h3>
        <p>Cambridge designs Paper 1 questions to test both AO1 and AO2 in roughly equal measure (50% each for Papers 1 and 2). Understanding which AO is being tested helps you recognise the strategy required.</p>
        <div className="guide-table-wrap">
          <table className="guide-data-table ao-table">
            <thead><tr><th>AO</th><th>What It Tests</th><th>How It Appears in Paper 1 MCQs</th></tr></thead>
            <tbody>
              <tr><td><strong>AO1</strong><span>Knowledge &amp; Understanding</span></td><td>Recall of chemical facts, definitions, equations, structures, trends</td><td>Question stem directly asks about a chemical fact: &apos;Which of the following is a feature of a coordinate bond?&apos; — requires recall only</td></tr>
              <tr><td><strong>AO2</strong><span>Handling &amp; Applying</span></td><td>Interpret data, apply concepts to new situations, predict outcomes, calculate values, analyse graphs</td><td>Question stem provides experimental data, a graph, a titration result, or an unfamiliar molecule: &apos;A gas occupies 2.0 dm³ at 300 K and 100 kPa. What is its mass if its Mr is 44?&apos; — requires calculation and reasoning</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="guide-content-block">
        <h3>The Anatomy of a Cambridge MCQ: Understanding the Structure</h3>
        <div className="guide-table-wrap">
          <table className="guide-data-table anatomy-table">
            <thead><tr><th>Component</th><th>Technical Name</th><th>What It Contains</th></tr></thead>
            <tbody>
              <tr><td>The question</td><td><strong>Stem</strong></td><td>The chemical scenario, context, or direct question. May include a diagram, equation, graph, or data table. This defines exactly what is being tested.</td></tr>
              <tr><td>The correct answer</td><td><strong>Key</strong></td><td>Exactly one option that is unambiguously correct according to Cambridge&apos;s mark scheme.</td></tr>
              <tr><td>The wrong answers (×3)</td><td><strong>Distractors</strong></td><td>Three plausible but incorrect options. Cambridge designs distractors to catch specific misconceptions. If you understand WHY each distractor is wrong, you understand the chemistry deeply.</td></tr>
            </tbody>
          </table>
        </div>
        <aside className="guide-callout examiner-callout">
          <div className="guide-callout-title"><span>✓</span><b>EXAMINER TIP</b></div>
          <div className="guide-callout-items">
            <p>Cambridge&apos;s chemistry distractors are not random — they are engineered. Each distractor corresponds to a specific common error or misconception. When you get an MCQ wrong, always identify WHICH distractor you chose and WHY it seemed correct. This is the most valuable revision activity for Paper 1.</p>
            <p>If two options seem both correct, you are almost certainly misreading one of them. Re-read more carefully — Cambridge always has only one defensible answer.</p>
            <p>Chemistry Paper 1 distractors frequently exploit: unit errors (cm³ vs dm³), sign errors (ΔH positive vs negative), direction errors (increase vs decrease in equilibrium), and formula recall errors. These account for over 40% of all student errors.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}

type SourceBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "table"; rows: string[][] };

function sourceTableClass(rows: string[][]) {
  const first = rows[0]?.[0] || "";
  if (first.startsWith("🔑 KEY FACT")) return "source-callout source-key-fact";
  if (first.startsWith("✅ EXAMINER TIP")) return "source-callout source-examiner-tip";
  if (first.startsWith("❌ AVOID THIS ERROR")) return "source-callout source-avoid-error";
  if (first.startsWith("♟️ MCQ STRATEGY")) return "source-callout source-strategy";
  if (first.startsWith("🧪 WORKED MCQ EXAMPLE")) return "source-worked-example";
  if (first.startsWith("🔮 PREDICTION")) return "source-callout source-prediction";
  if (/^TOPICS? \d/.test(first)) return "source-topic-table";
  return "source-standard-table";
}

function SourceContent({ blocks }: { blocks: SourceBlock[] }) {
  return (
    <div className="source-content">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 1) return <h2 className="source-heading-one" key={index}>{block.text}</h2>;
          if (block.level === 2) return <h3 className="source-heading-two" key={index}>{block.text}</h3>;
          return <h4 className="source-heading-three" key={index}>{block.text}</h4>;
        }
        if (block.type === "paragraph") return <p className="source-paragraph" key={index}>{block.text}</p>;

        const tableClass = sourceTableClass(block.rows);
        const isCallout = tableClass.includes("source-callout");
        return (
          <div className={`source-table-wrap ${tableClass}`} key={index}>
            <table className="source-table">
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      const Cell = rowIndex === 0 ? "th" : "td";
                      return <Cell key={cellIndex} colSpan={isCallout && row.length === 1 ? Math.max(block.rows[0]?.length || 1, 1) : undefined}>{cell}</Cell>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default function PaperOneGuide() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) frame = window.requestAnimationFrame(() => setCompleted(saved));
    } catch { /* Ignore invalid local progress data. */ }
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleComplete(id: string) {
    setCompleted((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  const progress = Math.round((completed.length / sections.length) * 100);

  return (
    <main className="paper-guide-page">
      <header className="site-header paper-guide-header">
        <Link className="brand" href="/" aria-label="Sep Science and Math home"><span className="brand-mark">S</span><span>Sep Science <i>&amp;</i> Math</span></Link>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          <Link href="/">Home</Link><Link className="nav-current" href="/resources">Resources</Link><a href="#guide-contents">Contents</a><a href="#study-support">Study support</a>
        </nav>
        <a className="button button-small header-cta" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a consultation <span>↗</span></a>
      </header>

      <section className="paper-guide-hero" id="top">
        <div className="paper-guide-breadcrumb"><Link href="/resources">Resources</Link><span>›</span><b>Paper 1</b></div>
        <div className="paper-guide-hero-grid">
          <div>
            <p className="eyebrow"><span /> CIE A Level Chemistry · 9701</p>
            <h1>Paper 1<br /><em>Master Guide</em></h1>
            <p className="paper-guide-lead">Multiple-choice strategy, distractor analysis, topic priorities, worked examples and a complete route from first review to exam day.</p>
            <div className="paper-guide-actions"><a className="button" href="#guide-contents">Start the guide <span>↓</span></a><Link className="button button-outline" href="/resources">All resources <span>→</span></Link></div>
          </div>
          <div className="paper-one-cover original-guide-cover">
            <Image src="/paper-1-master-guide-cover.png" alt="Original Cambridge A Level Chemistry Paper 1 Master Revision Guide cover" width={1414} height={2000} priority />
          </div>
        </div>
        <div className="paper-stat-row">
          <div><b>40</b><span>Multiple-choice questions</span></div><div><b>40</b><span>Total marks</span></div><div><b>10 + A</b><span>Guide sections</span></div><div><b>2018–2025</b><span>Analysis period</span></div>
        </div>
      </section>

      <section className="source-front-matter" aria-label="Original Paper 1 guide front matter">
        <div className="source-front-heading"><p className="eyebrow"><span /> Original guide front matter</p><h2>Title and complete<br /><em>table of contents.</em></h2></div>
        <SourceContent blocks={fullGuide.frontMatter as SourceBlock[]} />
      </section>

      <section className="guide-shell" id="guide-contents">
        <aside className="guide-sidebar">
          <div className="guide-progress"><div><span>Your guide progress</span><b>{progress}%</b></div><i><span style={{ width: `${progress}%` }} /></i><small>Saved on this device</small></div>
          <nav aria-label="Paper 1 table of contents">
            <p>Table of contents</p>
            {sections.map((section) => <a href={`#${section.id}`} key={section.id} className={completed.includes(section.id) ? "is-complete" : ""}><span>{completed.includes(section.id) ? "✓" : section.number}</span>{section.title}</a>)}
          </nav>
        </aside>

        <div className="guide-main">
          <div className="guide-introduction">
            <p className="eyebrow"><span /> Complete guide structure</p>
            <h2>Work through the paper<br /><em>in a deliberate order.</em></h2>
            <p>The original guide hierarchy is preserved below. Mark a section complete as you work; your progress stays on this device.</p>
          </div>

          {sections.map((section) => (
            <section className={`guide-module ${completed.includes(section.id) ? "module-complete" : ""}`} id={section.id} key={section.id}>
              <div className="guide-module-heading"><span>{section.number}</span><div><p>{section.id === "appendix" ? "Appendix" : `Section ${Number(section.number)}`}</p><h2>{section.title}</h2></div></div>
              <p className="guide-module-intro">{section.intro}</p>
              <div className="guide-format-tags">{section.formats.map((format) => <span key={format}>{format}</span>)}</div>
              {section.id === "introduction" ? <SectionOneContent /> : (
                <SourceContent blocks={(fullGuide.sections.find((sourceSection) => sourceSection.id === section.id)?.blocks || []) as SourceBlock[]} />
              )}
              <button className="complete-button" type="button" onClick={() => toggleComplete(section.id)}>{completed.includes(section.id) ? <><span>✓</span> Section completed</> : <><span>○</span> Mark section complete</>}</button>
            </section>
          ))}
        </div>
      </section>

      <section className="paper-support-cta" id="study-support">
        <div><p className="eyebrow light"><span /> Personal Paper 1 support</p><h2>Use the guide.<br /><em>Then target the gaps.</em></h2></div>
        <div><p>Bring your recent results or a completed paper to a consultation. We can identify the concepts, distractor patterns and timing decisions costing the most marks.</p><a className="button paper-support-button" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a free consultation <span>↗</span></a></div>
      </section>

      <footer>
        <Link className="brand footer-brand" href="/"><span className="brand-mark">S</span><span>Sep Science <i>&amp;</i> Math</span></Link>
        <p>CIE A Level Chemistry resources for international-school students.</p>
        <div><Link href="/">Home</Link><Link href="/resources">Resources</Link><a href="#top">Back to top</a><a href={BOOKING_URL} target="_blank" rel="noreferrer">Book</a></div>
        <small>© {new Date().getFullYear()} Sep Science &amp; Math. All rights reserved.</small>
      </footer>
    </main>
  );
}

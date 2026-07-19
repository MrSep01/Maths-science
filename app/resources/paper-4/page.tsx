"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import fullGuide from "./paper4-content.json";

const BOOKING_URL = "https://calendar.app.google/DxK139MN3MRwXxJ6A";
const STORAGE_KEY = "sep-paper-4-progress";

type SourceBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "table"; rows: string[][] };

function sourceTableClass(rows: string[][]) {
  const first = rows[0]?.[0] || "";
  if (first.startsWith("🔑 KEY FACT")) return "source-callout source-key-fact";
  if (first.startsWith("✅ EXAMINER TIP")) return "source-callout source-examiner-tip";
  if (first.startsWith("❌ AVOID THIS ERROR")) return "source-callout source-avoid-error";
  if (first.startsWith("✍️ ANSWERING STRATEGY")) return "source-callout source-strategy";
  if (first.startsWith("🏆 MARK SCHEME LANGUAGE")) return "source-callout source-mark-language";
  if (first.startsWith("📝 WORKED ANSWER")) return "source-worked-example";
  if (first.startsWith("🔮 PREDICTION")) return "source-callout source-prediction";
  if (/^SKILL(?::| \d)/.test(first)) return "source-topic-table source-skill-table";
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
        return (
          <div className={`source-table-wrap ${tableClass}`} key={index}>
            <table className="source-table"><tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((cell, cellIndex) => {
                  const Cell = rowIndex === 0 ? "th" : "td";
                  return <Cell key={cellIndex}>{cell}</Cell>;
                })}</tr>
              ))}
            </tbody></table>
          </div>
        );
      })}
    </div>
  );
}

function displaySectionTitle(title: string) {
  return title.replace(/^SECTION \d+:\s*/, "");
}

function sectionNumber(id: string) {
  return id === "appendix" ? "A" : id.replace("section-", "").padStart(2, "0");
}

export default function PaperFourGuide() {
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

  const progress = Math.round((completed.length / fullGuide.sections.length) * 100);

  return (
    <main className="paper-guide-page paper-four-page">
      <header className="site-header paper-guide-header">
        <Link className="brand" href="/" aria-label="Sep Science and Math home"><span className="brand-mark">S</span><span>Sep Science <i>&amp;</i> Math</span></Link>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation"><Link href="/">Home</Link><Link className="nav-current" href="/resources">Resources</Link><a href="#guide-contents">Contents</a><a href="#study-support">Study support</a></nav>
        <a className="button button-small header-cta" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a consultation <span>↗</span></a>
      </header>

      <section className="paper-guide-hero" id="top">
        <div className="paper-guide-breadcrumb"><Link href="/resources">Resources</Link><span>›</span><b>Paper 4</b></div>
        <div className="paper-guide-hero-grid">
          <div>
            <p className="eyebrow"><span /> CIE A Level Chemistry · 9701</p>
            <h1>Paper 4<br /><em>Master Guide</em></h1>
            <p className="paper-guide-lead">The complete guide to advanced A Level structured questions, command words, synoptic reasoning, calculations, mechanisms, synthesis and unfamiliar data.</p>
            <div className="paper-guide-actions"><a className="button" href="#guide-contents">Start the guide <span>↓</span></a><Link className="button button-outline" href="/resources">All resources <span>→</span></Link></div>
          </div>
          <div className="paper-one-cover original-guide-cover"><Image src="/paper-4-master-guide-cover.png" alt="Original Cambridge A Level Chemistry Paper 4 Master Revision Guide cover" width={1414} height={2000} priority /></div>
        </div>
        <div className="paper-stat-row"><div><b>100</b><span>Total marks</span></div><div><b>2 hours</b><span>Examination time</span></div><div><b>10 + A</b><span>Guide sections</span></div><div><b>2018–2025</b><span>Analysis period</span></div></div>
      </section>

      <section className="source-front-matter" aria-label="Original Paper 4 guide front matter">
        <div className="source-front-heading"><p className="eyebrow"><span /> Original guide front matter</p><h2>Title and complete<br /><em>table of contents.</em></h2></div>
        <SourceContent blocks={fullGuide.frontMatter as SourceBlock[]} />
      </section>

      <section className="guide-shell" id="guide-contents">
        <aside className="guide-sidebar">
          <div className="guide-progress"><div><span>Your guide progress</span><b>{progress}%</b></div><i><span style={{ width: `${progress}%` }} /></i><small>Saved on this device</small></div>
          <nav aria-label="Paper 4 table of contents"><p>Table of contents</p>{fullGuide.sections.map((section) => <a href={`#${section.id}`} key={section.id} className={completed.includes(section.id) ? "is-complete" : ""}><span>{completed.includes(section.id) ? "✓" : sectionNumber(section.id)}</span>{displaySectionTitle(section.title)}</a>)}</nav>
        </aside>

        <div className="guide-main">
          <div className="guide-introduction"><p className="eyebrow"><span /> Complete original guide</p><h2>Connect the concepts.<br /><em>Write for the marks.</em></h2><p>Every source paragraph and table is presented below in its original order. Mark sections complete as you work; progress is saved on this device.</p></div>
          {fullGuide.sections.map((section) => (
            <section className={`guide-module ${completed.includes(section.id) ? "module-complete" : ""}`} id={section.id} key={section.id}>
              <div className="guide-module-heading"><span>{sectionNumber(section.id)}</span><div><p>{section.id === "appendix" ? "Appendix" : `Section ${Number(section.id.replace("section-", ""))}`}</p><h2>{displaySectionTitle(section.title)}</h2></div></div>
              <SourceContent blocks={section.blocks as SourceBlock[]} />
              <button className="complete-button" type="button" onClick={() => toggleComplete(section.id)}>{completed.includes(section.id) ? <><span>✓</span> Section completed</> : <><span>○</span> Mark section complete</>}</button>
            </section>
          ))}
        </div>
      </section>

      <section className="paper-support-cta" id="study-support"><div><p className="eyebrow light"><span /> Personal Paper 4 support</p><h2>Turn advanced knowledge<br /><em>into a scoring answer.</em></h2></div><div><p>Use a recent Paper 4 response to identify weaknesses in synoptic reasoning, multi-stage calculations, mechanisms, synthesis, data interpretation and mark-scheme language.</p><a className="button paper-support-button" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a free consultation <span>↗</span></a></div></section>

      <footer><Link className="brand footer-brand" href="/"><span className="brand-mark">S</span><span>Sep Science <i>&amp;</i> Math</span></Link><p>CIE A Level Chemistry resources for international-school students.</p><div><Link href="/">Home</Link><Link href="/resources">Resources</Link><a href="#top">Back to top</a><a href={BOOKING_URL} target="_blank" rel="noreferrer">Book</a></div><small>© {new Date().getFullYear()} Sep Science &amp; Math. All rights reserved.</small></footer>
    </main>
  );
}

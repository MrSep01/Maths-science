"use client";

import { useState } from "react";
import Link from "next/link";

const BOOKING_URL = "https://calendar.app.google/DxK139MN3MRwXxJ6A";
const EMAIL = "sep.alamouti@sepalamouti.com";

const guides = [
  {
    paper: "Paper 1",
    title: "Multiple Choice Master Guide",
    level: "AS & A Level",
    format: "40 MCQs · 40 marks",
    description: "A complete guide to MCQ anatomy, distractor design, decision-making and efficient exam technique.",
    chapters: ["Distractors decoded", "5-step MCQ decision process", "Past-paper analysis 2018–2025", "Topic-frequency heatmap", "Chapter-by-chapter priority guide"],
    accent: "resource-blue",
    next: true,
    href: "/resources/paper-1",
  },
  {
    paper: "Paper 2",
    title: "AS Structured Questions Master Guide",
    level: "AS Level",
    format: "Structured questions · 60 marks",
    description: "Build precise responses through command words, calculation methods, extended answers and mark-scheme language.",
    chapters: ["Command words decoded", "Read–Decode–Plan–Answer", "Calculation and explanation strategies", "Past-paper topic analysis", "Structured-question priority guide"],
    accent: "resource-coral",
    href: "/resources/paper-2",
  },
  {
    paper: "Paper 3",
    title: "Advanced Practical Skills Master Guide",
    level: "AS & A Level",
    format: "Laboratory practical · AO3",
    description: "A practical-skills guide covering data collection, recording, interpretation, qualitative analysis and quantitative techniques.",
    chapters: ["Data collection and quality", "Tables and graphs", "Errors and improvements", "Qualitative analysis masterclass", "Titration and quantitative techniques"],
    accent: "resource-lime",
    href: "/resources/paper-3",
  },
  {
    paper: "Paper 4",
    title: "A Level Structured Questions Master Guide",
    level: "A Level",
    format: "Advanced theory · 100 marks",
    description: "Advanced support for synoptic questions, multi-stage calculations, mechanisms, synthesis and unfamiliar data.",
    chapters: ["Advanced command words", "Multipart question navigation", "Mechanisms and synthesis", "Data and novel contexts", "Worked answers across A Level topics"],
    accent: "resource-coral",
  },
  {
    paper: "Paper 5",
    title: "Planning, Analysis & Evaluation Master Guide",
    level: "A Level",
    format: "Written practical skills · 30 marks",
    description: "Plan investigations, process data, interpret graphs and evaluate experimental methods with scientific precision.",
    chapters: ["Defining the problem", "Writing a complete method", "Graphs and data analysis", "Error analysis and improvements", "Extended planning worked examples"],
    accent: "resource-blue",
    href: "/resources/paper-5",
  },
];

export default function Resources() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="resources-page">
      <header className="site-header resources-header">
        <Link className="brand" href="/" aria-label="Sep Science and Math home">
          <span className="brand-mark">S</span>
          <span>Sep Science <i>&amp;</i> Math</span>
        </Link>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span /><span />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          <Link href="/#subjects">Subjects</Link>
          <Link href="/#programmes">Programmes</Link>
          <Link className="nav-current" href="/resources">Resources</Link>
          <Link href="/#about">About Sep</Link>
        </nav>
        <a className="button button-small header-cta" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a consultation <span>↗</span></a>
      </header>

      <section className="resources-hero">
        <div className="resources-hero-copy reveal">
          <p className="eyebrow"><span /> CIE A Level Chemistry</p>
          <h1>Study with a clearer<br /><em>exam strategy.</em></h1>
          <p>Five focused Master Guides designed to help students understand each paper, recognise recurring demands and turn knowledge into marks.</p>
          <div className="resource-levels"><span>Cambridge 9701</span><span>AS Level</span><span>A Level</span></div>
          <a className="button" href="#master-guides">Explore the Master Guides <span>↓</span></a>
        </div>
        <div className="guide-stack reveal delay-one" aria-label="Five Chemistry Master Guides">
          {[5, 4, 3, 2, 1].map((paper) => <div className={`guide-sheet sheet-${paper}`} key={paper}><small>CIE A LEVEL CHEMISTRY</small><b>Paper {paper}</b><span>Master Guide</span></div>)}
          <div className="guide-orbit" aria-hidden="true"><i /><i /><i /><b /></div>
        </div>
      </section>

      <section className="resource-promise" aria-label="Resource features">
        <div><b>5</b><span>Complete paper guides</span></div>
        <div><b>2018–2025</b><span>Past-paper analysis</span></div>
        <div><b>Web-first</b><span>Readable on every device</span></div>
        <div><b>Exam-focused</b><span>Strategies and worked examples</span></div>
      </section>

      <section className="resource-library" id="master-guides">
        <div className="resource-library-heading">
          <div>
            <p className="eyebrow"><span /> Master Guide library</p>
            <h2>Choose the paper<br /><em>you are preparing for.</em></h2>
          </div>
          <p>Each web guide will preserve the complete original Master Guide while making its chapters, tables, examples and revision tools easier to navigate online.</p>
        </div>

        <div className="resource-grid">
          {guides.map((guide) => (
            <article className={`resource-card ${guide.accent} ${guide.next ? "resource-featured" : ""}`} key={guide.paper}>
              <div className="resource-card-top">
                <span className="paper-number">{guide.paper.replace("Paper ", "P")}</span>
                <span className="level-badge">{guide.level}</span>
              </div>
              <p className="resource-kicker">{guide.paper}</p>
              <h3>{guide.title}</h3>
              <p className="resource-format">{guide.format}</p>
              <p className="resource-description">{guide.description}</p>
              <details>
                <summary>What the guide covers <span>+</span></summary>
                <ul>{guide.chapters.map((chapter) => <li key={chapter}>{chapter}</li>)}</ul>
              </details>
              <div className="resource-status">
                <span>{guide.href ? "Complete web guide" : "Web guide planned"}</span>
                {guide.href ? <Link className="resource-open" href={guide.href}>Open guide <b>→</b></Link> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resource-method">
        <div>
          <p className="eyebrow light"><span /> Built for purposeful revision</p>
          <h2>More than notes.<br /><em>A route through the paper.</em></h2>
        </div>
        <div className="method-grid">
          <article><span>01</span><h3>Understand the paper</h3><p>Start with the format, assessment objectives and the anatomy of the questions.</p></article>
          <article><span>02</span><h3>Recognise patterns</h3><p>Use past-paper analysis and topic heatmaps to focus revision intelligently.</p></article>
          <article><span>03</span><h3>Apply the strategy</h3><p>Work through methods, examples and exam-language guidance step by step.</p></article>
        </div>
      </section>

      <section className="resource-cta">
        <div>
          <p className="eyebrow"><span /> Need individual support?</p>
          <h2>Turn the guide into<br /><em>a personal study plan.</em></h2>
        </div>
        <div>
          <p>Book a free consultation to discuss the student’s current paper, priorities and preparation timeline.</p>
          <a className="button" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a consultation <span>↗</span></a>
        </div>
      </section>

      <footer>
        <Link className="brand footer-brand" href="/"><span className="brand-mark">S</span><span>Sep Science <i>&amp;</i> Math</span></Link>
        <p>Specialist tutoring for international-school students in Bangkok and across Asia.</p>
        <div><Link href="/">Home</Link><Link href="/resources">Resources</Link><a href={BOOKING_URL} target="_blank" rel="noreferrer">Book</a><a href={`mailto:${EMAIL}`}>Email</a></div>
        <small>© {new Date().getFullYear()} Sep Science &amp; Math. All rights reserved.</small>
      </footer>
    </main>
  );
}

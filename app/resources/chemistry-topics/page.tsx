import type { Metadata } from "next";
import Link from "next/link";
import ChemistryHeader from "./ChemistryHeader";
import { levelKeys, levelNames, levels } from "./data";

export const metadata: Metadata = {
  title: "Cambridge Chemistry Topics & Syllabus | IGCSE, AS & A2",
  description: "Explore Cambridge IGCSE 0620 and AS & A Level 9701 Chemistry by topic, with every syllabus learning outcome organised for clear revision.",
};

const BOOKING_URL = "https://calendar.app.google/DxK139MN3MRwXxJ6A";

export default function ChemistryTopicsHub() {
  return (
    <main className="chemistry-page">
      <ChemistryHeader />
      <section className="chemistry-hub-hero">
        <div>
          <p className="eyebrow"><span /> Cambridge Chemistry topic library</p>
          <h1>The syllabus,<br /><em>made navigable.</em></h1>
          <p>Move from the exact specification to the topic you need—without hunting through a long PDF. Every section is organised for IGCSE, AS and A2 students.</p>
          <div className="hub-actions"><a className="button" href="#choose-level">Choose your level <span>↓</span></a><Link className="text-button" href="/resources">View paper guides <span>→</span></Link></div>
        </div>
        <div className="syllabus-map" aria-label="Chemistry syllabus map">
          <div className="map-core"><span>49</span><b>syllabus topics</b><small>IGCSE · AS · A2</small></div>
          <div className="map-node node-one">Physical</div><div className="map-node node-two">Inorganic</div><div className="map-node node-three">Organic</div><div className="map-node node-four">Analysis</div>
        </div>
      </section>
      <section className="hub-benefits"><div><b>Specification-led</b><span>Exact learning outcomes, clearly grouped</span></div><div><b>Searchable</b><span>Find a topic or syllabus code quickly</span></div><div><b>Revision-ready</b><span>Track topics as you review them</span></div></section>
      <section className="level-library" id="choose-level">
        <div className="level-library-heading"><div><p className="eyebrow"><span /> Choose your course</p><h2>Start at the right<br /><em>level and specification.</em></h2></div><p>IGCSE follows the 2026–2028 syllabus. AS and A2 use the future Cambridge 9701 syllabus for 2028–2030, separated into the content students study at each stage.</p></div>
        <div className="level-card-grid">
          {levelKeys.map((key, index) => {
            const level = levels[key];
            const sectionCount = level.topics.reduce((sum, topic) => sum + topic.subtopics.length, 0);
            return <Link href={`/resources/chemistry-topics/${key}`} className={`level-card level-${key}`} key={key}>
              <div className="level-card-top"><span>0{index + 1}</span><b>{level.syllabus} · {level.years}</b></div>
              <p>{level.qualification}</p><h3>{levelNames[key]}</h3>
              <div className="level-stats"><span><b>{level.topics.length}</b> topics</span><span><b>{sectionCount}</b> sections</span></div>
              <strong>Browse the specification <span>→</span></strong>
            </Link>;
          })}
        </div>
      </section>
      <section className="chemistry-source-note"><div><p className="eyebrow light"><span /> Designed for independent study</p><h2>Know exactly what<br /><em>you need to learn.</em></h2></div><div><p>The specification wording is presented in a clean, student-friendly structure. Use it as a checklist, then connect each topic to Sep’s paper guides and personalised tutoring support.</p><a className="button button-light" href={BOOKING_URL} target="_blank" rel="noreferrer">Build a study plan <span>↗</span></a></div></section>
      <footer><Link className="brand footer-brand" href="/"><span className="brand-mark">S</span><span>Sep Science <i>&amp;</i> Math</span></Link><p>Specialist tutoring for international-school students in Bangkok and across Asia.</p><div><Link href="/">Home</Link><Link href="/resources">Paper guides</Link><Link href="/resources/chemistry-topics">Chemistry topics</Link></div><small>Cambridge syllabus wording reproduced with permission. This independent resource is not endorsed by Cambridge International.</small></footer>
    </main>
  );
}


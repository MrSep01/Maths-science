"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ChemistryHeader from "../chemistry-topics/ChemistryHeader";
import { levels, type LevelKey, type Outcome } from "../chemistry-topics/data";
import { questionBank } from "./question-bank";

type Kind = "mcq" | "theory" | "practical" | "analysis";
type Paper = { id: string; title: string; kind: Kind; route: string };
type Focus = Outcome & { id: string; subtopic: string; tier: string };
type Difficulty = "Foundation" | "Standard" | "Challenge";
type Question = { stem: string; marks: number; paper: string; spec: string; answer: string; options?: string[]; correct?: number; lines: number; ao?: string; curated?: boolean };

const paperMap: Record<LevelKey, Paper[]> = {
  igcse: [
    { id: "P1", title: "Paper 1 · Multiple Choice (Core)", kind: "mcq", route: "Core" },
    { id: "P2", title: "Paper 2 · Multiple Choice (Extended)", kind: "mcq", route: "Extended" },
    { id: "P3", title: "Paper 3 · Theory (Core)", kind: "theory", route: "Core" },
    { id: "P4", title: "Paper 4 · Theory (Extended)", kind: "theory", route: "Extended" },
    { id: "P5", title: "Paper 5 · Practical Test", kind: "practical", route: "Both" },
    { id: "P6", title: "Paper 6 · Alternative to Practical", kind: "analysis", route: "Both" },
  ],
  as: [
    { id: "P1", title: "Paper 1 · Multiple Choice", kind: "mcq", route: "AS" },
    { id: "P2", title: "Paper 2 · AS Structured Questions", kind: "theory", route: "AS" },
    { id: "P3", title: "Paper 3 · Advanced Practical Skills", kind: "practical", route: "AS" },
  ],
  a2: [
    { id: "P4", title: "Paper 4 · A Level Structured Questions", kind: "theory", route: "A2" },
    { id: "P5", title: "Paper 5 · Planning, Analysis and Evaluation", kind: "analysis", route: "A2" },
  ],
};
const labels: Record<LevelKey, string> = { igcse: "IGCSE", as: "AS Level", a2: "A2 Level" };
const asPracticalTopics = new Set([2,5,6,7,8,9,10,11,12,15,16,17,18,19,21,22]);
const a2AnalysisTopics = new Set([23,24,25,26,27,28,36,37]);

function paperMatchesTopic(level: LevelKey, topicNumber: number, paper: Paper) {
  if (level === "as" && paper.id === "P3") return asPracticalTopics.has(topicNumber);
  if (level === "a2" && paper.id === "P5") return a2AnalysisTopics.has(topicNumber);
  return true;
}

function topicOutcomes(level: LevelKey, index: number, route: string): Focus[] {
  const topic = levels[level].topics[index];
  if (!topic) return [];
  return topic.subtopics.flatMap((sub) => {
    if (level === "igcse") {
      const core = (sub.core || []).map((o) => ({ ...o, id: `${sub.code}.${o.number}`, subtopic: sub.title, tier: "Core" }));
      const supplement = (sub.supplement || []).map((o) => ({ ...o, id: `${sub.code}.${o.number}`, subtopic: sub.title, tier: "Supplement" }));
      return route === "Core" ? core : [...core, ...supplement];
    }
    return (sub.outcomes || []).map((o) => ({ ...o, id: `${sub.code}.${o.number}`, subtopic: sub.title, tier: level === "as" ? "AS" : "A2" }));
  });
}

function altered(text: string) {
  const swaps: [RegExp, string][] = [[/increase/i,"decrease"],[/decrease/i,"increase"],[/higher/i,"lower"],[/lower/i,"higher"],[/same/i,"different"],[/positive/i,"negative"],[/strong/i,"weak"],[/exothermic/i,"endothermic"]];
  for (const [a,b] of swaps) if (a.test(text)) return text.replace(a,b);
  return `It is not necessary to ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

function makeQuestion(f: Focus, paper: Paper, index: number): Question {
  if (paper.kind === "mcq") {
    const correct = f.text.replace(/[.]$/, "");
    const raw = [correct, altered(correct), `Only partly true: ${correct.toLowerCase()}`, `The opposite relationship applies to ${f.subtopic.toLowerCase()}`];
    const shift = index % 4, options = [...raw.slice(shift), ...raw.slice(0,shift)];
    return { stem: `Which statement about ${f.subtopic.toLowerCase()} is correct?`, options, correct: options.indexOf(correct), marks: 1, paper: paper.id, spec: f.id, answer: correct, lines: 0 };
  }
  if (paper.kind === "practical") return { stem: `Plan a practical procedure that allows a student to investigate or demonstrate this specification focus: ${f.text}. Include apparatus, measurements, control variables and relevant safety precautions.`, marks: 6, paper: paper.id, spec: f.id, answer: `Award credit for a workable method, appropriate apparatus and measurements, controlled variables, relevant safety and a valid link to ${f.id}.`, lines: 8 };
  if (paper.kind === "analysis") return { stem: `A student collects results connected to ${f.subtopic.toLowerCase()}. Describe the expected pattern, explain the chemistry and state how the reliability or validity of the conclusion could be improved.`, marks: 5, paper: paper.id, spec: f.id, answer: `Credit a valid trend, an explanation grounded in “${f.text}”, and a specific improvement linked to data quality.`, lines: 7 };
  const command = f.text.split(" ")[0].toLowerCase();
  const qMarks = ["state","identify","name","define"].includes(command) ? 2 : ["calculate","deduce","determine"].includes(command) ? 4 : 3;
  return { stem: `${f.text.replace(/[.]$/, "")}.`, marks: qMarks, paper: paper.id, spec: f.id, answer: `The response should accurately address: ${f.text}`, lines: qMarks + 1 };
}

export default function WorksheetGenerator() {
  const [level,setLevel] = useState<LevelKey>("igcse");
  const [route,setRoute] = useState("Extended");
  const [paperIds,setPaperIds] = useState(["P2","P4"]);
  const [topicIndex,setTopicIndex] = useState(0);
  const [selected,setSelected] = useState<string[]>([]);
  const [marks,setMarks] = useState(30);
  const [title,setTitle] = useState("Cambridge Chemistry Topic Practice");
  const [teacher,setTeacher] = useState("Mr Sep");
  const [includeScheme,setIncludeScheme] = useState(true);
  const [difficulty,setDifficulty] = useState<Difficulty>("Standard");
  const [questions,setQuestions] = useState<Question[]>([]);
  const [preview,setPreview] = useState(false);
  const data = levels[level];
  const topicNumber = data.topics[topicIndex]?.number || 1;
  const availablePapers = paperMap[level].filter(p => (p.route === "Both" || p.route === route) && paperMatchesTopic(level,topicNumber,p));
  const focus = useMemo(() => topicOutcomes(level,topicIndex,route),[level,topicIndex,route]);
  const chosen = selected.length ? focus.filter(f => selected.includes(f.id)) : focus;

  function chooseLevel(next: LevelKey) {
    const nextRoute = next === "igcse" ? "Extended" : next === "as" ? "AS" : "A2";
    setLevel(next); setRoute(nextRoute); setPaperIds(paperMap[next].filter(p => p.route === "Both" || p.route === nextRoute).slice(0,2).map(p => p.id)); setTopicIndex(0); setSelected([]); setQuestions([]); setPreview(false);
  }
  function chooseRoute(next: string) {
    setRoute(next); setPaperIds(paperMap[level].filter(p => p.route === "Both" || p.route === next).slice(0,2).map(p => p.id)); setSelected([]);
  }
  function chooseTopic(nextIndex: number) {
    const nextNumber = data.topics[nextIndex]?.number || 1;
    const valid = paperMap[level].filter(p => (p.route === "Both" || p.route === route) && paperMatchesTopic(level,nextNumber,p));
    setTopicIndex(nextIndex); setSelected([]);
    setPaperIds(current => {
      const retained = current.filter(id => valid.some(p => p.id === id));
      return retained.length ? retained : valid.slice(0,1).map(p => p.id);
    });
  }
  function generate() {
    const active = availablePapers.filter(p => paperIds.includes(p.id));
    if (!active.length || !chosen.length) return;
    const result: Question[] = []; let total = 0, cursor = 0;
    const allowedDifficulty = difficulty === "Foundation" ? ["Foundation"] : difficulty === "Standard" ? ["Foundation","Standard"] : ["Foundation","Standard","Challenge"];
    const curated = questionBank.filter(q => q.level === level && q.topic === topicNumber && paperIds.includes(q.paper) && chosen.some(f => f.id === q.spec) && allowedDifficulty.includes(q.difficulty));
    for (const item of curated) {
      if (total >= marks) break;
      const qMarks = Math.min(item.marks,marks-total);
      result.push({ ...item, marks:qMarks, lines:item.options?0:item.marks+2, curated:true });
      total += qMarks;
    }
    while (total < marks && cursor < 160) {
      const q = makeQuestion(chosen[cursor % chosen.length],active[cursor % active.length],cursor);
      q.marks = Math.min(q.marks,marks-total); result.push(q); total += q.marks; cursor++;
    }
    setQuestions(result); setPreview(true);
  }
  const total = questions.reduce((n,q) => n+q.marks,0);

  return <main className="worksheet-site-page">
    <div className="worksheet-no-print"><ChemistryHeader /></div>
    {!preview ? <>
      <section className="worksheet-builder-hero"><div><p className="eyebrow"><span /> Cambridge chemistry worksheet studio</p><h1>Build focused practice.<br/><em>Keep every sheet consistent.</em></h1><p>Create original student worksheets from individual Cambridge IGCSE, AS or A2 specification statements, using paper styles that match the selected assessment route.</p></div><div className="worksheet-hero-card"><small>GENERATOR STATUS</small><b>Specification connected</b><span>{data.syllabus} · {data.years}</span><div><i/> Paper rules active</div><div><i/> Mark scheme included</div><div><i/> Print-ready format</div></div></section>
      <section className="worksheet-builder">
        <div className="worksheet-step"><Step n="01" title="Choose the curriculum" text="The syllabus controls every topic and specification statement shown below."/><div className="worksheet-level-tabs">{(["igcse","as","a2"] as LevelKey[]).map(k => <button className={level===k?"active":""} onClick={()=>chooseLevel(k)} key={k}><b>{labels[k]}</b><small>Chemistry {levels[k].syllabus}</small></button>)}</div><div className="worksheet-form-row"><label>Syllabus version<input value={`${data.syllabus} · ${data.years}`} readOnly/></label><label>Assessment route<select value={route} onChange={e=>chooseRoute(e.target.value)}>{level==="igcse"?<><option>Core</option><option>Extended</option></>:<option>{level==="as"?"AS":"A2"}</option>}</select></label><label>Target marks<div className="worksheet-mark-control"><button onClick={()=>setMarks(Math.max(10,marks-5))}>−</button><b>{marks}</b><button onClick={()=>setMarks(Math.min(100,marks+5))}>+</button></div></label></div><p className="worksheet-field-title">Paper styles <small>Select one or combine several</small></p><div className="worksheet-paper-grid">{availablePapers.map(p=><button className={paperIds.includes(p.id)?"active":""} key={p.id} onClick={()=>setPaperIds(ids=>ids.includes(p.id)?ids.length===1?ids:ids.filter(id=>id!==p.id):[...ids,p.id])}><i>{paperIds.includes(p.id)?"✓":""}</i><span><b>{p.title}</b><small>{p.kind} questions</small></span></button>)}</div></div>
        <div className="worksheet-step"><Step n="02" title="Select the specification focus" text="Use the complete topic or choose individual learning outcomes."/><label>Topic<select value={topicIndex} onChange={e=>chooseTopic(Number(e.target.value))}>{data.topics.map((t,i)=><option value={i} key={t.number}>{t.number}. {t.title}</option>)}</select></label><div className="worksheet-outcome-toolbar"><div><b>{data.topics[topicIndex]?.title}</b><small>{focus.length} eligible statements</small></div><button onClick={()=>setSelected(selected.length===focus.length?[]:focus.map(f=>f.id))}>{selected.length===focus.length?"Clear selection":"Select all"}</button></div><div className="worksheet-outcomes">{focus.map(item=><label className={selected.includes(item.id)?"active":""} key={`${item.id}-${item.tier}`}><input type="checkbox" checked={selected.includes(item.id)} onChange={()=>setSelected(ids=>ids.includes(item.id)?ids.filter(id=>id!==item.id):[...ids,item.id])}/><b>{item.id}</b><span>{item.text}<small>{item.subtopic} · {item.tier}</small></span></label>)}</div>{!selected.length&&<p className="worksheet-selection-note">No individual outcomes selected—the complete eligible topic will be used.</p>}</div>
        <div className="worksheet-step"><Step n="03" title="Set the worksheet details" text="The locked design template stays consistent across every level and topic."/><div className="worksheet-form-row three-settings"><label>Worksheet title<input value={title} onChange={e=>setTitle(e.target.value)}/></label><label>Teacher or department<input value={teacher} onChange={e=>setTeacher(e.target.value)}/></label><label>Challenge profile<select value={difficulty} onChange={e=>setDifficulty(e.target.value as Difficulty)}><option>Foundation</option><option>Standard</option><option>Challenge</option></select></label></div><label className="worksheet-switch-row">Include a separate teacher mark scheme <button className={includeScheme?"active":""} onClick={()=>setIncludeScheme(!includeScheme)}><i/></button></label></div>
        <div className="worksheet-generate-bar"><div><b>{chosen.length} specification statement{chosen.length===1?"":"s"}</b><span>{paperIds.length} paper style{paperIds.length===1?"":"s"} · {marks} marks</span></div><button onClick={generate}>Generate worksheet <span>→</span></button></div>
      </section>
    </>:<section className="worksheet-preview-wrap"><div className="worksheet-preview-actions worksheet-no-print"><div><p className="eyebrow"><span/> Worksheet ready</p><h1>Review before printing.</h1></div><div><button onClick={()=>setPreview(false)}>← Edit settings</button><button className="primary" onClick={()=>window.print()}>Print / Save PDF</button></div></div><WorksheetPaper {...{title,teacher,level,route,paperIds,marks:total,questions}}/>{includeScheme&&<MarkScheme {...{title,teacher,level,route,paperIds,marks:total,questions}}/>}</section>}
    <div className="worksheet-no-print worksheet-back-link"><Link href="/resources">← Return to all Chemistry resources</Link></div>
  </main>;
}

function Step({n,title,text}:{n:string;title:string;text:string}) { return <div className="worksheet-step-heading"><span>{n}</span><div><h2>{title}</h2><p>{text}</p></div></div> }
type PaperProps={title:string;teacher:string;level:LevelKey;route:string;paperIds:string[];marks:number;questions:Question[]};
function PaperHeader(p:Omit<PaperProps,"questions">) { return <header className="generated-paper-header"><div className="generated-paper-brand"><span>S</span><div><small>SEP SCIENCE &amp; MATH</small><b>{levels[p.level].qualification} · {levels[p.level].syllabus}</b></div></div><div className="generated-paper-tags"><span>{levels[p.level].years}</span><span>{p.route}</span><span>{p.paperIds.join(" + ")}</span></div><h1>{p.title}</h1><div className="generated-student-fields"><span>Name: <i/></span><span>Class: <i/></span><span>Date: <i/></span></div><div className="generated-paper-meta"><span>Prepared by {p.teacher}</span><span>Original practice worksheet</span><b>{p.marks} marks</b></div></header> }
function WorksheetPaper(p:PaperProps) { return <article className="generated-paper"><PaperHeader {...p}/><div className="generated-instructions"><b>Instructions</b><span>Answer all questions. Show all working. Include units where required and use precise chemical terminology.</span></div><div className="generated-questions">{p.questions.map((q,n)=><div className="generated-question" key={`${q.spec}-${n}`}><b className="generated-number">{n+1}</b><div><div className="generated-tags"><span>{q.paper}</span><span>Specification {q.spec}</span>{q.ao&&<span>{q.ao}</span>}{q.curated&&<span className="curated-tag">Reviewed bank</span>}</div><p>{q.stem}</p>{q.options?<div className="generated-options">{q.options.map((o,i)=><div key={i}><b>{String.fromCharCode(65+i)}</b><span>{o}</span></div>)}</div>:<div className="generated-lines">{Array.from({length:q.lines},(_,i)=><i key={i}/>)}</div>}<strong>[{q.marks}]</strong></div></div>)}</div><footer><span>Teacher-created practice · Not an official Cambridge International paper</span><b>Total: {p.marks} marks</b></footer></article> }
function MarkScheme(p:PaperProps) { return <article className="generated-paper generated-mark-scheme"><PaperHeader {...p} title={`Mark Scheme · ${p.title}`}/><div className="generated-mark-answers">{p.questions.map((q,n)=><div key={n}><b>{n+1}</b><p>{q.options&&q.correct!==undefined?`${String.fromCharCode(65+q.correct)} · `:""}{q.answer}<small>Specification {q.spec} · {q.paper} · [{q.marks}]</small></p></div>)}</div><footer><span>Teacher review is required before student release.</span><b>Total: {p.marks} marks</b></footer></article> }

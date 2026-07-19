"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LevelKey, Topic } from "./data";
import { outcomeCount, topicSlug } from "./data";

export default function TopicExplorer({ levelKey, topics }: { levelKey: LevelKey; topics: Topic[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");
  const categories = ["All topics", ...Array.from(new Set(topics.map((topic) => topic.category)))];
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return topics.filter((topic) => {
      const matchesCategory = category === "All topics" || topic.category === category;
      const searchable = `${topic.number} ${topic.title} ${topic.category} ${topic.subtopics.map((sub) => `${sub.code} ${sub.title}`).join(" ")}`.toLowerCase();
      return matchesCategory && (!search || searchable.includes(search));
    });
  }, [category, query, topics]);

  return (
    <>
      <div className="topic-tools">
        <label className="topic-search"><span>Search the syllabus</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by topic, keyword or syllabus code" /></label>
        <div className="category-filters" aria-label="Filter by chemistry area">
          {categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}
        </div>
      </div>
      <p className="topic-result-count">Showing {filtered.length} of {topics.length} topics</p>
      <div className="topic-index-grid">
        {filtered.map((topic) => (
          <Link className="topic-index-card" href={`/resources/chemistry-topics/${levelKey}/${topicSlug(topic)}`} key={topic.number}>
            <div className="topic-card-meta"><span>{String(topic.number).padStart(2, "0")}</span><b>{topic.category}</b></div>
            <h2>{topic.title}</h2>
            <p>{topic.subtopics.length} specification sections · {outcomeCount(topic)} learning outcomes</p>
            <div className="subtopic-preview">{topic.subtopics.slice(0, 3).map((sub) => <span key={sub.code}>{sub.code} {sub.title}</span>)}</div>
            <strong>Open topic <span>→</span></strong>
          </Link>
        ))}
      </div>
      {filtered.length === 0 ? <div className="topic-empty"><b>No matching topics.</b><p>Try a broader keyword or choose “All topics”.</p></div> : null}
    </>
  );
}

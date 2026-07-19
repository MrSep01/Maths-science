"use client";

import { useEffect, useState } from "react";

export default function ProgressButton({ id }: { id: string }) {
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setComplete(localStorage.getItem(`sep-topic-${id}`) === "complete"), 0);
    return () => window.clearTimeout(timer);
  }, [id]);
  function toggle() {
    const next = !complete;
    setComplete(next);
    if (next) localStorage.setItem(`sep-topic-${id}`, "complete");
    else localStorage.removeItem(`sep-topic-${id}`);
  }
  return <button className={`progress-button ${complete ? "complete" : ""}`} onClick={toggle}><span>{complete ? "✓" : "○"}</span>{complete ? "Marked as reviewed" : "Mark topic as reviewed"}</button>;
}

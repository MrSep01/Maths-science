import content from "./spec-content.json";

export type Outcome = { number: string; text: string };
export type Subtopic = {
  code: string;
  title: string;
  note?: string;
  outcomes?: Outcome[];
  core?: Outcome[];
  supplement?: Outcome[];
};
export type Topic = {
  number: number;
  title: string;
  level: string;
  category: string;
  subtopics: Subtopic[];
};
export type Level = {
  qualification: string;
  syllabus: string;
  years: string;
  topics: Topic[];
};

export const levels = content as Record<"igcse" | "as" | "a2", Level>;
export const levelKeys = ["igcse", "as", "a2"] as const;
export type LevelKey = (typeof levelKeys)[number];

export const levelNames: Record<LevelKey, string> = {
  igcse: "IGCSE Chemistry",
  as: "AS Level Chemistry",
  a2: "A2 Chemistry",
};

export function isLevelKey(value: string): value is LevelKey {
  return levelKeys.includes(value as LevelKey);
}

export function topicSlug(topic: Topic) {
  return `${topic.number}-${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export function outcomeCount(topic: Topic) {
  return topic.subtopics.reduce(
    (total, subtopic) => total + (subtopic.outcomes?.length || 0) + (subtopic.core?.length || 0) + (subtopic.supplement?.length || 0),
    0,
  );
}


import { assistantChunks, type AssistantChunk } from "@/data/assistantKnowledge";
import type { RetrievedChunk } from "@/lib/server/rag/types";

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "are",
  "you",
  "his",
  "him",
  "what",
  "who",
  "how",
  "why",
  "can",
  "with",
  "about",
  "tell",
  "me",
  "your",
  "that",
  "this",
  "from",
]);

export type RetrievalResult = {
  chunks: readonly AssistantChunk[];
  maxScore: number;
  totalScore: number;
  isRelevant: boolean;
};

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\w\s.-]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2)
    .filter((word) => !STOP_WORDS.has(word));
}

function expandTerms(terms: readonly string[]): string[] {
  const expanded = new Set(terms);

  if (
    terms.includes("best") ||
    terms.includes("strong") ||
    terms.includes("strength") ||
    terms.includes("good")
  ) {
    expanded.add("strength");
    expanded.add("frontend");
    expanded.add("fullstack");
    expanded.add("product");
    expanded.add("systems");
    expanded.add("hire");
    expanded.add("value");
  }

  if (
    terms.includes("built") ||
    terms.includes("build") ||
    terms.includes("made") ||
    terms.includes("work")
  ) {
    expanded.add("projects");
    expanded.add("featured");
    expanded.add("mindmesh");
  }

  if (terms.includes("do") || terms.includes("does") || terms.includes("doing")) {
    expanded.add("strength");
    expanded.add("skills");
    expanded.add("projects");
    expanded.add("stack");
  }

  if (terms.includes("she") || terms.includes("her")) {
    expanded.add("nur");
    expanded.add("junaina");
    expanded.add("profile");
    expanded.add("skills");
  }
  if (
    terms.includes("job") ||
    terms.includes("jobs") ||
    terms.includes("worked") ||
    terms.includes("work") ||
    terms.includes("where") ||
    terms.includes("before") ||
    terms.includes("previous") ||
    terms.includes("past") ||
    terms.includes("company") ||
    terms.includes("companies")
  ) {
    expanded.add("experience");
    expanded.add("employment");
    expanded.add("internship");
    expanded.add("internships");
    expanded.add("roles");
    expanded.add("workplace");
    expanded.add("workplaces");
    expanded.add("itsolera");
    expanded.add("act");
    expanded.add("act international");
  }
  if (
    terms.includes("tech") ||
    terms.includes("stack") ||
    terms.includes("technical") ||
    terms.includes("technologies") ||
    terms.includes("tools") ||
    terms.includes("skills")
  ) {
    expanded.add("technical");
    expanded.add("frontend");
    expanded.add("backend");
    expanded.add("database");
    expanded.add("cloud");
    expanded.add("devops");
    expanded.add("ai");
    expanded.add("ml");
    expanded.add("react");
    expanded.add("nextjs");
    expanded.add("typescript");
    expanded.add("node");
    expanded.add("express");
    expanded.add("fastapi");
    expanded.add("postgresql");
    expanded.add("prisma");
    expanded.add("aws");
    expanded.add("docker");
    expanded.add("vercel");
  }
  return [...expanded];
}

function scoreChunk(questionTerms: readonly string[], chunk: AssistantChunk): number {
  const searchableText = [chunk.id, chunk.title, chunk.text, chunk.keywords.join(" ")]
    .join(" ")
    .toLowerCase();

  return questionTerms.reduce((score, term) => {
    if (chunk.keywords.includes(term)) return score + 5;
    if (chunk.id.toLowerCase().includes(term)) return score + 3;
    if (chunk.title.toLowerCase().includes(term)) return score + 3;
    if (searchableText.includes(term)) return score + 1;

    return score;
  }, 0);
}

export function retrieveRelevantContext(question: string): RetrievalResult {
  const terms = expandTerms(tokenize(question));

  if (terms.length === 0) {
    return {
      chunks: [],
      maxScore: 0,
      totalScore: 0,
      isRelevant: false,
    };
  }

  const ranked: RetrievedChunk[] = assistantChunks
    .map((chunk) => ({
      chunk,
      score: scoreChunk(terms, chunk),
    }))
    .sort((a, b) => b.score - a.score);

  const matches = ranked.filter((item) => item.score > 0).slice(0, 5);

  const maxScore = matches[0]?.score ?? 0;
  const totalScore = matches.reduce((sum, item) => sum + item.score, 0);

  return {
    chunks: matches.map((item) => item.chunk),
    maxScore,
    totalScore,
    isRelevant: maxScore >= 0 || totalScore >= 5,
  };
}

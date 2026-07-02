import { assistantChunks, type AssistantChunk } from "@/data/assistantKnowledge";
import type { RetrievedChunk } from "@/lib/server/rag/types";

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "are",
  "you",
  "her",
  "she",
  "his",
  "him",
  "what",
  "who",
  "how",
  "why",
  "can",
  "does",
  "with",
  "about",
  "tell",
  "me",
  "your",
  "that",
  "this",
  "from",
]);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\w\s.-]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2)
    .filter((word) => !STOP_WORDS.has(word));
}

function scoreChunk(questionTerms: readonly string[], chunk: AssistantChunk): number {
  const text = `${chunk.title} ${chunk.text} ${chunk.keywords.join(" ")}`.toLowerCase();

  return questionTerms.reduce((score, term) => {
    if (chunk.keywords.includes(term)) return score + 5;
    if (text.includes(term)) return score + 2;
    return score;
  }, 0);
}

export function retrieveRelevantChunks(question: string): readonly AssistantChunk[] {
  const terms = tokenize(question);

  if (terms.length === 0) {
    return assistantChunks.slice(0, 4);
  }

  const ranked: RetrievedChunk[] = assistantChunks
    .map((chunk) => ({
      chunk,
      score: scoreChunk(terms, chunk),
    }))
    .sort((a, b) => b.score - a.score);

  const matches = ranked
    .filter((item) => item.score > 0)
    .slice(0, 5)
    .map((item) => item.chunk);

  if (matches.length > 0) {
    return matches;
  }

  return assistantChunks.slice(0, 4);
}

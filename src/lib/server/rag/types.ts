import type { AssistantChunk } from "@/data/assistantKnowledge";

export type RetrievedChunk = {
  chunk: AssistantChunk;
  score: number;
};

export type BuildAssistantPromptInput = {
  question: string;
  chunks: readonly AssistantChunk[];
};

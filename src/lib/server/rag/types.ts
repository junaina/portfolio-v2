import type { AssistantChunk } from "@/data/assistantKnowledge";

export type RetrievedChunk = {
  chunk: AssistantChunk;
  score: number;
};

export type AssistantConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export type BuildAssistantPromptInput = {
  question: string;
  chunks: readonly AssistantChunk[];
  history?: readonly AssistantConversationMessage[];
};

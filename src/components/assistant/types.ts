export type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type AssistantPrompt = {
  label: string;
  value: string;
};

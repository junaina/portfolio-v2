export type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type AssistantPrompt = {
  label: string;
  value: string;
};

export type AssistantApiSuccess = {
  answer: string;
  sources?: string[];
};

export type AssistantApiError = {
  error: string;
};

export type AssistantApiResponse = AssistantApiSuccess | AssistantApiError;

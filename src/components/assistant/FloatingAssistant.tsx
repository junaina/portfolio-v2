import { useEffect, useMemo, useState } from "react";
import AssistantButton from "@/components/assistant/AssistantButton";
import AssistantPanel from "@/components/assistant/AssistantPanel";
import type {
  AssistantApiResponse,
  AssistantMessage,
  AssistantPrompt,
} from "@/components/assistant/types";

function createId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function sendAssistantMessage(message: string): Promise<string> {
  const response = await fetch("/api/assistant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = (await response.json()) as AssistantApiResponse;

  if (!response.ok || "error" in data) {
    return "The assistant is temporarily unavailable. You can still use the Closing Credits section for email, LinkedIn, GitHub, and CV links.";
  }

  return data.answer;
}

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const prompts = useMemo<readonly AssistantPrompt[]>(
    () => [
      {
        label: "Stack?",
        value: "What is her tech stack?",
      },
      {
        label: "Projects",
        value: "Tell me about her projects.",
      },
      {
        label: "Why hire her?",
        value: "Why should someone hire her?",
      },
      {
        label: "Contact",
        value: "How can I contact her?",
      },
    ],
    [],
  );

  const [messages, setMessages] = useState<readonly AssistantMessage[]>([
    {
      id: "initial-assistant-message",
      role: "assistant",
      content:
        "Ask me about Junaina’s projects, stack, experience, CV, or contact details.",
    },
  ]);

  useEffect(() => {
    function handleOpenAssistant() {
      setIsOpen(true);
    }

    window.addEventListener("open-assistant", handleOpenAssistant);

    return () => {
      window.removeEventListener("open-assistant", handleOpenAssistant);
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function submitMessage(message: string) {
    const cleanMessage = message.trim();

    if (!cleanMessage || isLoading) return;

    const userMessage: AssistantMessage = {
      id: createId(),
      role: "user",
      content: cleanMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsOpen(true);
    setIsLoading(true);

    try {
      const answer = await sendAssistantMessage(cleanMessage);

      const assistantMessage: AssistantMessage = {
        id: createId(),
        role: "assistant",
        content: answer,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch {
      const fallbackMessage: AssistantMessage = {
        id: createId(),
        role: "assistant",
        content:
          "Something went wrong while reaching Junaina.AI. Please try again in a moment.",
      };

      setMessages((current) => [...current, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    void submitMessage(input);
  }

  function handlePromptSelect(value: string) {
    void submitMessage(value);
  }

  return (
    <>
      <AssistantButton isOpen={isOpen} onClick={() => setIsOpen((value) => !value)} />

      {isOpen && (
        <AssistantPanel
          messages={messages}
          prompts={prompts}
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onPromptSelect={handlePromptSelect}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

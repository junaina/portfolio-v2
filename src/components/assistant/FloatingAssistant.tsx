import { useEffect, useMemo, useState } from "react";
import AssistantButton from "@/components/assistant/AssistantButton";
import AssistantPanel from "@/components/assistant/AssistantPanel";
import type { AssistantMessage, AssistantPrompt } from "@/components/assistant/types";

function createId(): string {
  return crypto.randomUUID();
}

function getDemoReply(input: string): string {
  const question = input.toLowerCase();

  if (question.includes("stack") || question.includes("tech")) {
    return "Day 5 will connect this to a real AI API. The assistant will answer from Junaina’s CV, projects, and portfolio details.";
  }

  if (question.includes("project")) {
    return "I’ll soon be able to explain Junaina’s featured projects, including MindMesh and cloud/AI work, using a small RAG-style knowledge base.";
  }

  if (question.includes("contact") || question.includes("hire")) {
    return "You can use the Closing Credits section for email, LinkedIn, GitHub, and CV links.";
  }

  return "This is the visual shell for NJ.AI. The real API-backed assistant gets integrated on Day 5.";
}

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

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
      id: createId(),
      role: "assistant",
      content: "Ask me about Junaina’s projects, stack, experience, or contact details.",
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

  function submitMessage(message: string) {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    const userMessage: AssistantMessage = {
      id: createId(),
      role: "user",
      content: cleanMessage,
    };

    const assistantMessage: AssistantMessage = {
      id: createId(),
      role: "assistant",
      content: getDemoReply(cleanMessage),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
    setIsOpen(true);
  }

  function handleSubmit() {
    submitMessage(input);
  }

  function handlePromptSelect(value: string) {
    submitMessage(value);
  }

  return (
    <>
      <AssistantButton isOpen={isOpen} onClick={() => setIsOpen((value) => !value)} />

      {isOpen && (
        <AssistantPanel
          messages={messages}
          prompts={prompts}
          input={input}
          onInputChange={setInput}
          onPromptSelect={handlePromptSelect}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

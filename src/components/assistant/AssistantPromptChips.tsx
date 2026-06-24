import type { AssistantPrompt } from "@/components/assistant/types";

type AssistantPromptChipsProps = {
  prompts: readonly AssistantPrompt[];
  onSelect: (value: string) => void;
};

export default function AssistantPromptChips({
  prompts,
  onSelect,
}: AssistantPromptChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt.value}
          type="button"
          onClick={() => onSelect(prompt.value)}
          className="border-gold/25 text-gold-muted hover:border-gold hover:text-gold rounded-full border px-3 py-2 font-mono text-[0.62rem] tracking-[0.16em] uppercase transition-colors"
        >
          {prompt.label}
        </button>
      ))}
    </div>
  );
}

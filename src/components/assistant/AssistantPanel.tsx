import AssistantInput from "@/components/assistant/AssistantInput";
import AssistantMessages from "@/components/assistant/AssistantMessages";
import AssistantPromptChips from "@/components/assistant/AssistantPromptChips";
import type { AssistantMessage, AssistantPrompt } from "@/components/assistant/types";

type AssistantPanelProps = {
  messages: readonly AssistantMessage[];
  prompts: readonly AssistantPrompt[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onPromptSelect: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export default function AssistantPanel({
  messages,
  prompts,
  input,
  isLoading,
  onInputChange,
  onPromptSelect,
  onSubmit,
  onClose,
}: AssistantPanelProps) {
  return (
    <section
      aria-label="Portfolio assistant"
      className="border-gold/20 fixed inset-x-0 bottom-0 z-[85] h-[78vh] rounded-t-3xl border bg-black p-4 shadow-[0_-20px_80px_oklch(0.45_0.14_22_/_24%)] md:inset-x-auto md:right-8 md:bottom-28 md:h-[min(560px,calc(100vh-12rem))] md:w-[400px] md:rounded-2xl md:p-5"
    >
      <div className="border-gold/10 bg-background flex h-full flex-col overflow-hidden rounded-2xl border">
        <header className="border-gold/10 flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="bg-primary h-2 w-2 rounded-full shadow-[0_0_12px_oklch(0.45_0.14_22)]"></span>
            <span className="text-primary font-mono text-xs tracking-[0.24em] uppercase">
              REC · AI.SYS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-cream-muted/55 font-mono text-xs">v1.0.5</span>

            <button
              type="button"
              onClick={onClose}
              className="text-cream-muted hover:text-cream font-mono text-xs tracking-[0.18em] uppercase transition-colors"
            >
              Close
            </button>
          </div>
        </header>

        <div className="assistant-scrollbar flex-1 overflow-y-auto px-5 py-5">
          <AssistantPromptChips prompts={prompts} onSelect={onPromptSelect} />

          <div className="mt-6">
            <AssistantMessages messages={messages} />
          </div>

          {isLoading && (
            <div className="border-gold/10 bg-burgundy-deep/70 text-cream mt-4 max-w-[88%] rounded-lg border px-4 py-3 font-mono text-sm leading-6">
              Rolling response…
            </div>
          )}
        </div>

        <div className="p-5">
          <AssistantInput
            value={input}
            isLoading={isLoading}
            onChange={onInputChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </section>
  );
}

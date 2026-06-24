import type { FormEvent } from "react";

type AssistantInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function AssistantInput({
  value,
  onChange,
  onSubmit,
}: AssistantInputProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-gold/10 flex items-center gap-3 border-t pt-4"
    >
      <label className="sr-only" htmlFor="assistant-input">
        Ask the portfolio assistant
      </label>

      <span className="text-gold font-mono text-sm">{">"}</span>

      <input
        id="assistant-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={500}
        placeholder="Enter query script..."
        className="text-cream placeholder:text-cream-muted/40 min-w-0 flex-1 bg-transparent font-mono text-sm outline-none"
      />

      <button
        type="submit"
        className="text-gold text-2xl transition-transform hover:translate-x-1"
        aria-label="Send assistant message"
      >
        ▶
      </button>
    </form>
  );
}

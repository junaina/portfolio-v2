type AssistantInputProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function AssistantInput({
  value,
  isLoading,
  onChange,
  onSubmit,
}: AssistantInputProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

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
        disabled={isLoading}
        onChange={(event) => onChange(event.target.value)}
        maxLength={500}
        placeholder={isLoading ? "Rolling response..." : "Enter query script..."}
        className="text-cream placeholder:text-cream-muted/40 min-w-0 flex-1 bg-transparent font-mono text-sm outline-none disabled:cursor-not-allowed disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="text-gold text-2xl transition-transform hover:translate-x-1 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Send assistant message"
      >
        {isLoading ? "…" : "▶"}
      </button>
    </form>
  );
}

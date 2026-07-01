type AssistantButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function AssistantButton({ isOpen, onClick }: AssistantButtonProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
      aria-expanded={isOpen}
      onClick={onClick}
      className="border-gold/35 bg-card text-gold hover:border-gold fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[90] flex h-14 w-14 items-center justify-center rounded-full border text-xl shadow-[0_0_28px_oklch(0.45_0.14_22_/_30%)] transition-all hover:-translate-y-0.5 md:h-auto md:w-auto md:gap-3 md:rounded-full md:px-5 md:py-3 md:font-mono md:text-xs md:tracking-[0.24em] md:uppercase"
    >
      <span aria-hidden="true">🎬</span>
      <span className="hidden md:inline">{isOpen ? "Close" : "Ask NJ"}</span>
    </button>
  );
}

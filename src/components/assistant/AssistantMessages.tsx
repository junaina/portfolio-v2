import type { AssistantMessage } from "@/components/assistant/types";

type AssistantMessagesProps = {
  messages: readonly AssistantMessage[];
};

export default function AssistantMessages({ messages }: AssistantMessagesProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={
            message.role === "user"
              ? "border-gold/15 bg-gold text-background ml-auto max-w-[86%] rounded-lg border px-4 py-3 text-sm leading-6"
              : "border-gold/10 bg-burgundy-deep/70 text-cream max-w-[88%] rounded-lg border px-4 py-3 text-sm leading-6"
          }
        >
          {message.content}
        </div>
      ))}
    </div>
  );
}

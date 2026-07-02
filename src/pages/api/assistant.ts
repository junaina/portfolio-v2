import type { APIRoute } from "astro";
import { z } from "zod";
import { askGroq } from "@/lib/server/ai/groq";
import { buildAssistantPrompt } from "@/lib/server/rag/prompt";
import { retrieveRelevantContext } from "@/lib/server/rag/retrieve";
import { getOutOfScopeReply } from "@/lib/server/rag/guardrails";
import { isRateLimited } from "@/lib/server/rate-limit";

export const prerender = false;

const AssistantHistoryMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(1000),
});

const AssistantRequestSchema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z.array(AssistantHistoryMessageSchema).max(8).optional(),
});
function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();

    if (firstIp) return firstIp;
  }

  return "anonymous";
}
function isFollowUpQuestion(message: string): boolean {
  const normalized = message.trim().toLowerCase();

  return [
    "why",
    "why?",
    "how",
    "how?",
    "how so",
    "how so?",
    "explain",
    "explain more",
    "tell me more",
    "what do you mean",
    "why is that",
    "why those",
    "why these",
    "elaborate",
    "that's it?",
    "detail",
  ].includes(normalized);
}

function buildRetrievalQuestion({
  message,
  history,
}: {
  message: string;
  history: readonly { role: "user" | "assistant"; content: string }[];
}): string {
  if (!isFollowUpQuestion(message)) {
    return message;
  }

  const recentContext = history
    .slice(-6)
    .map((item) => `${item.role}: ${item.content}`)
    .join("\n");

  return `${recentContext}\nFollow-up question: ${message}`;
}
export const POST: APIRoute = async ({ request }) => {
  try {
    const identifier = getClientIdentifier(request);

    if (isRateLimited(identifier)) {
      return Response.json(
        {
          error:
            "Too many questions in a short time. Please wait a minute and try again.",
        },
        { status: 429 },
      );
    }

    const body: unknown = await request.json();
    const parsed = AssistantRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          error: "Please send a valid message under 500 characters.",
        },
        { status: 400 },
      );
    }

    const { message, history = [] } = parsed.data;
    const retrievalQuestion = buildRetrievalQuestion({
      message,
      history,
    });

    const retrieval = retrieveRelevantContext(retrievalQuestion);
    if (!retrieval.isRelevant) {
      return Response.json({
        answer: getOutOfScopeReply(),
        sources: [],
      });
    }

    const prompt = buildAssistantPrompt({
      question: message,
      chunks: retrieval.chunks,
      history,
    });
    const answer = await askGroq({ prompt });

    return Response.json({
      answer,
      sources: retrieval.chunks.map((chunk) => chunk.title),
    });
  } catch (error) {
    console.error("Assistant API error:", error);

    return Response.json(
      {
        error: "The assistant is temporarily unavailable. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
};

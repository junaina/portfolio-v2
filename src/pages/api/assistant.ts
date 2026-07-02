import type { APIRoute } from "astro";
import { z } from "zod";
import { askGroq } from "@/lib/server/ai/groq";
import { buildAssistantPrompt } from "@/lib/server/rag/prompt";
import { retrieveRelevantChunks } from "@/lib/server/rag/retrieve";
import { getOffTopicReply, isLikelyPortfolioQuestion } from "@/lib/server/rag/guardrails";
import { isRateLimited } from "@/lib/server/rate-limit";

export const prerender = false;

const AssistantRequestSchema = z.object({
  message: z.string().trim().min(1).max(500),
});

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();

    if (firstIp) return firstIp;
  }

  return "anonymous";
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

    const { message } = parsed.data;

    if (!isLikelyPortfolioQuestion(message)) {
      return Response.json({
        answer: getOffTopicReply(),
        sources: [],
      });
    }

    const chunks = retrieveRelevantChunks(message);
    const prompt = buildAssistantPrompt({
      question: message,
      chunks,
    });

    const answer = await askGroq({ prompt });

    return Response.json({
      answer,
      sources: chunks.map((chunk) => chunk.title),
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

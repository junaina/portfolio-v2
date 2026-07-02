import Groq from "groq-sdk";

type AskGroqInput = {
  prompt: string;
};

export async function askGroq({ prompt }: AskGroqInput): Promise<string> {
  const apiKey = import.meta.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY");
  }

  const groq = new Groq({
    apiKey,
  });

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0.25,
    max_completion_tokens: 350,
    messages: [
      {
        role: "system",
        content:
          "You are NJ.AI, a concise and grounded portfolio assistant. Answer only from the supplied portfolio context.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return (
    completion.choices[0]?.message?.content?.trim() ??
    "I could not generate a response right now."
  );
}

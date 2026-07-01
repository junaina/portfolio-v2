export type Project = {
  slug: string;
  label: string;
  reel: string;
  title: string;
  description: string;
  tags: readonly string[];
  deployment?: string | undefined;
  github?: string | undefined;
  href?: string;
  size: "wide" | "medium";
};

export const projects = [
  {
    slug: "mindmesh",
    label: "Final Year Project",
    reel: "01",
    title: "MindMesh: AI Workspace",
    description:
      "A full-stack all-in-one AI workspace with modular Next.js dashboards, Notion-style documentation, Prisma + PostgreSQL models, and FastAPI-powered transcription, summarization, and RAG services.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "FastAPI", "RAG"],
    github: "https://github.com/junaina/FYP-F-25-D-123-mindmesh-code",
    deployment: undefined,
    href: "https://github.com/junaina/FYP-F-25-D-123-mindmesh-code",
    size: "wide",
  },
  {
    slug: "momentum",
    label: "Full-Stack Web App",
    reel: "02",
    title: "Momentum Habit Tracker",
    description:
      "A minimal habit tracker with daily check-ins, streaks, statistics, weekly progress views, typed validation, database persistence, and Vercel preview deployments.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Zod", "Vercel"],
    github: "https://github.com/junaina/momentum",
    deployment: "https://momentum-rust-six.vercel.app",
    href: "https://momentum-rust-six.vercel.app",
    size: "medium",
  },
  {
    slug: "nlp-bizmatch",
    label: "Marketplace System",
    reel: "03",
    title: "NLP BizMatch",
    description:
      "A digital services marketplace with buyer briefs, provider profiles, service listings, matching, scoring, shortlisting, and comparison workflows.",
    tags: ["Next.js", "Marketplace", "Matching", "Scoring", "UX"],
    github: "https://github.com/junaina/nlp-biz-match",
    deployment: undefined,
    href: "https://github.com/junaina/nlp-biz-match",
    size: "medium",
  },
  {
    slug: "meeting-transcription",
    label: "AI Pipeline",
    reel: "04",
    title: "Meeting Transcription & Summarization",
    description:
      "A final-year project module for meeting transcription and summarization with timestamps, speaker diarization, action-item extraction, and Google Drive integration.",
    tags: ["AI", "Transcription", "Summarization", "Diarization", "Google Drive"],
    github: undefined,
    deployment: undefined,
    href: "#",
    size: "wide",
  },
  {
    slug: "ask-mindy",
    label: "RAG Assistant",
    reel: "05",
    title: "Ask Mindy the AI",
    description:
      "A retrieval-augmented assistant for document queries, designed to retrieve relevant context and generate grounded answers with cited sources.",
    tags: ["RAG", "LLM", "Document QA", "AI Assistant"],
    github: undefined,
    deployment: undefined,
    href: "#",
    size: "medium",
  },
  {
    slug: "empathai",
    label: "Machine Learning",
    reel: "06",
    title: "EmpathAI",
    description:
      "An emotion-aware chatbot using BERT and LSTM models with mood tracking for sentiment analysis and adaptive conversational responses.",
    tags: ["Python", "NLP", "BERT", "LSTM", "Sentiment Analysis"],
    github: undefined,
    deployment: undefined,
    href: "#",
    size: "medium",
  },
  {
    slug: "stock-market-predictor",
    label: "Time-Series ML",
    reel: "07",
    title: "Stock Market Time-Series Predictor",
    description:
      "A machine learning project comparing classical ARIMA models with LSTM networks for time-series prediction on AAPL and BTC-USD datasets.",
    tags: ["Python", "ARIMA", "LSTM", "Time Series", "TensorFlow"],
    github: undefined,
    deployment: undefined,
    href: "#",
    size: "wide",
  },
  {
    slug: "shuffl",
    label: "One-Day Build",
    reel: "08",
    title: "Shuffl",
    description:
      "A lightweight project idea generator based on domain, difficulty, and tech stack, with a minimal UX designed to reduce decision paralysis.",
    tags: ["Next.js", "Productivity", "UX", "Idea Generator"],
    github: "https://github.com/junaina/shuffl",
    deployment: "https://shuffl-rho.vercel.app",
    href: "https://shuffl-rho.vercel.app",
    size: "medium",
  },
  {
    slug: "allama-or-a-llama",
    label: "Interactive Game",
    reel: "09",
    title: "Allama or a Llama",
    description:
      "An interactive quiz game where players guess whether a couplet was by Allama Iqbal or a llama, with a playful game UI and sound effects.",
    tags: ["JavaScript", "Game UI", "Sound Effects", "Interactive UX"],
    github: "https://github.com/junaina/allama-or-a-llama",
    deployment: "https://allama-or-a-llama.vercel.app",
    href: "https://allama-or-a-llama.vercel.app",
    size: "medium",
  },
] as const satisfies readonly Project[];

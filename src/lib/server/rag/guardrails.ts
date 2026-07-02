const PORTFOLIO_TERMS = [
  "nur",
  "junaina",
  "portfolio",
  "project",
  "projects",
  "stack",
  "skills",
  "experience",
  "education",
  "cv",
  "resume",
  "contact",
  "email",
  "github",
  "linkedin",
  "hire",
  "work",
  "mindmesh",
  "aws",
  "frontend",
  "backend",
  "devops",
  "ai",
  "rag",
];

export function isLikelyPortfolioQuestion(message: string): boolean {
  const normalized = message.toLowerCase();

  return PORTFOLIO_TERMS.some((term) => normalized.includes(term));
}

export function getOffTopicReply(): string {
  return "I can only answer questions about Nur Junaina’s portfolio, projects, skills, CV, experience, and contact details. Try asking about her stack, projects, or how to contact her.";
}

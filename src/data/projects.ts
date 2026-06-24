export type Project = {
  slug: string;
  label: string;
  reel: string;
  title: string;
  description: string;
  tags: readonly string[];
  href?: string;
  size: "wide" | "medium";
};

export const projects = [
  {
    slug: "mindmesh",
    label: "Fullstack Initiative",
    reel: "01",
    title: "MindMesh: Collaborative Workspace",
    description:
      "A Notion-style project management and wiki platform with rich documents, database views, table/calendar/timeline/board layouts, and collaborative workflows.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tiptap"],
    href: "#",
    size: "wide",
  },
  {
    slug: "aws-student-records",
    label: "Cloud Architecture",
    reel: "02",
    title: "AWS Student Records App",
    description:
      "A cloud deployment project using EC2, VPC, RDS, Application Load Balancer, Auto Scaling, IAM, and Secrets Manager.",
    tags: ["AWS", "EC2", "RDS", "ALB", "IAM"],
    href: "#",
    size: "medium",
  },
  {
    slug: "rag-doc-assistant",
    label: "AI Systems",
    reel: "03",
    title: "RAG Document Assistant",
    description:
      "An AI assistant concept designed to answer questions from uploaded documents using retrieval, structured context, and grounded responses.",
    tags: ["AI", "RAG", "LLM", "TypeScript"],
    href: "#",
    size: "medium",
  },
  {
    slug: "emotion-aware-chatbot",
    label: "Machine Learning",
    reel: "04",
    title: "Emotion-Aware Chatbot",
    description:
      "A conversational ML project exploring emotion detection and response adaptation using deep learning techniques.",
    tags: ["Python", "NLP", "BERT", "LSTM"],
    href: "#",
    size: "wide",
  },
] as const satisfies readonly Project[];

export type SkillGroup = {
  title: string;
  subtitle: string;
  label?: string;
  items: readonly string[];
};

export const skillGroups = [
  {
    title: "Frontend",
    subtitle: "Cinematography",
    items: [
      "React",
      "Next.js",
      "Astro",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "shadcn/ui",
      "HTML/CSS",
    ],
  },
  {
    title: "Backend",
    subtitle: "Structuring",
    label: "Core Skills",
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Python",
      "TensorFLow and Scikit-learn",
      "Laravel Basics",
    ],
  },
  {
    title: "DevOps and Cloud",
    subtitle: "Post-Production",
    items: [
      "Git",
      "GitHub",
      "Docker and Kubernetes Basics",
      "Linux",
      "Vercel",
      "AWS Basics",
      "CI/CD",
    ],
  },
] as const satisfies readonly SkillGroup[];

export type SkillGroup = {
  title: string;
  subtitle: string;
  label?: string;
  items: readonly string[];
};

export const skillGroups = [
  {
    title: "Cinematography",
    subtitle: "Frontend",
    items: [
      "React",
      "Next.js",
      "Astro",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "shadcn/ui",
    ],
  },
  {
    title: "Structuring",
    subtitle: "Backend",
    label: "Core Module",
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Python",
    ],
  },
  {
    title: "Post-Production",
    subtitle: "DevOps and Cloud",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "Linux",
      "Vercel",
      "AWS Basics",
      "CI/CD",
    ],
  },
] as const satisfies readonly SkillGroup[];

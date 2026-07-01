export type ExperienceItem = {
  slug: string;
  type: "education" | "work";
  label: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  bullets: readonly string[];
  tags: readonly string[];
  href?: string;
};

export const experiences: readonly ExperienceItem[] = [
  {
    slug: "fast-nuces",
    type: "education",
    label: "Education",
    role: "BS Software Engineering",
    organization: "FAST National University of Computer and Emerging Sciences",
    location: "Islamabad, Pakistan",
    period: "Aug 2022 — Jun 2026",
    summary:
      "A software engineering foundation shaped by systems thinking, full-stack development, AI coursework, and consistent academic performance.",
    bullets: [
      "CGPA: 3.65 / 4.00.",
      "Dean’s List from Fall 2022 to Spring 2026.",
      "Bronze Medalist in Fall 2025.",
      "Relevant coursework includes Data Structures, Algorithms, Operating Systems, DBMS, Software Architecture, DevOps, NLP, and Applied AI.",
    ],
    tags: [
      "Software Engineering",
      "Dean’s List",
      "CGPA 3.65",
      "DevOps",
      "NLP",
      "Applied AI",
    ],
  },
  {
    slug: "itsolera",
    type: "work",
    label: "Experience",
    role: "Full Stack Intern — Winter Internship Program",
    organization: "ITSOLERA",
    location: "Remote",
    period: "Jan 2026 — Apr 2026",
    summary:
      "Worked across full-stack projects involving admin systems, RBAC flows, authentication, middleware, and modern web application tooling.",
    bullets: [
      "Awarded top-performing intern.",
      "Built admin panel and RBAC projects using authentication and middleware.",
      "Worked with MERN, Next.js, FastAPI, and SQL/NoSQL databases.",
    ],
    tags: ["Full Stack", "Next.js", "FastAPI", "MERN", "RBAC", "SQL/NoSQL"],
  },
  {
    slug: "act-international",
    type: "work",
    label: "Experience",
    role: "Software Engineer Intern — Laravel Consultant Roster System",
    organization: "ACT International",
    location: "On-Site",
    period: "2025",
    summary:
      "Developed a role-based consultant management system to centralize records, admin workflows, and access-controlled user management.",
    bullets: [
      "Built the system using PHP/Laravel and MySQL.",
      "Implemented authentication, dashboards, validation rules, and database persistence.",
      "Improved structure, maintainability, and security of consultant management workflows.",
    ],
    tags: ["Laravel", "PHP", "MySQL", "Authentication", "Dashboards", "RBAC"],
    href: "https://github.com/junaina/act-consultants-roster",
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const defaultPortfolio = {
  name: "Omar",
  role: "Frontend Developer • UI Engineer",
  headline: "I build bold digital experiences that people remember.",
  summary:
    "I design and develop clean, high-performance interfaces using modern web technologies, turning product ideas into engaging user experiences.",
  stats: [
    { label: "Years experience", value: "4+" },
    { label: "Projects launched", value: "18" },
    { label: "Client satisfaction", value: "92%" },
  ],
  contact: {
    email: "hello@alexdev.com",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com",
  },
};

export const defaultProjects = [
  {
    title: "Awesome Studio",
    category: "Portfolio",
    description:
      "A bold design-driven marketing website with smooth motion, custom UI systems, and optimized performance for a creative studio.",
    link: "https://example.com",
  },
  {
    title: "TaskFlow Pro",
    category: "SaaS",
    description:
      "A productivity dashboard for teams to manage tasks, statuses, and collaboration flows with a clean and scalable architecture.",
    link: "https://example.com",
  },
  {
    title: "NorthCart",
    category: "E-commerce",
    description:
      "An e-commerce storefront built with a conversion-focused UX, product filtering, and responsive cart interactions that increase sales.",
    link: "https://example.com",
  },
];

export const defaultTech = [{ name: "HTML5" }, { name: "CSS3" }, { name: "JavaScript" }, { name: "React" }, { name: "Next.js" }];

const readJson = async (res) => {
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

export async function fetchPortfolioBundle() {
  const [portfolioRes, projectsRes, techRes, contactRes] = await Promise.all([
    fetch(`${API_BASE}/portfolio`, { cache: "no-store" }),
    fetch(`${API_BASE}/projects`, { cache: "no-store" }),
    fetch(`${API_BASE}/tech-stack`, { cache: "no-store" }),
    fetch(`${API_BASE}/contact`, { cache: "no-store" }),
  ]);

  const [portfolioData, projectsData, techData, contactData] = await Promise.all([
    readJson(portfolioRes),
    readJson(projectsRes),
    readJson(techRes),
    readJson(contactRes),
  ]);

  const profile = { ...defaultPortfolio, ...(portfolioData.data || {}) };
  const contact = contactData.data || profile.contact || defaultPortfolio.contact;

  return {
    profile: { ...profile, contact },
    projects: Array.isArray(projectsData.data) && projectsData.data.length ? projectsData.data : defaultProjects,
    techStack: Array.isArray(techData.data) && techData.data.length ? techData.data : defaultTech,
    contact,
  };
}

export { API_BASE };

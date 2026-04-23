export interface Job {
  id: string
  title: string
  team: string
  location: string
  type: string
  salary: string
  summary: string
  about: string
  responsibilities: string[]
  requirements: string[]
  nice: string[]
}

export const jobs: Job[] = [
  {
    id: "senior-full-stack",
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "San Francisco / Remote (US)",
    type: "Full-time",
    salary: "$180k – $240k + equity",
    summary: "Ship end-to-end products from Postgres to pixels. You'll lead technical scope on 2–3 client engagements at a time.",
    about: "We're looking for a senior engineer who's equally comfortable architecting a schema and shipping a polished UI. You'll work in small pods of 3–5, directly with our clients' technical leads, owning significant slices of real products from discovery through launch.",
    responsibilities: [
      "Lead technical design and implementation on client engagements",
      "Partner with designers to translate prototypes into production code",
      "Own services, schemas, and deployment pipelines end-to-end",
      "Mentor junior engineers and contribute to internal tooling",
      "Participate in on-call rotation (quarterly week)",
    ],
    requirements: [
      "6+ years shipping production software",
      "Deep experience with TypeScript and modern React (Next.js a plus)",
      "Comfortable with Postgres, migrations, and complex queries",
      "AWS or GCP in production",
      "Strong written communication — you'll write design docs",
    ],
    nice: [
      "Previously worked in an agency or consulting context",
      "Open source contributions",
      "Experience with LLM-powered features",
    ],
  },
  {
    id: "ai-engineer",
    title: "AI Systems Engineer",
    team: "Engineering",
    location: "Remote (US / EU)",
    type: "Full-time",
    salary: "$200k – $260k + equity",
    summary: "Design and ship production LLM systems — agents, RAG pipelines, evals, and the infrastructure behind them.",
    about: "AI engineering at B3 is not prompt engineering. You'll own end-to-end systems: retrieval, tool use, evaluation harnesses, observability, and the pipelines that keep quality high as models and data shift.",
    responsibilities: [
      "Design agentic systems with real tool use and grounded retrieval",
      "Build offline and online evaluation pipelines",
      "Optimize latency, cost, and reliability of LLM-backed features",
      "Work directly with clients to scope and ship AI products",
    ],
    requirements: [
      "4+ years software engineering, 1+ shipping LLM systems in production",
      "Strong Python, comfortable with async and streaming",
      "Experience with vector stores, embeddings, and retrieval quality",
      "Opinions about evals",
    ],
    nice: [
      "Published research or open-source work on LLMs",
      "Infra experience with Kubernetes or serverless GPU",
    ],
  },
  {
    id: "product-designer",
    title: "Senior Product Designer",
    team: "Design",
    location: "San Francisco",
    type: "Full-time",
    salary: "$160k – $210k + equity",
    summary: "Interaction design and prototyping for serious software. You'll sit next to engineers and ship.",
    about: "Our design team is small and deeply technical. You'll own product discovery, interaction design, and visual systems for 2–3 engagements. Prototype in code if you can; Figma if you can't yet — we'll teach.",
    responsibilities: [
      "Lead design on client engagements from discovery to launch",
      "Build interactive prototypes and design systems",
      "Partner with engineers to implement fidelity-preserving UI",
      "Contribute to B3's internal design standards",
    ],
    requirements: [
      "5+ years designing software products",
      "Portfolio showing shipped interaction design (not just marketing)",
      "Strong systems thinking — you know when to componentize and when not to",
      "Comfortable communicating directly with clients",
    ],
    nice: [
      "Can prototype in code (React / SwiftUI / similar)",
      "Experience in regulated industries (health, fintech)",
    ],
  },
  {
    id: "infra-engineer",
    title: "Infrastructure Engineer",
    team: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    salary: "$190k – $240k + equity",
    summary: "Own the cloud, CI/CD, and observability stack across client engagements.",
    about: "We run dozens of production systems for clients. You'll be the person who keeps them fast, cheap, and boring.",
    responsibilities: [
      "Design and maintain AWS/GCP architectures for client products",
      "Own Terraform modules, CI/CD pipelines, and observability",
      "Lead incident response and post-mortems",
      "Build internal tools for engineers",
    ],
    requirements: [
      "5+ years infra / SRE / platform engineering",
      "Expert Terraform and either AWS or GCP",
      "Kubernetes in production",
      "Datadog, Prometheus, or equivalent — opinions welcome",
    ],
    nice: ["Cost optimization wins you can point to", "Experience with multi-tenant SaaS"],
  },
  {
    id: "eng-manager",
    title: "Engineering Manager",
    team: "Engineering",
    location: "San Francisco",
    type: "Full-time",
    salary: "$220k – $280k + equity",
    summary: "Lead a pod of 4–6 engineers across two client engagements. Hands-on; still shipping code.",
    about: "Our EMs are player-coaches. You'll own delivery for a pod, run 1:1s, and still write code reviews that raise the bar.",
    responsibilities: [
      "Lead a pod of 4–6 engineers across client work",
      "Own technical delivery and client relationships",
      "Recruit and develop engineers on your pod",
      "Stay close enough to the code to review PRs meaningfully",
    ],
    requirements: [
      "3+ years as an EM, 6+ years as an engineer before that",
      "Shipped at least one product of real consequence",
      "Comfortable speaking to executive clients",
    ],
    nice: [],
  },
  {
    id: "recruiter",
    title: "Technical Recruiter",
    team: "People",
    location: "San Francisco / Remote",
    type: "Full-time",
    salary: "$120k – $160k + equity",
    summary: "Help us hire the next twenty engineers and designers, without compromising our bar.",
    about: "We're deliberately small and hire slowly. You'll source, screen, and close senior talent while keeping candidates' experience exceptional.",
    responsibilities: [
      "Own full-cycle recruiting for engineering and design",
      "Build and maintain our ATS and sourcing systems",
      "Run structured interviews and calibrate loops",
      "Champion candidate experience end-to-end",
    ],
    requirements: [
      "3+ years in-house technical recruiting",
      "Placed senior engineers in competitive markets",
      "Strong written communication",
    ],
    nice: ["Agency-side experience", "Built recruiting process from scratch"],
  },
  {
    id: "ops-lead",
    title: "Head of Operations",
    team: "Operations",
    location: "San Francisco",
    type: "Full-time",
    salary: "$180k – $230k + equity",
    summary: "Run finance, legal, and ops for a fast-growing studio.",
    about: "You'll own the backoffice so engineers can engineer. Bookkeeping, contracts, vendor management, facilities — the boring stuff that makes everything else possible.",
    responsibilities: [
      "Manage finance, legal, and HR operations",
      "Own vendor relationships and procurement",
      "Design and maintain internal processes",
    ],
    requirements: [
      "5+ years ops experience at a startup or services business",
      "Comfortable with bookkeeping basics and contract review",
    ],
    nice: ["Experience with professional services firms"],
  },
]

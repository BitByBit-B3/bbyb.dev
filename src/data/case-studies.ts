export interface Section { heading: string; body: string }

export interface CaseStudy {
  slug: string; client: string; tag: string; headline: string; intro: string;
  year: string; role: string; stack: string[];
  highlights: { metric: string; label: string }[];
  sections: Section[];
  repos: { name: string; href: string }[];
  bg: string; color: string;
}

export const studies: CaseStudy[] = [
  {
    slug: "neo-labor-tracker",
    client: "Neo Construction",
    tag: "Internal tool",
    headline: "Construction labor tracking that actually gets used on site.",
    intro:
      "A dual-approval attendance and project tracking platform built for a construction operator who was bleeding hours to paper timesheets and disputed work logs.",
    year: "2026",
    role: "Product, design, full-stack engineering",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Cloudflare R2",
      "Drizzle ORM",
      "Better Auth",
      "Tailwind",
    ],
    highlights: [
      { metric: "3", label: "Approval tiers (Worker → Manager → Admin)" },
      { metric: "0", label: "Paper timesheets in scope sites" },
      { metric: "100%", label: "Photo-verified attendance" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Site managers were reconciling labor hours from paper logs at the end of every week. Disputes were common, payroll lagged, and admins had no visibility into what was actually happening on each project.",
      },
      {
        heading: "What we shipped",
        body: "A web app where workers clock in with a verified photo, managers approve hours against the job they were booked on, and admins get a clean roll-up across every active project. Role-based access keeps the surface area tight per user.",
      },
      {
        heading: "How it's built",
        body: "Edge-first on Cloudflare Workers. D1 for transactional data, R2 for photo proofs, Drizzle for typed schema, Better Auth for session and role enforcement. Next.js 15 on the frontend, deployed via OpenNext.",
      },
    ],
    repos: [
      {
        name: "neo-project-labor-tracker-poc",
        href: "https://github.com/BitByBit-B3/neo-project-labor-tracker-poc",
      },
    ],
    bg: "#1d1d1f",
    color: "#f5f5f7",
  },
  {
    slug: "disasterops",
    client: "DisasterOps AI",
    tag: "AI / public good",
    headline: "An AI-assisted command center for disaster response.",
    intro:
      "A real-time platform that fuses ML-based damage assessment, resource allocation, and multimodal alerting into a single dashboard for first responders, volunteers, and coordinators.",
    year: "2025",
    role: "Architecture, ML pipelines, full-stack",
    stack: [
      "Python",
      "FastAPI",
      "Node.js",
      "Express",
      "React",
      "TypeScript",
      "Multimodal ML",
    ],
    highlights: [
      { metric: "3", label: "Services: core API, AI engine, portal UI" },
      { metric: "Multi", label: "Modal damage assessment (image + text)" },
      { metric: "Realtime", label: "Resource allocation recommendations" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Disaster response coordination today is fragmented across radios, spreadsheets, and group chats. By the time someone aggregates the picture, conditions on the ground have already changed.",
      },
      {
        heading: "What we shipped",
        body: "DisasterOps gives coordinators one screen: live incident map, AI-generated damage estimates from uploaded media, and recommended resource dispatch. Responders see only what they need; coordinators see everything.",
      },
      {
        heading: "How it's built",
        body: "A FastAPI ML service for damage classification and resource recommendations runs alongside a Node/Express core API for auth, persistence, and integrations. A React portal binds them together with a shared real-time event bus.",
      },
    ],
    repos: [
      { name: "disasterops-core-api", href: "https://github.com/b3-competition/disasterops-core-api" },
      { name: "disasterops-ai-engine", href: "https://github.com/b3-competition/disasterops-ai-engine" },
      { name: "disasterops-portal-ui", href: "https://github.com/b3-competition/disasterops-portal-ui" },
      { name: "disasterops-docs", href: "https://github.com/b3-competition/disasterops-docs" },
    ],
    bg: "#f5f5f7",
    color: "#1d1d1f",
  },
  {
    slug: "nextdo",
    client: "NextDo",
    tag: "SaaS / microservices",
    headline: "A productivity platform broken cleanly into services.",
    intro:
      "NextDo is a microservices-first task and team productivity stack. Six services, one shared TypeScript SDK, a Java API gateway out front, and a Next.js portal users actually want to log into.",
    year: "2025",
    role: "Architecture, full-stack engineering",
    stack: [
      "TypeScript",
      "Next.js",
      "Java",
      "Spring Boot",
      "Python",
      "Node.js",
      "Microservices",
    ],
    highlights: [
      { metric: "6", label: "Independently deployable services" },
      { metric: "1", label: "Shared core SDK across services" },
      { metric: "Polyglot", label: "TS + Java + Python where each fits best" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "A monolith was slowing iteration on three different surfaces — auth, notifications, and AI suggestions. Each had its own change cadence and ops profile.",
      },
      {
        heading: "What we shipped",
        body: "We split the system into focused services behind a Java API gateway, with a shared TypeScript SDK so contracts stay honest across the fleet. The portal UI consumes them through a single typed client.",
      },
      {
        heading: "How it's built",
        body: "User and notification services in TypeScript. AI service in Python. Gateway in Java/Spring Boot. Portal in Next.js + TypeScript. Everything contracts-first via the nextdo-core-sdk package.",
      },
    ],
    repos: [
      { name: "nextdo-api-gateway-service", href: "https://github.com/b3-competition/nextdo-api-gateway-service" },
      { name: "nextdo-api-user-service", href: "https://github.com/b3-competition/nextdo-api-user-service" },
      { name: "nextdo-api-notification-service", href: "https://github.com/b3-competition/nextdo-api-notification-service" },
      { name: "nextdo-ai-service", href: "https://github.com/b3-competition/nextdo-ai-service" },
      { name: "nextdo-portal-ui", href: "https://github.com/b3-competition/nextdo-portal-ui" },
      { name: "nextdo-core-sdk", href: "https://github.com/b3-competition/nextdo-core-sdk" },
    ],
    bg: "#0a0a0a",
    color: "#f5f5f7",
  },
  {
    slug: "bus-tourism",
    client: "Bus Tourism LK",
    tag: "Marketplace",
    headline: "Booking platform for tour operators in South Sri Lanka.",
    intro:
      "Two-sided marketplace connecting tourists with bus tour operators along the southern coast. Real-time seat inventory, payments, and operator-side trip management.",
    year: "2026",
    role: "Product, design, full-stack engineering",
    stack: [
      "TypeScript",
      "Next.js",
      "Cloudflare Workers",
      "Postgres",
      "Stripe-style payment flow",
    ],
    highlights: [
      { metric: "2", label: "Sides of the marketplace, one codebase" },
      { metric: "Live", label: "Seat inventory across operators" },
      { metric: "LKR/USD", label: "Multi-currency aware" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Operators were managing seats in WhatsApp and notebooks. Travelers had no consistent way to compare routes, prices, or availability.",
      },
      {
        heading: "What we shipped",
        body: "A booking surface tourists actually want to use, paired with an operator console for trip setup, seat configuration, and revenue reporting.",
      },
      {
        heading: "How it's built",
        body: "TypeScript end to end. Edge-deployed frontend, Postgres for transactional data, and a payment flow that reconciles on the operator's side without manual intervention.",
      },
    ],
    repos: [
      {
        name: "bus-tourism-booking-platform",
        href: "https://github.com/BitByBit-B3/bus-tourism-booking-platform",
      },
    ],
    bg: "#f5f5f7",
    color: "#1d1d1f",
  },
  {
    slug: "lorry-lk",
    client: "Lorry.lk",
    tag: "Logistics",
    headline: "On-demand freight, matched in minutes.",
    intro:
      "A freight booking platform that matches shippers with truck operators across Sri Lanka. From load posting to driver assignment to delivery confirmation, all in one flow.",
    year: "2026",
    role: "Product, full-stack engineering",
    stack: ["TypeScript", "Next.js", "Postgres", "Maps & geocoding"],
    highlights: [
      { metric: "End-to-end", label: "Post → match → dispatch → confirm" },
      { metric: "Geo", label: "Distance-aware pricing" },
      { metric: "Driver-first", label: "Mobile-optimized operator UX" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Booking a lorry traditionally meant phone calls, broker fees, and price opacity. Operators couldn't fill empty return legs.",
      },
      {
        heading: "What we shipped",
        body: "A platform where a shipper posts a load, the system matches against available operators by route and capacity, and both sides get a clear, priced contract before pickup.",
      },
      {
        heading: "How it's built",
        body: "TypeScript on both ends. Postgres for trip data, geocoding for distance-aware pricing, and a mobile-friendly driver flow built around how operators actually work in the cab.",
      },
    ],
    repos: [
      {
        name: "lorry-lk-booking-platform",
        href: "https://github.com/BitByBit-B3/lorry-lk-booking-platform",
      },
    ],
    bg: "#1d1d1f",
    color: "#f5f5f7",
  },
  {
    slug: "lions-plymouth",
    client: "Lions Plymouth",
    tag: "Non-profit",
    headline: "An org site and a fundraising shop on one stack.",
    intro:
      "Two surfaces for the Lions Club Plymouth chapter: an editorial org site, and a full e-commerce shop for fundraising merchandise. Shared design language, separate concerns.",
    year: "2025",
    role: "Design, full-stack engineering",
    stack: ["TypeScript", "Next.js", "Stripe-style checkout", "Tailwind"],
    highlights: [
      { metric: "2", label: "Surfaces, one design system" },
      { metric: "Fundraising", label: "Online checkout funding the cause" },
      { metric: "Editable", label: "Content surface non-engineers can run" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "The chapter wanted a credible web presence and a way to sell merch without spinning up a Shopify they'd have to maintain.",
      },
      {
        heading: "What we shipped",
        body: "A clean editorial site they can update themselves, plus an e-commerce arm with cart, checkout, and order management. One look and feel across both.",
      },
      {
        heading: "How it's built",
        body: "TypeScript and Next.js for both surfaces. Stripe-pattern checkout. Shared component primitives so the brand stays consistent without copy-paste.",
      },
    ],
    repos: [
      { name: "lionsplymouth-org-uk", href: "https://github.com/BitByBit-B3/lionsplymouth-org-uk" },
      { name: "shop-lionsplymouth-org-uk", href: "https://github.com/BitByBit-B3/shop-lionsplymouth-org-uk" },
    ],
    bg: "#0a0a0a",
    color: "#f5f5f7",
  },
  {
    slug: "agentic-mail",
    client: "mail.bbyb.dev",
    tag: "Internal AI tool",
    headline: "An inbox that drafts, triages, and routes itself.",
    intro:
      "Our internal mail client, built on top of Cloudflare's open-source Agent Inbox. LLMs handle triage, drafting, and routing — humans stay in control of what actually gets sent.",
    year: "2026",
    role: "Engineering, AI integration",
    stack: [
      "TypeScript",
      "Cloudflare Workers",
      "Workers AI",
      "Agent Inbox",
      "Email Workers",
    ],
    highlights: [
      { metric: "Auto", label: "Triage by intent and urgency" },
      { metric: "Drafted", label: "Replies pre-written, never auto-sent" },
      { metric: "Edge", label: "Runs entirely on Cloudflare" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Inbound mail across our domains was eating real engineering hours. Nothing existed that gave us LLM assistance without giving up control over outgoing replies.",
      },
      {
        heading: "What we shipped",
        body: "A custom fork of Cloudflare's Agentic Inbox tuned to our workflow. Mail comes in, gets classified, gets a draft attached, and waits for a human to send.",
      },
      {
        heading: "How it's built",
        body: "Cloudflare Email Workers receive mail, Workers AI handles classification and drafting, and the UI is a thin TypeScript layer on top. No external infra.",
      },
    ],
    repos: [
      { name: "mail.bbyb.dev", href: "https://github.com/BitByBit-B3/mail.bbyb.dev" },
    ],
    bg: "#f5f5f7",
    color: "#1d1d1f",
  },
  {
    slug: "ticket-platform",
    client: "Ticket Platform",
    tag: "SaaS",
    headline: "Event ticketing that doesn't melt at sale time.",
    intro:
      "A typed ticketing API and a fast frontend, designed for events that go from zero to peak load in seconds. Built as two independently deployable pieces.",
    year: "2026",
    role: "Architecture, full-stack engineering",
    stack: ["TypeScript", "Next.js", "Node.js", "Postgres", "Edge caching"],
    highlights: [
      { metric: "2", label: "Repos: API and frontend, deployed separately" },
      { metric: "Typed", label: "End-to-end contracts via shared types" },
      { metric: "Bursty", label: "Designed for sale-day load spikes" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Most ticketing platforms either melt under load or charge per ticket like it's 2014. Event organizers wanted control without operating a stadium-grade stack.",
      },
      {
        heading: "What we shipped",
        body: "A clean typed API for inventory and orders, plus a frontend optimized for the queue-and-checkout flow. Sold-out events, no melted servers.",
      },
      {
        heading: "How it's built",
        body: "TypeScript on both ends. Postgres-backed inventory with strict reservation semantics. Edge caching where it's safe; cache-bypass where it isn't.",
      },
    ],
    repos: [
      { name: "ticket-platform-fe", href: "https://github.com/BitByBit-B3/ticket-platform-fe" },
      { name: "ticket-platform-general-api", href: "https://github.com/BitByBit-B3/ticket-platform-general-api" },
    ],
    bg: "#1d1d1f",
    color: "#f5f5f7",
  },
  {
    slug: "govease",
    client: "GovEase",
    tag: "Hackathon win",
    headline: "Public services that don't waste citizens' afternoons.",
    intro:
      "A citizen-first portal that flattens the friction in public service interactions. Built as part of the BitByBit Tech Triathlon and competition track.",
    year: "2025",
    role: "Product, full-stack engineering",
    stack: ["JavaScript", "Node.js", "Web platform"],
    highlights: [
      { metric: "Citizen-first", label: "Designed around the user, not the form" },
      { metric: "Single-flow", label: "Common services consolidated into one path" },
      { metric: "Award-track", label: "Competition entry — BitByBit Tech Triathlon" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Government services tend to optimize for the agency, not the citizen. Form sprawl, opaque routing, and zero state across visits.",
      },
      {
        heading: "What we shipped",
        body: "A streamlined portal where the most common service flows live in one place, share a session, and remember context across steps.",
      },
      {
        heading: "How it's built",
        body: "JavaScript stack tuned for fast iteration during the competition window. Built to be ported to a more durable backend post-event.",
      },
    ],
    repos: [
      { name: "BitByBit_GovEase", href: "https://github.com/b3-competition/BitByBit_GovEase" },
      { name: "bitbybit-tech-triathlon", href: "https://github.com/b3-competition/bitbybit-tech-triathlon" },
    ],
    bg: "#f5f5f7",
    color: "#1d1d1f",
  },
]

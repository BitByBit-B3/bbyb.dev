export interface Section {
  heading: string
  body: string
}

export interface Repo {
  name: string
  href?: string
  isPrivate?: boolean
}

export interface CaseStudy {
  slug: string
  client: string
  tag: string
  headline: string
  intro: string
  year: string
  role: string
  stack: string[]
  highlights: { metric: string; label: string }[]
  sections: Section[]
  repos: Repo[]
  bg: string
  color: string
}

export const studies: CaseStudy[] = [
  {
    slug: "construction-operations",
    client: "Construction Industry",
    tag: "Enterprise · Internal tool",
    headline: "An operations platform that replaced a paper-driven workflow.",
    intro:
      "We built a confidential operations platform for a construction industry client — replacing a paper-and-spreadsheet workflow with a verified, edge-deployed system that runs on every device a site manager already carries. Designed for spotty network conditions, role-strict access, and zero training overhead.",
    year: "2026",
    role: "Product, design, full-stack engineering, deployment",
    stack: [
      "Next.js",
      "TypeScript",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Cloudflare R2",
      "Drizzle ORM",
      "Better Auth",
      "Tailwind",
      "OpenNext",
    ],
    highlights: [
      { metric: "3-tier", label: "Strict approval chain across roles" },
      { metric: "100%", label: "Verified, photo-anchored events" },
      { metric: "Edge-first", label: "Sub-second latency on 3G" },
    ],
    sections: [
      {
        heading: "The brief",
        body: "Replace a brittle, manual operations process with a system the team would actually use on site. The bar was uncompromising: verifiable events, role-strict access, and zero tolerance for the kind of disputes that were eroding trust between operators, supervisors, and the back office.",
      },
      {
        heading: "What we shipped",
        body: "A modern web application with a strict three-tier approval chain. Each role sees only what they need — operators see their day, supervisors see their crew, leadership sees the entire portfolio. Every event is photo-verified at capture and immutable thereafter. Disputes are resolved the same shift, not the same week.",
      },
      {
        heading: "Why the architecture matters",
        body: "We deployed the entire system to Cloudflare's global edge so a tap from a remote site renders just as fast as a tap from HQ. We picked an edge-native database for its bursty write profile, photo storage that bypasses the app server, and an auth layer with role boundaries baked in rather than bolted on. The result is a stack with a tiny operational surface area and a decisive performance advantage.",
      },
      {
        heading: "Outcome",
        body: "Reconciliation moved from a weekly battle to a real-time signal. Trust between layers of the organization improved measurably. The platform now runs as the system of record for the operational data it captures — quietly, daily, and without incident.",
      },
    ],
    repos: [{ name: "Confidential client engagement", isPrivate: true }],
    bg: "#1d1d1f",
    color: "#f5f5f7",
  },
  {
    slug: "travel-marketplace",
    client: "Travel & Tourism",
    tag: "Marketplace · Two-sided",
    headline: "A two-sided marketplace, real-time inventory, multi-currency.",
    intro:
      "A confidential travel and tourism client needed a true two-sided marketplace — travellers on one side, operators on the other — with real-time inventory, automatic reconciliation, and a payment flow that worked across currencies without manual intervention. We delivered the entire surface, from booking funnel to operator console.",
    year: "2026",
    role: "Product, design, full-stack engineering",
    stack: [
      "TypeScript",
      "Next.js",
      "Cloudflare Workers",
      "Postgres",
      "Stripe-pattern checkout",
      "Drizzle ORM",
      "Tailwind",
    ],
    highlights: [
      { metric: "2-sided", label: "Customer + operator surfaces, one stack" },
      { metric: "Real-time", label: "Inventory consistency across operators" },
      { metric: "Multi-currency", label: "Pricing native to each market" },
    ],
    sections: [
      {
        heading: "The brief",
        body: "Build a product that lets a customer find, compare, and book in a single confident flow — and gives operators a control surface they can actually run their business from. The marketplace had to feel modern to international travellers and pragmatic to operators on the ground.",
      },
      {
        heading: "What we shipped",
        body: "A booking surface tuned for conversion, paired with an operator console for pricing, scheduling, inventory configuration, and revenue reporting. Inventory is managed as a strict reservation system with timeouts — never silently double-sold. Currencies are first-class at the booking level, so the same item can be sold to a local and an international customer without manual conversion or post-hoc cleanup.",
      },
      {
        heading: "Why the architecture matters",
        body: "Edge-deployed so the funnel renders fast from anywhere. Postgres with row-level locking on inventory writes for hard consistency where it matters. A webhook-driven payment flow reconciles operator ledgers in the same transaction that confirms a booking — no end-of-month spreadsheets, no human-in-the-loop accounting.",
      },
      {
        heading: "Outcome",
        body: "Operators stopped tracking inventory by hand. Customers stopped calling to confirm seats. The platform became the canonical source of truth for trips that, until recently, were managed in messaging apps. Revenue reconciliation went from \"end of the month\" to \"same instant.\"",
      },
    ],
    repos: [{ name: "Confidential client engagement", isPrivate: true }],
    bg: "#f5f5f7",
    color: "#1d1d1f",
  },
  {
    slug: "logistics-platform",
    client: "Logistics",
    tag: "Logistics · On-demand",
    headline: "An on-demand logistics platform with transparent, geo-priced matching.",
    intro:
      "A confidential logistics client wanted to replace phone-tag and broker-led pricing with a transparent, on-demand platform — one a shipper could trust at first glance and an operator could run from inside the cab. We built the entire system end-to-end and shipped it to production.",
    year: "2026",
    role: "Product, full-stack engineering",
    stack: [
      "TypeScript",
      "Next.js",
      "Postgres",
      "Maps & geocoding",
      "Drizzle ORM",
      "Tailwind",
      "Edge deployment",
    ],
    highlights: [
      { metric: "End-to-end", label: "Post → match → dispatch → confirm" },
      { metric: "Geo-priced", label: "Distance-aware fares from day one" },
      { metric: "Cab-first", label: "Mobile-native operator console" },
    ],
    sections: [
      {
        heading: "The brief",
        body: "Take the opacity out of an industry that runs on phone calls and broker margins. Build a platform where pricing is transparent, matches are explainable, and both sides see the same priced contract before anyone moves.",
      },
      {
        heading: "What we shipped",
        body: "A platform where a shipper posts a job, the system matches against available operators by route, capacity, and current location, and both sides receive a clear, priced contract before pickup. Delivery confirmation closes the loop, payouts run automatically, and operators see their utilisation week over week — turning empty return legs into bookable inventory.",
      },
      {
        heading: "Why the architecture matters",
        body: "Pricing is distance-aware from the first quote — geocoded route distance is computed up front, not negotiated after the fact. Match scoring runs as a transparent ranked query, not a black box, so operators trust the result. The driver flow is a mobile-first PWA — large tap targets, big text, no app-store gating between sign-up and first job.",
      },
      {
        heading: "Outcome",
        body: "An industry segment that was operating on phone calls now has a digital substrate. Pricing transparency built trust on both sides of the marketplace. Operators began posting empty return legs as bookable jobs — converting overhead into revenue. The platform now runs as a daily-use tool for the operators who use it.",
      },
    ],
    repos: [{ name: "Confidential client engagement", isPrivate: true }],
    bg: "#0a0a0a",
    color: "#f5f5f7",
  },
]

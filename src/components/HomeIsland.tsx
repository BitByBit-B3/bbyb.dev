import { useRef } from "react"
import {
  useB3Observe,
  usePinScale,
  useHScroll,
  useMagnetic,
  useSpotlight,
  useTilt,
  useCounter,
} from "@/hooks/use-b3-animations"

/* ─────────────────────────── Mock Visuals ─────────────────────────── */

function MockDashboard() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        background: "rgba(28,28,30,0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
      }}
    >
      {/* macOS traffic lights */}
      <div style={{ display: "flex", gap: 6, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
      </div>
      {/* Metrics row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "16px 16px 12px" }}>
        {[
          { label: "Revenue", value: "$2.4M", change: "+12%" },
          { label: "Pipeline", value: "184", change: "+8" },
          { label: "Retention", value: "94%", change: "+2%" },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 10,
              padding: "10px 12px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ fontSize: 10, color: "#86868b", marginBottom: 4, letterSpacing: "0.02em" }}>{m.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f5f5f7", letterSpacing: "-0.02em" }}>{m.value}</div>
            <div style={{ fontSize: 11, color: "#34c759", marginTop: 2 }}>{m.change}</div>
          </div>
        ))}
      </div>
      {/* SVG line chart */}
      <div style={{ padding: "0 16px 16px" }}>
        <svg viewBox="0 0 388 80" width="100%" height={80} style={{ display: "block" }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <path d="M0 60 C40 55 60 20 100 25 S160 45 200 30 S280 10 320 18 L388 8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 60 C40 55 60 20 100 25 S160 45 200 30 S280 10 320 18 L388 8 L388 80 L0 80 Z" fill="url(#chartGrad)" />
        </svg>
      </div>
    </div>
  )
}

function MockAgent() {
  const tasks = [
    { label: "Ingest customer feedback", status: "done", color: "#34c759" },
    { label: "Generate weekly digest", status: "running", color: "#0071e3" },
    { label: "Sync to Salesforce CRM", status: "queued", color: "#86868b" },
  ]
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 380,
        background: "rgba(28,28,30,0.95)",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 20px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ fontSize: 12, color: "#86868b", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>Agent Tasks</div>
      {tasks.map((t) => (
        <div
          key={t.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, flexShrink: 0, boxShadow: t.status === "running" ? `0 0 8px ${t.color}` : "none" }} />
          <div style={{ flex: 1, fontSize: 14, color: "#f5f5f7", letterSpacing: "-0.01em" }}>{t.label}</div>
          <div style={{ fontSize: 11, color: t.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>{t.status}</div>
        </div>
      ))}
    </div>
  )
}

function MockPhone() {
  return (
    <div
      style={{
        width: 180,
        height: 320,
        background: "#1c1c1e",
        borderRadius: 36,
        border: "6px solid #2c2c2e",
        boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 20,
      }}
    >
      <div style={{ fontSize: 11, color: "#86868b", letterSpacing: "0.04em", textTransform: "uppercase" }}>Mobile</div>
      {[
        { label: "DAU", value: "24.1k" },
        { label: "Sessions", value: "3.8" },
        { label: "Rating", value: "4.9★" },
      ].map((s) => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#f5f5f7", letterSpacing: "-0.03em" }}>{s.value}</div>
          <div style={{ fontSize: 11, color: "#86868b" }}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function MockGraph() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 380,
        background: "rgba(28,28,30,0.95)",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "20px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ fontSize: 12, color: "#86868b", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Uptime / Latency</div>
      <svg viewBox="0 0 340 100" width="100%" height={100} style={{ display: "block" }}>
        <defs>
          <linearGradient id="lineGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#86868b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#86868b" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {/* Line 1: uptime */}
        <path d="M0 80 C30 75 60 15 90 12 S150 18 180 14 S250 8 280 6 L340 4" fill="none" stroke="url(#lineGrad1)" strokeWidth="2" strokeLinecap="round" />
        {/* Line 2: latency */}
        <path d="M0 60 C30 58 60 45 90 42 S150 52 180 44 S250 38 280 36 L340 32" fill="none" stroke="url(#lineGrad2)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2" />
      </svg>
      <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 16, height: 2, background: "#fff", borderRadius: 1 }} />
          <span style={{ fontSize: 11, color: "#86868b" }}>Uptime</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 16, height: 0, borderTop: "2px dashed #86868b" }} />
          <span style={{ fontSize: 11, color: "#86868b" }}>Latency</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Data ─────────────────────────── */

const clients = [
  "Lattice", "Forge", "Corvus", "Meridian", "Atlas",
  "Northwind", "Helix", "Basin", "Klint", "Rook", "Parallax", "Vector",
]

const products = [
  {
    eyebrow: "Custom Software",
    title: "Apps built for\nyour workflow.",
    sub: "End-to-end product engineering — from MVP to scale. We ship fast, then iterate.",
    visual: <MockDashboard />,
    bg: "linear-gradient(145deg, #1a1a1c 0%, #111 100%)",
  },
  {
    eyebrow: "AI Agents",
    title: "Automate the\nboring stuff.",
    sub: "Custom AI pipelines that integrate into your existing stack without the hype.",
    visual: <MockAgent />,
    bg: "linear-gradient(145deg, #161618 0%, #0d0d0f 100%)",
  },
  {
    eyebrow: "Mobile · iOS & Android Done Right",
    title: "Native apps.\nZero compromise.",
    sub: "React Native and Swift/Kotlin builds. App Store to production in weeks.",
    visual: <MockPhone />,
    bg: "linear-gradient(145deg, #18181a 0%, #0f0f11 100%)",
  },
  {
    eyebrow: "Infrastructure",
    title: "Systems that\ndon't break.",
    sub: "Cloud architecture, DevOps, and on-call reliability for teams that can't afford downtime.",
    visual: <MockGraph />,
    bg: "linear-gradient(145deg, #1c1c1e 0%, #141416 100%)",
  },
]

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "One call to understand your problem, your team, and your constraints. No fluff.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Architecture docs, wireframes, and a scope that won't balloon on day seven.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Iterative sprints with daily standups. You see progress, not promises.",
  },
  {
    num: "04",
    title: "Ship",
    desc: "Deployed, monitored, and handed off with documentation your team will actually use.",
  },
]

/* ─────────────────────────── Main Component ─────────────────────────── */

export default function HomeIsland() {
  const pageRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const hscrollRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useB3Observe()
  usePinScale(pinRef)
  useHScroll(hscrollRef)
  useMagnetic(ctaRef)
  useCounter()
  useSpotlight(pageRef)
  useTilt(pageRef)

  return (
    <div ref={pageRef} className="page-fade">
      {/* ─── Section 1: Hero ─── */}
      <section
        className="hero-stage"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "0 22px",
          position: "relative",
        }}
      >
        <div className="aurora" />
        <div
          className="dot-grid"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        {/* B3 Mark */}
        <div
          className="b3-mark hero-zoom"
          style={{
            fontSize: "clamp(180px, 28vw, 440px)",
            color: "#fff",
            lineHeight: 0.82,
            marginBottom: 32,
            position: "relative",
            zIndex: 1,
          }}
        >
          <span className="char">B</span>
          <span className="char">3</span>
        </div>

        {/* Tagline */}
        <div
          className="reveal-words font-unbounded"
          style={{
            fontSize: "clamp(22px, 3.5vw, 48px)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.04em",
            marginBottom: 20,
            position: "relative",
            zIndex: 1,
          }}
        >
          {"Software, bit by bit.".split(" ").map((word, i) => (
            <span key={i} className="reveal-word-wrap">
              <span className="reveal-word" style={{ transitionDelay: `${i * 80 + 400}ms` }}>
                {word}&nbsp;
              </span>
            </span>
          ))}
        </div>

        {/* Subtext */}
        <p
          className="fade-up"
          style={{
            fontSize: "clamp(16px, 1.8vw, 21px)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: 540,
            lineHeight: 1.55,
            letterSpacing: "-0.01em",
            marginBottom: 40,
            position: "relative",
            zIndex: 1,
            transitionDelay: "600ms",
          }}
        >
          We build serious software for serious teams — custom products, AI agents, and infrastructure that actually ships.
        </p>

        {/* CTAs */}
        <div
          className="fade-up"
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            transitionDelay: "750ms",
          }}
        >
          <a ref={ctaRef} href="/contact" className="btn btn-dark btn-lg magnetic">
            Start a project
          </a>
          <a href="/work" className="btn btn-ghost-dark btn-lg">
            See our work
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: 0.4,
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: 11, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</div>
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, #fff, transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>

        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.2); }
          }
        `}</style>
      </section>

      {/* ─── Section 2: Pinned scale ─── */}
      <section
        ref={pinRef}
        className="pin-section"
        style={{ background: "#000" }}
      >
        <div className="pin-sticky">
          <div className="pin-content" style={{ textAlign: "center", padding: "0 22px" }}>
            <div
              className="eyebrow-center"
              style={{ color: "#86868b", marginBottom: 16, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              Built for ambition
            </div>
            <h2
              className="headline"
              style={{ color: "#fff", marginBottom: 0 }}
            >
              Software that
              <br />
              <span className="gradient-text">actually ships.</span>
            </h2>
            <p
              style={{
                fontSize: "clamp(17px, 2vw, 21px)",
                color: "#a1a1a6",
                maxWidth: 560,
                margin: "24px auto 0",
                lineHeight: 1.55,
                letterSpacing: "-0.01em",
              }}
            >
              No hand-wavy roadmaps. No twelve-week discovery phases. We pair with your team and build the thing.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Horizontal scroll products ─── */}
      <div ref={hscrollRef} className="hscroll-wrap" style={{ background: "#000" }}>
        <div className="hscroll-sticky">
          <div className="hscroll-track">
            {products.map((p) => (
              <div
                key={p.eyebrow}
                className="hscroll-card spotlight-card"
                style={{ background: p.bg, border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#86868b",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    {p.eyebrow}
                  </div>
                  <h3
                    className="font-unbounded"
                    style={{
                      fontSize: "clamp(28px, 3vw, 44px)",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 14px",
                      whiteSpace: "pre-line",
                      lineHeight: 1.08,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 16, color: "#a1a1a6", lineHeight: 1.6, maxWidth: 44 + "ch", letterSpacing: "-0.01em" }}>
                    {p.sub}
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", paddingTop: 32 }}>
                  {p.visual}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Section 4: Stats ─── */}
      <section className="sec" style={{ background: "#fff", paddingTop: 140, paddingBottom: 140 }}>
        <div className="sec-inner">
          <div className="eyebrow-center fade-up" style={{ color: "#0071e3", marginBottom: 12 }}>
            By the numbers
          </div>
          <h2 className="headline fade-up" style={{ color: "#1d1d1f" }}>
            Small team. Serious output.
          </h2>
          <div
            className="fade-up"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
              marginTop: 64,
              textAlign: "center",
            }}
          >
            {[
              { counter: "47", suffix: "", label: "Products shipped" },
              { counter: "12", suffix: "", label: "Industries served" },
              { counter: "99.98", suffix: "%", label: "Uptime" },
              { counter: "18", suffix: "d", label: "Avg time to deploy" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="counter font-unbounded"
                  data-counter={s.counter}
                  data-suffix={s.suffix}
                  style={{
                    fontSize: "clamp(48px, 6vw, 80px)",
                    fontWeight: 900,
                    color: "#1d1d1f",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  0{s.suffix}
                </div>
                <div style={{ fontSize: 17, color: "#86868b", marginTop: 10, letterSpacing: "-0.01em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 734px) {
              .stats-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ─── Section 5: Process ─── */}
      <section
        className="sec"
        style={{ background: "#000", position: "relative", overflow: "hidden" }}
      >
        <div
          className="dot-grid"
          style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
        />
        <div className="sec-inner" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="eyebrow-center fade-up"
            style={{ color: "#86868b", marginBottom: 12, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            How we work
          </div>
          <h2 className="headline fade-up" style={{ color: "#fff" }}>
            First call to{" "}
            <span className="gradient-text">first deploy.</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
              marginTop: 72,
            }}
          >
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="fade-up"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  padding: "32px 28px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="font-unbounded"
                  style={{
                    fontSize: 13,
                    fontWeight: 900,
                    color: "#3a3a3c",
                    letterSpacing: "0.04em",
                    marginBottom: 20,
                  }}
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontSize: "clamp(22px, 2vw, 28px)",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 12px",
                    letterSpacing: "-0.02em",
                    fontFamily: "var(--font-unbounded), sans-serif",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, color: "#86868b", lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 6: Client marquee ─── */}
      <section
        style={{
          background: "#f5f5f7",
          padding: "72px 0",
          overflow: "hidden",
        }}
      >
        <div
          className="eyebrow-center fade-up"
          style={{ color: "#86868b", marginBottom: 40, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          Trusted by teams at
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...clients, ...clients].map((name, i) => (
              <span
                key={i}
                className="font-unbounded"
                style={{
                  fontSize: "clamp(18px, 2.5vw, 28px)",
                  fontWeight: 900,
                  color: "#1d1d1f",
                  letterSpacing: "-0.04em",
                  opacity: 0.18,
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 7: Testimonial ─── */}
      <section
        className="sec"
        style={{ background: "#fff", paddingTop: 120, paddingBottom: 120 }}
      >
        <div className="sec-inner" style={{ maxWidth: 860 }}>
          <blockquote
            className="fade-up font-unbounded"
            style={{
              margin: 0,
              fontSize: "clamp(24px, 3.2vw, 42px)",
              fontWeight: 700,
              color: "#1d1d1f",
              lineHeight: 1.18,
              letterSpacing: "-0.04em",
              textAlign: "center",
            }}
          >
            &ldquo;We handed B3 a six-month roadmap and a prayer. They shipped in nine weeks — and it actually held up under load.&rdquo;
          </blockquote>
          <div
            className="fade-up"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              marginTop: 40,
            }}
          >
            <div style={{ width: 40, height: 1, background: "#d2d2d7", marginBottom: 16 }} />
            <div style={{ fontSize: 17, fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.01em" }}>Priya Anand</div>
            <div style={{ fontSize: 14, color: "#86868b" }}>Head of Engineering, Lattice Health</div>
          </div>
        </div>
      </section>

      {/* ─── Section 8: Final CTA tiles ─── */}
      <section
        className="sec"
        style={{ background: "#f5f5f7", paddingTop: 20, paddingBottom: 40 }}
      >
        <div className="tile-grid two">
          {/* Careers — black tile */}
          <div className="tile tile-black spotlight-card" data-tilt>
            <div className="eyebrow" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Careers
            </div>
            <h2 className="tile-title" style={{ color: "#fff" }}>
              Join the build team.
            </h2>
            <p className="tile-sub" style={{ color: "#a1a1a6" }}>
              Small team, outsized impact. We hire generalists who ship.
            </p>
            <div className="tile-ctas">
              <a href="/careers" className="btn btn-dark btn-lg">
                View open roles
              </a>
            </div>
            <div className="tile-visual">
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  padding: "32px 0 0",
                  maxWidth: 340,
                }}
              >
                {["Engineering", "Design", "Product", "DevOps", "AI/ML", "Full-Stack"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 980,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#f5f5f7",
                      fontSize: 13,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact — light tile */}
          <div
            className="tile spotlight-card"
            data-tilt
            style={{ background: "#fff" }}
          >
            <div className="eyebrow" style={{ textTransform: "uppercase", letterSpacing: "0.06em", color: "#86868b" }}>
              Contact
            </div>
            <h2 className="tile-title" style={{ color: "#1d1d1f" }}>
              Let&rsquo;s build something.
            </h2>
            <p className="tile-sub" style={{ color: "#6e6e73" }}>
              Tell us what you need. We&rsquo;ll tell you if we can help — and how fast.
            </p>
            <div className="tile-ctas">
              <a href="/contact" className="btn btn-primary btn-lg">
                Start a project
              </a>
              <a href="/work" className="btn btn-sm" style={{ color: "#0071e3" }}>
                See our work →
              </a>
            </div>
            <div className="tile-visual">
              {/* Mock contact card */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 360,
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid #d2d2d7",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  marginTop: 32,
                }}
              >
                <div
                  style={{
                    background: "#f5f5f7",
                    padding: "12px 16px",
                    fontSize: 13,
                    color: "#86868b",
                    borderBottom: "1px solid #d2d2d7",
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#1d1d1f" }}>New Message</span>
                </div>
                {["To: hello@bbyb.dev", "Subject: Project inquiry"].map((row) => (
                  <div
                    key={row}
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      color: "#86868b",
                      borderBottom: "1px solid #f5f5f7",
                    }}
                  >
                    {row}
                  </div>
                ))}
                <div style={{ padding: "14px 16px", fontSize: 14, color: "#1d1d1f", lineHeight: 1.6, minHeight: 64 }}>
                  Hi, we&rsquo;re looking for a team to build...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import React, { useState } from "react"

/* ─────────────────────────── Helper Components ─────────────────────────── */

interface TextFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}

function TextField({ label, value, onChange, type = "text", required }: TextFieldProps) {
  return (
    <div className={"b3-field" + (value ? " filled" : "")}>
      <input
        className="b3-input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
      <span className="b3-floating">{label}</span>
    </div>
  )
}

interface TextareaFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  required?: boolean
}

function TextareaField({ label, value, onChange, rows = 4, required }: TextareaFieldProps) {
  return (
    <div className={"b3-field" + (value ? " filled" : "")}>
      <textarea
        className="b3-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        required={required}
        style={{ minHeight: rows * 28 + "px" }}
      />
      <span className="b3-floating">{label}</span>
    </div>
  )
}

interface SelectFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  required?: boolean
}

function SelectField({ label, value, onChange, options, required }: SelectFieldProps) {
  return (
    <div className={"b3-field" + (value ? " filled" : "")} style={{ position: "relative" }}>
      <select
        className="b3-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        style={{ appearance: "none", paddingRight: 40 }}
      >
        <option value="" />
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="b3-floating">{label}</span>
      <svg
        style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="M4 6l4 4 4-4" stroke="#86868b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ─────────────────────────── Contact Methods ─────────────────────────── */

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 3.5C3 3.5 4 2 5.5 2c.8 0 1.5.5 2 1.5l1 2c.3.8 0 1.5-.5 2L7 8.5c.7 1.5 2 3 3.5 3.5l1-1c.5-.5 1.2-.8 2-.5l2 1c1 .5 1.5 1.2 1.5 2 0 1.5-1.5 2.5-1.5 2.5C6 17 3 11 3 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function CalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 2v3M14 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7" cy="12" r="1" fill="currentColor" />
      <circle cx="10" cy="12" r="1" fill="currentColor" />
      <circle cx="13" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

const contactMethods = [
  {
    icon: <MailIcon />,
    label: "hello@bbyb.dev",
    sub: "We reply within 1 business day",
    href: "mailto:hello@bbyb.dev",
  },
  {
    icon: <PhoneIcon />,
    label: "+94 71 377 1561",
    sub: "+94 77 716 9804",
    href: "tel:+94713771561",
  },
  {
    icon: <PinIcon />,
    label: "Colombo, Sri Lanka",
    sub: "Remote-first, global reach",
    href: null,
  },
  {
    icon: <CalIcon />,
    label: "Book a call",
    sub: "30 min intro, no pressure",
    href: "#book",
  },
]

const serviceOptions = [
  "Custom web app",
  "AI agent / LLM system",
  "Mobile app",
  "Infrastructure",
  "Design / UX",
  "Not sure yet",
]

const budgetOptions = [
  "Under $50k",
  "$50k – $150k",
  "$150k – $500k",
  "$500k+",
  "Not sure",
]

const timelineOptions = [
  "ASAP",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Just exploring",
]

/* ─────────────────────────── Main Component ─────────────────────────── */

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    timeline: "",
    service: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [field]: v }))

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || undefined,
          service: form.service,
          budget: form.budget || undefined,
          timeline: form.timeline || undefined,
          message: form.message,
        }),
      })
      const data = await res.json() as { error?: string }
      if (!res.ok) throw new Error(data.error ?? "Something went wrong")
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="page-fade">
        <div
          className="sec"
          style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div style={{ textAlign: "center", maxWidth: 440 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "#34c759",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16.5l5.5 5.5 10.5-11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1
              className="font-unbounded"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 16 }}
            >
              Message received.
            </h1>
            <p style={{ fontSize: 17, color: "#6e6e73", lineHeight: 1.6, marginBottom: 32 }}>
              Thanks for reaching out. We&rsquo;ll review your message and get back to you within one business day.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSubmitted(false)
                setLoading(false)
                setError(null)
                setForm({ name: "", email: "", company: "", budget: "", timeline: "", service: "", message: "" })
              }}
            >
              Send another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-fade">
      {/* ─── Hero ─── */}
      <section className="sec" style={{ paddingTop: 140, paddingBottom: 60 }}>
        <div className="sec-inner" style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#0071e3",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 14,
            }}
          >
            Contact
          </div>
          <h1
            className="font-unbounded"
            style={{
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              color: "#1d1d1f",
              margin: "0 0 20px",
            }}
          >
            Let&rsquo;s talk.
          </h1>
          <p
            style={{
              fontSize: "clamp(17px, 2vw, 21px)",
              color: "#6e6e73",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.55,
              letterSpacing: "-0.01em",
            }}
          >
            Tell us what you&rsquo;re building. We reply within one business day.
          </p>
        </div>
      </section>

      {/* ─── Two-column layout ─── */}
      <section className="sec" style={{ paddingTop: 0, paddingBottom: 120 }}>
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "0 22px",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Left: Contact methods */}
          <div>
            <h3
              style={{
                fontSize: 19,
                fontWeight: 600,
                color: "#1d1d1f",
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              Other ways to reach us.
            </h3>

            <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
              {contactMethods.map((m) => {
                const inner = (
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      padding: "14px 16px",
                      background: "#f5f5f7",
                      borderRadius: 14,
                      transition: "background 160ms",
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        background: "#1d1d1f",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {m.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: "#1d1d1f", marginBottom: 2 }}>{m.label}</div>
                      <div style={{ fontSize: 13, color: "#86868b" }}>{m.sub}</div>
                    </div>
                  </div>
                )

                return m.href ? (
                  <a key={m.label} href={m.href} style={{ textDecoration: "none", display: "block" }}>
                    {inner}
                  </a>
                ) : (
                  <div key={m.label}>{inner}</div>
                )
              })}
            </div>

            {/* Already a client box */}
            <div
              style={{
                background: "#f5f5f7",
                borderRadius: 18,
                padding: "20px 20px",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1d1d1f", marginBottom: 6 }}>
                Already a client?
              </div>
              <p style={{ fontSize: 13, color: "#6e6e73", lineHeight: 1.55, margin: "0 0 14px" }}>
                Use your dedicated Slack channel or reach your project lead directly for anything ongoing.
              </p>
              <a href="mailto:hello@bbyb.dev" style={{ fontSize: 13, color: "#0071e3" }}>
                Email your project lead →
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#1d1d1f",
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              Start a Project
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: 14 }}>
                {/* Row: name + email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <TextField label="Your name" value={form.name} onChange={set("name")} required />
                  <TextField label="Work email" value={form.email} onChange={set("email")} type="email" required />
                </div>

                {/* Company */}
                <TextField label="Company" value={form.company} onChange={set("company")} />

                {/* Service + Budget */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <SelectField label="Service" value={form.service} onChange={set("service")} options={serviceOptions} />
                  <SelectField label="Budget" value={form.budget} onChange={set("budget")} options={budgetOptions} />
                </div>

                {/* Timeline */}
                <SelectField label="Timeline" value={form.timeline} onChange={set("timeline")} options={timelineOptions} />

                {/* Message */}
                <TextareaField
                  label="Tell us about your project"
                  value={form.message}
                  onChange={set("message")}
                  rows={5}
                  required
                />

                {/* Submit */}
                {error && (
                  <div style={{ marginTop: 16, padding: "12px 16px", background: "#fff2f2", border: "1px solid #ffcccc", borderRadius: 10, color: "#c00", fontSize: 14 }}>
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginTop: 20, width: "100%", opacity: loading ? 0.6 : 1 }}
                  disabled={loading}
                >
                  {loading ? "Sending…" : "Send message"}
                </button>

                {/* Privacy */}
                <p style={{ fontSize: 12, color: "#86868b", textAlign: "center", margin: 0, lineHeight: 1.55 }}>
                  By submitting, you agree to our{" "}
                  <a href="/privacy" style={{ color: "#86868b", textDecoration: "underline" }}>
                    Privacy Policy
                  </a>
                  . We never share your data with third parties.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile responsive style */}
        <style>{`
          @media (max-width: 734px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </div>
  )
}

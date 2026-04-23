import React, { useState } from 'react'
import type { Job } from '@/lib/jobs'

interface Props {
  jobs: Job[]
}

const ALL = 'All'

function getUniqueTeams(jobList: Job[]): string[] {
  const seen = new Set<string>()
  jobList.forEach((j) => seen.add(j.team))
  return [ALL, ...Array.from(seen)]
}

const perks = [
  {
    icon: '◈',
    title: 'Ownership',
    body: 'You own your work end-to-end. No hand-offs, no ticket queues. If it ships, your name is on it.',
  },
  {
    icon: '$',
    title: 'Compensation',
    body: 'Top-of-market salary plus meaningful equity. We believe the people who build it should own a piece of it.',
  },
  {
    icon: '♥',
    title: 'Health',
    body: 'Platinum medical, dental, and vision for you and your dependents. Fully covered — no surprises.',
  },
  {
    icon: '✦',
    title: 'Time off',
    body: 'Unlimited PTO with a four-week minimum. We mean it. Managers actively remind you to take time.',
  },
  {
    icon: '⌂',
    title: 'Remote-friendly',
    body: 'Work from anywhere in the US or EU. We coordinate across time zones and ship anyway.',
  },
  {
    icon: '⚙',
    title: 'Gear & learning',
    body: '$3k/year for learning — courses, books, conferences. Plus a home-office setup budget on day one.',
  },
]

const steps = [
  { num: '01', title: 'Apply', desc: 'Submit your résumé and a few short answers. No cover letter required.' },
  { num: '02', title: 'Intro call', desc: '30 minutes with a member of the team. We talk about you, we talk about B3.' },
  { num: '03', title: 'Technical', desc: 'A focused conversation or take-home under four hours, scoped to the role.' },
  { num: '04', title: 'Onsite', desc: 'Half-day with the pod. Meet the people you\'d work with. Ask the hard questions.' },
]

export default function CareersIsland({ jobs }: Props) {
  const [activeTeam, setActiveTeam] = useState(ALL)
  const [search, setSearch] = useState('')
  const teams = getUniqueTeams(jobs)

  const filtered = jobs.filter((j) => {
    const matchTeam = activeTeam === ALL || j.team === activeTeam
    const q = search.toLowerCase()
    const matchSearch =
      q === '' ||
      j.title.toLowerCase().includes(q) ||
      j.team.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.summary.toLowerCase().includes(q)
    return matchTeam && matchSearch
  })

  return (
    <>
      {/* Life at B3 */}
      <section id="life-at-b3" className="sec">
        <div className="sec-inner">
          <p className="eyebrow-center" style={{ color: '#0071e3' }}>Life at B3</p>
          <h2
            className="headline"
            dangerouslySetInnerHTML={{ __html: 'Small team.<br/>Serious work.' }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
              maxWidth: 1200,
              margin: '40px auto 0',
            }}
          >
            {perks.map((perk) => (
              <div
                key={perk.title}
                style={{
                  padding: 28,
                  background: '#f5f5f7',
                  borderRadius: 18,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 14, color: '#1d1d1f' }}>{perk.icon}</div>
                <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                  {perk.title}
                </h3>
                <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.5, margin: 0 }}>{perk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section
        id="open-roles"
        style={{ background: '#fbfbfd', padding: '80px 22px 100px' }}
      >
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <p className="eyebrow-center" style={{ color: '#0071e3' }}>Open roles</p>
          <h2 className="headline">Find your fit.</h2>
          <p className="subhead">
            {jobs.length} open positions across Engineering, Design, People, and Operations.
          </p>

          {/* Filters */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            {teams.map((team) => (
              <button
                key={team}
                onClick={() => setActiveTeam(team)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 980,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid',
                  transition: 'background 160ms, color 160ms, border-color 160ms',
                  background: activeTeam === team ? '#1d1d1f' : '#fff',
                  color: activeTeam === team ? '#fff' : '#1d1d1f',
                  borderColor: activeTeam === team ? '#1d1d1f' : '#d2d2d7',
                }}
              >
                {team}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ maxWidth: 480, margin: '0 auto 40px' }}>
            <input
              className="b3-input"
              type="search"
              placeholder="Search roles…"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>

          {/* Job list */}
          <div>
            {filtered.length === 0 && (
              <p style={{ textAlign: 'center', color: '#86868b', padding: '40px 0' }}>
                No roles match your search.
              </p>
            )}
            {filtered.map((job) => (
              <a key={job.id} href={`/careers/${job.id}`} className="job-row">
                <div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-meta">{job.summary}</div>
                </div>
                <div className="job-meta">{job.location}</div>
                <div className="job-pill">{job.salary}</div>
                <div style={{ color: '#0071e3', fontWeight: 500, fontSize: 15, whiteSpace: 'nowrap' }}>
                  View ›
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Interview process */}
      <section className="sec">
        <div className="sec-inner">
          <p className="eyebrow-center" style={{ color: '#0071e3' }}>Interview process</p>
          <h2 className="headline">What to expect.</h2>
          <p className="subhead">
            Four rounds, three weeks, no take-homes longer than four hours.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginTop: 40,
            }}
          >
            {steps.map((step) => (
              <div
                key={step.num}
                style={{
                  background: '#f5f5f7',
                  border: '1px solid #fff',
                  borderRadius: 18,
                  padding: 28,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-unbounded), sans-serif',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#86868b',
                    letterSpacing: '0.04em',
                    marginBottom: 12,
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

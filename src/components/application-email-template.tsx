import React from 'react'
import type { ApplicationBody } from '@/types/index'

interface ApplicationEmailTemplateProps {
  application: ApplicationBody
  cvDownloadUrl?: string
}

export function ApplicationEmailTemplate({ application: app, cvDownloadUrl }: ApplicationEmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ background: '#000', padding: '28px 32px', borderRadius: '8px 8px 0 0' }}>
        <div style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: 24, color: '#fff', letterSpacing: '-0.04em' }}>B3</div>
      </div>
      <div style={{ background: '#f8f8f8', padding: '32px' }}>
        <h1 style={{ color: '#1d1d1f', fontSize: 22, margin: '0 0 4px', fontWeight: 700 }}>
          New Application — {app.jobTitle}
        </h1>
        <p style={{ color: '#6e6e73', margin: '0 0 28px', fontSize: 14 }}>Reference: B3-{app.jobId.slice(0, 5).toUpperCase()}</p>

        <Section title="Applicant">
          <Row label="Name" value={`${app.firstName} ${app.lastName}`} />
          <Row label="Email" value={app.email} href={`mailto:${app.email}`} />
          <Row label="Phone" value={app.phone} />
          <Row label="Location" value={app.location} />
          {app.linkedin && <Row label="LinkedIn" value={app.linkedin} href={`https://${app.linkedin}`} />}
          {app.github && <Row label="GitHub" value={app.github} href={`https://${app.github}`} />}
          {app.portfolio && <Row label="Portfolio" value={app.portfolio} href={app.portfolio.startsWith('http') ? app.portfolio : `https://${app.portfolio}`} />}
        </Section>

        <Section title="Experience">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 14, color: '#1d1d1f', lineHeight: 1.6 }}>{app.experienceSummary}</pre>
        </Section>

        <Section title="Education">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 14, color: '#1d1d1f', lineHeight: 1.6 }}>{app.educationSummary}</pre>
        </Section>

        <Section title="Skills">
          <p style={{ margin: 0, fontSize: 14, color: '#1d1d1f' }}>{app.skills.join(', ')}</p>
        </Section>

        <Section title="Screening Questions">
          <Row label="Why B3?" value="" />
          <p style={{ margin: '4px 0 16px', fontSize: 14, color: '#1d1d1f', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{app.whyB3}</p>
          <Row label="Authorization" value={app.authorization} />
          <Row label="Start date" value={app.startDate} />
          {app.referral && <Row label="Referral" value={app.referral} />}
        </Section>

        <Section title="CV">
          <Row label="File" value={app.cvName} />
          {cvDownloadUrl && (
            <div style={{ marginTop: 12 }}>
              <a
                href={cvDownloadUrl}
                style={{ display: 'inline-block', padding: '10px 20px', background: '#0071e3', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
              >
                Download CV
              </a>
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: '20px 24px', marginBottom: 16 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#86868b', margin: '0 0 14px', borderBottom: '1px solid #f0f0f0', paddingBottom: 10 }}>{title}</h2>
      {children}
    </div>
  )
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '5px 0', fontSize: 14 }}>
      <span style={{ color: '#86868b', minWidth: 110, flexShrink: 0 }}>{label}</span>
      {href ? (
        <a href={href} style={{ color: '#0071e3', textDecoration: 'none' }}>{value}</a>
      ) : (
        <span style={{ color: '#1d1d1f' }}>{value}</span>
      )}
    </div>
  )
}

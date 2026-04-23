import React, { useState, useRef } from 'react'
import type { ApplicationBody } from '@/types/index'

interface Props {
  jobId: string
  jobTitle: string
  jobTeam: string
  jobLocation: string
}

interface TextFieldProps {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean
}
function TextField({ label, value, onChange, type = 'text', required }: TextFieldProps) {
  return (
    <div className={'b3-field' + (value ? ' filled' : '')}>
      <input className="b3-input" type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
      <span className="b3-floating">{label}</span>
    </div>
  )
}

interface TextareaFieldProps {
  label: string; value: string; onChange: (v: string) => void; rows?: number; required?: boolean
}
function TextareaField({ label, value, onChange, rows = 4, required }: TextareaFieldProps) {
  return (
    <div className={'b3-field' + (value ? ' filled' : '')}>
      <textarea className="b3-textarea" value={value} onChange={(e) => onChange(e.target.value)} rows={rows} required={required} style={{ minHeight: rows * 28 + 'px' }} />
      <span className="b3-floating">{label}</span>
    </div>
  )
}

interface SelectFieldProps {
  label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean
}
function SelectField({ label, value, onChange, options, required }: SelectFieldProps) {
  return (
    <div className={'b3-field' + (value ? ' filled' : '')} style={{ position: 'relative' }}>
      <select className="b3-select" value={value} onChange={(e) => onChange(e.target.value)} required={required} style={{ appearance: 'none', paddingRight: 40 }}>
        <option value="" />
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="b3-floating">{label}</span>
      <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="#86868b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

interface StepNavProps {
  onBack?: () => void; onNext?: () => void; nextLabel?: string; nextDisabled?: boolean; backLabel?: string
}
function StepNav({ onBack, onNext, nextLabel = 'Continue', nextDisabled, backLabel = 'Back' }: StepNavProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 24, borderTop: '1px solid #d2d2d7' }}>
      {onBack ? (
        <button className="btn btn-secondary" onClick={onBack}>{backLabel}</button>
      ) : <div />}
      {onNext && (
        <button className="btn btn-primary" onClick={onNext} disabled={nextDisabled} style={{ opacity: nextDisabled ? 0.4 : 1, cursor: nextDisabled ? 'not-allowed' : 'pointer' }}>
          {nextLabel}
        </button>
      )}
    </div>
  )
}

interface ReviewRowProps { label: string; value: React.ReactNode; onEdit?: () => void }
function ReviewRow({ label, value, onEdit }: ReviewRowProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: 16, padding: '14px 0', borderBottom: '1px solid #f5f5f7', alignItems: 'start' }}>
      <div style={{ fontSize: 14, color: '#86868b', paddingTop: 2 }}>{label}</div>
      <div style={{ fontSize: 15, color: '#1d1d1f', lineHeight: 1.5 }}>{value || <span style={{ color: '#d2d2d7' }}>—</span>}</div>
      {onEdit && <button onClick={onEdit} style={{ fontSize: 13, color: '#0071e3', background: 'none', border: 'none', cursor: 'pointer', padding: 0, whiteSpace: 'nowrap' }}>Edit</button>}
    </div>
  )
}

type ExperienceEntry = { role: string; company: string; start: string; end: string; desc: string }
type EducationEntry = { school: string; degree: string; start: string; end: string }

export default function ApplyForm({ jobId, jobTitle, jobTeam, jobLocation }: Props) {
  const [step, setStep] = useState(0)
  const [cvName, setCvName] = useState('')
  const [cvKey, setCvKey] = useState<string | undefined>(undefined)
  const [parsing, setParsing] = useState(false)
  const [parsed, setParsed] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '' })
  const [experience, setExperience] = useState<ExperienceEntry[]>([])
  const [education, setEducation] = useState<EducationEntry[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [answers, setAnswers] = useState({ why: '', authorization: '', start: '', referral: '', accommodations: '' })
  const [eeo, setEeo] = useState({ gender: '', race: '', veteran: '', disability: '' })
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [refNum] = useState(() => `B3-${jobId.slice(0, 5).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`)

  const steps = ['Upload', 'Profile', 'Experience', 'Questions', 'Review']

  const readFileAsBase64 = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        resolve(dataUrl.split(',')[1] ?? '')
      }
      reader.readAsDataURL(file)
    })

  const extractPdfText = async (file: File): Promise<string> => {
    const pdfjs = await import('pdfjs-dist')
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      text += content.items
        .map((item) => ('str' in item ? (item as { str: string }).str : ''))
        .join(' ') + '\n'
    }
    return text.trim()
  }

  const parseCV = async (file: File) => {
    setCvName(file.name)
    setParsing(true)
    setParsed(false)

    const name = file.name.toLowerCase()
    let text: string | undefined

    try {
      if (name.endsWith('.txt')) {
        text = await file.text()
      } else if (name.endsWith('.pdf')) {
        text = await extractPdfText(file)
      }
    } catch {
      // text extraction failed — continue without it, file still uploads to R2
    }

    const base64 = await readFileAsBase64(file)

    try {
      const res = await fetch('/api/parse-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, cvBase64: base64, cvName: file.name }),
      })
      if (res.ok) {
        const data = await res.json() as {
          cvKey?: string
          firstName?: string; lastName?: string; email?: string; phone?: string
          location?: string; linkedin?: string; github?: string; portfolio?: string
          skills?: string[]
          experience?: Array<{ role: string; company: string; start: string; end: string; desc: string }>
          education?: Array<{ school: string; degree: string; start: string; end: string }>
        }
        if (data.cvKey) setCvKey(data.cvKey)
        setProfile((p) => ({
          firstName: data.firstName || p.firstName,
          lastName: data.lastName || p.lastName,
          email: data.email || p.email,
          phone: data.phone || p.phone,
          location: data.location || p.location,
          linkedin: data.linkedin || p.linkedin,
          github: data.github || p.github,
          portfolio: data.portfolio || p.portfolio,
        }))
        if (data.experience?.length) setExperience(data.experience)
        if (data.education?.length) setEducation(data.education)
        if (data.skills?.length) setSkills(data.skills)
      }
    } catch {
      // silent — user can fill in manually
    }

    setParsing(false)
    setParsed(true)
  }

  const handleFile = (file: File) => { if (file) parseCV(file) }

  const addExperience = () => setExperience((p) => [...p, { role: '', company: '', start: '', end: '', desc: '' }])
  const updateExperience = (i: number, f: keyof ExperienceEntry, v: string) => setExperience((p) => p.map((e, idx) => idx === i ? { ...e, [f]: v } : e))
  const removeExperience = (i: number) => setExperience((p) => p.filter((_, idx) => idx !== i))

  const addEducation = () => setEducation((p) => [...p, { school: '', degree: '', start: '', end: '' }])
  const updateEducation = (i: number, f: keyof EducationEntry, v: string) => setEducation((p) => p.map((e, idx) => idx === i ? { ...e, [f]: v } : e))
  const removeEducation = (i: number) => setEducation((p) => p.filter((_, idx) => idx !== i))

  const addSkill = () => {
    const t = newSkill.trim()
    if (t && !skills.includes(t)) { setSkills((p) => [...p, t]); setNewSkill('') }
  }
  const removeSkill = (s: string) => setSkills((p) => p.filter((sk) => sk !== s))

  if (step === 5) {
    return (
      <div className="sec" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16.5l5.5 5.5 10.5-11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-unbounded" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Application sent.</h1>
          <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.6, marginBottom: 8 }}>
            Thanks for applying for <strong style={{ color: '#1d1d1f' }}>{jobTitle}</strong>. We review every application personally.
          </p>
          <p style={{ fontSize: 15, color: '#86868b', marginBottom: 8 }}>A confirmation has been sent to <strong>{profile.email}</strong>.</p>
          <p style={{ fontSize: 13, color: '#86868b', marginBottom: 36 }}>Reference: <span style={{ fontFamily: 'monospace' }}>{refNum}</span></p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/careers" className="btn btn-primary">See other roles</a>
            <a href="/" className="btn btn-secondary">Back to home</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-fade sec" style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="sec-inner" style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 8 }}>
          <a href={`/careers/${jobId}`} style={{ fontSize: 14, color: '#86868b' }}>← {jobTitle}</a>
        </div>
        <h1 className="font-unbounded" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 4 }}>Apply</h1>
        <p style={{ fontSize: 15, color: '#86868b', marginBottom: 0 }}>{jobTeam} · {jobLocation}</p>

        {/* Stepper */}
        <div className="b3-stepper">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className={'step ' + (i === step ? 'active' : i < step ? 'done' : '')}>
                <span className="num">{i < step ? '✓' : i + 1}</span>
                <span>{s}</span>
              </div>
              {i < steps.length - 1 && <div className="bar" />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 0: Upload */}
        {step === 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Upload your CV</h2>
            <p style={{ fontSize: 15, color: '#86868b', marginBottom: 24 }}>We&rsquo;ll auto-fill your details from your CV. You can edit everything afterwards.</p>
            <div
              className={'dropzone' + (dragOver ? ' hover' : '') + (parsed ? ' parsed' : '')}
              onClick={() => !parsed && fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
            >
              <input ref={fileRef} type="file" accept=".pdf,.txt" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
              {parsing && <div><div className="loader" /><div style={{ fontSize: 15, color: '#86868b' }}>Parsing {cvName}…</div></div>}
              {!parsing && !parsed && (
                <div>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto 12px', display: 'block' }}>
                    <rect x="8" y="4" width="24" height="32" rx="4" stroke="#d2d2d7" strokeWidth="1.5" />
                    <path d="M14 14h12M14 20h12M14 26h8" stroke="#d2d2d7" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="29" cy="10" r="7" fill="#f5f5f7" stroke="#d2d2d7" strokeWidth="1.5" />
                    <path d="M29 7v6M26 10h6" stroke="#86868b" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div style={{ fontSize: 17, fontWeight: 500, color: '#1d1d1f', marginBottom: 8 }}>Drop your CV here</div>
                  <div style={{ fontSize: 14, color: '#86868b' }}>PDF or TXT · up to 10 MB</div>
                  <div style={{ display: 'inline-block', marginTop: 16, padding: '8px 18px', background: '#1d1d1f', color: '#fff', borderRadius: 980, fontSize: 14 }}>Choose file</div>
                </div>
              )}
              {!parsing && parsed && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, background: '#34c759', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.5 9.5l4 4 7.5-7.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: '#1d1d1f' }}>{cvName}</div>
                      <div style={{ fontSize: 13, color: '#86868b' }}>Parsed successfully</div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setCvName(''); setParsed(false); setCvKey(undefined) }} style={{ marginLeft: 'auto', fontSize: 13, color: '#0071e3', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {skills.slice(0, 6).map((s) => <span key={s} className="parse-chip">{s}</span>)}
                    {skills.length > 6 && <span className="parse-chip">+{skills.length - 6} more</span>}
                  </div>
                </div>
              )}
            </div>
            <StepNav onNext={() => setStep(1)} nextLabel="Continue" />
            <p style={{ textAlign: 'center', fontSize: 13, color: '#86868b', marginTop: 16 }}>
              Don&rsquo;t have a CV handy?{' '}
              <button onClick={() => setStep(1)} style={{ color: '#0071e3', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Fill in manually →</button>
            </p>
          </div>
        )}

        {/* Step 1: Profile */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Your profile</h2>
            <p style={{ fontSize: 15, color: '#86868b', marginBottom: 24 }}>Tell us who you are.</p>
            <div style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <TextField label="First name *" value={profile.firstName} onChange={(v) => setProfile((p) => ({ ...p, firstName: v }))} required />
                <TextField label="Last name *" value={profile.lastName} onChange={(v) => setProfile((p) => ({ ...p, lastName: v }))} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <TextField label="Work email *" value={profile.email} onChange={(v) => setProfile((p) => ({ ...p, email: v }))} type="email" required />
                <TextField label="Phone *" value={profile.phone} onChange={(v) => setProfile((p) => ({ ...p, phone: v }))} type="tel" required />
              </div>
              <TextField label="Current location *" value={profile.location} onChange={(v) => setProfile((p) => ({ ...p, location: v }))} required />
              <TextField label="LinkedIn URL (optional)" value={profile.linkedin} onChange={(v) => setProfile((p) => ({ ...p, linkedin: v }))} />
              <TextField label="GitHub URL (optional)" value={profile.github} onChange={(v) => setProfile((p) => ({ ...p, github: v }))} />
              <TextField label="Portfolio / website (optional)" value={profile.portfolio} onChange={(v) => setProfile((p) => ({ ...p, portfolio: v }))} />
            </div>
            <StepNav onBack={() => setStep(0)} onNext={() => setStep(2)} nextDisabled={!profile.firstName || !profile.lastName || !profile.email || !profile.phone || !profile.location} />
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Experience &amp; education</h2>
            <p style={{ fontSize: 15, color: '#86868b', marginBottom: 24 }}>Add your relevant experience.</p>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Work experience</h3>
                <button onClick={addExperience} className="btn btn-secondary btn-sm">+ Add</button>
              </div>
              {experience.length === 0 && <p style={{ fontSize: 14, color: '#86868b' }}>No experience added yet.</p>}
              {experience.map((e, i) => (
                <div key={i} style={{ background: '#f5f5f7', borderRadius: 14, padding: '18px 20px', marginBottom: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <TextField label="Job title" value={e.role} onChange={(v) => updateExperience(i, 'role', v)} />
                    <TextField label="Company" value={e.company} onChange={(v) => updateExperience(i, 'company', v)} />
                    <TextField label="Start year" value={e.start} onChange={(v) => updateExperience(i, 'start', v)} />
                    <TextField label="End year / Present" value={e.end} onChange={(v) => updateExperience(i, 'end', v)} />
                  </div>
                  <TextareaField label="Description" value={e.desc} onChange={(v) => updateExperience(i, 'desc', v)} rows={2} />
                  <button onClick={() => removeExperience(i)} style={{ fontSize: 13, color: '#c00', background: 'none', border: 'none', cursor: 'pointer', marginTop: 8 }}>Remove</button>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Education</h3>
                <button onClick={addEducation} className="btn btn-secondary btn-sm">+ Add</button>
              </div>
              {education.length === 0 && <p style={{ fontSize: 14, color: '#86868b' }}>No education added yet.</p>}
              {education.map((e, i) => (
                <div key={i} style={{ background: '#f5f5f7', borderRadius: 14, padding: '18px 20px', marginBottom: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <TextField label="School" value={e.school} onChange={(v) => updateEducation(i, 'school', v)} />
                    <TextField label="Degree" value={e.degree} onChange={(v) => updateEducation(i, 'degree', v)} />
                    <TextField label="Start year" value={e.start} onChange={(v) => updateEducation(i, 'start', v)} />
                    <TextField label="End year" value={e.end} onChange={(v) => updateEducation(i, 'end', v)} />
                  </div>
                  <button onClick={() => removeEducation(i)} style={{ fontSize: 13, color: '#c00', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {skills.map((s) => (
                  <span key={s} className="parse-chip">{s}<span className="x" onClick={() => removeSkill(s)}>×</span></span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <input className="b3-input" placeholder="Add a skill…" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill()} style={{ flex: 1 }} />
                <button onClick={addSkill} className="btn btn-secondary btn-sm">Add</button>
              </div>
            </div>
            <StepNav onBack={() => setStep(1)} onNext={() => setStep(3)} />
          </div>
        )}

        {/* Step 3: Questions */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>A few questions</h2>
            <p style={{ fontSize: 15, color: '#86868b', marginBottom: 24 }}>Help us understand you better.</p>
            <div style={{ display: 'grid', gap: 16 }}>
              <TextareaField label="Why B3? What draws you to this role and our company? *" value={answers.why} onChange={(v) => setAnswers((a) => ({ ...a, why: v }))} rows={4} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <SelectField label="Work authorization *" value={answers.authorization} onChange={(v) => setAnswers((a) => ({ ...a, authorization: v }))} options={['US Citizen', 'Permanent Resident', 'Visa Sponsorship Required', 'Other']} required />
                <SelectField label="Earliest start date *" value={answers.start} onChange={(v) => setAnswers((a) => ({ ...a, start: v }))} options={['Immediately', '2 weeks', '1 month', '2 months', '3+ months']} required />
              </div>
              <TextField label="How did you hear about us? (optional)" value={answers.referral} onChange={(v) => setAnswers((a) => ({ ...a, referral: v }))} />
              <TextareaField label="Accommodations needed? (optional)" value={answers.accommodations} onChange={(v) => setAnswers((a) => ({ ...a, accommodations: v }))} rows={3} />
            </div>
            <div style={{ marginTop: 32, padding: 20, background: '#f5f5f7', borderRadius: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Equal Employment Opportunity (optional)</div>
              <p style={{ fontSize: 13, color: '#86868b', marginBottom: 16, lineHeight: 1.5 }}>This information is voluntary and used only for compliance reporting.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <SelectField label="Gender identity" value={eeo.gender} onChange={(v) => setEeo((e) => ({ ...e, gender: v }))} options={['Male', 'Female', 'Non-binary', 'Prefer not to say']} />
                <SelectField label="Race / Ethnicity" value={eeo.race} onChange={(v) => setEeo((e) => ({ ...e, race: v }))} options={['Asian', 'Black or African American', 'Hispanic or Latino', 'White', 'Two or more races', 'Prefer not to say']} />
                <SelectField label="Veteran status" value={eeo.veteran} onChange={(v) => setEeo((e) => ({ ...e, veteran: v }))} options={['Not a veteran', 'Protected veteran', 'Prefer not to say']} />
                <SelectField label="Disability status" value={eeo.disability} onChange={(v) => setEeo((e) => ({ ...e, disability: v }))} options={['No disability', 'Yes, I have a disability', 'Prefer not to say']} />
              </div>
            </div>
            <StepNav onBack={() => setStep(2)} onNext={() => setStep(4)} nextDisabled={!answers.why || !answers.authorization || !answers.start} />
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Review your application</h2>
            <p style={{ fontSize: 15, color: '#86868b', marginBottom: 24 }}>Check everything before submitting.</p>
            <div style={{ background: '#f5f5f7', borderRadius: 14, padding: '4px 20px', marginBottom: 24 }}>
              <ReviewRow label="Applying for" value={<strong>{jobTitle}</strong>} />
              <ReviewRow label="CV" value={cvName || 'Manual entry'} onEdit={() => setStep(0)} />
              <ReviewRow label="Name" value={`${profile.firstName} ${profile.lastName}`} onEdit={() => setStep(1)} />
              <ReviewRow label="Email" value={profile.email} onEdit={() => setStep(1)} />
              <ReviewRow label="Phone" value={profile.phone} onEdit={() => setStep(1)} />
              <ReviewRow label="Location" value={profile.location} onEdit={() => setStep(1)} />
              <ReviewRow label="Experience" value={experience.length > 0 ? experience.map((e) => <div key={e.company + e.role} style={{ marginBottom: 6 }}><strong>{e.role}</strong> at {e.company} · {e.start}–{e.end}</div>) : 'None added'} onEdit={() => setStep(2)} />
              <ReviewRow label="Education" value={education.length > 0 ? education.map((e) => <div key={e.school} style={{ marginBottom: 6 }}>{e.degree} · {e.school}</div>) : 'None added'} onEdit={() => setStep(2)} />
              <ReviewRow label="Skills" value={skills.length > 0 ? <div style={{ display: 'flex', flexWrap: 'wrap' }}>{skills.map((s) => <span key={s} className="parse-chip" style={{ margin: '2px 4px 2px 0' }}>{s}</span>)}</div> : 'None added'} onEdit={() => setStep(2)} />
              <ReviewRow label="Start date" value={answers.start} onEdit={() => setStep(3)} />
              <ReviewRow label="Authorization" value={answers.authorization} onEdit={() => setStep(3)} />
            </div>
            <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '16px 20px', background: '#fff', borderRadius: 12, border: '1px solid #d2d2d7', cursor: 'pointer', marginBottom: 8 }}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: 3, flexShrink: 0, accentColor: '#0071e3', width: 16, height: 16 }} />
              <span style={{ fontSize: 14, color: '#1d1d1f', lineHeight: 1.55 }}>
                I confirm the information provided is accurate. I consent to B3 storing and processing my data for recruitment purposes in accordance with our{' '}
                <a href="/privacy" style={{ color: '#0071e3' }}>Privacy Policy</a>.
              </span>
            </label>
            {submitError && (
              <div style={{ marginTop: 16, padding: '12px 16px', background: '#fff2f2', border: '1px solid #ffcccc', borderRadius: 10, color: '#c00', fontSize: 14 }}>{submitError}</div>
            )}
            <StepNav
              onBack={() => setStep(3)}
              onNext={async () => {
                setSubmitting(true)
                setSubmitError(null)
                try {
                  const payload: ApplicationBody = {
                    jobId,
                    jobTitle,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    email: profile.email,
                    phone: profile.phone,
                    location: profile.location,
                    linkedin: profile.linkedin || undefined,
                    github: profile.github || undefined,
                    portfolio: profile.portfolio || undefined,
                    experienceSummary: experience.map((e) => `${e.role} at ${e.company} (${e.start}–${e.end})\n${e.desc}`).join('\n\n'),
                    educationSummary: education.map((e) => `${e.degree}, ${e.school} (${e.start}–${e.end})`).join('\n'),
                    skills,
                    whyB3: answers.why,
                    authorization: answers.authorization,
                    startDate: answers.start,
                    referral: answers.referral || undefined,
                    cvName: cvName || 'Manual entry',
                    cvKey: cvKey || undefined,
                  }
                  const res = await fetch('/api/applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                  const data = await res.json() as { error?: string }
                  if (!res.ok) throw new Error(data.error || 'Submission failed')
                  setStep(5)
                } catch (err) {
                  setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
                } finally {
                  setSubmitting(false)
                }
              }}
              nextLabel={submitting ? 'Submitting…' : 'Submit application'}
              nextDisabled={!consent || submitting}
            />
          </div>
        )}
      </div>
    </div>
  )
}

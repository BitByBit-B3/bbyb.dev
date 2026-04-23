export interface ContactFormBody {
  name: string
  email: string
  company?: string
  service: string
  budget?: string
  timeline?: string
  message: string
}

export interface ApplicationBody {
  jobId: string
  jobTitle: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  portfolio?: string
  linkedin?: string
  github?: string
  experienceSummary: string
  educationSummary: string
  skills: string[]
  whyB3: string
  authorization: string
  startDate: string
  referral?: string
  cvName: string
  cvKey?: string
}

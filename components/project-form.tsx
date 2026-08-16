'use client'

import { FormEvent, useState } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

const services = ['Web Development', 'SEO', 'Mobile App Development', 'Google Ads', 'Digital Marketing', 'Custom Software Development', 'ERP / CRM', 'Other']
const budgets = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $10,000', '$10,000+', 'Not sure yet']

type FormValues = Record<string, string>

export function ProjectForm() {
  const [values, setValues] = useState<FormValues>({})
  const [errors, setErrors] = useState<FormValues>({})
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)

  function update(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const required = ['fullName', 'email', 'service', 'budget', 'details']
    const nextErrors: FormValues = {}
    required.forEach((name) => { if (!values[name]?.trim()) nextErrors[name] = 'This field is required.' })
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Enter a valid work email.'
    if (values.website && !/^https?:\/\//.test(values.website)) nextErrors.website = 'Use a full URL beginning with https://.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setPending(true)
    window.setTimeout(() => { setPending(false); setSubmitted(true) }, 550)
  }

  if (submitted) return <div className="flex min-h-[420px] flex-col items-start justify-center rounded-2xl border border-primary/15 bg-background p-7 sm:p-10"><CheckCircle2 size={32} className="text-primary" /><h3 className="mt-6 font-serif text-4xl tracking-[-0.03em] text-primary">Thanks for reaching out.</h3><p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">Your project details are saved for this conversation. We&apos;ll be in touch soon to understand what you&apos;re building.</p><button type="button" onClick={() => { setSubmitted(false); setValues({}) }} className="mt-8 text-sm font-semibold text-primary underline underline-offset-4">Send another enquiry</button></div>

  const field = (name: string, label: string, type = 'text', required = false) => <div><label htmlFor={name} className="form-label">{label}{required && <span aria-hidden="true"> *</span>}</label><input id={name} name={name} type={type} value={values[name] || ''} onChange={(event) => update(name, event.target.value)} className={`form-control ${errors[name] ? 'form-control-error' : ''}`} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <p id={`${name}-error`} className="form-error" role="alert">{errors[name]}</p>}</div>
  const select = (name: string, label: string, options: string[]) => <div><label htmlFor={name} className="form-label">{label}<span aria-hidden="true"> *</span></label><select id={name} name={name} value={values[name] || ''} onChange={(event) => update(name, event.target.value)} className={`form-control ${errors[name] ? 'form-control-error' : ''}`} aria-invalid={Boolean(errors[name])}><option value="">Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select>{errors[name] && <p className="form-error" role="alert">{errors[name]}</p>}</div>

  return <form onSubmit={submit} noValidate className="rounded-2xl border border-border bg-background p-5 sm:p-8"><div className="grid gap-6 sm:grid-cols-2">{field('fullName', 'Full Name', 'text', true)}{field('email', 'Work Email', 'email', true)}{field('phone', 'Phone Number', 'tel')}{field('company', 'Company Name')}{select('service', 'Service Required', services)}{select('budget', 'Project Budget', budgets)}<div className="sm:col-span-2">{field('website', 'Website URL (optional)', 'url')}</div><div className="sm:col-span-2"><label htmlFor="details" className="form-label">Project Details<span aria-hidden="true"> *</span></label><textarea id="details" name="details" rows={6} value={values.details || ''} onChange={(event) => update('details', event.target.value)} className={`form-control min-h-40 resize-y ${errors.details ? 'form-control-error' : ''}`} aria-invalid={Boolean(errors.details)} />{errors.details && <p className="form-error" role="alert">{errors.details}</p>}</div></div><button type="submit" disabled={pending} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{pending ? 'Sending details…' : 'Discuss Your Project'} {!pending && <ArrowUpRight size={17} />}</button></form>
}

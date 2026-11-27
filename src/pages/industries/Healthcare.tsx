import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Accessibility, Activity, ArrowDown, ArrowRight, ArrowUpRight, Brain, Building2, CalendarCheck, Check, ChevronDown, Clock, FileText, HeartPulse, Layers, Lock, MapPin, MessageCircle, Phone, Pill, Search, Smartphone, Star, Stethoscope, Users, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

/* ---------- Photos (free to use, Burst by Shopify). Swap for your own paths any time. ---------- */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1600&format=pjpg&exif=0&iptc=0`
const IMG = {
  heroMain: burst('woman-doctor'),
  heroSide: burst('nurse-helping-patient'),
  band: burst('doctor-holds-chart'),
  buildNew: burst('male-doctor-with-stethoscope-and-clipboard'),
  hospitals: burst('nurse-helping-patient'),
  clinics: burst('doctor-holds-chart'),
  dental: burst('male-dentist'),
  gear: burst('doctors-medical-gear'),
  mental: burst('patient-receives-some-good-news'),
  specialty: burst('doctor-and-nurse-examine-x-rays'),
  labs: burst('pills-pill-container'),
  wellness: burst('herbal-vitamins'),
  branches: burst('doctor-walking-down-hallway-with-clipboard'),
  cta: burst('male-doctor-holding-out-stethoscope'),
}

const ACCENT = '#2f7f9e'
const TEAL = '#087b87'
const MINT = '#55c9c0'
const NAVY = '#102a3d'

/* ---------- Data ---------- */
const leaks = [
  { icon: Gauge, title: 'Slow, heavy pages', tag: 'Lost on mobile', text: 'Patients often search from a phone, sometimes on a weak network. A page that takes too long to load loses them before they see your timings.', fix: 'Lean, mobile-first pages with compressed images, so timings and the call button show up instantly.' },
  { icon: Accessibility, title: 'Hard to read and use', tag: 'Excludes patients', text: 'Small text, low contrast and forms that don’t work with a screen reader shut out elderly patients and people with disabilities.', fix: 'Large, high-contrast text and keyboard and screen-reader friendly forms, tested to WCAG 2.1 AA.' },
  { icon: Lock, title: 'Careless data handling', tag: 'Privacy risk', text: 'Forms and trackers that collect more than needed, or leak details to third parties, put patient trust and your compliance at risk.', fix: 'Only the fields an enquiry needs, a clear consent line, and trackers that never receive health details.' },
  { icon: Star, title: 'Weak trust signals', tag: 'Fewer bookings', text: 'Anxious first-time visitors look for credentials, real reviews and a clear way to reach a person quickly.', fix: 'Doctor profiles with credentials, genuine reviews, and one-tap call and WhatsApp right where doubt sets in.' },
]

const layers = [
  { icon: Lock, title: 'DPDP Act 2023 & Rules 2025', text: 'India’s data protection law. It expects clear consent, collecting only what you need, and reasonable security safeguards for patients’ personal data.' },
  { icon: Accessibility, title: 'RPwD Act 2016 & the Supreme Court’s 2025 ruling', text: 'Accessibility duties for service providers, and a 2025 judgment recognising digital access as part of the right to life under Article 21.' },
  { icon: Layers, title: 'WCAG 2.1 Level AA', text: 'The widely used technical standard for accessible websites, and the practical benchmark we build and test against.' },
  { icon: Stethoscope, title: 'Medical advertising & telemedicine rules', text: 'Rules from your medical council and the Telemedicine Practice Guidelines shape what you can claim and how you consult online.' },
]

const timeline = [
  { date: 'Aug 2023', title: 'DPDP Act passed', text: 'India’s Digital Personal Data Protection Act becomes law.' },
  { date: '30 Apr 2025', title: 'Supreme Court ruling', text: 'Digital access is held to be part of the right to life under Article 21.' },
  { date: '13 Nov 2025', title: 'DPDP Rules notified', text: 'The rules set an 18-month phased schedule for organisations to comply.' },
  { date: 'About May 2027', title: 'Phase-in completes', text: 'The 18-month window ends. Building properly now is easier than fixing later.' },
]

const whatsIncluded = [
  { icon: HeartPulse, title: 'Patient-experience design', text: 'Doctor profiles, services and timings organised around how patients actually search, with a calm, readable layout that works for stressed first-time visitors.' },
  { icon: Phone, title: 'Conversion mechanics', text: 'One-tap call, WhatsApp and appointment request buttons, clear directions and visible trust signals, because most patients want to reach a person fast.' },
  { icon: Lock, title: 'Privacy by design', text: 'Consent where data is collected, only the fields that are needed, no patient records stored on the website, and trackers that never receive health details.' },
  { icon: Accessibility, title: 'Accessible by default', text: 'Keyboard and screen-reader support, strong contrast, readable type and accessible forms, built in and tested rather than patched on with an overlay.' },
  { icon: Search, title: 'Local search foundation', text: 'Fast pages, clean structure and a well-set-up Google Business Profile so patients near you can find you. Ad campaigns are scoped separately.' },
  { icon: MessageCircle, title: 'Reminders and routing', text: 'WhatsApp or SMS appointment reminders and a tidy way to route enquiries to the right doctor or front desk.' },
]

const hub = [
  { icon: MapPin, label: 'Google Business Profile', sub: 'Maps, hours, reviews' },
  { icon: MessageCircle, label: 'WhatsApp Business', sub: 'Enquiries and reminders' },
  { icon: CalendarCheck, label: 'Appointment booking', sub: 'Requests or live slots' },
  { icon: Smartphone, label: 'Teleconsult link', sub: 'Video visit entry point' },
  { icon: FileText, label: 'Digital intake form', sub: 'Consent-first, minimal fields' },
  { icon: Star, label: 'Reviews', sub: 'Collect and showcase' },
]

const segments = [
  { name: 'Hospitals & nursing homes', text: 'Multi-department sites where clarity, accessibility and a consistent brand across services matter most.', icon: Building2, image: IMG.hospitals },
  { name: 'Clinics & private practices', text: 'Fast, mobile-first sites that turn local searches into booked appointments with call, WhatsApp and booking buttons.', icon: Stethoscope, image: IMG.clinics },
  { name: 'Dental clinics', text: 'Treatment pages, smile galleries, easy booking and accessible forms, with the same privacy backbone as medical sites.', icon: Activity, image: IMG.dental },
  { name: 'Mental health & therapy', text: 'Calm, private, trust-first sites with discreet enquiry flows that respect how sensitive this care is.', icon: Brain, image: IMG.mental },
  { name: 'Specialty practices', text: 'Dermatology, orthopaedics, gynaecology, eye care and more: service-led pages that explain care simply and rank for specialty searches.', icon: HeartPulse, image: IMG.specialty },
  { name: 'Diagnostic labs & pharmacies', text: 'Test catalogues, home-collection booking, report access links and WhatsApp ordering for medicines.', icon: Pill, image: IMG.labs },
  { name: 'Ayurveda, physio & wellness', text: 'Warm, credible sites for wellness and rehabilitation centres that balance brand with accurate, responsible claims.', icon: Users, image: IMG.wellness },
  { name: 'Multi-branch groups', text: 'One consistent system with per-branch pages and local SEO, central booking and a single accessible standard.', icon: Layers, image: IMG.branches },
]

const processSteps = [
  { title: 'Audit & discovery', text: 'We review your current site, Google profile and WhatsApp for accessibility, privacy, speed and search visibility. For a new site, we start with your practice, patients and goals.' },
  { title: 'Scoping & architecture', text: 'We map services, doctors, branches and patient journeys, and decide what data is collected, why, and where it goes, before design begins.' },
  { title: 'Design', text: 'Patient-friendly layouts and your brand, designed to be accessible from the first wireframe rather than patched at the end.' },
  { title: 'Build & integrate', text: 'Development, booking, WhatsApp, Google profile and reminders, with accessibility and privacy checks included in QA.' },
  { title: 'Launch & ongoing care', text: 'Redirects for existing pages, tracking set up safely, post-launch monitoring and monthly care so the site stays current.' },
]

const reasons = [
  'One accountable lead, with specialists for web, commerce and local setup.',
  'Fixed scope and upfront pricing, with clear packs for small clinics.',
  'Privacy and accessibility planned from the start, not bolted on at the end.',
  'Built for how Indian patients reach clinics: phone calls, WhatsApp and Google Maps.',
  'Mobile-first by default, because that is where your patients are.',
]

const costDrivers = [
  { icon: Layers, title: 'Number of pages & branches', text: 'A single-clinic site is simpler than a multi-branch group.', from: 'One clinic', to: 'Many branches' },
  { icon: Users, title: 'Doctors & services', text: 'Profiles, treatment pages and the content behind them.', from: 'Few', to: 'Many' },
  { icon: CalendarCheck, title: 'Booking & integrations', text: 'Enquiry buttons versus live booking, reminders and teleconsult.', from: 'Simple', to: 'Connected' },
  { icon: Wrench, title: 'Migration scope', text: 'For rebuilds, the size of the existing site and its URLs.', from: 'Small', to: 'Large' },
  { icon: FileText, title: 'Content & photography', text: 'Using your material versus new copy, photos and video.', from: 'Provided', to: 'Created' },
]

const faqs: [string, string][] = [
  ['How is a healthcare website different from a normal business site?', 'It has to earn the trust of an anxious visitor, work for every patient including the elderly and people with disabilities, and handle personal data carefully. Those three jobs shape the design, the forms, the hosting and the content.'],
  ['Does my clinic website need to follow India’s data protection law?', 'If your site collects personal details such as names, phone numbers or symptoms through forms or enquiry buttons, the Digital Personal Data Protection Act applies in principle. The Rules were notified in November 2025 with an 18-month phase-in. We design consent and minimal data collection in from the start. This is general information, not legal advice, so confirm specifics with a legal advisor.'],
  ['What does an accessible website mean for a clinic?', 'It means patients can use your site with a keyboard or screen reader, read it with good contrast and large enough text, and complete forms without barriers. We build to WCAG 2.1 Level AA and test it. We don’t use overlay widgets that claim to fix accessibility automatically.'],
  ['Can you redesign my existing site without losing search rankings?', 'Yes. We audit the current site, fix privacy and accessibility gaps, map important URLs and set up 301 redirects so the visibility you’ve earned carries over.'],
  ['Do you store patient records on the website?', 'No. We build the site so that it collects only what an enquiry or appointment request needs, and we don’t keep patient records on the marketing site. Medical records belong in your clinic’s own systems.'],
  ['Can you connect booking, WhatsApp and reminders?', 'Yes. We set up appointment request flows, WhatsApp Business, reminders and Google Business Profile. Connections to hospital software depend on what that system supports, and we scope them after the audit.'],
  ['Can patient reviews and before/after photos be shown?', 'Medical councils set rules on advertising and patient testimonials, and they differ by profession. We keep content informational and check with you what is appropriate to publish. Please confirm with your medical council.'],
  ['How much does a clinic website cost?', 'For a small clinic, our Business Digital Pack starts at ₹4,999 one time and includes up to 5 pages, WhatsApp Business setup, Google Business Profile help and basic SEO. Larger or multi-branch builds are scoped after the audit with a fixed proposal.'],
  ['What happens after launch?', 'You’re not left alone. Monthly care plans cover uptime checks, backups and content updates, so your timings, doctors and services stay accurate.'],
]

/* ---------- Hooks & building blocks ---------- */
function Gauge(props: { size?: number; style?: CSSProperties }) {
  const { size = 24, style } = props
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  )
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold, rootMargin: '0px 0px -6% 0px' })
    io.observe(el)
    const t = window.setTimeout(() => setSeen(true), 2800)
    return () => { io.disconnect(); window.clearTimeout(t) }
  }, [threshold])
  return [ref, seen] as const
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0)
  return <div ref={ref} className={`hc-reveal ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Photo({ src, alt, className = '', tint = ACCENT }: { src: string; alt: string; className?: string; tint?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={className} style={{ background: `linear-gradient(135deg, ${tint}22, ${tint}55)` }} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

function Marquee({ children, duration = 40, reverse = false }: { children: ReactNode; duration?: number; reverse?: boolean }) {
  return (
    <div className="hc-marquee">
      <div className="hc-track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div className="hc-set">{children}</div>
        <div className="hc-set hc-dup" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

// Drag-to-compare: a hard-to-use clinic page vs a clear, accessible one.
function ClinicCompare() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative h-[440px] select-none overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_70px_rgba(0,0,0,.35)]">
      {/* After */}
      <div className="absolute inset-0 bg-white p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: TEAL }}>Clinic page · after</p>
        <div className="rounded-2xl bg-[#eef6f8] p-4">
          <p className="text-lg font-bold text-[#102a3d]">Dr. Sharma’s Family Clinic</p>
          <p className="text-sm text-[#33424e]">Open today · 9:00 am – 8:00 pm</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm font-bold">
          <span className="rounded-xl px-2 py-3 text-white" style={{ background: TEAL }}>Call now</span>
          <span className="rounded-xl bg-[#25a244] px-2 py-3 text-white">WhatsApp</span>
          <span className="rounded-xl border-2 px-2 py-3" style={{ borderColor: TEAL, color: TEAL }}>Book visit</span>
        </div>
        <div className="mt-3 space-y-2 text-sm text-[#33424e]">
          <p className="flex items-center gap-2"><MapPin size={15} style={{ color: TEAL }} /> Directions on Google Maps</p>
          <p className="flex items-center gap-2"><Star size={15} style={{ color: TEAL }} /> Verified patient reviews</p>
          <p className="flex items-center gap-2"><Accessibility size={15} style={{ color: TEAL }} /> Large text, high contrast, screen-reader friendly</p>
        </div>
      </div>
      {/* Before */}
      <div className="absolute inset-0 bg-[#e9e9e9] p-6" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#e36a27]">Clinic page · before</p>
        <p className="text-sm font-bold text-[#8a8a8a]">Dr. Sharma’s Family Clinic</p>
        <p className="mt-1 text-[10px] leading-tight text-[#b5b5b5]">Timings: see below. Contact us for details. Appointments available on request, kindly fill the long enquiry form in the footer section of the page after scrolling.</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {['Name', 'Age', 'Address', 'Phone', 'Email', 'Medical history', 'Symptoms', 'Upload report'].map((f) => <div key={f} className="rounded border border-[#d0d0d0] bg-[#f3f3f3] px-2 py-1.5 text-[10px] text-[#b0b0b0]">{f}</div>)}
        </div>
        <p className="mt-3 text-[10px] text-[#b5b5b5]">No consent notice · small low-contrast text · no one-tap call</p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.1)]" style={{ left: `${pos}%` }} />
      <div className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg" style={{ left: `${pos}%` }}>
        <span className="text-[#102a3d]">↔</span>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Drag to compare a hard-to-use clinic page and a clear one" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  )
}

// Interactive phone: pick a leak, see it on the page, flip to see the fix.
function StakesExplorer({ onAudit }: { onAudit: () => void }) {
  const [active, setActive] = useState(0)
  const [fixed, setFixed] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setActive((a) => (a + 1) % leaks.length), 6000)
    return () => window.clearInterval(t)
  }, [paused])

  const zone = (i: number) => `relative rounded-2xl p-3 transition duration-500 ${active === i ? 'opacity-100 ring-2 ring-[#e36a27] shadow-[0_8px_24px_rgba(227,106,39,.25)]' : 'opacity-40'} ${active === i && fixed ? '!ring-[#087b87] !shadow-[0_8px_24px_rgba(8,123,135,.25)]' : ''}`
  const tagCls = (i: number) => `absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide transition ${active === i ? 'opacity-100' : 'opacity-0'} ${fixed ? 'bg-[#087b87] text-white' : 'bg-[#e36a27] text-white'}`

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_340px_1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      {/* Tabs */}
      <div className="order-2 space-y-3 lg:order-1" role="tablist" aria-label="Where clinic websites lose patients">
        {leaks.map((l, i) => (
          <button key={l.title} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition duration-300 ${active === i ? 'border-[#2f7f9e] bg-white shadow-[0_14px_36px_rgba(47,127,158,.18)]' : 'border-[#d3e3ea] bg-white/60 hover:bg-white'}`}>
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${active === i ? 'text-white' : 'bg-[#e6f0f5] text-[#2f7f9e]'}`} style={active === i ? { background: ACCENT } : undefined}><l.icon size={20} /></span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#102a3d]">{l.title}</p>
                <p className="text-xs font-semibold" style={{ color: ACCENT }}>{l.tag}</p>
              </div>
              <span className="text-xs font-bold text-[#9db2bd]">0{i + 1}</span>
            </div>
            {active === i && (
              <>
                <p className="mt-3 text-sm leading-relaxed text-[#5e6b76]">{fixed ? l.fix : l.text}</p>
                {!paused && <span key={`bar-${i}`} className="hc-fill absolute bottom-0 left-0 h-0.5 w-full" style={{ background: ACCENT }} />}
              </>
            )}
          </button>
        ))}
      </div>

      {/* Phone */}
      <div className="order-1 mx-auto w-[300px] lg:order-2">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 text-sm font-bold shadow-sm ring-1 ring-[#d3e3ea]" role="group" aria-label="Show problem or fix">
            <button onClick={() => setFixed(false)} aria-pressed={!fixed} className={`rounded-full px-4 py-1.5 transition ${!fixed ? 'bg-[#e36a27] text-white' : 'text-[#5e6b76]'}`}>The problem</button>
            <button onClick={() => setFixed(true)} aria-pressed={fixed} className={`rounded-full px-4 py-1.5 transition ${fixed ? 'bg-[#087b87] text-white' : 'text-[#5e6b76]'}`}>The fix</button>
          </div>
        </div>
        <div className="rounded-[40px] border-[10px] border-[#102a3d] bg-[#f4f7f9] p-3 shadow-[0_40px_80px_rgba(16,42,61,.3)]">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-[#102a3d]/20" />
          <div className="space-y-3">
            {/* 0 Speed */}
            <div className={zone(0)}>
              <span className={tagCls(0)}>{fixed ? 'Loads fast' : 'Still loading…'}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#dde6ea]"><div className={`h-full rounded-full ${fixed ? 'w-full bg-[#087b87]' : 'w-1/4 bg-[#e36a27]'}`} /></div>
              {fixed ? (
                <p className="mt-2 text-sm font-bold text-[#102a3d]">Dr. Mehta’s Clinic</p>
              ) : (
                <div className="mt-2 space-y-1.5"><div className="h-3 w-3/4 animate-pulse rounded bg-[#dde6ea]" /><div className="h-3 w-1/2 animate-pulse rounded bg-[#dde6ea]" /></div>
              )}
            </div>
            {/* 1 Readability */}
            <div className={zone(1)}>
              <span className={tagCls(1)}>{fixed ? 'Easy to read' : 'Hard to read'}</span>
              {fixed ? (
                <><p className="text-base font-bold text-[#102a3d]">Open today</p><p className="text-sm text-[#102a3d]">9:00 am – 8:00 pm · Mon to Sat</p></>
              ) : (
                <p className="text-[9px] leading-tight text-[#c4c9cc]">Timings: see below. Contact for details. Appointments on request, kindly fill the form in the footer after scrolling to the end of the page.</p>
              )}
            </div>
            {/* 2 Data */}
            <div className={zone(2)}>
              <span className={tagCls(2)}>{fixed ? 'Consent-first' : 'Too much data'}</span>
              <div className="space-y-1.5">
                {(fixed ? ['Name', 'Phone number'] : ['Name', 'Age', 'Phone', 'Medical history', 'Upload report']).map((f) => <div key={f} className="rounded-lg border border-[#d6dee2] bg-white px-2.5 py-1.5 text-[11px] text-[#8a97a1]">{f}</div>)}
                {fixed ? <p className="flex items-start gap-1.5 text-[10px] text-[#33424e]"><Check size={12} className="mt-0.5 shrink-0 text-[#087b87]" /> I agree to be contacted about my appointment.</p> : <p className="text-[10px] text-[#c4c9cc]">No consent notice</p>}
              </div>
            </div>
            {/* 3 Trust */}
            <div className={zone(3)}>
              <span className={tagCls(3)}>{fixed ? 'Trust built' : 'No proof'}</span>
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${fixed ? 'bg-[#d9eeee] text-[#087b87]' : 'border border-dashed border-[#c4c9cc] text-[#c4c9cc]'}`}><Stethoscope size={20} /></div>
                <div className="min-w-0">
                  {fixed ? (
                    <><p className="text-xs font-bold text-[#102a3d]">Dr. A. Mehta, MBBS, MD</p><p className="flex items-center gap-0.5 text-[#e8a317]">{[0, 1, 2, 3, 4].map((n) => <Star key={n} size={11} fill="currentColor" />)}<span className="ml-1 text-[10px] text-[#5e6b76]">Patient reviews</span></p></>
                  ) : (
                    <p className="text-[11px] text-[#b4bbbf]">No doctor profile or reviews yet</p>
                  )}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-center text-[11px] font-bold">
                <span className={`rounded-lg py-2 ${fixed ? 'bg-[#087b87] text-white' : 'bg-[#e4e8ea] text-[#a4acb0]'}`}>Call now</span>
                <span className={`rounded-lg py-2 ${fixed ? 'bg-[#25a244] text-white' : 'bg-[#e4e8ea] text-[#a4acb0]'}`}>WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="order-3 space-y-5">
        <div className="rounded-[24px] border border-[#d3e3ea] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Why it matters</p>
          <p className="mt-2 text-lg font-bold leading-snug text-[#102a3d]">Patients decide in seconds, usually on a phone, and the next clinic is one tap away.</p>
          <p className="mt-3 text-sm leading-relaxed text-[#5e6b76]">Each of these four leaks is common, measurable and fixable. Tap through them, then flip to “The fix” to see what we build instead.</p>
        </div>
        <button onClick={onAudit} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>Find your site’s leaks, free <ArrowUpRight size={16} /></button>
        <p className="text-xs text-[#6b7782]">Illustrative page. The audit measures your real site.</p>
      </div>
    </div>
  )
}

const styles = `
@keyframes hc-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes hc-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes hc-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes hc-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hc-pulse { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.9); opacity: 0; } }
.hc-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.hc-track { display: flex; width: max-content; animation: hc-scroll 40s linear infinite; }
.hc-marquee:hover .hc-track { animation-play-state: paused; }
.hc-set { display: flex; flex-shrink: 0; align-items: center; }
.hc-hero > * { opacity: 0; animation: hc-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.hc-hero > *:nth-child(1){animation-delay:.05s} .hc-hero > *:nth-child(2){animation-delay:.15s} .hc-hero > *:nth-child(3){animation-delay:.27s} .hc-hero > *:nth-child(4){animation-delay:.39s} .hc-hero > *:nth-child(5){animation-delay:.5s}
.hc-fill { transform-origin: left; animation: hc-fill 6s linear forwards; }
.hc-float { animation: hc-float 7s ease-in-out infinite; }
.hc-pulse::after { content: ''; position: absolute; inset: 0; border-radius: 9999px; background: currentColor; animation: hc-pulse 2.4s ease-out infinite; }
.hc-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.hc-reveal.is-in { opacity: 1; transform: none; }
.hc-bar { transform-origin: center; transform: scaleX(0); transition: transform 1s cubic-bezier(.2,.7,.2,1); }
.is-in .hc-bar { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) {
  .hc-track, .hc-float, .hc-pulse::after, .hc-fill { animation: none; }
  .hc-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .hc-dup { display: none; }
  .hc-hero > * { opacity: 1; animation: none; }
  .hc-reveal { opacity: 1; transform: none; transition: none; }
  .hc-bar { transform: none; transition: none; }
}
`

const strip = ['Doctor profiles', 'Timings & directions', 'One-tap call', 'WhatsApp enquiries', 'Appointment requests', 'Google Business Profile', 'Reminders', 'Accessible forms', 'Consent-first intake', 'Reviews']

/* ---------- Page ---------- */
export default function HealthcarePage() {
  const { openEnquiry } = useEnquiry()
  const audit = () => openEnquiry('Healthcare')

  return (
    <div className="page-wrapper">
      <SEO
        title="Healthcare — Clinic & Hospital Websites Built for Patient Trust | OnlineKarDo"
        description="Websites for clinics, hospitals and practices in India: mobile-first, accessible (WCAG 2.1 AA), privacy-conscious and built to turn searches into appointments. Free audit."
        canonical="/industries/healthcare"
      />
      <style>{styles}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#eff6fa] via-[#e3f0f6] to-[#d3e8f1] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="hc-hero">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold" style={{ color: ACCENT }}>
              <span className="relative flex h-2.5 w-2.5 rounded-full hc-pulse" style={{ background: ACCENT, color: ACCENT }} /> Industry · Healthcare
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[.95] tracking-[-.05em] text-[#102a3d] md:text-7xl">
              Healthcare websites that earn <span style={{ color: ACCENT }}>patient trust</span>.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#4b5b68]">
              One accountable partner for your clinic, hospital or practice. A healthcare site has to do three hard things at once: protect patient data, stay usable for every patient, and turn an anxious first-time visitor into a booked appointment.
            </p>
            <div className="flex flex-wrap gap-2">
              {[{ t: 'Protect', i: Lock }, { t: 'Include', i: Accessibility }, { t: 'Convert', i: CalendarCheck }].map(({ t, i: I }) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#102a3d] shadow-sm"><I size={16} style={{ color: ACCENT }} /> {t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={audit} className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>
                Get a free audit <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a href="#process" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-7 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">See how we work</a>
            </div>
          </div>

          <div className="relative mx-auto hidden h-[460px] w-full max-w-[480px] lg:block">
            <div className="hc-float absolute left-0 top-0 h-[340px] w-72 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(47,127,158,.3)]">
              <Photo src={IMG.heroMain} alt="Smiling doctor ready to welcome patients" className="h-full w-full" />
            </div>
            <div className="hc-float absolute bottom-0 right-0 h-60 w-60 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(47,127,158,.3)]" style={{ animationDelay: '-3s' }}>
              <Photo src={IMG.heroSide} alt="Nurse helping a patient" className="h-full w-full" />
            </div>
            <div className="absolute right-2 top-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><CalendarCheck size={16} style={{ color: TEAL }} /> Appointment booked</div>
            <div className="absolute bottom-24 left-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><MessageCircle size={16} className="text-[#25a244]" /> Reminder on WhatsApp</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-b border-[#dbe6ea] bg-white py-7" aria-label="What we set up for clinics">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[.18em] text-[#6b7782]">What we set up for clinics</p>
        <Marquee duration={50}>
          {strip.map((n) => <span key={n} className="mx-3 whitespace-nowrap rounded-full border border-[#d3e3ea] bg-[#f1f8fb] px-5 py-2.5 text-sm font-semibold text-[#102a3d]">{n}</span>)}
        </Marquee>
      </section>

      {/* The stakes: interactive phone */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eff6fa] to-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>The stakes</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-6xl">Your website is the front door to care.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">Patients decide online before they ever call. A confusing, slow or untrustworthy site doesn’t just hurt your brand. It sends the patient to the clinic listed below you.</p>
          </Reveal>
          <Reveal>
            <StakesExplorer onAudit={audit} />
          </Reveal>
        </div>
      </section>

      {/* Rules */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>What your site sits on</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-5xl">Rules an ordinary business site never has to think about.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">A clinic website collects personal details, serves patients of every age and ability, and speaks about health. Each of those carries expectations. We treat them as <b className="text-[#102a3d]">engineering</b>: designed in from the first wireframe, tested before launch and kept current after.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#f0dccb] bg-[#fff8f2] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#c4581a]">How most agencies do it</p>
                <ul className="mt-3 space-y-2 text-sm text-[#5e4a3c]">{['Privacy and accessibility checked once, near launch', 'An accessibility overlay widget that doesn’t really fix anything', 'Forms and trackers added without asking what data leaks', 'Copied US rules that don’t fit India'].map((s) => <li key={s}>• {s}</li>)}</ul>
              </div>
              <div className="rounded-2xl border border-[#cfe5ec] bg-[#eef7fa] p-5">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: TEAL }}>How we do it</p>
                <ul className="mt-3 space-y-2 text-sm text-[#2a4a58]">{['Accessibility and privacy designed in from the first wireframe', 'Real testing with keyboard and screen readers', 'Forms collect only what’s needed, with clear consent', 'Built around Indian law and how Indian patients behave'].map((s) => <li key={s}>• {s}</li>)}</ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[32px] border border-[#dbe6ea] bg-[#f3f8fa] p-6 md:p-8">
              <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                <p className="text-sm font-semibold italic text-[#5e6b76]">yourclinic.in</p>
                <p className="text-xs text-[#6b7782]">the site patients see</p>
              </div>
              <div className="my-3 flex justify-center"><ArrowDown size={18} style={{ color: ACCENT }} /></div>
              <p className="mb-3 text-center text-xs font-bold uppercase tracking-wider text-[#6b7782]">It also has to satisfy</p>
              <div className="space-y-3">
                {layers.map((l, i) => (
                  <div key={l.title} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm" style={{ marginLeft: `${i * 8}px` }}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${ACCENT}1f` }}><l.icon size={22} style={{ color: ACCENT }} /></span>
                    <div>
                      <p className="font-bold text-[#102a3d]">{l.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-[#5e6b76]">{l.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-[#6b7782]">General information, not legal advice. Please confirm specifics with a legal advisor and your medical council.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#102a3d] py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>Where the rules stand</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] md:text-5xl">The clock is already running.</h2>
            <p className="mt-4 text-lg text-white/70">India’s privacy and accessibility expectations have moved quickly. Building properly now is easier than fixing later.</p>
          </Reveal>
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-white/15 lg:block" />
            <div className="grid gap-5 lg:grid-cols-4">
              {timeline.map((t, i) => (
                <Reveal key={t.title} delay={i * 110}>
                  <div className="relative">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ring-4 ring-[#102a3d]" style={{ background: i === timeline.length - 1 ? '#e36a27' : ACCENT }}>{i + 1}</span>
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MINT }}>{t.date}</p>
                      <h3 className="mt-1 text-lg font-bold">{t.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{t.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-white/50">Based on public reporting of the DPDP Rules, 2025 (notified 13 November 2025, 18-month phase-in) and the Supreme Court’s 30 April 2025 judgment on digital access. Dates are approximate; please re-confirm before relying on them.</p>
        </div>
      </section>

      {/* Two doors */}
      <section className="bg-[#eff6fa] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Two ways in</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Build from zero, or fix what you already have.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">There are really only two healthcare buyers: those starting fresh and those rebuilding a site that no longer serves them. Both are exactly the right place.</p>
          </Reveal>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[32px] bg-[#0c2236] p-4"><ClinicCompare /></div>
              <p className="mt-3 text-center text-xs text-[#6b7782]">Illustrative before and after. Drag to compare.</p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Redesign & replatform</p>
              <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Fix a site that’s holding you back</h3>
              <p className="mt-3 text-[#5e6b76]">We audit your current site for accessibility, privacy, speed and search visibility, then fix it and move you to the right platform without losing the visibility you’ve earned.</p>
              <ul className="mt-5 space-y-2.5">{['Fix hard-to-use forms, PDFs and pages', 'Merge old branch or doctor microsites into one site', 'Search-safe migration with a full redirect map', 'Refactor, replatform or replace: the lightest path that solves it'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ACCENT }} /> {s}</li>)}</ul>
              <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d] px-6 py-3 font-bold text-[#102a3d] transition hover:bg-[#102a3d] hover:text-white">Audit my existing site <ArrowRight size={16} /></button>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <article className="grid overflow-hidden rounded-[32px] border border-[#d3e3ea] bg-white md:grid-cols-2">
              <Photo src={IMG.buildNew} alt="Doctor with stethoscope and clipboard, ready to see patients" className="h-64 w-full md:h-full" />
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>From zero</p>
                <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Build a new healthcare website</h3>
                <p className="mt-3 text-[#5e6b76]">For a new clinic, a new branch, a new service or a digital-health idea going to market. We build your brand, patient experience, booking and privacy approach as one coherent system, launch-ready and able to grow.</p>
                <ul className="mt-5 space-y-2.5">{['One team owns brand, site, booking and privacy together', 'Accessibility and consent designed in from the first wireframe', 'Built to grow as you add doctors, services or branches'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ACCENT }} /> {s}</li>)}</ul>
                <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>Plan my new site <ArrowRight size={16} /></button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Lifestyle band */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.band} alt="Doctor reviewing a patient chart" tint={ACCENT} className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0c2236]/92 via-[#0c2236]/70 to-[#0c2236]/30" />
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>The result</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">The site that converts patients is the same site that protects them.</h2>
            <p className="mt-5 text-lg text-white/80">Clear, fast, accessible and careful with data. That’s what a nervous first-time patient notices before they ever pick up the phone.</p>
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>What’s included</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">What goes into a OnlineKarDo healthcare website.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Every build starts from the same careful foundation, then is tailored to your practice.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whatsIncluded.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className="h-full">
                <article className="group h-full rounded-[24px] border border-[#d3e3ea] bg-[#f3f8fa] p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(47,127,158,.15)]" style={{ borderTop: `4px solid ${ACCENT}` }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:rotate-6" style={{ background: `${ACCENT}1f` }}><w.icon size={24} style={{ color: ACCENT }} /></span>
                  <h3 className="mt-5 text-xl font-bold text-[#102a3d]">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{w.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <h3 className="mb-8 text-center text-3xl font-bold text-[#102a3d]">One website, connected to how your clinic already works.</h3>
            <div className="relative mx-auto max-w-4xl">
              <div className="mx-auto mb-6 w-fit rounded-2xl px-8 py-5 text-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${TEAL})` }}>
                <p className="text-lg font-bold">Your clinic website</p>
                <p className="text-xs text-white/80">the front door that ties it together</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hub.map((h) => (
                  <div key={h.label} className="flex items-center gap-3 rounded-2xl border border-[#d3e3ea] bg-white p-4 shadow-sm">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${ACCENT}1f` }}><h.icon size={20} style={{ color: ACCENT }} /></span>
                    <div><p className="font-bold text-[#102a3d]">{h.label}</p><p className="text-xs text-[#6b7782]">{h.sub}</p></div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-sm text-[#5e6b76]">Connections to hospital or clinic software depend on what that system supports, and are scoped after the audit.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who we build for */}
      <section className="bg-[#eff6fa] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Who we build for</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Built for every corner of healthcare.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">A nursing home and a two-chair dental clinic need very different sites. We shape each to its patients, its rules and its growth goals.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {segments.map((s, i) => (
              <Reveal key={s.name} delay={i * 60} className="h-full">
                <article className="group h-full overflow-hidden rounded-[24px] border border-[#d3e3ea] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(47,127,158,.15)]">
                  {s.image ? (
                    <div className="h-40 overflow-hidden"><Photo src={s.image} alt={s.name} className="h-full w-full transition-transform duration-700 group-hover:scale-110" /></div>
                  ) : (
                    <div className="flex h-40 items-center justify-center" style={{ background: `linear-gradient(135deg, ${ACCENT}14, ${ACCENT}33)` }}><s.icon size={48} style={{ color: ACCENT, opacity: 0.55 }} /></div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#102a3d]">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{s.text}</p>
                    <button onClick={audit} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: ACCENT }}>Talk to us <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal className="mb-14 text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>How we work</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">A careful process, from audit to launch and beyond.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Five stages, with privacy and accessibility considered from the first one. The free audit is step one, so you see where you stand before you commit.</p>
          </Reveal>
          <div className="relative">
            <div className="absolute bottom-0 left-6 top-0 w-px" style={{ background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT}1a)` }} />
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="relative pb-8 pl-20 last:pb-0">
                  <span className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ring-4 ring-white" style={{ background: ACCENT }}>{i + 1}</span>
                  <div className="rounded-[20px] border border-[#d3e3ea] bg-[#f3f8fa] p-6">
                    <h3 className="text-xl font-bold text-[#102a3d]">{s.title}</h3>
                    <p className="mt-1.5 text-[#5e6b76]">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button onClick={audit} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>Start with a free audit <ArrowUpRight size={17} /></button>
            <Link to="/how" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-7 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">Our full process</Link>
          </div>
        </div>
      </section>

      {/* Why us + investment */}
      <section className="bg-[#f3f8fa] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Why OnlineKarDo</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">One accountable partner for your practice.</h2>
            <ul className="mt-7 space-y-4">{reasons.map((r) => <li key={r} className="flex items-start gap-3 text-lg text-[#33424e]"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `${ACCENT}22` }}><Check size={14} style={{ color: ACCENT }} /></span>{r}</li>)}</ul>
            <button onClick={audit} className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>Get a free audit <ArrowUpRight size={17} /></button>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Investment</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">What a clinic website costs.</h2>
            <p className="mt-4 text-[#5e6b76]">Pricing varies because the work does. Here’s what actually drives it.</p>
            <div className="mt-6 space-y-3">
              {costDrivers.map((d) => (
                <div key={d.title} className="flex items-center gap-4 rounded-2xl border border-[#d3e3ea] bg-white p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${ACCENT}1a` }}><d.icon size={22} style={{ color: ACCENT }} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#102a3d]">{d.title}</p>
                    <p className="text-xs text-[#5e6b76]">{d.text}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-[#2a4a58]"><span>{d.from}</span><span className="h-1 flex-1 rounded-full bg-gradient-to-r from-[#bcdce8] to-[#2f7f9e]" /><span>{d.to}</span></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-[#102a3d] p-5 text-white">
              <p className="flex items-center gap-2 font-bold"><Clock size={18} style={{ color: MINT }} /> Starting small?</p>
              <p className="mt-1 text-sm text-white/75">The Business Digital Pack covers up to 5 pages, WhatsApp Business setup, Google Business Profile help, social pages and basic SEO, from ₹4,999 one time.</p>
              <Link to="/packs" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: MINT }}>See setup packs <ArrowUpRight size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Questions</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Healthcare websites: your questions, answered.</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group rounded-2xl border border-[#d3e3ea] bg-[#f3f8fa]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#102a3d]">
                  <span>{q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white transition-transform group-open:rotate-180" style={{ color: ACCENT }}><ChevronDown size={18} /></span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#5e6b76]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.cta} alt="Doctor holding out a stethoscope" tint={ACCENT} className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c2236]/94 via-[#0c2236]/84 to-[#2f7f9e]/75" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>Start here</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">See exactly where your healthcare website stands, free.</h2>
            <p className="mt-5 max-w-xl text-lg text-white/85">Send us your current site or your idea. We’ll return a clear, no-obligation audit and the fastest path to a site that earns patients and respects them. Build new or fix what you have, same accountable team.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={audit} className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#102a3d] transition hover:-translate-y-0.5">Start my free audit <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
              <Link to="/packs" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">See setup packs</Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MINT }}>What your free audit covers</p>
            <h3 className="mt-2 text-2xl font-bold">A specific, prioritised plan.</h3>
            <ul className="mt-5 space-y-4">
              {[{ b: 'Accessibility & privacy', t: 'where your site falls short for patients and for data care.' }, { b: 'Speed & mobile', t: 'how it really performs on a phone.' }, { b: 'Conversion gaps', t: 'where anxious patients drop off instead of booking.' }, { b: 'The fastest path', t: 'a prioritised roadmap, build new or fix what you have.' }].map((x) => (
                <li key={x.b} className="flex items-start gap-3 text-white/90"><Check size={18} className="mt-0.5 shrink-0" style={{ color: MINT }} /><span><b className="text-white">{x.b}:</b> {x.t}</span></li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/60">No obligation, no pressure. Your details stay private.</p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-3xl px-5 text-center text-[11px] text-white/45">Photos via Burst by Shopify. Regulatory information is a general summary, not legal advice.</p>
      </section>
    </div>
  )
}
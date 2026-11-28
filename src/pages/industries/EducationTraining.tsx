import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Accessibility, ArrowRight, ArrowUpRight, Ban, BookOpen, Briefcase, Building2, Calendar, Check, ChevronDown, Clock, Code, Database, FileText, GraduationCap, Globe, MessageCircle, MousePointerClick, Palette, Play, School, Search, Shield, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

/* ---------- Photos (free to use, Burst by Shopify). Swap for your own paths any time. ---------- */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1600&format=pjpg&exif=0&iptc=0`
const IMG = {
  heroMain: burst('students-head-to-class'),
  heroSide: burst('four-grad-students-caps-and-diplomas'),
  band: burst('students-meet-and-study'),
  buildNew: burst('school-desks-chairs'),
  trust: burst('three-students-working-flatlay'),
  team: burst('women-on-laptops-around-table'),
  cta: burst('grad-students-throwing-hats-in-the-air'),
  schools: burst('starting-school'),
  colleges: burst('students-meet-and-study'),
  coaching: burst('woman-teaching-group'),
  coachingSpot: burst('woman-instructing-on-laptop'),
  edtech: burst('student-learning-code-at-workshop'),
  corporate: burst('senior-teaching-young-man'),
  skills: burst('students-at-coding-workshop'),
  early: burst('kids-playing-with-block-toys'),
}

const TEAL = '#0e7490'
const CYAN = '#06b6d4'
const LIGHT = '#f0fdfa'
const MINT = '#5eead4'

/* ---------- Data ---------- */
const steps = [
  { title: 'Search and shortlist', text: 'Families and learners search on Google and social media, almost always on a phone.' },
  { title: 'Compare programmes', text: 'Fees, eligibility, duration, faculty and results are compared across several institutions.' },
  { title: 'Judge your site', text: 'Clarity, speed and trust signals decide whether you stay on the shortlist.' },
  { title: 'Enquire, or go elsewhere', text: 'A simple next step wins the enquiry. A confusing one sends it to the next institute.' },
]

const leaks = [
  { icon: FileText, title: 'Programme info buried in PDFs', tag: 'Families give up', text: 'Fees, eligibility and dates hide inside a heavy prospectus, so people leave to find an institute that just tells them.', fix: 'A filterable catalogue by level, format, duration, fee and eligibility, with a clear Apply button on every programme.' },
  { icon: MousePointerClick, title: 'Long, painful enquiry forms', tag: 'Enquiries abandoned', text: 'Ten fields, no WhatsApp option and no payment step make busy parents drop out half-way.', fix: 'Short first step, document upload and fee payment later, with WhatsApp, email and SMS follow-up built in.' },
  { icon: Star, title: 'No proof to trust', tag: 'Doubt wins', text: 'Without faculty profiles, results and accreditation, a stranger cannot tell you from any other institute.', fix: 'Faculty and research showcase, outcomes, accreditation and real stories placed where doubt sets in.' },
  { icon: Clock, title: 'Silence after the enquiry', tag: 'Lead goes cold', text: 'No status tracker, no reminders and a slow reply leave applicants wondering, then applying elsewhere.', fix: 'Application status tracking and reminders, with every enquiry synced to your CRM and answered fast.' },
]

const stages = [
  { icon: Search, name: 'Prospective', intro: 'Help people find the right programme and feel sure about applying.', items: [
    { t: 'Course & programme catalogue', d: 'Filterable by level, format, duration, fee and eligibility, with schema for search.' },
    { t: 'Faculty & research showcase', d: 'Profiles, publications, grants, supervision and video intros that build trust.' },
    { t: 'Events & open days', d: 'Calendar, registration, reminders, waitlist, virtual or hybrid, synced to your CRM.' },
  ] },
  { icon: FileText, name: 'Applicant', intro: 'Make applying and paying simple, with no one left guessing.', items: [
    { t: 'Admissions & enquiry funnels', d: 'Multi-step forms, document upload, fee payment, status tracker and WhatsApp, email and SMS.' },
    { t: 'International student journey', d: 'Visa guide, fee calculator, scholarship finder, agent portal and multi-currency payments.' },
    { t: 'CRM & payment sync', d: 'Salesforce, HubSpot or Slate, with Razorpay, Stripe or Flywire for fees.' },
  ] },
  { icon: Play, name: 'Student', intro: 'Give learners and parents one place for the day-to-day.', items: [
    { t: 'LMS integration / member area', d: 'Moodle, LearnDash or TalentLMS single sign-on: course player, progress, certificates and discussions.' },
    { t: 'Parent portal', d: 'Separate login linked to the student record: fees, communication preferences and role-based access.' },
    { t: 'Accessible by default', d: 'WCAG 2.1 AA, readable type and keyboard-friendly forms, tested rather than patched on.' },
  ] },
  { icon: GraduationCap, name: 'Alumni', intro: 'Keep graduates connected, and make giving and referrals easy.', items: [
    { t: 'Alumni & giving portal', d: 'Directory, mentorship, donations, events, news and volunteering, with single sign-on to your CRM.' },
    { t: 'Stories & outcomes', d: 'Alumni stories that become proof for the next intake.' },
    { t: 'Referrals', d: 'Simple referral flows that bring the next student through the door.' },
  ] },
]

const audiences = [
  { icon: School, name: 'Schools (K-12)', text: 'Admissions, parent communication and fee payment, with student data handled carefully.', image: IMG.schools },
  { icon: GraduationCap, name: 'Colleges & universities', text: 'Programme catalogues, faculty and research, international admissions and alumni portals.', image: IMG.colleges },
  { icon: BookOpen, name: 'Coaching centres', text: 'Batch and course pages, demo-class booking, results showcase and fast enquiry follow-up.', image: IMG.coaching },
  { icon: Code, name: 'EdTech platforms', text: 'Marketing sites and member areas connected to your LMS, payments and analytics.', image: IMG.edtech },
  { icon: Briefcase, name: 'Corporate training', text: 'Programme pages, cohort registration and enterprise enquiry flows.', image: IMG.corporate },
  { icon: Building2, name: 'Skill & vocational institutes', text: 'Course discovery, certification pages, placement proof and simple enrolment.', image: IMG.skills },
  { icon: Users, name: 'Preschools & early years', text: 'Warm, trust-first sites with visit booking and clear information for parents.', image: IMG.early },
]

const specialists = [
  { icon: Palette, t: 'Design & UX', d: 'Programme pages and admissions flows families understand.' },
  { icon: Code, t: 'Development', d: 'Fast builds on the platform that fits your team.' },
  { icon: Database, t: 'LMS, CRM & payments', d: 'SSO, enrolment sync and fee collection.' },
  { icon: Accessibility, t: 'Compliance & A11y', d: 'WCAG, student privacy and mandatory disclosures.' },
]

const trustCols = [
  { icon: Shield, t: 'Protect student data', d: 'No student records on the marketing server. Forms encrypt to your CRM or SIS, with consent handled for children’s data.' },
  { icon: Accessibility, t: 'Include every learner', d: 'WCAG 2.1 AA: keyboard and screen-reader support, strong contrast and accessible forms.' },
  { icon: FileText, t: 'Disclose what is required', d: 'Mandatory disclosures (faculty, fees, infrastructure, NIRF, AQAR) as structured pages with an annual update workflow.' },
]

const processSteps = [
  { title: 'Stakeholder discovery', text: 'Registrar, marketing, IT, faculty and alumni: we map the journey from prospective to enrolled to alumni.' },
  { title: 'Content & IA audit', text: 'Programme taxonomy, faculty bios, research, admissions flows, event calendar and alumni stories.' },
  { title: 'Design system & compliance', text: 'Brand, accessibility, student-privacy patterns, multi-language and a component library.' },
  { title: 'Build, LMS & CRM sync', text: 'Catalogue, admissions forms, payments, LMS single sign-on, CRM, analytics and email.' },
  { title: 'Launch, train & optimise', text: 'Staff CMS training, student UAT, Search Console, GA4 events, heatmaps and A/B tests.' },
]

const platforms = ['WordPress + LearnDash/TutorLMS', 'Custom Next.js + headless LMS', 'Webflow + Memberstack/Wized', 'Moodle/Totara (theme + integration)']
const compliance = ['FERPA', 'COPPA', 'WCAG 2.1 AA', 'UGC/AICTE/NAAC', 'State education dept.', 'GDPR (international students)']
const integrations = ['LMS: Moodle, Canvas, TalentLMS', 'CRM: Salesforce, HubSpot, Slate', 'Payments: Razorpay, Stripe, Flywire', 'WhatsApp Business', 'Zoom/Teams', 'Google/Meta analytics']
const tools = ['Moodle', 'Canvas', 'TalentLMS', 'LearnDash', 'Blackboard', 'D2L', 'Salesforce', 'HubSpot', 'Slate', 'Razorpay', 'Stripe', 'Flywire', 'WhatsApp Business', 'Zoom', 'Microsoft Teams', 'GA4']

const faqs: [string, string][] = [
  ['Can you integrate with our LMS (Moodle, Canvas)?', 'Yes. Single sign-on (SAML, OIDC, LTI), course deep links, grade passback and enrolment sync. We support Moodle, Canvas, TalentLMS, Blackboard and D2L.'],
  ['How do you handle student data privacy?', 'We keep student records off the marketing server. Forms encrypt to your CRM or SIS, consent is handled for children’s data, and directory opt-outs are honoured. Which laws apply depends on where you operate, so please confirm specifics with a legal advisor.'],
  ['Can you build a parent portal?', 'Yes: separate login linked to the student record, fee payment, communication preferences and role-based access. Grades and attendance depend on what your school system exposes.'],
  ['What about international admissions?', 'Multi-currency payments (Flywire or Stripe), visa document checklist, agent portal, scholarship finder, English-test tracking and location-aware content.'],
  ['Do you meet UGC/NAAC website mandates?', 'We map mandatory disclosures (faculty, fees, infrastructure, NIRF, AQAR) to structured pages with schema, plus an annual update workflow. Please confirm the exact list with your regulator.'],
  ['Can you redesign our site without losing search rankings?', 'Yes. We audit the current site, map important URLs and set up redirects so the visibility you have earned carries over.'],
  ['Do we own the website?', 'Yes. The design, content and data are your asset, with no generic template shared with every other institute.'],
  ['How much does it cost?', 'It depends on programmes, portals and integrations. We share a fixed proposal after the free audit, with no obligation.'],
]

const rupee = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

/* ---------- Hooks & building blocks ---------- */
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
  return <div ref={ref} className={`ed-reveal ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={className} style={{ background: `linear-gradient(135deg, ${CYAN}44, ${TEAL}99)` }} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="ed-marquee">
      <div className="ed-track">
        <div className="ed-set">{children}</div>
        <div className="ed-set ed-dup" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: light ? MINT : TEAL }}>{children}</span>
}

function Check1({ children }: { children: ReactNode }) {
  return <li className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: TEAL }} /> {children}</li>
}

function Slider({ label, value, min, max, step, onChange, display }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; display: string }) {
  return (
    <label className="block">
      <div className="mb-2 flex justify-between text-sm text-[#102a3d]"><span>{label}</span><strong>{display}</strong></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" style={{ accentColor: CYAN }} />
    </label>
  )
}

// Interactive phone: pick a leak on a programme page, flip to see the fix.
function LeakExplorer({ onAudit }: { onAudit: () => void }) {
  const [active, setActive] = useState(0)
  const [fixed, setFixed] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setActive((a) => (a + 1) % leaks.length), 6000)
    return () => window.clearInterval(t)
  }, [paused])

  const ring = fixed ? 'ring-[#0f9d6a] shadow-[0_8px_24px_rgba(15,157,106,.25)]' : 'ring-[#e36a27] shadow-[0_8px_24px_rgba(227,106,39,.25)]'
  const zone = (i: number) => `relative rounded-2xl bg-white p-3 transition duration-500 ${active === i ? `opacity-100 ring-2 ${ring}` : 'opacity-40'}`
  const tag = (i: number) => `absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white transition ${active === i ? 'opacity-100' : 'opacity-0'} ${fixed ? 'bg-[#0f9d6a]' : 'bg-[#e36a27]'}`

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_340px_1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="order-2 space-y-3 lg:order-1" role="tablist" aria-label="Where education websites lose enquiries">
        {leaks.map((l, i) => (
          <button key={l.title} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition duration-300 ${active === i ? 'border-[#06b6d4] bg-white shadow-[0_14px_36px_rgba(6,182,212,.22)]' : 'border-[#ccfbf1] bg-white/60 hover:bg-white'}`}>
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${active === i ? 'text-white' : 'bg-[#e0f7fa] text-[#0e7490]'}`} style={active === i ? { background: TEAL } : undefined}><l.icon size={20} /></span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#102a3d]">{l.title}</p>
                <p className="text-xs font-semibold" style={{ color: TEAL }}>{l.tag}</p>
              </div>
              <span className="text-xs font-bold text-[#8fbfc9]">0{i + 1}</span>
            </div>
            {active === i && (
              <>
                <p className="mt-3 text-sm leading-relaxed text-[#5e6b76]">{fixed ? l.fix : l.text}</p>
                {!paused && <span key={`bar-${i}`} className="ed-fill absolute bottom-0 left-0 h-0.5 w-full" style={{ background: CYAN }} />}
              </>
            )}
          </button>
        ))}
      </div>

      <div className="order-1 mx-auto w-[300px] lg:order-2">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 text-sm font-bold shadow-sm ring-1 ring-[#ccfbf1]" role="group" aria-label="Show problem or fix">
            <button onClick={() => setFixed(false)} aria-pressed={!fixed} className={`rounded-full px-4 py-1.5 transition ${!fixed ? 'bg-[#e36a27] text-white' : 'text-[#5e6b76]'}`}>The problem</button>
            <button onClick={() => setFixed(true)} aria-pressed={fixed} className={`rounded-full px-4 py-1.5 transition ${fixed ? 'bg-[#0f9d6a] text-white' : 'text-[#5e6b76]'}`}>The fix</button>
          </div>
        </div>
        <div className="rounded-[40px] border-[10px] border-[#102a3d] bg-[#eefaf8] p-3 shadow-[0_40px_80px_rgba(16,42,61,.3)]">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-[#102a3d]/20" />
          <div className="space-y-3">
            <div className={zone(0)}>
              <span className={tag(0)}>{fixed ? 'Clear at a glance' : 'Where are the fees?'}</span>
              {fixed ? (
                <div className="text-[11px] text-[#102a3d]"><p className="text-sm font-bold">B.Sc. Data Science</p><p>3 years · On campus · Eligibility shown</p><div className="mt-1.5 rounded-lg bg-[#0e7490] py-1.5 text-center font-bold text-white">Apply now</div></div>
              ) : <p className="text-xs text-[#a4acb0]">Prospectus_2026.pdf · 14 MB<br />Fees: see page 9</p>}
            </div>
            <div className={zone(1)}>
              <span className={tag(1)}>{fixed ? 'Short and easy' : 'Too many fields'}</span>
              <div className="space-y-1.5">
                {(fixed ? ['Name', 'Phone or email'] : ['Name', 'Email', 'Phone', 'City', 'Qualification', 'Marks']).map((f) => <div key={f} className="rounded-lg border border-[#d6dee2] bg-white px-2.5 py-1.5 text-[11px] text-[#8a97a1]">{f}</div>)}
                {fixed && <div className="rounded-lg bg-[#25a244] py-1.5 text-center text-[11px] font-bold text-white">Chat on WhatsApp</div>}
              </div>
            </div>
            <div className={zone(2)}>
              <span className={tag(2)}>{fixed ? 'Proof shown' : 'No proof'}</span>
              {fixed ? <p className="flex items-center gap-1 text-[11px] text-[#102a3d]"><Star size={12} className="text-[#e8a317]" fill="currentColor" /> <b>Faculty profiles, outcomes and accreditation</b></p> : <p className="text-[11px] text-[#a4acb0]">No faculty, results or accreditation shown</p>}
            </div>
            <div className={zone(3)}>
              <span className={tag(3)}>{fixed ? 'Status tracked' : 'Silence'}</span>
              {fixed ? <p className="text-[11px] text-[#102a3d]"><b>Application received.</b> Documents verified. Reminder sent on WhatsApp.</p> : <p className="text-[11px] text-[#a4acb0]">Enquiry sent · no status · no reply</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="order-3 space-y-5">
        <div className="rounded-[24px] border border-[#ccfbf1] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: TEAL }}>Why it matters</p>
          <p className="mt-2 text-lg font-bold leading-snug text-[#102a3d]">Families compare several institutes in one evening, and the clearest one gets the call.</p>
          <p className="mt-3 text-sm leading-relaxed text-[#5e6b76]">Tap through the four leaks, then flip to “The fix”.</p>
        </div>
        <button onClick={onAudit} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition hover:-translate-y-0.5" style={{ background: TEAL }}>Find your site’s leaks, free <ArrowUpRight size={16} /></button>
        <p className="text-xs text-[#6b7782]">Illustrative page. The audit measures your real site.</p>
      </div>
    </div>
  )
}

function SiteCompare() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative h-[440px] select-none overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_70px_rgba(0,0,0,.35)]">
      <div className="absolute inset-0 bg-[#f4fdfb] p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: TEAL }}>Institute site · after</p>
        <div className="flex flex-wrap gap-2 text-xs font-bold">{['Level', 'Format', 'Duration', 'Fee'].map((f) => <span key={f} className="rounded-full border border-[#99e6dd] bg-white px-3 py-1.5 text-[#0e7490]">{f} ▾</span>)}</div>
        <Photo src={IMG.heroMain} alt="Students walking to class" className="mt-3 h-36 w-full rounded-2xl" />
        <div className="mt-3 flex items-center justify-between"><p className="font-bold text-[#102a3d]">B.Sc. Data Science · 3 years</p><span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: TEAL }}>Apply now</span></div>
        <p className="mt-2 flex items-center gap-2 text-sm text-[#33424e]"><Check size={15} style={{ color: TEAL }} /> Fees, eligibility and dates on one page</p>
      </div>
      <div className="absolute inset-0 bg-[#e9e9e9] p-5" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#e36a27]">Institute site · before</p>
        <p className="text-sm font-bold text-[#8a8a8a]">ABC INSTITUTE OF STUDIES</p>
        <p className="mt-2 text-xs text-[#9a9a9a] underline">Download prospectus (PDF, 14 MB)</p>
        <p className="mt-2 text-[10px] leading-tight text-[#b5b5b5]">Admissions open. For fee structure and eligibility, kindly contact the office during working hours.</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5">{['Name', 'Email', 'Phone', 'City', 'Course', 'Marks', 'Address', 'Message'].map((f) => <div key={f} className="rounded border border-[#d0d0d0] bg-[#f3f3f3] px-2 py-1.5 text-[10px] text-[#b0b0b0]">{f}</div>)}</div>
        <p className="mt-3 text-[10px] text-[#b5b5b5]">No catalogue · no payment · no status tracking</p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.1)]" style={{ left: `${pos}%` }} />
      <div className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg" style={{ left: `${pos}%` }}><span className="text-[#102a3d]">↔</span></div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Drag to compare an old institute site and a rebuilt one" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  )
}

function StageTabs() {
  const [active, setActive] = useState(0)
  const t = stages[active]
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="flex gap-2 overflow-x-auto lg:flex-col" role="tablist" aria-label="Learner journey stages">
        {stages.map((x, i) => (
          <button key={x.name} role="tab" aria-selected={active === i} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className={`flex shrink-0 items-center gap-3 rounded-2xl border px-5 py-4 text-left font-bold transition-all duration-300 ${active === i ? 'border-[#06b6d4] bg-white text-[#102a3d] shadow-lg lg:translate-x-2' : 'border-[#ccfbf1] bg-[#f4fdfb] text-[#5e6b76]'}`}>
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${active === i ? 'text-white' : 'bg-white text-[#0e7490]'}`} style={active === i ? { background: TEAL } : undefined}><x.icon size={20} /></span>
            <span><span className="block text-xs font-semibold" style={{ color: TEAL }}>Stage 0{i + 1}</span>{x.name}</span>
          </button>
        ))}
      </div>
      <div key={active} className="ed-pane rounded-[28px] border border-[#ccfbf1] bg-white p-7 md:p-9">
        <p className="text-lg text-[#33424e]">{t.intro}</p>
        <ul className="mt-6 space-y-5">
          {t.items.map((it) => (
            <li key={it.t} className="flex gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: LIGHT }}><Check size={15} style={{ color: TEAL }} /></span>
              <div><p className="font-bold text-[#102a3d]">{it.t}</p><p className="text-sm leading-relaxed text-[#5e6b76]">{it.d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function FunnelFlow() {
  const nodes = [['Enquiry', 'Short form or WhatsApp'], ['Application', 'Documents and eligibility'], ['Fee payment', 'UPI, cards or international'], ['Enrolled', 'LMS access via SSO'], ['Alumni', 'Community and giving']]
  return (
    <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
      {nodes.map(([a, b], i) => (
        <div key={a} className="flex flex-1 flex-col items-center gap-3 lg:flex-row">
          <div className="w-full rounded-2xl border border-[#ccfbf1] bg-white p-4 text-center shadow-sm">
            <p className="text-sm font-bold text-[#102a3d]">{a}</p>
            <p className="mt-1 text-xs text-[#5e6b76]">{b}</p>
          </div>
          {i < nodes.length - 1 && <ArrowRight size={20} className="shrink-0 rotate-90 lg:rotate-0" style={{ color: CYAN }} />}
        </div>
      ))}
    </div>
  )
}

function EnrolmentCalculator() {
  const [enq, setEnq] = useState(200)
  const [rate, setRate] = useState(8)
  const [lift, setLift] = useState(25)
  const [fee, setFee] = useState(80000)
  const extra = enq * 12 * (rate / 100) * (lift / 100)
  return (
    <div className="mt-6 grid gap-6 rounded-[24px] border border-[#ccfbf1] bg-white p-6">
      <Slider label="Enquiries per month" value={enq} min={20} max={1000} step={10} onChange={setEnq} display={String(enq)} />
      <Slider label="Enquiries that enrol today" value={rate} min={1} max={30} step={1} onChange={setRate} display={`${rate}%`} />
      <Slider label="Conversion lift you target" value={lift} min={5} max={100} step={5} onChange={setLift} display={`+${lift}%`} />
      <Slider label="Fee per student per year" value={fee} min={10000} max={500000} step={5000} onChange={setFee} display={rupee(fee)} />
      <div className="grid grid-cols-2 gap-3 rounded-2xl p-4 text-center" style={{ background: LIGHT }}>
        <div><p className="text-xs text-[#5e6b76]">Extra enrolments per year</p><p className="text-2xl font-bold" style={{ color: TEAL }}>{extra.toFixed(1)}</p></div>
        <div><p className="text-xs text-[#5e6b76]">Extra fee revenue per year</p><p className="text-2xl font-bold text-[#102a3d]">{rupee(extra * fee)}</p></div>
      </div>
      <p className="text-xs text-[#6b7782]">Illustrative model on the numbers you set, not a promise of results. The audit uses your real data.</p>
    </div>
  )
}

const styles = `
@keyframes ed-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes ed-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes ed-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes ed-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes ed-kb { from { transform: scale(1); } to { transform: scale(1.09); } }
@keyframes ed-pulse { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.9); opacity: 0; } }
.ed-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.ed-track { display: flex; width: max-content; animation: ed-scroll 45s linear infinite; }
.ed-marquee:hover .ed-track { animation-play-state: paused; }
.ed-set { display: flex; flex-shrink: 0; align-items: center; }
.ed-hero > * { opacity: 0; animation: ed-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.ed-hero > *:nth-child(1){animation-delay:.05s} .ed-hero > *:nth-child(2){animation-delay:.15s} .ed-hero > *:nth-child(3){animation-delay:.27s} .ed-hero > *:nth-child(4){animation-delay:.39s} .ed-hero > *:nth-child(5){animation-delay:.5s}
.ed-fill { transform-origin: left; animation: ed-fill 6s linear forwards; }
.ed-float { animation: ed-float 7s ease-in-out infinite; }
.ed-kenburns { animation: ed-kb 26s ease-in-out infinite alternate; }
.ed-pane { animation: ed-rise .45s ease; }
.ed-pulse::after { content: ''; position: absolute; inset: 0; border-radius: 9999px; background: currentColor; animation: ed-pulse 2.4s ease-out infinite; }
.ed-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.ed-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .ed-track, .ed-float, .ed-pulse::after, .ed-fill, .ed-kenburns, .ed-pane { animation: none; }
  .ed-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .ed-dup { display: none; }
  .ed-hero > * { opacity: 1; animation: none; }
  .ed-reveal { opacity: 1; transform: none; transition: none; }
}
`

/* ---------- Page ---------- */
export default function EducationTrainingPage() {
  const { openEnquiry } = useEnquiry()
  const audit = () => openEnquiry('Education & Training')
  const btn = 'inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5'
  const h2 = 'mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-5xl'
  const card = 'group h-full overflow-hidden rounded-[24px] border border-[#ccfbf1] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(6,182,212,.22)]'

  return (
    <div className="page-wrapper">
      <SEO
        title="Education & Training — School, College, Coaching & EdTech Websites | OnlineKarDo"
        description="Websites for schools, colleges, coaching centres and ed-tech: programme catalogues, admissions funnels, LMS integration, faculty showcase and alumni portals. Accessible, privacy-conscious, free audit."
        canonical="/industries/education-training"
      />
      <style>{styles}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0fdfa] via-[#d9f7f1] to-[#bdeee6] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="ed-hero">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold" style={{ color: TEAL }}>
              <span className="ed-pulse relative flex h-2.5 w-2.5 rounded-full" style={{ background: CYAN, color: CYAN }} /> Industry · Education & Training
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[.97] tracking-[-.05em] text-[#102a3d] md:text-7xl">
              Education websites that <span style={{ color: TEAL }}>fill seats</span> and keep families informed.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#4b5b68]">
              Programme catalogues, admissions funnels and parent-facing journeys for schools, colleges, coaching centres and ed-tech platforms. Fast on a phone, accessible to every learner, and careful with student data.
            </p>
            <div className="flex flex-wrap gap-2">
              {[{ t: 'Discover', i: Search }, { t: 'Apply', i: FileText }, { t: 'Enrol', i: GraduationCap }].map(({ t, i: I }) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#102a3d] shadow-sm"><I size={16} style={{ color: TEAL }} /> {t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={audit} className={btn} style={{ background: TEAL }}>Get a free audit <ArrowUpRight size={17} /></button>
              <a href="#process" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-7 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">See how we work</a>
            </div>
          </div>
          <div className="relative mx-auto hidden h-[460px] w-full max-w-[480px] lg:block">
            <div className="ed-float absolute left-0 top-0 h-[340px] w-72 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(14,116,144,.35)]"><Photo src={IMG.heroMain} alt="Students walking to class" className="h-full w-full" /></div>
            <div className="ed-float absolute bottom-0 right-0 h-60 w-60 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(14,116,144,.35)]" style={{ animationDelay: '-3s' }}><Photo src={IMG.heroSide} alt="Graduates with caps and diplomas" className="h-full w-full" /></div>
            <div className="absolute right-2 top-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><Check size={16} style={{ color: TEAL }} /> Application submitted</div>
            <div className="absolute bottom-24 left-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><MessageCircle size={16} className="text-[#25a244]" /> Update sent on WhatsApp</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-b border-[#ccfbf1] bg-white py-7" aria-label="Systems we connect">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[.18em] text-[#6b7782]">Systems we connect your site to</p>
        <Marquee>{tools.map((n) => <span key={n} className="mx-3 whitespace-nowrap rounded-full border border-[#ccfbf1] bg-[#f4fdfb] px-5 py-2.5 text-sm font-semibold text-[#102a3d]">{n}</span>)}</Marquee>
      </section>

      {/* Reality */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <Eyebrow>The stakes</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-6xl">Your website is the open day families attend first.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">Before anyone visits the campus or calls the office, they have already compared you online. A clear, fast, trustworthy site gets you onto the shortlist. A confusing one never gets a second look.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 110} className="h-full">
                <div className="h-full rounded-[24px] border border-[#ccfbf1] bg-[#f4fdfb] p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white" style={{ background: i === 3 ? '#e36a27' : TEAL }}>{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold text-[#102a3d]">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5e6b76]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leaks */}
      <section className="bg-gradient-to-b from-[#f0fdfa] to-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <Eyebrow>The difference</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-6xl">Most institute sites are brochures. We build enrolment engines.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">A brochure site looks fine and waits. The four leaks below are common, measurable and fixable, so we design them out from the start.</p>
          </Reveal>
          <Reveal><LeakExplorer onAudit={audit} /></Reveal>
        </div>
      </section>

      {/* Funnel */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>Prospect to alumni</Eyebrow>
            <h2 className={h2}>One connected journey, not five disconnected tools.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Enquiry, application, payment, learning and alumni should share one record, so nobody re-enters details and nobody is lost between steps.</p>
          </Reveal>
          <Reveal><FunnelFlow /></Reveal>
          <p className="mt-6 text-center text-sm text-[#5e6b76]">Connections to your LMS, CRM or student information system depend on what that system supports, and are scoped after the audit.</p>
        </div>
      </section>

      {/* Trust & compliance (photo card) */}
      <section className="bg-[#102a3d] px-4 py-16 text-white md:py-24">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10 px-6 py-12 md:px-14 md:py-16">
          <Photo src={IMG.trust} alt="Students working together" className="ed-kenburns absolute inset-0 -z-20 h-full w-full" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1d2b]/94 via-[#0b1d2b]/87 to-[#0b1d2b]/72" />
          <Reveal>
            <Eyebrow light>Trust & compliance</Eyebrow>
            <h2 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-5xl">Student data and access deserve more than a contact form.</h2>
            <p className="mt-5 max-w-3xl text-lg text-white/75">Education sites collect children’s details, serve learners of every ability and publish information regulators expect to see. We treat all three as engineering, designed in from the first wireframe.</p>
          </Reveal>
          <div className="mt-10 grid border-t border-white/15 md:grid-cols-3 md:divide-x md:divide-white/15">
            {trustCols.map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <div className="p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10"><s.icon size={22} style={{ color: MINT }} /></span>
                  <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                  <p className="mt-1 text-sm text-white/70">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {['WCAG 2.1 AA', 'FERPA / COPPA patterns', 'UGC / AICTE / NAAC disclosures', 'GDPR for international students'].map((t) => <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm"><Check size={15} style={{ color: MINT }} /> {t}</span>)}
          </div>
          <p className="mt-6 text-xs text-white/50">General information, not legal advice. Which rules apply depends on your country, board and institution type, so please confirm with a legal advisor.</p>
        </div>
      </section>

      {/* Two doors */}
      <section className="bg-[#f0fdfa] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>New build or rebuild</Eyebrow>
            <h2 className={h2}>Two doors. Both lead to a site that enrols.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Launching a new institute or escaping a site that no longer works, you are in the right place.</p>
          </Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[32px] bg-[#0c2236] p-4"><SiteCompare /></div>
              <p className="mt-3 text-center text-xs text-[#6b7782]">Illustrative before and after. Drag to compare.</p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: TEAL }}>Improve what exists</p>
              <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Redesign, replatform & migrate</h3>
              <p className="mt-3 text-[#5e6b76]">A site that is slow, PDF-heavy, hard to update or stuck on a theme you cannot change. We audit, redesign and migrate it, keeping the search visibility and pages you have earned.</p>
              <ul className="mt-5 space-y-2.5">
                <Check1>Replace PDF prospectuses with searchable programme pages</Check1>
                <Check1>Merge old department microsites into one system</Check1>
                <Check1>URLs mapped and redirected, so rankings carry over</Check1>
              </ul>
              <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d] px-6 py-3 font-bold text-[#102a3d] transition hover:bg-[#102a3d] hover:text-white">Audit my existing site <ArrowRight size={16} /></button>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <article className="grid overflow-hidden rounded-[32px] border border-[#ccfbf1] bg-white md:grid-cols-2">
              <Photo src={IMG.buildNew} alt="Classroom desks and chairs" className="h-64 w-full md:h-full" />
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: TEAL }}>Start from zero</p>
                <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Build from scratch</h3>
                <p className="mt-3 text-[#5e6b76]">A new school, college, coaching brand or ed-tech product. We build brand, programme catalogue, admissions, payments and LMS links as one coherent, launch-ready system.</p>
                <ul className="mt-5 space-y-2.5">
                  <Check1>One team owns brand, site, admissions and integrations</Check1>
                  <Check1>Accessibility and student privacy designed in from the start</Check1>
                  <Check1>Built to grow as you add programmes, campuses or cohorts</Check1>
                </ul>
                <button onClick={audit} className={`mt-7 ${btn.replace('px-7 py-3.5', 'px-6 py-3')}`} style={{ background: TEAL }}>Plan a new site <ArrowRight size={16} /></button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>What’s included</Eyebrow>
            <h2 className={h2}>Built around the whole learner journey.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Four stages, each with what it needs. Hover or tap a stage to see what is inside.</p>
          </Reveal>
          <Reveal><StageTabs /></Reveal>
        </div>
      </section>

      {/* Band */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.band} alt="Students studying together at a university" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0c2236]/92 via-[#0c2236]/70 to-[#0c2236]/30" />
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <Eyebrow light>The result</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">The site that enrols is the site families trust.</h2>
            <p className="mt-5 text-lg text-white/80">Clear programmes, simple applications and honest proof, on a site every learner can use.</p>
          </Reveal>
        </div>
      </section>

      {/* Who we build for */}
      <section className="bg-[#f0fdfa] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>Who we build for</Eyebrow>
            <h2 className={h2}>Built for every kind of learning.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">A preschool and a university need very different sites. We shape each to its audience, its rules and its growth goals.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map((v, i) => (
              <Reveal key={v.name} delay={i * 60} className="h-full">
                <article className={card}>
                  <div className="h-40 overflow-hidden"><Photo src={v.image} alt={v.name} className="h-full w-full transition-transform duration-700 group-hover:scale-110" /></div>
                  <div className="p-5">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-[#102a3d]"><v.icon size={18} style={{ color: TEAL }} /> {v.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{v.text}</p>
                    <button onClick={audit} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: TEAL }}>Tell us about your project <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching centres spotlight */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <Photo src={IMG.coachingSpot} alt="Instructor guiding a small group of learners" className="h-[420px] w-full rounded-[32px] shadow-[0_28px_70px_rgba(14,116,144,.3)]" />
              <span className="ed-float absolute -right-3 top-8 hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl sm:flex"><Check size={16} style={{ color: TEAL }} /> Demo class booked</span>
              <span className="ed-float absolute -left-3 bottom-10 hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl sm:flex" style={{ animationDelay: '-2.5s' }}><MessageCircle size={16} className="text-[#25a244]" /> Fee reminder on WhatsApp</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Coaching centres</Eyebrow>
            <h2 className={h2}>Fill every batch, not just the first week.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Coaching is won on trust and speed. Parents and students compare several centres in one evening, then message the one that answers first.</p>
            <ul className="mt-6 space-y-3">
              <Check1>Batch and course pages with timings, fees, seats and faculty</Check1>
              <Check1>Demo-class booking by form or WhatsApp, with instant confirmation</Check1>
              <Check1>Results and toppers showcase, shown only with student and parent consent</Check1>
              <Check1>Fee payment and instalment reminders by UPI and WhatsApp</Check1>
              <Check1>Parent updates and every enquiry synced to your CRM</Check1>
            </ul>
            <button onClick={audit} className={`mt-7 ${btn}`} style={{ background: TEAL }}>Plan my coaching site <ArrowUpRight size={17} /></button>
          </Reveal>
        </div>
      </section>

      {/* Accountable partner */}
      <section className="bg-[#102a3d] px-4 py-16 text-white md:py-24">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10 px-6 py-12 md:px-14 md:py-16">
          <Photo src={IMG.team} alt="Team working on laptops around a table" className="ed-kenburns absolute inset-0 -z-20 h-full w-full" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1d2b]/94 via-[#0b1d2b]/88 to-[#0b1d2b]/75" />
          <Reveal>
            <Eyebrow light>One accountable partner</Eyebrow>
            <h2 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-5xl">A dedicated education web team, no handoffs.</h2>
            <p className="mt-5 max-w-3xl text-lg text-white/75">Education sites fail when they are stitched together by a generalist or passed between an agency, a freelancer and an offshore developer. One lead owns the outcome, with a specialist for each part, and you own the site.</p>
          </Reveal>
          <div className="mt-10 grid border-t border-white/15 md:grid-cols-4 md:divide-x md:divide-white/15">
            {specialists.map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <div className="p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10"><s.icon size={22} style={{ color: MINT }} /></span>
                  <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                  <p className="mt-1 text-sm text-white/70">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {['No outsourcing', 'No white-label markup', 'No finger-pointing'].map((t) => <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm"><Ban size={15} /> {t}</span>)}
          </div>
          <p className="mt-6 max-w-2xl text-lg">It is not one team that does everything. It is the right specialists, coordinated by people who answer for the whole outcome.</p>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal className="mb-14 text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className={h2}>From audit to enrolment-ready in five steps.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">The free audit comes first, so you see where you stand before you commit.</p>
          </Reveal>
          <div className="relative">
            <div className="absolute bottom-0 left-6 top-0 w-px" style={{ background: `linear-gradient(to bottom, ${CYAN}, ${CYAN}1a)` }} />
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="relative pb-8 pl-20 last:pb-0">
                  <span className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ring-4 ring-white" style={{ background: TEAL }}>{i + 1}</span>
                  <div className="rounded-[20px] border border-[#ccfbf1] bg-[#f4fdfb] p-6">
                    <h3 className="text-xl font-bold text-[#102a3d]">{s.title}</h3>
                    <p className="mt-1.5 text-[#5e6b76]">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms / compliance / integrations */}
      <section className="bg-[#f4fdfb] py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3">
          {([['Platforms we build on', platforms, Globe], ['Compliance & standards', compliance, Shield], ['Key integrations', integrations, Calendar]] as const).map(([title, list, Icon], i) => (
            <Reveal key={title} delay={i * 90}>
              <h3 className="flex items-center gap-2 text-xl font-bold text-[#102a3d]"><Icon size={20} style={{ color: TEAL }} /> {title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{list.map((x) => <li key={x} className="rounded-full border border-[#ccfbf1] bg-white px-4 py-2 text-sm text-[#33424e]">{x}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="text-center">
            <Eyebrow>Investment & payback</Eyebrow>
            <h2 className={h2}>What would better conversion be worth?</h2>
            <p className="mt-4 text-[#5e6b76]">Set your own numbers. Pricing depends on scope and is shared in your free audit.</p>
          </Reveal>
          <Reveal><EnrolmentCalculator /></Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f0fdfa] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="mb-10 text-center">
            <Eyebrow>Questions</Eyebrow>
            <h2 className={h2}>Education website FAQ.</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group rounded-2xl border border-[#ccfbf1] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#102a3d]">
                  <span>{q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f0fdfa] transition-transform group-open:rotate-180" style={{ color: TEAL }}><ChevronDown size={18} /></span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#5e6b76]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.cta} alt="Graduates throwing their caps in the air" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c2236]/94 via-[#0c2236]/84 to-[#0e7490]/75" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
          <div>
            <Eyebrow light>One free audit. Zero obligation.</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">See exactly what is holding your admissions back.</h2>
            <p className="mt-5 max-w-xl text-lg text-white/85">Send us your current site or your idea. You get a clear, no-obligation audit and the fastest path to a site that enrols and engages, from one accountable team.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={audit} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#102a3d] transition hover:-translate-y-0.5">Start my free audit <ArrowUpRight size={18} /></button>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">Explore services</Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MINT }}>What your audit covers</p>
            <h3 className="mt-2 text-2xl font-bold">A specific, prioritised plan.</h3>
            <ul className="mt-5 space-y-4">
              {[{ b: 'Programme & admissions flow', t: 'where families drop out before applying.' }, { b: 'Speed & mobile', t: 'how it really performs on a phone.' }, { b: 'Accessibility & privacy', t: 'WCAG gaps and student-data handling.' }, { b: 'LMS, CRM & payments', t: 'where data is re-entered or lost.' }, { b: 'Roadmap', t: 'what to fix first, and the likely impact.' }].map((x) => (
                <li key={x.b} className="flex items-start gap-3 text-white/90"><Check size={18} className="mt-0.5 shrink-0" style={{ color: MINT }} /><span><b className="text-white">{x.b}:</b> {x.t}</span></li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/60">No obligation, no pressure. Your details stay private.</p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-3xl px-5 text-center text-[11px] text-white/45">Photos via Burst by Shopify. Regulatory references are general information, not legal advice.</p>
      </section>
    </div>
  )
}
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AlertTriangle, ArrowRight, ArrowUpRight, Building2, Calculator, Check, ChevronDown, ClipboardCheck, FileText, Globe, Landmark, Lock, Mail, Phone, Scale, Search, ShieldCheck, Sparkles, UserRound, Users, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

/* ---------- Photos (free to use, Burst by Shopify). Swap for your own paths any time. ---------- */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1600&format=pjpg&exif=0&iptc=0`
const IMG = {
  heroMain: burst('team-listens-at-meeting'),
  heroSide: burst('business-meeting-in-office-for-team'),
  heroThird: burst('business-sales-meeting'),
  band: burst('business-team-meeting-in-boardroom'),
  door: burst('team-in-modern-office-meeting-room'),
  law: burst('office-team-business-meeting'),
  ca: burst('tech-staff-at-table-working'),
  cs: burst('team-working-together-with-laptops'),
  advisers: burst('smiling-meeting-roundtable'),
  insurance: burst('business-sales-meeting'),
  architects: burst('hands-on-blueprints'),
  solo: burst('business-meeting-in-office-for-team'),
  cta: burst('office-team-business-meeting'),
}

const ACCENT = '#3d5a80'
const GOLD = '#b8892b'
const DEEP = '#0f1c2e'
const MINT = '#8fd3cf'

/* ---------- Data ---------- */
type Status = 'allowed' | 'required' | 'avoid' | 'check'
type Rule = { item: string; status: Status; note: string }
type Profession = { id: string; label: string; icon: typeof Scale; rule: string; summary: string; rules: Rule[] }

const professions: Profession[] = [
  {
    id: 'advocates', label: 'Advocates & law firms', icon: Scale,
    rule: 'Bar Council of India Rules, Part VI, Chapter II, Section IV, Rule 36',
    summary: 'Advocates may not advertise or solicit work, directly or indirectly. A 2008 proviso allows a website with limited factual particulars, intimated to and approved by the Bar Council of India, with a disclaimer.',
    rules: [
      { item: 'Name, address, phone and email', status: 'allowed', note: 'Basic contact particulars are part of the permitted set.' },
      { item: 'Enrolment number and date, qualifications', status: 'allowed', note: 'Factual credentials are permitted.' },
      { item: 'Areas of practice', status: 'allowed', note: 'Listed factually, in the form the rule permits.' },
      { item: 'Website disclaimer', status: 'required', note: 'The site should state that the information is provided at the advocate’s initiative and is not solicitation.' },
      { item: 'Client testimonials and star reviews', status: 'avoid', note: 'Treated as indirect advertising, so we don’t build them in.' },
      { item: 'Case results, “wins” and rankings', status: 'avoid', note: 'Outcome claims and comparisons go beyond the permitted particulars.' },
      { item: '“Best”, “top” or specialist claims', status: 'avoid', note: 'The rule restricts claims of specialisation or superiority.' },
      { item: 'Fees and packages', status: 'check', note: 'Not part of the permitted list, so confirm with your Bar Council before publishing.' },
      { item: 'Paid ads and lawyer-listing portals', status: 'avoid', note: 'The Bar Council has directed action against advocates using such platforms.' },
    ],
  },
  {
    id: 'cas', label: 'Chartered accountants', icon: Calculator,
    rule: 'Chartered Accountants Act, 1949, First Schedule Part I; ICAI Advertisement and Website Guidelines',
    summary: 'Advertising of services is generally prohibited. Particulars may be published on a website only as the ICAI Website Guidelines permit. Names of clients and fees charged cannot be given.',
    rules: [
      { item: 'Firm name, address and contact details', status: 'allowed', note: 'Core particulars are permitted.' },
      { item: 'Membership number and qualifications', status: 'allowed', note: 'Factual credentials are permitted.' },
      { item: 'Description of services offered', status: 'allowed', note: 'Within the particulars the guidelines list, in factual language.' },
      { item: 'Names of clients', status: 'avoid', note: 'The Website Guidelines say client names cannot be given.' },
      { item: 'Fees charged', status: 'avoid', note: 'The Website Guidelines say fees cannot be given.' },
      { item: 'Promotional or exaggerated claims', status: 'avoid', note: 'Self-promotion goes beyond what the guidelines allow.' },
      { item: 'Testimonials and reviews', status: 'check', note: 'Confirm against current ICAI guidelines before use.' },
    ],
  },
  {
    id: 'others', label: 'Other regulated firms', icon: Landmark,
    rule: 'Each regulator sets its own rules',
    summary: 'Company secretaries, cost accountants, architects, SEBI-registered advisers, insurance agents and others each follow their own regulator’s advertising and conduct rules, which differ from the two above.',
    rules: [
      { item: 'Credentials and registration numbers', status: 'check', note: 'Usually expected. We confirm the exact form your regulator wants.' },
      { item: 'Descriptions of services', status: 'check', note: 'Factual wording is the safe default.' },
      { item: 'Testimonials, reviews and outcomes', status: 'check', note: 'Rules vary widely. We agree a checklist with you or your compliance officer.' },
      { item: 'Fees and performance claims', status: 'check', note: 'Often regulated. We never publish them without sign-off.' },
      { item: 'Required disclosures and disclaimers', status: 'check', note: 'We build them in once your regulator’s requirement is confirmed.' },
    ],
  },
]

const statusUI: Record<Status, { label: string; cls: string; icon: typeof Check }> = {
  allowed: { label: 'Allowed', cls: 'bg-[#e3f4ea] text-[#17703f]', icon: Check },
  required: { label: 'Required', cls: 'bg-[#e4ecf7] text-[#2c4f86]', icon: ClipboardCheck },
  avoid: { label: 'Avoid', cls: 'bg-[#fbe6e3] text-[#a3322a]', icon: X },
  check: { label: 'Check first', cls: 'bg-[#fdf1d9] text-[#8a5a0b]', icon: AlertTriangle },
}

const inside = [
  { id: 'cred', label: 'Credentials', icon: UserRound, title: 'Hero and credentials', text: 'A calm, clear first screen: who you are, what you practise and how to reach you, with registration details shown the way your regulator permits.' },
  { id: 'areas', label: 'Practice areas', icon: FileText, title: 'Practice-area and service pages', text: 'One page per area, written for one kind of client and one kind of question, in plain language that also reads well to search engines.' },
  { id: 'people', label: 'Profiles', icon: Users, title: 'Partner and team profiles', text: 'Qualifications, registration and approachability. In a profession, people are the product, so profiles read as credible humans.' },
  { id: 'insights', label: 'Insights', icon: Sparkles, title: 'Insights and updates', text: 'Explainers and notes on changes in law, tax or regulation, structured to be found and cited, and kept within your professional guidelines.' },
  { id: 'contact', label: 'Contact', icon: Phone, title: 'Clear, careful contact', text: 'Visible phone, email and address, a short enquiry form with a consent notice, and a map. Simple, and not pushy.' },
]

const intake = [
  { icon: Mail, title: 'Short enquiry', text: 'A few fields only: name, contact details and a brief note. Nothing more than needed.' },
  { icon: ShieldCheck, title: 'Clear consent', text: 'A plain notice that says what is collected, why, and who sees it, with India’s data protection law in mind.' },
  { icon: Lock, title: 'Confidential handling', text: 'Enquiries go to your inbox or practice system over an encrypted connection, not into a public database or a third-party tracker.' },
  { icon: ClipboardCheck, title: 'Your process takes over', text: 'Conflict checks and engagement happen in your own systems, by your people. The website doesn’t make those decisions.' },
]

const segments = [
  { name: 'Law firms & advocates', text: 'Compliant, factual sites built around what your Bar Council permits, with clear practice areas and contact details.', icon: Scale, image: IMG.law, reg: 'Bar Council rules' },
  { name: 'CA & tax practices', text: 'Clear service pages and a trustworthy first impression, built to ICAI’s website guidelines.', icon: Calculator, image: IMG.ca, reg: 'ICAI guidelines' },
  { name: 'Company secretaries & compliance', text: 'Structured service pages for ROC, secretarial and compliance work, written plainly for busy founders.', icon: ClipboardCheck, image: IMG.cs, reg: 'ICSI rules' },
  { name: 'Financial & investment advisers', text: 'Trust-first sites with the disclosures your registration requires, coordinated with your compliance officer.', icon: Landmark, image: IMG.advisers, reg: 'SEBI-aware' },
  { name: 'Insurance agencies', text: 'Coverage pages, quick enquiry and an obvious route to a human, for people comparing options.', icon: ShieldCheck, image: IMG.insurance, reg: 'IRDAI-aware' },
  { name: 'Architects & engineers', text: 'Portfolio-led sites with project pages and capability statements that carry your work.', icon: Building2, image: IMG.architects, reg: 'Council rules' },
  { name: 'Independent practitioners', text: 'A simple, credible one-person site that is fast to launch, easy to update and respects your rules.', icon: UserRound, image: IMG.solo, reg: 'From ₹4,999' },
]

const costDrivers = [
  { icon: FileText, title: 'Pages and practice areas', text: 'A one-person practice is simpler than a multi-partner, multi-service firm.', from: 'A few pages', to: 'Many areas' },
  { icon: Users, title: 'Profiles and content', text: 'Number of partners, plus whether we edit your writing or you supply it.', from: 'Supplied', to: 'Edited & new' },
  { icon: Mail, title: 'Enquiry and integrations', text: 'A simple form versus calendar booking, CRM or practice-system connections.', from: 'Simple', to: 'Connected' },
  { icon: Globe, title: 'Migration scope', text: 'For rebuilds, how large the existing site and its URLs are.', from: 'Small', to: 'Large' },
  { icon: ShieldCheck, title: 'Compliance review', text: 'Extra review cycles with your compliance officer or counsel.', from: 'Light', to: 'Thorough' },
]

const steps = [
  { n: '01', title: 'Audit & rulebook', text: 'We review your current site, or your plans, for accessibility, speed, privacy and the content rules your regulator sets. We agree a checklist of what can and can’t go on the page.' },
  { n: '02', title: 'Structure & scope', text: 'We map pages, profiles and the enquiry journey, and fix the scope and timeline before design starts.' },
  { n: '03', title: 'Design & build', text: 'Accessible, fast, mobile-first pages with your content reviewed against the agreed checklist at every milestone.' },
  { n: '04', title: 'Review, launch & care', text: 'Your counsel or compliance officer signs off, we launch with redirects protected, and monthly care keeps the site accurate.' },
]

const faqs: [string, string][] = [
  ['Does my law firm’s website have to follow Bar Council rules?', 'Yes. Rule 36 of the Bar Council of India Rules bars advocates from advertising or soliciting work. A 2008 proviso allows a website with limited factual information, such as name, address, contact details, enrolment details, qualifications and areas of practice, intimated to and approved by the Bar Council. We build to that and keep outcome claims, reviews and promotional language off the site. This is general information, not legal advice, so please confirm with your Bar Council.'],
  ['Can a chartered accountant’s website show fees or client names?', 'No. ICAI’s Website Guidelines say names of clients and fees charged cannot be given, and advertising is only permitted within its guidelines. We build the site to those limits and suggest you confirm the current guidelines with ICAI.'],
  ['Can we show testimonials, reviews or case results?', 'For advocates and chartered accountants, generally not. For other professions it varies by regulator. We won’t add anything until it’s checked against your rules and signed off by you or your compliance officer.'],
  ['Then how does a compliant website bring in clients?', 'By being easy to find, clear and trustworthy rather than promotional: accurate practice-area pages, credible profiles, fast mobile pages and a simple way to get in touch. Many clients arrive by referral and then check you online, and that check is what the site is built to pass.'],
  ['How do you handle client confidentiality?', 'The site collects only what an enquiry needs, with a clear consent notice, sends it over an encrypted connection and doesn’t keep case records on the marketing site. Your practice system stays the system of record.'],
  ['Is accessibility a legal issue in India?', 'It’s increasingly a duty. The Rights of Persons with Disabilities Act, 2016 and a 2025 Supreme Court judgment recognising digital access as part of the right to life under Article 21 raise the bar. We build to WCAG 2.1 AA in the code and test it, rather than relying on overlay widgets.'],
  ['Should we redesign or build new?', 'If your content and rankings are sound but the site is slow, dated or hard to edit, a redesign usually pays off best and protects your search visibility. If you’re launching or rebranding, a fresh build is cleaner. The audit tells you which.'],
  ['How much does a professional-firm website cost?', 'A solo practitioner can start with our Business Digital Pack from ₹4,999, which includes up to 5 pages, WhatsApp Business setup, Google Business Profile help and basic SEO. Multi-partner or multi-practice builds are scoped after the audit with a fixed, itemised proposal.'],
  ['Do you write the content?', 'We structure and edit. Your professionals provide the substance and approve every line, which also keeps the site inside your regulator’s rules.'],
]

const strip = ['Regulator-aware content', 'Practice-area pages', 'Partner profiles', 'Confidential enquiry', 'Consent notices', 'Accessible design', 'Fast on mobile', 'Google Business Profile', 'Insights hub', 'Clear contact details']

/* ---------- Helpers ---------- */
function useInView<T extends HTMLElement>(threshold = 0) {
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
  return <div ref={ref} className={`ps-reveal ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Photo({ src, alt, className = '', tint = ACCENT }: { src: string; alt: string; className?: string; tint?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={className} style={{ background: `linear-gradient(135deg, ${tint}22, ${tint}55)` }} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

function Marquee({ children, duration = 40, reverse = false }: { children: ReactNode; duration?: number; reverse?: boolean }) {
  return (
    <div className="ps-marquee">
      <div className="ps-track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div className="ps-set">{children}</div>
        <div className="ps-set ps-dup" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

/* ---------- Signature 1: the rulebook ---------- */
function Rulebook() {
  const [pid, setPid] = useState(professions[0].id)
  const p = professions.find((x) => x.id === pid)!
  const counts = (['allowed', 'required', 'avoid', 'check'] as Status[]).map((s) => ({ s, n: p.rules.filter((r) => r.status === s).length })).filter((c) => c.n > 0)
  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Choose your profession">
        {professions.map((x) => (
          <button key={x.id} role="tab" aria-selected={pid === x.id} onClick={() => setPid(x.id)} className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${pid === x.id ? 'border-transparent text-white' : 'border-[#d5dde8] bg-white text-[#33424e] hover:border-[#3d5a80]'}`} style={pid === x.id ? { background: ACCENT } : undefined}>
            <x.icon size={16} /> {x.label}
          </button>
        ))}
      </div>
      <div key={p.id} className="ps-fade grid items-start gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-[28px] p-7 text-white" style={{ background: `linear-gradient(150deg, ${DEEP}, ${ACCENT})` }}>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-white/60">The governing rule</p>
          <p className="mt-2 text-lg font-bold leading-snug">{p.rule}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/80">{p.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {counts.map((c) => <span key={c.s} className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{c.n} {statusUI[c.s].label.toLowerCase()}</span>)}
          </div>
        </div>
        <ul className="space-y-2.5">
          {p.rules.map((r) => {
            const u = statusUI[r.status]
            return (
              <li key={r.item} className="flex items-start gap-4 rounded-2xl border border-[#e3e9f1] bg-white p-4">
                <span className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${u.cls}`}><u.icon size={13} /> {u.label}</span>
                <div className="min-w-0"><p className="font-semibold text-[#102a3d]">{r.item}</p><p className="mt-0.5 text-sm leading-relaxed text-[#5e6b76]">{r.note}</p></div>
              </li>
            )
          })}
        </ul>
      </div>
      <p className="mt-6 text-center text-xs text-[#6b7782]">General summary of publicly available rules, not legal advice. Rules change, so please confirm with your regulator.</p>
    </div>
  )
}

/* ---------- Signature 2: what's inside ---------- */
function InsideExplorer() {
  const [i, setI] = useState(0)
  const cur = inside[i]
  const body: ReactNode[] = [
    <div key="c" className="space-y-3"><p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Advocates · Chambers</p><p className="text-2xl font-bold leading-tight text-[#102a3d]">Mehta & Rao, Advocates</p><p className="text-sm text-[#5e6b76]">Enrolment details · Qualifications · Areas of practice</p><span className="inline-block rounded-full px-4 py-2 text-xs font-bold text-white" style={{ background: ACCENT }}>Contact the chambers</span></div>,
    <div key="a" className="grid grid-cols-2 gap-3 text-sm">{['Property & real estate', 'Family law', 'Commercial contracts', 'Arbitration'].map((t) => <div key={t} className="rounded-xl border border-[#e3e9f1] bg-[#f6f8fb] p-3 font-semibold text-[#102a3d]">{t}<p className="mt-1 text-[11px] font-normal text-[#5e6b76]">What it covers, in plain language</p></div>)}</div>,
    <div key="p" className="flex items-center gap-4"><div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#e9eef6]"><UserRound size={34} style={{ color: ACCENT }} /></div><div><p className="font-bold text-[#102a3d]">Partner name</p><p className="text-xs text-[#5e6b76]">LL.B. · Enrolment no. · Courts practised before</p><p className="mt-2 text-xs text-[#33424e]">A short, factual profile.</p></div></div>,
    <div key="i" className="space-y-2">{['Explainer: what the new rules mean for you', 'Note: key changes this quarter', 'Guide: documents to keep ready'].map((t) => <div key={t} className="flex items-center gap-3 rounded-xl border border-[#e3e9f1] p-3 text-sm font-semibold text-[#102a3d]"><FileText size={16} style={{ color: ACCENT }} /> {t}</div>)}</div>,
    <div key="k" className="space-y-2 text-sm text-[#33424e]"><p className="flex items-center gap-2"><Phone size={15} style={{ color: ACCENT }} /> +91 · tap to call</p><p className="flex items-center gap-2"><Mail size={15} style={{ color: ACCENT }} /> chambers@yourfirm.in</p><div className="rounded-xl border border-[#e3e9f1] bg-[#f6f8fb] p-3 text-xs"><p className="font-bold text-[#102a3d]">Send a brief note</p><p className="mt-1 text-[#5e6b76]">Name · contact · short message</p><p className="mt-2 flex items-center gap-1.5 text-[#17703f]"><Check size={12} /> Consent notice included</p></div></div>,
  ]
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[.9fr_1.1fr]">
      <div className="space-y-2.5" role="tablist" aria-label="What a firm website includes">
        {inside.map((x, k) => (
          <button key={x.id} role="tab" aria-selected={i === k} onClick={() => setI(k)} className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${i === k ? 'border-[#3d5a80] bg-white shadow-[0_14px_36px_rgba(61,90,128,.15)]' : 'border-[#e3e9f1] bg-white/60 hover:bg-white'}`}>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${i === k ? 'text-white' : 'bg-[#e9eef6] text-[#3d5a80]'}`} style={i === k ? { background: ACCENT } : undefined}><x.icon size={20} /></span>
            <div><p className="font-bold text-[#102a3d]">{x.title}</p>{i === k && <p className="mt-1 text-sm leading-relaxed text-[#5e6b76]">{x.text}</p>}</div>
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[28px] border border-[#e3e9f1] bg-white shadow-[0_24px_60px_rgba(15,28,46,.12)]">
        <div className="flex items-center gap-2 border-b border-[#eef2f7] bg-[#f6f8fb] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" /><span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
          <span className="ml-3 flex-1 rounded-full bg-white px-3 py-1 text-[11px] text-[#8a97a1]">yourfirm.in / {cur.label.toLowerCase()}</span>
        </div>
        <div key={cur.id} className="ps-fade flex min-h-[270px] items-center p-7">{body[i]}</div>
        <p className="border-t border-[#eef2f7] px-5 py-3 text-[11px] text-[#6b7782]">Illustrative layout. Content is adapted to what your regulator permits.</p>
      </div>
    </div>
  )
}

function SiteCompare() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative h-[420px] select-none overflow-hidden rounded-[28px] border border-[#e3e9f1] bg-white shadow-[0_24px_60px_rgba(15,28,46,.15)]">
      <div className="absolute inset-0 p-6" style={{ background: 'linear-gradient(180deg,#f6f8fb,#fff)' }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>After · clear and compliant</p>
        <p className="text-2xl font-bold leading-tight text-[#102a3d]">Mehta & Rao, Advocates</p>
        <p className="mt-1 text-xs text-[#5e6b76]">Areas of practice · Enrolment details · Contact</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-[#33424e]">{['Property', 'Family', 'Contracts'].map((t) => <div key={t} className="rounded-lg border border-[#e3e9f1] bg-white p-2.5">{t}</div>)}</div>
        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-[#17703f]"><Check size={12} /> Disclaimer shown · Accessible · Fast on mobile</p>
      </div>
      <div className="absolute inset-0 bg-[#e9e9e9] p-6" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#e36a27]">Before · risky and dated</p>
        <p className="text-base font-bold text-[#8c8c8c]">Top Law Firm — Winning Cases Since 1998!</p>
        <p className="mt-1 text-[10px] leading-tight text-[#b0b0b0]">“Best lawyer in the city” ★★★★★ · 100+ cases won · Call now for FREE consultation and special fee packages!</p>
        <div className="mt-3 h-14 rounded bg-[#dcdcdc]" />
        <p className="mt-3 text-[10px] text-[#b0b0b0]">Tiny low-contrast text · no disclaimer · slow to load · hard to read on a phone</p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.1)]" style={{ left: `${pos}%` }} />
      <div className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg" style={{ left: `${pos}%` }}><span className="text-[#102a3d]">↔</span></div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Drag to compare a risky promotional site and a clear compliant one" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  )
}

const styles = `
@keyframes ps-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes ps-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes ps-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes ps-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.ps-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.ps-track { display: flex; width: max-content; animation: ps-scroll 40s linear infinite; }
.ps-marquee:hover .ps-track { animation-play-state: paused; }
.ps-set { display: flex; flex-shrink: 0; align-items: center; }
.ps-hero > * { opacity: 0; animation: ps-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.ps-hero > *:nth-child(1){animation-delay:.05s} .ps-hero > *:nth-child(2){animation-delay:.15s} .ps-hero > *:nth-child(3){animation-delay:.27s} .ps-hero > *:nth-child(4){animation-delay:.39s} .ps-hero > *:nth-child(5){animation-delay:.5s}
.ps-float { animation: ps-float 7s ease-in-out infinite; }
.ps-fade { animation: ps-fade .45s ease both; }
.ps-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.ps-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .ps-track, .ps-float, .ps-fade { animation: none; }
  .ps-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .ps-dup { display: none; }
  .ps-hero > * { opacity: 1; animation: none; }
  .ps-reveal { opacity: 1; transform: none; transition: none; }
}
`

/* ---------- Page ---------- */
export default function ProfessionalServicesPage() {
  const { openEnquiry } = useEnquiry()
  const audit = () => openEnquiry('Professional Services')

  return (
    <div className="page-wrapper">
      <SEO
        title="Professional Services — Websites for Law, CA & Advisory Firms | OnlineKarDo"
        description="Websites for law firms, chartered accountants, company secretaries and advisory practices in India: regulator-aware content, accessible design, confidential enquiry. Build new or rebuild. Free audit."
        canonical="/industries/professional-services"
      />
      <style>{styles}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f3f6fa] via-[#e6ecf4] to-[#d6e0ee] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="ps-hero">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold" style={{ color: ACCENT }}><span className="h-2 w-2 rounded-full" style={{ background: GOLD }} /> Industry · Law · CA · Advisory · Architecture</span>
            <h1 className="mt-5 text-5xl font-bold leading-[.95] tracking-[-.05em] text-[#102a3d] md:text-7xl">Websites for professional firms that <span style={{ color: ACCENT }}>earn trust, within your rules.</span></h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#4b5b68]">One accountable partner for law, accounting and advisory practices: credible to clients, aligned with your profession’s advertising rules, accessible, and careful with confidential details.</p>
            <p className="max-w-xl text-base leading-relaxed text-[#4b5b68]">Most clients check your website even when they come by referral. In a regulated profession that site has to be clear and credible, and also compliant. We build for both.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={audit} className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>Get a free audit <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
              <a href="#rulebook" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-7 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">See what the rules allow</a>
            </div>
            <div className="flex flex-wrap gap-2">{['Regulator-aware', 'Accessible by design', 'Confidential by default'].map((t) => <span key={t} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-sm">{t}</span>)}</div>
          </div>
          <div className="relative mx-auto hidden h-[460px] w-full max-w-[480px] lg:block">
            <div className="ps-float absolute left-0 top-0 h-[340px] w-72 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(61,90,128,.35)]"><Photo src={IMG.heroMain} alt="Professional smiling in a modern office" className="h-full w-full" /></div>
            <div className="ps-float absolute bottom-0 right-0 h-60 w-60 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(61,90,128,.35)]" style={{ animationDelay: '-3s' }}><Photo src={IMG.heroSide} alt="Colleagues in a business meeting" className="h-full w-full" /></div>
            <div className="ps-float absolute right-0 top-0 h-44 w-44 overflow-hidden rounded-[26px] shadow-[0_28px_70px_rgba(61,90,128,.35)]" style={{ animationDelay: '-5s' }}><Photo src={IMG.heroThird} alt="Team discussing documents around a table" className="h-full w-full" /></div>
            <div className="absolute right-2 top-[186px] z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><ShieldCheck size={16} style={{ color: ACCENT }} /> Disclaimer in place</div>
            <div className="absolute bottom-24 left-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><Lock size={16} style={{ color: ACCENT }} /> Confidential enquiry</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-b border-[#e3e9f1] bg-white py-7" aria-label="What a professional-firm website includes">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[.18em] text-[#6b7782]">What goes into a firm website</p>
        <Marquee duration={50}>{strip.map((n) => <span key={n} className="mx-3 whitespace-nowrap rounded-full border border-[#dde5ef] bg-[#f6f8fb] px-5 py-2.5 text-sm font-semibold text-[#102a3d]">{n}</span>)}</Marquee>
      </section>

      {/* Rulebook */}
      <section id="rulebook" className="bg-gradient-to-b from-[#f6f8fb] to-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>The rulebook</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-6xl">For a regulated profession, the website is regulated speech.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">Agencies that copy a generic “win the client” playbook can put an advocate or a chartered accountant in breach of their professional rules. We start from the rulebook, not the template. Pick your profession and see how it shapes the page.</p>
          </Reveal>
          <Reveal><Rulebook /></Reveal>
        </div>
      </section>

      {/* Why it still matters */}
      <section className="relative overflow-hidden py-20 text-white md:py-28" style={{ background: `linear-gradient(160deg, ${DEEP}, #17304d)` }}>
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full blur-[120px]" style={{ background: `${ACCENT}66` }} />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>The stakes</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">The website is the first quiet cross-examination.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">Clients who come by referral still look you up before they call. They can’t judge your advice, so they judge what they can see: how clear, careful and credible you look.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[{ i: Search, t: 'Found when they look', x: 'Accurate practice-area pages and a verified Google profile, so your name and details show up correctly.' }, { i: UserRound, t: 'Credible at a glance', x: 'Clear credentials and approachable profiles, shown the way your regulator permits.' }, { i: Lock, t: 'Careful with details', x: 'A short enquiry form with consent, sent over an encrypted connection to your team.' }, { i: Users, t: 'Usable by everyone', x: 'Readable on a phone, at any age, and for people using assistive tools.' }].map((c, k) => (
              <Reveal key={c.t} delay={k * 90} className="h-full">
                <article className="h-full rounded-[24px] border border-white/10 bg-white/[.05] p-6 transition hover:bg-white/[.08]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10"><c.i size={22} style={{ color: MINT }} /></span>
                  <h3 className="mt-4 text-xl font-bold">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{c.x}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="bg-[#f6f8fb] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>What’s inside</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">What a firm website built to earn trust actually includes.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Every page has a job: establish credibility, answer the visitor’s real question and make contact easy and careful. Click through the parts.</p>
          </Reveal>
          <Reveal><InsideExplorer /></Reveal>
        </div>
      </section>

      {/* Two doors */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Two ways in</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Two doors. Both lead to a site that serves you well.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Most firms aren’t starting from nothing. They’re stuck with a slow, dated or risky site. We’re experts in redesign and redevelopment, and we build new sites from scratch too.</p>
          </Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal><SiteCompare /><p className="mt-3 text-center text-xs text-[#6b7782]">Illustrative before and after. Drag to compare.</p></Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Redesign & replatform</p>
              <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Redesign and rebuild your existing site</h3>
              <p className="mt-3 text-[#5e6b76]">We audit accessibility, speed, content and regulatory exposure, then replatform, migrate your content and search visibility safely, and remove anything your rules don’t permit.</p>
              <ul className="mt-5 space-y-2.5">{['Promotional or non-permitted content flagged and fixed', 'Accessibility and speed fixed at the source', 'Content and rankings migrated safely', 'Easy to edit, on a platform you own'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ACCENT }} /> {s}</li>)}</ul>
              <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d] px-6 py-3 font-bold text-[#102a3d] transition hover:bg-[#102a3d] hover:text-white">Audit my current site <ArrowRight size={16} /></button>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <article className="grid overflow-hidden rounded-[32px] border border-[#e3e9f1] bg-[#f6f8fb] md:grid-cols-2">
              <Photo src={IMG.door} alt="Professional reviewing a report at a desk" className="h-64 w-full md:h-full" />
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>From scratch</p>
                <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Build a new site for a new practice</h3>
                <p className="mt-3 text-[#5e6b76]">Launching, rebranding or setting up your own practice? We design a complete site around your positioning, services and profiles, built compliant and accessible from the first line.</p>
                <ul className="mt-5 space-y-2.5">{['Compliant and accessible from day one', 'Built around your areas of practice and profiles', 'Enquiry, consent and contact details built in'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ACCENT }} /> {s}</li>)}</ul>
                <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>Plan my new site <ArrowRight size={16} /></button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Band */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.band} alt="Two professionals shaking hands across a table" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(90deg, ${DEEP}ee, ${DEEP}b8 55%, ${DEEP}66)` }} />
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>Trust, not promotion</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">The strongest signal of a good professional is a site that is calm, clear and correct.</h2>
            <p className="mt-5 text-lg text-white/80">No inflated claims, no stars, no stunts. Just accurate information, presented well and easy to act on.</p>
          </Reveal>
        </div>
      </section>

      {/* Intake */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Confidential by design</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">A careful path from a first message to your team.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Visitors may be sharing something sensitive. The enquiry path collects the minimum, says clearly why, and hands over to your own process.</p>
          </Reveal>
          <div className="relative grid gap-5 md:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-7 hidden h-0.5 md:block" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${GOLD})` }} />
            {intake.map((s, k) => (
              <Reveal key={s.title} delay={k * 100}>
                <article className="relative h-full rounded-[24px] border border-[#e3e9f1] bg-[#f6f8fb] p-6 text-center">
                  <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white ring-4 ring-white" style={{ background: ACCENT }}><s.icon size={24} /></span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>Step {k + 1}</p>
                  <h3 className="mt-1 text-lg font-bold text-[#102a3d]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-[#5e6b76]">Whether an enquiry form is appropriate at all depends on your regulator. For some professions we use plain contact details only.</p>
        </div>
      </section>

      {/* Standards */}
      <section className="bg-[#f6f8fb] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Accessibility and findability</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-5xl">Usable by every client, and easy for search engines and AI assistants to read.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Digital accessibility is increasingly a duty in India, with the Rights of Persons with Disabilities Act, 2016 and a 2025 Supreme Court ruling on digital access. We build to WCAG 2.1 AA in the code and test it, instead of adding an overlay widget.</p>
            <ul className="mt-6 space-y-3">{['Keyboard and screen-reader friendly pages and forms', 'High-contrast, readable type that works on a phone', 'Clean structure and answer-first writing, so search engines and AI assistants can read and cite you accurately', 'A verified Google Business Profile with correct details'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ACCENT }} /> {s}</li>)}</ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[32px] border border-[#e3e9f1] bg-white p-6 shadow-[0_24px_60px_rgba(15,28,46,.1)]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#6b7782]">An AI assistant, asked a plain question</p>
              <p className="mt-3 rounded-2xl bg-[#eef2f7] p-4 text-sm font-semibold text-[#102a3d]">“What documents do I need to register a private limited company?”</p>
              <div className="mt-3 rounded-2xl border border-[#e3e9f1] p-4 text-sm leading-relaxed text-[#33424e]">
                <p className="flex items-center gap-2 font-bold text-[#102a3d]"><Sparkles size={15} style={{ color: ACCENT }} /> Answer</p>
                <p className="mt-2">Typically identity and address proofs for directors, a registered office proof and a name approval. See the checklist on <span className="rounded bg-[#fdf1d9] px-1 font-semibold">Your Firm’s guide</span> for the current list.</p>
              </div>
              <p className="mt-3 text-[11px] text-[#6b7782]">Illustrative. Clear, accurate pages make it easier to be cited correctly, but no site can guarantee it.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Who we serve</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Built for the full spectrum of professional firms.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">One team, shaped to each profession’s clients and rules. Each is a self-contained build for a redesign or a new site.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {segments.map((s, k) => (
              <Reveal key={s.name} delay={k * 55} className="h-full">
                <article className="group h-full overflow-hidden rounded-[24px] border border-[#e3e9f1] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(61,90,128,.18)]">
                  <div className="relative h-40 overflow-hidden">
                    <Photo src={s.image} alt={s.name} className="h-full w-full transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold" style={{ color: ACCENT }}>{s.reg}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold leading-snug text-[#102a3d]">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{s.text}</p>
                    <button onClick={audit} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: ACCENT }}>Talk to us <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={7 * 55} className="h-full">
              <article className="flex h-full flex-col justify-between rounded-[24px] p-6 text-white" style={{ background: `linear-gradient(145deg, ${DEEP}, ${ACCENT})` }}>
                <div><p className="text-xs font-bold uppercase tracking-wider text-white/70">Looking for strategy firms?</p><p className="mt-2 text-xl font-bold">Consulting firms have a dedicated page.</p><p className="mt-2 text-sm text-white/75">Positioning, case studies and discovery-call paths for advisory businesses.</p></div>
                <Link to="/industries/consulting" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: MINT }}>See consulting <ArrowRight size={14} /></Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Investment + process */}
      <section className="bg-[#f6f8fb] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Investment</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">What a professional-firm website costs.</h2>
            <p className="mt-4 text-[#5e6b76]">Pricing varies because the work does. Here’s what actually drives it, and we give a fixed, itemised proposal after your free audit.</p>
            <div className="mt-6 space-y-3">
              {costDrivers.map((d) => (
                <div key={d.title} className="flex items-center gap-4 rounded-2xl border border-[#e3e9f1] bg-white p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${ACCENT}1a` }}><d.icon size={22} style={{ color: ACCENT }} /></span>
                  <div className="min-w-0 flex-1"><p className="font-bold text-[#102a3d]">{d.title}</p><p className="text-xs text-[#5e6b76]">{d.text}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-[#2a3f5c]"><span>{d.from}</span><span className="h-1 flex-1 rounded-full bg-gradient-to-r from-[#c9d6e8] to-[#3d5a80]" /><span>{d.to}</span></div></div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl p-5 text-white" style={{ background: DEEP }}>
              <p className="flex items-center gap-2 font-bold"><UserRound size={18} style={{ color: MINT }} /> Starting as a solo practitioner?</p>
              <p className="mt-1 text-sm text-white/75">The Business Digital Pack covers up to 5 pages, WhatsApp Business setup, Google Business Profile help and basic SEO, from ₹4,999 one time. Content is checked against your rules.</p>
              <Link to="/packs" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: MINT }}>See setup packs <ArrowUpRight size={14} /></Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>How it works</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">A build around your practice and your rules.</h2>
            <div className="relative mt-8">
              <div className="absolute bottom-0 left-6 top-0 w-px" style={{ background: `linear-gradient(to bottom, ${ACCENT}, ${ACCENT}1a)` }} />
              {steps.map((s, k) => (
                <div key={s.n} className="relative pb-6 pl-20 last:pb-0">
                  <span className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ring-4 ring-[#f6f8fb]" style={{ background: ACCENT }}>{k + 1}</span>
                  <div className="rounded-[20px] border border-[#e3e9f1] bg-white p-5"><h3 className="text-lg font-bold text-[#102a3d]">{s.title}</h3><p className="mt-1.5 text-sm leading-relaxed text-[#5e6b76]">{s.text}</p></div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#5e6b76]">Every project starts with a free audit, with findings you keep whether or not we build together.</p>
          </Reveal>
        </div>
      </section>

      {/* One partner */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>The OnlineKarDo model</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">One accountable partner for your practice’s web presence.</h2>
            <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
              {[{ i: Globe, t: 'One point of accountability', x: 'A single lead owns the outcome from audit to launch and beyond.' }, { i: ShieldCheck, t: 'Rules first', x: 'Your regulator’s rules are agreed before design starts, not discovered at launch.' }, { i: ClipboardCheck, t: 'You approve everything', x: 'Your professionals sign off every line, and you own the site, content and domain.' }].map((c) => (
                <div key={c.t} className="rounded-2xl border border-[#e3e9f1] bg-[#f6f8fb] p-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${ACCENT}1a` }}><c.i size={22} style={{ color: ACCENT }} /></span><p className="mt-3 font-bold text-[#102a3d]">{c.t}</p><p className="mt-1 text-sm text-[#5e6b76]">{c.x}</p></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f6f8fb] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>FAQ</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Questions firms ask before they hire.</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(([q, a], k) => (
              <details key={q} open={k === 0} className="group rounded-2xl border border-[#e3e9f1] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#102a3d]"><span>{q}</span><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eaf0f7] transition-transform group-open:rotate-180" style={{ color: ACCENT }}><ChevronDown size={18} /></span></summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#5e6b76]">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-[#6b7782]">Rule summaries are general information from public sources (Bar Council of India Rules, Rule 36 and its 2008 proviso; ICAI Website Guidelines). They are not legal advice.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.cta} alt="Colleagues around a meeting table" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(135deg, ${DEEP}f2, ${DEEP}d9 55%, ${ACCENT}bf)` }} />
        <div className="mx-auto max-w-3xl px-5 text-center">
          <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>Your move</span>
          <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">Your next client is checking your website right now.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">Whether you need a full redesign or a new build, the fastest first step is a free, no-obligation audit. We’ll show where your site loses trust, what your rules allow, and what a site built the right way looks like for your practice.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button onClick={audit} className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#102a3d] transition hover:-translate-y-0.5">Start my free audit <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
            <Link to="/packs" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">See setup packs</Link>
          </div>
          <p className="mt-8 text-sm text-white/65">No obligation · prioritised findings · a clear plan for your firm</p>
          <p className="mt-6 text-[11px] text-white/45">Photos via Burst by Shopify. Screens shown are illustrative.</p>
        </div>
      </section>
    </div>
  )
}
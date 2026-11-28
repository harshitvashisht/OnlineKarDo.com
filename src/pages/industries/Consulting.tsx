import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Briefcase, Calculator, CalendarCheck, Check, ChevronDown, FileText, Globe, Layers, LineChart, Lightbulb, MessageCircle, Search, Target, TrendingUp, UserRound, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

/* ---------- Photos (free to use, Burst by Shopify). Swap for your own paths any time. ---------- */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1600&format=pjpg&exif=0&iptc=0`
const IMG = {
  heroMain: burst('business-team-meeting-in-boardroom'),
  heroSide: burst('tech-staff-at-table-working'),
  band: burst('team-in-modern-office-meeting-room'),
  door: burst('team-listens-at-meeting'),
  management: burst('business-sales-meeting'),
  boutique: burst('office-team-business-meeting'),
  it: burst('team-working-together-with-laptops'),
  financial: burst('business-meeting-in-office-for-team'),
  hr: burst('smiling-meeting-roundtable'),
  ops: burst('reading-charts-at-business-meeting'),
  solo: burst('laptop-at-the-table-with-tea-at-side'),
  cta: burst('office-team-business-meeting'),
}

const ACCENT = '#6d4fd6'
const DEEP = '#2a1b6b'
const MINT = '#55c9c0'

/* ---------- Data ---------- */
const doubts = [
  { stage: 'Anonymous research', quote: '“Are these people even credible?”', answer: 'Sharp positioning and proof above the fold, so the first read passes the test in seconds.', confidence: 20 },
  { stage: 'Silent evaluation', quote: '“Do they actually understand my problem?”', answer: 'Named frameworks and sector case studies that show you have solved this exact problem before.', confidence: 40 },
  { stage: 'Building a shortlist', quote: '“Who do I trust enough to actually call?”', answer: 'Partner bios with real credentials and outcomes that make you the safe choice.', confidence: 60 },
  { stage: 'Internal consensus', quote: '“Can I defend this to my board?”', answer: 'Shareable depth, such as a short summary PDF, so every stakeholder can see why you are the right firm.', confidence: 80 },
  { stage: 'The reach-out', quote: '“Is starting a conversation low-risk?”', answer: 'A frictionless book-a-call path, plus WhatsApp and an assistant that responds even when no one is at the desk.', confidence: 100 },
]

const engine = [
  { icon: Target, title: 'Positioning that says exactly who you help and how', text: 'We pull out your point of view, frameworks and ideal-client focus, then say it plainly above the fold. Specific beats broad, and niche clarity is also what makes you easy to find and easy to recommend.' },
  { icon: FileText, title: 'Proof that does the selling', text: 'A reusable case-study system with measurable results and recognisable sectors, not vanity claims. Logos, named industries and short outcome snippets placed exactly where buyers hesitate.' },
  { icon: Lightbulb, title: 'A thought-leadership hub, not a blog graveyard', text: 'A structured insights area that surfaces your best thinking, built so it can rank in search and be cited. Good writing on a badly organised site never gets found.' },
  { icon: Users, title: 'Partner and team credibility', text: 'In consulting, the people are the product. Leadership bios that carry authority and build confidence with several stakeholders at once.' },
  { icon: CalendarCheck, title: 'A frictionless path to a conversation', text: 'Clear, repeated calls to book a discovery call, short smart forms and qualification that respects a senior buyer’s time.' },
  { icon: Zap, title: 'Fast, accessible and built to scale', text: 'Tuned for speed on mobile, accessible to WCAG 2.1 AA, and structured so you can add service lines, sectors and cities later without a full rebuild.' },
]

const segments = [
  { name: 'Management & strategy consulting', text: 'Make methodologies and outcomes tangible with framework explainers and case studies that help several stakeholders reach consensus faster.', icon: Briefcase, image: IMG.management },
  { name: 'Boutique advisory firms', text: 'Sharp, distinctive sites that position a small firm as the obvious specialist and turn referrals into inbound enquiries.', icon: Target, image: IMG.boutique },
  { name: 'IT & technology consulting', text: 'Prove technical depth without losing non-technical decision-makers: credentials, partner status and plain-language outcomes.', icon: Layers, image: IMG.it },
  { name: 'Financial, CA & fractional CFO advisory', text: 'Trust-first sites that lead with credentials, named outcomes and a low-pressure path to a discovery call.', icon: LineChart, image: IMG.financial },
  { name: 'HR & people consulting', text: 'Humanise your approach, evidence your frameworks and make booking a conversation effortless for busy leaders.', icon: Users, image: IMG.hr },
  { name: 'Operations & transformation', text: 'Translate abstract offerings into clear service stories, outcome-led case studies and a structured content hub.', icon: Globe, image: IMG.ops },
  { name: 'Independent & solo consultants', text: 'Personal yet authoritative sites that reduce perceived risk, with trust signals and thought leadership woven through.', icon: UserRound, image: IMG.solo },
]

const alsoExplore = [
  { title: 'Website redesign & redevelopment', text: 'Audit, fix positioning and conversion gaps, then replatform without losing the search visibility you’ve built.' },
  { title: 'Thought-leadership & insights hub', text: 'Frameworks, points of view and guides, structured to rank and to feed a measurable enquiry funnel.' },
  { title: 'Lead-generation & discovery-call funnel', text: 'High-intent pages, smart forms, optional qualification and CRM-connected follow-up.' },
]

const steps = [
  { n: '01', title: 'Audit & discovery', text: 'A free audit of your site, or of your positioning if you’re new: what converts, what leaks and where credibility breaks down. We pull out your frameworks, ideal client and differentiation.' },
  { n: '02', title: 'Positioning & scoping', text: 'We turn your intellectual capital into clear messaging and a site structure matched to how buyers evaluate, then scope the build, platform and integrations.' },
  { n: '03', title: 'Design & build', text: 'Brand, pages, insights hub, case-study system and conversion paths designed and built in parallel, with accessibility included from the start.' },
  { n: '04', title: 'Launch, measure & optimise', text: 'We launch, connect analytics and your CRM, and keep improving conversion, so the site grows with your firm instead of ending at go-live.' },
]

const faqs: [string, string][] = [
  ['How much does a website for a consulting firm cost?', 'It depends on scope. A solo consultant can start with our Business Digital Pack from ₹4,999, while a strategic, custom build with content, integrations and an assistant costs more. Because one won engagement is often worth far more than the site, we scope after a free audit and give a fixed, itemised proposal.'],
  ['How long does it take?', 'A focused site for a small practice can be live in days with a pack. A strategic build is driven more by content, positioning and stakeholder alignment than by technical work, and we agree a clear timeline in scoping.'],
  ['What should a consulting website include?', 'Sharp positioning above the fold, case studies with outcomes, an insights hub, credible partner bios, clear service explanations, trust signals and an easy, repeated path to book a discovery call.'],
  ['Redesign my existing site or build new?', 'If your positioning and content are sound but the site is slow, dated or hard to edit, a redesign usually pays off best and protects your search visibility. If you’re launching or rebranding, a fresh build is faster and cleaner. The audit tells you which.'],
  ['Can a website really generate enquiries for a consulting firm?', 'Yes, when it’s built as a funnel rather than a brochure. Most senior buyers research quietly before reaching out, so the site has to demonstrate expertise, build confidence and make booking a call effortless.'],
  ['What platform will you use?', 'Whatever fits your firm, commonly WordPress, Webflow or a custom build, chosen for control, speed, search and integrations. We recommend one in the audit rather than pushing a favourite.'],
  ['Do you handle branding and automation too?', 'Yes. Branding, the website, and the automation behind it such as booking, WhatsApp and CRM connections come from one accountable lead, designed to work together.'],
  ['Will the site be accessible and handle data responsibly?', 'We build to WCAG 2.1 AA and collect only the details an enquiry needs, with clear consent, with India’s data protection law in mind. This is general information, not legal advice.'],
  ['Do you run our marketing campaigns?', 'Our core scope is design, development, branding and the automation behind your site, plus the collateral your campaigns run on. Campaign management is scoped separately, and we’ll be clear on what’s included in the audit.'],
]

const strip = ['Clear positioning', 'Case studies', 'Insights hub', 'Partner bios', 'Book a discovery call', 'WhatsApp enquiries', 'Shareable summaries', 'CRM connection', 'Fast on mobile', 'Accessible design']

/* ---------- Helpers ---------- */
const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`

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
  return <div ref={ref} className={`cn-reveal ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Photo({ src, alt, className = '', tint = ACCENT }: { src: string; alt: string; className?: string; tint?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={className} style={{ background: `linear-gradient(135deg, ${tint}22, ${tint}55)` }} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

function Marquee({ children, duration = 40, reverse = false }: { children: ReactNode; duration?: number; reverse?: boolean }) {
  return (
    <div className="cn-marquee">
      <div className="cn-track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div className="cn-set">{children}</div>
        <div className="cn-set cn-dup" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

/* ---------- Signature piece 1: doubt → proof explorer ---------- */
function DoubtExplorer() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((x) => (x + 1) % doubts.length), 7000)
    return () => window.clearInterval(t)
  }, [paused])
  const d = doubts[i]

  const page = [
    <div key="0" className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Operations advisory · India</p>
      <p className="text-2xl font-bold leading-tight text-[#102a3d]">We help mid-sized manufacturers release working capital in 90 days.</p>
      <p className="text-sm text-[#5e6b76]">Senior-led. Framework-driven. Built for CFOs and promoters.</p>
      <span className="inline-block rounded-full px-4 py-2 text-xs font-bold text-white" style={{ background: ACCENT }}>Book a discovery call</span>
    </div>,
    <div key="1" className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl bg-[#f5f0ff] p-4"><p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Our framework</p><p className="mt-1 font-bold text-[#102a3d]">The 3-Lever Cash Model</p><p className="mt-1 text-xs text-[#5e6b76]">Inventory · Receivables · Payables, explained in one page.</p></div>
      <div className="rounded-xl border border-[#e7e0fa] p-4 text-xs text-[#33424e]"><p className="font-bold text-[#102a3d]">Case study · Auto components</p><p className="mt-2"><b>Problem:</b> cash locked in stock.</p><p><b>Approach:</b> 3-lever review.</p><p><b>Result:</b> named, measured outcome.</p></div>
    </div>,
    <div key="2" className="grid grid-cols-3 gap-3 text-center">
      {['Partner 1', 'Partner 2', 'Partner 3'].map((n) => (
        <div key={n} className="rounded-xl border border-[#e7e0fa] p-3"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f0eafd]"><UserRound size={22} style={{ color: ACCENT }} /></div><p className="mt-2 text-xs font-bold text-[#102a3d]">{n}</p><p className="text-[10px] text-[#5e6b76]">Credentials · sector focus</p></div>
      ))}
    </div>,
    <div key="3" className="space-y-3">
      <p className="font-bold text-[#102a3d]">Share this with your board</p>
      <div className="flex items-center gap-3 rounded-xl bg-[#f5f0ff] p-4"><FileText size={26} style={{ color: ACCENT }} /><div><p className="text-sm font-bold text-[#102a3d]">Board summary (2 pages, PDF)</p><p className="text-xs text-[#5e6b76]">Problem, approach, outcomes, investment</p></div></div>
      <div className="flex gap-2 text-xs font-bold"><span className="rounded-full px-4 py-2 text-white" style={{ background: ACCENT }}>Download PDF</span><span className="rounded-full border border-[#d9cff7] px-4 py-2 text-[#102a3d]">Share link</span></div>
    </div>,
    <div key="4" className="space-y-3">
      <p className="font-bold text-[#102a3d]">Book a 30-minute discovery call</p>
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">{['Tue 11:00', 'Wed 15:30', 'Thu 10:00'].map((s, k) => <span key={s} className={`rounded-lg border px-2 py-2 ${k === 1 ? 'text-white' : 'border-[#d9cff7] text-[#102a3d]'}`} style={k === 1 ? { background: ACCENT, borderColor: ACCENT } : undefined}>{s}</span>)}</div>
      <p className="flex items-center gap-2 text-xs text-[#5e6b76]"><MessageCircle size={14} className="text-[#25a244]" /> Prefer WhatsApp? Message us directly.</p>
    </div>,
  ]

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* stepper */}
      <div className="relative mb-8">
        <div className="absolute left-0 right-0 top-5 hidden h-0.5 bg-[#e7e0fa] md:block" />
        <div className="absolute left-0 top-5 hidden h-0.5 transition-all duration-700 md:block" style={{ width: `${(i / (doubts.length - 1)) * 100}%`, background: ACCENT }} />
        <div className="relative grid grid-cols-5 gap-2" role="tablist" aria-label="Moments of doubt">
          {doubts.map((x, k) => (
            <button key={x.stage} role="tab" aria-selected={i === k} onClick={() => setI(k)} className="group flex flex-col items-center text-center">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ring-4 ring-white transition ${k <= i ? 'text-white' : 'bg-[#efeaff] text-[#7b6cc0]'}`} style={k <= i ? { background: ACCENT } : undefined}>0{k + 1}</span>
              <span className={`mt-2 hidden text-xs font-semibold md:block ${i === k ? 'text-[#102a3d]' : 'text-[#8a82ad]'}`}>{x.stage}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col justify-between rounded-[28px] p-8 text-white" style={{ background: `linear-gradient(145deg, ${DEEP}, ${ACCENT})` }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-white/70">{d.stage}</p>
            <p key={`q-${i}`} className="cn-fade mt-4 text-3xl font-bold leading-tight md:text-4xl">{d.quote}</p>
            <p key={`a-${i}`} className="cn-fade mt-5 text-white/85">{d.answer}</p>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs font-semibold text-white/80"><span>Buyer confidence (illustrative)</span><span>{d.confidence}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${d.confidence}%`, background: MINT }} /></div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#e7e0fa] bg-white shadow-[0_24px_60px_rgba(42,27,107,.12)]">
          <div className="flex items-center gap-2 border-b border-[#efeaff] bg-[#faf8ff] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" /><span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
            <span className="ml-3 flex-1 rounded-full bg-white px-3 py-1 text-[11px] text-[#8a82ad]">yourfirm.in</span>
          </div>
          <div key={`p-${i}`} className="cn-fade flex min-h-[260px] items-center p-7">{page[i]}</div>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        <button onClick={() => setI((i + doubts.length - 1) % doubts.length)} className="rounded-full border border-[#d9cff7] px-5 py-2 text-sm font-semibold text-[#102a3d] transition hover:bg-[#f5f0ff]">Previous</button>
        <button onClick={() => setI((i + 1) % doubts.length)} className="rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: ACCENT }}>Next moment</button>
      </div>
    </div>
  )
}

/* ---------- Signature piece 2: engagement economics calculator ---------- */
function EconomicsCalc({ onAudit }: { onAudit: () => void }) {
  const [value, setValue] = useState(800000)
  const [invest, setInvest] = useState(150000)
  const multiple = value / invest
  const bar = Math.min(100, (invest / value) * 100)
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-8">
        <label className="block">
          <div className="flex items-baseline justify-between"><span className="font-semibold">Typical value of one engagement</span><span className="text-2xl font-bold" style={{ color: MINT }}>{inr(value)}</span></div>
          <input type="range" min={100000} max={5000000} step={50000} value={value} onChange={(e) => setValue(Number(e.target.value))} className="mt-3 w-full accent-[#55c9c0]" aria-label="Typical value of one engagement" />
          <div className="mt-1 flex justify-between text-xs text-white/50"><span>₹1 lakh</span><span>₹50 lakh</span></div>
        </label>
        <label className="block">
          <div className="flex items-baseline justify-between"><span className="font-semibold">Investment in your website</span><span className="text-2xl font-bold" style={{ color: MINT }}>{inr(invest)}</span></div>
          <input type="range" min={5000} max={1000000} step={5000} value={invest} onChange={(e) => setInvest(Number(e.target.value))} className="mt-3 w-full accent-[#55c9c0]" aria-label="Investment in your website" />
          <div className="mt-1 flex justify-between text-xs text-white/50"><span>₹5,000</span><span>₹10 lakh</span></div>
        </label>
      </div>
      <div className="rounded-[28px] border border-white/10 bg-white/[.06] p-8">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-white/60">One won engagement covers the website</p>
        <p className="mt-2 text-6xl font-bold tracking-tight md:text-7xl" style={{ color: MINT }}>{multiple >= 10 ? multiple.toFixed(0) : multiple.toFixed(1)}×</p>
        <div className="mt-6 space-y-2 text-xs">
          <div><div className="mb-1 flex justify-between text-white/70"><span>Website investment</span><span>{inr(invest)}</span></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#e36a27] transition-all duration-500" style={{ width: `${bar}%` }} /></div></div>
          <div><div className="mb-1 flex justify-between text-white/70"><span>One engagement</span><span>{inr(value)}</span></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full w-full rounded-full" style={{ background: MINT }} /></div></div>
        </div>
        <p className="mt-6 text-sm text-white/70">{multiple >= 1 ? 'A single engagement more than covers the cost, so the real question is how many qualified conversations your site starts.' : 'At these numbers, you’d need more than one engagement to cover the cost. Try a lighter starting point.'}</p>
        <button onClick={onAudit} className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-[#102a3d] transition hover:-translate-y-0.5" style={{ background: MINT }}>See what yours could do, free <ArrowUpRight size={16} /></button>
        <p className="mt-4 text-[11px] text-white/45">Simple arithmetic for illustration. It is not a forecast or a guarantee of results.</p>
      </div>
    </div>
  )
}

/* ---------- Before / after ---------- */
function SiteCompare() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative h-[420px] select-none overflow-hidden rounded-[28px] border border-[#e7e0fa] bg-white shadow-[0_24px_60px_rgba(42,27,107,.15)]">
      <div className="absolute inset-0 p-6" style={{ background: 'linear-gradient(180deg,#faf8ff,#fff)' }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>After · clear authority</p>
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Strategy advisory</p>
        <p className="mt-1 text-2xl font-bold leading-tight text-[#102a3d]">The growth partner for founder-led manufacturers.</p>
        <div className="mt-3 flex gap-2 text-[11px] font-semibold"><span className="rounded-full px-3 py-1.5 text-white" style={{ background: ACCENT }}>Book a call</span><span className="rounded-full border border-[#d9cff7] px-3 py-1.5 text-[#102a3d]">See case studies</span></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-[#5e6b76]">{['Case study', 'Framework', 'Partners'].map((t) => <div key={t} className="rounded-lg border border-[#e7e0fa] bg-white p-2.5 font-semibold">{t}</div>)}</div>
      </div>
      <div className="absolute inset-0 bg-[#ececec] p-6" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#e36a27]">Before · generic</p>
        <div className="flex gap-3 text-[9px] text-[#a9a9a9]">{['Home', 'About', 'Services', 'Solutions', 'Industries', 'Team', 'News', 'Careers', 'Contact'].map((t) => <span key={t}>{t}</span>)}</div>
        <p className="mt-4 text-base font-bold text-[#8c8c8c]">Welcome to our firm</p>
        <p className="mt-1 text-[10px] leading-tight text-[#b0b0b0]">We offer a wide range of consulting services to organisations of all sizes across many sectors, delivering excellence and value through innovative solutions.</p>
        <div className="mt-3 h-16 rounded bg-[#dcdcdc]" />
        <p className="mt-3 text-[10px] text-[#b0b0b0]">Contact us · No case studies · No clear next step</p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.1)]" style={{ left: `${pos}%` }} />
      <div className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg" style={{ left: `${pos}%` }}><span className="text-[#102a3d]">↔</span></div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Drag to compare a generic firm site and a clear authority site" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  )
}

const styles = `
@keyframes cn-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes cn-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes cn-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes cn-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes cn-meter { from { width: 0; } to { width: 92%; } }
.cn-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.cn-track { display: flex; width: max-content; animation: cn-scroll 40s linear infinite; }
.cn-marquee:hover .cn-track { animation-play-state: paused; }
.cn-set { display: flex; flex-shrink: 0; align-items: center; }
.cn-hero > * { opacity: 0; animation: cn-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.cn-hero > *:nth-child(1){animation-delay:.05s} .cn-hero > *:nth-child(2){animation-delay:.15s} .cn-hero > *:nth-child(3){animation-delay:.27s} .cn-hero > *:nth-child(4){animation-delay:.39s} .cn-hero > *:nth-child(5){animation-delay:.5s}
.cn-float { animation: cn-float 7s ease-in-out infinite; }
.cn-fade { animation: cn-fade .5s ease both; }
.cn-meter { animation: cn-meter 1.6s cubic-bezier(.2,.7,.2,1) .4s both; }
.cn-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.cn-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .cn-track, .cn-float, .cn-fade, .cn-meter { animation: none; }
  .cn-meter { width: 92%; }
  .cn-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .cn-dup { display: none; }
  .cn-hero > * { opacity: 1; animation: none; }
  .cn-reveal { opacity: 1; transform: none; transition: none; }
}
`

/* ---------- Page ---------- */
export default function ConsultingPage() {
  const { openEnquiry } = useEnquiry()
  const audit = () => openEnquiry('Consulting')

  return (
    <div className="page-wrapper">
      <SEO
        title="Consulting — Websites for Consulting & Advisory Firms | OnlineKarDo"
        description="Websites for consulting and advisory firms in India: clear positioning, case studies, thought leadership and a frictionless path to a discovery call. Build new or rebuild. Free audit."
        canonical="/industries/consulting"
      />
      <style>{styles}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f0ff] via-[#ece3ff] to-[#ded0ff] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="cn-hero">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold" style={{ color: ACCENT }}>
              <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} /> Industry · Consulting
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[.95] tracking-[-.05em] text-[#102a3d] md:text-7xl">
              Consulting websites engineered to win <span style={{ color: ACCENT }}>the long, high-stakes sale.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#4b5b68]">Your prospects are founders, CFOs and boards who research for weeks before they reach out. We turn your expertise into a credibility engine and a clear path to a conversation.</p>
            <p className="max-w-xl text-base leading-relaxed text-[#4b5b68]">For most buyers, your website is the first serious test of whether you’re worth a call, even when they arrive by referral. We make that test easy to pass, whether you’re rebuilding an outdated advisory site or launching a new firm.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={audit} className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>Get a free audit <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
              <a href="#doubt" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-7 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">See how buyers decide</a>
            </div>
            <div className="flex flex-wrap gap-2">{['Built for multi-stakeholder deals', 'Rebuild or build from zero', 'Calls booked via calendar and WhatsApp'].map((t) => <span key={t} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-sm">{t}</span>)}</div>
          </div>
          <div className="relative mx-auto hidden h-[460px] w-full max-w-[480px] lg:block">
            <div className="cn-float absolute left-0 top-0 h-[340px] w-72 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(109,79,214,.35)]"><Photo src={IMG.heroMain} alt="Business team meeting in a boardroom" className="h-full w-full" /></div>
            <div className="cn-float absolute bottom-0 right-0 h-60 w-60 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(109,79,214,.35)]" style={{ animationDelay: '-3s' }}><Photo src={IMG.heroSide} alt="Colleagues working together at a table" className="h-full w-full" /></div>
            <div className="absolute right-2 top-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><CalendarCheck size={16} style={{ color: ACCENT }} /> Discovery call booked</div>
            <div className="absolute bottom-24 left-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><TrendingUp size={16} style={{ color: ACCENT }} /> Qualified enquiry</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-b border-[#e7e0fa] bg-white py-7" aria-label="What a consulting website includes">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[.18em] text-[#7b6cc0]">What goes into the credibility engine</p>
        <Marquee duration={50}>{strip.map((n) => <span key={n} className="mx-3 whitespace-nowrap rounded-full border border-[#e7e0fa] bg-[#faf8ff] px-5 py-2.5 text-sm font-semibold text-[#102a3d]">{n}</span>)}</Marquee>
      </section>

      {/* Why different + doubt explorer */}
      <section id="doubt" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Why consulting is different</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-6xl">A consulting website isn’t a brochure. It’s where a skeptical buyer decides you’re the safe choice.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">Consulting sells the intangible. There’s no product to demo, only judgment, method and trust, and the site has to carry all three before anyone says hello. Five moments of doubt stand between a first visit and a booked call. Step through them.</p>
          </Reveal>
          <Reveal><DoubtExplorer /></Reveal>
        </div>
      </section>

      {/* Economics */}
      <section className="relative overflow-hidden py-20 text-white md:py-28" style={{ background: `linear-gradient(160deg, ${DEEP}, #1a1147)` }}>
        <div className="absolute -left-24 top-10 h-96 w-96 rounded-full blur-[120px]" style={{ background: `${ACCENT}55` }} />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}><Calculator size={16} /> The economics</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">The economics behind a long, high-stakes sale.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">Consulting engagements are large and slow to close, which is exactly why the site that earns them is worth getting right. Put in your own numbers.</p>
          </Reveal>
          <Reveal><EconomicsCalc onAudit={audit} /></Reveal>
        </div>
      </section>

      {/* Two doors */}
      <section className="bg-[#faf8ff] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Two front doors</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">One accountable partner, whether you’re rebuilding or starting fresh.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">We’re experts in redesign and redevelopment, and we build new practices from the ground up. Both belong here.</p>
          </Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal><SiteCompare /><p className="mt-3 text-center text-xs text-[#7b6cc0]">Illustrative before and after. Drag to compare.</p></Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Rebuild what you have</p>
              <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Modernise an advisory site that no longer matches your work</h3>
              <p className="mt-3 text-[#5e6b76]">An outdated, slow or unclear site quietly costs you mandates. We audit what you have, fix the positioning and conversion gaps, and modernise speed, search and accessibility without losing the equity you’ve built.</p>
              <ul className="mt-5 space-y-2.5">{['Replatform or migrate (WordPress, Webflow and more)', 'Reposition and rebrand without losing search visibility', 'Speed, mobile experience and accessibility fixed'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ACCENT }} /> {s}</li>)}</ul>
              <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d] px-6 py-3 font-bold text-[#102a3d] transition hover:bg-[#102a3d] hover:text-white">Audit my current site <ArrowRight size={16} /></button>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <article className="grid overflow-hidden rounded-[32px] border border-[#e7e0fa] bg-white md:grid-cols-2">
              <Photo src={IMG.door} alt="Team listening during a planning meeting" className="h-64 w-full md:h-full" />
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>Build from zero</p>
                <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Launch a new practice that reads as authoritative on day one</h3>
                <p className="mt-3 text-[#5e6b76]">Launching a firm, spinning out or going independent? We define your positioning, design a brand and site that reads as established immediately, and set up the full credibility engine.</p>
                <ul className="mt-5 space-y-2.5">{['Positioning and messaging defined from scratch', 'Brand identity plus an authoritative site', 'Insights, partner bios and book-a-call from day one'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ACCENT }} /> {s}</li>)}</ul>
                <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>Plan a new build <ArrowRight size={16} /></button>
                <p className="mt-4 text-xs text-[#7b6cc0]">Going solo? The <Link to="/packs" className="font-bold underline">Business Digital Pack</Link> starts at ₹4,999.</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Band */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.band} alt="Team in a modern office meeting room" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(90deg, ${DEEP}ee, ${DEEP}b3 55%, ${DEEP}66)` }} />
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>Proof beats promises</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">When the site does the early selling, the right conversations start themselves.</h2>
            <p className="mt-5 text-lg text-white/80">Senior buyers decide quietly, long before they fill in a form. A site that removes doubt at every scroll turns that quiet research into calls with the clients you actually want.</p>
          </Reveal>
        </div>
      </section>

      {/* Credibility engine */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal className="mb-14 max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>The credibility engine</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">What goes into a consulting website that actually converts.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Every consulting site is built as a system that moves a senior buyer from quiet research to a booked conversation. Each element earns its place by removing doubt and adding proof.</p>
          </Reveal>
          <div className="divide-y divide-[#efeaff]">
            {engine.map((e, k) => (
              <Reveal key={e.title} delay={k * 50}>
                <div className="grid gap-5 py-8 md:grid-cols-[110px_1fr] md:gap-8">
                  <p className="text-6xl font-bold leading-none md:text-7xl" style={{ color: `${ACCENT}33` }}>0{k + 1}</p>
                  <div>
                    <div className="flex items-start gap-3"><span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${ACCENT}1a` }}><e.icon size={20} style={{ color: ACCENT }} /></span><h3 className="text-2xl font-bold leading-snug text-[#102a3d]">{e.title}</h3></div>
                    <p className="mt-3 max-w-2xl leading-relaxed text-[#5e6b76]">{e.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI front desk */}
      <section className="bg-[#faf8ff] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_.9fr]">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>The differentiator</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-5xl">Add a front desk that qualifies the right buyers and books your calendar.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Consulting cycles are long and the best leads often arrive when no one is at the desk. An intelligent assistant can do far more than a static form:</p>
            <ul className="mt-5 space-y-3">{['Engages visitors in real time', 'Asks the discovery questions a senior associate would', 'Scores fit against your ideal-client profile', 'Books qualified prospects into a partner’s calendar', 'Syncs everything to your CRM or a simple sheet'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ACCENT }} /> {s}</li>)}</ul>
            <p className="mt-5 text-sm text-[#5e6b76]">The result is fewer wasted discovery calls and faster responses to high-intent visitors. Scope and tools are agreed after the audit.</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mx-auto max-w-sm rounded-[32px] border border-[#e7e0fa] bg-white p-4 shadow-[0_30px_70px_rgba(42,27,107,.16)]">
              <div className="flex items-center gap-3 rounded-2xl p-3 text-white" style={{ background: ACCENT }}><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"><Briefcase size={18} /></span><div><p className="text-sm font-bold">Your Firm · Front desk</p><p className="text-[11px] text-white/75">replies in seconds</p></div></div>
              <div className="space-y-2.5 p-3 text-sm">
                <p className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#f0eafd] px-3 py-2 text-[#2a1b6b]">We’re a mid-sized manufacturer looking at a working-capital review.</p>
                <p className="max-w-[88%] rounded-xl rounded-tl-sm bg-[#f4f6f8] px-3 py-2 text-[#1f2c34]">Glad you’re here. What’s your approximate turnover, and who’s involved in the decision?</p>
                <div className="rounded-xl border border-[#e7e0fa] p-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#102a3d]"><span>Ideal-client fit</span><span style={{ color: ACCENT }}>92%</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#efeaff]"><div className="cn-meter h-full rounded-full" style={{ background: ACCENT }} /></div>
                </div>
                <p className="flex items-center gap-2 rounded-xl bg-[#e7f7f5] px-3 py-2 text-xs font-bold text-[#075c68]"><CalendarCheck size={15} /> Discovery call booked · routed to a partner</p>
              </div>
              <p className="pb-1 text-center text-[11px] text-[#7b6cc0]">Illustrative front-desk flow. The fit score is an example.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who we build for */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Who we build for</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">One credibility engine, tuned to your kind of consulting.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">The same system, shaped to how each kind of buyer decides.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {segments.map((s, k) => (
              <Reveal key={s.name} delay={k * 55} className="h-full">
                <article className="group h-full overflow-hidden rounded-[24px] border border-[#e7e0fa] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(109,79,214,.18)]">
                  <div className="h-40 overflow-hidden"><Photo src={s.image} alt={s.name} className="h-full w-full transition-transform duration-700 group-hover:scale-110" /></div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold leading-snug text-[#102a3d]">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{s.text}</p>
                    <button onClick={audit} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: ACCENT }}>Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={7 * 55} className="h-full">
              <article className="flex h-full flex-col justify-between rounded-[24px] p-6 text-white" style={{ background: `linear-gradient(145deg, ${DEEP}, ${ACCENT})` }}>
                <div><p className="text-xs font-bold uppercase tracking-wider text-white/70">Also explore</p>
                  <ul className="mt-3 space-y-4">{alsoExplore.map((a) => <li key={a.title}><p className="font-bold">{a.title}</p><p className="mt-1 text-sm text-white/75">{a.text}</p></li>)}</ul></div>
                <button onClick={audit} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: MINT }}>Talk to us <ArrowRight size={14} /></button>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#faf8ff] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>How it works</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">How we build your consulting website.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Four steps, one accountable team. Every engagement starts with the same no-obligation audit.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, k) => (
              <Reveal key={s.n} delay={k * 90} className="h-full">
                <article className="relative h-full overflow-hidden rounded-[24px] border border-[#e7e0fa] bg-white p-7">
                  <span className="absolute -right-2 -top-4 text-8xl font-bold" style={{ color: `${ACCENT}14` }}>{s.n}</span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white" style={{ background: ACCENT }}>{k + 1}</span>
                  <h3 className="relative mt-5 text-xl font-bold text-[#102a3d]">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-[#5e6b76]">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <p className="text-[#5e6b76]">It all starts with findings you keep, whether or not we build together.</p>
            <button onClick={audit} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ACCENT }}>Start with a free audit <ArrowUpRight size={17} /></button>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>The OnlineKarDo model</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">One accountable partner. Specialists for each part of the job.</h2>
            <ul className="mt-7 space-y-4">{['One point of accountability, from audit to launch and beyond.', 'Specialists for web, commerce and local setup, coordinated by one lead.', 'Fixed scope and upfront pricing, so there are no surprises.', 'Positioning, brand, site and automation pulling in one direction.'].map((r) => <li key={r} className="flex items-start gap-3 text-lg text-[#33424e]"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `${ACCENT}22` }}><Check size={14} style={{ color: ACCENT }} /></span>{r}</li>)}</ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[32px] border border-[#e7e0fa] bg-[#faf8ff] p-6 md:p-8">
              <div className="rounded-2xl p-5 text-center text-white" style={{ background: ACCENT }}><p className="text-sm font-bold uppercase tracking-wider text-white/80">One accountable lead</p><p className="text-xs text-white/70">one contract · one timeline</p></div>
              <div className="my-3 flex justify-center"><ArrowRight size={18} className="rotate-90" style={{ color: ACCENT }} /></div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[{ i: Globe, t: 'Web specialist', s: 'Design · build · maintain' }, { i: Search, t: 'Commerce & automation', s: 'Booking · WhatsApp · CRM' }, { i: Target, t: 'Local specialist', s: 'Google profile · social' }].map((x) => (
                  <div key={x.t} className="rounded-2xl bg-white p-4 text-center shadow-sm"><span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${ACCENT}1a` }}><x.i size={20} style={{ color: ACCENT }} /></span><p className="mt-2 text-sm font-bold text-[#102a3d]">{x.t}</p><p className="text-[11px] text-[#5e6b76]">{x.s}</p></div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf8ff] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ACCENT }}>Questions</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Consulting website questions, answered.</h2>
            <p className="mt-3 text-[#5e6b76]">The things advisory leaders ask us most.</p>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(([q, a], k) => (
              <details key={q} open={k === 0} className="group rounded-2xl border border-[#e7e0fa] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#102a3d]"><span>{q}</span><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f0eafd] transition-transform group-open:rotate-180" style={{ color: ACCENT }}><ChevronDown size={18} /></span></summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#5e6b76]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.cta} alt="Consulting team in a bright meeting room" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10" style={{ background: `linear-gradient(135deg, ${DEEP}f2, ${DEEP}d9 55%, ${ACCENT}bf)` }} />
        <div className="mx-auto max-w-3xl px-5 text-center">
          <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>Start here</span>
          <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">See exactly what your consulting website is costing you, free.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">Send us your current site, or your plans for a new one, and we’ll return a focused, no-obligation audit: where you’re losing credibility, where you’re leaking enquiries and the highest-impact fixes.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button onClick={audit} className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#102a3d] transition hover:-translate-y-0.5">Start my free audit <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
            <Link to="/packs" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">See setup packs</Link>
          </div>
          <p className="mt-8 text-sm text-white/65">No obligation · prioritised fixes · build new or rebuild</p>
          <p className="mt-6 text-[11px] text-white/45">Photos via Burst by Shopify. Figures and flows shown are illustrative, not guarantees of results.</p>
        </div>
      </section>
    </div>
  )
}
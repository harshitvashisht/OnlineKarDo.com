import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Accessibility, ArrowRight, ArrowUpRight, Ban, Bot, Building2, CalendarCheck, Check, ChevronDown, Clock, Code, Copy, Database, Gauge, Globe, Home, Image as ImageIcon, Layers, MapPin, MousePointerClick, Palette, Search, Smartphone, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

/* ---------- Photos (free to use, Burst by Shopify). Swap for your own paths any time. ---------- */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1600&format=pjpg&exif=0&iptc=0`
const IMG = {
  heroMain: burst('modern-house'),
  heroSide: burst('suburban-house'),
  band: burst('gated-house-exterior'),
  buildNew: burst('two-storey-home'),
  ai: burst('san-francisco-home'),
  team: burst('a-beige-house-with-a-grey-roof-and-large-trees'),
  cta: burst('bungalow-house-exterior'),
  agents: burst('one-storey-home-exterior'),
  teams: burst('brick-country-home'),
  brokerages: burst('gated-house-exterior'),
  pm: burst('house-with-garage'),
  cre: burst('san-francisco-home'),
  dev: burst('modern-house'),
  proptech: burst('real-estate-in-letters'),
}

const SAGE = '#779166'
const GREEN = '#4f6f47'
const LIGHT = '#ecf4e8'
const MINT = '#b9d4a8'

/* ---------- Data ---------- */
const steps = [
  { title: 'The search starts online', text: 'On Google, a portal or an AI assistant, and almost always on a phone.' },
  { title: 'Weeks of comparing', text: 'Buyers browse listings, neighborhoods and agents for weeks before a single call.' },
  { title: 'They judge your site', text: 'Speed, listings and trust signals decide in seconds if you are a serious option.' },
  { title: 'You win, or a portal does', text: 'Earn trust and they inquire. Miss on speed, search or capture and the lead goes elsewhere.' },
]

const leaks = [
  { icon: Gauge, title: 'Slow, heavy pages', tag: 'Buyers bounce', text: 'Pages that fail Core Web Vitals lose buyers to a portal before listings even load.', fix: 'Lean, mobile-first pages with optimised images, so listings show up fast enough to keep people reading.' },
  { icon: Copy, title: 'A raw, unedited IDX feed', tag: 'Duplicate content', text: 'The same MLS text sits on thousands of sites, so Google filters your listing pages out as duplicates.', fix: 'RESO Web API done right, plus unique neighborhood context, so your pages earn their own rankings.' },
  { icon: MousePointerClick, title: 'Buried CTAs, long forms', tag: 'Interest lost', text: 'When contact options are hidden and forms ask for everything, interest never becomes an inquiry.', fix: 'Short forms, saved searches and valuation pages placed exactly where intent peaks.' },
  { icon: Clock, title: 'Leads answered too late', tag: 'Lead goes cold', text: 'Without CRM sync or automation, inquiries wait while a faster agent calls them first.', fix: 'Every inquiry synced to your CRM, routed, tagged and answered in seconds, not hours.' },
]

const tracks = [
  { icon: Search, name: 'Search & listings', intro: 'Buyers search accurate, always-current listings on your own site, and find you for the local searches that convert.', items: [
    { t: 'Live IDX/MLS integration', d: 'RESO Web API, RETS or FTP: real-time listings, status sync and office/agent attribution.' },
    { t: 'Advanced property search', d: 'Map and list, polygon draw, saved searches, alerts and shareable, SEO-friendly URLs.' },
    { t: 'Listing detail that converts', d: 'Gallery, virtual tour, floor plans, neighborhood data, schools, walk score and lead forms.' },
  ] },
  { icon: Smartphone, name: 'Capture & convert', intro: 'Every visit has a clear next step, and every inquiry lands with the right person quickly.', items: [
    { t: 'Lead capture & routing', d: 'Smart forms, chat, click-to-call and WhatsApp, with round-robin or territory assignment.' },
    { t: 'CRM integration & speed-to-lead', d: 'Follow Up Boss, kvCORE/BoldTrail, Sierra, Real Geeks, BoomTown, Lofty and more.' },
    { t: 'Market reports & valuation', d: 'Automated CMA, neighborhood trends and price history as a lead magnet with capture.' },
  ] },
  { icon: Gauge, name: 'Speed & design', intro: 'A site that loads fast and looks like your business, not a template clone.', items: [
    { t: 'Mobile-first, Core Web Vitals', d: 'Built for the phone, where the search actually happens.' },
    { t: 'Brand-led design', d: 'Luxury, residential, commercial or institutional, designed to build trust on first impression.' },
    { t: 'Agent & office profiles', d: 'Bio, photo, listings, reviews, social and contact, with schema for agent search.' },
  ] },
  { icon: Bot, name: 'Trust & AI', intro: 'Local authority and instant answers, so buyers and AI assistants both see you as the local expert.', items: [
    { t: 'AI lead assistant ready', d: 'Designed to plug in a chat or voice assistant that answers and qualifies leads 24/7.' },
    { t: 'Local SEO & area pages', d: 'City, neighborhood and subdivision pages with schema, internal linking and GBP sync.' },
    { t: 'Multi-language & international', d: 'EN/ES/PT/CH with hreflang, currency, measurement units and an IDX feed per market.' },
  ] },
]

const audiences = [
  { icon: Users, name: 'Agents & realtors', text: 'A personal-brand site that captures leads you own, with neighborhood SEO and saved searches.', image: IMG.agents },
  { icon: Users, name: 'Teams', text: 'Shared lead routing, individual agent profiles and unified team branding.', image: IMG.teams },
  { icon: Building2, name: 'Brokerages', text: 'Multi-office platforms, agent directories and lead distribution that keeps leads in your system.', image: IMG.brokerages },
  { icon: Home, name: 'Property management', text: 'Listings, online applications, owner and tenant portals and secure payment flows.', image: IMG.pm },
  { icon: Layers, name: 'Commercial real estate', text: 'Property and portfolio listings, broker profiles, data rooms and investor-focused capture.', image: IMG.cre },
  { icon: MapPin, name: 'Developers & new projects', text: 'Interactive site maps, live unit availability, tours and high-intent waitlists.', image: IMG.dev },
  { icon: Code, name: 'PropTech', text: 'Product, marketing and web-app builds for real estate technology companies.', image: IMG.proptech },
]

const specialists = [
  { icon: Palette, t: 'Design & UX', d: 'Brand-led layouts for listings, search and CTAs.' },
  { icon: Code, t: 'Development', d: 'Fast builds on the platform that suits you.' },
  { icon: Database, t: 'IDX/MLS & CRM', d: 'Feed ingestion, compliance and lead routing.' },
  { icon: Accessibility, t: 'Performance, A11y & AI', d: 'Core Web Vitals, WCAG and the AI layer.' },
]

const a11y = ['Semantic HTML a screen reader can navigate', 'Descriptive alt text on every listing image', 'Keyboard-operable property search and inquiry forms', 'Captioned video and virtual tours', 'Sufficient color contrast across the site']

const processSteps = [
  { title: 'Audit & discovery', text: 'We review your current site: speed, IDX, SEO, accessibility and lead flow. For a new build, we start with your market and goals, and confirm your MLS’s IDX rules.' },
  { title: 'Strategy & scope', text: 'Sitemap, neighborhood and SEO architecture, lead-capture and CRM plan, integrations and a clear timeline.' },
  { title: 'Design', text: 'Brand-led, conversion-focused design for desktop and mobile: listings, search, neighborhood pages, agent profiles and CTAs.' },
  { title: 'Build & integrate', text: 'Development, RESO Web API and IDX integration, CRM sync, accessibility, schema and performance tuning.' },
  { title: 'Migrate & launch', text: 'For redesigns: content migrated, URLs and rankings preserved, clean redirects, QA on every device.' },
  { title: 'Support & grow', text: 'Maintenance, monitoring and ongoing improvements, so the site keeps performing after launch.' },
]

const platforms = ['WordPress + IDX plugins (dsIDXpress, iHomefinder)', 'Custom React/Next.js + RESO Web API', 'Webflow + custom IDX integration', 'Sierra Interactive, kvCORE (configuration)']
const compliance = ['RESO Web API standards', 'Fair Housing Act', 'MLS rules & display compliance', 'GDPR/CCPA', 'State license law']
const integrations = ['CRM: Follow Up Boss, LionDesk, kvCORE', 'Marketing: BombBomb, Mailchimp', 'Analytics: GA4, Meta CAPI', 'ShowingTime, Dotloop', 'Google Business Profile']
const tools = ['IDX', 'RESO Web API', 'Follow Up Boss', 'kvCORE / BoldTrail', 'Sierra Interactive', 'Real Geeks', 'BoomTown', 'Lofty', 'ShowingTime', 'Dotloop', 'GA4', 'Google Business Profile', 'WhatsApp']

const faqs: [string, string][] = [
  ['Do I need IDX on my real estate website?', 'If you want buyers to search live MLS listings on your own site instead of leaving for a portal, yes. IDX connects your site to MLS data so listings display and update automatically. Most MLSs now deliver it through the RESO Web API. We confirm your MLS’s rules and integrate it so it helps your SEO instead of causing duplicate-content problems.'],
  ['What is the difference between MLS, IDX and the RESO Web API?', 'The MLS is the closed professional database where listings live. IDX is the set of rules and technology for showing those listings on a public site. The RESO Web API is the modern standard feed most MLSs use to deliver the data, replacing the older RETS system.'],
  ['My site gets traffic but no inquiries. Why?', 'Usually it is a brochure built to exist, not to convert: slow pages, a weak mobile experience, buried calls to action, long forms, a raw IDX feed Google treats as duplicate content, and no CRM or automation to answer fast. A free audit shows which of these is costing you leads.'],
  ['Can I redesign without losing Google rankings and leads?', 'Yes, this is a core specialty. We preserve and redirect URLs, migrate content and listings, and keep your rankings and lead history intact while modernising design, speed, IDX and accessibility.'],
  ['Does my site need to be accessible?', 'Public-facing sites are generally treated as places of public accommodation under ADA Title III, and the Fair Housing Act requires equal access to housing information. We build to WCAG 2.1–2.2 AA in the code, not with an overlay widget. This is general information, not legal advice.'],
  ['Will it connect to my CRM?', 'Yes. We integrate with Follow Up Boss, kvCORE/BoldTrail, Sierra Interactive, Real Geeks, BoomTown, Lofty and others, so inquiries are routed, tagged and answered quickly.'],
  ['Do I own the website?', 'Yes. Your design, content and SEO equity are your asset, with no per-seat platform tax and no generic look shared with every other agent.'],
  ['How much does it cost?', 'It depends on scope: an agent site or a brokerage platform, integrations and design depth. We scope yours precisely in the free audit, so you see real numbers rather than a guess.'],
]

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
  return <div ref={ref} className={`re-reveal ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={className} style={{ background: `linear-gradient(135deg, ${SAGE}44, ${SAGE}99)` }} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="re-marquee">
      <div className="re-track">
        <div className="re-set">{children}</div>
        <div className="re-set re-dup" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: light ? MINT : GREEN }}>{children}</span>
}

function Check1({ children }: { children: ReactNode }) {
  return <li className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: GREEN }} /> {children}</li>
}

function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.3)
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
    let raf = 0
    let start: number | null = null
    const tick = (t: number) => {
      if (start === null) start = t
      const p = Math.min((t - start) / duration, 1)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to, duration])
  return <span ref={ref}>{v}</span>
}

// Interactive phone: pick a leak on a listing page, flip to see the fix.
function LeakExplorer({ onAudit }: { onAudit: () => void }) {
  const [active, setActive] = useState(0)
  const [fixed, setFixed] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setActive((a) => (a + 1) % leaks.length), 6000)
    return () => window.clearInterval(t)
  }, [paused])

  const ring = fixed ? 'ring-[#2f8f4e] shadow-[0_8px_24px_rgba(47,143,78,.25)]' : 'ring-[#e36a27] shadow-[0_8px_24px_rgba(227,106,39,.25)]'
  const zone = (i: number) => `relative rounded-2xl bg-white p-3 transition duration-500 ${active === i ? `opacity-100 ring-2 ${ring}` : 'opacity-40'}`
  const tag = (i: number) => `absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white transition ${active === i ? 'opacity-100' : 'opacity-0'} ${fixed ? 'bg-[#2f8f4e]' : 'bg-[#e36a27]'}`

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_340px_1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="order-2 space-y-3 lg:order-1" role="tablist" aria-label="Where brochure sites lose leads">
        {leaks.map((l, i) => (
          <button key={l.title} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition duration-300 ${active === i ? 'border-[#779166] bg-white shadow-[0_14px_36px_rgba(119,145,102,.25)]' : 'border-[#d9e8d0] bg-white/60 hover:bg-white'}`}>
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${active === i ? 'text-white' : 'bg-[#ecf4e8] text-[#4f6f47]'}`} style={active === i ? { background: GREEN } : undefined}><l.icon size={20} /></span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#102a3d]">{l.title}</p>
                <p className="text-xs font-semibold" style={{ color: GREEN }}>{l.tag}</p>
              </div>
              <span className="text-xs font-bold text-[#9fb592]">0{i + 1}</span>
            </div>
            {active === i && (
              <>
                <p className="mt-3 text-sm leading-relaxed text-[#5e6b76]">{fixed ? l.fix : l.text}</p>
                {!paused && <span key={`bar-${i}`} className="re-fill absolute bottom-0 left-0 h-0.5 w-full" style={{ background: SAGE }} />}
              </>
            )}
          </button>
        ))}
      </div>

      <div className="order-1 mx-auto w-[300px] lg:order-2">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 text-sm font-bold shadow-sm ring-1 ring-[#d9e8d0]" role="group" aria-label="Show problem or fix">
            <button onClick={() => setFixed(false)} aria-pressed={!fixed} className={`rounded-full px-4 py-1.5 transition ${!fixed ? 'bg-[#e36a27] text-white' : 'text-[#5e6b76]'}`}>The brochure</button>
            <button onClick={() => setFixed(true)} aria-pressed={fixed} className={`rounded-full px-4 py-1.5 transition ${fixed ? 'bg-[#2f8f4e] text-white' : 'text-[#5e6b76]'}`}>The lead engine</button>
          </div>
        </div>
        <div className="rounded-[40px] border-[10px] border-[#102a3d] bg-[#f1f6ee] p-3 shadow-[0_40px_80px_rgba(16,42,61,.3)]">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-[#102a3d]/20" />
          <div className="space-y-3">
            <div className={zone(0)}>
              <span className={tag(0)}>{fixed ? 'Loads fast' : 'Still loading…'}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#e2ebdd]"><div className={`h-full rounded-full ${fixed ? 'w-full bg-[#2f8f4e]' : 'w-1/4 bg-[#e36a27]'}`} /></div>
              {fixed ? <p className="mt-2 text-sm font-bold text-[#102a3d]">3 bed · 2 bath · Sunny corner lot</p> : <p className="mt-2 text-xs text-[#a4acb0]">Loading listings… 6.2s</p>}
            </div>
            <div className={zone(1)}>
              <span className={tag(1)}>{fixed ? 'Unique content' : 'Duplicate text'}</span>
              {fixed ? <p className="text-[11px] text-[#102a3d]"><b>Neighborhood notes:</b> 8 min walk to the primary school, Sunday farmers market two blocks away.</p> : <p className="text-[10px] leading-tight text-[#b4bbbf]">Beautiful home in a sought-after location. Must see. Beautiful home in a sought-after location. Must see.</p>}
            </div>
            <div className={zone(2)}>
              <span className={tag(2)}>{fixed ? 'Two fields' : 'Too many fields'}</span>
              <div className="space-y-1.5">
                {(fixed ? ['Name', 'Phone or email'] : ['Name', 'Email', 'Phone', 'Budget', 'Timeline', 'Agent?']).map((f) => <div key={f} className="rounded-lg border border-[#d6dee2] bg-white px-2.5 py-1.5 text-[11px] text-[#8a97a1]">{f}</div>)}
                {fixed && <div className="rounded-lg bg-[#4f6f47] py-2 text-center text-[11px] font-bold text-white">Book a showing</div>}
              </div>
            </div>
            <div className={zone(3)}>
              <span className={tag(3)}>{fixed ? 'Answered fast' : 'Lead waiting'}</span>
              {fixed ? <p className="text-[11px] text-[#102a3d]"><b>Replied in seconds.</b> Showing offered, CRM updated.</p> : <p className="text-[11px] text-[#a4acb0]">New inquiry · no reply for 15 hours</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="order-3 space-y-5">
        <div className="rounded-[24px] border border-[#d9e8d0] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GREEN }}>Why it matters</p>
          <p className="mt-2 text-lg font-bold leading-snug text-[#102a3d]">A brochure site looks professional and produces nothing. Each leak is predictable, and we design it out.</p>
          <p className="mt-3 text-sm leading-relaxed text-[#5e6b76]">Tap through the four leaks, then flip to “The lead engine”.</p>
        </div>
        <button onClick={onAudit} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition hover:-translate-y-0.5" style={{ background: GREEN }}>See how your site performs <ArrowUpRight size={16} /></button>
        <p className="text-xs text-[#6b7782]">Illustrative page. The audit measures your real site.</p>
      </div>
    </div>
  )
}

function SiteCompare() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative h-[440px] select-none overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_70px_rgba(0,0,0,.35)]">
      <div className="absolute inset-0 bg-[#f7faf5] p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: GREEN }}>Listing site · after</p>
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm text-[#5e6b76] shadow-sm"><Search size={15} style={{ color: GREEN }} /> Search neighborhoods, schools, price…</div>
        <Photo src={IMG.heroMain} alt="Modern house listing" className="mt-3 h-40 w-full rounded-2xl" />
        <div className="mt-3 flex items-center justify-between"><p className="font-bold text-[#102a3d]">3 bed · 2 bath</p><span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: GREEN }}>Book a showing</span></div>
        <p className="mt-2 flex items-center gap-2 text-sm text-[#33424e]"><Check size={15} style={{ color: GREEN }} /> Saved searches · Instant alerts · Loads in under 2s</p>
      </div>
      <div className="absolute inset-0 bg-[#e9e9e9] p-5" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#e36a27]">Listing site · before</p>
        <p className="text-sm font-bold text-[#8a8a8a]">JOHN SMITH REALTY</p>
        <p className="mt-2 text-[10px] leading-tight text-[#b5b5b5]">Welcome to my website. Search homes via the iframe below. Contact me for a free home valuation.</p>
        <div className="mt-3 h-24 rounded border border-dashed border-[#c8c8c8] bg-[#f1f1f1] p-2 text-[10px] text-[#b0b0b0]">[ third-party IDX iframe ]</div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">{['Name', 'Email', 'Phone', 'Budget', 'Timeline', 'Message'].map((f) => <div key={f} className="rounded border border-[#d0d0d0] bg-[#f3f3f3] px-2 py-1.5 text-[10px] text-[#b0b0b0]">{f}</div>)}</div>
        <p className="mt-3 text-[10px] text-[#b5b5b5]">Slow · iframe content not indexed · no CRM sync</p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.1)]" style={{ left: `${pos}%` }} />
      <div className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg" style={{ left: `${pos}%` }}><span className="text-[#102a3d]">↔</span></div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Drag to compare an old real estate site and a rebuilt one" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  )
}

function TrackTabs() {
  const [active, setActive] = useState(0)
  const t = tracks[active]
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="flex gap-2 overflow-x-auto lg:flex-col" role="tablist" aria-label="What is included">
        {tracks.map((x, i) => (
          <button key={x.name} role="tab" aria-selected={active === i} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className={`flex shrink-0 items-center gap-3 rounded-2xl border px-5 py-4 text-left font-bold transition-all duration-300 ${active === i ? 'border-[#779166] bg-white text-[#102a3d] shadow-lg lg:translate-x-2' : 'border-[#d9e8d0] bg-[#f4f8f1] text-[#5e6b76]'}`}>
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${active === i ? 'text-white' : 'bg-white text-[#4f6f47]'}`} style={active === i ? { background: GREEN } : undefined}><x.icon size={20} /></span>
            {x.name}
          </button>
        ))}
      </div>
      <div key={active} className="re-pane rounded-[28px] border border-[#d9e8d0] bg-white p-7 md:p-9">
        <p className="text-lg text-[#33424e]">{t.intro}</p>
        <ul className="mt-6 space-y-5">
          {t.items.map((it) => (
            <li key={it.t} className="flex gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: LIGHT }}><Check size={15} style={{ color: GREEN }} /></span>
              <div><p className="font-bold text-[#102a3d]">{it.t}</p><p className="text-sm leading-relaxed text-[#5e6b76]">{it.d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function IdxFlow() {
  const nodes = [['MLS', 'Closed, members-only listing database'], ['RESO Web API', 'Standardised, JSON-based feed'], ['Your website', 'Property search that you own']]
  return (
    <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
      {nodes.map(([a, b], i) => (
        <div key={a} className="flex flex-1 flex-col items-center gap-3 md:flex-row">
          <div className="w-full rounded-2xl border border-[#d9e8d0] bg-white p-5 text-center shadow-sm">
            <p className="text-lg font-bold text-[#102a3d]">{a}</p>
            <p className="mt-1 text-xs text-[#5e6b76]">{b}</p>
          </div>
          {i < nodes.length - 1 && <ArrowRight size={22} className="shrink-0 rotate-90 md:rotate-0" style={{ color: SAGE }} />}
        </div>
      ))}
    </div>
  )
}

function LeadCalculator() {
  const [leads, setLeads] = useState(100)
  const [rate, setRate] = useState(1.5)
  const [lift, setLift] = useState(25)
  const [value, setValue] = useState(8000)
  const extra = leads * 12 * (rate / 100) * (lift / 100)
  const Row = ({ label, v, min, max, step, set, show }: { label: string; v: number; min: number; max: number; step: number; set: (n: number) => void; show: string }) => (
    <label className="block"><div className="mb-2 flex justify-between text-sm text-[#102a3d]"><span>{label}</span><strong>{show}</strong></div><input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(Number(e.target.value))} className="w-full" style={{ accentColor: SAGE }} /></label>
  )
  return (
    <div className="mt-6 grid gap-6 rounded-[24px] border border-[#d9e8d0] bg-white p-6">
      <Row label="Web leads per month" v={leads} min={20} max={500} step={10} set={setLeads} show={String(leads)} />
      <Row label="Leads that become clients today" v={rate} min={0.5} max={5} step={0.1} set={setRate} show={`${rate.toFixed(1)}%`} />
      <Row label="Conversion lift you target" v={lift} min={5} max={100} step={5} set={setLift} show={`+${lift}%`} />
      <Row label="Average commission per deal" v={value} min={2000} max={30000} step={500} set={setValue} show={`$${value.toLocaleString('en-US')}`} />
      <div className="grid grid-cols-2 gap-3 rounded-2xl p-4 text-center" style={{ background: LIGHT }}>
        <div><p className="text-xs text-[#5e6b76]">Extra clients per year</p><p className="text-2xl font-bold" style={{ color: GREEN }}>{extra.toFixed(1)}</p></div>
        <div><p className="text-xs text-[#5e6b76]">Extra commission per year</p><p className="text-2xl font-bold text-[#102a3d]">${Math.round(extra * value).toLocaleString('en-US')}</p></div>
      </div>
      <p className="text-xs text-[#6b7782]">Illustrative model on the numbers you set, not a promise of results. The audit uses your real data.</p>
    </div>
  )
}

const styles = `
@keyframes re-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes re-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes re-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes re-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes re-kb { from { transform: scale(1); } to { transform: scale(1.09); } }
@keyframes re-pulse { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.9); opacity: 0; } }
.re-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.re-track { display: flex; width: max-content; animation: re-scroll 45s linear infinite; }
.re-marquee:hover .re-track { animation-play-state: paused; }
.re-set { display: flex; flex-shrink: 0; align-items: center; }
.re-hero > * { opacity: 0; animation: re-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.re-hero > *:nth-child(1){animation-delay:.05s} .re-hero > *:nth-child(2){animation-delay:.15s} .re-hero > *:nth-child(3){animation-delay:.27s} .re-hero > *:nth-child(4){animation-delay:.39s} .re-hero > *:nth-child(5){animation-delay:.5s}
.re-fill { transform-origin: left; animation: re-fill 6s linear forwards; }
.re-float { animation: re-float 7s ease-in-out infinite; }
.re-kenburns { animation: re-kb 26s ease-in-out infinite alternate; }
.re-pane { animation: re-rise .45s ease; }
.re-pulse::after { content: ''; position: absolute; inset: 0; border-radius: 9999px; background: currentColor; animation: re-pulse 2.4s ease-out infinite; }
.re-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.re-reveal.is-in { opacity: 1; transform: none; }
.re-bar { transform-origin: left; transform: scaleX(0); transition: transform 1.4s cubic-bezier(.2,.7,.2,1) .2s; }
.is-in .re-bar { transform: scaleX(var(--w, 1)); }
@media (prefers-reduced-motion: reduce) {
  .re-track, .re-float, .re-pulse::after, .re-fill, .re-kenburns, .re-pane { animation: none; }
  .re-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .re-dup { display: none; }
  .re-hero > * { opacity: 1; animation: none; }
  .re-reveal { opacity: 1; transform: none; transition: none; }
  .re-bar { transform: scaleX(var(--w, 1)); transition: none; }
}
`

/* ---------- Page ---------- */
export default function RealEstatePage() {
  const { openEnquiry } = useEnquiry()
  const audit = () => openEnquiry('Real Estate')
  const btn = 'inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5'
  const h2 = 'mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-5xl'
  const card = 'group h-full overflow-hidden rounded-[24px] border border-[#d9e8d0] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(119,145,102,.25)]'

  return (
    <div className="page-wrapper">
      <SEO
        title="Real Estate — IDX/MLS Websites, Listings & Lead Capture | OnlineKarDo"
        description="Real estate websites with live IDX/MLS integration (RESO Web API), crawlable listings, fast mobile search, lead capture and CRM wiring. Agents, teams, brokerages and developers. Free audit."
        canonical="/industries/real-estate"
      />
      <style>{styles}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ecf4e8] via-[#dfecd7] to-[#cfe2c3] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="re-hero">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold" style={{ color: GREEN }}>
              <span className="re-pulse relative flex h-2.5 w-2.5 rounded-full" style={{ background: SAGE, color: SAGE }} /> Industry · Real Estate
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[.97] tracking-[-.05em] text-[#102a3d] md:text-7xl">
              Real estate websites that turn searches into <span style={{ color: GREEN }}>signed clients</span>.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#4b5b68]">
              Live IDX/MLS listings on the modern RESO Web API, fast mobile pages, hyperlocal search visibility and lead capture wired to your CRM. A new build or a rebuild of a site that never generated a lead, and you own the asset.
            </p>
            <div className="flex flex-wrap gap-2">
              {[{ t: 'List', i: Home }, { t: 'Capture', i: MousePointerClick }, { t: 'Convert', i: CalendarCheck }].map(({ t, i: I }) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#102a3d] shadow-sm"><I size={16} style={{ color: GREEN }} /> {t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={audit} className={btn} style={{ background: GREEN }}>Get a free audit <ArrowUpRight size={17} /></button>
              <a href="#process" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-7 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">See how we work</a>
            </div>
          </div>
          <div className="relative mx-auto hidden h-[460px] w-full max-w-[480px] lg:block">
            <div className="re-float absolute left-0 top-0 h-[340px] w-72 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(79,111,71,.35)]"><Photo src={IMG.heroMain} alt="Modern house exterior" className="h-full w-full" /></div>
            <div className="re-float absolute bottom-0 right-0 h-60 w-60 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(79,111,71,.35)]" style={{ animationDelay: '-3s' }}><Photo src={IMG.heroSide} alt="Suburban family home" className="h-full w-full" /></div>
            <div className="absolute right-2 top-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><Check size={16} style={{ color: GREEN }} /> New lead · replied in seconds</div>
            <div className="absolute bottom-24 left-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><CalendarCheck size={16} style={{ color: GREEN }} /> Showing booked</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-b border-[#d9e8d0] bg-white py-7" aria-label="Systems we connect">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[.18em] text-[#6b7782]">Systems we connect your site to</p>
        <Marquee>{tools.map((n) => <span key={n} className="mx-3 whitespace-nowrap rounded-full border border-[#d9e8d0] bg-[#f4f8f1] px-5 py-2.5 text-sm font-semibold text-[#102a3d]">{n}</span>)}</Marquee>
      </section>

      {/* Market reality */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <Eyebrow>Market reality</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-6xl">Your website is the first showing, and it happens before you meet the buyer.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">The home search starts online and ends with a professional. By the time someone calls, they have already browsed listings, compared neighborhoods and quietly decided whether your site earned their trust.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 110} className="h-full">
                <div className="h-full rounded-[24px] border border-[#d9e8d0] bg-[#f4f8f1] p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white" style={{ background: i === 3 ? '#e36a27' : GREEN }}>{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold text-[#102a3d]">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5e6b76]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <div className="flex flex-col items-start gap-4 rounded-[24px] p-7 md:flex-row md:items-center md:gap-8" style={{ background: LIGHT }}>
              <p className="text-5xl font-bold" style={{ color: GREEN }}>~<CountUp to={10} /> wks</p>
              <p className="text-[#33424e]">A typical buyer spends around ten weeks searching online and comparing agents before choosing one. <span className="text-sm text-[#6b7782]">(Based on NAR’s Profile of Home Buyers & Sellers. Please confirm the latest figure before publishing.)</span></p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brochure vs lead engine */}
      <section className="bg-gradient-to-b from-[#ecf4e8] to-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <Eyebrow>The difference</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-6xl">Most real estate sites are brochures. We build lead engines.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">A brochure lists a few properties, shows a headshot and waits. The reasons it fails are predictable, so we design them out from the start.</p>
          </Reveal>
          <Reveal><LeakExplorer onAudit={audit} /></Reveal>
        </div>
      </section>

      {/* AI lead engine */}
      <section className="bg-[#102a3d] px-4 py-16 text-white md:py-24">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10 px-6 py-12 md:px-14 md:py-16">
          <Photo src={IMG.ai} alt="City home exterior" className="re-kenburns absolute inset-0 -z-20 h-full w-full" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1d2b]/93 via-[#0b1d2b]/86 to-[#0b1d2b]/70" />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow light>AI lead engine</Eyebrow>
              <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-5xl">Win the lead in seconds, not hours.</h2>
              <p className="mt-5 text-lg text-white/75">Speed-to-lead decides who closes. The WAV Group / Weichert Agent Responsiveness Study put the average human response to a new web lead at 917 minutes, over 15 hours. We design the site so an AI assistant answers, qualifies and routes every inquiry the moment it lands.</p>
              <ul className="mt-6 space-y-3 text-white/85">
                {['Answer property questions and book showings 24/7, by chat or voice', 'Qualify buyers and sellers, then route to the right agent with context', 'Re-engage cold leads automatically over weeks and months', 'Sync every conversation into your CRM so nothing is dropped'].map((s) => <li key={s} className="flex items-start gap-3"><Check size={18} className="mt-0.5 shrink-0" style={{ color: MINT }} /> {s}</li>)}
              </ul>
              <button onClick={audit} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-[#102a3d] transition hover:-translate-y-0.5">Add an AI lead assistant <ArrowUpRight size={17} /></button>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-[28px] border border-white/15 bg-[#0b1d2b]/60 p-7 backdrop-blur-md">
                <p className="text-sm text-white/60">Average human response</p>
                <div className="mt-2 h-10 overflow-hidden rounded-full bg-white/10"><div className="re-bar h-full rounded-full" style={{ background: '#c2562b' }} /></div>
                <p className="mt-2 text-2xl font-semibold">≈ 917 min <span className="text-sm font-normal text-white/60">· 15+ hours, long after the buyer moved on</span></p>
                <p className="mt-7 text-sm text-white/60">With an AI lead assistant</p>
                <div className="mt-2 h-10 overflow-hidden rounded-full bg-white/10"><div className="re-bar h-full rounded-full" style={{ background: MINT, ['--w' as string]: 0.03 }} /></div>
                <p className="mt-2 text-2xl font-semibold">Seconds <span className="text-sm font-normal text-white/60">· answered, qualified and routed on arrival</span></p>
                <p className="mt-6 text-xs text-white/45">Bars are illustrative and not to scale; the real gap is far larger than a chart can show. The 917-minute average is from the WAV Group / Weichert study.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IDX explainer */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>IDX · MLS · RESO</Eyebrow>
            <h2 className={h2}>IDX, MLS and RESO, done right, not just plugged in.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Most lead problems on real estate sites trace back to how listings are connected. Here is the plain-English version.</p>
          </Reveal>
          <Reveal><IdxFlow /></Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[['MLS', 'The Multiple Listing Service: the closed, members-only database where agents and brokers share listing data.'], ['IDX', 'Internet Data Exchange: the rules and technology for showing MLS listings on a public site. Each local MLS adds its own display, attribution and refresh rules.'], ['RESO Web API', 'The modern, standard, JSON-based feed most MLSs use, replacing the older RETS system. Faster, cleaner and friendlier to CRMs and apps.']].map(([t, d], i) => (
              <Reveal key={t} delay={i * 90} className="h-full"><div className="h-full rounded-[22px] border border-[#d9e8d0] bg-[#f4f8f1] p-6"><h3 className="text-xl font-bold text-[#102a3d]">{t}</h3><p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{d}</p></div></Reveal>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Reveal className="h-full"><div className="h-full rounded-[22px] border border-[#f0dccb] bg-[#fff8f2] p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#c4581a]">The common mistake</p><p className="mt-2 text-[#5e4a3c]">Dump a raw MLS feed straight onto your site. The same listing text is syndicated across thousands of sites, so search engines treat your pages as duplicate content and bury them.</p></div></Reveal>
            <Reveal delay={90} className="h-full"><div className="h-full rounded-[22px] border border-[#cfe2c3] bg-[#eef6ea] p-6"><p className="text-xs font-bold uppercase tracking-wider" style={{ color: GREEN }}>How a specialist solves it</p><p className="mt-2 text-[#2d4a2a]">Connect through the RESO Web API correctly, respect your MLS’s attribution and refresh rules, add unique neighborhood context so pages earn their own rankings, and canonicalize so your pages never compete with each other.</p></div></Reveal>
          </div>
          <p className="mt-6 text-center text-sm text-[#5e6b76]">We confirm your MLS’s policies and supported standard before we build, so the integration is compliant, not a workaround.</p>
        </div>
      </section>

      {/* Two doors */}
      <section className="bg-[#ecf4e8] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>New build or rebuild</Eyebrow>
            <h2 className={h2}>Two doors. Both lead to a site that performs.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Launching your first site or escaping one that underperforms, you are in the right place. Most of the work we are asked for is a rebuild.</p>
          </Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[32px] bg-[#0c2236] p-4"><SiteCompare /></div>
              <p className="mt-3 text-center text-xs text-[#6b7782]">Illustrative before and after. Drag to compare.</p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GREEN }}>Improve what exists</p>
              <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Redesign, replatform & migrate</h3>
              <p className="mt-3 text-[#5e6b76]">A site that is slow, dated, hard to update, badly indexed, accessibility-exposed or stuck on a platform you do not control. We audit, redesign and migrate it, preserving rankings, listings, URLs and lead history.</p>
              <ul className="mt-5 space-y-2.5">
                <Check1>Redesign and replatform with no SEO loss</Check1>
                <Check1>URLs and rankings preserved, redirects clean</Check1>
                <Check1>No traffic lost, no leads dropped</Check1>
              </ul>
              <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d] px-6 py-3 font-bold text-[#102a3d] transition hover:bg-[#102a3d] hover:text-white">Start a rebuild <ArrowRight size={16} /></button>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <article className="grid overflow-hidden rounded-[32px] border border-[#d9e8d0] bg-white md:grid-cols-2">
              <Photo src={IMG.buildNew} alt="Two-storey home with a garden" className="h-64 w-full md:h-full" />
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GREEN }}>Start from zero</p>
                <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Build from scratch</h3>
                <p className="mt-3 text-[#5e6b76]">A new agent, team, brokerage or development launching fresh. We architect the whole thing: brand-aligned design, IDX/MLS, lead capture, CRM, neighborhood SEO and compliance, structured to convert from launch.</p>
                <ul className="mt-5 space-y-2.5">
                  <Check1>Brand-led design, built to convert</Check1>
                  <Check1>IDX/MLS, lead capture and CRM from day one</Check1>
                  <Check1>Neighborhood SEO and accessibility baked in</Check1>
                </ul>
                <button onClick={audit} className={`mt-7 ${btn.replace('px-7 py-3.5', 'px-6 py-3')}`} style={{ background: GREEN }}>Plan a new build <ArrowRight size={16} /></button>
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
            <h2 className={h2}>Everything a real estate site needs to convert.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Four working parts in every build. Hover or tap a track to see what is inside.</p>
          </Reveal>
          <Reveal><TrackTabs /></Reveal>
        </div>
      </section>

      {/* Lifestyle band */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.band} alt="Gated home exterior" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0c2236]/92 via-[#0c2236]/70 to-[#0c2236]/30" />
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <Eyebrow light>The result</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">Every property search is someone’s next chapter.</h2>
            <p className="mt-5 text-lg text-white/80">We build the website that turns it into your next signed client.</p>
          </Reveal>
        </div>
      </section>

      {/* Who we build for */}
      <section className="bg-[#ecf4e8] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>Who we build for</Eyebrow>
            <h2 className={h2}>Built for every corner of real estate.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">From a solo agent’s personal brand to a multi-office brokerage platform, the build changes with the audience.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map((v, i) => (
              <Reveal key={v.name} delay={i * 60} className="h-full">
                <article className={card}>
                  <div className="h-40 overflow-hidden"><Photo src={v.image} alt={v.name} className="h-full w-full transition-transform duration-700 group-hover:scale-110" /></div>
                  <div className="p-5">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-[#102a3d]"><v.icon size={18} style={{ color: GREEN }} /> {v.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{v.text}</p>
                    <button onClick={audit} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: GREEN }}>Tell us about your project <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* One accountable partner */}
      <section className="bg-[#102a3d] px-4 py-16 text-white md:py-24">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10 px-6 py-12 md:px-14 md:py-16">
          <Photo src={IMG.team} alt="House with large trees" className="re-kenburns absolute inset-0 -z-20 h-full w-full" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1d2b]/94 via-[#0b1d2b]/88 to-[#0b1d2b]/75" />
          <Reveal>
            <Eyebrow light>One accountable partner</Eyebrow>
            <h2 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-5xl">A dedicated real estate web team, no handoffs.</h2>
            <p className="mt-5 max-w-3xl text-lg text-white/75">You are not handed to a rotating pool of generalists. One lead owns the outcome end to end, with a specialist for each part of the build, under one contract, and you own the site.</p>
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

      {/* Fair Housing & ADA */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Fair Housing & ADA</Eyebrow>
            <h2 className={h2}>Accessible by design, not a sticker on top.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">Real estate sites carry a compliance burden most industries do not. Public-facing sites are generally treated as places of public accommodation under ADA Title III, and the Fair Housing Act requires equal access to housing information. We build to WCAG 2.1–2.2 AA in the code.</p>
            <ul className="mt-6 space-y-3">{a11y.map((s) => <Check1 key={s}>{s}</Check1>)}</ul>
            <p className="mt-5 text-xs text-[#6b7782]">General information, not legal advice. Please confirm specifics with a legal advisor.</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[28px] border border-[#cfe2c3] bg-[#f4f8f1] p-7">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: GREEN }}><Accessibility size={16} /> The overlay-widget myth</p>
              <p className="mt-3 text-lg font-bold leading-snug text-[#102a3d]">A floating accessibility widget does not fix the underlying code.</p>
              <p className="mt-3 text-[#5e6b76]">Overlays have themselves become a target for accessibility complaints. We fix it at the source: semantic structure, real alt text, keyboard-operable search and forms, captions and contrast. That protects you and opens your listings to every buyer.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white p-4"><p className="font-bold text-[#c4581a]">Overlay</p><p className="text-[#5e6b76]">Sticker on top of the same code</p></div>
                <div className="rounded-xl bg-white p-4"><p className="font-bold" style={{ color: GREEN }}>Built in</p><p className="text-[#5e6b76]">Fixed at the source, tested</p></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-[#f4f8f1] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal className="mb-14 text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className={h2}>How we build (or rebuild) your real estate site.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">One clear path whether you are starting fresh or modernising, with no surprises and no lost rankings.</p>
          </Reveal>
          <div className="relative">
            <div className="absolute bottom-0 left-6 top-0 w-px" style={{ background: `linear-gradient(to bottom, ${SAGE}, ${SAGE}1a)` }} />
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="relative pb-8 pl-20 last:pb-0">
                  <span className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ring-4 ring-[#f4f8f1]" style={{ background: GREEN }}>{i + 1}</span>
                  <div className="rounded-[20px] border border-[#d9e8d0] bg-white p-6">
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
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3">
          {([['Platforms we build on', platforms, Globe], ['Compliance & standards', compliance, ImageIcon], ['Key integrations', integrations, Star]] as const).map(([title, list, Icon], i) => (
            <Reveal key={title} delay={i * 90}>
              <h3 className="flex items-center gap-2 text-xl font-bold text-[#102a3d]"><Icon size={20} style={{ color: GREEN }} /> {title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{list.map((x) => <li key={x} className="rounded-full border border-[#d9e8d0] bg-[#f4f8f1] px-4 py-2 text-sm text-[#33424e]">{x}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lead value */}
      <section className="bg-[#f4f8f1] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="text-center">
            <Eyebrow>Investment & payback</Eyebrow>
            <h2 className={h2}>What would better conversion be worth?</h2>
            <p className="mt-4 text-[#5e6b76]">Set your own numbers. Pricing depends on scope and is shared in your free audit.</p>
          </Reveal>
          <Reveal><LeadCalculator /></Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="mb-10 text-center">
            <Eyebrow>Questions</Eyebrow>
            <h2 className={h2}>Real estate website FAQ.</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group rounded-2xl border border-[#d9e8d0] bg-[#f4f8f1]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#102a3d]">
                  <span>{q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white transition-transform group-open:rotate-180" style={{ color: GREEN }}><ChevronDown size={18} /></span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#5e6b76]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.cta} alt="Bungalow with a front lawn" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c2236]/94 via-[#0c2236]/84 to-[#4f6f47]/75" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
          <div>
            <Eyebrow light>One free audit. Zero obligation.</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">See exactly what is holding your real estate site back.</h2>
            <p className="mt-5 max-w-xl text-lg text-white/85">A free audit of your site’s speed, IDX setup, search visibility, accessibility and lead capture, or a strategy session if you are building new. Clear findings from the team that would build it.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={audit} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#102a3d] transition hover:-translate-y-0.5">Start my free audit <ArrowUpRight size={18} /></button>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">Explore services</Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MINT }}>What your audit covers</p>
            <h3 className="mt-2 text-2xl font-bold">A specific, prioritised plan.</h3>
            <ul className="mt-5 space-y-4">
              {[{ b: 'Speed & conversion', t: 'where your site loses buyers before they inquire.' }, { b: 'IDX & search visibility', t: 'duplicate-content risk and local rankings.' }, { b: 'Accessibility read', t: 'WCAG gaps and exposure.' }, { b: 'Lead capture & CRM', t: 'where inquiries leak instead of converting.' }, { b: 'Roadmap', t: 'what to fix first, and the likely impact.' }].map((x) => (
                <li key={x.b} className="flex items-start gap-3 text-white/90"><Check size={18} className="mt-0.5 shrink-0" style={{ color: MINT }} /><span><b className="text-white">{x.b}:</b> {x.t}</span></li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/60">No spam. No obligation. Your details stay private.</p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-3xl px-5 text-center text-[11px] text-white/45">Photos via Burst by Shopify. Figures and legal references are general information; please verify before publishing.</p>
      </section>
    </div>
  )
}
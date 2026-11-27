import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, BarChart, Check, ChevronDown, Clock, CreditCard, FileText, Globe, Layers, MapPin, MessageSquare, MousePointer, PenTool, Rocket, Search, Shield, Smartphone, Target, TrendingUp, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import { SEO } from '../components/SEO'

/* ---------- Photos (free to use, Burst by Shopify). Swap for your own paths any time. ---------- */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1200&format=pjpg&exif=0&iptc=0`

/* ---------- Data ---------- */
const TEAL = '#087b87'

const processSteps = [
  {
    number: '01', title: 'Free Audit', subtitle: 'We diagnose before we prescribe', icon: Search, accent: '#087b87',
    image: burst('shop-owner-gets-ready'), imageAlt: 'Shop owner checking the storefront before opening',
    description: 'We review your current website, WhatsApp presence, Google Business Profile and social profiles. You get a specific, prioritised findings document: what is working, what is leaking, and what to fix first.',
    deliverables: [
      { label: 'Website performance and conversion check', icon: TrendingUp },
      { label: 'SEO and accessibility gaps', icon: Shield },
      { label: 'Brand consistency review', icon: Target },
      { label: 'WhatsApp and local presence check', icon: Smartphone },
      { label: 'Prioritised roadmap', icon: FileText },
    ],
    timeline: 'Delivered in 2 business days', cta: 'Start free audit', audit: true,
  },
  {
    number: '02', title: 'Strategy & Scope', subtitle: 'One plan, one owner, no ambiguity', icon: FileText, accent: '#e36a27',
    image: burst('business-owner-working-on-online-store'), imageAlt: 'Business owner planning an online store on a laptop',
    description: 'Your lead turns the audit into a scoped plan: which pack, which services, what content you provide, what we build, and when each milestone ships. A fixed scope and timeline you can approve.',
    deliverables: [
      { label: 'Selected pack and add-on services', icon: Layers },
      { label: 'Content checklist (yours vs ours)', icon: FileText },
      { label: 'Design direction and brand alignment', icon: Target },
      { label: 'Platform and tool choices', icon: Globe },
      { label: 'Milestone calendar with dates', icon: Clock },
    ],
    timeline: '1–2 days after audit approval', cta: 'View setup packs', href: '/packs',
  },
  {
    number: '03', title: 'Design & Build', subtitle: 'Specialists working in parallel', icon: PenTool, accent: '#779166',
    image: burst('store-owners-hands-typing-away'), imageAlt: 'Hands typing on a laptop while building an online store',
    description: 'Your web specialist builds the site, your commerce specialist sets up WhatsApp catalogue and flows, and your local specialist sets up your Google profile. Your lead coordinates and reviews each milestone with you.',
    deliverables: [
      { label: 'Wireframes to finished designs', icon: MousePointer },
      { label: 'Mobile-first development', icon: Smartphone },
      { label: 'WhatsApp catalogue and ordering flow', icon: MessageSquare },
      { label: 'Google Business Profile setup', icon: MapPin },
      { label: 'Social profiles creation and sync', icon: Globe },
      { label: 'Payment links where applicable', icon: CreditCard },
    ],
    timeline: '24–72 hours per pack*', cta: 'See our work', href: '/examples',
  },
  {
    number: '04', title: 'Launch & QA', subtitle: 'Zero surprises at go-live', icon: Rocket, accent: '#d5a64b',
    image: burst('a-happy-store-owner-opens-for-the-day'), imageAlt: 'Shop owner turning the sign to open',
    description: 'Every launch goes through a pre-flight checklist: speed, mobile layout, accessibility basics, SEO setup, redirects, analytics and a full test of your WhatsApp flows. You approve, then we launch.',
    deliverables: [
      { label: 'Speed and mobile performance check', icon: TrendingUp },
      { label: 'Accessibility basics check', icon: Shield },
      { label: 'SEO setup check', icon: Search },
      { label: 'Redirects mapped for existing pages', icon: Layers },
      { label: 'Analytics and Search Console connected', icon: BarChart },
      { label: 'WhatsApp ordering flow tested', icon: Smartphone },
    ],
    timeline: 'Launch day + 48h monitoring', cta: 'Read the fine print', href: '/fineprint',
  },
  {
    number: '05', title: 'Grow & Support', subtitle: 'The work compounds after launch', icon: BarChart, accent: '#1f6f8b',
    image: burst('photo-of-people-shopping-in-a-clothing-store'), imageAlt: 'Customers shopping in a busy store',
    description: 'We don\'t disappear after launch. Monthly plans keep your website cared for and your social content moving, so your business stays fresh without you chasing it.',
    deliverables: [
      { label: 'Uptime checks and backups', icon: Shield },
      { label: 'Minor content updates', icon: FileText },
      { label: 'Template-based social posts', icon: Globe },
      { label: 'Captions and scheduling', icon: Clock },
      { label: 'Website care alongside posts', icon: Zap },
    ],
    timeline: 'Ongoing, billed monthly', cta: 'View monthly plans', href: '/monthly',
  },
]

const timelineDays = ['Day 1–2', 'Day 2–3', 'Day 3–6', 'Day 7', 'After launch']

const roles = [
  { name: 'Account Lead', icon: Users, color: '#e36a27' },
  { name: 'Web Specialist', icon: Globe, color: '#087b87' },
  { name: 'Commerce Specialist', icon: Smartphone, color: '#779166' },
  { name: 'Local Specialist', icon: Target, color: '#d5a64b' },
]
type Level = 'lead' | 'support' | 'info'
const matrix: { category: string; detail: string; levels: Level[] }[] = [
  { category: 'Strategy & planning', detail: 'Audit, pack selection, timeline', levels: ['lead', 'support', 'support', 'support'] },
  { category: 'Design & brand', detail: 'Layouts, brand alignment, mobile-first design', levels: ['support', 'lead', 'info', 'info'] },
  { category: 'Build', detail: 'Website, WhatsApp catalogue, Google profile, social profiles', levels: ['support', 'lead', 'lead', 'lead'] },
  { category: 'Quality & launch', detail: 'Pre-flight checks, redirects, analytics', levels: ['lead', 'support', 'support', 'support'] },
  { category: 'Ongoing care', detail: 'Updates, social posts, monthly support', levels: ['lead', 'support', 'info', 'support'] },
]

const whatYouProvide = [
  { icon: FileText, title: 'Business basics', accent: '#087b87', items: ['Business name and legal name', 'Address, phone, email', 'Operating hours', 'GST / registration details'] },
  { icon: Smartphone, title: 'Brand assets', accent: '#e36a27', items: ['Logo (SVG or PNG preferred)', 'Brand colours and fonts', 'Photos of products, space, team', 'Existing marketing material'] },
  { icon: Globe, title: 'Content & offerings', accent: '#779166', items: ['Product or service list with prices', 'Menu or catalogue data', 'About us and team bios', 'FAQs customers ask most'] },
  { icon: Zap, title: 'Access & accounts', accent: '#d5a64b', items: ['Domain registrar login', 'Google account for Business Profile', 'Meta Business Suite access', 'WhatsApp Business number'] },
  { icon: Users, title: 'Team & preferences', accent: '#1f6f8b', items: ['Primary contact and decision maker', 'Team members for approvals', 'Communication preferences', 'Preferred launch date'] },
]

const faqs: [string, string][] = [
  ['What if I don\'t have professional photos?', 'We work with what you have and guide you on quick wins. For packs that need product shots, we share a simple do-it-yourself photography guide. If you need professional photography, we can connect you with trusted partners.'],
  ['How many revision rounds are included?', 'Every pack includes one consolidated revision round after the first draft. Additional rounds are available at ₹999 each. One round is usually enough when feedback is gathered in one go.'],
  ['What happens if third-party verification delays launch?', 'Google Business Profile verification, WhatsApp Business approval and payment gateway KYC are outside our control. We prepare everything in advance and submit as soon as we can. Our timeline starts after we receive your complete details, and third-party delays are noted but don\'t pause our work.'],
  ['Can I see the work before it goes live?', 'Yes. You review designs and test the staging site, and you approve WhatsApp flows in a test environment. Nothing goes live without your explicit approval.'],
  ['What if I need changes after launch?', 'Basic Care (₹499/month) includes uptime checks, backups and one minor content update. Digital Care Plus (₹2,999/month) adds social posts and up to two minor updates. One-off changes are ₹499 each.'],
  ['Do you handle domain and hosting?', 'We can register and set up your domain and hosting, or deploy to your own hosting and guide the DNS setup. Domain, hosting and other third-party fees are billed separately.'],
]

const topStrip = ['Free audit', 'Strategy and scope', 'Design and build', 'Launch and QA', 'Grow and support']
const platforms = ['WhatsApp Business', 'Google Business Profile', 'Instagram', 'Facebook', 'WordPress', 'Shopify', 'Webflow', 'WooCommerce', 'Razorpay payment links']

/* ---------- Building blocks ---------- */
function Photo({ src, alt, className = '', tint = TEAL }: { src: string; alt: string; className?: string; tint?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={className} style={{ background: `linear-gradient(135deg, ${tint}22, ${tint}55)` }} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

function Marquee({ children, reverse = false, duration = 40, className = '' }: { children: ReactNode; reverse?: boolean; duration?: number; className?: string }) {
  return (
    <div className={`hw-marquee ${className}`}>
      <div className="hw-track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div className="hw-set">{children}</div>
        <div className="hw-set hw-dup" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { threshold: 0, rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    const timer = window.setTimeout(() => setShown(true), 2500) // never leave content hidden
    return () => { io.disconnect(); window.clearTimeout(timer) }
  }, [])
  return <div ref={ref} className={`hw-reveal ${shown ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

// Image with a gentle scroll parallax. Skipped for reduced motion.
function ParallaxPhoto({ src, alt, tint }: { src: string; alt: string; tint: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height)
      setOffset((Math.min(Math.max(progress, 0), 1) - 0.5) * 36)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div className="h-full w-full" style={{ transform: `translateY(${offset}px) scale(1.12)` }}>
        <Photo src={src} alt={alt} tint={tint} className="h-full w-full" />
      </div>
    </div>
  )
}

const styles = `
@keyframes hw-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes hw-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes hw-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes hw-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.hw-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
.hw-track { display: flex; width: max-content; animation: hw-scroll 40s linear infinite; }
.hw-marquee:hover .hw-track { animation-play-state: paused; }
.hw-set { display: flex; flex-shrink: 0; align-items: center; }
.hw-hero > * { opacity: 0; animation: hw-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.hw-hero > *:nth-child(1) { animation-delay: .05s; } .hw-hero > *:nth-child(2) { animation-delay: .15s; }
.hw-hero > *:nth-child(3) { animation-delay: .27s; } .hw-hero > *:nth-child(4) { animation-delay: .39s; } .hw-hero > *:nth-child(5) { animation-delay: .5s; }
.hw-float { animation: hw-float 7s ease-in-out infinite; }
.hw-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.hw-reveal.is-in { opacity: 1; transform: none; }
.hw-line { transform-origin: left; animation: hw-grow 1.4s cubic-bezier(.2,.7,.2,1) .2s both; }
@media (prefers-reduced-motion: reduce) {
  .hw-track, .hw-float, .hw-line { animation: none; }
  .hw-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .hw-dup { display: none; }
  .hw-hero > * { opacity: 1; animation: none; }
  .hw-reveal { opacity: 1; transform: none; transition: none; }
}
`

const levelStyle: Record<Level, { label: string; cls: string }> = {
  lead: { label: 'Leads', cls: 'bg-[#087b87] text-white' },
  support: { label: 'Supports', cls: 'bg-[#d9eeee] text-[#075c68]' },
  info: { label: 'Informed', cls: 'bg-[#eef1f3] text-[#8a97a1]' },
}

/* ---------- Page ---------- */
export default function HowItWorksPage() {
  const { openEnquiry } = useEnquiry()

  return (
    <>
      <SEO
        title="How It Works — 5 Steps to Get Online | OnlineKarDo"
        description="Five clear steps: Free Audit → Strategy → Design & Build → Launch → Grow. One partner, dedicated specialists, fixed timeline. Get your business online with OnlineKarDo."
        canonical="/how"
      />
      <style>{styles}</style>

      {/* Top strip */}
      <div className="bg-[#0b1f2d] py-3 text-white" aria-hidden="true">
        <Marquee duration={36}>
          {[...topStrip, ...topStrip].map((t, i) => (
            <span key={i} className="mx-6 flex items-center gap-3 whitespace-nowrap text-xs font-semibold uppercase tracking-[.16em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#55c9c0]" /> {t}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#102a3d] via-[#087b87] to-[#0d2638] py-20 text-white md:py-28">
        <div className="hw-float absolute right-[8%] top-[18%] -z-10 h-72 w-72 rounded-full bg-[#55c9c0]/25 blur-[100px]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="hw-hero">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-[#a2f5eb]">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#71f0dd] opacity-60 motion-reduce:animate-none" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#71f0dd]" /></span>
              A process you can actually follow
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[.95] tracking-[-.05em] md:text-7xl">
              Clear from day one. <span className="text-[#a2f5eb]">No black boxes.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/85">
              Five stages, one accountable lead, and a free audit at the front so you know exactly what you’re getting before you commit.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => openEnquiry('Free Audit')} className="group inline-flex items-center gap-2 rounded-full bg-[#55c9c0] px-7 py-3.5 font-bold text-[#102a3d] transition hover:-translate-y-0.5 hover:bg-white">
                Start with a free audit <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <Link to="/packs" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-3.5 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">
                Explore setup packs
              </Link>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {['Clear scope', 'Upfront pricing from ₹2,999', 'Built for phones first'].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check size={15} className="text-[#91f0e2]" /> {t}</li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto hidden h-[440px] w-full max-w-[460px] lg:block">
            <div className="hw-float absolute left-0 top-4 h-80 w-64 overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,.35)]">
              <Photo src={burst('person-browses-clothing-racks-in-a-store')} alt="Customer browsing clothing racks in a local store" className="h-full w-full" />
            </div>
            <div className="hw-float absolute bottom-0 right-0 h-64 w-64 overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,.35)]" style={{ animationDelay: '-3s' }}>
              <Photo src={burst('person-shops-in-a-clothing-store')} alt="Person shopping in a clothing store" className="h-full w-full" />
            </div>
            <div className="absolute right-2 top-0 rounded-2xl bg-white px-4 py-3 text-[#102a3d] shadow-xl">
              <p className="text-xs font-semibold text-[#5e6b76]">Step 1 is</p>
              <p className="text-lg font-bold">Free audit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms marquee */}
      <section className="border-b border-[#e0eaee] bg-white py-8" aria-label="Platforms we set up and work with">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[.18em] text-[#6b7782]">Platforms we set up and work with</p>
        <Marquee duration={55} reverse>
          {platforms.map((p) => (
            <span key={p} className="mx-3 whitespace-nowrap rounded-full border border-[#dbe6ea] bg-[#f3f8fa] px-5 py-2.5 text-sm font-semibold text-[#102a3d]">{p}</span>
          ))}
        </Marquee>
      </section>

      {/* Steps */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-24 px-5 md:space-y-32">
          {processSteps.map((step, index) => {
            const flip = index % 2 === 1
            return (
              <article key={step.number} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={flip ? 'lg:order-2' : ''}>
                  <div className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(16,42,61,.18)]">
                      <ParallaxPhoto src={step.image} alt={step.imageAlt} tint={step.accent} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      <span className="absolute right-5 top-3 text-7xl font-bold text-white/25 md:text-8xl">{step.number}</span>
                    </div>
                    <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_20px_50px_rgba(16,42,61,.18)] md:left-8">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: step.accent }}>
                        <step.icon size={24} className="text-white" />
                      </span>
                      <div>
                        <p className="font-bold text-[#102a3d]">{step.title}</p>
                        <p className="flex items-center gap-1.5 text-xs text-[#5e6b76]"><Clock size={12} /> {step.timeline}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={120} className={flip ? 'lg:order-1' : ''}>
                  <div className="pt-4 lg:pt-0">
                    <p className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: step.accent }}>Step {step.number}</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">{step.title}</h2>
                    <p className="mt-2 text-lg font-semibold" style={{ color: step.accent }}>{step.subtitle}</p>
                    <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">{step.description}</p>

                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {step.deliverables.map((d) => (
                        <li key={d.label} className="flex items-start gap-3 rounded-xl border border-[#e6edf0] bg-[#f7fafb] p-3 text-sm text-[#33424e]">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${step.accent}22` }}>
                            <d.icon size={16} style={{ color: step.accent }} />
                          </span>
                          <span className="pt-1">{d.label}</span>
                        </li>
                      ))}
                    </ul>

                    {step.audit ? (
                      <button onClick={() => openEnquiry('Free Audit')} className="group mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition hover:-translate-y-0.5" style={{ background: step.accent }}>
                        {step.cta} <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    ) : (
                      <Link to={step.href!} className="group mt-7 inline-flex items-center gap-2 font-bold transition-all hover:gap-3" style={{ color: step.accent }}>
                        {step.cta} <ArrowUpRight size={16} />
                      </Link>
                    )}
                  </div>
                </Reveal>
              </article>
            )
          })}
          <p className="text-center text-xs text-[#6b7782]">*Delivery targets begin after complete business details and required account approvals. Third-party verification can take longer. Photos via Burst by Shopify.</p>
        </div>
      </section>

      {/* Who does what */}
      <section className="bg-[#f3f8fa] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Who does what.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">One accountable lead and three specialists. You always know who owns each part.</p>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto rounded-[24px] border border-[#e0eaee] bg-white shadow-[0_14px_42px_rgba(16,42,61,.06)]">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-[#e0eaee]">
                    <th className="sticky left-0 z-10 bg-white p-5 text-left text-sm font-bold text-[#102a3d]">Stage</th>
                    {roles.map((r) => (
                      <th key={r.name} className="p-4">
                        <div className="flex flex-col items-center gap-2">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: r.color }}><r.icon size={20} /></span>
                          <span className="text-xs font-bold uppercase tracking-wide text-[#5e6b76]">{r.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row) => (
                    <tr key={row.category} className="border-b border-[#eef2f4] last:border-0">
                      <td className="sticky left-0 z-10 bg-white p-5">
                        <p className="font-semibold text-[#102a3d]">{row.category}</p>
                        <p className="mt-0.5 text-xs text-[#6b7782]">{row.detail}</p>
                      </td>
                      {row.levels.map((lvl, i) => (
                        <td key={i} className="p-3 text-center">
                          <span className={`inline-block rounded-full px-3 py-1.5 text-xs font-bold ${levelStyle[lvl].cls}`}>{levelStyle[lvl].label}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-5 text-center text-sm text-[#5e6b76]"><b>Leads</b> owns delivery and decisions · <b>Supports</b> contributes expertise · <b>Informed</b> stays in the loop</p>
        </div>
      </section>

      {/* What we need */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">What we need from you.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">The faster you share, the faster we ship. Most businesses have much of this ready already, and we help organise the rest.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whatYouProvide.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 80} className="h-full">
                <article className="group h-full rounded-[24px] border border-[#e0eaee] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(16,42,61,.12)]" style={{ borderTop: `4px solid ${cat.accent}` }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${cat.accent}22` }}>
                    <cat.icon size={24} style={{ color: cat.accent }} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#102a3d]">{cat.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#5e6b76]">
                        <Check size={15} className="mt-0.5 shrink-0" style={{ color: cat.accent }} /> {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#102a3d] py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-[-.04em] md:text-5xl">Typical timeline.</h2>
            <p className="mt-4 text-lg text-white/75">Your pace depends on how quickly you share your details. These are targets, not guarantees.</p>
          </Reveal>
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-white/15 lg:block" />
            <div className="hw-line absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-[#55c9c0] to-[#e36a27] lg:block" />
            <div className="grid gap-5 lg:grid-cols-5">
              {processSteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 110}>
                  <div className="relative">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ring-4 ring-[#102a3d]" style={{ background: step.accent }}>{i + 1}</span>
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#55c9c0]">{timelineDays[i]}</p>
                      <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{step.subtitle}</p>
                      <p className="mt-3 flex items-center gap-1.5 text-xs text-white/60"><Clock size={12} /> {step.timeline}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#087b87] py-5 text-white" aria-hidden="true">
        <Marquee duration={38}>
          {['Ready to start? Get your free audit', '5 steps · 1 partner', 'Audit → Strategy → Build → Launch → Grow', 'Setup packs from ₹2,999', 'Ready to start? Get your free audit', '5 steps · 1 partner'].map((t, i) => (
            <span key={i} className="mx-8 flex items-center gap-3 whitespace-nowrap text-sm font-bold uppercase tracking-[.14em]">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> {t}
            </span>
          ))}
        </Marquee>
      </section>

      {/* FAQ */}
      <section className="bg-[#f3f8fa] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Clarity is part of the experience.</h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-[#5e6b76]">Know what to expect, what to prepare, and where your setup can go next.</p>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group rounded-2xl border border-[#e0eaee] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#102a3d]">
                  <span>{q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#d9eeee] text-[#087b87] transition-transform group-open:rotate-180"><ChevronDown size={18} /></span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#5e6b76]">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/fineprint" className="inline-flex items-center gap-2 font-bold text-[#087b87] transition-all hover:gap-3">Read the full details <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#102a3d] via-[#087b87] to-[#0d2638] py-20 text-white md:py-28">
        <div className="hw-float absolute -right-16 top-10 -z-10 h-80 w-80 rounded-full bg-[#55c9c0]/25 blur-[100px]" />
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-4xl font-bold leading-[1] tracking-[-.05em] md:text-6xl">Your digital presence, sorted.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">One audit. One partner. One clear path forward.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button onClick={() => openEnquiry('Free Audit')} className="group inline-flex items-center gap-2 rounded-full bg-[#55c9c0] px-8 py-4 font-bold text-[#102a3d] transition hover:-translate-y-0.5 hover:bg-white">
              Start my free audit <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <Link to="/packs" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">Explore setup packs</Link>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/65">
            <li className="flex items-center gap-1.5"><Shield size={14} /> No obligation</li>
            <li className="flex items-center gap-1.5"><Clock size={14} /> Audit in 2 business days</li>
            <li className="flex items-center gap-1.5"><FileText size={14} /> Yours to keep</li>
          </ul>
        </div>
      </section>
    </>
  )
}
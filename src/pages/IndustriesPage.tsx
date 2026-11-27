import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ShoppingBag, HeartPulse, House, Briefcase, GraduationCap, Utensils, Check, Shield, Users, Monitor, Palette, Bot, ArrowRight, ChevronRight, Crosshair, Wrench, MoveHorizontal } from 'lucide-react'
import { SEO } from '../components/SEO'

/* ---------- Photos for the Build/Rebuild section ----------
   Free-to-use photos from Burst by Shopify (https://www.shopify.com/stock-photos).
   To use your own, replace these URLs with local paths like '/assets/industries/start-fresh.jpg'. */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1400&format=pjpg&exif=0&iptc=0`
const REBUILD_IMAGES = {
  startFresh: burst('a-happy-store-owner-opens-for-the-day'),
  before: burst('shop-owner-gets-ready'),
  after: burst('business-owner-working-on-online-store'),
}

/* ---------- Reusable pieces ---------- */

// Real photo that falls back to a tinted icon tile if the file is missing.
function Photo({ src, alt, icon: Icon, color = '#087b87', className = '', iconSize = 64 }: { src?: string; alt: string; icon?: React.ComponentType<any>; color?: string; className?: string; iconSize?: number }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}
        role="img"
        aria-label={alt}
      >
        {Icon && <Icon size={iconSize} color={color} opacity={0.45} />}
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

// Draggable before/after comparison. Uses a real range input so it works with touch and keyboard.
function BeforeAfter({ before, after, beforeAlt, afterAlt }: { before: string; after: string; beforeAlt: string; afterAlt: string }) {
  const [pos, setPos] = useState(50)
  const [beforeFailed, setBeforeFailed] = useState(false)
  const [afterFailed, setAfterFailed] = useState(false)

  return (
    <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[420px] overflow-hidden rounded-[28px] border border-[#e8e0f3] bg-gradient-to-br from-[#f1e6d8] to-[#e4d2bd] select-none">
      {/* After (full) */}
      {afterFailed ? (
        <div className="absolute inset-0 flex items-end justify-end p-5 bg-gradient-to-br from-[#d9e8d0] to-[#ecf4e8]">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#102a3d]">After</span>
        </div>
      ) : (
        <img src={after} alt={afterAlt} loading="lazy" onError={() => setAfterFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      )}

      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {beforeFailed ? (
          <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-br from-[#e5e7eb] to-[#f3f4f6]">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#102a3d]">Before</span>
          </div>
        ) : (
          <img src={before} alt={beforeAlt} loading="lazy" onError={() => setBeforeFailed(true)} className="h-full w-full object-cover" style={{ filter: 'saturate(.7) contrast(.95)' }} />
        )}
      </div>

      {/* Labels */}
      {!beforeFailed && <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#102a3d] shadow">Before</span>}
      {!afterFailed && <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#102a3d]/90 px-3 py-1 text-xs font-semibold text-white shadow">After</span>}

      {/* Divider + handle */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.08)]" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }} />
      <div className="pointer-events-none absolute top-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg" style={{ left: `${pos}%`, transform: 'translate(-50%,-50%)' }}>
        <MoveHorizontal size={20} className="text-[#102a3d]" />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}

/* ---------- Data ---------- */

const industries = [
  {
    id: 'ecommerce-retail',
    name: 'E-commerce & Retail',
    icon: ShoppingBag,
    vignette: 'Storefront',
    image: '/assets/industries/storefront.jpg',
    alt: 'Shopkeeper packing an online order at a small retail store',
    tagline: 'Speed and trust at checkout are your revenue.',
    description: 'Storefronts that load fast, stay PCI DSS 4.0 compliant, and convert on Shopify or WooCommerce.',
    platforms: ['Shopify', 'WooCommerce', 'Webflow', 'Custom'],
    color: '#e36a27',
    href: '/industries/ecommerce-retail'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: HeartPulse,
    vignette: 'Clinic',
    image: '/assets/industries/clinic.jpg',
    alt: 'Doctor speaking with a patient in a clinic',
    tagline: 'Two compliance layers at once: HIPAA and accessibility.',
    description: 'Patient-facing sites that satisfy HIPAA and ADA/WCAG 2.1 AA together, ahead of federal Section 504 deadlines.',
    platforms: ['WordPress', 'Webflow', 'Custom', 'Headless'],
    color: '#7b91a0',
    href: '/industries/healthcare'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: House,
    vignette: 'Property',
    image: '/assets/industries/property.jpg',
    alt: 'Agent showing a bright apartment to a young couple',
    tagline: 'Live listings, crawlable pages, instant lead capture.',
    description: 'IDX/MLS integration on modern RESO Web API, search-friendly listing pages, fast mobile lead capture wired to your CRM.',
    platforms: ['WordPress', 'Custom', 'IDX/MLS', 'Webflow'],
    color: '#779166',
    href: '/industries/real-estate'
  },
  {
    id: 'restaurants-hospitality',
    name: 'Restaurants & Hospitality',
    icon: Utensils,
    vignette: 'Restaurant',
    image: '/assets/industries/restaurant.jpg',
    alt: 'Chef plating food in a busy restaurant kitchen',
    tagline: 'Own your orders, stop renting customers from delivery apps.',
    description: 'Commission-free direct ordering, local SEO and Google Business Profile done right, menu schema, two-tap mobile flows.',
    platforms: ['WordPress', 'Webflow', 'Custom', 'Toast/Square integration'],
    color: '#d5a64b',
    href: '/industries/restaurants-hospitality'
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    icon: Briefcase,
    vignette: 'Law office',
    image: '/assets/industries/law-office.jpg',
    alt: 'Lawyer reviewing documents with a client in an office',
    tagline: 'Trust earned in seconds, intake that converts.',
    description: 'Credibility-first design, secure client intake, content structured for AI-driven discovery for law firms, accountants, advisory.',
    platforms: ['WordPress', 'Webflow', 'Custom', 'Headless CMS'],
    color: '#6b7280',
    href: '/industries/professional-services'
  },
  {
    id: 'consulting',
    name: 'Consulting',
    icon: GraduationCap,
    vignette: 'Strategy',
    image: '/assets/industries/strategy.jpg',
    alt: 'Consultants working through a strategy session at a whiteboard',
    tagline: 'Authority that wins the high-value engagement.',
    description: 'Positioning, proof, and citable thought-leadership that make serious buyers and AI shortlists treat you as the obvious choice.',
    platforms: ['WordPress', 'Webflow', 'Custom', 'Framer'],
    color: '#8b5cf6',
    href: '/industries/consulting'
  },
  {
    id: 'education',
    name: 'Education & Training',
    icon: GraduationCap,
    vignette: 'Campus',
    image: '/assets/industries/education.jpg',
    alt: 'Students learning together in a classroom',
    tagline: 'Programs, admissions, and enquiry paths that convert.',
    description: 'Course catalogues, admission funnels, and parent-facing journeys built for schools, coaching centres, and ed-tech platforms.',
    platforms: ['WordPress', 'Webflow', 'Custom', 'LMS integration'],
    color: '#06b6d4',
    href: '/industries/education'
  },
]

const capabilities = [
  {
    name: 'Web',
    icon: Monitor,
    description: 'The site built or rebuilt to your sector\'s technical rules: the right platform, speed, search visibility, conversion path, and compliance your industry is held to.',
  },
  {
    name: 'Branding & Creative',
    icon: Palette,
    description: 'An identity your buyers in that sector instantly trust, from logo and visual system to the marketing collateral that carries it.',
  },
  {
    name: 'AI Automation',
    icon: Bot,
    description: 'The systems behind the scenes that remove your sector\'s repetitive work: intake and lead routing, support agents, document and quote generation, process automation.',
  }
]

const processSteps = [
  { number: '01', title: 'Audit & Discovery', description: 'We start by understanding your sector\'s rules and your specific situation — an audit of your existing site, brand or workflow, or a scoping session if you\'re starting new. This is what the free audit kicks off.' },
  { number: '02', title: 'Strategy & Scope', description: 'A clear plan, fixed scope, the right platform and stack for your industry, and the compliance and conversion goals written down before anyone designs a pixel.' },
  { number: '03', title: 'Design & Build', description: 'Your dedicated Web, Branding and AI teams build to spec — accessible, fast, on-brand, and on the platform that fits your vertical.' },
  { number: '04', title: 'Launch & Support', description: 'We ship, measure, and keep improving — maintenance, optimization, and added automation as you grow.' }
]

const trustBadges = [
  { name: 'Clutch', logo: '🏆', url: 'https://clutch.co' },
  { name: 'GoodFirms', logo: '⭐', url: 'https://goodfirms.co' },
  { name: 'DesignRush', logo: '🎨', url: 'https://designrush.com' },
  { name: 'G2', logo: 'G2', url: 'https://g2.com' },
  { name: 'Trustpilot', logo: '🛡️', url: 'https://trustpilot.com' },
  { name: 'Upwork', logo: '⬆️', url: 'https://upwork.com' },
  { name: 'Google Reviews', logo: '📍', url: 'https://google.com/reviews' },
]

const faqs = [
  {
    question: 'Which industries does OnlineKarDo work with?',
    answer: 'E-commerce & Retail, Healthcare, Real Estate, Restaurants & Hospitality, Professional Services, Consulting, and Education & Training — each with a dedicated approach built to that sector\'s platforms, compliance, and buyer behaviour. If your niche isn\'t listed, a free audit will show you exactly how we\'d approach it.'
  },
  {
    question: 'Why do I need an industry-specific digital partner instead of a generalist?',
    answer: 'Because buyers compare you against vendors who already understand their world, and a generic site signals that you don\'t. Industry-fluent pages convert several times better because they speak the buyer\'s language, answer the sector\'s real objection, and remove its specific friction. The rules differ by vertical — PCI and speed for retail, HIPAA plus accessibility for healthcare, IDX listings for real estate — and we build to them.'
  },
  {
    question: 'Do you only build new sites, or can you redesign and rebuild what I already have?',
    answer: 'Both, equally. We are experts in redesign and redevelopment — auditing, replatforming, migrating, and fixing speed, SEO, accessibility and conversion on existing sites, as well as building from scratch. Most clients come to us to rebuild something that\'s underperforming.'
  },
  {
    question: 'Can one agency really handle web, branding, and the automation behind it?',
    answer: 'Yes, under one accountable partner with a dedicated expert team for each capability. A dedicated Web team, Branding team and AI team work on your project, owned by one account so nothing gets lost between vendors. You get specialist depth and one point of accountability, with no outsourcing or white-label markup.'
  },
  {
    question: 'Is your work compliant for regulated industries like healthcare and retail?',
    answer: 'We build to recognised standards — ADA/WCAG 2.1–2.2 AA accessibility on every project, HIPAA-aware architecture for healthcare, and PCI DSS-ready checkouts for retail. Compliance is both how we operate and what we build for your clients.'
  },
  {
    question: 'How do I know you\'re credible?',
    answer: 'Check the third-party platforms buyers use: verified reviews on Clutch, GoodFirms, G2, Trustpilot, Google, plus case studies you can read in full. Real per-platform scores, not a uniform five stars.'
  },
  {
    question: 'How do we get started?',
    answer: 'Start with a free audit of your website, brand or workflow. It\'s how every engagement begins — a real, sector-specific look at where you stand and the clearest path forward, with no obligation.'
  }
]

const stats = [
  { value: '7', label: 'Industries we build deep for' },
  { value: '3', label: 'Dedicated teams: Web, Branding & AI' },
  { value: '4', label: 'Global offices, four time zones' },
  { value: '37+', label: 'Countries served worldwide' }
]

/* ---------- Page ---------- */

export default function IndustriesPage() {
  const heroVignettes = [
    { label: 'Storefront', icon: ShoppingBag, image: '/assets/industries/storefront.jpg', color: '#e36a27' },
    { label: 'Clinic', icon: HeartPulse, image: '/assets/industries/clinic.jpg', color: '#7b91a0' },
    { label: 'Property', icon: House, image: '/assets/industries/property.jpg', color: '#779166' },
    { label: 'Restaurant', icon: Utensils, image: '/assets/industries/restaurant.jpg', color: '#d5a64b' },
    { label: 'Law office', icon: Briefcase, image: '/assets/industries/law-office.jpg', color: '#6b7280' },
    { label: 'Strategy', icon: GraduationCap, image: '/assets/industries/strategy.jpg', color: '#8b5cf6' },
  ]

  return (
    <div className="page-wrapper">
      <SEO
        title="Industries We Serve — Web, Branding & AI Tuned to Your Sector | OnlineKarDo"
        description="Digital solutions built for your industry rules: E-commerce, Healthcare, Real Estate, Restaurants, Professional Services, Consulting, Education. PCI, HIPAA, IDX, WCAG — we build to the standards your sector demands."
        canonical="/industries"
      />

      {/* Hero Section */}
      <section className="page-hero page-hero--industries !bg-gradient-to-br !from-[#102a3d] !via-[#087b87] !to-[#0d2638] !py-20 !text-white md:!py-28">
        <div className="container !max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
            <div className="!text-left lg:pr-6">
              <span className="eyebrow !text-[#55c9c0] !text-sm">Industries · who we build for</span>
              <h1 className="!max-w-4xl !text-5xl !leading-[.95] !tracking-[-.07em] !text-white md:!text-7xl mt-3">
                Who we build for web, branding and AI tuned to your industry <em className="!not-italic !text-[#55c9c0]">rules</em>
              </h1>
              <p className="hero-lede !mx-0 !max-w-xl !text-base !leading-relaxed !text-white/80 mt-5">
                Most agencies "serve" industries. We build for the specific way yours wins or loses online — the platforms, the compliance, and the buyer behaviour that decide your results.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="button button-primary !bg-[#55c9c0] !text-white hover:!bg-[#168b8f] !text-sm !px-5 !py-3" to="/contact">
                  Get a free audit <ArrowUpRight size={14} />
                </Link>
                <a href="#industries" className="button button-outline !border-white/30 !text-white hover:!bg-white/10 !text-sm !px-5 !py-3">
                  Jump to my industry <ChevronRight size={14} />
                </a>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="grid grid-cols-3 gap-3">
                {heroVignettes.map((v) => (
                  <div key={v.label} className="relative aspect-[4/5] rounded-[22px] overflow-hidden group" style={{ gridRow: 'span 2' }}>
                    <Photo
                      src={v.image}
                      alt={`${v.label} photo`}
                      icon={v.icon}
                      color={v.color}
                      iconSize={72}
                      className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                      <p className="text-sm font-medium text-white">{v.label}</p>
                    </div>
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <v.icon size={22} color="#fff" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-white/50 mt-5 text-sm max-w-xs mx-auto">
                Six worlds, one accountable roof: web, brand and AI behind every one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Build or Rebuild (directly below the hero) */}
      <section className="!bg-[#f6f3fb] !py-20 md:!py-24" id="build-rebuild">
        <div className="container !max-w-6xl">
          <div className="max-w-3xl">
            <span className="eyebrow flex items-center gap-3 !text-[#5b4fc4]">
              <span className="h-0.5 w-12 bg-[#55c9c0]" aria-hidden="true" />
              Build or rebuild
            </span>
            <h2 className="mt-4 !text-4xl !leading-[1.05] !tracking-[-.04em] text-[#14122b] md:!text-6xl">
              Building from zero, or fixing what you've got? Both doors open here.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#6b6880]">
              There are really only two situations in any industry: start fresh, or fix what's underperforming. We're built for both.
            </p>
            <p className="mt-5 leading-relaxed text-[#6b6880]">
              <strong className="text-[#14122b]">We are experts in redesign and redevelopment.</strong> Most teams who find us are in the second camp: a real estate site that never produced a lead, a healthcare site exposed on accessibility, a store losing sales at a sluggish checkout, a SaaS page drowning its own demo.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
            {/* Card: Start from zero */}
            <article className="rounded-[32px] border border-[#e8e0f3] bg-white p-8 md:p-10 shadow-[0_10px_36px_rgba(31,53,42,0.05)]">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e9e6f6] text-[#4b43b5]">
                  <Crosshair size={30} />
                </span>
                <span className="eyebrow !text-sm !text-[#5b4fc4]">Start from zero</span>
              </div>
              <h3 className="mt-8 text-3xl font-semibold tracking-tight text-[#14122b]">Build something new</h3>
              <p className="mt-4 text-lg leading-relaxed text-[#6b6880]">
                You're starting fresh, a brand, a store, a product, an internal tool, and you want it done right the first time, to your sector's rules, without juggling four vendors to get there.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Brand, site & automation scoped to your vertical',
                  'Built to your industry\'s platforms & compliance',
                  'One dedicated team per capability, one owner'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#14122b]">
                    <Check className="mt-1 shrink-0 text-[#2f9e6f]" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-[#14122b] px-7 py-4 font-semibold text-[#14122b] transition-colors hover:bg-[#14122b] hover:text-white">
                I'm starting fresh, let's scope it <ArrowRight size={18} />
              </Link>
            </article>

            {/* Before / After */}
            <Photo
              src={REBUILD_IMAGES.startFresh}
              alt="Shop owner turning the sign to open at the start of the day"
              icon={Crosshair}
              color="#779166"
              iconSize={96}
              className="h-full min-h-[320px] w-full rounded-[32px]"
            />
          </div>

          <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="order-2 lg:order-1">
              <BeforeAfter
                before={REBUILD_IMAGES.before}
                after={REBUILD_IMAGES.after}
                beforeAlt="A shop that only runs offline, with no online presence"
                afterAlt="The same kind of shop taking orders online on a laptop"
              />
            </div>

            {/* Card: Improve what exists */}
            <article className="order-1 rounded-[32px] border border-[#e8e0f3] bg-white p-8 md:p-10 shadow-[0_10px_36px_rgba(31,53,42,0.05)] lg:order-2">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fde9dc] text-[#c4501a]">
                  <Wrench size={30} />
                </span>
                <span className="eyebrow !text-sm !text-[#c4501a]">Improve what exists</span>
              </div>
              <h3 className="mt-8 text-3xl font-semibold tracking-tight text-[#14122b]">Rebuild what you've outgrown</h3>
              <p className="mt-4 text-lg leading-relaxed text-[#6b6880]">
                You already have a website, brand, or workflow that's underperforming: slow, off-brand, non-compliant, or simply not converting. We diagnose it and rebuild it without starting your business over.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Redesign & replatform with no SEO loss',
                  'Rebrand that protects existing equity',
                  'Re-automate brittle, manual processes'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#14122b]">
                    <Check className="mt-1 shrink-0 text-[#2f9e6f]" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-[#14122b] px-7 py-4 font-semibold text-[#14122b] transition-colors hover:bg-[#14122b] hover:text-white">
                Get a free audit <ArrowRight size={18} />
              </Link>
            </article>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-[#6b6880]">
            Every door begins the same way — an audit of what exists, or a scoping of what you're imagining — and ends with <strong className="text-[#14122b]">one accountable partner</strong>, with the right dedicated team owning the result.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-[#9a97ab]">
            Photos: Matthew Henry and Sarah Pflug via Burst by Shopify.
          </p>
        </div>
      </section>

      {/* Trust marquee */}
      <section className="!bg-white !py-14 border-y !border-[#e8e0f3] overflow-hidden">
        <style>{`
          @keyframes okd-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .okd-marquee { -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
          .okd-marquee-track { display: flex; width: max-content; animation: okd-marquee 32s linear infinite; }
          .okd-marquee:hover .okd-marquee-track, .okd-marquee:focus-within .okd-marquee-track { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .okd-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
            .okd-marquee-track { animation: none; }
            .okd-marquee-dup { display: none; }
          }
        `}</style>
        <p className="text-center text-sm font-semibold text-[#8b5cf6] tracking-wider uppercase mb-8">TRUSTED BY TEAMS THAT SHIP</p>
        <div className="okd-marquee">
          <div className="okd-marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className={`flex shrink-0 items-center ${copy === 1 ? 'okd-marquee-dup' : ''}`} aria-hidden={copy === 1 ? 'true' : undefined}>
                {trustBadges.map((badge) => (
                  <a
                    key={`${copy}-${badge.name}`}
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="mx-8 md:mx-12 flex shrink-0 items-center gap-2 whitespace-nowrap text-[#5d6962] opacity-70 transition hover:opacity-100 hover:text-[#087b87]"
                    aria-label={badge.name}
                  >
                    <span className="text-2xl">{badge.logo}</span>
                    <span className="font-medium text-sm">{badge.name}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Industry-Specific Section */}
      <section className="!py-24 !bg-white" id="why-industry">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">Why industry-specific</span>
            <h2>A great website isn't generic. It's fluent in your industry.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-[#5d6962] mb-6">
                Buyers don't compare agencies in a vacuum. They compare you against everyone who already gets their world, and in those first few seconds, a generic page does worse than nothing.
              </p>
              <p className="text-lg leading-relaxed text-[#5d6962] mb-6">
                Research on B2B buying shows that close to <strong>90% of buyers review multiple vendor sites</strong> before they'll even take a sales call. A generic page tells that visitor — and increasingly the AI assistant doing the shortlisting on their behalf — that you don't understand their business.
              </p>
              <p className="text-lg leading-relaxed text-[#5d6962] mb-8">
                The difference is measurable, not cosmetic. Average B2B pages convert at roughly <strong>2–5%</strong>; pages engineered for one specific intent and audience can clear <strong>13%</strong>. Same traffic, multiples more pipeline, because the page speaks the buyer's language, answers the objection their sector actually has, and removes the friction unique to their funnel.
              </p>
              <p className="text-lg leading-relaxed text-[#5d6962]">
                That fluency looks different in every vertical: a checkout that survives PCI DSS and loads in under two seconds for retail; HIPAA and accessibility running side by side for healthcare; live MLS listings search engines can crawl for real estate; commission-free ordering for restaurants; an interactive product demo for SaaS. <strong>We build to those rules, then wrap brand and automation around them.</strong>
              </p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '📊', value: '~90%', text: 'of B2B buyers check multiple vendor sites first', color: '#e36a27' },
                  { icon: '📉', value: '2–5%', text: 'typical conversion of a generic page', color: '#7b91a0' },
                  { icon: '📈', value: 'up to 13%', text: 'when the page is built for the audience', color: '#779166' },
                  { icon: '⚡', value: '3–6x', text: 'more pipeline from same traffic', color: '#d5a64b' },
                ].map((s) => (
                  <div key={s.value} className="!rounded-[22px] border border-[#e5e0d5] !bg-[#fffdf7] !p-6 !shadow-[0_10px_36px_rgba(31,53,42,0.06)]" style={{ borderTop: `4px solid ${s.color}` }}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-3xl">{s.icon}</span>
                      <strong className="text-xl">{s.value}</strong>
                    </div>
                    <p className="text-sm text-[#5d6962]">{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-[#f6f3fb] rounded-[22px]">
                <h4 className="font-semibold text-[#243b4d] mb-4">Generic template vs Industry-fluent</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-xl border border-[#e8e0f3]">
                    <h5 className="font-semibold text-[#e36a27] mb-2">Generic template</h5>
                    <ul className="space-y-1 text-[#5d6962]">
                      <li>• Any industry stock layout</li>
                      <li>• No sector proof or benchmarks</li>
                      <li>• Generic, one-size call to action</li>
                      <li>• Compliance story unclear</li>
                      <li className="font-semibold text-[#e36a27]">Converts ~2–5%</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#e8e0f3]">
                    <h5 className="font-semibold text-[#087b87] mb-2">Industry-fluent</h5>
                    <ul className="space-y-1 text-[#5d6962]">
                      <li>{'• PCI · <2s / HIPAA · WCAG / IDX · MLS'}</li>
                      <li>• Speaks the buyer's language</li>
                      <li>• Answers the sector's real objection</li>
                      <li>• Built to the rule of that world</li>
                      <li className="font-semibold text-[#087b87]">Up to 13%</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-[#818781] mt-4 text-center">Industry benchmarks, not a guarantee. Your numbers depend on your traffic, offer and build.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One Roof - Three Capabilities */}
      <section className="!py-24 !bg-[#f6f3fb]" id="capabilities">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">One roof</span>
            <h2>Three capabilities, one accountable partner for your sector</h2>
            <p className="mt-4 max-w-2xl mx-auto text-[#5d6962]">
              Whatever industry you pick, the same three teams work behind it, and they all answer to one account, so nothing falls between vendors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {capabilities.map((cap, index) => {
              const c = ['#087b87', '#e36a27', '#8b5cf6'][index]
              return (
                <Link key={cap.name} to={index === 0 ? '/web-development' : '/services'} className="capability-card group">
                  <div className="!rounded-[22px] border border-[#e5e0d5] !bg-white !p-8 !shadow-[0_10px_36px_rgba(31,53,42,0.06)] hover:!-translate-y-1 hover:!shadow-xl transition-all duration-300" style={{ borderTop: `4px solid ${c}` }}>
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: `${c}1a` }}>
                      <cap.icon size={32} style={{ color: c }} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#102a3d] mb-4">{cap.name}</h3>
                    <p className="text-[#5d6962] leading-relaxed">{cap.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Users, name: 'Web', sub: 'dedicated team', c: '#087b87' },
              { icon: Palette, name: 'Branding', sub: 'dedicated team', c: '#e36a27' },
              { icon: Bot, name: 'AI Automation', sub: 'dedicated team', c: '#8b5cf6' },
              { icon: Shield, name: 'One accountable', sub: 'account, no markup', c: '#55c9c0' },
            ].map((t) => (
              <div key={t.name} className="bg-white p-6 rounded-[22px] border border-[#e8e0f3]">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: `${t.c}1a` }}>
                  <t.icon size={24} style={{ color: t.c }} />
                </div>
                <h4 className="font-semibold text-[#102a3d] mb-1">{t.name}</h4>
                <p className="text-xs text-[#5d6962]">{t.sub}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[#5d6962] mt-8 text-sm">
            Three teams, one account line, the whole outcome owned end to end.
          </p>
        </div>
      </section>

      {/* Choose Your Industry (real photos) */}
      <section className="!py-24 !bg-white" id="industries">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">Choose your world</span>
            <h2>Choose your industry</h2>
            <p className="mt-4 max-w-2xl mx-auto text-[#5d6962]">
              Each page below is built as if it's all we do, with the compliance, platforms, and proof that sector demands, and two clear doors: build new, or rebuild what you have.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {industries.map((industry) => (
              <Link key={industry.id} to={industry.href} className="industry-card group">
                <div className="industry-card-inner !rounded-[22px] overflow-hidden border border-[#e5e0d5] !bg-white !shadow-[0_10px_36px_rgba(31,53,42,0.06)] hover:!shadow-xl transition-all duration-300 h-full">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Photo
                      src={industry.image}
                      alt={industry.alt}
                      icon={industry.icon}
                      color={industry.color}
                      className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                        <industry.icon size={16} /> {industry.vignette}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#102a3d] mb-2 group-hover:text-[#087b87] transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#102a3d] mb-2">{industry.tagline}</p>
                    <p className="text-sm text-[#5d6962] mb-4 line-clamp-3">{industry.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {industry.platforms.slice(0, 3).map(platform => (
                        <span key={platform} className="px-2 py-1 text-xs rounded-full border border-[#e5e0d5] bg-[#fffdf7] text-[#5d6962]">{platform}</span>
                      ))}
                      {industry.platforms.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full border border-[#e5e0d5] bg-[#fffdf7] text-[#5d6962]">+{industry.platforms.length - 3} more</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#e5e0d5]">
                      <span className="text-sm font-semibold text-[#087b87]">Explore</span>
                      <ArrowRight className="text-[#087b87] group-hover:translate-x-1 transition-transform" size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#5d6962] mb-4">Don't see your exact niche?</p>
            <Link to="/contact" className="button button-primary inline-flex">Get a free audit and we'll tell you how we'd build for it <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="!py-24 !bg-[#f6f3fb]" id="process">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">How we work</span>
            <h2>The same disciplined path in every industry</h2>
            <p className="mt-4 max-w-2xl mx-auto text-[#5d6962]">
              No mystery, no hand-offs into the void. The same four senior steps run behind every build and every rebuild.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {processSteps.map((step) => (
              <div key={step.number} className="!rounded-[22px] border border-[#e5e0d5] !bg-[#fffdf7] !p-6 !shadow-[0_10px_36px_rgba(31,53,42,0.06)] h-full">
                <span className="text-3xl font-bold text-[#087b87]/20 mb-4 block">{step.number}</span>
                <h3 className="text-xl font-bold text-[#102a3d] mb-4">{step.title}</h3>
                <p className="text-[#5d6962] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#5d6962] mb-4">Every project starts with the free audit in step one, no commitment to go further.</p>
            <Link to="/contact" className="button button-outline">See our full process <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="!py-24 !bg-[#102a3d] !text-white" id="stats">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow !text-[#55c9c0]">By the numbers</span>
            <h2 className="!text-white">One studio, measured in what matters</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl md:text-7xl font-bold tracking-tight text-[#55c9c0] font-['Space_Grotesk'] mb-4">{stat.value}</div>
                <div className="text-white/70 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-white/50 mt-12 max-w-2xl mx-auto">
            Four offices — India, USA, Canada and UAE — serving clients in 37+ countries worldwide.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="!py-24 !bg-[#f6f3fb]" id="faq">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">Questions</span>
            <h2>Straight answers, by industry</h2>
          </div>

          <div className="max-w-3xl mx-auto mt-16 space-y-4">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group bg-white rounded-[16px] border border-[#e8e0f3] overflow-hidden" open={index === 0}>
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-[#102a3d] pr-8">{faq.question}</h3>
                  <ChevronRight className="text-[#5d6962] group-open:rotate-90 transition-transform shrink-0" size={20} />
                </summary>
                <div className="px-6 pb-6 pt-4 text-[#5d6962] leading-relaxed border-t border-[#e8e0f3]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="!py-24 !bg-gradient-to-br !from-[#102a3d] !via-[#087b87] !to-[#0d2638] !text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <span className="eyebrow !text-[#55c9c0]">Tell us your world</span>
            <h2 className="!text-5xl md:!text-6xl !leading-[.95] !tracking-[-.07em] mt-4 mb-6">Tell us your industry. We'll show you what's possible.</h2>
            <p className="!text-white/80 !text-lg mb-8 max-w-xl mx-auto">
              Whether you're building your first site, rebranding for a new chapter, or rebuilding something that's quietly costing you customers, start with a free audit. No obligation, no generic checklist.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="button button-primary !bg-[#55c9c0] !text-white hover:!bg-[#168b8f]">
                Get a free audit <ArrowUpRight size={15} />
              </Link>
              <Link to="/contact" className="button button-outline !border-white/30 !text-white hover:!bg-white/10">
                Talk to the team <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
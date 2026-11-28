import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Boxes, Check, ChevronDown, Gauge, Layers, MessageCircle, Palette, Repeat, Search, ShieldCheck, ShoppingBag, ShoppingCart, Smartphone, Sparkles, Star, Store, Truck, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

/* ---------- Photos (free to use, Burst by Shopify). Swap for your own paths any time. ---------- */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1600&format=pjpg&exif=0&iptc=0`
const IMG = {
  heroMain: burst('business-owner-working-on-online-store'),
  heroSide: burst('store-owners-hands-typing-away'),
  band: burst('person-shops-in-a-clothing-store'),
  buildNew: burst('shop-owner-gets-ready'),
  rebuild: burst('a-happy-store-owner-opens-for-the-day'),
  fashion: burst('person-browses-clothing-racks-in-a-store'),
  beauty: burst('makeup-and-beauty-products'),
  food: burst('shelves-filled-with-glassware-and-jars-of-preserves'),
  home: burst('grey-and-gold-living-room-interior-design'),
  wellness: burst('herbal-vitamins'),
  wholesale: burst('boxes-on-warehouse-shelves'),
  cta: burst('photo-of-people-shopping-in-a-clothing-store'),
}

const ORANGE = '#e36a27'
const TEAL = '#087b87'
const MINT = '#55c9c0'

/* ---------- Data ---------- */
const funnel = [
  { label: 'Visitors land', value: '100%', width: 100, note: <><b>53%</b> of mobile visitors leave a page that takes more than 3 seconds to load. <i>Google</i></> },
  { label: 'Browse products', width: 72, note: <>Mobile brings most store traffic but usually converts at about <b>half the desktop rate</b>.</> },
  { label: 'Add to cart', width: 52, note: <>Around <b>70%</b> of carts are abandoned before checkout. <i>Baymard Institute</i></> },
  { label: 'Reach checkout', width: 38, note: <><b>48%</b> abandon because of extra costs such as shipping, tax or fees that appear late. <i>Baymard</i></> },
  { label: 'Purchase', value: '~2–3%', width: 24 },
]

const leaks = [
  { icon: ShoppingCart, title: 'Checkout friction', tag: '~70% abandon', text: 'Across dozens of studies, about 70% of carts are abandoned. The top trigger is unexpected extra costs showing up late. Forced sign-up, long forms and weak trust signals follow close behind.', source: 'Baymard Institute' },
  { icon: Gauge, title: 'Slow pages', tag: '0.1s → 8.4%', text: 'Google and Deloitte found that a 0.1 second faster mobile load lifted conversions by 8.4% and order value by 9.2%. Over half of mobile visitors leave if a page takes more than 3 seconds.', source: 'Google / Deloitte' },
  { icon: Smartphone, title: 'The mobile gap', tag: '~½ desktop', text: 'Most shoppers now browse on a phone, yet phones typically convert at about half the rate of desktop. A store that isn’t built for thumbs first leaves its biggest audience behind.', source: 'Industry benchmarks' },
  { icon: ShieldCheck, title: 'Trust gaps', tag: 'up to 95%', text: 'Shoppers won’t pay on a store that doesn’t feel safe. Reviews, clear return policies and visible security cues decide whether the sale completes, and most shoppers read reviews before buying.', source: 'Baymard Institute' },
]

const storefront = ['Store structure and navigation', 'Product and category pages that sell', 'A short, clear checkout', 'Payments, shipping and tax setup', 'Fast loading on mobile networks', 'Search-friendly product markup']
const behindStore = ['WhatsApp ordering and order updates', 'Payment links and UPI via Razorpay', 'Shipping with Shiprocket or Delhivery', 'Stock and order sheets that stay in sync']

const platformFilters = ['All', 'Speed & scale', 'Full ownership', 'Big catalogue', 'Lean & self-managed', 'Max performance'] as const
type Filter = (typeof platformFilters)[number]
const platforms: { name: string; icon: typeof Store; blurb: string; tags: Filter[]; chips: string[] }[] = [
  { name: 'Shopify', icon: ShoppingBag, blurb: 'The quickest route to a fast, reliable store. Built-in hosting, checkout and a large app ecosystem, so there is little to maintain.', tags: ['Speed & scale'], chips: ['Fast launch', 'Low upkeep'] },
  { name: 'WooCommerce', icon: Boxes, blurb: 'Full ownership on WordPress. A good fit when content, blogging and the store live together and you want complete control.', tags: ['Full ownership', 'Big catalogue'], chips: ['Ownership', 'Content + store'] },
  { name: 'Webflow', icon: Palette, blurb: 'Design-led stores for smaller catalogues and lean teams who want a distinctive look and easy self-management.', tags: ['Lean & self-managed'], chips: ['Design-led', 'Self-manage'] },
  { name: 'Custom React / Next.js', icon: Layers, blurb: 'Built from scratch for unusual models such as marketplaces, subscriptions or B2B pricing, when no template fits.', tags: ['Big catalogue', 'Max performance'], chips: ['Unique models', 'Flexible'] },
  { name: 'Headless commerce', icon: Sparkles, blurb: 'A decoupled front end for ultra-fast, fully branded storefronts across web and app, when speed and experience are the edge.', tags: ['Max performance', 'Speed & scale'], chips: ['Ultra-fast', 'Composable'] },
]

const conversionPoints = [
  { icon: ShoppingCart, title: 'Checkout that completes', text: 'Fewer fields, guest checkout, the full cost shown early, UPI and card options, and visible security, designed against the real reasons shoppers leave.' },
  { icon: Gauge, title: 'Speed as a feature', text: 'Lean pages, compressed images and caching from the first wireframe, because tenths of a second move real money.' },
  { icon: Smartphone, title: 'Mobile-first, always', text: 'Designed for the thumb and the small screen first, where most of your traffic and most of your lost sales live.' },
  { icon: Star, title: 'Trust that closes', text: 'Reviews, clear shipping and returns, and security cues placed exactly where shoppers hesitate.' },
  { icon: Search, title: 'Product pages that sell', text: 'Clear galleries, scannable details, smart cross-sell and structured data so search engines and AI assistants can read your products.' },
]

const processSteps = [
  { title: 'Audit & discovery', text: 'We check your store’s speed, checkout, mobile experience and conversion leaks. For a new store, we start from your products, customers and goals.' },
  { title: 'Strategy & scope', text: 'Platform recommendation, store structure, integrations, timeline and a fixed scope, so you know what’s included before work starts.' },
  { title: 'Design & build', text: 'Mobile-first design, product and checkout pages, payments and integrations, reviewed with you at each milestone.' },
  { title: 'Migrate & launch', text: 'For rebuilds: data migration, URL mapping and 301 redirects, tracking checked before go-live. For new stores: payment and order testing, then launch.' },
  { title: 'Support & optimise', text: 'After launch we monitor, maintain and keep improving conversion so the store doesn’t slowly decay.' },
]

const categories = [
  { name: 'Fashion & apparel', text: 'Visual-first pages, size confidence, fast galleries and easy returns that turn browsers into repeat buyers.', icon: ShoppingBag, image: IMG.fashion },
  { name: 'Beauty & personal care', text: 'Reviews, repeat purchases and quick mobile buying built for impulse and replenishment.', icon: Sparkles, image: IMG.beauty },
  { name: 'Food & beverage', text: 'Speed, bundles and effortless reordering, among the best-converting categories when the experience is quick.', icon: Store, image: IMG.food },
  { name: 'Home & high-value items', text: 'Richer content, EMI options and trust-building for bigger decisions with longer journeys.', icon: Boxes, image: IMG.home },
  { name: 'Health & wellness', text: 'Compliance-aware, subscription-friendly product pages that build credibility before the sale.', icon: ShieldCheck, image: IMG.wellness },
  { name: 'B2B & wholesale', text: 'Account pricing, bulk and quote ordering and accounting integration, built for how businesses buy.', icon: Truck, image: IMG.wholesale },
]

const reasons = [
  'One accountable lead, with specialists for web, commerce and local setup.',
  'Fixed scope and upfront pricing, with clear packs for simple stores.',
  'Built for Indian shoppers: UPI, COD, WhatsApp ordering and local shipping partners.',
  'Card payments run through PCI-compliant gateways such as Razorpay, so we never store card details.',
  'Mobile-first by default, because that is where your customers are.',
]

const costDrivers = [
  { icon: Layers, title: 'Platform & build type', text: 'A template launch costs far less than a custom or headless build.', from: 'Template', to: 'Custom' },
  { icon: Boxes, title: 'Catalogue & complexity', text: 'Number of products, variants, pricing rules and B2B logic.', from: 'Small', to: 'Complex' },
  { icon: Repeat, title: 'Integrations', text: 'Payments, shipping, accounting, subscriptions and marketplaces.', from: 'Few', to: 'Many' },
  { icon: Truck, title: 'Migration scope', text: 'For rebuilds, how large and messy the data and URL set is.', from: 'Clean', to: 'Large' },
  { icon: Palette, title: 'Design depth', text: 'A theme-based build versus fully custom design and content.', from: 'Theme', to: 'Custom' },
]

const integrations = ['Razorpay', 'Shiprocket', 'Delhivery', 'WhatsApp Business', 'Klaviyo', 'Google Merchant Center', 'Meta Conversions API', 'Google Analytics 4', 'UPI & cards', 'Cash on delivery']

const faqs: [string, string][] = [
  ['Which platform should I choose?', 'Shopify for speed to market and low upkeep. WooCommerce for control and content-rich sites. Custom for unusual models such as marketplaces, subscriptions or B2B. The audit helps you decide, and we don’t push a platform just because we use it.'],
  ['Can you migrate my existing store?', 'Yes. We move products, customers, orders, URLs and reviews, set up 301 redirects, check the data, and run the old and new stores side by side before the switch.'],
  ['How much does an online store cost?', 'It depends on the platform, catalogue size, integrations, design depth and, for rebuilds, migration. For a simple catalogue, our Seller Digital Pack starts at ₹6,999. Larger builds are scoped after the audit with a fixed, itemised proposal.'],
  ['Will I lose SEO rankings if I rebuild?', 'Not if it’s done properly. We map your important URLs, set up 301 redirects, check tracking before launch and use a phased go-live to protect the traffic you’ve earned.'],
  ['What about inventory across channels?', 'We can connect your store to accounting, POS or stock tools such as Zoho, Tally or Unicommerce so stock stays consistent across your store and marketplaces. Scope depends on your setup.'],
  ['What are the ongoing costs?', 'Typically a platform subscription, payment gateway fees, any paid apps, and domain and hosting where needed. We share a clear cost sheet upfront so there are no surprises.'],
  ['Is checkout secure?', 'Card and UPI payments run through established gateways such as Razorpay, which handle card data and security compliance. We set it up correctly and never store card details on your site.'],
  ['What happens after launch?', 'You’re not left alone. Our monthly care plans cover uptime checks, backups, content updates and social posts, and we can keep improving conversion over time.'],
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

function CountUp({ to, decimals = 1, suffix = '', run }: { to: number; decimals?: number; suffix?: string; run: boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1)
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])
  return <>{v.toFixed(decimals)}{suffix}</>
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0)
  return <div ref={ref} className={`ec-reveal ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Photo({ src, alt, className = '', tint = ORANGE }: { src: string; alt: string; className?: string; tint?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={className} style={{ background: `linear-gradient(135deg, ${tint}22, ${tint}55)` }} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

function Marquee({ children, duration = 40, reverse = false }: { children: ReactNode; duration?: number; reverse?: boolean }) {
  return (
    <div className="ec-marquee">
      <div className="ec-track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div className="ec-set">{children}</div>
        <div className="ec-set ec-dup" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

// Drag-to-compare: a long, cluttered checkout vs a short one.
function CheckoutCompare() {
  const [pos, setPos] = useState(50)
  const field = (t: string, dim = false) => (
    <div className={`rounded-lg border px-3 py-2 text-xs ${dim ? 'border-[#e5e7eb] bg-[#f3f4f6] text-[#9ca3af]' : 'border-[#d1d5db] bg-white text-[#6b7280]'}`}>{t}</div>
  )
  return (
    <div className="relative h-[430px] select-none overflow-hidden rounded-[28px] border border-white/10 bg-[#f4f6f8] shadow-[0_30px_70px_rgba(0,0,0,.35)]">
      {/* After (full) */}
      <div className="absolute inset-0 bg-white p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#087b87]">Checkout · after</p>
        <div className="space-y-2.5">
          {field('Mobile number or email')}
          {field('Shipping address')}
          <div className="grid grid-cols-3 gap-2">
            {['UPI', 'Card', 'COD'].map((m, i) => <div key={m} className={`rounded-lg border px-3 py-2 text-center text-xs font-semibold ${i === 0 ? 'border-[#087b87] bg-[#e6f4f5] text-[#087b87]' : 'border-[#d1d5db] text-[#6b7280]'}`}>{m}</div>)}
          </div>
          <div className="flex justify-between rounded-lg bg-[#f3f8fa] px-3 py-2 text-xs text-[#33424e]"><span>Total, shipping and tax included</span><b>₹1,499</b></div>
          <div className="rounded-full bg-[#087b87] py-2.5 text-center text-sm font-bold text-white">Review & pay</div>
          <p className="text-center text-[11px] text-[#6b7782]">Guest checkout · secure payment</p>
        </div>
      </div>
      {/* Before (clipped) */}
      <div className="absolute inset-0 bg-[#f4f6f8] p-6" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#e36a27]">Checkout · before</p>
        <div className="space-y-2">
          {['Email', 'First name', 'Last name', 'Address line 1', 'Address line 2', 'City / State / PIN', 'Phone number', 'Create a password'].map((t) => field(t, true))}
          <p className="pt-1 text-[11px] text-[#9ca3af]">+ Shipping and tax shown at the next step · account required</p>
        </div>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 hidden" />
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.1)]" style={{ left: `${pos}%` }} />
      <div className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg" style={{ left: `${pos}%` }}>
        <span className="text-[#102a3d]">↔</span>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Drag to compare checkout before and after" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  )
}

const styles = `
@keyframes ec-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes ec-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes ec-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.ec-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.ec-track { display: flex; width: max-content; animation: ec-scroll 40s linear infinite; }
.ec-marquee:hover .ec-track { animation-play-state: paused; }
.ec-set { display: flex; flex-shrink: 0; align-items: center; }
.ec-hero > * { opacity: 0; animation: ec-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.ec-hero > *:nth-child(1){animation-delay:.05s} .ec-hero > *:nth-child(2){animation-delay:.15s} .ec-hero > *:nth-child(3){animation-delay:.27s} .ec-hero > *:nth-child(4){animation-delay:.39s} .ec-hero > *:nth-child(5){animation-delay:.5s}
.ec-float { animation: ec-float 7s ease-in-out infinite; }
.ec-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.ec-reveal.is-in { opacity: 1; transform: none; }
.ec-bar { transform-origin: center; transform: scaleX(0); transition: transform 1s cubic-bezier(.2,.7,.2,1); }
.is-in .ec-bar, .ec-bar.is-in { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) {
  .ec-track, .ec-float { animation: none; }
  .ec-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .ec-dup { display: none; }
  .ec-hero > * { opacity: 1; animation: none; }
  .ec-reveal { opacity: 1; transform: none; transition: none; }
  .ec-bar { transform: none; transition: none; }
}
`

/* ---------- Page ---------- */
export default function EcommerceRetailPage() {
  const { openEnquiry } = useEnquiry()
  const audit = () => openEnquiry('E-commerce & Retail')
  const [filter, setFilter] = useState<Filter>('All')
  const [funnelRef, funnelSeen] = useInView<HTMLDivElement>(0.25)

  return (
    <div className="page-wrapper">
      <SEO
        title="E-commerce & Retail — Online Stores Built to Sell | OnlineKarDo"
        description="Online stores for Indian retail brands on Shopify, WooCommerce or custom stacks. Fast mobile checkout, UPI and WhatsApp ordering, secure payments. Build new or rebuild. Free store audit."
        canonical="/industries/ecommerce-retail"
      />
      <style>{styles}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff4ed] via-[#ffeadb] to-[#ffe0c8] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="ec-hero">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-[#c4581a]">
              <span className="h-2 w-2 rounded-full" style={{ background: ORANGE }} /> For retail, D2C and B2B-commerce brands
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[.95] tracking-[-.05em] text-[#102a3d] md:text-7xl">
              Online stores built to sell, <span style={{ color: ORANGE }}>not just to look good.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#4b5b68]">
              We build stores around the four things that move revenue: speed, checkout, mobile and trust. Whether you’re launching your first store or rescuing one that leaks sales, you get one accountable partner.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-[#4b5b68]">
              Most stores don’t have a traffic problem, they have a conversion problem. Roughly 7 in 10 carts are abandoned before checkout. <b className="text-[#102a3d]">We exist to close that gap.</b>
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={audit} className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ORANGE }}>
                Get a free store audit <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a href="#doors" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-7 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">Build new or rebuild</a>
            </div>
          </div>

          <div className="relative mx-auto hidden h-[460px] w-full max-w-[480px] lg:block">
            <div className="ec-float absolute left-0 top-0 h-[340px] w-72 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(196,88,26,.3)]">
              <Photo src={IMG.heroMain} alt="Store owner managing an online store on a laptop" className="h-full w-full" />
            </div>
            <div className="ec-float absolute bottom-0 right-0 h-60 w-60 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(196,88,26,.3)]" style={{ animationDelay: '-3s' }}>
              <Photo src={IMG.heroSide} alt="Hands typing on a laptop checking online orders" className="h-full w-full" />
            </div>
            <div className="absolute right-2 top-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><MessageCircle size={16} className="text-[#25a244]" /> New order on WhatsApp</div>
            <div className="absolute bottom-24 left-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><Check size={16} className="text-[#087b87]" /> Paid via UPI</div>
          </div>
        </div>
      </section>

      {/* Integrations marquee */}
      <section className="border-b border-[#f0e3d8] bg-white py-7" aria-label="Integrations we set up">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[.18em] text-[#6b7782]">Tools and channels we connect</p>
        <Marquee duration={50}>
          {integrations.map((n) => <span key={n} className="mx-3 whitespace-nowrap rounded-full border border-[#f0dccb] bg-[#fff8f2] px-5 py-2.5 text-sm font-semibold text-[#102a3d]">{n}</span>)}
        </Marquee>
      </section>

      {/* The stakes */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0e1a33] to-[#0a1224] py-20 text-white md:py-28">
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-[#087b87]/25 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal className="max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>The stakes</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">Where online stores quietly lose money.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">A store can look beautiful and still bleed sales. The leaks are predictable, measurable and fixable, and they’re exactly what we design against.</p>
          </Reveal>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.05fr_1fr]">
            {/* Funnel */}
            <div ref={funnelRef} className={`rounded-[32px] border border-white/10 bg-white/[.04] p-6 md:p-8 ${funnelSeen ? 'is-in' : ''}`}>
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>The leaky funnel</span>
                <span className="text-white/55">Illustrative drop-off · figures cited</span>
              </div>
              <div className="mt-6 space-y-3">
                {funnel.map((f, i) => (
                  <div key={f.label}>
                    <div
                      className="ec-bar mx-auto flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-semibold"
                      style={{
                        width: `${f.width}%`,
                        transitionDelay: `${i * 140}ms`,
                        background: i === funnel.length - 1 ? `linear-gradient(90deg, ${MINT}, #7bd8d0)` : i === funnel.length - 2 ? `linear-gradient(90deg, ${TEAL}, ${ORANGE})` : 'linear-gradient(90deg, #5b57b8, #4a55a8)',
                        color: i === funnel.length - 1 ? '#0e1a33' : '#fff',
                      }}
                    >
                      <span>{f.label}</span>
                      {f.value && <span className="text-xl font-bold">{f.value}</span>}
                    </div>
                    {f.note && (
                      <p className="mt-2 flex items-start gap-2 px-2 pt-1 text-[13px] leading-snug text-white/70">
                        <ArrowDown size={14} className="mt-0.5 shrink-0" style={{ color: MINT }} /> <span className="[&_b]:text-white [&_i]:text-white/45 [&_i]:not-italic [&_i]:before:content-['·_']">{f.note}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div>
                  <p className="text-4xl font-bold" style={{ color: MINT }}><CountUp to={8.4} suffix="%" run={funnelSeen} /></p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">More conversions</p>
                </div>
                <div>
                  <p className="text-4xl font-bold" style={{ color: MINT }}><CountUp to={9.2} suffix="%" run={funnelSeen} /></p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">Higher order value</p>
                </div>
                <p className="col-span-2 text-xs text-white/55">From a 0.1-second mobile speed improvement · Google / Deloitte</p>
              </div>
            </div>

            {/* Leak cards */}
            <div className="space-y-4">
              {leaks.map((l, i) => (
                <Reveal key={l.title} delay={i * 90}>
                  <article className="rounded-[24px] border border-white/10 bg-white/[.04] p-6 transition hover:bg-white/[.07]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"><l.icon size={22} style={{ color: MINT }} /></span>
                        <h3 className="text-xl font-semibold">{l.title}</h3>
                      </div>
                      <span className="text-sm font-bold" style={{ color: MINT }}>{l.tag}</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">{l.text} <span className="text-white/40">· {l.source}</span></p>
                  </article>
                </Reveal>
              ))}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button onClick={audit} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-[#0e1a33] transition hover:-translate-y-0.5" style={{ background: MINT }}>Find my store’s leaks, free <ArrowUpRight size={16} /></button>
                <p className="max-w-xs text-xs text-white/50">We don’t guess. The audit measures yours, then we design the fixes. ~2–3% is a representative store conversion benchmark.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle band */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.band} alt="Shopper browsing and buying in a clothing store" tint={TEAL} className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a1224]/90 via-[#0a1224]/65 to-[#0a1224]/30" />
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>Every visit counts</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">Your store is open every hour of every day. The question is whether it sells.</h2>
            <p className="mt-5 text-lg text-white/80">Most stores lose customers at the same few moments. Those moments are fixable, and finding them is what a free audit does.</p>
            <button onClick={audit} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-[#102a3d] transition hover:-translate-y-0.5">Find my store’s leaks, free <ArrowUpRight size={17} /></button>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ORANGE }}>What we do</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">A store you can sell from, and the setup behind it.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">We design and build the storefront on the platform that fits your business, plus the ordering, payment and shipping setup that keeps it running smoothly.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <article className="h-full rounded-[28px] border border-[#f0e3d8] bg-[#fff8f2] p-8">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ORANGE }}>What shoppers see</p>
                <h3 className="mt-2 text-2xl font-bold text-[#102a3d]">The storefront</h3>
                <p className="mt-2 text-[#5e6b76]">Everything between landing and “order confirmed”, built to convert.</p>
                <ul className="mt-5 space-y-3">{storefront.map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ORANGE }} /> {s}</li>)}</ul>
              </article>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <article className="h-full rounded-[28px] bg-[#102a3d] p-8 text-white">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: MINT }}>What keeps you running</p>
                <h3 className="mt-2 text-2xl font-bold">Behind the store</h3>
                <p className="mt-2 text-white/70">The ordering and back-office setup that saves you time every day.</p>
                <ul className="mt-5 space-y-3">{behindStore.map((s) => <li key={s} className="flex items-start gap-3 text-white/90"><Check size={18} className="mt-0.5 shrink-0" style={{ color: MINT }} /> {s}</li>)}</ul>
                <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-[#102a3d] transition hover:-translate-y-0.5" style={{ background: MINT }}>Talk to our store team <ArrowUpRight size={16} /></button>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Two doors */}
      <section id="doors" className="bg-[#fff4ed] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ORANGE }}>Two equal doors</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Two doors. Both lead to a store that sells.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">There are only two kinds of store owner: those starting from zero and those rebuilding what they already have. We’re built for both.</p>
          </Reveal>
          <div className="space-y-6">
            <Reveal>
              <article className="grid overflow-hidden rounded-[32px] border border-[#f0dccb] bg-white md:grid-cols-2">
                <Photo src={IMG.buildNew} alt="Owner getting a new shop ready to open" className="h-64 w-full md:h-full" />
                <div className="p-8 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ORANGE }}>Build from zero</p>
                  <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Launch a new store</h3>
                  <p className="mt-3 text-[#5e6b76]">For new brands and first online stores. We take you from idea to launch and pick a platform for where you’re headed, not just where you are today.</p>
                  <ul className="mt-5 space-y-2.5">{['Store structure and UX', 'Brand-true product pages', 'Simple checkout, payments and shipping', 'A platform chosen for your roadmap'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ORANGE }} /> {s}</li>)}</ul>
                  <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d] px-6 py-3 font-bold text-[#102a3d] transition hover:bg-[#102a3d] hover:text-white">Plan my new store <ArrowRight size={16} /></button>
                </div>
              </article>
            </Reveal>
            <Reveal>
              <article className="grid overflow-hidden rounded-[32px] border border-[#f0dccb] bg-white md:grid-cols-2">
                <div className="order-2 p-8 md:order-1 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: ORANGE }}>Rebuild what exists</p>
                  <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Redesign and replatform</h3>
                  <p className="mt-3 text-[#5e6b76]">For stores that are slow, dated, hard to manage or on the wrong platform. We audit the live store, fix the conversion leaks and move you without losing the rankings and traffic you’ve earned.</p>
                  <p className="mt-4 rounded-xl bg-[#fff4ed] p-4 text-sm text-[#7a3a14]"><b>Replatforming is where stores lose money</b> when it’s done badly: rankings drop, tracking breaks and order history goes missing. We protect all three.</p>
                  <ul className="mt-5 space-y-2.5">{['URL mapping and 301 redirects for your key pages', 'Data checks across products and orders', 'Tracking tested before go-live', 'A phased launch with minimal downtime'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: ORANGE }} /> {s}</li>)}</ul>
                  <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d] px-6 py-3 font-bold text-[#102a3d] transition hover:bg-[#102a3d] hover:text-white">Audit my existing store <ArrowRight size={16} /></button>
                </div>
                <Photo src={IMG.rebuild} alt="Shop owner opening for the day after a successful relaunch" className="order-1 h-64 w-full md:order-2 md:h-full" />
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ORANGE }}>Platform-agnostic by principle</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">The right platform for your business, not the one we happen to prefer.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">The best platform fits your catalogue, team, budget and plans. Tell us what matters most and the matching options light up.</p>
          </Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter platforms by what matters most">
            {platformFilters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f} className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${filter === f ? 'border-[#102a3d] bg-[#102a3d] text-white' : 'border-[#e0eaee] bg-white text-[#33424e] hover:border-[#102a3d]'}`}>{f}</button>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map((p) => {
              const match = filter === 'All' || p.tags.includes(filter)
              return (
                <article key={p.name} className={`rounded-[24px] border p-7 transition duration-300 ${match ? 'border-[#f0dccb] bg-[#fff8f2] opacity-100' : 'scale-[.98] border-[#eee] bg-white opacity-40'} ${match && filter !== 'All' ? 'ring-2 ring-[#e36a27]/60' : ''}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${ORANGE}1f` }}><p.icon size={24} style={{ color: ORANGE }} /></span>
                  <h3 className="mt-4 text-xl font-bold text-[#102a3d]">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{p.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{p.chips.map((c) => <span key={c} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#7a3a14]">{c}</span>)}</div>
                </article>
              )
            })}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-[#5e6b76]">Not sure which fits? That’s the first thing the free audit answers.</p>
        </div>
      </section>

      {/* Conversion engineering */}
      <section className="bg-gradient-to-b from-[#0e1a33] to-[#0a1224] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>Conversion engineering</span>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-5xl">We design for conversion, then prove it.</h2>
            <p className="mt-4 text-lg text-white/70">Anyone can make a store look good. We engineer the moments that decide whether the sale happens. Start with the highest-stakes screen of all: checkout.</p>
            <div className="mt-8">
              <CheckoutCompare />
              <p className="mt-3 text-xs text-white/55">Drag to compare. Most stores need only about 8 checkout fields, yet the average checkout still carries 11–12. · Baymard Institute</p>
            </div>
          </Reveal>
          <div className="space-y-4">
            {conversionPoints.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <article className="flex gap-4 rounded-[22px] border border-white/10 bg-white/[.04] p-5 transition hover:bg-white/[.07]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10"><c.icon size={22} style={{ color: MINT }} /></span>
                  <div>
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{c.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
            <p className="text-xs text-white/50">Every build ships with conversion tracking set up correctly, so improvement is visible, not assumed.</p>
          </div>
        </div>
      </section>

      {/* WhatsApp layer */}
      <section className="bg-[#f3f8fa] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_.9fr]">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: TEAL }}>Built for how India shops</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Let customers order where they already chat.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Many of your customers would rather message than fill a form. We connect your store to WhatsApp so questions, orders and updates flow in one place.</p>
            <ul className="mt-6 space-y-3">{['One-tap WhatsApp order and enquiry buttons on every product', 'Order confirmations and shipping updates', 'Catalogue and payment links shared in the chat', 'Shareable QR code for your shop counter and packaging'].map((s) => <li key={s} className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: TEAL }} /> {s}</li>)}</ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="mx-auto max-w-sm rounded-[32px] border border-[#dbe6ea] bg-white p-4 shadow-[0_30px_70px_rgba(16,42,61,.15)]">
              <div className="flex items-center gap-3 rounded-2xl bg-[#075e54] p-3 text-white"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"><Store size={18} /></span><div><p className="text-sm font-bold">Your Store</p><p className="text-[11px] text-white/70">online now</p></div></div>
              <div className="space-y-2.5 bg-[#efeae2] p-3 text-sm">
                <p className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-[#1f2c34]">Is the blue kurta available in size M?</p>
                <p className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[#1f2c34]">Yes, in stock. ₹1,499 with free shipping. Want a payment link?</p>
                <p className="ml-auto max-w-[60%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-[#1f2c34]">Yes please</p>
                <p className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[#1f2c34]">Pay securely here and it ships today. ✅</p>
              </div>
              <p className="pt-3 text-center text-[11px] text-[#6b7782]">Illustrative conversation</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal className="mb-14 text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ORANGE }}>The path</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">How a store gets built (or rebuilt).</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">A clear, low-risk path from first call to live store, and beyond launch.</p>
          </Reveal>
          <div className="relative">
            <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-[#e36a27] to-[#e36a27]/10" />
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="relative pb-8 pl-20 last:pb-0">
                  <span className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ring-4 ring-white" style={{ background: ORANGE }}>{i + 1}</span>
                  <div className="rounded-[20px] border border-[#f0e3d8] bg-[#fff8f2] p-6">
                    <h3 className="text-xl font-bold text-[#102a3d]">{s.title}</h3>
                    <p className="mt-1.5 text-[#5e6b76]">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button onClick={audit} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ORANGE }}>Start with a free audit <ArrowUpRight size={17} /></button>
            <Link to="/how" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-7 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">Our full process</Link>
          </div>
        </div>
      </section>

      {/* Sector depth */}
      <section className="bg-[#fff4ed] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ORANGE }}>Sector depth</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">We know how different kinds of retail sell.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">A ₹300 lip balm and a ₹60,000 sofa convert in completely different ways, and we design for the difference.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.name} delay={i * 70} className="h-full">
                <article className="group h-full overflow-hidden rounded-[24px] border border-[#f0dccb] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(196,88,26,.15)]">
                  {c.image ? (
                    <div className="h-44 overflow-hidden"><Photo src={c.image} alt={c.name} className="h-full w-full transition-transform duration-700 group-hover:scale-110" /></div>
                  ) : (
                    <div className="flex h-44 items-center justify-center" style={{ background: `linear-gradient(135deg, ${ORANGE}14, ${ORANGE}33)` }}><c.icon size={52} style={{ color: ORANGE, opacity: 0.55 }} /></div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#102a3d]">{c.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{c.text}</p>
                    <button onClick={audit} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: ORANGE }}>See your fit <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#5e6b76]">Selling into other sectors too? See who we build for <Link to="/industries" className="font-bold underline" style={{ color: ORANGE }}>across industries</Link>.</p>
        </div>
      </section>

      {/* Why us + investment */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ORANGE }}>Why OnlineKarDo</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Why retail brands choose us.</h2>
            <ul className="mt-7 space-y-4">{reasons.map((r) => <li key={r} className="flex items-start gap-3 text-lg text-[#33424e]"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `${ORANGE}22` }}><Check size={14} style={{ color: ORANGE }} /></span>{r}</li>)}</ul>
            <button onClick={audit} className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5" style={{ background: ORANGE }}>Get a free audit <ArrowUpRight size={17} /></button>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ORANGE }}>Investment</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">What a store build costs.</h2>
            <p className="mt-4 text-[#5e6b76]">Pricing varies because the work does. Here’s what actually drives it.</p>
            <div className="mt-6 space-y-3">
              {costDrivers.map((d) => (
                <div key={d.title} className="flex items-center gap-4 rounded-2xl border border-[#f0e3d8] bg-[#fff8f2] p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white"><d.icon size={22} style={{ color: ORANGE }} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#102a3d]">{d.title}</p>
                    <p className="text-xs text-[#5e6b76]">{d.text}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-[#7a3a14]"><span>{d.from}</span><span className="h-1 flex-1 rounded-full bg-gradient-to-r from-[#f6c9a8] to-[#e36a27]" /><span>{d.to}</span></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-[#102a3d] p-5 text-white">
              <p className="flex items-center gap-2 font-bold"><Wrench size={18} style={{ color: MINT }} /> Starting small?</p>
              <p className="mt-1 text-sm text-white/75">The Seller Digital Pack covers a catalogue of up to 20 products, WhatsApp ordering buttons, payment links and a QR code, from ₹6,999 one time.</p>
              <Link to="/packs" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: MINT }}>See setup packs <ArrowUpRight size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fff4ed] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="mb-10 text-center">
            <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: ORANGE }}>Answers</span>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#102a3d] md:text-5xl">Online store questions, answered.</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group rounded-2xl border border-[#f0dccb] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#102a3d]">
                  <span>{q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff0e4] transition-transform group-open:rotate-180" style={{ color: ORANGE }}><ChevronDown size={18} /></span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#5e6b76]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.cta} alt="Customers shopping in a busy store" tint={ORANGE} className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#102a3d]/92 via-[#102a3d]/80 to-[#c4581a]/75" />
        <div className="mx-auto max-w-3xl px-5 text-center">
          <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: MINT }}>Start here</span>
          <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">Find out exactly where your store is losing money.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">Launching your first store or rebuilding one that’s underperforming, start with a free, no-obligation audit of your speed, checkout, mobile experience and conversion leaks.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button onClick={audit} className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#102a3d] transition hover:-translate-y-0.5">Start my free audit <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
            <Link to="/packs" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">See setup packs</Link>
          </div>
          <p className="mt-8 text-sm text-white/65">No obligation · prioritised fixes · built for Indian retail and D2C brands</p>
          <p className="mt-6 text-[11px] text-white/45">Industry figures from published research by Baymard Institute and Google / Deloitte; results vary by store. Photos via Burst by Shopify.</p>
        </div>
      </section>
    </div>
  )
}
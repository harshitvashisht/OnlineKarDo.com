import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, BedDouble, Building2, CalendarCheck, ChefHat, Check, ChevronDown, Coffee, CreditCard, Gauge, Home, MapPin, PartyPopper, QrCode, Search, Smartphone, Star, Truck, Users, Utensils, Wine } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

/* ---------- Photos (free to use, Burst by Shopify). Swap for your own paths any time. ---------- */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1600&format=pjpg&exif=0&iptc=0`
const IMG = {
  heroMain: burst('indian-food-on-restaurant-table'),
  heroSide: burst('a-bowl-of-ramen-by-a-restaurant-window'),
  band: burst('two-pizzas-and-wine'),
  buildNew: burst('open-kitchen-restaurant'),
  restaurant: burst('greek-dinner-in-restaurant'),
  hotel: burst('hotel-breakfast-room-service'),
  cafe: burst('coffee-and-cake'),
  bar: burst('finger-food-and-drinks-on-dark-wood'),
  catering: burst('family-restaurant-meals-on-table'),
  groups: burst('restaurant-entrance-with-wine-bottles-in-the-window'),
  ghost: burst('thai-food-takeout'),
  cta: burst('cheers-with-restaurant-glassware'),
  tax: burst('interior-of-a-restaurant-with-single-person-at-the-bar'),
}

const GOLD = '#d5a64b'
const GOLD_D = '#8a6a1f'
const INK = '#102a3d'
const EMBER = '#c2562b'

/* ---------- Data ---------- */
const leaks = [
  { icon: Gauge, title: 'Slow PDF menus', tag: 'Lost on mobile', text: 'Guests check your menu on a phone, often on weak data. A heavy PDF that needs pinch-and-zoom sends them back to the delivery app.', fix: 'A fast HTML menu with photos, dietary tags and an order button, loading in under 2 seconds.' },
  { icon: CreditCard, title: 'Too many taps to order', tag: 'Abandoned carts', text: 'Forced sign-ups, long forms and no UPI make hungry guests give up before they pay.', fix: 'Two-tap ordering with UPI, cards and wallets, and a table QR that already knows the table.' },
  { icon: Users, title: 'Aggregators own your guests', tag: 'Margin gone', text: 'On Swiggy and Zomato you pay commission and never see the guest’s details, so you cannot bring them back.', fix: 'Direct ordering by QR, Google profile and WhatsApp, with the guest list and loyalty in your hands.' },
  { icon: MapPin, title: 'Hard to find, hard to trust', tag: 'Fewer covers', text: 'No photos, old hours or a missing Order Online button on Google, and nearby guests pick someone else.', fix: 'A tidy Google Business Profile, menu schema, real photos and one-tap call, directions and booking.' },
]

const included = [
  { icon: Utensils, title: 'Menus that sell', text: 'Real-time edits, dietary tags, price variants, photos and multi-language. HTML first, with a PDF backup.' },
  { icon: QrCode, title: 'Direct ordering & table QR', text: 'Pickup, delivery and dine-in from one flow, with kitchen ticket printing and no marketplace commission.' },
  { icon: CreditCard, title: 'Payments & GST invoices', text: 'Razorpay or Stripe with UPI, cards, wallets, split bill and tip prompt. GST invoices created on payment.' },
  { icon: CalendarCheck, title: 'Reservations & waitlist', text: 'Booking widget, SMS or WhatsApp confirmations, walk-in queue and no-show protection.' },
  { icon: Search, title: 'Local search foundation', text: 'Google Business Profile, review replies, menu schema and an Order Online button, so nearby guests find you.' },
  { icon: Star, title: 'Loyalty & win-back', text: 'Points, birthday offers, referral and win-back messages by WhatsApp or SMS, from a guest list you own.' },
]

const venues = [
  { icon: ChefHat, name: 'Restaurants & fine dining', text: 'Photo-led menus, ordering and reservations in one owned site.', image: IMG.restaurant },
  { icon: BedDouble, name: 'Hotels, resorts & homestays', text: 'Direct-booking pages with booking-engine and channel-manager links.', image: IMG.hotel },
  { icon: Coffee, name: 'Cafés & coffee shops', text: 'Quick mobile ordering, loyalty hooks and strong “near me” discovery.', image: IMG.cafe },
  { icon: Wine, name: 'Bars, pubs & lounges', text: 'Events and table bookings up front, with a brand-led look.', image: IMG.bar },
  { icon: PartyPopper, name: 'Catering & private dining', text: 'Quote and event-enquiry flows with gallery proof, feeding a CRM you own.', image: IMG.catering },
  { icon: Building2, name: 'Multi-location groups', text: 'Outlet pages that rank on their own, with central menu and offers.', image: IMG.groups },
  { icon: Truck, name: 'Cloud & ghost kitchens', text: 'Conversion-first ordering with no dining-room overhead.', image: IMG.ghost },
]

const processSteps = [
  { title: 'Menu & operations audit', text: 'Current menu, pricing, variants, kitchen flow, POS, delivery radius and peak hours.' },
  { title: 'Structure & ordering flow', text: 'Category tree, dietary tags, combos, modifiers, cart, checkout, table QR and kitchen ticket.' },
  { title: 'Design', text: 'Menu and checkout screens built mobile-first, with your brand and real food photography.' },
  { title: 'Build, POS & payment sync', text: 'Menu CMS, POS sync, Razorpay or Stripe, QR generation, printer test and staff training.' },
  { title: 'Launch & optimise', text: 'Table QR rollout, Google “Order Online”, review templates, analytics and CTA tests.' },
]

const reasons = [
  'One accountable team for web, branding and automation.',
  'Free audit, fixed scope and upfront pricing, with no surprises.',
  'Works with Petpooja, UrbanPiper, Square, Toast or standalone.',
  'Built for how Indian guests order: UPI, WhatsApp and Google Maps.',
  'Mobile-first by default, because that is where your guests are.',
]

const tools = ['Razorpay', 'Stripe', 'UPI', 'Petpooja', 'UrbanPiper', 'Square', 'Toast', 'WhatsApp Business', 'Google Business Profile', 'WooCommerce', 'Webflow', 'Klaviyo', 'Mailchimp']
const standards = ['PCI DSS', 'FSSAI allergen labels', 'GST invoicing', 'WCAG accessibility']

const faqs: [string, string][] = [
  ['Do I need my own website if I am already on Swiggy or Zomato?', 'Yes. Aggregators are good for discovery, but they keep the customer relationship. Your own site lets repeat guests order directly, so you keep the margin and the data.'],
  ['Do I need to change my POS?', 'No. We integrate with Square, Toast, Petpooja and UrbanPiper, or use webhook and API. With no POS, our admin panel works standalone.'],
  ['Can customers split bills?', 'Yes: by item, equally, or custom amounts. Each payer pays by UPI or card, and the kitchen gets a single ticket.'],
  ['How do table QR codes work?', 'We generate a unique QR per table as a 300 DPI PDF. Scanning opens the menu with the table already filled in, so the kitchen knows where to send the food.'],
  ['What about GST invoices?', 'They are generated on payment with GSTIN, HSN/SAC and the CGST, SGST or IGST breakdown, and sent by PDF, email and WhatsApp.'],
  ['Can you redesign my existing site without losing Google rankings?', 'Yes. We audit the current site, map important URLs and set up redirects so the visibility you have earned carries over.'],
  ['Who owns the website and the guest data?', 'You do. The site, the content and the guest list are yours and can move with you.'],
  ['How much does it cost?', 'It depends on outlets, menu size and integrations. We share a fixed proposal after the free audit, with no obligation.'],
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
  return <div ref={ref} className={`rh-reveal ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div role="img" aria-label={alt} className={className} style={{ background: `linear-gradient(135deg, ${GOLD}33, ${GOLD}77)` }} />
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="rh-marquee">
      <div className="rh-track">
        <div className="rh-set">{children}</div>
        <div className="rh-set rh-dup" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className="text-sm font-bold uppercase tracking-[.16em]" style={{ color: light ? GOLD : GOLD_D }}>{children}</span>
}

function Check1({ children }: { children: ReactNode }) {
  return <li className="flex items-start gap-3 text-[#33424e]"><Check size={18} className="mt-0.5 shrink-0" style={{ color: GOLD_D }} /> {children}</li>
}

// Drag-to-compare: dated PDF-menu page vs a fast ordering page.
function SiteCompare() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative h-[440px] select-none overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_70px_rgba(0,0,0,.35)]">
      <div className="absolute inset-0 bg-[#fffaf0] p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: GOLD_D }}>Restaurant page · after</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-[#102a3d]">Spice Route Kitchen</p>
          <span className="rounded-full px-3 py-1 text-xs font-bold text-[#102a3d]" style={{ background: GOLD }}>Order online</span>
        </div>
        <Photo src={IMG.heroMain} alt="Plated Indian dishes on a restaurant table" className="mt-3 h-36 w-full rounded-2xl" />
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm font-bold">
          <span className="rounded-xl bg-[#102a3d] px-2 py-3 text-white">Order</span>
          <span className="rounded-xl bg-[#25a244] px-2 py-3 text-white">WhatsApp</span>
          <span className="rounded-xl border-2 px-2 py-3" style={{ borderColor: GOLD, color: GOLD_D }}>Book table</span>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-[#33424e]"><Check size={15} style={{ color: GOLD_D }} /> Pay with UPI · Open till 11 pm · Loads in under 2s</p>
      </div>
      <div className="absolute inset-0 bg-[#e9e9e9] p-5" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#e36a27]">Restaurant page · before</p>
        <p className="text-sm font-bold text-[#8a8a8a]">SPICE ROUTE KITCHEN</p>
        <p className="mt-2 text-xs text-[#9a9a9a] underline">Download our menu (PDF, 8 MB)</p>
        <p className="mt-2 text-[10px] leading-tight text-[#b5b5b5]">Call us to book a table. Orders are available through our delivery partners. Kindly note timings may change without notice.</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">{[0, 1, 2].map((i) => <div key={i} className="h-16 rounded bg-[#d6d6d6]" />)}</div>
        <p className="mt-3 text-[10px] text-[#b5b5b5]">No online ordering · no photos · slow on mobile</p>
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.1)]" style={{ left: `${pos}%` }} />
      <div className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg" style={{ left: `${pos}%` }}><span className="text-[#102a3d]">↔</span></div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Drag to compare an old restaurant page and a fast ordering page" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  )
}

// Interactive phone: pick a leak, see it on the page, flip to see the fix.
function LeakExplorer({ onAudit }: { onAudit: () => void }) {
  const [active, setActive] = useState(0)
  const [fixed, setFixed] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setActive((a) => (a + 1) % leaks.length), 6000)
    return () => window.clearInterval(t)
  }, [paused])

  const ring = fixed ? 'ring-[#087b4a] shadow-[0_8px_24px_rgba(8,123,74,.25)]' : 'ring-[#e36a27] shadow-[0_8px_24px_rgba(227,106,39,.25)]'
  const zone = (i: number) => `relative rounded-2xl bg-white p-3 transition duration-500 ${active === i ? `opacity-100 ring-2 ${ring}` : 'opacity-40'}`
  const tag = (i: number) => `absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white transition ${active === i ? 'opacity-100' : 'opacity-0'} ${fixed ? 'bg-[#087b4a]' : 'bg-[#e36a27]'}`

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_340px_1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="order-2 space-y-3 lg:order-1" role="tablist" aria-label="Where restaurant websites lose margin">
        {leaks.map((l, i) => (
          <button key={l.title} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition duration-300 ${active === i ? 'border-[#d5a64b] bg-white shadow-[0_14px_36px_rgba(213,166,75,.25)]' : 'border-[#f0e2bd] bg-white/60 hover:bg-white'}`}>
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${active === i ? 'text-[#102a3d]' : 'bg-[#fdf0d0] text-[#8a6a1f]'}`} style={active === i ? { background: GOLD } : undefined}><l.icon size={20} /></span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#102a3d]">{l.title}</p>
                <p className="text-xs font-semibold" style={{ color: GOLD_D }}>{l.tag}</p>
              </div>
              <span className="text-xs font-bold text-[#b9a979]">0{i + 1}</span>
            </div>
            {active === i && (
              <>
                <p className="mt-3 text-sm leading-relaxed text-[#5e6b76]">{fixed ? l.fix : l.text}</p>
                {!paused && <span key={`bar-${i}`} className="rh-fill absolute bottom-0 left-0 h-0.5 w-full" style={{ background: GOLD }} />}
              </>
            )}
          </button>
        ))}
      </div>

      <div className="order-1 mx-auto w-[300px] lg:order-2">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 text-sm font-bold shadow-sm ring-1 ring-[#f0e2bd]" role="group" aria-label="Show problem or fix">
            <button onClick={() => setFixed(false)} aria-pressed={!fixed} className={`rounded-full px-4 py-1.5 transition ${!fixed ? 'bg-[#e36a27] text-white' : 'text-[#5e6b76]'}`}>The problem</button>
            <button onClick={() => setFixed(true)} aria-pressed={fixed} className={`rounded-full px-4 py-1.5 transition ${fixed ? 'bg-[#087b4a] text-white' : 'text-[#5e6b76]'}`}>The fix</button>
          </div>
        </div>
        <div className="rounded-[40px] border-[10px] border-[#102a3d] bg-[#f7f1e1] p-3 shadow-[0_40px_80px_rgba(16,42,61,.3)]">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-[#102a3d]/20" />
          <div className="space-y-3">
            <div className={zone(0)}>
              <span className={tag(0)}>{fixed ? 'Loads fast' : 'Still loading…'}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#eee3c6]"><div className={`h-full rounded-full ${fixed ? 'w-full bg-[#087b4a]' : 'w-1/4 bg-[#e36a27]'}`} /></div>
              {fixed ? <p className="mt-2 text-sm font-bold text-[#102a3d]">Spice Route Kitchen · Menu</p> : <p className="mt-2 text-xs text-[#a4acb0]">menu_final_v3.pdf · 8 MB</p>}
            </div>
            <div className={zone(1)}>
              <span className={tag(1)}>{fixed ? 'Two taps' : 'Sign up first'}</span>
              {fixed ? (
                <div className="space-y-1.5 text-[11px] font-bold">
                  <div className="flex items-center justify-between rounded-lg bg-[#fef9e7] px-2.5 py-1.5 text-[#102a3d]"><span>Paneer tikka · {rupee(320)}</span><span style={{ color: GOLD_D }}>Add</span></div>
                  <div className="rounded-lg bg-[#102a3d] py-2 text-center text-white">Pay with UPI</div>
                </div>
              ) : (
                <div className="space-y-1.5">{['Create account', 'Email', 'Password', 'Address'].map((f) => <div key={f} className="rounded-lg border border-[#d6dee2] px-2.5 py-1.5 text-[11px] text-[#a4acb0]">{f}</div>)}</div>
              )}
            </div>
            <div className={zone(2)}>
              <span className={tag(2)}>{fixed ? '0% commission' : '≈ 30% commission'}</span>
              {fixed ? <p className="text-[11px] text-[#102a3d]"><b>Guest saved to your list.</b> Birthday offer set. You keep the full bill.</p> : <p className="text-[11px] text-[#a4acb0]">Guest details hidden by the app. No way to invite them back.</p>}
            </div>
            <div className={zone(3)}>
              <span className={tag(3)}>{fixed ? 'Easy to trust' : 'Easy to skip'}</span>
              {fixed ? (
                <>
                  <p className="flex items-center gap-0.5 text-[#e8a317]">{[0, 1, 2, 3, 4].map((n) => <Star key={n} size={11} fill="currentColor" />)}<span className="ml-1 text-[10px] text-[#5e6b76]">Open till 11 pm</span></p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-center text-[11px] font-bold"><span className="rounded-lg bg-[#102a3d] py-2 text-white">Order online</span><span className="rounded-lg bg-[#25a244] py-2 text-white">WhatsApp</span></div>
                </>
              ) : <p className="text-[11px] text-[#a4acb0]">Hours: ? · No photos · No Order Online button on Google</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="order-3 space-y-5">
        <div className="rounded-[24px] border border-[#f0e2bd] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD_D }}>Why it matters</p>
          <p className="mt-2 text-lg font-bold leading-snug text-[#102a3d]">Guests decide in seconds, on a phone, and the next restaurant is one tap away.</p>
          <p className="mt-3 text-sm leading-relaxed text-[#5e6b76]">Each leak is common, measurable and fixable. Tap through them, then flip to “The fix”.</p>
        </div>
        <button onClick={onAudit} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-[#102a3d] transition hover:-translate-y-0.5" style={{ background: GOLD }}>Find your site’s leaks, free <ArrowUpRight size={16} /></button>
        <p className="text-xs text-[#6b7782]">Illustrative page. The audit measures your real site.</p>
      </div>
    </div>
  )
}

function TaxCard() {
  const [mode, setMode] = useState<'app' | 'own'>('app')
  const ticket = 450
  const app = mode === 'app'
  const feePct = app ? 30 : 2
  const fees = Math.round((ticket * feePct) / 100)
  const tabs: [typeof mode, string, typeof Smartphone][] = [['app', 'Delivery app', Smartphone], ['own', 'Your own site', Home]]
  return (
    <div className="rounded-[32px] border border-white/15 bg-[#0b1d2b]/60 p-8 backdrop-blur-md">
      <div role="tablist" className="inline-flex rounded-full border border-white/20 p-1.5">
        {tabs.map(([k, label, Icon]) => (
          <button key={k} role="tab" aria-selected={mode === k} onClick={() => setMode(k)} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors" style={mode === k ? { background: GOLD, color: INK } : { color: 'rgba(255,255,255,.75)' }}><Icon size={16} /> {label}</button>
        ))}
      </div>
      <div className="mt-8 flex items-end justify-between">
        <span className="text-4xl font-semibold">{rupee(ticket)}</span>
        <span className="text-sm text-white/60">{app ? 'A typical delivery-app order' : 'The same order on your site'}</span>
      </div>
      <div className="mt-4 flex h-12 overflow-hidden rounded-full bg-white/10">
        <div className="transition-all duration-500" style={{ width: `${100 - feePct}%`, background: GOLD }} />
        <div className="transition-all duration-500" style={{ width: `${feePct}%`, background: EMBER }} />
      </div>
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/80">
        <span>You keep <b className="text-white">≈ {rupee(ticket - fees)}</b></span>
        <span>{app ? 'Marketplace fees' : 'Payment gateway fee'} <b className="text-white">≈ {rupee(fees)}</b></span>
      </div>
      <div className="mt-7 border-t border-white/10 pt-6">
        <p className="text-4xl font-semibold" style={{ color: GOLD }}>≈ {feePct}% gone</p>
        <p className="mt-2 max-w-md text-white/70">{app ? 'Commission, payment fees, promoted placement and menu-price padding can take 30–40% of the bill once every fee is counted.' : 'On your own site you mostly pay the payment gateway fee, and the guest data stays with you.'}</p>
      </div>
      <p className="mt-6 text-xs text-white/50">Illustrative at a ~30% effective app rate and ~2% gateway fee. Your real numbers are modelled free in the audit.</p>
    </div>
  )
}

function Slider({ label, value, min, max, step, onChange, display }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; display: string }) {
  return (
    <label className="block">
      <div className="mb-2 flex justify-between text-sm text-[#102a3d]"><span>{label}</span><strong>{display}</strong></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" style={{ accentColor: GOLD }} />
    </label>
  )
}

function MarginCalculator() {
  const [aov, setAov] = useState(450)
  const [commission, setCommission] = useState(25)
  const [orders, setOrders] = useState(10)
  const [invest, setInvest] = useState(150000)
  const monthly = orders * 30 * aov * (commission / 100)
  const weeks = monthly > 0 ? invest / (monthly / 4.345) : 0
  return (
    <div className="mt-6 grid gap-8 rounded-[24px] border border-[#f0e2bd] bg-white p-6">
      <div className="space-y-5">
        <Slider label="Average order value" value={aov} min={150} max={2000} step={10} onChange={setAov} display={rupee(aov)} />
        <Slider label="Aggregator commission you pay" value={commission} min={10} max={40} step={1} onChange={setCommission} display={`${commission}%`} />
        <Slider label="Orders per day moved to direct" value={orders} min={1} max={60} step={1} onChange={setOrders} display={String(orders)} />
        <Slider label="Your site investment" value={invest} min={25000} max={1000000} step={5000} onChange={setInvest} display={rupee(invest)} />
      </div>
      <div className="grid grid-cols-3 gap-3 rounded-2xl bg-[#fef9e7] p-4 text-center">
        <div><p className="text-xs text-[#5e6b76]">Per month</p><p className="text-xl font-bold" style={{ color: GOLD_D }}>{rupee(monthly)}</p></div>
        <div><p className="text-xs text-[#5e6b76]">Per year</p><p className="text-xl font-bold text-[#102a3d]">{rupee(monthly * 12)}</p></div>
        <div><p className="text-xs text-[#5e6b76]">Payback</p><p className="text-xl font-bold text-[#102a3d]">{weeks > 0 ? `≈ ${Math.max(1, Math.round(weeks))} wks` : '—'}</p></div>
      </div>
      <p className="text-xs text-[#6b7782]">Illustrative model on the numbers you set. Your real figures come from the audit.</p>
    </div>
  )
}

const styles = `
@keyframes rh-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes rh-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes rh-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes rh-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes rh-kb { from { transform: scale(1); } to { transform: scale(1.09); } }
@keyframes rh-pulse { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.9); opacity: 0; } }
.rh-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.rh-track { display: flex; width: max-content; animation: rh-scroll 45s linear infinite; }
.rh-marquee:hover .rh-track { animation-play-state: paused; }
.rh-set { display: flex; flex-shrink: 0; align-items: center; }
.rh-hero > * { opacity: 0; animation: rh-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.rh-hero > *:nth-child(1){animation-delay:.05s} .rh-hero > *:nth-child(2){animation-delay:.15s} .rh-hero > *:nth-child(3){animation-delay:.27s} .rh-hero > *:nth-child(4){animation-delay:.39s} .rh-hero > *:nth-child(5){animation-delay:.5s}
.rh-fill { transform-origin: left; animation: rh-fill 6s linear forwards; }
.rh-float { animation: rh-float 7s ease-in-out infinite; }
.rh-kenburns { animation: rh-kb 26s ease-in-out infinite alternate; }
.rh-pulse::after { content: ''; position: absolute; inset: 0; border-radius: 9999px; background: currentColor; animation: rh-pulse 2.4s ease-out infinite; }
.rh-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.rh-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .rh-track, .rh-float, .rh-pulse::after, .rh-fill, .rh-kenburns { animation: none; }
  .rh-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .rh-dup { display: none; }
  .rh-hero > * { opacity: 1; animation: none; }
  .rh-reveal { opacity: 1; transform: none; transition: none; }
}
`

/* ---------- Page ---------- */
export default function RestaurantsHospitalityPage() {
  const { openEnquiry } = useEnquiry()
  const audit = () => openEnquiry('Restaurants & Hospitality')
  const goldBtn = 'inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-[#102a3d] transition hover:-translate-y-0.5'
  const h2 = 'mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-5xl'
  const card = 'group h-full overflow-hidden rounded-[24px] border border-[#f0e2bd] bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(213,166,75,.25)]'

  return (
    <div className="page-wrapper">
      <SEO
        title="Restaurants & Hospitality — Direct Ordering, Menus, Bookings | OnlineKarDo"
        description="Commission-free direct ordering, digital menus with QR, reservations, Google Business Profile and payments. Own your guests, stop renting them from delivery apps."
        canonical="/industries/restaurants-hospitality"
      />
      <style>{styles}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fef9e7] via-[#fdf0d0] to-[#f8e3b0] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rh-hero">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold" style={{ color: GOLD_D }}>
              <span className="rh-pulse relative flex h-2.5 w-2.5 rounded-full" style={{ background: GOLD, color: GOLD }} /> Industry · Restaurants & Hospitality
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[.97] tracking-[-.05em] text-[#102a3d] md:text-7xl">
              Hospitality websites that win the booking and <span style={{ color: GOLD_D }}>keep the margin</span>.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#4b5b68]">
              One accountable partner for your restaurant, hotel, café or cloud kitchen. A good hospitality site does three things at once: take the order, fill the table, and keep the guest data yours.
            </p>
            <div className="flex flex-wrap gap-2">
              {[{ t: 'Order', i: Utensils }, { t: 'Book', i: CalendarCheck }, { t: 'Own', i: Users }].map(({ t, i: I }) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#102a3d] shadow-sm"><I size={16} style={{ color: GOLD_D }} /> {t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={audit} className={goldBtn} style={{ background: GOLD }}>Get a free audit <ArrowUpRight size={17} /></button>
              <a href="#process" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-7 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">See how we work</a>
            </div>
          </div>
          <div className="relative mx-auto hidden h-[460px] w-full max-w-[480px] lg:block">
            <div className="rh-float absolute left-0 top-0 h-[340px] w-72 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(138,106,31,.35)]"><Photo src={IMG.heroMain} alt="Indian dishes served on a restaurant table" className="h-full w-full" /></div>
            <div className="rh-float absolute bottom-0 right-0 h-60 w-60 overflow-hidden rounded-[30px] shadow-[0_28px_70px_rgba(138,106,31,.35)]" style={{ animationDelay: '-3s' }}><Photo src={IMG.heroSide} alt="Bowl of ramen by a restaurant window" className="h-full w-full" /></div>
            <div className="absolute right-2 top-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><Check size={16} style={{ color: GOLD_D }} /> New order · 0% commission</div>
            <div className="absolute bottom-24 left-2 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-xl"><CalendarCheck size={16} style={{ color: GOLD_D }} /> Table for 4 booked</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-b border-[#f0e2bd] bg-white py-7" aria-label="Tools we connect">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[.18em] text-[#6b7782]">Works with the tools you already use</p>
        <Marquee>{tools.map((n) => <span key={n} className="mx-3 whitespace-nowrap rounded-full border border-[#f0e2bd] bg-[#fffaf0] px-5 py-2.5 text-sm font-semibold text-[#102a3d]">{n}</span>)}</Marquee>
      </section>

      {/* Leaks */}
      <section className="bg-gradient-to-b from-[#fef9e7] to-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mb-12 max-w-3xl">
            <Eyebrow>The stakes</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-6xl">Your website is the front door to the table.</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5e6b76]">Guests choose where to eat on their phones. A slow, confusing or empty page does not just look bad. It sends the order to the app, and the guest to the restaurant listed next to you.</p>
          </Reveal>
          <Reveal><LeakExplorer onAudit={audit} /></Reveal>
        </div>
      </section>

      {/* Marketplace tax */}
      <section className="bg-[#0b1d2b] px-4 py-16 text-white md:py-24">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/10 px-6 py-12 md:px-14 md:py-16">
          <Photo src={IMG.tax} alt="Restaurant interior with a guest at the bar" className="rh-kenburns absolute inset-0 -z-20 h-full w-full" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1d2b]/93 via-[#0b1d2b]/86 to-[#0b1d2b]/70" />
          <Reveal className="max-w-3xl">
            <Eyebrow light>The marketplace tax</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">The website is where the margin is hiding.</h2>
            <p className="mt-5 text-xl text-white/70">Delivery apps are brilliant at one thing: putting you in front of someone who has never heard of you. The problem starts on the <b className="text-white">second</b> order.</p>
          </Reveal>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal><TaxCard /></Reveal>
            <Reveal delay={120} className="space-y-5 text-lg text-white/70">
              <p>You made the food. You turned the table. And a slice of the revenue vanished between the guest’s phone and your bank account.</p>
              <p>When a returning guest orders or books <b className="text-white">directly</b> on a site you own, you keep the margin, the guest data and the relationship.</p>
              <p>The move is not to leave the marketplaces. Let them do <b className="text-white">discovery</b>, then bring guests to your own channel for good.</p>
              <button onClick={audit} className={goldBtn} style={{ background: GOLD }}>Get a free audit <ArrowUpRight size={17} /></button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Two doors */}
      <section className="bg-[#fef9e7] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>Two doors</Eyebrow>
            <h2 className={h2}>Two doors. Both lead to a site you own.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Hospitality buyers are either rebuilding a site that no longer works or starting fresh. We are set up for both.</p>
          </Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[32px] bg-[#0c2236] p-4"><SiteCompare /></div>
              <p className="mt-3 text-center text-xs text-[#6b7782]">Illustrative before and after. Drag to compare.</p>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD_D }}>Redesign & replatform</p>
              <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Rebuild what you have</h3>
              <p className="mt-3 text-[#5e6b76]">Stuck on a rented ordering tool or an old theme? Menu in a PDF, bookings buried three taps deep, orders still going through a 25% app?</p>
              <ul className="mt-5 space-y-2.5">
                <Check1>Audit your site, POS and ordering stack, then move to a fast foundation you own</Check1>
                <Check1>Migrate content and SEO without losing your Google history</Check1>
                <Check1>Rebuild the ordering, booking and menu flows that cost you covers</Check1>
              </ul>
              <button onClick={audit} className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d] px-6 py-3 font-bold text-[#102a3d] transition hover:bg-[#102a3d] hover:text-white">Audit my existing site <ArrowRight size={16} /></button>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <article className="grid overflow-hidden rounded-[32px] border border-[#f0e2bd] bg-white md:grid-cols-2">
              <Photo src={IMG.buildNew} alt="Open kitchen in a busy restaurant" className="h-64 w-full md:h-full" />
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD_D }}>New build</p>
                <h3 className="mt-2 text-3xl font-bold text-[#102a3d]">Build from scratch</h3>
                <p className="mt-3 text-[#5e6b76]">Opening a new concept, a second outlet, a hotel, a cloud kitchen or a café? We build brand, menu, ordering and booking as one launch-ready system that grows with you.</p>
                <ul className="mt-5 space-y-2.5">
                  <Check1>Brand look, menu structure and photo direction in one launch</Check1>
                  <Check1>Ordering and reservations wired to your kitchen and POS</Check1>
                  <Check1>Local SEO and Google profile ready from day one</Check1>
                </ul>
                <button onClick={audit} className={`mt-7 ${goldBtn.replace('px-7 py-3.5', 'px-6 py-3')}`} style={{ background: GOLD }}>Plan my new site <ArrowRight size={16} /></button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Lifestyle band */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.band} alt="Two pizzas and wine on a restaurant table" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0c2236]/92 via-[#0c2236]/70 to-[#0c2236]/30" />
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <Eyebrow light>The result</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">The site that fills tables is the same site that keeps your margin.</h2>
            <p className="mt-5 text-lg text-white/80">Fast, easy to order from and clearly yours. That is what a hungry guest notices before they pick an app.</p>
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <Eyebrow>What’s included</Eyebrow>
            <h2 className={h2}>What goes into a OnlineKarDo hospitality website.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">Every build starts from the same careful foundation, then is tailored to your venue.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {included.map((w, i) => (
              <Reveal key={w.title} delay={i * 70} className="h-full">
                <article className="group h-full rounded-[24px] border border-[#f0e2bd] bg-[#fffaf0] p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(213,166,75,.25)]" style={{ borderTop: `4px solid ${GOLD}` }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fdf0d0] transition-transform group-hover:rotate-6"><w.icon size={24} style={{ color: GOLD_D }} /></span>
                  <h3 className="mt-5 text-xl font-bold text-[#102a3d]">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{w.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-semibold text-[#5e6b76]">Built to:</span>
            {standards.map((s) => <span key={s} className="rounded-full border border-[#f0e2bd] bg-[#fef9e7] px-4 py-1.5 text-sm font-semibold text-[#102a3d]">{s}</span>)}
          </Reveal>
        </div>
      </section>

      {/* Who we build for */}
      <section className="bg-[#fef9e7] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>Who we build for</Eyebrow>
            <h2 className={h2}>Built for every corner of hospitality.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">A cloud kitchen and a resort need very different sites. We shape each to its guests and its growth goals.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {venues.map((v, i) => (
              <Reveal key={v.name} delay={i * 60} className="h-full">
                <article className={card}>
                  <div className="h-40 overflow-hidden"><Photo src={v.image} alt={v.name} className="h-full w-full transition-transform duration-700 group-hover:scale-110" /></div>
                  <div className="p-5">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-[#102a3d]"><v.icon size={18} style={{ color: GOLD_D }} /> {v.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e6b76]">{v.text}</p>
                    <button onClick={audit} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: GOLD_D }}>Talk to us <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
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
            <Eyebrow>How we work</Eyebrow>
            <h2 className={h2}>From menu to live ordering in five steps.</h2>
            <p className="mt-4 text-lg text-[#5e6b76]">The free audit is step one, so you see where you stand before you commit.</p>
          </Reveal>
          <div className="relative">
            <div className="absolute bottom-0 left-6 top-0 w-px" style={{ background: `linear-gradient(to bottom, ${GOLD}, ${GOLD}1a)` }} />
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="relative pb-8 pl-20 last:pb-0">
                  <span className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-[#102a3d] ring-4 ring-white" style={{ background: GOLD }}>{i + 1}</span>
                  <div className="rounded-[20px] border border-[#f0e2bd] bg-[#fffaf0] p-6">
                    <h3 className="text-xl font-bold text-[#102a3d]">{s.title}</h3>
                    <p className="mt-1.5 text-[#5e6b76]">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us + investment */}
      <section className="bg-[#fffaf0] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Why OnlineKarDo</Eyebrow>
            <h2 className={h2}>One accountable partner for your venue.</h2>
            <ul className="mt-7 space-y-4">{reasons.map((r) => <li key={r} className="flex items-start gap-3 text-lg text-[#33424e]"><span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fdf0d0]"><Check size={14} style={{ color: GOLD_D }} /></span>{r}</li>)}</ul>
            <button onClick={audit} className={`mt-8 ${goldBtn}`} style={{ background: GOLD }}>Get a free audit <ArrowUpRight size={17} /></button>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Investment & payback</Eyebrow>
            <h2 className={h2}>How fast does it pay back?</h2>
            <p className="mt-4 text-[#5e6b76]">Move a few repeat orders a day off the apps and see the margin you recover. Pricing is shared in your audit.</p>
            <MarginCalculator />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="mb-10 text-center">
            <Eyebrow>Questions</Eyebrow>
            <h2 className={h2}>Hospitality websites: your questions, answered.</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0} className="group rounded-2xl border border-[#f0e2bd] bg-[#fffaf0]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#102a3d]">
                  <span>{q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white transition-transform group-open:rotate-180" style={{ color: GOLD_D }}><ChevronDown size={18} /></span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[#5e6b76]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        <Photo src={IMG.cta} alt="Glasses raised in a toast at a restaurant" className="absolute inset-0 -z-20 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c2236]/94 via-[#0c2236]/84 to-[#8a6a1f]/70" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
          <div>
            <Eyebrow light>Start here</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">See exactly what your site is leaving on the table, free.</h2>
            <p className="mt-5 max-w-xl text-lg text-white/85">Send us your current site or your concept. You get a clear, no-obligation audit and the fastest path to direct orders, from the same accountable team.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={audit} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-[#102a3d] transition hover:-translate-y-0.5">Start my free audit <ArrowUpRight size={18} /></button>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-4 font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">Explore services</Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>What your free audit covers</p>
            <h3 className="mt-2 text-2xl font-bold">A specific, prioritised plan.</h3>
            <ul className="mt-5 space-y-4">
              {[{ b: 'Ordering & booking costs', t: 'what apps and tools cost you today.' }, { b: 'Speed & mobile', t: 'how the menu really loads on a phone.' }, { b: 'Google visibility', t: 'profile, reviews, menu schema, Order Online.' }, { b: 'Payback estimate', t: 'a clear number for moving orders direct.' }].map((x) => (
                <li key={x.b} className="flex items-start gap-3 text-white/90"><Check size={18} className="mt-0.5 shrink-0" style={{ color: GOLD }} /><span><b className="text-white">{x.b}:</b> {x.t}</span></li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/60">No obligation, no pressure. Your details stay private.</p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-3xl px-5 text-center text-[11px] text-white/45">Photos via Burst by Shopify. Fee figures are illustrative.</p>
      </section>
    </div>
  )
}
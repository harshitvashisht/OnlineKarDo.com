import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Check, Clock3, CreditCard, Globe, MapPin, MessageCircle, QrCode, Share2, ShieldCheck, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import { SEO } from '../components/SEO'

const money = (value: number | string): string => `₹${Number(value).toLocaleString('en-IN')}`

/* ---------- Photos (free to use, Burst by Shopify). Swap for your own paths any time. ---------- */
const burst = (slug: string) => `https://burst.shopifycdn.com/photos/${slug}.jpg?width=1200&format=pjpg&exif=0&iptc=0`
const IMG = {
  open: burst('a-happy-store-owner-opens-for-the-day'),
  ready: burst('shop-owner-gets-ready'),
  online: burst('business-owner-working-on-online-store'),
  typing: burst('store-owners-hands-typing-away'),
  browse: burst('person-browses-clothing-racks-in-a-store'),
  shops: burst('person-shops-in-a-clothing-store'),
  people: burst('photo-of-people-shopping-in-a-clothing-store'),
}

/* ---------- Data ---------- */
interface Pack {
  label: string
  name: string
  description: string
  price: number
  includes: string[]
  delivery: string
  button: string
  image: string
  alt: string
  accent: string
  featured?: boolean
}

const packs: Pack[] = [
  { label: 'The essentials', name: 'Starter Digital Pack', description: 'A clean first step for getting found and contacted online.', price: 2999, includes: ['One-page template website', 'WhatsApp enquiry button', 'Google Maps and contact details', 'Social links', 'One revision round'], delivery: '24–48 hours*', button: 'Choose Starter', image: IMG.ready, alt: 'Shop owner getting the store ready for the day', accent: '#e36a27' },
  { label: 'The business basics', name: 'Business Digital Pack', description: 'A more complete digital presence for a growing local business.', price: 4999, includes: ['Up to 5 website pages', 'WhatsApp Business profile setup', 'Google Business Profile setup help', 'Instagram and Facebook pages', 'Basic SEO + one revision round'], delivery: 'about 48 hours*', button: 'Choose Business', image: IMG.typing, alt: 'Store owner typing on a laptop to check online orders', accent: '#55c9c0', featured: true },
  { label: 'The seller toolkit', name: 'Seller Digital Pack', description: 'A simple catalogue that helps customers browse and enquire.', price: 6999, includes: ['Template catalogue, up to 20 products', 'WhatsApp ordering buttons', 'Payment links or supported checkout', 'Instagram and Facebook pages', 'Shareable catalogue QR code'], delivery: '48–72 hours*', button: 'Choose Seller', image: IMG.browse, alt: 'Customer browsing clothing racks in a store', accent: '#d5a64b' },
]

const capabilities = [
  { icon: Globe, text: 'One-page website' },
  { icon: MessageCircle, text: 'WhatsApp enquiry button' },
  { icon: MapPin, text: 'Google Maps & contact details' },
  { icon: Share2, text: 'Social links' },
  { icon: Globe, text: 'Up to 5 pages' },
  { icon: MessageCircle, text: 'WhatsApp Business setup' },
  { icon: MapPin, text: 'Google Business Profile help' },
  { icon: ShoppingBag, text: 'Catalogue up to 20 products' },
  { icon: MessageCircle, text: 'WhatsApp ordering buttons' },
  { icon: CreditCard, text: 'Payment links' },
  { icon: QrCode, text: 'Catalogue QR code' },
]

const marqueePhotos = [
  { src: IMG.open, alt: 'Shop owner turning the sign to open' },
  { src: IMG.online, alt: 'Business owner working on an online store' },
  { src: IMG.shops, alt: 'Person shopping in a clothing store' },
  { src: IMG.ready, alt: 'Shop owner preparing the storefront' },
  { src: IMG.people, alt: 'People shopping in a store' },
  { src: IMG.typing, alt: 'Hands typing on a laptop keyboard' },
  { src: IMG.browse, alt: 'Customer browsing clothing racks' },
]

const monthlyPlans = [
  { name: 'Basic Care', price: 499, description: 'Uptime checks, backups and one minor content update.', icon: ShieldCheck, accent: '#4d7880' },
  { name: 'Social Lite', price: 999, description: 'Four template-based social posts each month.', icon: Share2, accent: '#bc7952' },
  { name: 'Social Growth', price: 1999, description: 'Eight posts, captions and scheduling.', icon: TrendingUp, accent: '#789166' },
  { name: 'Digital Care Plus', price: 2999, description: 'Eight posts, website care and up to two minor updates.', icon: Sparkles, accent: '#c39e48' },
]

const steps = [
  { title: 'Pick a pack', text: 'Choose the one that fits where your business is today. Prices are fixed and shown upfront.' },
  { title: 'Share your details', text: 'Send your business info, photos and links. We handle the setup from there.' },
  { title: 'Go live', text: 'Review your pages, request your revision, and start sharing your link and QR code.' },
]

const goodToKnow = [
  { q: 'When does the delivery clock start?', a: 'Delivery targets begin after we receive complete business details and any required account approvals.' },
  { q: 'Can verification take longer?', a: 'Yes. Third-party verification, for example for business profiles, can take longer than our own build time.' },
  { q: 'Are domain and hosting included?', a: 'Domain, hosting, payment gateway and other third-party fees are billed separately from the pack price.' },
  { q: 'Can I mix and match?', a: 'Yes. Start with a pack and add what you need, or choose individual services à la carte.' },
]

/* ---------- Small building blocks ---------- */
function Photo({ src, alt, className = '', tint = '#087b87' }: { src: string; alt: string; className?: string; tint?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <div role="img" aria-label={alt} className={className} style={{ background: `linear-gradient(135deg, ${tint}22, ${tint}55)` }} />
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

function Marquee({ children, reverse = false, duration = 40, className = '' }: { children: ReactNode; reverse?: boolean; duration?: number; className?: string }) {
  return (
    <div className={`pk-marquee ${className}`}>
      <div className="pk-track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div className="pk-set">{children}</div>
        <div className="pk-set pk-dup" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}

// Fades children in once when they scroll into view.
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    // Safety net: never leave content hidden if the observer doesn't fire.
    const timer = window.setTimeout(() => setShown(true), 2500)
    return () => { io.disconnect(); window.clearTimeout(timer) }
  }, [])
  return (
    <div ref={ref} className={`pk-reveal ${shown ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const styles = `
@keyframes pk-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes pk-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes pk-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.pk-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
.pk-track { display: flex; width: max-content; animation: pk-scroll 40s linear infinite; }
.pk-marquee:hover .pk-track { animation-play-state: paused; }
.pk-set { display: flex; flex-shrink: 0; align-items: center; }
.pk-hero-in > * { opacity: 0; animation: pk-rise .8s cubic-bezier(.2,.7,.2,1) forwards; }
.pk-hero-in > *:nth-child(1) { animation-delay: .05s; }
.pk-hero-in > *:nth-child(2) { animation-delay: .15s; }
.pk-hero-in > *:nth-child(3) { animation-delay: .27s; }
.pk-hero-in > *:nth-child(4) { animation-delay: .39s; }
.pk-float { animation: pk-float 6s ease-in-out infinite; }
.pk-float-b { animation: pk-float 7.5s ease-in-out -2s infinite; }
.pk-reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
.pk-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .pk-track, .pk-float, .pk-float-b { animation: none; }
  .pk-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .pk-dup { display: none; }
  .pk-hero-in > * { opacity: 1; animation: none; }
  .pk-reveal { opacity: 1; transform: none; transition: none; }
}
`

/* ---------- Page ---------- */
export default function PacksPage() {
  const { openEnquiry } = useEnquiry()

  return (
    <div className="page-wrapper">
      <SEO
        title="Setup Packs — Fixed-Price Digital Packs | OnlineKarDo"
        description="Choose from 3 fixed-price digital packs: Starter (₹2,999), Business (₹4,999), Seller (₹6,999), plus monthly care plans from ₹499. Clear scope and upfront pricing."
        canonical="/packs"
      />
      <style>{styles}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#e2f5f5] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_1fr]">
          <div className="pk-hero-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-[#087b87]">
              <span className="h-2 w-2 rounded-full bg-[#087b87]" /> One-time setup · Fixed prices
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[.95] tracking-[-.05em] text-[#102a3d] md:text-7xl">
              Pick your starting point.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4b5b68]">
              Clear scope and upfront pricing, so you can choose with confidence. Get a website, WhatsApp ordering and your local listings set up, starting at {money(packs[0].price)}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#packs" className="inline-flex items-center gap-2 rounded-full bg-[#087b87] px-6 py-3.5 font-semibold text-white transition hover:bg-[#075c68]">
                See the 3 packs <ArrowRight size={16} />
              </a>
              <a href="#monthly" className="inline-flex items-center gap-2 rounded-full border-2 border-[#102a3d]/25 px-6 py-3.5 font-semibold text-[#102a3d] transition hover:border-[#102a3d]">
                Monthly care plans
              </a>
            </div>
          </div>

          {/* Photo collage */}
          <div className="relative mx-auto hidden h-[480px] w-full max-w-[520px] lg:block">
            <div className="pk-float absolute left-0 top-6 h-72 w-60 overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(16,42,61,.22)]">
              <Photo src={IMG.open} alt="Shop owner turning the sign to open" className="h-full w-full" />
            </div>
            <div className="pk-float-b absolute right-0 top-0 h-60 w-60 overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(16,42,61,.22)]">
              <Photo src={IMG.online} alt="Business owner working on an online store" className="h-full w-full" />
            </div>
            <div className="pk-float absolute bottom-0 right-10 h-56 w-72 overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(16,42,61,.22)]">
              <Photo src={IMG.people} alt="People shopping in a store" className="h-full w-full" />
            </div>
            <div className="pk-float-b absolute bottom-28 left-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-lg">
              <MessageCircle size={16} className="text-[#25a244]" /> WhatsApp orders
            </div>
            <div className="pk-float absolute right-2 top-[268px] flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-lg">
              <MapPin size={16} className="text-[#e36a27]" /> Found on Google Maps
            </div>
          </div>
        </div>
      </section>

      {/* What's included marquee */}
      <section className="border-b border-[#e0eaee] bg-white py-6" aria-label="What the packs include">
        <Marquee duration={45}>
          {capabilities.map((c, i) => (
            <span key={i} className="mx-3 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#dbe6ea] bg-[#f3f8fa] px-5 py-2.5 text-sm font-medium text-[#102a3d]">
              <c.icon size={16} className="text-[#087b87]" /> {c.text}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Packs */}
      <section id="packs" className="bg-[#f3f8fa] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-[-.03em] text-[#102a3d] md:text-5xl">Three packs. One clear price each.</h2>
            <p className="mt-4 text-[#4b5b68]">Start small or go further. Every pack is a one-time setup with a defined scope.</p>
          </Reveal>

          <div className="grid items-stretch gap-7 md:grid-cols-3">
            {packs.map((pack, index) => (
              <Reveal key={pack.name} delay={index * 120} className="h-full">
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(16,42,61,.18)] ${
                    pack.featured
                      ? 'border-[#173c30] bg-[#173c30] text-[#fffaf0] shadow-[0_24px_60px_rgba(23,60,48,.35)] md:-translate-y-3'
                      : 'border-[#e0eaee] bg-white text-[#102a3d] shadow-[0_14px_42px_rgba(16,42,61,.08)]'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Photo src={pack.image} alt={pack.alt} tint={pack.accent} className="h-full w-full transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#102a3d]">{pack.label}</span>
                    {pack.featured && <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#102a3d]" style={{ background: pack.accent }}>Most popular</span>}
                    <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: pack.accent }} />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-2xl font-bold">{pack.name}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${pack.featured ? 'text-[#fffaf0]/75' : 'text-[#5e6b76]'}`}>{pack.description}</p>

                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="text-5xl font-bold tracking-tight">{money(pack.price)}</span>
                      <span className={`text-sm ${pack.featured ? 'text-[#fffaf0]/65' : 'text-[#5e6b76]'}`}>one time</span>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {pack.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${pack.accent}33` }}>
                            <Check size={12} style={{ color: pack.featured ? pack.accent : '#102a3d' }} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-6 flex items-center gap-2 text-sm ${pack.featured ? 'text-[#fffaf0]/75' : 'text-[#5e6b76]'}`}>
                      <Clock3 size={14} /> Target: {pack.delivery}
                    </div>

                    <button
                      className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 font-semibold transition ${
                        pack.featured ? 'bg-[#55c9c0] text-[#102a3d] hover:bg-white' : 'bg-[#087b87] text-white hover:bg-[#075c68]'
                      }`}
                      onClick={() => openEnquiry(pack.name)}
                    >
                      {pack.button} <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-[#6b7782]">
            *Delivery targets begin after complete business details and required account approvals. Third-party verification can take longer. Domain, hosting, gateway and other third-party fees are billed separately.
          </p>
        </div>
      </section>

      {/* Monthly care plans */}
      <section id="monthly" className="relative overflow-hidden bg-[#f7f6ef] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e2ebec] px-4 py-1.5 text-sm font-semibold text-[#087b87]">
                <span className="h-2 w-2 rounded-full bg-[#087b87]" /> Ongoing support
              </span>
              <h2 className="mt-5 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-[#102a3d] md:text-6xl">
                Your online presence, well looked after.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#4b5b68]">
                Thoughtful monthly help to keep your website fresh, your content moving and the little things taken care of. Plans start at {money(monthlyPlans[0].price)} a month.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative h-64 overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(16,42,61,.16)] md:h-80">
                <Photo src={IMG.online} alt="Business owner keeping an online store up to date" className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102a3d]/55 to-transparent" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#102a3d] shadow-lg">
                  <ShieldCheck size={16} className="text-[#087b87]" /> Website care, handled
                </span>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {monthlyPlans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 100} className="h-full">
                <article className="group flex h-full flex-col rounded-[24px] border border-[#dce4e2] bg-white p-7 shadow-[0_14px_42px_rgba(35,52,39,0.07)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_54px_rgba(35,52,39,0.15)]" style={{ borderTop: `4px solid ${plan.accent}` }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6" style={{ background: `${plan.accent}22` }}>
                    <plan.icon size={24} style={{ color: plan.accent }} />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#102a3d]">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold tracking-tight text-[#102a3d]">{money(plan.price)}</span>
                    <span className="text-sm text-[#5e6b76]">/ month</span>
                  </div>
                  <p className="mt-4 flex-1 leading-relaxed text-[#5e6b76]">{plan.description}</p>
                  <button
                    className="mt-6 inline-flex items-center gap-1.5 font-bold text-[#087b87] transition hover:text-[#cf4188]"
                    onClick={() => openEnquiry(`${plan.name} monthly plan`)}
                  >
                    Ask about this plan <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-[#6b7782]">
            Social plans cover creating and publishing template-based posts. They don't include ad management, daily customer replies or guaranteed leads, followers or sales.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-[-.03em] text-[#102a3d] md:text-5xl">From choosing to going live in three steps.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <div className="h-full rounded-[24px] border border-[#e0eaee] bg-[#f3f8fa] p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#087b87] text-lg font-bold text-white">{i + 1}</span>
                  <h3 className="mt-5 text-xl font-bold text-[#102a3d]">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#5e6b76]">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo marquee */}
      <section className="overflow-hidden bg-[#102a3d] py-16" aria-label="Local businesses">
        <p className="mb-8 px-5 text-center text-sm font-semibold uppercase tracking-wider text-[#55c9c0]">Built for the shops, cafés and sellers around you</p>
        <Marquee duration={60}>
          {marqueePhotos.map((p, i) => (
            <div key={i} className="mx-3 h-56 w-80 shrink-0 overflow-hidden rounded-[24px]">
              <Photo src={p.src} alt={p.alt} className="h-full w-full transition-transform duration-700 hover:scale-110" />
            </div>
          ))}
        </Marquee>
        <Marquee duration={70} reverse className="mt-6">
          {[...marqueePhotos].reverse().map((p, i) => (
            <div key={i} className="mx-3 h-44 w-64 shrink-0 overflow-hidden rounded-[24px] opacity-90">
              <Photo src={p.src} alt={p.alt} className="h-full w-full transition-transform duration-700 hover:scale-110" />
            </div>
          ))}
        </Marquee>
        <p className="mt-6 text-center text-xs text-white/40">Photos via Burst by Shopify.</p>
      </section>

      {/* Good to know */}
      <section className="bg-[#f3f8fa] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal className="mb-10 text-center">
            <h2 className="text-4xl font-bold tracking-[-.03em] text-[#102a3d] md:text-5xl">Good to know before you start</h2>
          </Reveal>
          <div className="space-y-3">
            {goodToKnow.map((item, i) => (
              <details key={item.q} open={i === 0} className="group rounded-2xl border border-[#e0eaee] bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#102a3d]">
                  {item.q}
                  <span className="text-xl text-[#087b87] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-[#5e6b76]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#173c30] to-[#285842] py-20 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-4xl font-bold tracking-[-.03em] md:text-5xl">Want to build your own bundle?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">Choose individual services à la carte or start with a pack and add what you need.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-[#55c9c0] px-7 py-3.5 font-semibold text-[#102a3d] transition hover:bg-white">
              View all services <ArrowUpRight size={16} />
            </Link>
            <a href="#monthly" className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10">
              See monthly plans
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
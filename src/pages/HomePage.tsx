import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Zap, Globe, Smartphone, Target, Users, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEnquiry } from '../context/EnquiryContext'
import { SEO, OrganizationSchema } from '../components/SEO'

const money = (value: number | string): string => `₹${Number(value).toLocaleString('en-IN')}`

const services = [
  {
    number: '01',
    icon: Zap,
    title: 'Web Design & Development',
    tagline: 'A polished website that answers the right questions.',
    description: 'One-page and 3–5 page business websites, with domain, email and basic SEO setup options.',
    services: ['One-page website', '3–5 page website', 'Domain setup', 'Business email', 'Basic SEO', 'Contact flows'],
    tech: ['Responsive design', 'Custom domain', 'Search basics'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85',
    alt: 'Modern web design workspace',
    gradient: 'from-[#714be8] to-[#d84e99]',
    cta: 'Explore Web',
    href: '/services'
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'WhatsApp Commerce',
    tagline: 'Make it easier for customers to ask and order.',
    description: 'Set up a WhatsApp Business profile and a browsable catalogue that helps customers start a clear order enquiry.',
    services: ['WhatsApp ordering catalogue', 'Business profile setup', 'Product details', 'Order enquiry flow', 'Business hours', 'Contact links'],
    tech: ['WhatsApp Business', 'Product catalogue'],
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85',
    alt: 'WhatsApp ordering on mobile',
    gradient: 'from-[#25d366] to-[#128c7e]',
    cta: 'Explore WhatsApp',
    href: '/services/whatsapp-ordering-catalogue'
  },
  {
    number: '03',
    icon: Globe,
    title: 'Local Discovery & Social',
    tagline: 'Keep your important business details in view.',
    description: 'Set up a Google Business Profile and social pages with clear contact details customers can use.',
    services: ['Google Business Profile', 'Instagram Business', 'Facebook Business Page', 'Business details', 'Contact buttons', 'Local SEO basics'],
    tech: ['Google Business', 'Instagram', 'Facebook'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85',
    alt: 'Local business on Google Maps',
    gradient: 'from-[#4285f4] to-[#0866ff]',
    cta: 'Explore Local',
    href: '/services/google-business-profile-setup'
  }
]

const stats = [
  { value: '24', label: 'Business types catered for' },
  { value: '24–72h', label: 'Delivery targets*' },
  { value: '3', label: 'Fixed-price packs' },
  { value: '14', label: 'Setup services' },
  { value: '8', label: 'Interactive demos' },
  { value: '4', label: 'Monthly care plans' }
]

const problems = [
  {
    icon: Target,
    title: 'One clear starting point',
    description: 'Bring your website, WhatsApp, local listing and social setup into one focused conversation.'
  },
  {
    icon: Users,
    title: 'Useful pieces that connect',
    description: 'Choose the parts you need now, with a clear scope and practical next steps for your business.'
  },
{
    icon: TrendingUp,
    title: 'Two equal doors',
    description: `Starting fresh or building on what exists? Choose the kind of digital setup that fits what your business needs now.`
  }
]

const doors = [
  {
    title: 'Start from zero',
    subtitle: 'Build something new',
    description: "You're launching a shop, clinic, studio or service and need a simple, professional way to introduce it online.",
    bullets: [
      'Brand-consistent website or store',
      'WhatsApp enquiry or catalogue setup',
      'Google Business Profile setup help',
      'Social profile setup options',
      'Basic SEO options for selected websites'
    ],
    cta: 'Plan a new build',
    variant: 'primary'
  },
  {
    title: 'Improve what exists',
    subtitle: 'Build on what already exists',
    description: `You already have an online presence. Choose one useful improvement, from clearer website pages to better-organized contact and product details.`,
    bullets: [
      'Add or improve key website pages',
      'Organize products for WhatsApp enquiries',
      'Review business listing details',
      'Bring social profile information up to date',
      'Choose focused support as you grow'
    ],
    cta: 'Start a rebuild',
    variant: 'outline'
  }
]

const processSteps = [
  { number: '01', title: 'Choose a direction', description: 'Pick a service, a setup pack or ongoing care based on what your customers need next.' },
  { number: '02', title: 'Share the details', description: 'Tell us about your business, your audience and the content you want to show.' },
  { number: '03', title: 'We prepare the setup', description: 'We adapt the selected template and configure its agreed features around your details.' },
  { number: '04', title: 'Review together', description: 'Check the information and sample, then send one consolidated round of changes.' },
  { number: '05', title: 'Launch and hand over', description: 'Get the finished setup and guidance for sharing it with your customers.' }
]

function ProcessExperience({ onEnquiry }: { onEnquiry: () => void }) {
  const [activeStep, setActiveStep] = useState(0)
  const step = processSteps[activeStep]
  const showStep = (index: number) => setActiveStep((index + processSteps.length) % processSteps.length)

  return (
    <section className="process-section overflow-hidden bg-[#11101a] py-20 text-white md:py-28 lg:py-32" aria-labelledby="process-title">
      <div className="container">
        <div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="max-w-xl">
            <span className="eyebrow mb-4 inline-block text-[#c8b6ff]">Our process</span>
            <h2 id="process-title" className="font-display text-4xl leading-[.98] tracking-[-.065em] md:text-5xl lg:text-6xl">A clear path from<br />idea to launch.</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">Five practical stages keep your setup moving, with a clear view of what happens next.</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end" role="tablist" aria-label="Setup process steps">
            {processSteps.map((item, index) => (
              <button key={item.number} id={`process-tab-${index}`} type="button" role="tab" aria-selected={activeStep === index} aria-controls="process-panel" onClick={() => showStep(index)} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${activeStep === index ? 'border-[#c8b6ff] bg-[#c8b6ff] text-[#21133e]' : 'border-white/20 text-white/70 hover:border-white/50 hover:text-white'}`}>
                {item.number} <span className="hidden sm:inline">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${activeStep}`} className="relative mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#29204a] via-[#1a2340] to-[#0d555d] p-7 md:p-12 lg:mt-14 lg:p-16">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#d84e99]/20 blur-3xl" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div key={activeStep} className="max-w-3xl animate-[fade-up_.45s_ease-out_both]">
              <span className="font-display text-7xl font-bold tracking-[-.08em] text-[#c8b6ff] md:text-8xl">{step.number}</span>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-.05em] md:text-5xl">{step.title}</h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{step.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Previous process step" onClick={() => showStep(activeStep - 1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/35 transition hover:bg-white/10"><ArrowLeft size={18} /></button>
              <button type="button" aria-label="Next process step" onClick={() => showStep(activeStep + 1)} className="grid h-12 w-12 place-items-center rounded-full bg-[#63d6c8] text-[#062d43] transition hover:bg-[#91f0e2]"><ArrowRight size={18} /></button>
              <button type="button" onClick={onEnquiry} className="ml-2 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#211d2b] transition hover:-translate-y-0.5 hover:bg-[#c8b6ff]">Ask about a setup <ArrowUpRight size={15} /></button>
            </div>
          </div>
          <div className="relative mt-10 h-1 overflow-hidden rounded-full bg-white/15" aria-hidden="true"><div className="h-full rounded-full bg-[#63d6c8] transition-all duration-500" style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }} /></div>
        </div>
      </div>
    </section>
  )
}

const packs = [
  {
    label: 'THE ESSENTIALS',
    icon: '◌',
    name: 'Starter Digital Pack',
    description: 'A clean first step for getting found and contacted online.',
    price: 2999,
    includes: ['One-page template website', 'WhatsApp enquiry button', 'Google Maps and contact details', 'Social links', 'One revision round'],
    delivery: '24–48 hours*',
    button: 'Choose Starter',
    featured: false,
    borderColor: 'border-[#714be8]'
  },
  {
    label: 'THE BUSINESS BASICS',
    icon: '✳',
    name: 'Business Digital Pack',
    description: 'A more complete digital presence for a growing local business.',
    price: 4999,
    includes: ['Up to 5 website pages', 'WhatsApp Business profile setup', 'Google Business Profile setup help', 'Instagram and Facebook pages', 'Basic SEO + one revision round'],
    delivery: 'about 48 hours*',
    button: 'Choose Business',
    featured: true,
    borderColor: 'border-[#422293]'
  },
  {
    label: 'THE SELLER TOOLKIT',
    icon: '▧',
    name: 'Seller Digital Pack',
    description: 'A simple catalogue that helps customers browse and enquire.',
    price: 6999,
    includes: ['Template catalogue, up to 20 products', 'WhatsApp ordering buttons', 'Payment links or supported checkout', 'Instagram and Facebook pages', 'Shareable catalogue QR code'],
    delivery: '48–72 hours*',
    button: 'Choose Seller',
    featured: false,
    borderColor: 'border-[#40bfc9]'
  }
]

const phonePreviews = [
  { title: 'Product catalogue', caption: 'Browse products with ease', type: 'catalogue' },
  { title: 'WhatsApp ordering', caption: 'Start a ready-to-send order', type: 'orders' },
  { title: 'Payment page', caption: 'Payment setup, where supported', type: 'payment' },
  { title: 'Social business page', caption: 'A consistent online identity', type: 'social' },
  { title: 'Digital menu + QR', caption: 'Ready to share at the counter', type: 'menu' },
  { title: 'One-page website', caption: 'A clear introduction to your work', type: 'website' },
  { title: 'Local search listing', caption: 'Key details in one place', type: 'search' },
  { title: 'Link-in-bio page', caption: 'Turn one link into many paths', type: 'bio' }
]

const businesses = [
  ['Bakery', '🥐', 'food', 'Orders & celebration requests'], ['Clinic', '🩺', 'services', 'Appointment requests'],
  ['Garment shop', '🧵', 'retail', 'Product catalogue & sizing'], ['Cafe', '☕', 'food', 'Menu & pickup orders'],
  ['Restaurant', '🍽️', 'food', 'Menu & table requests'], ['Supermarket', '🛒', 'retail', 'Product list & delivery'],
  ['Salon', '✂️', 'services', 'Services & appointments'], ['Home kitchen', '🍲', 'food', 'Daily menu & pre-orders'],
  ['Handmade gifts', '🎁', 'retail', 'Custom catalogue'], ['Event decor', '💐', 'services', 'Portfolio & enquiries'],
  ['AC & appliance repair', '🔧', 'services', 'Service requests'], ['Yoga studio', '🧘', 'community', 'Classes & enrolment'],
  ['Homestay', '🏡', 'community', 'Rooms & booking enquiries'], ['Dental clinic', '🦷', 'services', 'Appointments & care info'],
  ['Hardware store', '🪛', 'retail', 'Product catalogue'], ['Nursery & farm produce', '🌱', 'retail', 'Seasonal product list'],
  ['PG & hostel', '🛏️', 'community', 'Rooms & visit requests'], ['School', '📚', 'community', 'Admissions & information'],
  ['Coaching centre', '✏️', 'community', 'Courses & enquiries'], ['Builder', '🏗️', 'services', 'Projects & enquiries'],
  ['Showroom', '🏬', 'retail', 'Products & store details'], ['Gym', '🏋️', 'services', 'Membership enquiries'],
  ['Photographer', '📷', 'services', 'Portfolio & bookings'], ['Florist', '🌷', 'retail', 'Bouquets & custom orders']
]

interface PhonePreviewProps {
  type: string
}
function PhonePreview({ type }: PhonePreviewProps) {
  if (type === 'catalogue') return (
    <>
      <div className="phone-brand"><span>THE DAILY LOAF</span><b>☰</b></div>
      <div className="phone-hero-block"><small>FRESH FROM OUR OVEN</small><b>A little something<br />for your table.</b></div>
      <div className="phone-row"><span>Today's favourites</span><b>View all ↗</b></div>
      <div className="phone-foods"><i>🥐</i><i>🍞</i><i>🥧</i></div>
      <div className="phone-button">Browse the menu</div>
    </>
  )
  if (type === 'orders') return (
    <>
      <div className="phone-brand"><span>Order from NILA</span><b>···</b></div>
      <div className="order-welcome"><small>HELLO, NEIGHBOUR 👋</small><b>What can we<br />get started for you?</b></div>
      <div className="order-item"><i>🥬</i><span><b>Fresh greens box</b><small>Picked this morning</small></span><b>₹240</b></div>
      <div className="order-item"><i>🥭</i><span><b>Seasonal fruit bag</b><small>About 2 kg</small></span><b>₹320</b></div>
      <div className="phone-button whatsapp-button">◉ Send order on WhatsApp</div>
    </>
  )
  if (type === 'payment') return (
    <>
      <div className="phone-brand"><span>YOUR PAYMENT</span><b>•••</b></div>
      <div className="payment-mark">₹</div>
      <small className="payment-caption">PAYMENT REQUEST</small>
      <b className="payment-total">₹1,250</b>
      <span className="payment-caption">Advance for your custom order</span>
      <div className="payment-detail"><span>Order</span><b>Custom celebration cake</b></div>
      <div className="payment-detail"><span>From</span><b>The Sugar Window</b></div>
      <div className="phone-button">Continue to payment</div>
      <small className="payment-safe">Secure payment options depend on your account.</small>
    </>
  )
  if (type === 'social') return (
    <>
      <div className="social-top">◉ &nbsp;THREAD & THIMBLE <b>＋</b></div>
      <div className="social-profile"><i>TT</i><span><b>threadandthimble</b><small>Thoughtful everyday wear<br />Made in Bengaluru</small></span></div>
      <div className="social-stats"><span><b>New</b><small>arrivals</small></span><span><b>Made</b><small>with care</small></span><span><b>Shop</b><small>local</small></span></div>
      <div className="social-image">✺<small>THE EVERYDAY EDIT</small></div>
      <div className="social-copy">Easy pieces, made for all your days. Drop us a message to find your fit.</div>
    </>
  )
  if (type === 'menu') return (
    <>
      <div className="menu-cover"><small>GOOD FOOD, GOOD MOOD</small><b>THE<br />GARDEN<br />TABLE</b><i>✿</i></div>
      {['Small plates', 'From the garden', 'Something sweet'].map((item, i) => <div className="menu-row" key={item}><span>{item}</span><b>0{i + 3}</b></div>)}
      <div className="qr-row"><span className="qr-mini">▦</span><span>Scan to browse<br /><b>Menu & ordering</b></span></div>
    </>
  )
  if (type === 'website') return (
    <>
      <div className="website-top"><b>STUDIO<br />FORME</b><span>MENU<br />☰</span></div>
      <div className="website-image">FORM<br />MEETS<br />FUNCTION</div>
      <div className="website-note"><small>INTERIOR DESIGN · BENGALURU</small><b>Spaces that feel<br />like you.</b><span>Our approach ↗</span></div>
      <div className="website-footer">01 &nbsp; PROJECTS &nbsp;&nbsp; ABOUT</div>
    </>
  )
  if (type === 'search') return (
    <>
      <div className="search-head">◉ &nbsp; Search nearby</div>
      <div className="search-bar">⌕ &nbsp; baker near me</div>
      <div className="listing"><div className="listing-photo">🥖</div><div><b>The Daily Loaf</b><div className="stars">★★★★★</div><small>Bakery · Open until 8 pm</small><small>Fresh bakes, made daily</small></div></div>
      <div className="listing-actions"><span>☎ Call</span><span>↗ Directions</span><span>◎ Website</span></div>
      <div className="map-squiggle">⌖<small>Easy to find.<br />Easy to reach.</small></div>
    </>
  )
  return (
    <>
      <div className="bio-avatar">AK</div>
      <h4>ANANYA KAPOOR</h4>
      <small>Photographer & visual storyteller</small>
      {['View my portfolio', 'Book a session', 'Print shop', 'Say hello on WhatsApp'].map((item, i) => <div className={`bio-link ${i === 3 ? 'bio-accent' : ''}`} key={item}>{item}<b>↗</b></div>)}
      <div className="bio-bottom">Made with care ✳</div>
    </>
  )
}

export default function HomePage() {
  const { openEnquiry } = useEnquiry()
  return (
    <>
      <SEO
        title="Digital Setup for Local Business | OnlineKarDo"
        description="Websites, WhatsApp ordering and digital setup for Indian small businesses. Pick a fixed-price pack and get started with OnlineKarDo."
        canonical="/"
        ogImage="/assets/onlinekardo-logo.jpeg"
      />
      <OrganizationSchema />

      {/* Immersive homepage hero */}
      <section className="relative isolate mx-3 mt-3 min-h-[880px] overflow-hidden rounded-[30px] bg-[#082c50] pb-8 pt-36 text-white shadow-[0_26px_80px_rgba(6,31,61,.22)] md:mx-5 md:mt-5 md:min-h-[calc(100svh-40px)] md:rounded-[38px] md:pt-44 xl:mx-8 xl:mt-6 xl:min-h-[calc(100svh-48px)]">
        <img src="https://images.unsplash.com/photo-1621868579917-560fc2c68ec0?auto=format&fit=crop&w=2600&q=90" alt="A sea turtle moving through clear blue ocean water" fetchPriority="high" className="absolute inset-0 -z-30 h-full w-full object-cover object-center motion-safe:animate-[hero-drift_24s_ease-in-out_infinite_alternate]" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#071e42]/90 via-[#07547c]/64 to-[#057f9b]/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#052649]/90 via-[#073a63]/10 to-[#072b50]/35" />
        <div className="absolute inset-0 -z-10 opacity-25 [background:radial-gradient(circle_at_75%_16%,rgba(134,244,239,.7),transparent_24%),radial-gradient(circle_at_13%_68%,rgba(89,190,235,.38),transparent_30%)]" />
        <div className="absolute right-[10%] top-[20%] -z-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-[100px] motion-safe:animate-soft-float" />
        <div className="container relative z-10 flex min-h-[610px] flex-col justify-center px-4 pb-20 md:min-h-[620px] md:px-12 lg:px-16 xl:min-h-[650px]">
          <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-cyan-100 backdrop-blur-md md:text-xs">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#71f0dd] opacity-60 motion-reduce:animate-none"/><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#71f0dd]"/></span>
            Digital foundations for local business
          </div>
          <h1 className="!mb-7 !max-w-[1280px] !font-display !text-[clamp(3.15rem,9.8vw,9rem)] !leading-[.86] !tracking-[-.085em] !text-white">Make your business<br className="hidden sm:block"/> <span className="text-[#a2f5eb]">easy to find.</span></h1>
          <p className="!mb-8 !max-w-[760px] !text-lg !leading-relaxed !text-white/85 md:!text-2xl">A confident website, simple ways to enquire and the right details in the right places — brought together in one clear digital setup.</p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <button className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#63d6c8] px-7 py-4 text-sm font-extrabold text-[#062d43] shadow-[0_12px_35px_rgba(4,24,49,.24)] transition duration-300 hover:-translate-y-1 hover:bg-[#91f0e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:px-9 md:text-base" onClick={() => openEnquiry('General enquiry')}>Let&apos;s talk <ArrowUpRight size={18}/></button>
            <Link to="/examples" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/55 bg-white/[.08] px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:px-9 md:text-base">Explore the demos <ArrowUpRight size={17}/></Link>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80 md:text-base"><Check size={16} className="text-[#91f0e2]"/><span>Clear scope</span><span className="text-white/35">/</span><span>Upfront pricing from <b className="text-white">₹499</b></span><span className="text-white/35">/</span><span>Built for phones first</span></div>
        </div>
        <div className="container relative z-10 mt-2 px-4 md:px-12 lg:px-16">
          <div className="border-t border-white/30 pt-5 md:pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <span className="text-xs font-semibold uppercase tracking-[.16em] text-white/65">A setup that meets customers where they are</span>
              <div className="flex flex-wrap items-center gap-3 md:gap-4" aria-label="Platforms OnlineKarDo helps businesses set up">
                <span className="rounded-full border border-white/25 bg-white/[.08] px-4 py-2 text-sm font-bold text-white/90 backdrop-blur-sm">Google Business</span>
                <span className="rounded-full border border-white/25 bg-white/[.08] px-4 py-2 text-sm font-bold text-white/90 backdrop-blur-sm">WhatsApp</span>
                <span className="rounded-full border border-white/25 bg-white/[.08] px-4 py-2 text-sm font-bold text-white/90 backdrop-blur-sm">Instagram</span>
                <span className="rounded-full border border-white/25 bg-white/[.08] px-4 py-2 text-sm font-bold text-white/90 backdrop-blur-sm">Razorpay</span>
              </div>
            </div>
          </div>
        </div>
        <a href="#homepage-content" aria-label="Scroll to explore OnlineKarDo" className="absolute bottom-28 right-5 z-10 hidden h-12 w-12 animate-bounce place-items-center rounded-full border border-white/45 bg-white/10 text-white backdrop-blur-md motion-reduce:animate-none md:grid"><ChevronDown size={19}/></a>
      </section>
      <div id="homepage-content" className="scroll-mt-8" />

      {/* Stats Bar */}
      <section className="stats-bar bg-[#171521] py-8 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 border-l border-white/15 pl-4 lg:border-l-0 lg:pl-0 lg:justify-center">
                <b className="font-display text-3xl md:text-4xl tracking-[-.06em] text-[#c8b6ff]">{stat.value}</b>
                <span className="max-w-32 text-xs leading-snug text-white/65 text-center lg:text-left">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="problem-section bg-white py-20 md:py-28 lg:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <span className="eyebrow inline-block mb-4 text-[#d64d92] font-medium">The problem isn't capability</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.065em] text-[#211d2b] mb-6">
              It's the <span className="text-[#714be8]">gaps between</span> four vendors.
            </h2>
            <p className="text-lg leading-relaxed text-[#676372] max-w-2xl mx-auto">
              Most businesses don't fail because their web person, WhatsApp person, Google person, or social person is bad. They fail in the handoffs, the missed context, the "that's not our scope," the timeline nobody owns. OnlineKarDo removes the gaps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {problems.map((problem, i) => (
              <article key={problem.title} className="problem-card group p-6 lg:p-8 rounded-2xl border border-[#e7e2ef] bg-white hover:border-[#d5d0e0] hover:shadow-[0_20px_50px_rgba(42,29,79,0.08)] transition-all duration-300">
                <div className={`problem-icon w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${i === 0 ? 'bg-[#eee9ff] text-[#714be8]' : i === 1 ? 'bg-[#ffe7f1] text-[#cf4188]' : 'bg-[#e7f8ff] text-[#0891b2]'}`}>
                  <problem.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#211d2b] mb-3">{problem.title}</h3>
                <p className="text-[#676372] leading-relaxed">{problem.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do - Three Pillars */}
      <section className="services-pillars bg-[#f7f5fb] py-20 md:py-28 lg:py-32">
        <div className="container">
          <div className="mb-12 lg:mb-16 max-w-3xl">
            <span className="eyebrow inline-block mb-4 text-[#714be8]">What we do</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.065em] text-[#211d2b] mb-4">
              Everything your digital presence needs.<br /><span className="text-[#714be8]">Under one partner.</span>
            </h2>
            <p className="text-lg leading-relaxed text-[#676372]">
              With OnlineKarDo, businesses bring their vision to life through strategic web design, seamless WhatsApp commerce, and impactful local presence — all under one creative partner.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-20">
            {services.map((service, index) => (
              <article key={service.title} className="service-pillar relative grid lg:grid-cols-[1.1fr_.9fr] lg:gap-12 items-start">
                {/* Content */}
                <div className="service-content space-y-6 pr-4 lg:pr-8">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <span className="service-label inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/10 px-3 py-1.5 text-[9px] font-bold tracking-[.15em] backdrop-blur text-white">
                        {service.number}
                      </span>
                      <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-[-0.04em] text-[#171521]">{service.title}</h3>
                    </div>
                    <div className={`pillar-icon w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${index === 0 ? 'bg-gradient-to-br from-[#714be8] to-[#d84e99]' : index === 1 ? 'bg-gradient-to-br from-[#25d366] to-[#128c7e]' : 'bg-gradient-to-br from-[#4285f4] to-[#0866ff]'}`}>
                      <service.icon size={32} className="text-white" />
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed text-[#5d5a68] max-w-xl">{service.tagline}</p>
                  <p className="text-[#676372] leading-relaxed max-w-xl">{service.description}</p>

                  {/* Services List */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {service.services.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-[#676372] group">
                        <Check className="text-[#714be8] transition-transform group-hover:translate-x-1" size={14} />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#e7e3ef]">
                    <span className="text-xs font-medium text-[#aaa6b2] uppercase tracking-wide">Built on:</span>
                    {service.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.08em] rounded-full border border-[#e7e3ef] bg-white text-[#676372] hover:border-[#714be8] hover:text-[#714be8] transition-colors">{t}</span>
                    ))}
                  </div>

                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-2 font-bold text-[#714be8] hover:gap-3 transition-all mt-2"
                  >
                    {service.cta} <ArrowUpRight size={16} />
                  </Link>
                </div>

                {/* Visual */}
                <div className="service-visual relative lg:sticky lg:top-24">
                  <div className="aspect-[4/3] lg:aspect-[3/2] rounded-[28px] overflow-hidden shadow-[0_20px_55px_rgba(35,28,52,.14)]">
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${index === 0 ? 'from-[#271e4b]/90 via-[#271e4b]/20 to-transparent' : index === 1 ? 'from-[#112e27]/90 via-[#112e27]/20 to-transparent' : 'from-[#172542]/90 via-[#172542]/20 to-transparent'}`} />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <span className="rounded-full border border-white/40 bg-black/15 px-3 py-1.5 text-[9px] font-bold tracking-[.16em] text-white backdrop-blur-md w-fit">
                        {index === 0 ? 'WEB DESIGN' : index === 1 ? 'WHATSAPP COMMERCE' : 'LOCAL DISCOVERY'}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Two Doors Section */}
      <section className="doors-section bg-white py-20 md:py-28 lg:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <span className="eyebrow inline-block mb-4 text-[#714be8]">Whichever door you walk in</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.065em] text-[#211d2b] mb-4">
              You're in the right place.
            </h2>
            <p className="text-lg leading-relaxed text-[#676372] max-w-2xl mx-auto">
              Starting from zero or building on an existing setup? Choose a practical next step that fits your business today.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {doors.map((door, i) => (
              <article key={door.title} className={`door-card p-8 lg:p-10 rounded-2xl ${i === 0 ? 'bg-[#171521] text-white' : 'bg-[#faf9ff] border border-[#e7e3ef]'}`}>
                <div className="door-header mb-8">
                  <span className={`eyebrow inline-block mb-3 ${i === 0 ? 'text-[#f8e36d]' : 'text-[#714be8]'}`}>{door.subtitle}</span>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-[-0.04em]">{door.title}</h3>
                </div>
                <p className={`text-lg leading-relaxed mb-8 ${i === 0 ? 'text-white/80' : 'text-[#676372]'}`}>{door.description}</p>

                <ul className="space-y-4 mb-10">
                  {door.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-[#f8e36d] text-[#302669]' : 'bg-[#714be8] text-white'}`}>✓</span>
                      <span className={`${i === 0 ? 'text-white/90' : 'text-[#5d5a68]'} leading-relaxed`}>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 px-6 rounded-full font-bold text-base transition-all ${i === 0 ? 'bg-[#f8e36d] text-[#302669] hover:bg-[#e8d05a]' : 'bg-[#714be8] text-white hover:bg-[#5e3ad0] border border-transparent'}`}
                  onClick={() => openEnquiry(door.cta)}
                >
                  {door.cta} <ArrowUpRight size={16} className="ml-2" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProcessExperience onEnquiry={() => openEnquiry('General enquiry')} />

      {/* Packs Section */}
      <section className="packs-section bg-white py-20 md:py-28 lg:py-32" id="packs">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <span className="eyebrow inline-block mb-4 text-[#714be8]">One-time setup</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.065em] text-[#211d2b] mb-4">
              Pick your starting point.
            </h2>
            <p className="text-lg leading-relaxed text-[#676372]">
              Clear scope and upfront pricing, so you can choose with confidence. Choose one pack, then tell us what your business needs.
            </p>
          </div>

          <div className="pack-grid grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {packs.map((pack) => (
              <article
                key={pack.name}
                className={`pack-card relative p-7 lg:p-8 rounded-[24px] border ${pack.borderColor} bg-white shadow-[0_18px_45px_rgba(42,29,79,0.08)] ${pack.featured ? 'border-2 scale-[1.02] z-10' : ''} flex flex-col`}
              >
                {pack.featured && (
                  <div className="featured-tag absolute -top-3 right-6 bg-[#714be8] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[.08em]">
                    MOST POPULAR
                  </div>
                )}

                <div className="pack-top flex justify-between items-start mb-6">
                  <span className="pack-label text-[10px] font-bold uppercase tracking-[.13em] text-[#73707e]">{pack.label}</span>
                  <span className="pack-emoji text-3xl">{pack.icon}</span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-[#211d2b] mb-3">{pack.name}</h3>
                <p className="pack-desc text-[#676372] leading-relaxed mb-6 flex-1">{pack.description}</p>

                <div className="pack-price font-display text-4xl font-bold text-[#211d2b] mb-6">
                  {money(pack.price)} <span className="font-normal text-base font-sans text-[#73707e]">one time</span>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {pack.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#676372]">
                      <Check className="text-[#714be8] flex-shrink-0 mt-0.5" size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pack-delivery flex items-center gap-2 text-sm text-[#73707e] mb-6 px-3 py-2 rounded-lg bg-[#faf9ff]">
                  <Check className="text-[#714be8]" size={14} />
                  <span>Target: {pack.delivery}</span>
                </div>

                <button
                  className={`button pack-action w-full justify-center ${pack.featured ? 'button-primary bg-[#714be8] text-white hover:bg-[#5e3ad0]' : 'button-outline border-[#e7e3ef] text-[#714be8] hover:bg-[#faf9ff]'}`}
                  onClick={() => openEnquiry(pack.name)}
                >
                  {pack.button} <ArrowUpRight size={15} />
                </button>
              </article>
            ))}
          </div>

          <p className="pricing-footnote text-center text-sm text-[#73707e] mt-8 max-w-2xl mx-auto">
            *Delivery targets begin after complete business details and required account approvals. Third-party verification can take longer. Domain, hosting, gateway and other third-party fees are billed separately.
          </p>
        </div>
      </section>

      {/* Phone Previews Section */}
      <section className="showcase-section bg-[#fff5fa] py-20 md:py-28 lg:py-32" id="examples">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <span className="eyebrow inline-block mb-4 text-[#714be8]">Picture your business here</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.065em] text-[#211d2b]">
                Small screen.<br /><span className="text-[#714be8]">Big first impression.</span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-[#676372] max-w-md lg:max-w-xl">
              Practical, phone-first pages designed around how customers actually browse, ask and order.
            </p>
          </div>

          <div className="preview-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
            {phonePreviews.map((preview, index) => (
              <article key={preview.type} className="preview-card lg:col-span-2 p-4 lg:p-5 border border-[#f0e6f5] rounded-2xl bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className={`phone phone-${preview.type}`}>
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <PhonePreview type={preview.type} />
                  </div>
                </div>
                <div className="preview-caption flex items-center gap-3 mt-4 pt-4 border-t border-[#f0e6f5]">
                  <span className="text-[10px] font-bold text-[#aaa6b2] w-6 text-center">0{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <b className="font-display text-sm text-[#211d2b] block truncate">{preview.title}</b>
                    <small className="text-xs text-[#73707e]">{preview.caption}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Business Browser */}
          <div className="business-browser mt-16 lg:mt-20 rounded-[28px] border border-[#e7dcf8] bg-[#f7f3ff] p-7 lg:p-12 shadow-[0_22px_64px_rgba(75,47,136,0.09)]">
            <div className="business-head flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div>
                <span className="eyebrow inline-block mb-3 text-[#714be8]">Made for your kind of business</span>
                <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-[-0.06em] text-[#211d2b]">What does your business do?</h3>
              </div>
              <div className="business-count flex items-center gap-2 text-[#73707e]">
                <b className="font-display text-3xl text-[#714be8]">{businesses.length}</b>
                <span>business types</span>
              </div>
            </div>

            <div className="business-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {businesses.map(([name, icon, , fit], index) => (
                <button
                  key={name}
                  type="button"
                  className={`business-card group p-5 rounded-2xl border border-[#e5e2d8] bg-white shadow-[0_6px_18px_rgba(30,50,39,0.04)] hover:-translate-y-1 hover:shadow-xl transition-all ${['border-t-4 border-t-[#714be8]','border-t-4 border-t-[#ee72ad]','border-t-4 border-t-[#46becb]','border-t-4 border-t-[#e4be47]'][index % 4]}`}
                  onClick={() => openEnquiry(`${name} business setup`, name)}
                >
                  <span className="business-emoji text-3xl mb-2 block" aria-hidden="true">{icon}</span>
                  <b className="font-display text-base text-[#211d2b] block mb-1">{name}</b>
                  <small className="text-xs text-[#73707e]">{fit}</small>
                </button>
              ))}
            </div>

            <p className="business-note text-center text-sm text-[#73707e] mt-8">
              Each setup is adapted to your details, audience and the tools your business already uses.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section relative overflow-hidden bg-gradient-to-r from-[#432495] via-[#714be8] to-[#d84e99] py-20 md:py-28 lg:py-32 text-white">
        <div className="container relative z-10">
          <div className="cta-content max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.065em] mb-6">
              A stronger digital presence starts here.
            </h2>
            <p className="text-lg text-white/85 mb-10 max-w-xl mx-auto">
              Browse the services and ongoing care that make sense for your next chapter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/services" className="button button-primary w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#714be8] font-bold hover:bg-[#faf9ff] transition-all">
                View all services <ArrowUpRight size={15} />
              </Link>
              <Link to="/monthly" className="button button-outline w-full sm:w-auto px-8 py-4 rounded-full border-white text-white font-bold hover:bg-white/10 transition-all">
                Monthly plans <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section bg-[#faf9ff] py-20 md:py-28 lg:py-32" aria-labelledby="home-faq-title">
        <div className="container">
          <div className="grid lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div className="space-y-6">
              <span className="eyebrow inline-block text-[#714be8]">A few good questions</span>
              <h2 id="home-faq-title" className="font-display text-4xl md:text-5xl leading-[0.98] tracking-[-0.06em] text-[#211d2b]">
                Clarity is part<br />of the experience.
              </h2>
              <p className="text-lg leading-relaxed text-[#676372] max-w-md">
                Know what you're choosing, what to prepare and where your setup can go next.
              </p>
              <Link to="/fineprint" className="inline-flex items-center gap-2 font-bold text-[#714be8] hover:gap-3 transition-all mt-4">
                Read the full details <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="divide-y divide-[#e4dfec] border-y border-[#e4dfec] rounded-2xl overflow-hidden bg-white">
              {[
                ['How do I choose the right setup?', 'Start with the main thing customers need to do: understand your offer, browse products, place an enquiry or find your location. The service pages show an interactive sample for each option.'],
                ['What do I need to share?', 'Your business name, contact details, brand assets if available, photos, prices and the information customers ask you for most often. The enquiry form guides you through the right details.'],
                ['Can I combine services?', 'Yes. Choose individual services, add a setup pack and include Basic Care or a monthly plan in the enquiry form. We\'ll confirm the scope with you.'],
                ['How long does it really take?', 'The delivery target is 24–48 hours for Starter and about 48–72 hours for Business and Seller packs after we receive complete details. Third-party verifications can take longer.'],
                ['What if I already have a website?', 'You can ask us about adding a service or selecting a small setup that fits what you already have. We’ll confirm the scope and any access needed before work begins.'],
                ['Is there ongoing support?', 'Yes. Monthly options include Basic Care, Social Lite, Social Growth and Digital Care Plus. Each plan has a defined scope you can review before choosing.']
              ].map(([question, answer], index) => (
                <details key={question} className="group py-5" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold tracking-tight text-[#211d2b] marker:content-none px-6">
                    <span className="pr-10">{question}</span>
                    <span className="flex-shrink-0 grid h-10 w-10 place-items-center rounded-full bg-[#eee9ff] text-[#714be8] transition-transform group-open:rotate-45">
                      <ChevronDown size={18} />
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-[#676372] max-w-2xl">{answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA / Contact */}
      <section className="final-cta relative bg-[#171521] py-20 md:py-28 lg:py-32 text-white overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8">
              <div className="brand-mark inline-flex items-center gap-2 mb-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 font-display text-xl font-bold">OK</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.92] tracking-[-0.08em] max-w-xl">
                Let's create something<br />extraordinary together.
              </h2>
              <p className="text-lg text-white/70 max-w-xl">
                Tell us what you want customers to see, find or do. We’ll help you choose a practical starting point.
              </p>
              <ul className="space-y-3">
                {[
                  'Websites and business contact details',
                  'WhatsApp catalogue and order enquiries',
                  'Google Business Profile setup',
                  'Instagram and Facebook profile setup'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold text-white/50">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 lg:p-8">
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[.16em] text-white/50">START A CONVERSATION</span>
                <h3 className="font-display text-2xl font-semibold mt-2">Tell us what your business needs</h3>
              </div>
              <p className="text-white/60 text-sm mb-6">
                Share a few details and we’ll follow up about the service, pack or monthly plan you have in mind.
              </p>
              <button
                className="w-full py-4 px-6 rounded-full bg-[#f8e36d] text-[#302669] font-bold text-base hover:bg-[#e8d05a] transition-colors flex items-center justify-center gap-2"
                onClick={() => openEnquiry('General enquiry')}
              >
                Open the enquiry form <ArrowUpRight size={16} />
              </button>
              <p className="text-center text-xs text-white/40 mt-4">Your enquiry is sent through our contact form.</p>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#714be8]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#d84e99]/20 blur-3xl" />
      </section>

    </>
  )
}

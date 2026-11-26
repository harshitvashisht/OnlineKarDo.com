import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Zap, Globe, Smartphone, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useEnquiry } from '../context/EnquiryContext'
import { SEO, OrganizationSchema } from '../components/SEO'
import PresenceInvite from '../components/PresenceInvite'
import { formspreeEndpoint } from '../config'

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
    gradient: 'from-[#087b87] to-[#44c7c3]',
    cta: 'Explore Web',
    href: '/web-development'
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
    href: '/whatsapp-commerce'
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
    href: '/local-discovery'
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

function ScrollCollapseDirections({ onChoice }: { onChoice: (choice: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current
      if (!section) return
      setCollapsed(section.getBoundingClientRect().top < -window.innerHeight * 0.78)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[150vh] bg-[#f6f8fb]" aria-labelledby="directions-title">
      <div className="sticky top-0 flex min-h-screen items-center py-20 md:py-24">
        <div className={`container mx-auto transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${collapsed ? 'scale-[.96]' : 'scale-100'}`}>
          <div className={`mx-auto max-w-4xl text-center transition-all duration-500 ${collapsed ? 'mb-8' : 'mb-14 lg:mb-16'}`}>
            <span className="eyebrow mb-4 inline-block text-[#087b87]">A connected digital setup</span>
            <h2 id="directions-title" className={`font-display font-semibold leading-[.98] tracking-[-.065em] text-[#132c3d] transition-all duration-500 ${collapsed ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'}`}>
              {collapsed ? 'One partner. One clear path.' : <>What we do.<br /><span className="bg-gradient-to-r from-[#087b87] to-[#55c9c0] bg-clip-text text-transparent">Everything connected.</span></>}
            </h2>
            <p className={`mx-auto max-w-2xl overflow-hidden text-lg leading-relaxed text-[#536a78] transition-all duration-500 ${collapsed ? 'mt-0 max-h-0 opacity-0' : 'mt-5 max-h-28 opacity-100'}`}>
              Bring your website, WhatsApp, local discovery and social presence into one practical setup—with a clear scope and a team that keeps the pieces connected.
            </p>
          </div>

          <div className={`mx-auto grid max-w-6xl gap-5 transition-all duration-700 lg:grid-cols-[.82fr_1.18fr] ${collapsed ? 'gap-3' : 'gap-5'}`}>
            <div className={`relative overflow-hidden rounded-[28px] bg-[#101c29] text-white shadow-[0_28px_80px_rgba(16,28,41,.18)] transition-all duration-700 ${collapsed ? 'p-5 md:p-6' : 'p-7 md:p-9 lg:p-10'}`}>
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#36cfc0]/25 blur-3xl" />
              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-[.16em] text-[#7de4d9]">The joined-up approach</span>
                <h3 className={`mt-3 font-display font-semibold tracking-[-.05em] transition-all duration-500 ${collapsed ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>From first click to enquiry.</h3>
                <p className={`overflow-hidden leading-relaxed text-white/70 transition-all duration-500 ${collapsed ? 'mt-0 max-h-0 opacity-0' : 'mt-4 max-h-24 opacity-100'}`}>
                  A clear customer journey across the places where people find you, learn about you and get in touch.
                </p>
                <div className={`mt-6 flex flex-wrap items-center gap-2 transition-all duration-500 ${collapsed ? 'mt-4' : ''}`}>
                  {['Website', 'WhatsApp', 'Google & social'].map((label, index) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className={`rounded-full border border-white/15 bg-white/[.08] px-3 py-2 text-xs font-semibold ${index === 1 ? 'text-[#7de4d9]' : 'text-white/90'}`}>{label}</span>
                      {index < 2 && <ArrowRight size={14} className="text-[#7de4d9]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {doors.map((door, index) => (
                <article key={door.title} className={`flex flex-col rounded-[28px] border transition-all duration-700 ${index === 0 ? 'border-[#72ddd2]/30 bg-gradient-to-br from-[#e7fbf7] to-white' : 'border-[#b7d3e9] bg-gradient-to-br from-[#eaf4ff] to-white'} ${collapsed ? 'p-5 md:p-6' : 'p-7 md:p-8'}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-[.15em] ${index === 0 ? 'text-[#087b87]' : 'text-[#3974a6]'}`}>{door.subtitle}</span>
                  <h3 className={`mt-3 font-display font-semibold tracking-[-.05em] text-[#132c3d] transition-all duration-500 ${collapsed ? 'text-xl' : 'text-2xl md:text-3xl'}`}>{door.title}</h3>
                  <p className={`overflow-hidden leading-relaxed text-[#536a78] transition-all duration-500 ${collapsed ? 'mt-0 max-h-0 opacity-0' : 'mt-4 max-h-28 opacity-100'}`}>{door.description}</p>
                  <ul className={`space-y-2 overflow-hidden transition-all duration-500 ${collapsed ? 'mt-0 max-h-0 opacity-0' : 'mt-5 max-h-56 opacity-100'}`}>
                    {door.bullets.slice(0, 3).map(item => <li key={item} className="flex items-start gap-2 text-sm text-[#42596b]"><Check size={15} className="mt-0.5 shrink-0 text-[#087b87]" />{item}</li>)}
                  </ul>
                  <button type="button" onClick={() => onChoice(door.cta)} className={`mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-bold transition-all ${collapsed ? 'mt-4' : 'mt-7'} ${index === 0 ? 'bg-[#63d6c8] text-[#123145] hover:bg-[#83e9dc]' : 'bg-[#087b87] text-white hover:bg-[#075c68]'}`}>
                    {door.cta}<ArrowUpRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const processSteps = [
  { number: '01', title: 'Choose a direction', description: 'Pick a service, a setup pack or ongoing care based on what your customers need next.' },
  { number: '02', title: 'Share the details', description: 'Tell us about your business, your audience and the content you want to show.' },
  { number: '03', title: 'We prepare the setup', description: 'We adapt the selected template and configure its agreed features around your details.' },
  { number: '04', title: 'Review together', description: 'Check the information and sample, then send one consolidated round of changes.' },
  { number: '05', title: 'Launch and hand over', description: 'Get the finished setup and practical guidance for sharing it with your customers.' },
  { number: '06', title: 'Keep it current', description: 'If you choose a care plan, we can help with the recurring updates included in that plan.' }
]

const webDevelopmentCards = [
  { number: '01', category: 'Website design', title: 'One-page business website', price: 2999, href: '/services/one-page-business-website', tint: 'from-[#e7fbfa] to-white' },
  { number: '02', category: 'Multi-page websites', title: '3–5 page business website', price: 4999, href: '/services/3-5-page-business-website', tint: 'from-[#eaf4ff] to-white' },
  { number: '03', category: 'Domain & email', title: 'Domain and business email setup', price: 999, href: '/services/domain-and-business-email-setup', tint: 'from-[#edf7f8] to-white' },
  { number: '04', category: 'Search readiness', title: 'Basic SEO setup', price: 999, href: '/services/basic-seo-setup', tint: 'from-[#e8f4ff] to-white' }
]

const whatsappCommerceCards = [
  { number: '01', category: 'Ordering', title: 'WhatsApp ordering catalogue', price: 1499, href: '/services/whatsapp-ordering-catalogue', tint: 'from-[#e8fbf2] to-white' },
  { number: '02', category: 'Business profile', title: 'WhatsApp Business profile setup', price: 499, href: '/services/whatsapp-business-profile-setup', tint: 'from-[#e5f8ef] to-white' },
  { number: '03', category: 'Product browsing', title: 'Digital product catalogue', price: 1499, href: '/services/digital-product-catalogue', tint: 'from-[#e7f6f1] to-white' },
  { number: '04', category: 'Menus & QR', title: 'Digital menu with QR code', price: 999, href: '/services/digital-menu-with-qr-code', tint: 'from-[#e9faf4] to-white' }
]

const localDiscoveryCards = [
  { number: '01', category: 'Local directory', title: 'Google Business Profile setup', price: 999, href: '/services/google-business-profile-setup', tint: 'from-[#e8f4ff] to-white' },
  { number: '02', category: 'Social discovery', title: 'Instagram Business account setup', price: 499, href: '/services/instagram-business-setup', tint: 'from-[#f2edff] to-white' },
  { number: '03', category: 'Community presence', title: 'Facebook Business Page setup', price: 499, href: '/services/facebook-business-page-setup', tint: 'from-[#eaf1ff] to-white' },
  { number: '04', category: 'Search readiness', title: 'Basic SEO setup', price: 999, href: '/services/basic-seo-setup', tint: 'from-[#e7f7f8] to-white' }
]

function StackedServiceCategories({ heading, items, categories, stacked = true }: { heading: string; items: typeof webDevelopmentCards; categories: string[]; stacked?: boolean }) {
  return (
    <div className="mt-7" aria-label={`${heading} service categories`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[.15em] text-[#536a78]">{heading}</span>
        <span className="text-xs font-semibold text-[#087b87]">{String(items.length).padStart(2, '0')} categories</span>
      </div>
      <div className="space-y-3 pb-2">
        {items.map((item, index) => (
          <Link key={item.number} to={item.href} className={`${stacked ? 'sticky' : 'relative'} block min-h-[92px] rounded-2xl border border-[#d5e5eb] bg-gradient-to-br ${item.tint} p-4 shadow-[0_12px_30px_rgba(16,53,73,.12)] transition hover:-translate-y-1 hover:border-[#087b87] hover:shadow-[0_18px_38px_rgba(16,53,73,.18)]`} style={stacked ? { top: `${92 + index * 18}px`, zIndex: index + 1 } : undefined}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0a526c] text-[10px] font-bold text-white">{item.number}</span>
                <span className="min-w-0"><small className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#087b87]">{item.category}</small><b className="mt-1 block text-sm leading-snug text-[#132c3d] sm:text-base">{item.title}</b></span>
              </div>
              <span className="shrink-0 text-sm font-bold text-[#132c3d]">{money(item.price)}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-[#d9e7eb] pt-4" aria-label={`${heading} topic categories`}>
        {categories.map(category => <span key={category} className="rounded-full border border-[#d9e7eb] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#536a78]">{category}</span>)}
      </div>
    </div>
  )
}

function ProcessExperience({ onEnquiry }: { onEnquiry: () => void }) {
  const [activeStep, setActiveStep] = useState(0)
  const step = processSteps[activeStep]
  const selectStep = (index: number) => setActiveStep((index + processSteps.length) % processSteps.length)

  return (
    <section className="process-section overflow-hidden bg-[#11101a] py-20 text-white md:py-28 lg:py-32" aria-labelledby="process-title">
      <div className="container">
        <div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="max-w-xl">
            <span className="eyebrow mb-4 inline-block text-[#a9eee8]">Our process</span>
            <h2 id="process-title" className="font-display text-4xl leading-[.98] tracking-[-.065em] md:text-5xl lg:text-6xl">A clear path from<br />idea to launch.</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">Six practical stages keep your setup moving, with a clear view of what happens next.</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end" role="tablist" aria-label="Setup process steps">
            {processSteps.map((item, index) => (
              <button key={item.number} id={`process-tab-${index}`} type="button" role="tab" aria-selected={activeStep === index} aria-controls="process-panel" tabIndex={activeStep === index ? 0 : -1} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); selectStep(activeStep + 1) } if (event.key === 'ArrowLeft') { event.preventDefault(); selectStep(activeStep - 1) } }} onClick={() => selectStep(index)} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${activeStep === index ? 'border-[#a9eee8] bg-[#a9eee8] text-[#21133e]' : 'border-white/20 text-white/70 hover:border-white/50 hover:text-white'}`}>
                {item.number} <span className="hidden sm:inline">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${activeStep}`} className="relative mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#29204a] via-[#1a2340] to-[#0d555d] p-7 md:p-12 lg:mt-14 lg:p-16">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#44c7c3]/20 blur-3xl" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div key={activeStep} className="max-w-3xl animate-[fade-up_.45s_ease-out_both]">
              <span className="font-display text-7xl font-bold tracking-[-.08em] text-[#a9eee8] md:text-8xl">{step.number}</span>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-.05em] md:text-5xl">{step.title}</h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{step.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" aria-label="Previous process step" onClick={() => selectStep(activeStep - 1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/35 transition hover:bg-white/10"><ArrowLeft size={18} /></button>
              <button type="button" aria-label="Next process step" onClick={() => selectStep(activeStep + 1)} className="grid h-12 w-12 place-items-center rounded-full bg-[#63d6c8] text-[#062d43] transition hover:bg-[#91f0e2]"><ArrowRight size={18} /></button>
              <button type="button" onClick={onEnquiry} className="ml-2 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#132c3d] transition hover:-translate-y-0.5 hover:bg-[#a9eee8]">Ask about a setup <ArrowUpRight size={15} /></button>
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
    borderColor: 'border-[#087b87]'
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
  { title: 'Product catalogue', caption: 'Browse products with ease', type: 'catalogue', serviceId: 'digital-product-catalogue' },
  { title: 'WhatsApp ordering', caption: 'Start a ready-to-send order', type: 'orders', serviceId: 'whatsapp-ordering-catalogue' },
  { title: 'Payment page', caption: 'Payment setup, where supported', type: 'payment', serviceId: 'razorpay-payment-page-or-link' },
  { title: 'Social business page', caption: 'A consistent online identity', type: 'social', serviceId: 'instagram-business-setup' },
  { title: 'Digital menu + QR', caption: 'Ready to share at the counter', type: 'menu', serviceId: 'digital-menu-with-qr-code' },
  { title: 'One-page website', caption: 'A clear introduction to your work', type: 'website', serviceId: 'one-page-business-website' },
  { title: 'Local search listing', caption: 'Key details in one place', type: 'search', serviceId: 'google-business-profile-setup' },
  { title: 'Link-in-bio page', caption: 'Turn one link into many paths', type: 'bio', serviceId: 'link-in-bio-business-page' }
]

const beforeAfterServices = [
  { id: 'one-page-business-website', title: 'One-page business website', category: 'Web', before: 'Business details scattered across posts', after: 'One clear home for your offer and contact', tone: 'from-[#0d7e91] to-[#55c9c0]' },
  { id: '3-5-page-business-website', title: '3–5 page business website', category: 'Web', before: 'Every service squeezed into one place', after: 'Dedicated pages for services, story and FAQs', tone: 'from-[#2563a8] to-[#55c9c0]' },
  { id: 'whatsapp-ordering-catalogue', title: 'WhatsApp ordering catalogue', category: 'WhatsApp', before: 'Order details repeated in every chat', after: 'Products ready to browse and send', tone: 'from-[#168b62] to-[#63d6a1]' },
  { id: 'razorpay-payment-page-or-link', title: 'Razorpay payment page or link', category: 'Payments', before: 'Manual payment follow-ups', after: 'A shareable payment step for your offer', tone: 'from-[#2856b8] to-[#62b9ec]' },
  { id: 'razorpay-supported-payment-catalogue', title: 'Razorpay-supported payment catalogue', category: 'Payments', before: 'Product browsing separate from payment', after: 'A supported catalogue-to-payment journey', tone: 'from-[#2856b8] to-[#62b9ec]' },
  { id: 'digital-product-catalogue', title: 'Digital product catalogue', category: 'Catalogues', before: 'Product photos and prices in many places', after: 'A single catalogue customers can share', tone: 'from-[#087b87] to-[#70d6c8]' },
  { id: 'digital-menu-with-qr-code', title: 'Digital menu with QR code', category: 'Menus', before: 'Printed menu is the only menu', after: 'A phone-ready menu opened by QR', tone: 'from-[#168b62] to-[#63d6a1]' },
  { id: 'google-business-profile-setup', title: 'Google Business Profile setup', category: 'Local discovery', before: 'Hours and location hard to confirm', after: 'Key local details together in one listing', tone: 'from-[#2376c9] to-[#5ec5df]' },
  { id: 'instagram-business-setup', title: 'Instagram Business account setup', category: 'Social', before: 'Profile gives little context', after: 'Business identity with clear contact options', tone: 'from-[#a13d91] to-[#f28a78]' },
  { id: 'facebook-business-page-setup', title: 'Facebook Business Page setup', category: 'Social', before: 'No dedicated page for updates', after: 'A business page with useful essentials', tone: 'from-[#2856b8] to-[#62b9ec]' },
  { id: 'whatsapp-business-profile-setup', title: 'WhatsApp Business profile setup', category: 'WhatsApp', before: 'Chats start without business context', after: 'Profile, hours and details ready to view', tone: 'from-[#168b62] to-[#63d6a1]' },
  { id: 'link-in-bio-business-page', title: 'Link-in-bio business page', category: 'Social', before: 'One social link with no clear pathways', after: 'One page linking to your key destinations', tone: 'from-[#7043b8] to-[#55c9c0]' },
  { id: 'domain-and-business-email-setup', title: 'Domain and business email setup', category: 'Web', before: 'Generic links and contact identity', after: 'A custom domain and business email setup', tone: 'from-[#2563a8] to-[#55c9c0]' },
  { id: 'basic-seo-setup', title: 'Basic SEO setup', category: 'Search', before: 'Pages with little search context', after: 'Clear titles and descriptions for key pages', tone: 'from-[#2376c9] to-[#5ec5df]' },
]

function BeforeAfterMarquee() {
  const items = [...beforeAfterServices, ...beforeAfterServices]
  return <section className="before-after-section relative isolate overflow-hidden bg-[#07122f] py-20 text-white md:py-28" aria-labelledby="before-after-title">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(8,123,135,.35),transparent_56%)]"/>
    <div className="container relative z-10 mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl"><span className="mb-3 inline-block text-xs font-bold uppercase tracking-[.17em] text-[#74e6da]">14 service concept previews</span><h2 id="before-after-title" className="font-display text-4xl font-semibold leading-[.98] tracking-[-.065em] text-white md:text-6xl">A clearer before.<br/><span className="bg-gradient-to-r from-[#65d9cd] to-[#66baf0] bg-clip-text text-transparent">A more useful after.</span></h2><p className="mb-0 mt-4 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">Illustrative transformations show how each setup can organize your customer experience. Every demo is a concept preview tailored to its service.</p></div>
      <div className="flex shrink-0 flex-wrap gap-3"><Link to="/services" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#65d9cd] px-5 text-sm font-bold text-[#102a3d] transition hover:bg-[#8af1e4]">All 14 services <ArrowUpRight size={16}/></Link><Link to="/monthly" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 px-5 text-sm font-bold text-white transition hover:bg-white/10">Monthly plans <ArrowUpRight size={16}/></Link></div>
    </div>
    <div className="before-after-window" aria-label="Before and after examples for 14 services">
      <div className="before-after-track motion-safe:animate-[before-after-marquee_78s_linear_infinite] hover:[animation-play-state:paused]">
        {items.map((item, index) => <article className="before-after-card" key={`${item.id}-${index}`}>
          <div className="mb-4 flex items-start justify-between gap-4"><div><span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#73ded3]">{item.category} · {String((index % beforeAfterServices.length) + 1).padStart(2, '0')}/14</span><h3 className="mt-1 font-display text-lg font-semibold leading-snug text-white md:text-xl">{item.title}</h3></div><Link to={`/services/${item.id}`} aria-label={`View ${item.title} demo`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-white/75 transition hover:bg-[#65d9cd] hover:text-[#102a3d]"><ArrowUpRight size={17}/></Link></div>
          <div className="before-after-pair">
            <div className="before-after-state before-state"><span>Before</span><div className="mini-window"><i/><i/><i/><div className="mini-window-lines"><b/><b/><b/></div><div className="mini-window-fragment">{item.before}</div><div className="mini-window-lines short"><b/><b/></div></div><p>{item.before}</p></div>
            <div className="before-after-arrow" aria-hidden="true">↗</div>
            <div className="before-after-state after-state"><span>After</span><div className={`mini-window mini-window-after bg-gradient-to-br ${item.tone}`}><i/><i/><i/><div className="mini-window-after-copy"><small>YOUR BUSINESS</small><b>{item.title}</b><em>{item.after}</em><strong>Explore ↗</strong></div><div className="mini-window-after-blocks"><b/><b/><b/></div></div><p>{item.after}</p></div>
          </div>
          <Link to={`/services/${item.id}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#82e4db] hover:text-white">View service demo <ArrowUpRight size={13}/></Link>
        </article>)}
      </div>
    </div>
    <div className="container mt-5 flex items-center gap-2 text-xs text-white/40"><span className="h-1.5 w-1.5 rounded-full bg-[#65d9cd]"/> Concept previews illustrate possible setups, not client performance claims.</div>
  </section>
}

const homepageMetrics = [
  { value: 3, suffix: '', label: 'connected service areas', Icon: Globe },
  { value: 14, suffix: '', label: 'individual setup services', Icon: Check },
  { value: 3, suffix: '', label: 'fixed-scope setup packs', Icon: Smartphone },
  { value: 24, endValue: 72, suffix: 'h', label: 'pack delivery target*', Icon: Zap },
]

function AnimatedMetric({ value, endValue, suffix, label, Icon, className = '' }: { value: number; endValue?: number; suffix: string; label: string; Icon: LucideIcon; className?: string }) {
  const metricRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = metricRef.current
    if (!node) return
    let frame = 0
    let started = false
    const animate = () => {
      if (started) return
      started = true
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setProgress(1)
        return
      }
      const start = performance.now()
      const duration = 1400
      const tick = (now: number) => {
        const next = Math.min((now - start) / duration, 1)
        setProgress(1 - Math.pow(1 - next, 3))
        if (next < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    if (!('IntersectionObserver' in window)) animate()
    else {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.disconnect()
        }
      }, { threshold: 0.35 })
      observer.observe(node)
      return () => { observer.disconnect(); cancelAnimationFrame(frame) }
    }
    return () => cancelAnimationFrame(frame)
  }, [])

  const startValue = Math.round(value * progress)
  const finishValue = endValue === undefined ? undefined : Math.round(endValue * progress)
  return <article ref={metricRef} className={`min-h-52 border-[#dce8ec] px-5 py-7 md:px-7 md:py-9 ${className}`}>
    <span className="mb-6 grid h-11 w-11 place-items-center rounded-full bg-[#f1f3e8] text-[#102a3d]"><Icon size={21}/></span>
    <div className="font-display text-5xl leading-none tracking-[-.07em] text-[#222] md:text-6xl" aria-label={`${value}${endValue === undefined ? '' : ` to ${endValue}`}${suffix} ${label}`}>
      {String(startValue).padStart(2, '0')}{finishValue === undefined ? '' : `–${String(finishValue).padStart(2, '0')}`}<span className="ml-1 text-[#55c9c0]">{suffix}</span>
    </div>
    <p className="mb-0 mt-5 max-w-[15rem] text-sm leading-relaxed text-[#5f6466] md:text-base">{label}</p>
  </article>
}

function CompactEnquiryForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')
    const formData = new FormData(event.currentTarget)
    try {
      const response = await fetch(formspreeEndpoint, { method: 'POST', body: formData, headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('We could not send your enquiry. Please try again.')
      setStatus('sent')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'sent') return <div className="rounded-2xl border border-[#7de4d9]/30 bg-[#7de4d9]/10 p-5 text-center" role="status"><span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#7de4d9] text-[#123145]"><Check size={19}/></span><h4 className="mt-3 font-display text-xl font-semibold text-white">Thanks for reaching out.</h4><p className="mb-0 mt-1 text-sm text-white/65">Your enquiry has been sent. We’ll be in touch soon.</p></div>

  return <form className="grid grid-cols-1 gap-3 sm:grid-cols-2" onSubmit={submit}>
    <input type="hidden" name="_subject" value="OnlineKarDo website enquiry"/>
    <label className="grid gap-1.5 text-xs font-semibold text-white/70">Your name<input required name="name" autoComplete="name" placeholder="Name" className="min-h-11 rounded-xl border border-white/15 bg-[#0b1724]/55 px-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#7de4d9]"/></label>
    <label className="grid gap-1.5 text-xs font-semibold text-white/70">Business name<input name="business_name" autoComplete="organization" placeholder="Your business" className="min-h-11 rounded-xl border border-white/15 bg-[#0b1724]/55 px-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#7de4d9]"/></label>
    <label className="grid gap-1.5 text-xs font-semibold text-white/70">Email<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className="min-h-11 rounded-xl border border-white/15 bg-[#0b1724]/55 px-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#7de4d9]"/></label>
    <label className="grid gap-1.5 text-xs font-semibold text-white/70">WhatsApp number<input required type="tel" name="phone" autoComplete="tel" placeholder="+91 98765 43210" className="min-h-11 rounded-xl border border-white/15 bg-[#0b1724]/55 px-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#7de4d9]"/></label>
    <label className="grid gap-1.5 text-xs font-semibold text-white/70 sm:col-span-2">What do you need help with?<select name="interest" defaultValue="" required className="min-h-11 rounded-xl border border-white/15 bg-[#0b1724]/70 px-3 text-sm text-white outline-none transition focus:border-[#7de4d9]"><option value="" disabled className="text-[#102a3d]">Choose a service or setup</option><option className="text-[#102a3d]">Website</option><option className="text-[#102a3d]">WhatsApp commerce</option><option className="text-[#102a3d]">Local discovery and social</option><option className="text-[#102a3d]">Setup pack</option><option className="text-[#102a3d]">Monthly plan</option><option className="text-[#102a3d]">Something else</option></select></label>
    {status === 'error' && <p className="sm:col-span-2 mb-0 text-sm text-[#ffb6b6]" role="alert">{errorMessage}</p>}
    <button disabled={status === 'sending'} type="submit" className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#7de4d9] px-5 font-bold text-[#123145] transition hover:bg-[#55c9c0] disabled:cursor-wait disabled:opacity-60 sm:col-span-2">{status === 'sending' ? 'Sending…' : 'Send enquiry'}{status !== 'sending' && <ArrowUpRight size={16}/>}</button>
    <p className="sm:col-span-2 mb-0 text-center text-xs text-white/40">Your details go to the OnlineKarDo team through our enquiry form.</p>
  </form>
}

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

const connectedPlatforms = [
  { name: 'WordPress', mark: 'W', color: '#21759b', style: 'circle' },
  { name: 'WooCommerce', mark: 'Woo', color: '#96588a', style: 'bubble' },
  { name: 'Shopify', mark: 'S', color: '#7ab55c', style: 'bag' },
  { name: 'Webflow', mark: 'W', color: '#146ef5', style: 'plain' },
  { name: 'Wix', mark: 'WiX', color: '#222', style: 'plain' },
  { name: 'Google Business', mark: 'G', color: '#4285f4', style: 'google' },
  { name: 'WhatsApp Business', mark: '', color: '#25d366', style: 'whatsapp' },
  { name: 'Razorpay', mark: 'R', color: '#0b72e7', style: 'plain' },
]

function ConnectedPlatformLogo({ name, mark, color, style }: (typeof connectedPlatforms)[number]) {
  return (
    <span className="platform-trust-logo" aria-label={name}>
      <span className={`platform-logo-mark platform-logo-${style}`} style={{ color }} aria-hidden="true">
        {style === 'bag' ? <svg viewBox="0 0 32 36"><path d="M5 11h22l2 21H3l2-21Z" fill="currentColor"/><path d="M11 12V8a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" strokeWidth="2.5"/><text x="16" y="27" textAnchor="middle" fill="white" fontSize="15" fontWeight="800">S</text></svg>
          : style === 'whatsapp' ? <svg viewBox="0 0 32 32"><path d="M7 25.5 8.3 20A11 11 0 1 1 12 24.2L7 25.5Z" fill="currentColor"/><path d="M12.1 10.7c-.4-.8-.8-.8-1.2-.8-.3 0-.7 0-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.3 2.6 4.2 6.4 5.7 3.2 1.2 3.8.9 4.5.8.7-.1 2.3-1 2.6-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.9-.6-.5-.2-2.3-1.1-2.7-1.2-.4-.2-.6-.2-.9.2-.3.5-1 1.2-1.2 1.5-.2.3-.5.3-1 .1-.5-.2-1.9-.7-3.6-2.2-1.3-1.2-2.2-2.7-2.5-3.2-.3-.5 0-.7.2-.9.2-.2.5-.5.7-.8.2-.3.3-.5.5-.8.1-.3 0-.6-.1-.8l-1.2-2.7Z" fill="white" transform="translate(3 0) scale(.82)"/></svg>
          : mark}
      </span>
      <span className={`platform-logo-wordmark platform-wordmark-${style}`}>{name}</span>
    </span>
  )
}

export default function HomePage() {
  const { openEnquiry } = useEnquiry()
  const [heroExpanded, setHeroExpanded] = useState(false)
  const [packExpanded, setPackExpanded] = useState(false)
  const [activePreview, setActivePreview] = useState(2)
  const [activePack, setActivePack] = useState(1)
  const selectedPack = packs[activePack]

  useEffect(() => {
    const hero = document.getElementById('homepage-hero')
    const packSection = document.getElementById('packs')
    if (!hero || !packSection) return
    const updateExpansion = () => {
      const heroTop = hero.getBoundingClientRect().top + window.scrollY
      setHeroExpanded(window.scrollY >= heroTop + hero.offsetHeight * 0.5)
      const packTop = packSection.getBoundingClientRect().top + window.scrollY
      setPackExpanded(window.scrollY >= packTop + packSection.offsetHeight * 0.5)
    }
    updateExpansion()
    window.addEventListener('scroll', updateExpansion, { passive: true })
    window.addEventListener('resize', updateExpansion)
    return () => {
      window.removeEventListener('scroll', updateExpansion)
      window.removeEventListener('resize', updateExpansion)
    }
  }, [])

  const heroGutter = heroExpanded ? 'mx-0 rounded-none' : 'mx-3 rounded-[30px] md:mx-5 md:rounded-[38px] xl:mx-8'
  return (
    <>
      <SEO
        title="Digital Setup for Local Business | OnlineKarDo"
        description="Websites, WhatsApp ordering and digital setup for Indian small businesses. Pick a fixed-price pack and get started with OnlineKarDo."
        canonical="/"
        ogImage="/assets/onlinekardo-logo.jpeg"
      />
      <OrganizationSchema />
      <PresenceInvite />

      {/* Immersive homepage hero */}
      <section id="homepage-hero" className={`relative isolate mt-3 min-h-[880px] overflow-hidden bg-[#082c50] pb-8 pt-36 text-white shadow-[0_26px_80px_rgba(6,31,61,.22)] transition-[margin,border-radius] duration-700 ease-out md:mt-5 md:min-h-[calc(100svh-40px)] md:pt-44 xl:mt-6 xl:min-h-[calc(100svh-48px)] ${heroGutter}`}>
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
            <Link to="/services" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/55 bg-white/[.08] px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:px-9 md:text-base">Explore services <ArrowUpRight size={17}/></Link>
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

      {/* Supported platform marquee */}
      <section className="relative isolate overflow-hidden bg-[#082c50] py-14 text-white md:py-16" aria-label="Platforms supported by OnlineKarDo">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-r from-[#071e42]/90 via-[#07547c]/80 to-[#057f9b]/55" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#052649]/75 via-transparent to-[#072b50]/35" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background:radial-gradient(circle_at_75%_16%,rgba(134,244,239,.7),transparent_24%),radial-gradient(circle_at_13%_68%,rgba(89,190,235,.38),transparent_30%)]" />
        <div className="container relative z-10 mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow mb-2 inline-block text-[#75e8db]">Your digital toolkit</span>
            <h2 className="font-display text-2xl font-semibold tracking-[-.04em] md:text-3xl">Set up for platforms people already use.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/65">We help connect your business presence across discovery, conversations, social and payments.</p>
        </div>
        <div className="brand-marquee-mask space-y-3" aria-hidden="true">
          {[false, true].map((reverse, row) => {
            const platforms = ['Google Business Profile', 'WhatsApp Business', 'Instagram', 'Facebook', 'Razorpay', 'Google Maps', 'Meta']
            const repeated = [...platforms, ...platforms]
            return <div key={row} className={`brand-marquee-track ${reverse ? 'brand-marquee-reverse' : ''}`}>
              {repeated.map((brand, index) => <span key={`${row}-${index}`} className="brand-marquee-item"><i className={`brand-mark brand-mark-${platforms.indexOf(brand)}`} />{brand}</span>)}
            </div>
          })}
        </div>
      </section>

      {/* What We Do - Three Pillars */}
      <section className="services-pillars bg-[#eff6f8] py-20 md:py-28 lg:py-32">
        <div className="container">
          <div className="mb-12 lg:mb-16 max-w-3xl">
            <span className="eyebrow inline-block mb-4 text-[#087b87]">What we do</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.065em] text-[#132c3d] mb-4">
              Everything your digital presence needs.<br /><span className="text-[#087b87]">Under one partner.</span>
            </h2>
            <p className="text-lg leading-relaxed text-[#536a78]">
              With OnlineKarDo, businesses bring their vision to life through strategic web design, seamless WhatsApp commerce, and impactful local presence — all under one creative partner.
            </p>
          </div>

          <div className="space-y-10 lg:space-y-0">
            {services.map((service, index) => (
              <article key={service.title} style={{ top: `${96 + index * 18}px`, zIndex: index + 1 }} className={`service-pillar relative grid items-start rounded-[30px] border border-white/70 p-5 shadow-[0_24px_70px_rgba(14,40,62,.14)] md:p-8 lg:sticky lg:mb-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12 lg:p-10 ${index === 0 ? 'bg-[#f4fbfc]' : index === 1 ? 'bg-[#f2fbf6]' : 'bg-[#f3f6ff]'}`}>
                {/* Content */}
                <div className="service-content space-y-6 pr-4 lg:pr-8">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <span className="service-label inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/10 px-3 py-1.5 text-[9px] font-bold tracking-[.15em] backdrop-blur text-white">
                        {service.number}
                      </span>
                      <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-[-0.04em] text-[#101c29]">{service.title}</h3>
                    </div>
                    <div className={`pillar-icon w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${index === 0 ? 'bg-gradient-to-br from-[#087b87] to-[#44c7c3]' : index === 1 ? 'bg-gradient-to-br from-[#25d366] to-[#128c7e]' : 'bg-gradient-to-br from-[#4285f4] to-[#0866ff]'}`}>
                      <service.icon size={32} className="text-white" />
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed text-[#5d5a68] max-w-xl">{service.tagline}</p>
                  <p className="text-[#536a78] leading-relaxed max-w-xl">{service.description}</p>

                  {/* Services List */}
                  {index === 0 && <StackedServiceCategories heading="Web development services" items={webDevelopmentCards} categories={['Landing pages', 'Business websites', 'Domain & email', 'SEO basics']} stacked={false} />}
                  {index === 1 && <StackedServiceCategories heading="WhatsApp commerce categories" items={whatsappCommerceCards} categories={['Catalogues', 'Business profile', 'Menus & QR', 'Order enquiries']} stacked={false} />}
                  {index === 2 && <StackedServiceCategories heading="Local discovery categories" items={localDiscoveryCards} categories={['Google listing', 'Instagram', 'Facebook', 'SEO basics']} />}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#d9e7eb]">
                    <span className="text-xs font-medium text-[#aaa6b2] uppercase tracking-wide">Built on:</span>
                    {service.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.08em] rounded-full border border-[#d9e7eb] bg-white text-[#536a78] hover:border-[#087b87] hover:text-[#087b87] transition-colors">{t}</span>
                    ))}
                  </div>

                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-2 font-bold text-[#087b87] hover:gap-3 transition-all mt-2"
                  >
                    {service.cta} <ArrowUpRight size={16} />
                  </Link>
                </div>

                {/* Visual */}
                <div className="service-visual relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_20px_55px_rgba(35,28,52,.14)] lg:aspect-[3/2]">
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
                      {index < 2 && <Link to={service.href} className={`inline-flex w-fit items-center gap-2 rounded-full border border-white/35 px-5 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 ${index === 0 ? 'bg-[#087b87]/90 hover:bg-[#075c68]' : 'bg-[#128c66]/90 hover:bg-[#0c704f]'}`}>
                        {index === 0 ? 'Explore Web' : 'Explore WhatsApp'} <ArrowUpRight size={16} />
                      </Link>}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Phone Previews Section */}
      <section className="showcase-section bg-[#eaf8f7] py-20 md:py-28 lg:py-32" id="examples">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <span className="eyebrow inline-block mb-4 text-[#087b87]">Picture your business here</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.065em] text-[#132c3d]">
                Small screen.<br /><span className="text-[#087b87]">Big first impression.</span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-[#536a78] max-w-md lg:max-w-xl">
              Practical, phone-first pages designed around how customers actually browse, ask and order.
            </p>
          </div>

          <div className="preview-tabs-shell rounded-[30px] bg-[#f4f3e9] p-3 md:p-4">
            <div className="preview-tabs" role="tablist" aria-label="Business preview demos">
              {phonePreviews.map((preview, index) => (
                <div key={preview.type} className={`preview-tab-card ${activePreview === index ? 'is-active' : ''}`}>
                  <button id={`preview-tab-${index}`} type="button" role="tab" aria-selected={activePreview === index} aria-controls="preview-panel" onClick={() => setActivePreview(index)} className="preview-tab">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {activePreview === index && <small>{preview.title}</small>}
                  </button>
                  {activePreview === index && <div id="preview-panel" role="tabpanel" aria-labelledby={`preview-tab-${activePreview}`} className="preview-tab-panel">
                    <div className="preview-panel-top"><span>Step <b>{String(activePreview + 1).padStart(2, '0')}</b></span><div className="preview-progress-dots" aria-hidden="true">{phonePreviews.map((item, dotIndex) => <i key={item.type} className={dotIndex <= activePreview ? 'complete' : ''}/>)}</div></div>
                    <div className="preview-panel-body">
                      <div className="preview-panel-copy"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#75e8db]">Made for real customer journeys</span><h3>{preview.title}</h3><p>{preview.caption}. See how your business can present the right details and make the next step easy on a phone.</p><Link to={`/services/${preview.serviceId}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#65d9cd] px-5 font-bold text-[#102a3d] transition hover:-translate-y-0.5 hover:bg-[#8af1e4]">View this demo <ArrowUpRight size={16}/></Link></div>
                      <Link to={`/services/${preview.serviceId}`} aria-label={`Open ${preview.title} demo`} className="preview-panel-phone"><div className={`phone phone-${preview.type}`}><div className="phone-notch"/><div className="phone-screen"><PhonePreview type={preview.type}/></div></div></Link>
                    </div>
                  </div>}
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>

      <ProcessExperience onEnquiry={() => openEnquiry('General enquiry')} />

      <section className="bg-[#f4f8fa] py-10 md:py-14" aria-label="OnlineKarDo at a glance">
        <div className="container">
          <div className="mt-12 grid grid-cols-2 border-y border-[#dce8ec] bg-white/70 md:mt-16 md:grid-cols-4">
            {homepageMetrics.map(({ value, endValue, suffix, label, Icon }, index) => (
              <AnimatedMetric key={label} value={value} endValue={endValue} suffix={suffix} label={label} Icon={Icon} className={`${index % 2 === 0 ? 'border-r' : ''} ${index < 2 ? 'border-b md:border-b-0' : ''} ${index === 1 ? 'md:border-r' : ''} ${index === 3 ? 'md:border-r-0' : 'md:border-r'}`} />
            ))}
          </div>
          <p className="mt-3 text-right text-xs text-[#71828d]">*Target timelines start after required business details are received; third-party approvals may take longer.</p>
        </div>
      </section>

      {/* Pack chooser */}
      <section className="packs-section !bg-[#f5f5f1] py-14 md:py-20" id="packs">
        <div className="container">
          <div className={`bg-[#222] p-6 text-white shadow-[0_30px_90px_rgba(18,28,40,.2)] transition-[width,border-radius] duration-700 ease-out md:p-10 lg:p-14 ${packExpanded ? 'relative left-1/2 w-screen max-w-none -translate-x-1/2 rounded-none' : 'mx-auto max-w-[1440px] rounded-[32px] lg:rounded-[38px]'}`}>
            <div className="max-w-5xl">
              <span className="eyebrow mb-5 inline-block text-[#65d9cd]">One-time setup · clear scope</span>
              <h2 className="mb-5 font-display text-5xl font-medium leading-[.98] tracking-[-.07em] text-white md:text-7xl lg:text-8xl">Pick your starting point.<br/>Make the next move clear.</h2>
              <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">Choose a practical package for your business. See what is included, understand the next steps and send an enquiry when you’re ready.</p>
            </div>

            <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-6">
              <article className="rounded-[26px] bg-[#303030] p-5 md:p-8 lg:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-white/65">What you get</span>
                  <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#65d9cd]">Choose a pack</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Setup packs">
                  {packs.map((pack, index) => <button key={pack.name} id={`pack-tab-${index}`} type="button" role="tab" aria-selected={activePack === index} aria-controls="selected-pack-panel" onClick={() => setActivePack(index)} className={`rounded-full border px-4 py-2.5 text-xs font-bold transition md:text-sm ${activePack === index ? 'border-[#65d9cd] bg-[#65d9cd] text-[#102a3d]' : 'border-white/20 text-white/75 hover:border-white/50 hover:text-white'}`}>{pack.name.replace(' Digital Pack', '')} <span className="ml-1 opacity-70">{money(pack.price)}</span></button>)}
                </div>
                <div id="selected-pack-panel" role="tabpanel" aria-labelledby={`pack-tab-${activePack}`} className="mt-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div><span className="text-[10px] font-bold uppercase tracking-[.14em] text-white/50">{selectedPack.label}</span><h3 className="mt-2 font-display text-3xl font-semibold tracking-[-.05em] text-white md:text-4xl">{selectedPack.name}</h3></div>
                    <div className="font-display text-3xl font-semibold text-white">{money(selectedPack.price)}<span className="ml-2 text-sm font-normal text-white/55">one time</span></div>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">{selectedPack.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {selectedPack.includes.map(item => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/85"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f4f3e9] text-[#087b87]"><Check size={12}/></span>{item}</li>)}
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-4 py-2 text-xs text-white/65"><Check size={14} className="text-[#65d9cd]"/>Target delivery: {selectedPack.delivery}</div>
                </div>
              </article>

              <article className="flex flex-col rounded-[26px] bg-[#303030] p-5 md:p-8 lg:p-9">
                <span className="text-sm font-semibold text-white/65">How it works</span>
                <div className="mt-6 space-y-6">
                  {[
                    ['01', 'Choose your setup', 'Pick the package that fits what your business needs now.'],
                    ['02', 'Share your details', 'Tell us about your business, content, audience and contact flow.'],
                    ['03', 'Review and launch', 'We prepare the agreed setup, review it with you and hand it over.'],
                  ].map(([number, title, description]) => <div key={number} className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#55c9c0] font-display text-sm font-bold text-[#102a3d]">{number}</span><div><h3 className="font-display text-lg font-medium text-white md:text-xl">{title}</h3><p className="mb-0 mt-1 text-sm leading-relaxed text-white/60">{description}</p></div></div>)}
                </div>
                <button type="button" onClick={() => openEnquiry(selectedPack.name)} className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#55c9c0] px-6 font-bold text-[#102a3d] transition hover:-translate-y-0.5 hover:bg-[#78e4da]">{selectedPack.button}<ArrowUpRight size={17}/></button>
                <p className="mb-0 mt-3 text-center text-xs leading-relaxed text-white/45">Delivery targets start after we receive complete business details. Account approvals and external services can affect timing.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-collapsing approach section */}
      <ScrollCollapseDirections onChoice={openEnquiry} />

      <BeforeAfterMarquee />

      {/* FAQ Section */}
      <section className="faq-section relative isolate overflow-hidden py-20 text-white md:py-28 lg:py-32" aria-labelledby="home-faq-title">
        <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#087b87]/25 blur-[120px]"/>
        <div aria-hidden="true" className="pointer-events-none absolute -right-44 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#4d63d6]/20 blur-[120px]"/>
        <div className="container relative">
          <div className="faq-layout grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
            <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
              <span className="faq-kicker inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.17em] text-[#78e4da]"><span className="h-2 w-2 rounded-full bg-[#78e4da]"/>A few good questions</span>
              <h2 id="home-faq-title" className="font-display text-4xl font-semibold leading-[.98] tracking-[-.065em] text-white md:text-6xl">
                Clarity is part<br />of the experience.
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-white/65">
                Know what you’re choosing, what to prepare and where your setup can go next.
              </p>
              <Link to="/fineprint" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-[#65d9cd] hover:bg-white/[.06]">
                Read the full details <ArrowUpRight size={15} />
              </Link>
              <div className="faq-contact-card mt-8 rounded-[24px] border border-white/10 bg-white/[.06] p-5 backdrop-blur-sm md:p-6">
                <span className="text-xs font-bold uppercase tracking-[.13em] text-[#78e4da]">Still deciding?</span>
                <p className="mb-4 mt-2 text-sm leading-relaxed text-white/65">Tell us what you’re trying to set up. We’ll help you find a practical place to start.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-white hover:text-[#78e4da]">Talk to our team <ArrowUpRight size={15}/></Link>
              </div>
            </div>

            <div className="faq-list grid gap-3">
              {[
                ['How do I choose the right setup?', 'Start with the main thing customers need to do: understand your offer, browse products, place an enquiry or find your location. The service pages show an interactive sample for each option.'],
                ['What do I need to share?', 'Your business name, contact details, brand assets if available, photos, prices and the information customers ask you for most often. The enquiry form guides you through the right details.'],
                ['Can I combine services?', 'Yes. Choose individual services, add a setup pack and include Basic Care or a monthly plan in the enquiry form. We\'ll confirm the scope with you.'],
                ['How long does it really take?', 'The delivery target is 24–48 hours for Starter and about 48–72 hours for Business and Seller packs after we receive complete details. Third-party verifications can take longer.'],
                ['What if I already have a website?', 'You can ask us about adding a service or selecting a small setup that fits what you already have. We’ll confirm the scope and any access needed before work begins.'],
                ['Is there ongoing support?', 'Yes. Monthly options include Basic Care, Social Lite, Social Growth and Digital Care Plus. Each plan has a defined scope you can review before choosing.']
              ].map(([question, answer], index) => (
                <details key={question} className="faq-item group rounded-[20px] border border-white/10 bg-white/[.045] p-5 transition duration-300 hover:border-white/25 hover:bg-white/[.07] md:p-6" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold tracking-tight text-white marker:content-none md:text-lg">
                    <span className="flex items-center gap-4"><span className="faq-number">0{index + 1}</span><span>{question}</span></span>
                    <span className="faq-toggle flex-shrink-0 grid h-10 w-10 place-items-center rounded-full bg-white/[.08] text-[#78e4da] transition-transform group-open:rotate-45">
                      <ChevronDown size={18} />
                    </span>
                  </summary>
                  <div className="faq-answer pl-0 pt-4 md:pl-[3.25rem]">
                    <p className="max-w-2xl text-sm leading-relaxed text-white/65">{answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platforms and trust */}
      <section className="platform-trust-section" aria-labelledby="platform-trust-title">
        <div className="container">
          <div className="platform-trust-heading">
            <span className="platform-trust-kicker">A connected digital setup</span>
            <h2 id="platform-trust-title">Built around the tools your customers know.</h2>
            <p>Practical websites, commerce and discovery setups that work with the platforms your business uses.</p>
          </div>
          <div className="platform-trust-logos" aria-label="Platforms supported">
            {connectedPlatforms.map((platform) => (
              <ConnectedPlatformLogo key={platform.name} {...platform} />
            ))}
          </div>
          <div className="platform-trust-note">
            <span className="platform-trust-check" aria-hidden="true">✓</span>
            <p>Clear scope, transparent handoffs and privacy-conscious handling of the details you share with us.</p>
          </div>
        </div>
      </section>

      {/* Final CTA / Contact */}
      <section className="final-cta relative bg-[#101c29] py-20 md:py-28 lg:py-32 text-white overflow-hidden">
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
              <CompactEnquiryForm />
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#087b87]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#44c7c3]/20 blur-3xl" />
      </section>

    </>
  )
}

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { formspreeEndpoint } from '../config'

const money = (value: number | string): string => `₹${Number(value).toLocaleString('en-IN')}`

const businessQuestions: Record<string, string[]> = {
  'Bakery': ['What do you bake or sell most often?', 'Do you take custom cake or celebration orders?'],
  'Clinic': ['What kind of care or specialties do you offer?', 'How should patients request an appointment?'],
  'Garment shop': ['What clothing or product ranges do you sell?', 'What sizing, price or order details should customers see?'],
  'Cafe': ['What are your popular menu items?', 'Do customers need pickup, delivery or table information?'],
  'Restaurant': ['What cuisine and signature dishes should we feature?', 'Do you want customers to enquire about tables, takeaway or delivery?'],
  'Supermarket': ['Which product categories should customers browse?', 'Do you offer delivery, pickup or local-area service?'],
  'Salon': ['Which services and treatments do you provide?', 'How should clients request a booking?'],
  'Home kitchen': ['What meals or snacks are on your usual menu?', 'How far ahead should customers place pre-orders?'],
  'Handmade gifts': ['What handmade products or custom gifts do you make?', 'How can customers request custom colours, names or packaging?'],
  'Event decor': ['What kinds of events and decor do you specialize in?', 'Which details do you need for a quote (date, venue, guest count)?'],
  'AC & appliance repair': ['Which appliances or brands do you repair?', 'What details should a customer share to request a visit?'],
  'Yoga studio': ['Which classes or programs do you offer?', 'What schedule, level or enrolment details should visitors see?'],
  'Homestay': ['How many rooms and guests can you accommodate?', 'What dates, amenities or house rules should guests know?'],
  'Dental clinic': ['Which dental treatments and services do you provide?', 'How should patients request a consultation or appointment?'],
  'Hardware store': ['Which hardware or building supply categories do you stock?', 'Do customers need help with availability, delivery or quotations?'],
  'Nursery & farm produce': ['What plants, produce or seasonal items do you offer?', 'How often does availability change and where do you deliver?'],
  'PG & hostel': ['What room types, facilities and occupancy do you offer?', 'What should a prospective resident know about rent and visits?'],
  'School': ['Which grades, programs or admissions do you want to highlight?', 'What should parents know about admissions and visits?'],
  'Coaching centre': ['Which subjects, exams or courses do you teach?', 'What batches, age groups or enrolment details should be shown?'],
  'Builder': ['What projects or property types do you offer?', 'Which location, configuration or RERA details should customers see?'],
  'Showroom': ['What products or brands are available in your showroom?', 'Do customers need appointment, price or availability enquiries?'],
  'Gym': ['What membership options, facilities and classes do you offer?', 'How can someone book a trial or ask about membership?'],
  'Photographer': ['What photography services and event types do you cover?', 'How should clients share dates, locations or package preferences?'],
  'Florist': ['What bouquets, arrangements or floral services do you offer?', 'Do you take custom, event or same-day orders?'],
}

interface Service {
  id: string
  name: string
  price: number
  category: string
  mark: string
  summary: string
  impact: string
  why: string
  bestFor: string
  brand?: string
  demo: {
    heading: string
    subheading: string
    items: string[]
    action: string
  }
}
const services: Service[] = [
  { id: 'one-page-business-website', name: 'One-page business website', price: 2999, category: 'Website', mark: '↗', summary: 'Give your business one clear, professional home on the web.', impact: 'A focused page helps a new customer understand what you offer, where you are and how to take the next step without searching through scattered posts.', why: 'People often check a business online before calling or visiting. A useful one-page site puts your key details, photos and enquiry link together in one place you control.', bestFor: 'New businesses, solo professionals and local shops that need a simple first website.', demo: { heading: 'Good things, made daily.', subheading: 'A neighbourhood bakery for the everyday treat.', items: ['Fresh bakes, made this morning', 'Find us in Indiranagar, Bengaluru', 'Ask about today\'s specials'], action: 'Send an enquiry' } },
  { id: '3-5-page-business-website', name: '3–5 page business website', price: 4999, category: 'Website', mark: '▤', summary: 'Organize your services, story and contact details across a few pages.', impact: 'Separate pages give customers room to compare services, understand your approach and find answers. This can make more complex offers easier to explore.', why: 'When every detail is squeezed into one page, visitors can miss the information they came for. A small, well-planned site makes each customer question easier to answer.', bestFor: 'Growing businesses, clinics, studios and service providers with several offers or locations.', demo: { heading: 'Care that listens.', subheading: 'Meet the team, explore services and request a visit.', items: ['About the practice', 'Services and helpful information', 'Hours, location and contact'], action: 'Explore services' } },
  { id: 'whatsapp-ordering-catalogue', name: 'WhatsApp ordering catalogue', price: 1499, category: 'Sales & ordering', brand: 'whatsapp', mark: '◉', summary: 'Let customers browse a simple selection and send an order on WhatsApp.', impact: 'A clear catalogue reduces back-and-forth questions about what is available. Customers can select items and send their request with product details already included.', why: 'Many local customers already use WhatsApp to ask questions. A ready-to-send order makes that familiar conversation quicker and easier to follow.', bestFor: 'Home kitchens, grocers, boutiques, bakeries and sellers who confirm orders directly.', demo: { heading: 'The weekend basket', subheading: 'Fresh picks, packed for your home.', items: ['Seasonal fruit box · ₹420', 'Fresh greens bundle · ₹260', 'Add a note for the shop'], action: 'Add to WhatsApp order' } },
  { id: 'razorpay-payment-page-or-link', name: 'Razorpay payment page or link setup', price: 999, category: 'Payments', brand: 'razorpay', mark: '₹', summary: 'Set up a supported payment page or shareable payment link.', impact: 'A clear payment step can help customers pay deposits, invoices or fixed-price offers remotely, so a sale does not depend on an in-person visit.', why: 'Customers need a convenient way to complete a payment. The right option depends on your approved merchant account, product and payment workflow.', bestFor: 'Businesses taking advance payments, fees or payments for a clearly scoped service.', demo: { heading: 'Payment request', subheading: 'Sample booking advance · ₹1,250', items: ['For: custom celebration cake', 'From: The Sugar Window', 'Payment method: merchant setup required'], action: 'Preview payment step' } },
  { id: 'razorpay-supported-payment-catalogue', name: 'Razorpay-supported payment catalogue', price: 1999, category: 'Payments', brand: 'razorpay', mark: '▧', summary: 'Connect a product catalogue to supported payment features where available.', impact: 'Showing products beside a supported payment step can make it easier for customers to move from browsing to paying in the same journey.', why: 'A catalogue and a payment link are different tools. We first check what the approved merchant account supports, then shape the order flow around those features.', bestFor: 'Sellers with an approved merchant account and a straightforward set of products.', demo: { heading: 'Your cart', subheading: 'Sample items ready for a checkout review.', items: ['Everyday cotton kurta · ₹899', 'Linen tote bag · ₹499', 'Estimated total · ₹1,398'], action: 'Review sample checkout' } },
  { id: 'digital-product-catalogue', name: 'Digital product catalogue (up to 20)', price: 1499, category: 'Sales & ordering', mark: '▦', summary: 'Present up to 20 products in a browsable, shareable online catalogue.', impact: 'Customers can compare products, prices and details before they contact you. A single catalogue link is easier to share than a long series of photos in chat.', why: 'When product information is easy to scan, shoppers can make a more informed enquiry and your team can spend less time repeating basic details.', bestFor: 'Retailers, makers, wholesalers and product businesses with a focused range.', demo: { heading: 'The everyday edit', subheading: 'A few customer favourites, all in one place.', items: ['Handmade ceramic cup · ₹650', 'Cotton market tote · ₹480', 'Gift set · ₹1,150'], action: 'Add item to enquiry' } },
  { id: 'digital-menu-with-qr-code', name: 'Digital menu with QR code', price: 999, category: 'Sales & ordering', mark: '⌗', summary: 'Give customers a quick menu link they can open from a QR code.', impact: 'A digital menu makes it easier to share current offerings and prices. Guests can browse on their own phone, and you can update the menu without reprinting every copy.', why: 'Customers want to see options before they decide. A QR code at the counter or table connects the physical visit with a clear, readable menu.', bestFor: 'Cafes, restaurants, cloud kitchens and caterers.', demo: { heading: 'The Garden Table', subheading: 'Good food, good mood · Bengaluru', items: ['Small plates', 'From the garden', 'Something sweet'], action: 'Browse menu sections' } },
  { id: 'google-business-profile-setup', name: 'Google Business Profile setup', price: 999, category: 'Online visibility', brand: 'google', mark: '⌖', summary: 'Set up the core details customers use to find and contact a local business.', impact: 'A complete local listing can make your hours, location, phone and website easier for nearby customers to find when they search or look at a map.', why: 'Customers often search with a place or service in mind. Accurate details help them decide whether to call, get directions or visit.', bestFor: 'Local shops, clinics, restaurants, studios and service-area businesses.', demo: { heading: 'The Daily Loaf', subheading: 'Bakery · Indiranagar, Bengaluru', items: ['Open today · 8 am–8 pm', 'Directions · Call · Website', 'Fresh breads and pastries'], action: 'Preview local listing' } },
  { id: 'instagram-business-setup', name: 'Instagram Business account setup', price: 499, category: 'Online visibility', brand: 'instagram', mark: '◎', summary: 'Set up a business profile with clear contact and discovery details.', impact: 'A well-organized profile gives visitors a quick way to understand your business, browse your work and find the right contact or order link.', why: 'Social visitors may discover you through a post, then open your profile to decide what to do next. A clear bio and working link make that next step easier.', bestFor: 'Visual brands, makers, food businesses, salons and independent professionals.', demo: { heading: 'Thread & Thimble', subheading: 'Thoughtful everyday wear · Made in Bengaluru', items: ['New arrivals', 'Made with care', 'Shop the collection'], action: 'Open profile preview' } },
  { id: 'facebook-business-page-setup', name: 'Facebook Business Page setup', price: 499, category: 'Online visibility', brand: 'facebook', mark: 'f', summary: 'Create a business page with consistent identity and contact information.', impact: 'A business page provides another place for customers to check your location, opening hours, updates and contact details.', why: 'Some communities and customer groups rely on Facebook to find local businesses and share recommendations. A complete page helps them confirm they have the right place.', bestFor: 'Community-focused businesses, local services, shops and event organizers.', demo: { heading: 'Little Leaf Nursery', subheading: 'Plants and growing advice for city homes.', items: ['Visit us · 10 am–7 pm', 'New plants every Friday', 'Message us with a plant question'], action: 'Preview business page' } },
  { id: 'whatsapp-business-profile-setup', name: 'WhatsApp Business profile setup', price: 499, category: 'Sales & ordering', brand: 'whatsapp', mark: '◉', summary: 'Make your WhatsApp business profile useful and recognizable to customers.', impact: 'A business name, description, hours and catalogue can help customers feel confident they are messaging the right business and know what to ask for.', why: 'Customers already use WhatsApp for quick questions. A well-set profile makes that channel more organized and easier to manage.', bestFor: 'Businesses that handle enquiries, bookings or orders directly in WhatsApp.', demo: { heading: 'Saffron & Stone', subheading: 'Home-style meals · Bengaluru', items: ['Business hours · 11 am–8 pm', 'Menu and pickup details', 'Typical reply time · during business hours'], action: 'Start a sample chat' } },
  { id: 'link-in-bio-business-page', name: 'Link-in-bio business page', price: 499, category: 'Online visibility', mark: '↗', summary: 'Bring your important links together on one simple mobile page.', impact: 'A single link can send visitors to your menu, catalogue, booking details, location or contact channel without making them search through your posts.', why: 'Social profiles often offer limited space for links. A small landing page helps turn one profile link into several useful next steps.', bestFor: 'Creators, photographers, event businesses and brands active on social media.', demo: { heading: 'Ananya Kapoor', subheading: 'Photographer & visual storyteller', items: ['View portfolio', 'Book a session', 'Print shop · Say hello'], action: 'Open a sample link' } },
  { id: 'domain-and-business-email-setup', name: 'Domain and business email setup¹', price: 999, category: 'Website', mark: '@', summary: 'Connect a domain and business email so your online identity is consistent.', impact: 'A domain is easier to share and remember than a long platform URL. A matching email can make enquiries and proposals feel more organized.', why: 'Your web address and email often appear on cards, invoices and social profiles. Keeping them under your control creates a consistent point of contact.', bestFor: 'Businesses ready to use a consistent brand name across their website and email.', demo: { heading: 'Your business address', subheading: 'A short, memorable home on the web.', items: ['www.yourbusiness.in', 'hello@yourbusiness.in', 'Domain registered in your name'], action: 'Preview setup checklist' } },
  { id: 'basic-seo-setup', name: 'Basic SEO setup', price: 999, category: 'Online visibility', mark: '⌕', summary: 'Set up clear page titles, descriptions and search-friendly site structure.', impact: 'Basic SEO makes your pages easier for search engines to understand and helps each page describe what your business does when it appears in results.', why: 'A well-labeled website gives customers and search tools clearer context. It supports discoverability but cannot guarantee rankings or traffic.', bestFor: 'Businesses with a website that want a solid foundation for organic search.', demo: { heading: 'A search-ready page', subheading: 'Local bakery · Fresh bakes in Bengaluru', items: ['Clear page title', 'Useful search description', 'Readable page headings'], action: 'See a sample search result' } },
]

type MonthlyPlan = [string, number, string]
const monthlyPlans: MonthlyPlan[] = [
  ['Basic Care', 499, 'Uptime checks, backups and one minor content update.'],
  ['Social Lite', 999, 'Four template-based social posts each month.'],
  ['Social Growth', 1999, 'Eight posts, captions and scheduling.'],
  ['Digital Care Plus', 2999, 'Eight posts, website care and up to two minor updates.'],
]

interface Pack {
  label: string
  icon: string
  name: string
  description: string
  price: number
  includes: string[]
  delivery: string
  button: string
  featured?: boolean
}
const packs: Pack[] = [
  { label: 'THE ESSENTIALS', icon: '◌', name: 'Starter Digital Pack', description: 'A clean first step for getting found and contacted online.', price: 2999, includes: ['One-page template website', 'WhatsApp enquiry button', 'Google Maps and contact details', 'Social links', 'One revision round'], delivery: '24–48 hours*', button: 'Choose Starter' },
  { label: 'THE BUSINESS BASICS', icon: '✳', name: 'Business Digital Pack', description: 'A more complete digital presence for a growing local business.', price: 4999, includes: ['Up to 5 website pages', 'WhatsApp Business profile setup', 'Google Business Profile setup help', 'Instagram and Facebook pages', 'Basic SEO + one revision round'], delivery: 'about 48 hours*', button: 'Choose Business', featured: true },
  { label: 'THE SELLER TOOLKIT', icon: '▧', name: 'Seller Digital Pack', description: 'A simple catalogue that helps customers browse and enquire.', price: 6999, includes: ['Template catalogue, up to 20 products', 'WhatsApp ordering buttons', 'Payment links or supported checkout', 'Instagram and Facebook pages', 'Shareable catalogue QR code'], delivery: '48–72 hours*', button: 'Choose Seller' },
]

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedPacks, setSelectedPacks] = useState<string[]>([])
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  
  const serviceParam = searchParams.get('service')
  const businessParam = searchParams.get('business')
  const planParam = searchParams.get('plan')

  useEffect(() => {
    if (serviceParam && services.some(s => s.name === serviceParam)) {
      setSelectedServices([serviceParam])
    }
    if (businessParam) {
      setSelectedServices([])
      setSelectedPacks([])
      setSelectedPlans([])
    }
    if (planParam && monthlyPlans.some(([name]) => `${name} monthly plan` === planParam)) {
      setSelectedPlans([planParam])
    }
  }, [serviceParam, businessParam, planParam])

  const offer = serviceParam || businessParam || planParam || 'General enquiry'
  const businessType = businessParam || ''

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') window.history.back() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const response = await fetch(formspreeEndpoint, { method: 'POST', body: new FormData(event.currentTarget), headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('We couldn&apos;t send your request. Please try again in a moment.')
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="page-wrapper">
      <section className="page-hero page-hero--contact !bg-[#e2f5f5] !py-24 md:!py-32">
        <div className="container !max-w-6xl !text-left">
          <span className="eyebrow !text-[#087b87]">Your next step starts here</span>
          <h1 className="!max-w-4xl !text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl">Tell us what you do.<br /><span className="!text-[#087b87]">We&apos;ll help you get online.</span></h1>
          <p className="hero-lede !mx-0 !max-w-xl !text-lg !leading-relaxed !text-[#5e586d]">Pick a pack or tell us what you&apos;re trying to set up. We&apos;ll point you in the right direction.</p>
        </div>
      </section>

      <section className="contact-section !bg-gradient-to-br !from-[#211832] !to-[#49318d] !py-24">
        <div className="container contact-layout !grid-cols-1 !gap-12 lg:!grid-cols-[minmax(0,1.2fr)_minmax(260px,.8fr)]">
          <div>
            {status === 'sent' ? (
              <div className="enquiry-success" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <span><Check size={23} /></span>
                <p className="eyebrow">Request received</p>
                <h2>Thanks for reaching out.</h2>
                <p>We&apos;ve received your enquiry about <b>{offer}</b> and will get back to you soon.</p>
                <button className="button button-primary" type="button" onClick={() => window.history.back()}>Done</button>
              </div>
            ) : (
              <>
                <form className="enquiry-form !rounded-[26px] !border-[#e8e0f3] !bg-[#fffaff] !p-6 !shadow-[0_24px_70px_rgba(26,16,51,0.22)] md:!p-9" onSubmit={submit}>
                  <input type="hidden" name="Selected service or plan" value={offer} />
                  {businessType && <input type="hidden" name="Business type" value={businessType} />}
                  <label className="enquiry-trap" aria-hidden="true">Leave this field empty<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
                  <label>Your name<input name="name" required autoComplete="name" placeholder="Name" /></label>
                  <label>Business name<input name="business_name" required autoComplete="organization" placeholder="Business name" /></label>
                  <label>Phone / WhatsApp<input name="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" /></label>
                  <label>Email address<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
                  
                  <fieldset className="enquiry-service-picker">
                    <legend>Which setup packs are you interested in?</legend>
                    <p>Select one or more packs, if you need a bundled setup.</p>
                    <div className="enquiry-service-options">
                      {packs.map(pack => (
                        <label key={pack.name}>
                          <input type="checkbox" name="packs" value={pack.name} checked={selectedPacks.includes(pack.name)} onChange={event => setSelectedPacks(current => event.target.checked ? [...current, pack.name] : current.filter(name => name !== pack.name))} />
                          <span>{pack.name} · {money(pack.price)}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="enquiry-service-picker">
                    <legend>Which monthly care plans interest you?</legend>
                    <p>Select any plans you&apos;d like to ask us about.</p>
                    <div className="enquiry-service-options">
                      {monthlyPlans.map(([name, price]) => {
                        const value = `${name} monthly plan`
                        return (
                          <label key={name}>
                            <input type="checkbox" name="monthly_plans" value={`${name} · ${money(price)}/month`} checked={selectedPlans.includes(value)} onChange={event => setSelectedPlans(current => event.target.checked ? [...current, value] : current.filter(item => item !== value))} />
                            <span>{name} · {money(price)}/month</span>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  <fieldset className="enquiry-service-picker">
                    <legend>Which individual services are you interested in?</legend>
                    <p>Select as many as you need.</p>
                    <div className="enquiry-service-options">
                      {services.map(service => (
                        <label key={service.id}>
                          <input type="checkbox" name="services" value={service.name} checked={selectedServices.includes(service.name)} onChange={event => setSelectedServices(current => event.target.checked ? [...current, service.name] : current.filter(s => s !== service.name))} />
                          <span>{service.name}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <label className="enquiry-wide">What does your business do?<textarea name="business_details" required rows={3} placeholder="Tell us what you sell or the service you provide…" /></label>
                  {businessType && <fieldset className="enquiry-business-fields"><legend>Details for your {businessType.toLowerCase()}</legend><div>{(businessQuestions[businessType] || ['What products or services do you offer?', 'What should customers know before they contact you?']).map((question, index) => <label key={question}>{question}<textarea name={`business_specific_${index + 1}`} required={index === 0} rows={2} placeholder="Add a few details…" /></label>)}</div></fieldset>}
                  <label className="enquiry-wide">Anything specific you need?<textarea name="requirements" rows={3} placeholder="A website, ordering, payments, a catalogue…" /></label>
                  {error && <p className="enquiry-error" role="alert">{error}</p>}
                  <button className="button button-primary enquiry-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={15} /></button>
                  <small className="enquiry-privacy">Your details will only be used to respond to this enquiry.</small>
                </form>
              </>
            )}
          </div>
          <div className="contact-aside">
            <span className="aside-spark">✳</span>
            <b>One clear brief.<br />One thoughtful setup.</b>
            <span>Start with the details that make your business yours.</span>
            <div className="aside-line" />
            <small>OnlineKarDo · Get Your Business Online</small>
          </div>
        </div>
      </section>
    </div>
  )
}

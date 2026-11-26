import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Menu, X, ShoppingBag, HeartPulse, House, Utensils, Briefcase, GraduationCap } from 'lucide-react'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { formspreeEndpoint } from './config'
import HomePage from './pages/HomePage'
import HowItWorksPage from './pages/HowItWorksPage'
import PacksPage from './pages/PacksPage'
import MonthlyPage from './pages/MonthlyPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import CategoryPage from './pages/CategoryPage'
import CaseStudyPage from './pages/CaseStudyPage'
import FineprintPage from './pages/FineprintPage'
import ContactPage from './pages/ContactPage'
import { EnquiryProvider } from './context/EnquiryContext'
import './styles.css'
import './tailwind.css'

// Add the business WhatsApp number in international format and a contact email here.
const CONTACT = { whatsapp: '+91 91879 43361', email: 'support@onlinekardo.com' }
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

type MonthlyPlan = [string, number, string]
const monthlyPlans: MonthlyPlan[] = [
  ['Basic Care', 499, 'Uptime checks, backups and one minor content update.'],
  ['Social Lite', 999, 'Four template-based social posts each month.'],
  ['Social Growth', 1999, 'Eight posts, captions and scheduling.'],
  ['Digital Care Plus', 2999, 'Eight posts, website care and up to two minor updates.'],
]

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
  { id: 'razorpay-payment-page-or-link', name: 'Razorpay payment page or link setup', price: 999, category: 'Payments', brand: 'razorpay', mark: '', summary: 'Set up a supported payment page or shareable payment link.', impact: 'A clear payment step can help customers pay deposits, invoices or fixed-price offers remotely, so a sale does not depend on an in-person visit.', why: 'Customers need a convenient way to complete a payment. The right option depends on your approved merchant account, product and payment workflow.', bestFor: 'Businesses taking advance payments, fees or payments for a clearly scoped service.', demo: { heading: 'Payment request', subheading: 'Sample booking advance · ₹1,250', items: ['For: custom celebration cake', 'From: The Sugar Window', 'Payment method: merchant setup required'], action: 'Preview payment step' } },
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

interface HeaderProps {
  isService: boolean
  onEnquiry: (name: string) => void
}
function Header({ isService, onEnquiry }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const homeHeader = location.pathname === '/'
  const navigate = useNavigate()
  const links = [{ label: 'How it works', to: '/how' }, { label: 'Packs', to: '/packs' }, { label: 'Monthly plans', to: '/monthly' }]
  
  const handleNavClick = (to: string) => {
    setOpen(false)
    if (isService) {
      navigate(to)
    }
  }

  return (
    <>
    <header className={`site-header !border-0 !bg-transparent !shadow-none !backdrop-blur-none ${homeHeader ? '!absolute !left-0 !right-0 !top-3 !z-50 !h-auto md:!top-5 xl:!top-6' : '!sticky !top-0 !z-50 !h-auto !bg-[#f7fafb]/85 !backdrop-blur-xl'}`}>
      <div className={`container nav-wrap !relative !justify-between ${homeHeader ? '!h-auto !w-full !max-w-none !gap-3 !px-4 !py-2 md:!gap-5 md:!px-10 md:!py-3' : '!h-auto !w-full !max-w-[1440px] !gap-3 !px-4 !py-2 md:!gap-5 md:!px-8'}`}>
        <Link to="/" className="brand !shrink-0 !rounded-full !border !border-white/80 !bg-white/95 !px-3 !py-1 !shadow-[0_14px_42px_rgba(5,18,43,.17)] backdrop-blur-xl sm:!px-4 md:!h-[58px] md:!px-5 md:!py-0.5" aria-label="OnlineKarDo home">
          <img className="!w-[140px] sm:!w-[150px] md:!w-[154px]" src="/assets/onlinekardo-logo.jpeg" alt="OnlineKarDo — Get Your Business Online" />
        </Link>
        <nav id="main-nav" className={`main-nav ${open ? 'open' : ''} !gap-1 !rounded-3xl !border !border-white/80 !bg-white/95 !p-3 !shadow-[0_14px_42px_rgba(5,18,43,.17)] !backdrop-blur-xl md:!relative md:!left-auto md:!right-auto md:!top-auto md:!flex md:!items-center md:!gap-1 md:!rounded-full md:!px-2 md:!py-2`} aria-label="Main navigation">
          {links.slice(0, 3).map(({ label, to }) => (
            <Link key={to} to={to} onClick={() => handleNavClick(to)} className={`!rounded-full !px-3 !py-2 !text-sm !font-semibold !text-[#243b4d] hover:!bg-[#eaf7f7] md:!px-3.5 ${location.pathname === to ? 'active' : ''}`}>
              {label}
            </Link>
          ))}
          <button type="button" aria-expanded={servicesOpen} aria-haspopup="dialog" onClick={() => { setOpen(false); setServicesOpen(value => !value) }} className={`!rounded-full !px-3 !py-2 !text-sm !font-semibold !text-[#243b4d] hover:!bg-[#eaf7f7] md:!px-3.5 ${location.pathname.startsWith('/services') ? 'active' : ''}`}>Services</button>
          {links.slice(3).map(({ label, to }) => (
            <Link key={to} to={to} onClick={() => handleNavClick(to)} className={`!rounded-full !px-3 !py-2 !text-sm !font-semibold !text-[#243b4d] hover:!bg-[#eaf7f7] md:!px-3.5 ${location.pathname === to ? 'active' : ''}`}>
              {label}
            </Link>
          ))}
          <button type="button" onClick={() => { setOpen(false); onEnquiry('General enquiry') }} className="button button-small button-dark nav-cta !ml-0 !min-h-10 !rounded-full !bg-[#11151b] !px-5 !text-sm !font-bold !text-white !shadow-[0_12px_30px_rgba(5,18,43,.22)] transition hover:!-translate-y-0.5 hover:!bg-[#087b87]">{homeHeader ? 'Let’s talk' : 'Get started'} <ArrowUpRight size={15} /></button>
        </nav>
        <button className="menu-toggle !ml-0 !rounded-full !border !border-white/50 !bg-white/15 !text-white !backdrop-blur-md md:!hidden" type="button" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
    {servicesOpen && <ServicesMegaMenu onClose={() => setServicesOpen(false)} />}
    </>
  )
}

const serviceMenuGroups = [
  { label: 'Web', to: '/web-development', ids: ['one-page-business-website', '3-5-page-business-website', 'domain-and-business-email-setup', 'basic-seo-setup'] },
  { label: 'WhatsApp Commerce', to: '/whatsapp-commerce', ids: ['whatsapp-ordering-catalogue', 'whatsapp-business-profile-setup', 'digital-product-catalogue', 'digital-menu-with-qr-code'] },
  { label: 'Local Discovery', to: '/local-discovery', ids: ['google-business-profile-setup', 'instagram-business-setup', 'facebook-business-page-setup'] },
]

const industryMenuItems = [
  { label: 'E-commerce & Retail', detail: 'Storefronts, product catalogues and local shops.', icon: ShoppingBag },
  { label: 'Restaurants & Hospitality', detail: 'Menus, ordering, bookings and discovery.', icon: Utensils },
  { label: 'Healthcare', detail: 'Clinic information and patient enquiry journeys.', icon: HeartPulse },
  { label: 'Real Estate', detail: 'Property showcases and location-led enquiries.', icon: House },
  { label: 'Professional Services', detail: 'Clear service pages and qualified enquiries.', icon: Briefcase },
  { label: 'Education', detail: 'Programs, admissions information and contact paths.', icon: GraduationCap },
]

function ServicesMegaMenu({ onClose }: { onClose: () => void }) {
  const [activeGroup, setActiveGroup] = useState(0)
  const isIndustries = activeGroup === serviceMenuGroups.length
  const group = serviceMenuGroups[activeGroup]
  const groupServices = group?.ids.map(id => services.find(service => service.id === id)).filter((service): service is Service => Boolean(service)) ?? []
  const menuTabs = [...serviceMenuGroups.map(item => item.label), 'Industries']

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-[#071e32]/60 px-3 pb-5 pt-24 backdrop-blur-sm md:px-6 md:pt-28" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section role="dialog" aria-modal="true" aria-label="Explore services" className="relative w-full max-w-[1500px] rounded-[28px] border border-white/70 bg-[#f5f5e9] p-3 shadow-[0_35px_110px_rgba(0,0,0,.3)] md:rounded-[34px] md:p-5">
      <div className="grid gap-4 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
        <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible" role="tablist" aria-label="Service categories and industries">
          {menuTabs.map((label, index) => <button key={label} id={`service-group-tab-${index}`} type="button" role="tab" aria-selected={activeGroup === index} aria-controls="service-group-panel" onClick={() => setActiveGroup(index)} className={`flex min-h-14 shrink-0 items-center justify-between gap-4 rounded-full px-5 text-left text-sm font-semibold transition md:min-h-[72px] md:px-6 md:text-base ${activeGroup === index ? 'bg-[#55c9c0] text-white shadow-[0_12px_30px_rgba(40,170,165,.22)]' : 'bg-white text-[#30343a] hover:bg-[#e7f5f1]'}`}><span>{label}</span>{activeGroup === index && <span className="h-2 w-2 rounded-full bg-white"/>}</button>)}
        </div>
        <div id="service-group-panel" role="tabpanel" aria-labelledby={`service-group-tab-${activeGroup}`} className="min-w-0 rounded-[22px] bg-transparent p-2 md:p-3">
          {isIndustries ? <>
            <div className="grid gap-x-5 md:grid-cols-2 xl:grid-cols-3">{industryMenuItems.map(({label,detail,icon:Icon})=><div key={label} className="flex min-h-[82px] items-center gap-4 border-b border-[#d9ddd5] px-2 py-3 text-[#282b2e] md:px-3"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#e8e8df] bg-white text-[#087b87] shadow-sm"><Icon size={22}/></span><span><b className="block text-sm font-semibold leading-snug md:text-base">{label}</b><small className="mt-1 block text-xs text-[#818781]">{detail}</small></span></div>)}</div>
            <div className="mt-4 flex flex-col gap-3 rounded-[20px] bg-white p-4 sm:flex-row sm:items-center sm:justify-between md:mt-5 md:px-5"><div><span className="block text-lg font-semibold tracking-tight text-[#24282b]">Industry overview</span><span className="text-xs text-[#77817f]">Digital setup options for the way different businesses serve customers.</span></div><Link to="/services" onClick={onClose} className="inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-[#55c9c0] px-5 text-sm font-bold text-white transition hover:bg-[#168b8f] sm:self-auto">Explore services <ArrowUpRight size={15}/></Link></div>
          </> : <>
            <div className="grid gap-x-5 md:grid-cols-2 xl:grid-cols-3">{groupServices.map(service => <Link key={service.id} to={`/services/${service.id}`} onClick={onClose} className="group flex min-h-[76px] items-center gap-4 border-b border-[#d9ddd5] px-2 py-3 text-[#282b2e] transition hover:text-[#087b87] md:px-3"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#e8e8df] bg-white font-display text-xl font-semibold text-[#087b87] shadow-sm">{service.mark || service.name.slice(0, 1)}</span><span className="min-w-0"><b className="block text-sm font-semibold leading-snug md:text-base">{service.name}</b><small className="mt-1 block text-xs text-[#818781]">{`₹${service.price.toLocaleString('en-IN')}`}</small></span><ArrowUpRight size={15} className="ml-auto shrink-0 opacity-0 transition group-hover:opacity-100"/></Link>)}</div>
            <div className="mt-4 flex flex-col gap-3 rounded-[20px] bg-white p-4 sm:flex-row sm:items-center sm:justify-between md:mt-5 md:px-5"><div><span className="block text-lg font-semibold tracking-tight text-[#24282b]">{group.label} overview</span><span className="text-xs text-[#77817f]">See the full approach, demos and outcomes for this area.</span></div><div className="flex flex-wrap gap-2"><Link to={group.to} onClick={onClose} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#55c9c0] px-5 text-sm font-bold text-white transition hover:bg-[#168b8f]">{group.label} overview <ArrowUpRight size={15}/></Link><Link to="/services" onClick={onClose} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#d8dfd9] px-5 text-sm font-bold text-[#34444b] transition hover:bg-[#f3f7f5]">All services</Link></div></div>
          </>}
        </div>
      </div>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 hidden h-10 w-10 place-items-center rounded-full bg-white text-[#263847] shadow md:grid" aria-label="Close services menu"><X size={18}/></button>
    </section>
  </div>
}

function Footer() {
  return (
    <footer className="site-footer !bg-[#101c29] !text-[#fffaff]">
      <div className="container footer-main">
        <div className="footer-brand">
          <img src="/assets/onlinekardo-logo.jpeg" alt="OnlineKarDo" />
          <p>Digital essentials for local businesses, made simpler.</p>
        </div>
        <div className="footer-nav">
          <div>
            <b>Explore</b>
            <Link to="/how">How it works</Link>
            <Link to="/packs">Setup packs</Link>
            <Link to="/monthly">Monthly plans</Link>
          </div>
          <div>
            <b>Get started</b>
            <Link to="/services">Individual services</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/fineprint">Important details</Link>
            <a href="mailto:support@onlinekardo.com">support@onlinekardo.com</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} OnlineKarDo. All rights reserved.</span>
        <span>Made for the people building local business.</span>
      </div>
    </footer>
  )
}

interface EnquiryModalProps {
  offer: string
  businessType: string
  onClose: () => void
}
function EnquiryModal({ offer, businessType, onClose }: EnquiryModalProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const [selectedServices, setSelectedServices] = useState(() => services.some(service => service.name === offer) ? [offer] : [])
  const [selectedPacks, setSelectedPacks] = useState(() => packs.some(pack => pack.name === offer) ? [offer] : [])
  const [selectedPlans, setSelectedPlans] = useState(() => monthlyPlans.some(([name]) => `${name} monthly plan` === offer) ? [offer] : [])
  const isMonthly = offer.toLowerCase().includes('monthly plan')
  const isPack = packs.some(pack => pack.name === offer)
  const isPayment = /razorpay|payment/i.test(offer)
  const isCatalogue = /catalogue|menu|ordering/i.test(offer)
  const isWeb = /website|domain|seo/i.test(offer)
  const isGoogle = /google business/i.test(offer)
  const isSocial = /instagram|facebook/i.test(offer)
  const isWhatsApp = /whatsapp/i.test(offer)
  const contextualQuestions = businessType
    ? businessQuestions[businessType] || ['What products or services do you offer?', 'What should customers know before they contact you?']
    : isMonthly
      ? ['What is your current website or social profile URL?', 'What updates, content or support would help you each month?']
      : isPayment
        ? ['What do you need to collect payments for?', 'Do you already have a merchant account? If so, which provider?']
        : isGoogle
          ? ['What is your business address, service area and opening schedule?', 'Do you already have a Google Business Profile? Share its link if available.']
          : isSocial
            ? ['Share your social handle or profile link, if you have one.', 'What should your profile help customers discover or do?']
            : isWhatsApp
              ? ['What business number should customers contact?', 'Would you like to display products, services, prices or quick replies?']
              : isPack
                ? ['Which parts of your business should the pack bring online first?', 'Do you already have a logo, photos, product list or social profiles we can build from?']
                : isCatalogue
                  ? ['Which products, menu categories or services should customers browse?', 'How do customers usually order: WhatsApp, pickup, delivery or in person?']
                  : isWeb
                    ? ['What pages or information should your website include?', 'Do you already have a domain, logo, photos or written content?']
                    : ['Which accounts, links or tools do you currently use for this?', 'What would you like customers to be able to do next?']
  const formKicker = businessType ? `${businessType} enquiry` : isMonthly ? 'Monthly support enquiry' : isPack ? 'Setup pack enquiry' : 'Service enquiry'
  const formHeadline = businessType ? `Let’s build something for your ${businessType.toLowerCase()}.` : isMonthly ? 'What would you like help maintaining?' : isPack ? 'Let’s find the right starting point.' : isPayment ? 'Let’s understand your payment flow.' : isCatalogue ? 'Tell us what customers should browse.' : isWeb ? 'What should your online home do?' : 'Tell us what you want to set up.'
  const formType = businessType ? 'Business-specific enquiry' : isMonthly ? 'Monthly care plan enquiry' : isPack ? 'Setup pack enquiry' : 'Individual service enquiry'
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [onClose])
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const response = await fetch(formspreeEndpoint, { method: 'POST', body: new FormData(event.currentTarget), headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('We couldn’t send your request. Please try again in a moment.')
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }
  return (
    <div className="enquiry-backdrop !bg-[#10251f]/85 !backdrop-blur-md" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
      <section className="enquiry-modal !rounded-[28px] !border-[#e8e0f3] !bg-[#fffaff] !shadow-[0_36px_110px_rgba(26,16,51,0.48)]" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
        <button className="enquiry-close" type="button" onClick={onClose} aria-label="Close enquiry form"><X size={19} /></button>
        {status === 'sent' ? (
          <div className="enquiry-success"><span><Check size={23} /></span><p className="eyebrow">Request received</p><h2>Thanks for reaching out.</h2><p>We've received your enquiry about <b>{offer}</b> and will get back to you soon.</p><button className="button button-primary" type="button" onClick={onClose}>Done</button></div>
        ) : (
          <>
            <span className="eyebrow">{formKicker}</span><h2 id="enquiry-title">{formHeadline}</h2><p className="enquiry-intro">We&apos;ll follow up about <b>{offer}</b> and help you figure out the next step.</p>
            <form className="enquiry-form" onSubmit={submit}>
              <input type="hidden" name="Selected service or plan" value={offer} />
              <input type="hidden" name="Enquiry type" value={formType} />
              <input type="hidden" name="_subject" value={`OnlineKarDo enquiry: ${offer}`} />
              {businessType && <input type="hidden" name="Business type" value={businessType} />}
              <label className="enquiry-trap" aria-hidden="true">Leave this field empty<input name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
              <label>Your name<input name="name" required autoComplete="name" placeholder="Name" /></label>
              <label>Business name<input name="business_name" required autoComplete="organization" placeholder="Business name" /></label>
              <label>Phone / WhatsApp<input name="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" /></label>
              <label>Email address<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
              <fieldset className="enquiry-service-picker"><legend>Which setup packs are you interested in?</legend><p>Select one or more packs, if you need a bundled setup.</p><div className="enquiry-service-options">{packs.map(pack => <label key={pack.name}><input type="checkbox" name="packs" value={pack.name} checked={selectedPacks.includes(pack.name)} onChange={event => setSelectedPacks(current => event.target.checked ? [...current, pack.name] : current.filter(name => name !== pack.name))} /><span>{pack.name} · {money(pack.price)}</span></label>)}</div></fieldset>
              <fieldset className="enquiry-service-picker"><legend>Which monthly care plans interest you?</legend><p>Select any plans you&apos;d like to ask us about.</p><div className="enquiry-service-options">{monthlyPlans.map(([name, price]) => { const value = `${name} monthly plan`; return <label key={name}><input type="checkbox" name="monthly_plans" value={`${name} · ${money(price)}/month`} checked={selectedPlans.includes(value)} onChange={event => setSelectedPlans(current => event.target.checked ? [...current, value] : current.filter(item => item !== value))} /><span>{name} · {money(price)}/month</span></label> })}</div></fieldset>
              <fieldset className="enquiry-service-picker"><legend>Which individual services are you interested in?</legend><p>Select as many as you need.</p><div className="enquiry-service-options">{services.map(service => <label key={service.id}><input type="checkbox" name="services" value={service.name} checked={selectedServices.includes(service.name)} onChange={event => setSelectedServices(current => event.target.checked ? [...current, service.name] : current.filter(name => name !== service.name))} /><span>{service.name}</span></label>)}</div></fieldset>
              <fieldset className="enquiry-service-picker enquiry-wide"><legend>What budget range should we keep in mind?</legend><p>This helps us suggest a useful scope. You can leave it open if you are still deciding.</p><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{[['Under ₹2,000', 'under-2000'], ['₹2,000–₹5,000', '2000-5000'], ['₹5,000–₹10,000', '5000-10000'], ['₹10,000+', '10000-plus'], ['I’m not sure yet', 'undecided']].map(([label, value]) => <label className="!flex-row !items-center gap-2 rounded-lg border border-[#e8e9e2] bg-white px-3 py-2 text-sm font-medium" key={value}><input className="!h-4 !w-4 !accent-[#087b87]" type="radio" name="budget_range" value={label} /><span>{label}</span></label>)}</div></fieldset>
              <label className="enquiry-wide">{businessType ? `Tell us about your ${businessType.toLowerCase()}` : isMonthly ? 'What does your business need right now?' : 'What does your business do?'}<textarea name="business_details" required rows={3} placeholder={businessType ? `Share a little about your ${businessType.toLowerCase()}…` : 'Tell us what you sell or the service you provide…'} /></label>
              <fieldset className="enquiry-business-fields"><legend>{businessType ? `Details for your ${businessType.toLowerCase()}` : isMonthly ? 'Your current setup and support needs' : `A few details about ${offer}`}</legend><div>{contextualQuestions.map((question, index) => <label key={question}>{question}<textarea name={`project_details_${index + 1}`} required={index === 0} rows={2} placeholder="Add a few details…" /></label>)}</div></fieldset>
              <label className="enquiry-wide">Anything specific you need?<textarea name="requirements" rows={3} placeholder="A website, ordering, payments, a catalogue…" /></label>
              <label className="enquiry-wide !flex-row !items-start gap-3 rounded-xl border border-[#e8e0f3] bg-white px-4 py-3 text-sm leading-relaxed !font-medium"><input className="!mt-1 !h-4 !w-4 !shrink-0 !accent-[#087b87]" type="checkbox" name="contact_consent" value="yes" required /><span>I agree to be contacted about this enquiry and understand my details will be used to respond to it.</span></label>
              {error && <p className="enquiry-error" role="alert">{error}</p>}
              <button className="button button-primary enquiry-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={15} /></button>
              <small className="enquiry-privacy">Your details will only be used to respond to this enquiry.</small>
            </form>
          </>
        )}
      </section>
    </div>
  )
}

function AppContent() {
  const [toast, setToast] = useState('')
  const [enquiryOffer, setEnquiryOffer] = useState('')
  const [enquiryBusiness, setEnquiryBusiness] = useState('')

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const handleOpenEnquiry = (event: CustomEvent) => {
      const { offer, businessType } = event.detail
      setEnquiryOffer(offer)
      setEnquiryBusiness(businessType || '')
    }
    window.addEventListener('open-enquiry', handleOpenEnquiry as EventListener)
    return () => window.removeEventListener('open-enquiry', handleOpenEnquiry as EventListener)
  }, [])

  const openEnquiry = (offer: string, businessType = '') => {
    setEnquiryOffer(offer)
    setEnquiryBusiness(businessType)
  }

  const waNumber = CONTACT.whatsapp.replace(/\D/g, '')
  const selected = ''
  const whatsappHref = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi OnlineKarDo! I'm interested in ${selected || 'getting my business online'}. Please share the next steps.`)}` : '#contact'

  return (
    <>
      <Header isService={false} onEnquiry={openEnquiry} />
      <main id="top">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how" element={<HowItWorksPage />} />
          <Route path="/packs" element={<PacksPage />} />
          <Route path="/monthly" element={<MonthlyPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/web-development" element={<CategoryPage category="web-development" />} />
          <Route path="/whatsapp-commerce" element={<CategoryPage category="whatsapp-commerce" />} />
          <Route path="/local-discovery" element={<CategoryPage category="local-discovery" />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage services={services} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/fineprint" element={<FineprintPage />} />
        </Routes>
      </main>
      <Footer />
      {enquiryOffer && <EnquiryModal key={`${enquiryOffer}-${enquiryBusiness}`} offer={enquiryOffer} businessType={enquiryBusiness} onClose={() => { setEnquiryOffer(''); setEnquiryBusiness('') }} />}
      <a className="floating-contact !rounded-full !bg-[#101c29] !text-white !shadow-[0_16px_38px_rgba(29,21,50,0.28)] hover:!bg-[#087b87]" href={whatsappHref} target={waNumber ? '_blank' : undefined} rel={waNumber ? 'noreferrer' : undefined} aria-label="Contact OnlineKarDo"><ArrowUpRight size={17} /><span>Let&apos;s talk</span></a>
      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <EnquiryProvider>
          <AppContent />
        </EnquiryProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

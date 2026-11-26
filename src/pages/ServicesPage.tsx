import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'

const money = (value: number | string): string => `₹${Number(value).toLocaleString('en-IN')}`

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

const categories = ['All services', 'Website', 'Sales & ordering', 'Payments', 'Online visibility'] as const
type Category = typeof categories[number]

interface ServiceCardProps {
  service: Service
  index: number
}
function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Link to={`/services/${service.id}`} className="service-card-link">
      <button className="service-card" type="button">
        <span className="service-card-top"><span className="service-mark">{service.mark}</span><span className="service-number">{String(index + 1).padStart(2, '0')}</span></span>
        <span className="service-category">{service.category}</span>
        <strong className="service-card-title">{service.name}</strong>
        <span className="service-card-summary">{service.summary}</span>
        <span className="service-card-bottom"><b>{money(service.price)}</b><span>Explore service <ArrowUpRight size={14} /></span></span>
      </button>
    </Link>
  )
}

export default function ServicesPage() {
  const [filter, setFilter] = useState<Category>(categories[0])
  const { openEnquiry } = useEnquiry()
  const visibleServices = filter === 'All services' ? services : services.filter(service => service.category === filter)

  return (
    <div className="page-wrapper">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Build your own bundle</span>
          <h1>Just need one piece?</h1>
          <p className="hero-lede">Choose one useful upgrade at a time. Open any service to see how it can help and try a sample.</p>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="services-heading">
            <div className="services-heading-badge"><span>14</span><small>ways to<br />get started</small></div>
          </div>
          <div className="service-filter" role="group" aria-label="Filter services">
            {categories.map(category => (
              <button className={filter === category ? 'active' : ''} key={category} onClick={() => setFilter(category)}>
                {category}
              </button>
            ))}
          </div>
          <div className="service-grid">
            {visibleServices.map((service, _idx) => (
              <ServiceCard key={service.id} service={service} index={services.indexOf(service)} />
            ))}
          </div>
          <div className="service-grid-footer"><span>Simple setup. Clear scope. Made around your business.</span><span>¹ Domain and email service charges are billed by the provider.</span></div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Want a complete package?</h2>
            <p>Our bundles combine the most popular services at a better value.</p>
            <button className="button button-primary" onClick={() => openEnquiry('View setup packs')}>
              View setup packs <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
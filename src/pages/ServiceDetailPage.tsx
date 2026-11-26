import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import { SEO, ServiceSchema, BreadcrumbSchema } from '../components/SEO'

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

interface ServiceDetailPageProps {
  services: Service[]
}

const BRAND_NAMES: Record<string, string> = { razorpay: 'Razorpay', google: 'Google', instagram: 'Instagram', facebook: 'Facebook', whatsapp: 'WhatsApp' }

interface BrandLogoProps {
  brand: string
  label?: string
  inverted?: boolean
}
function BrandLogo({ brand, label, inverted = false }: BrandLogoProps) {
  const title = label || BRAND_NAMES[brand]
  return (
    <span className={`brand-lockup brand-lockup-${brand} ${inverted ? 'inverted' : ''}`} aria-label={title}>
      {brand === 'razorpay' && <svg className="brand-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.436 0 10.526 7.773l-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24ZM14.26 10.098 3.389 17.166 1.564 24h9.008l3.688-13.902Z" /></svg>}
      {brand === 'google' && <svg className="brand-logo-icon google-logo-icon" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.7-.4-4H24v7.6h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.8Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.6 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 0 17.9l6.8-5.1Z"/><path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.2C14.2 15.6 18.7 12 24 12Z"/></svg>}
      {brand === 'instagram' && <svg className="brand-logo-icon instagram-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="igLogoGradient" x1="0" x2="1" y1="1" y2="0"><stop stopColor="#feda75"/><stop offset=".45" stopColor="#d62976"/><stop offset="1" stopColor="#4f5bd5"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igLogoGradient)"/><rect x="6.5" y="6.5" width="11" height="11" rx="3.5" fill="none" stroke="white" strokeWidth="1.7"/><circle cx="12" cy="12" r="2.7" fill="none" stroke="white" strokeWidth="1.7"/><circle cx="17.5" cy="6.8" r="1" fill="white"/></svg>}
      {brand === 'facebook' && <svg className="brand-logo-icon facebook-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#0866ff"/><path fill="white" d="M13.8 22v-8.1h2.7l.4-3.2h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V4.3c-.3 0-1.2-.1-2.3-.1-2.4 0-4.1 1.5-4.1 4.3v2.2H8v3.2h2.6V22h3.2Z"/></svg>}
      {brand === 'whatsapp' && <svg className="brand-logo-icon whatsapp-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#25d366"/><path fill="white" d="M17.4 14.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.3 3.5 5.6 4.9.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/></svg>}
      <b>{title}</b>
    </span>
  )
}

// Demo components
function OnePageWebsiteDemo() {
  const [section, setSection] = useState('Home')
  const copy = ({ Home: ['A good place to begin.', 'A clear welcome, your main offer and the best way to reach you.'], About: ['Small business. Personal service.', 'Introduce your team, your story and what makes your approach yours.'], Contact: ["We're easy to find.", 'Show your location, opening hours and a simple enquiry action.'] } as Record<string, string[]>)[section]
  return (
    <div className="specific-demo website-sample">
      <div className="specific-top"><b>✳ THE LITTLE CORNER</b><span>BUSINESS WEBSITE</span></div>
      <div className="specific-tabs">{Object.keys({Home: 1, About: 1, Contact: 1}).map(tab => <button className={section === tab ? 'selected' : ''} key={tab} onClick={() => setSection(tab)}>{tab}</button>)}</div>
      <div className="website-sample-hero"><small>{section.toUpperCase()} · BENGALURU</small><h3>{copy[0]}</h3><p>{copy[1]}</p><button className="sample-action" onClick={() => setSection(section === 'Contact' ? 'Home' : 'Contact')}>Find out more <ArrowUpRight size={13} /></button></div>
      <div className="sample-footnote">One page · Sections linked from the top navigation</div>
    </div>
  )
}

function MultiPageWebsitePreview() {
  const pages = [
    { name: 'Home', eyebrow: 'GREENLEAF FAMILY CLINIC · BENGALURU', title: 'Care that listens.', body: 'Thoughtful family healthcare, built around clear conversations and care at every age.', visual: '✳', action: 'Meet the clinic' },
    { name: 'Services', eyebrow: 'HOW WE CAN HELP', title: 'The right care, close to home.', body: 'Explore everyday health services and find the right appointment for you and your family.', visual: '✚', action: 'View services' },
    { name: 'About', eyebrow: 'A LITTLE ABOUT US', title: 'A practice built on listening.', body: 'Meet the people behind your care and learn what to expect when you visit our clinic.', visual: '◌', action: 'Meet our team' },
    { name: 'Gallery', eyebrow: 'INSIDE GREENLEAF', title: 'A calm place to feel cared for.', body: 'Take a look around the clinic, find the entrance and feel familiar before your first visit.', visual: '⌂', action: 'Explore the clinic' },
    { name: 'Contact', eyebrow: 'WE\'RE HERE TO HELP', title: "Let's find a time to meet.", body: 'Check our hours, get directions and send a request for an appointment.', visual: '⌖', action: 'Request an appointment' },
  ]
  const [activeIndex, setActiveIndex] = useState(0)
  const activePage = pages[activeIndex]
  const showPage = (index: number) => setActiveIndex((index + pages.length) % pages.length)

  return (
    <div className="multi-site-preview">
      <div className="multi-site-nav"><span className="multi-site-logo"><i>G</i><b>GREENLEAF<small>FAMILY CLINIC</small></b></span><div className="multi-site-tabs">{pages.map((page, index) => <button className={index === activeIndex ? 'active' : ''} key={page.name} onClick={() => showPage(index)}>{page.name}</button>)}</div><span className="multi-site-book">Book a visit <ArrowUpRight size={12} /></span></div>
      <div className="multi-site-page" key={activePage.name}>
        <div className="multi-site-copy"><small>{activePage.eyebrow}</small><h3>{activePage.title}</h3><p>{activePage.body}</p><div className="multi-site-points"><span><Check size={12} /> Family focused</span><span><Check size={12} /> Easy to reach</span></div><button className="multi-site-action" onClick={() => showPage(activeIndex === pages.length - 1 ? 0 : activeIndex + 1)}>{activePage.action} <ArrowUpRight size={13} /></button></div>
        <div className={`multi-site-image multi-site-image-${activeIndex}`}><span>{activePage.visual}</span><small>{activePage.name.toUpperCase()} PAGE · SAMPLE</small></div>
      </div>
      <div className="multi-site-controls"><button className="page-arrow" aria-label="Previous page" onClick={() => showPage(activeIndex - 1)}><ArrowLeft size={14} /></button><div className="page-progress">{pages.map((page, index) => <button key={page.name} className={index === activeIndex ? 'active' : ''} aria-label={`Show ${page.name} page`} aria-current={index === activeIndex ? 'page' : undefined} onClick={() => showPage(index)} />)}</div><span className="page-count">Page <b>{activeIndex + 1}</b> of 5</span><button className="page-arrow" aria-label="Next page" onClick={() => showPage(activeIndex + 1)}><ArrowRight size={14} /></button></div>
    </div>
  )
}

function WhatsAppOrderingDemo() {
  const [quantities, setQuantities] = useState([0, 0, 0])
  const [notice, setNotice] = useState('')
  const products: [string, number, string][] = [['Seasonal fruit box', 420, '🥭'], ['Fresh greens bundle', 260, '🥬'], ['Farm eggs · 6 pack', 180, '🥚']]
  const total = products.reduce((sum, item, index) => sum + item[1] * quantities[index], 0)
  function change(index: number, delta: number) { setQuantities(current => current.map((value, itemIndex) => itemIndex === index ? Math.max(0, value + delta) : value)) }
  return (
    <div className="specific-demo order-sample">
      <div className="wa-order-titlebar"><BrandLogo brand="whatsapp" /><span>CATALOGUE ORDER</span></div>
      <div className="wa-order-store"><b>NILA · FRESH PICKS</b><small>A few good things, picked this morning.</small></div>
      {products.map(([name, price, emoji], index) => <div className="order-sample-row" key={name}><span className="order-emoji">{emoji}</span><span className="order-name"><b>{name}</b><small>{money(price)}</small></span><button aria-label={`Remove ${name}`} onClick={() => change(index, -1)}>−</button><b className="order-quantity">{quantities[index]}</b><button aria-label={`Add ${name}`} onClick={() => change(index, 1)}>+</button></div>)}
      <div className="sample-total"><span>Order estimate</span><b>{money(total)}</b></div>
      <button className="sample-action" onClick={() => setNotice(total ? 'Sample order ready to review. Nothing was sent.' : 'Add an item to build a sample order.')}>Review WhatsApp order <ArrowUpRight size={13} /></button>
      {notice && <div className="sample-notice">{notice}</div>}
    </div>
  )
}

function PaymentLinkDemo() {
  const [status, setStatus] = useState('')
  return (
    <div className="specific-demo payment-sample">
      <div className="razorpay-brandbar"><BrandLogo brand="razorpay" /><span>PAYMENT LINKS</span></div>
      <div className="payment-request-label">PAYMENT REQUEST · SAMPLE</div>
      <div className="payment-amount">₹1,250</div>
      <p className="payment-for">Booking advance · The Sugar Window</p>
      <div className="payment-line"><span>Request ID</span><b>DEMO-2048</b></div>
      <div className="payment-line"><span>Merchant</span><b>Example business</b></div>
      <button className="sample-action" onClick={() => setStatus('Payment demo only — no payment was collected.')}>{status ? 'Demo viewed' : 'Continue to sample payment'} <ArrowUpRight size={13} /></button>
      {status && <div className="sample-notice">{status}</div>}
      <small className="sample-legal">A live link requires an approved merchant account.</small>
    </div>
  )
}

function PaymentCatalogueDemo() {
  const [cart, setCart] = useState<number[]>([])
  const [notice, setNotice] = useState('')
  const products: [string, number][] = [['Linen tote', 499], ['Everyday kurta', 899], ['Gift set', 1150]]
  const total = cart.reduce((sum, index) => sum + products[index][1], 0)
  return (
    <div className="specific-demo payment-catalogue-sample">
      <div className="razorpay-brandbar"><BrandLogo brand="razorpay" /><span>PAYMENT CATALOGUE</span></div>
      <div className="catalogue-storehead"><b>THREAD & THIMBLE</b><small>SHOP · SAMPLE</small></div>
      <p className="sample-intro">Browse a product, build a cart, review the total.</p>
      <div className="catalogue-product-grid">{products.map(([name, price], index) => <button className={cart.includes(index) ? 'chosen' : ''} key={name} onClick={() => setCart(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index])}><span>{['👜', '👕', '🎁'][index]}</span><b>{name}</b><small>{money(price)} · {cart.includes(index) ? 'Added' : 'Add to cart +'}</small></button>)}</div>
      <div className="sample-total"><span>Sample cart · {cart.length} items</span><b>{money(total)}</b></div>
      <button className="sample-action" onClick={() => setNotice('Sample checkout only. Your merchant account determines available payment options.')}>Review checkout options <ArrowUpRight size={13} /></button>
      {notice && <div className="sample-notice">{notice}</div>}
    </div>
  )
}

function ProductCatalogueDemo() {
  const [category, setCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState('')
  const products = [{name:'Ceramic cup',type:'Home',price:650,icon:'☕'},{name:'Cotton tote',type:'Accessories',price:480,icon:'👜'},{name:'Linen shirt',type:'Clothing',price:1290,icon:'👕'},{name:'Gift set',type:'Home',price:1150,icon:'🎁'}]
  const visible = category === 'All' ? products : products.filter(item => item.type === category)
  return (
    <div className="specific-demo products-sample">
      <div className="specific-top"><b>SMALL BATCH STUDIO</b><span>4 ITEMS · CATALOGUE</span></div>
      <div className="specific-tabs">{['All','Home','Accessories','Clothing'].map(tab => <button className={category === tab ? 'selected' : ''} key={tab} onClick={() => setCategory(tab)}>{tab}</button>)}</div>
      <div className="catalogue-list">{visible.map(item => <button key={item.name} onClick={() => setSelectedItem(item.name)}><span>{item.icon}</span><b>{item.name}</b><small>{money(item.price)}</small><ArrowUpRight size={12} /></button>)}</div>
      {selectedItem && <div className="sample-notice">{selectedItem} selected for a sample enquiry.</div>}
      <div className="sample-footnote">A browsable catalogue, ready to share as one link.</div>
    </div>
  )
}

function DigitalMenuDemo() {
  const [category, setCategory] = useState('Mains')
  const menu: Record<string, [string, string][]> = { Mains: [['Garden bowl','₹280'],['Roasted paneer plate','₹340'],['Lemon rice & greens','₹260']], Drinks: [['Cold brew','₹180'],['Nimbu soda','₹120'],['Masala chai','₹90']], Desserts: [['Seasonal tart','₹190'],['Chocolate cake','₹210'],['Mango shrikhand','₹160']] }
  return (
    <div className="specific-demo menu-sample">
      <div className="menu-sample-cover"><small>GOOD FOOD, GOOD MOOD</small><b>THE GARDEN TABLE</b><span>MENU · BENGALURU</span></div>
      <div className="specific-tabs">{Object.keys(menu).map(tab => <button className={category === tab ? 'selected' : ''} key={tab} onClick={() => setCategory(tab)}>{tab}</button>)}</div>
      {menu[category].map(([name, price]) => <div className="menu-sample-row" key={name}><b>{name}</b><span>{price}</span></div>)}
      <div className="sample-footnote">A QR code can open this menu on a customer's phone.</div>
    </div>
  )
}

function GoogleBusinessDemo() {
  const [active, setActive] = useState('Overview')
  const details: Record<string, string> = { Overview: 'Fresh breads, pastries and coffee made every morning.', Hours: 'Today · 8:00 am–8:00 pm\nMon–Sat · 8:00 am–8:00 pm', Contact: 'Indiranagar, Bengaluru\nCall · Directions · Website' }
  return (
    <div className="specific-demo google-sample">
      <div className="google-product-bar"><BrandLogo brand="google" label="Google" /><span>BUSINESS PROFILE · SAMPLE</span></div>
      <div className="google-sample-search"><span className="google-search-icon">⌕</span><span>bakery near me</span><small>⌕</small></div>
      <div className="google-business-card"><div className="google-cover">🥐 <span>LOCAL PLACE · SAMPLE</span></div><h3>The Daily Loaf</h3><small>Bakery · Bengaluru · Open now</small><div className="google-rating">SAMPLE PREVIEW <span>★</span></div><div className="specific-tabs">{Object.keys(details).map(tab => <button className={active === tab ? 'selected' : ''} key={tab} onClick={() => setActive(tab)}>{tab}</button>)}</div><p className="google-details">{details[active]}</p><div className="google-quicklinks"><span>⌖ Directions</span><span>☎ Call</span><span>↗ Website</span></div></div>
      <div className="sample-footnote">Example listing; no live Google profile is connected.</div>
    </div>
  )
}

function InstagramSetupDemo() {
  const [tab, setTab] = useState('Posts')
  return (
    <div className="specific-demo instagram-sample">
      <div className="instagram-brandbar"><BrandLogo brand="instagram" /><span>⌕</span><span>♡</span></div>
      <div className="social-profile-sample"><div className="insta-avatar">TT</div><div><b>threadandthimble</b><small>Business profile · Sample</small></div><button onClick={() => setTab('Contact')}>Follow</button></div>
      <div className="insta-bio">Thoughtful everyday wear<br />Made in Bengaluru · New pieces weekly<br /><a>threadandthimble.example</a></div>
      <div className="specific-tabs">{['Posts','About','Contact'].map(item => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === 'Posts' ? <div className="insta-grid"><span>✳<small>NEW ARRIVALS</small></span><span>◒<small>MADE SLOWLY</small></span><span>☼<small>THE EVERYDAY EDIT</small></span></div> : <div className="social-tab-content"><b>{tab === 'About' ? 'Clothing & accessories' : 'Get in touch'}</b><small>{tab === 'About' ? 'Small batches, considered details.' : 'WhatsApp · Email · Store location'}</small></div>}
      <div className="sample-footnote">Sample profile with contact and shop links.</div>
    </div>
  )
}

function FacebookPageDemo() {
  const [tab, setTab] = useState('Posts')
  return (
    <div className="specific-demo facebook-sample">
      <div className="facebook-brandbar"><BrandLogo brand="facebook" label="facebook" /><span>☰</span></div>
      <div className="facebook-cover"><span>✿</span><small>LITTLE LEAF NURSERY · SAMPLE PAGE</small></div>
      <div className="facebook-page-title"><b>Little Leaf Nursery</b><span>Plants for city homes</span></div>
      <div className="facebook-action-row"><button onClick={() => setTab('Contact')}>Message</button><button onClick={() => setTab('About')}>View details</button></div>
      <div className="specific-tabs">{['Posts','About','Contact'].map(item => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
      <div className="facebook-post"><small>{tab.toUpperCase()} · SAMPLE</small><b>{tab === 'Posts' ? 'A new batch of easy-care plants is here.' : tab === 'About' ? 'Plants, pots and growing advice.' : 'Visit us · 10 am–7 pm · Bengaluru'}</b><p>Clear business information helps visitors know what to expect.</p></div>
    </div>
  )
}

function WhatsAppProfileDemo() {
  const [message, setMessage] = useState('')
  return (
    <div className="specific-demo wa-profile-sample">
      <div className="wa-profile-header"><BrandLogo brand="whatsapp" label="WhatsApp Business" inverted /><span>⋮</span></div>
      <div className="wa-business-profile"><div className="wa-business-avatar">S</div><h3>Saffron & Stone</h3><small>Home-style meals · Bengaluru</small><span className="wa-hours">Open · Closes 8:00 pm</span><div className="wa-profile-buttons"><button onClick={() => setMessage('Sample call action selected')}>Call</button><button onClick={() => setMessage('Sample catalogue opened')}>Catalogue</button></div></div>
      <div className="wa-quick-messages"><small>START A CONVERSATION</small>{["Can I see today's menu?",'What are your pickup hours?','Do you deliver nearby?'].map(item => <button key={item} onClick={() => setMessage(item)}>{item}<ArrowUpRight size={12} /></button>)}</div>
      {message && <div className="sample-notice">Sample selection: "{message}" — not sent.</div>}
    </div>
  )
}

function LinkInBioDemo() {
  const [selected, setSelected] = useState('')
  const items = [['View my portfolio','Selected work and recent projects'],['Book a session','Availability and booking enquiry'],['Print shop','Browse available prints'],['Say hello','Contact Ananya directly']]
  return (
    <div className="specific-demo bio-sample">
      <div className="bio-sample-avatar">AK</div>
      <h3>Ananya Kapoor</h3>
      <p>Photographer & visual storyteller</p>
      <div className="bio-link-list">{items.map(([title, description]) => <button key={title} onClick={() => setSelected(title)}><span><b>{title}</b><small>{description}</small></span><ArrowUpRight size={14} /></button>)}</div>
      {selected && <div className="sample-notice">"{selected}" selected. Your link would open here.</div>}
      <small className="sample-footnote">One profile link. Four helpful destinations.</small>
    </div>
  )
}

function DomainEmailDemo() {
  const [active, setActive] = useState('Website')
  return (
    <div className="specific-demo domain-sample">
      <div className="specific-top"><b>YOUR BUSINESS IDENTITY</b><span>SETUP PREVIEW</span></div>
      <p className="sample-intro">A domain and email that match your business name.</p>
      <div className="identity-switch"><button className={active === 'Website' ? 'selected' : ''} onClick={() => setActive('Website')}>Website</button><button className={active === 'Email' ? 'selected' : ''} onClick={() => setActive('Email')}>Business email</button></div>
      <div className="identity-card"><span className="identity-icon">{active === 'Website' ? '↗' : '@'}</span><small>{active === 'Website' ? 'YOUR DOMAIN' : 'YOUR BUSINESS EMAIL'}</small><b>{active === 'Website' ? 'www.yourbusiness.in' : 'hello@yourbusiness.in'}</b><span>{active === 'Website' ? 'Registered in your business name' : 'Connected to your chosen mailbox provider'}</span></div>
      <div className="sample-notice">Example only. Domain availability and provider charges are separate.</div>
    </div>
  )
}

function BasicSeoDemo() {
  const [tab, setTab] = useState('Search result')
  return (
    <div className="specific-demo seo-sample">
      <div className="specific-top"><b>SEARCH PRESENCE</b><span>BASIC SEO PREVIEW</span></div>
      <div className="specific-tabs">{['Search result','Page details'].map(item => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === 'Search result' ? <div className="seo-result"><small>yourbusiness.in › bengaluru</small><b>Everyday Care Clinic | Family Doctor in Bengaluru</b><span>Clear information about clinic services, hours and location. Request an appointment online.</span></div> : <div className="seo-checklist">{[['✓','Page title describes the business'],['✓','Search description explains the page'],['✓','Headings organize key information']].map(([mark, text]) => <div key={text}><span>{mark}</span>{text}</div>)}</div>}
      <div className="sample-footnote">SEO setup helps search tools understand a page; it cannot guarantee rankings.</div>
    </div>
  )
}

const serviceDemos: Record<string, React.ComponentType<{ service: Service }>> = {
  'one-page-business-website': OnePageWebsiteDemo,
  '3-5-page-business-website': MultiPageWebsitePreview,
  'whatsapp-ordering-catalogue': WhatsAppOrderingDemo,
  'razorpay-payment-page-or-link': PaymentLinkDemo,
  'razorpay-supported-payment-catalogue': PaymentCatalogueDemo,
  'digital-product-catalogue': ProductCatalogueDemo,
  'digital-menu-with-qr-code': DigitalMenuDemo,
  'google-business-profile-setup': GoogleBusinessDemo,
  'instagram-business-setup': InstagramSetupDemo,
  'facebook-business-page-setup': FacebookPageDemo,
  'whatsapp-business-profile-setup': WhatsAppProfileDemo,
  'link-in-bio-business-page': LinkInBioDemo,
  'domain-and-business-email-setup': DomainEmailDemo,
  'basic-seo-setup': BasicSeoDemo,
}

function ServiceImpact({ service }: { service: Service }) {
  return (
    <section className="service-impact-section"><div className="container"><div className="impact-heading"><span className="eyebrow">Why this service matters</span><h2>Make the next customer step easier.</h2><p>Good digital setup connects what you offer with what a customer needs to know or do.</p></div>
      <div className="impact-grid"><article className="impact-card impact-primary"><span className="impact-index">01 / THE IMPACT</span><div className="impact-symbol">↗</div><h3>What it can change</h3><p>{service.impact}</p></article><article className="impact-card"><span className="impact-index">02 / WHY IT HELPS</span><div className="impact-symbol">✳</div><h3>Why it's useful</h3><p>{service.why}</p></article><article className="impact-card"><span className="impact-index">03 / A GOOD FIT FOR</span><div className="impact-symbol">◎</div><h3>Businesses like yours</h3><p>{service.bestFor}</p></article></div>
    </div></section>
  )
}

function ServiceDemo({ service }: { service: Service }) {
  const DemoComponent = serviceDemos[service.id]
  const isPayment = service.category === 'Payments'
  return (
    <section className="detail-demo-section" aria-labelledby="demo-heading">
      <div className="detail-demo-copy"><span className="eyebrow">A small preview</span><h2 id="demo-heading">See how it could work.</h2><p>This is a sample interaction to help you picture the customer experience. Names and details are illustrative.</p><div className="demo-disclaimer"><Check size={16} /><span>{isPayment ? 'Demo only. No payment is collected.' : 'Sample content only. Your business details replace these.'}</span></div></div>
      <div className={`demo-stage ${service.brand ? `brand-demo-${service.brand}` : ''}`}><div className="demo-toolbar"><span><i /><i /><i /></span><b>ONLINEKARDO · SAMPLE PREVIEW</b><span className="demo-label">NOT LIVE</span></div>
        <div className="specific-demo-wrapper"><DemoComponent service={service} /></div><div className="demo-stage-caption"><span>✳</span> {service.brand ? `Independent ${BRAND_NAMES[service.brand]} visual sample · no affiliation or live account connection` : isPayment ? 'Sample only · No real payment or merchant account is connected' : 'Illustrative demo · No real orders or messages are sent'}</div>
      </div>
    </section>
  )
}

export default function ServiceDetailPage({ services }: ServiceDetailPageProps) {
  const { id } = useParams<{ id: string }>()
  const { openEnquiry } = useEnquiry()
  const service = services.find(s => s.id === id)

  useEffect(() => {
    if (service) {
      document.title = `${service.name} for Small Businesses | OnlineKarDo`
    }
  }, [service])

  if (!service) {
    return <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}><h2>Service not found</h2><Link to="/services" className="button button-primary"><ArrowLeft size={15} /> Back to services</Link></div>
  }

  const backToServices = () => window.history.back()
  const serviceUrl = `https://onlinekardo.com/services/${service.id}`

  return (
    <main className="service-detail-page" id="top">
      <SEO
        title={`${service.name} for Small Businesses | OnlineKarDo`}
        description={service.summary}
        canonical={`/services/${service.id}`}
        structuredData={{
          '@type': 'Service',
          name: service.name,
          description: service.summary,
          provider: {
            '@type': 'Organization',
            name: 'OnlineKarDo',
            url: 'https://onlinekardo.com',
          },
          offers: {
            '@type': 'Offer',
            name: service.name,
            description: service.summary,
            price: service.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: serviceUrl,
          },
          category: service.category,
          url: serviceUrl,
        }}
      />
      <ServiceSchema
        name={service.name}
        description={service.summary}
        price={service.price}
        category={service.category}
        url={serviceUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://onlinekardo.com' },
          { name: 'Services', url: 'https://onlinekardo.com/services' },
          { name: service.name, url: serviceUrl },
        ]}
      />
      <section className="service-detail-hero"><div className="container"><button className="detail-back" onClick={backToServices}><ArrowLeft size={15} /> Back to all services</button><div className="detail-hero-grid"><div className="detail-hero-copy"><span className="eyebrow">{service.category} · Individual setup</span><h1>{service.name}</h1><p className="detail-summary">{service.summary}</p><div className="detail-price-line"><strong>{money(service.price)}</strong><span>one-time setup fee</span></div><button className="button button-primary" onClick={() => openEnquiry(service.name)}>Ask about this service <ArrowUpRight size={15} /></button><small className="detail-fee-note">Third-party subscriptions, fees and approvals are separate where applicable.</small></div><div className={`detail-hero-card ${service.brand ? `detail-brand-${service.brand}` : ''}`}><span className="detail-card-kicker">WHAT YOU'RE SETTING UP</span>{service.brand ? <div className="detail-brand-lockup"><BrandLogo brand={service.brand} /></div> : <div className="detail-card-mark">{service.mark}</div>}<h2>{service.name}</h2><p>{service.bestFor}</p><div className="detail-card-foot"><Check size={15} /> Template-led · Clear scope</div></div></div></div></section>
      <ServiceImpact service={service} />
      <ServiceDemo service={service} />
      <section className="detail-steps-section"><div className="container detail-steps-layout"><div><span className="eyebrow">From setup to useful</span><h2>Designed around your customer&apos;s next step.</h2><p>We&apos;ll tailor the sample to your business details, review it with you and make one consolidated revision before handover.</p></div><div className="detail-steps-list"><div><span>01</span><b>Share the essentials</b><small>Your brand, contact details, products or services.</small></div><div><span>02</span><b>We shape the setup</b><small>We adapt the selected template to your workflow.</small></div><div><span>03</span><b>Review and launch</b><small>Confirm details, then share the finished setup.</small></div></div></div></section>
      <section className="detail-bottom-cta"><div className="container detail-bottom-content"><div><span className="eyebrow eyebrow-light">A useful next step</span><h2>Make {service.name.toLowerCase()} work for your business.</h2><p>Ask us what details we need and how this setup could fit your customers.</p></div><button className="button button-white" onClick={() => openEnquiry(service.name)}>Start with this service <ArrowUpRight size={15} /></button></div></section>
    </main>
  )
}
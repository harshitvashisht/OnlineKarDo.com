import { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, Menu, X } from 'lucide-react'
import { formspreeEndpoint } from './config'

// Add the business WhatsApp number in international format and a contact email here.
const CONTACT = { whatsapp: '', email: '' }
const BRAND_NAMES = { razorpay: 'Razorpay', google: 'Google', instagram: 'Instagram', facebook: 'Facebook', whatsapp: 'WhatsApp' }
const money = value => `₹${Number(value).toLocaleString('en-IN')}`

const steps = [
  ['↗', 'Pick your setup', 'Choose the pack that fits what your business needs right now.'],
  ['▤', 'Share your details', 'One onboarding form gathers your logo, photos, prices and contact info.'],
  ['✳', 'We build it', 'We adapt a proven template and set up the pieces in your pack.'],
  ['✓', 'Review and launch', 'Approve one consolidated revision, then share your new online home.'],
]

const packs = [
  { label: 'THE ESSENTIALS', icon: '◌', name: 'Starter Digital Pack', description: 'A clean first step for getting found and contacted online.', price: 2999, includes: ['One-page template website', 'WhatsApp enquiry button', 'Google Maps and contact details', 'Social links', 'One revision round'], delivery: '24–48 hours*', button: 'Choose Starter' },
  { label: 'THE BUSINESS BASICS', icon: '✳', name: 'Business Digital Pack', description: 'A more complete digital presence for a growing local business.', price: 4999, includes: ['Up to 5 website pages', 'WhatsApp Business profile setup', 'Google Business Profile setup help', 'Instagram and Facebook pages', 'Basic SEO + one revision round'], delivery: 'about 48 hours*', button: 'Choose Business', featured: true },
  { label: 'THE SELLER TOOLKIT', icon: '▧', name: 'Seller Digital Pack', description: 'A simple catalogue that helps customers browse and enquire.', price: 6999, includes: ['Template catalogue, up to 20 products', 'WhatsApp ordering buttons', 'Payment links or supported checkout', 'Instagram and Facebook pages', 'Shareable catalogue QR code'], delivery: '48–72 hours*', button: 'Choose Seller' },
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
  ['Photographer', '📷', 'services', 'Portfolio & bookings'], ['Florist', '🌷', 'retail', 'Bouquets & custom orders'],
]

const services = [
  { id: 'one-page-business-website', name: 'One-page business website', price: 2999, category: 'Website', mark: '↗', summary: 'Give your business one clear, professional home on the web.', impact: 'A focused page helps a new customer understand what you offer, where you are and how to take the next step without searching through scattered posts.', why: 'People often check a business online before calling or visiting. A useful one-page site puts your key details, photos and enquiry link together in one place you control.', bestFor: 'New businesses, solo professionals and local shops that need a simple first website.', demo: { heading: 'Good things, made daily.', subheading: 'A neighbourhood bakery for the everyday treat.', items: ['Fresh bakes, made this morning', 'Find us in Indiranagar, Bengaluru', 'Ask about today’s specials'], action: 'Send an enquiry' } },
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

const monthlyPlans = [
  ['Basic Care', 499, 'Uptime checks, backups and one minor content update.'],
  ['Social Lite', 999, 'Four template-based social posts each month.'],
  ['Social Growth', 1999, 'Eight posts, captions and scheduling.'],
  ['Digital Care Plus', 2999, 'Eight posts, website care and up to two minor updates.'],
]

const phonePreviews = [
  { title: 'Product catalogue', caption: 'Browse products with ease', type: 'catalogue' },
  { title: 'WhatsApp ordering', caption: 'Start a ready-to-send order', type: 'orders' },
  { title: 'Payment page', caption: 'Payment setup, where supported', type: 'payment' },
  { title: 'Social business page', caption: 'A consistent online identity', type: 'social' },
  { title: 'Digital menu + QR', caption: 'Ready to share at the counter', type: 'menu' },
  { title: 'One-page website', caption: 'A clear introduction to your work', type: 'website' },
  { title: 'Local search listing', caption: 'Key details in one place', type: 'search' },
  { title: 'Link-in-bio page', caption: 'Turn one link into many paths', type: 'bio' },
]

function Header({ isService, onSection, onEnquiry }) {
  const [open, setOpen] = useState(false)
  const links = [['How it works', '#how'], ['Packs', '#packs'], ['Examples', '#examples'], ['Monthly plans', '#monthly']]
  const handleSection = id => event => {
    setOpen(false)
    if (isService) {
      event.preventDefault()
      onSection(id)
    }
  }
  return <header className="site-header"><div className="container nav-wrap">
    <a className="brand" href={isService ? '/' : '#top'} onClick={isService ? event => { event.preventDefault(); onSection('top') } : undefined} aria-label="OnlineKarDo home"><img src="/assets/onlinekardo-logo.jpeg" alt="OnlineKarDo — Get Your Business Online" /></a>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
    <nav id="main-nav" className={`main-nav ${open ? 'open' : ''}`} aria-label="Main navigation">
      {links.map(([label, href]) => <a key={href} href={href} onClick={handleSection(href.slice(1))}>{label}</a>)}
      <button className="button button-small button-dark nav-cta" type="button" onClick={() => { setOpen(false); onEnquiry('General enquiry') }}>Get started <ArrowUpRight size={15} /></button>
    </nav>
  </div></header>
}

function Hero() {
  return <section className="hero"><div className="container hero-layout">
    <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" />Your digital setup partner</div>
      <h1>Your business online<br /><span>in about 48 hours.</span></h1>
      <p className="hero-lede">A website, WhatsApp ordering and the essentials to help customers find you. Choose a fixed-price setup and we’ll take care of the tech.</p>
      <div className="hero-actions"><a className="button button-primary" href="#packs">Explore packs <ArrowDown size={16} /></a><a className="text-link" href="#examples">See what’s possible <ArrowUpRight size={15} /></a></div>
      <p className="delivery-note"><Check className="check" size={14} /> Starting at <strong>₹2,999</strong> <span className="note-divider">·</span> Delivery target starts after we have your complete details and approvals.</p>
      <div className="hero-proof"><div className="proof-icon">01</div><div><strong>Simple, fixed scope</strong><span>Know what’s included before we begin.</span></div><div className="proof-icon proof-icon-orange">02</div><div><strong>Made for local business</strong><span>Clear on a phone. Easy to share.</span></div></div>
    </div>
    <div className="hero-visual" aria-label="A preview of a small business mobile website">
      <div className="hero-spark spark-one">✳</div><div className="hero-spark spark-two">✳</div>
      <div className="shop-window"><div className="shop-top"><span className="shop-avatar">M</span><span className="shop-brand"><b>MOON &amp; MINT</b><small>MADE WITH CARE · IN BENGALURU</small></span><span className="shop-dots">···</span></div>
        <div className="shop-banner"><span>SMALL-BATCH<br />GOOD THINGS</span><i>✿</i></div>
        <div className="shop-intro"><span className="mini-label">A LITTLE SHOP, A LOT TO LOVE</span><h3>Find your<br />everyday favourite.</h3><p>Thoughtful finds for home, gifting and slow days.</p><span className="shop-pill">Browse the collection <b>↗</b></span></div>
        <div className="shop-products"><div className="product-tile product-peach"><span>✿</span><small>THE SUNDAY BUNDLE</small><b>₹ 680</b></div><div className="product-tile product-green"><span>◒</span><small>THE LITTLE VASE</small><b>₹ 420</b></div></div>
        <div className="shop-whatsapp"><span>◉</span> Ask us on WhatsApp</div>
      </div><div className="float-card"><span className="float-check">✓</span><span><b>Ready to share</b><small>Your online storefront, sorted.</small></span></div><div className="visual-caption">A sample storefront for an independent business</div>
    </div>
  </div></section>
}

function HowItWorks() {
  return <section className="how-section" id="how"><div className="container">
    <div className="section-heading centered"><span className="eyebrow">A smoother way to get online</span><h2>Four steps. No tech headache.</h2><p>You bring the business details. We bring the setup, structure and launch support.</p></div>
    <div className="steps-grid">{steps.map(([icon, title, copy], index) => <article className="step-card" key={title}><span className="step-count">0{index + 1}</span><div className="step-icon">{icon}</div><h3>{title}</h3><p>{copy}</p></article>)}</div>
    <div className="process-foot"><span className="process-line" /><span>We begin when your onboarding form is complete.</span><span className="process-line" /></div>
  </div></section>
}

function Packs({ onChoose }) {
  return <section className="packs-section" id="packs"><div className="container">
    <div className="section-heading section-heading-row"><div><span className="eyebrow">One-time setup</span><h2>Pick your starting point.</h2></div><p>Clear scope and upfront pricing, so you can choose with confidence.</p></div>
    <div className="pack-grid">{packs.map(pack => <article className={`pack-card ${pack.featured ? 'pack-featured' : ''}`} key={pack.name}>
      {pack.featured && <div className="featured-tag">MOST POPULAR</div>}<div className="pack-top"><span className="pack-label">{pack.label}</span><span className="pack-emoji">{pack.icon}</span></div>
      <h3>{pack.name}</h3><p className="pack-desc">{pack.description}</p><div className="pack-price">{money(pack.price)} <small>one time</small></div>
      <ul>{pack.includes.map(item => <li key={item}>{item}</li>)}</ul><div className="pack-delivery"><Clock3 size={14} /> Target: {pack.delivery}</div>
      <button className={`button ${pack.featured ? 'button-primary' : 'button-outline'} pack-action`} type="button" onClick={() => onChoose(pack.name)}>{pack.button}<ArrowUpRight size={15} /></button>
    </article>)}</div>
    <p className="pricing-footnote">*Delivery targets begin after complete business details and required account approvals. Third-party verification can take longer. Domain, hosting, gateway and other third-party fees are billed separately.</p>
  </div></section>
}

function PhonePreview({ type }) {
  if (type === 'catalogue') return <><div className="phone-brand"><span>THE DAILY LOAF</span><b>☰</b></div><div className="phone-hero-block"><small>FRESH FROM OUR OVEN</small><b>A little something<br />for your table.</b></div><div className="phone-row"><span>Today’s favourites</span><b>View all ↗</b></div><div className="phone-foods"><i>🥐</i><i>🍞</i><i>🥧</i></div><div className="phone-button">Browse the menu</div></>
  if (type === 'orders') return <><div className="phone-brand"><span>Order from NILA</span><b>···</b></div><div className="order-welcome"><small>HELLO, NEIGHBOUR 👋</small><b>What can we<br />get started for you?</b></div><div className="order-item"><i>🥬</i><span><b>Fresh greens box</b><small>Picked this morning</small></span><b>₹240</b></div><div className="order-item"><i>🥭</i><span><b>Seasonal fruit bag</b><small>About 2 kg</small></span><b>₹320</b></div><div className="phone-button whatsapp-button">◉ Send order on WhatsApp</div></>
  if (type === 'payment') return <><div className="phone-brand"><span>YOUR PAYMENT</span><b>•••</b></div><div className="payment-mark">₹</div><small className="payment-caption">PAYMENT REQUEST</small><b className="payment-total">₹1,250</b><span className="payment-caption">Advance for your custom order</span><div className="payment-detail"><span>Order</span><b>Custom celebration cake</b></div><div className="payment-detail"><span>From</span><b>The Sugar Window</b></div><div className="phone-button">Continue to payment</div><small className="payment-safe">Secure payment options depend on your account.</small></>
  if (type === 'social') return <><div className="social-top">◉ &nbsp;THREAD &amp; THIMBLE <b>＋</b></div><div className="social-profile"><i>TT</i><span><b>threadandthimble</b><small>Thoughtful everyday wear<br />Made in Bengaluru</small></span></div><div className="social-stats"><span><b>New</b><small>arrivals</small></span><span><b>Made</b><small>with care</small></span><span><b>Shop</b><small>local</small></span></div><div className="social-image">✺<small>THE EVERYDAY EDIT</small></div><div className="social-copy">Easy pieces, made for all your days. Drop us a message to find your fit.</div></>
  if (type === 'menu') return <><div className="menu-cover"><small>GOOD FOOD, GOOD MOOD</small><b>THE<br />GARDEN<br />TABLE</b><i>✿</i></div>{['Small plates', 'From the garden', 'Something sweet'].map((item, i) => <div className="menu-row" key={item}><span>{item}</span><b>0{i + 3}</b></div>)}<div className="qr-row"><span className="qr-mini">▦</span><span>Scan to browse<br /><b>Menu &amp; ordering</b></span></div></>
  if (type === 'website') return <><div className="website-top"><b>STUDIO<br />FORME</b><span>MENU<br />☰</span></div><div className="website-image">FORM<br />MEETS<br />FUNCTION</div><div className="website-note"><small>INTERIOR DESIGN · BENGALURU</small><b>Spaces that feel<br />like you.</b><span>Our approach ↗</span></div><div className="website-footer">01 &nbsp; PROJECTS &nbsp;&nbsp; ABOUT</div></>
  if (type === 'search') return <><div className="search-head">◉ &nbsp; Search nearby</div><div className="search-bar">⌕ &nbsp; baker near me</div><div className="listing"><div className="listing-photo">🥖</div><div><b>The Daily Loaf</b><div className="stars">★★★★★</div><small>Bakery · Open until 8 pm</small><small>Fresh bakes, made daily</small></div></div><div className="listing-actions"><span>☎ Call</span><span>↗ Directions</span><span>◎ Website</span></div><div className="map-squiggle">⌖<small>Easy to find.<br />Easy to reach.</small></div></>
  return <><div className="bio-avatar">AK</div><h4>ANANYA KAPOOR</h4><small>Photographer &amp; visual storyteller</small>{['View my portfolio', 'Book a session', 'Print shop', 'Say hello on WhatsApp'].map((item, i) => <div className={`bio-link ${i === 3 ? 'bio-accent' : ''}`} key={item}>{item}<b>↗</b></div>)}<div className="bio-bottom">Made with care ✳</div></>
}

function Examples({ onBusiness }) {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? businesses : businesses.filter(item => item[2] === filter)
  const filters = [['all', 'All businesses'], ['food', 'Food & drink'], ['retail', 'Shops & makers'], ['services', 'Services'], ['community', 'Learning & stays']]
  return <section className="showcase-section" id="examples"><div className="container">
    <div className="section-heading section-heading-row showcase-heading"><div><span className="eyebrow">Picture your business here</span><h2>Small screen. Big first impression.</h2></div><p>Practical, phone-first pages designed around how customers actually browse, ask and order.</p></div>
    <div className="preview-grid">{phonePreviews.map((preview, index) => <article className="preview-card" key={preview.type}>
      <div className={`phone phone-${preview.type}`}><div className="phone-notch" /><div className="phone-screen"><PhonePreview type={preview.type} /></div></div>
      <div className="preview-caption"><span>0{index + 1}</span><div><b>{preview.title}</b><small>{preview.caption}</small></div></div>
    </article>)}</div>
    <div className="business-browser"><div className="business-head"><div><span className="eyebrow">Made for your kind of business</span><h3>What does your business do?</h3></div><div className="business-count"><b>{filtered.length}</b><span>business types</span></div></div>
      <div className="filter-row" role="group" aria-label="Filter businesses">{filters.map(([key, label]) => <button className={`filter-chip ${filter === key ? 'active' : ''}`} key={key} onClick={() => setFilter(key)}>{label}</button>)}</div>
      <div className="business-grid">{filtered.map(([name, icon, , fit]) => <button className="business-card" type="button" key={name} onClick={() => onBusiness(name)}><span className="business-emoji" aria-hidden="true">{icon}</span><b>{name}</b><small>{fit}</small></button>)}</div>
      <p className="business-note">Each setup is adapted to your details, audience and the tools your business already uses.</p>
    </div>
  </div></section>
}

function ServiceCard({ service, index, onOpen }) {
  return <button className="service-card" type="button" onClick={() => onOpen(service)}>
    <span className="service-card-top"><span className="service-mark">{service.mark}</span><span className="service-number">{String(index + 1).padStart(2, '0')}</span></span>
    <span className="service-category">{service.category}</span>
    <strong className="service-card-title">{service.name}</strong>
    <span className="service-card-summary">{service.summary}</span>
    <span className="service-card-bottom"><b>{money(service.price)}</b><span>Explore service <ArrowUpRight size={14} /></span></span>
  </button>
}

function Services({ onOpen }) {
  const [filter, setFilter] = useState('All services')
  const categories = ['All services', 'Website', 'Sales & ordering', 'Payments', 'Online visibility']
  const visibleServices = filter === 'All services' ? services : services.filter(service => service.category === filter)
  return <section className="services-section" id="services"><div className="container">
    <div className="services-heading"><div><span className="eyebrow">Build your own bundle</span><h2>Just need one piece?</h2><p>Choose one useful upgrade at a time. Open any service to see how it can help and try a sample.</p></div><div className="services-heading-badge"><span>14</span><small>ways to<br />get started</small></div></div>
    <div className="service-filter" role="group" aria-label="Filter services">{categories.map(category => <button className={filter === category ? 'active' : ''} key={category} onClick={() => setFilter(category)}>{category}</button>)}</div>
    <div className="service-grid">{visibleServices.map(service => <ServiceCard key={service.id} service={service} index={services.indexOf(service)} onOpen={onOpen} />)}</div>
    <div className="service-grid-footer"><span>Simple setup. Clear scope. Made around your business.</span><span>¹ Domain and email service charges are billed by the provider.</span></div>
  </div></section>
}

function MultiPageWebsitePreview() {
  const pages = [
    { name: 'Home', eyebrow: 'GREENLEAF FAMILY CLINIC · BENGALURU', title: 'Care that listens.', body: 'Thoughtful family healthcare, built around clear conversations and care at every age.', visual: '✳', action: 'Meet the clinic' },
    { name: 'Services', eyebrow: 'HOW WE CAN HELP', title: 'The right care, close to home.', body: 'Explore everyday health services and find the right appointment for you and your family.', visual: '✚', action: 'View services' },
    { name: 'About', eyebrow: 'A LITTLE ABOUT US', title: 'A practice built on listening.', body: 'Meet the people behind your care and learn what to expect when you visit our clinic.', visual: '◌', action: 'Meet our team' },
    { name: 'Gallery', eyebrow: 'INSIDE GREENLEAF', title: 'A calm place to feel cared for.', body: 'Take a look around the clinic, find the entrance and feel familiar before your first visit.', visual: '⌂', action: 'Explore the clinic' },
    { name: 'Contact', eyebrow: 'WE’RE HERE TO HELP', title: 'Let’s find a time to meet.', body: 'Check our hours, get directions and send a request for an appointment.', visual: '⌖', action: 'Request an appointment' },
  ]
  const [activeIndex, setActiveIndex] = useState(0)
  const activePage = pages[activeIndex]
  const showPage = index => setActiveIndex((index + pages.length) % pages.length)

  return <div className="multi-site-preview">
    <div className="multi-site-nav"><span className="multi-site-logo"><i>G</i><b>GREENLEAF<small>FAMILY CLINIC</small></b></span><div className="multi-site-tabs">{pages.map((page, index) => <button className={index === activeIndex ? 'active' : ''} key={page.name} onClick={() => showPage(index)}>{page.name}</button>)}</div><span className="multi-site-book">Book a visit <ArrowUpRight size={12} /></span></div>
    <div className="multi-site-page" key={activePage.name}>
      <div className="multi-site-copy"><small>{activePage.eyebrow}</small><h3>{activePage.title}</h3><p>{activePage.body}</p><div className="multi-site-points"><span><Check size={12} /> Family focused</span><span><Check size={12} /> Easy to reach</span></div><button className="multi-site-action" onClick={() => showPage(activeIndex === pages.length - 1 ? 0 : activeIndex + 1)}>{activePage.action} <ArrowUpRight size={13} /></button></div>
      <div className={`multi-site-image multi-site-image-${activeIndex}`}><span>{activePage.visual}</span><small>{activePage.name.toUpperCase()} PAGE · SAMPLE</small></div>
    </div>
    <div className="multi-site-controls"><button className="page-arrow" aria-label="Previous page" onClick={() => showPage(activeIndex - 1)}><ArrowLeft size={14} /></button><div className="page-progress">{pages.map((page, index) => <button key={page.name} className={index === activeIndex ? 'active' : ''} aria-label={`Show ${page.name} page`} aria-current={index === activeIndex ? 'page' : undefined} onClick={() => showPage(index)} />)}</div><span className="page-count">Page <b>{activeIndex + 1}</b> of 5</span><button className="page-arrow" aria-label="Next page" onClick={() => showPage(activeIndex + 1)}><ArrowRight size={14} /></button></div>
  </div>
}

function SampleAction({ children, onClick, secondary = false }) {
  return <button className={`sample-action ${secondary ? 'secondary' : ''}`} type="button" onClick={onClick}>{children}<ArrowUpRight size={13} /></button>
}

function BrandLogo({ brand, label, inverted = false }) {
  const title = label || BRAND_NAMES[brand]
  return <span className={`brand-lockup brand-lockup-${brand} ${inverted ? 'inverted' : ''}`} aria-label={title}>
    {brand === 'razorpay' && <svg className="brand-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.436 0 10.526 7.773l-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24ZM14.26 10.098 3.389 17.166 1.564 24h9.008l3.688-13.902Z" /></svg>}
    {brand === 'google' && <svg className="brand-logo-icon google-logo-icon" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.7-.4-4H24v7.6h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.8Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.6 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 0 17.9l6.8-5.1Z"/><path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.2C14.2 15.6 18.7 12 24 12Z"/></svg>}
    {brand === 'instagram' && <svg className="brand-logo-icon instagram-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="igLogoGradient" x1="0" x2="1" y1="1" y2="0"><stop stopColor="#feda75"/><stop offset=".45" stopColor="#d62976"/><stop offset="1" stopColor="#4f5bd5"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igLogoGradient)"/><rect x="6.5" y="6.5" width="11" height="11" rx="3.5" fill="none" stroke="white" strokeWidth="1.7"/><circle cx="12" cy="12" r="2.7" fill="none" stroke="white" strokeWidth="1.7"/><circle cx="17.5" cy="6.8" r="1" fill="white"/></svg>}
    {brand === 'facebook' && <svg className="brand-logo-icon facebook-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#0866ff"/><path fill="white" d="M13.8 22v-8.1h2.7l.4-3.2h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V4.3c-.3 0-1.2-.1-2.3-.1-2.4 0-4.1 1.5-4.1 4.3v2.2H8v3.2h2.6V22h3.2Z"/></svg>}
    {brand === 'whatsapp' && <svg className="brand-logo-icon whatsapp-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#25d366"/><path fill="white" d="M17.4 14.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.3 3.5 5.6 4.9.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/></svg>}
    <b>{title}</b>
  </span>
}

function OnePageWebsiteDemo() {
  const [section, setSection] = useState('Home')
  const copy = { Home: ['A good place to begin.', 'A clear welcome, your main offer and the best way to reach you.'], About: ['Small business. Personal service.', 'Introduce your team, your story and what makes your approach yours.'], Contact: ['We’re easy to find.', 'Show your location, opening hours and a simple enquiry action.'] }[section]
  return <div className="specific-demo website-sample"><div className="specific-top"><b>✳ THE LITTLE CORNER</b><span>BUSINESS WEBSITE</span></div><div className="specific-tabs">{Object.keys({Home: 1, About: 1, Contact: 1}).map(tab => <button className={section === tab ? 'selected' : ''} key={tab} onClick={() => setSection(tab)}>{tab}</button>)}</div><div className="website-sample-hero"><small>{section.toUpperCase()} · BENGALURU</small><h3>{copy[0]}</h3><p>{copy[1]}</p><SampleAction onClick={() => setSection(section === 'Contact' ? 'Home' : 'Contact')}>Find out more</SampleAction></div><div className="sample-footnote">One page · Sections linked from the top navigation</div></div>
}

function WhatsAppOrderingDemo() {
  const [quantities, setQuantities] = useState([0, 0, 0])
  const [notice, setNotice] = useState('')
  const products = [['Seasonal fruit box', 420, '🥭'], ['Fresh greens bundle', 260, '🥬'], ['Farm eggs · 6 pack', 180, '🥚']]
  const total = products.reduce((sum, item, index) => sum + item[1] * quantities[index], 0)
  function change(index, delta) { setQuantities(current => current.map((value, itemIndex) => itemIndex === index ? Math.max(0, value + delta) : value)) }
  return <div className="specific-demo order-sample"><div className="wa-order-titlebar"><BrandLogo brand="whatsapp" /><span>CATALOGUE ORDER</span></div><div className="wa-order-store"><b>NILA · FRESH PICKS</b><small>A few good things, picked this morning.</small></div>{products.map(([name, price, emoji], index) => <div className="order-sample-row" key={name}><span className="order-emoji">{emoji}</span><span className="order-name"><b>{name}</b><small>{money(price)}</small></span><button aria-label={`Remove ${name}`} onClick={() => change(index, -1)}>−</button><b className="order-quantity">{quantities[index]}</b><button aria-label={`Add ${name}`} onClick={() => change(index, 1)}>+</button></div>)}<div className="sample-total"><span>Order estimate</span><b>{money(total)}</b></div><SampleAction onClick={() => setNotice(total ? 'Sample order ready to review. Nothing was sent.' : 'Add an item to build a sample order.')}>Review WhatsApp order</SampleAction>{notice && <div className="sample-notice">{notice}</div>}</div>
}

function PaymentLinkDemo() {
  const [status, setStatus] = useState('')
  return <div className="specific-demo payment-sample"><div className="razorpay-brandbar"><BrandLogo brand="razorpay" /><span>PAYMENT LINKS</span></div><div className="payment-request-label">PAYMENT REQUEST · SAMPLE</div><div className="payment-amount">₹1,250</div><p className="payment-for">Booking advance · The Sugar Window</p><div className="payment-line"><span>Request ID</span><b>DEMO-2048</b></div><div className="payment-line"><span>Merchant</span><b>Example business</b></div><SampleAction onClick={() => setStatus('Payment demo only — no payment was collected.')}>{status ? 'Demo viewed' : 'Continue to sample payment'}</SampleAction>{status && <div className="sample-notice">{status}</div>}<small className="sample-legal">A live link requires an approved merchant account.</small></div>
}

function PaymentCatalogueDemo() {
  const [cart, setCart] = useState([])
  const [notice, setNotice] = useState('')
  const products = [['Linen tote', 499], ['Everyday kurta', 899], ['Gift set', 1150]]
  const total = cart.reduce((sum, index) => sum + products[index][1], 0)
  return <div className="specific-demo payment-catalogue-sample"><div className="razorpay-brandbar"><BrandLogo brand="razorpay" /><span>PAYMENT CATALOGUE</span></div><div className="catalogue-storehead"><b>THREAD &amp; THIMBLE</b><small>SHOP · SAMPLE</small></div><p className="sample-intro">Browse a product, build a cart, review the total.</p><div className="catalogue-product-grid">{products.map(([name, price], index) => <button className={cart.includes(index) ? 'chosen' : ''} key={name} onClick={() => setCart(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index])}><span>{['👜', '👕', '🎁'][index]}</span><b>{name}</b><small>{money(price)} · {cart.includes(index) ? 'Added' : 'Add to cart +'}</small></button>)}</div><div className="sample-total"><span>Sample cart · {cart.length} items</span><b>{money(total)}</b></div><SampleAction onClick={() => setNotice('Sample checkout only. Your merchant account determines available payment options.')}>Review checkout options</SampleAction>{notice && <div className="sample-notice">{notice}</div>}</div>
}

function ProductCatalogueDemo() {
  const [category, setCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState('')
  const products = [{name:'Ceramic cup',type:'Home',price:650,icon:'☕'},{name:'Cotton tote',type:'Accessories',price:480,icon:'👜'},{name:'Linen shirt',type:'Clothing',price:1290,icon:'👕'},{name:'Gift set',type:'Home',price:1150,icon:'🎁'}]
  const visible = category === 'All' ? products : products.filter(item => item.type === category)
  return <div className="specific-demo products-sample"><div className="specific-top"><b>SMALL BATCH STUDIO</b><span>4 ITEMS · CATALOGUE</span></div><div className="specific-tabs">{['All','Home','Accessories','Clothing'].map(tab => <button className={category === tab ? 'selected' : ''} key={tab} onClick={() => setCategory(tab)}>{tab}</button>)}</div><div className="catalogue-list">{visible.map(item => <button key={item.name} onClick={() => setSelectedItem(item.name)}><span>{item.icon}</span><b>{item.name}</b><small>{money(item.price)}</small><ArrowUpRight size={12} /></button>)}</div>{selectedItem && <div className="sample-notice">{selectedItem} selected for a sample enquiry.</div>}<div className="sample-footnote">A browsable catalogue, ready to share as one link.</div></div>
}

function DigitalMenuDemo() {
  const [category, setCategory] = useState('Mains')
  const menu = { Mains: [['Garden bowl','₹280'],['Roasted paneer plate','₹340'],['Lemon rice & greens','₹260']], Drinks: [['Cold brew','₹180'],['Nimbu soda','₹120'],['Masala chai','₹90']], Desserts: [['Seasonal tart','₹190'],['Chocolate cake','₹210'],['Mango shrikhand','₹160']] }
  return <div className="specific-demo menu-sample"><div className="menu-sample-cover"><small>GOOD FOOD, GOOD MOOD</small><b>THE GARDEN TABLE</b><span>MENU · BENGALURU</span></div><div className="specific-tabs">{Object.keys(menu).map(tab => <button className={category === tab ? 'selected' : ''} key={tab} onClick={() => setCategory(tab)}>{tab}</button>)}</div>{menu[category].map(([name, price]) => <div className="menu-sample-row" key={name}><b>{name}</b><span>{price}</span></div>)}<div className="sample-footnote">A QR code can open this menu on a customer’s phone.</div></div>
}

function GoogleBusinessDemo() {
  const [active, setActive] = useState('Overview')
  const details = { Overview: 'Fresh breads, pastries and coffee made every morning.', Hours: 'Today · 8:00 am–8:00 pm\nMon–Sat · 8:00 am–8:00 pm', Contact: 'Indiranagar, Bengaluru\nCall · Directions · Website' }
  return <div className="specific-demo google-sample"><div className="google-product-bar"><BrandLogo brand="google" label="Google" /><span>BUSINESS PROFILE · SAMPLE</span></div><div className="google-sample-search"><span className="google-search-icon">⌕</span><span>bakery near me</span><small>⌕</small></div><div className="google-business-card"><div className="google-cover">🥐 <span>LOCAL PLACE · SAMPLE</span></div><h3>The Daily Loaf</h3><small>Bakery · Bengaluru · Open now</small><div className="google-rating">SAMPLE PREVIEW <span>★</span></div><div className="specific-tabs">{Object.keys(details).map(tab => <button className={active === tab ? 'selected' : ''} key={tab} onClick={() => setActive(tab)}>{tab}</button>)}</div><p className="google-details">{details[active]}</p><div className="google-quicklinks"><span>⌖ Directions</span><span>☎ Call</span><span>↗ Website</span></div></div><div className="sample-footnote">Example listing; no live Google profile is connected.</div></div>
}

function InstagramSetupDemo() {
  const [tab, setTab] = useState('Posts')
  return <div className="specific-demo instagram-sample"><div className="instagram-brandbar"><BrandLogo brand="instagram" /><span>⌕</span><span>♡</span></div><div className="social-profile-sample"><div className="insta-avatar">TT</div><div><b>threadandthimble</b><small>Business profile · Sample</small></div><button onClick={() => setTab('Contact')}>Follow</button></div><div className="insta-bio">Thoughtful everyday wear<br />Made in Bengaluru · New pieces weekly<br /><a>threadandthimble.example</a></div><div className="specific-tabs">{['Posts','About','Contact'].map(item => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>{tab === 'Posts' ? <div className="insta-grid"><span>✳<small>NEW ARRIVALS</small></span><span>◒<small>MADE SLOWLY</small></span><span>☼<small>THE EVERYDAY EDIT</small></span></div> : <div className="social-tab-content"><b>{tab === 'About' ? 'Clothing & accessories' : 'Get in touch'}</b><small>{tab === 'About' ? 'Small batches, considered details.' : 'WhatsApp · Email · Store location'}</small></div>}<div className="sample-footnote">Sample profile with contact and shop links.</div></div>
}

function FacebookPageDemo() {
  const [tab, setTab] = useState('Posts')
  return <div className="specific-demo facebook-sample"><div className="facebook-brandbar"><BrandLogo brand="facebook" label="facebook" /><span>☰</span></div><div className="facebook-cover"><span>✿</span><small>LITTLE LEAF NURSERY · SAMPLE PAGE</small></div><div className="facebook-page-title"><b>Little Leaf Nursery</b><span>Plants for city homes</span></div><div className="facebook-action-row"><button onClick={() => setTab('Contact')}>Message</button><button onClick={() => setTab('About')}>View details</button></div><div className="specific-tabs">{['Posts','About','Contact'].map(item => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div><div className="facebook-post"><small>{tab.toUpperCase()} · SAMPLE</small><b>{tab === 'Posts' ? 'A new batch of easy-care plants is here.' : tab === 'About' ? 'Plants, pots and growing advice.' : 'Visit us · 10 am–7 pm · Bengaluru'}</b><p>Clear business information helps visitors know what to expect.</p></div></div>
}

function WhatsAppProfileDemo() {
  const [message, setMessage] = useState('')
  return <div className="specific-demo wa-profile-sample"><div className="wa-profile-header"><BrandLogo brand="whatsapp" label="WhatsApp Business" inverted /><span>⋮</span></div><div className="wa-business-profile"><div className="wa-business-avatar">S</div><h3>Saffron &amp; Stone</h3><small>Home-style meals · Bengaluru</small><span className="wa-hours">Open · Closes 8:00 pm</span><div className="wa-profile-buttons"><button onClick={() => setMessage('Sample call action selected')}>Call</button><button onClick={() => setMessage('Sample catalogue opened')}>Catalogue</button></div></div><div className="wa-quick-messages"><small>START A CONVERSATION</small>{['Can I see today’s menu?','What are your pickup hours?','Do you deliver nearby?'].map(item => <button key={item} onClick={() => setMessage(item)}>{item}<ArrowUpRight size={12} /></button>)}</div>{message && <div className="sample-notice">Sample selection: “{message}” — not sent.</div>}</div>
}

function LinkInBioDemo() {
  const [selected, setSelected] = useState('')
  const items = [['View my portfolio','Selected work and recent projects'],['Book a session','Availability and booking enquiry'],['Print shop','Browse available prints'],['Say hello','Contact Ananya directly']]
  return <div className="specific-demo bio-sample"><div className="bio-sample-avatar">AK</div><h3>Ananya Kapoor</h3><p>Photographer &amp; visual storyteller</p><div className="bio-link-list">{items.map(([title, description]) => <button key={title} onClick={() => setSelected(title)}><span><b>{title}</b><small>{description}</small></span><ArrowUpRight size={14} /></button>)}</div>{selected && <div className="sample-notice">“{selected}” selected. Your link would open here.</div>}<small className="sample-footnote">One profile link. Four helpful destinations.</small></div>
}

function DomainEmailDemo() {
  const [active, setActive] = useState('Website')
  return <div className="specific-demo domain-sample"><div className="specific-top"><b>YOUR BUSINESS IDENTITY</b><span>SETUP PREVIEW</span></div><p className="sample-intro">A domain and email that match your business name.</p><div className="identity-switch"><button className={active === 'Website' ? 'selected' : ''} onClick={() => setActive('Website')}>Website</button><button className={active === 'Email' ? 'selected' : ''} onClick={() => setActive('Email')}>Business email</button></div><div className="identity-card"><span className="identity-icon">{active === 'Website' ? '↗' : '@'}</span><small>{active === 'Website' ? 'YOUR DOMAIN' : 'YOUR BUSINESS EMAIL'}</small><b>{active === 'Website' ? 'www.yourbusiness.in' : 'hello@yourbusiness.in'}</b><span>{active === 'Website' ? 'Registered in your business name' : 'Connected to your chosen mailbox provider'}</span></div><div className="sample-notice">Example only. Domain availability and provider charges are separate.</div></div>
}

function BasicSeoDemo() {
  const [tab, setTab] = useState('Search result')
  return <div className="specific-demo seo-sample"><div className="specific-top"><b>SEARCH PRESENCE</b><span>BASIC SEO PREVIEW</span></div><div className="specific-tabs">{['Search result','Page details'].map(item => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>{tab === 'Search result' ? <div className="seo-result"><small>yourbusiness.in › bengaluru</small><b>Everyday Care Clinic | Family Doctor in Bengaluru</b><span>Clear information about clinic services, hours and location. Request an appointment online.</span></div> : <div className="seo-checklist">{[['✓','Page title describes the business'],['✓','Search description explains the page'],['✓','Headings organize key information']].map(([mark, text]) => <div key={text}><span>{mark}</span>{text}</div>)}</div>}<div className="sample-footnote">SEO setup helps search tools understand a page; it cannot guarantee rankings.</div></div>
}

const serviceDemos = {
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

function ServiceDemo({ service }) {
  const DemoComponent = serviceDemos[service.id]
  const isPayment = service.category === 'Payments'
  return <section className="detail-demo-section" aria-labelledby="demo-heading">
    <div className="detail-demo-copy"><span className="eyebrow">A small preview</span><h2 id="demo-heading">See how it could work.</h2><p>This is a sample interaction to help you picture the customer experience. Names and details are illustrative.</p><div className="demo-disclaimer"><Check size={16} /><span>{isPayment ? 'Demo only. No payment is collected.' : 'Sample content only. Your business details replace these.'}</span></div></div>
    <div className={`demo-stage ${service.brand ? `brand-demo-${service.brand}` : ''}`}><div className="demo-toolbar"><span><i /><i /><i /></span><b>ONLINEKARDO · SAMPLE PREVIEW</b><span className="demo-label">NOT LIVE</span></div>
      <div className="specific-demo-wrapper"><DemoComponent service={service} /></div><div className="demo-stage-caption"><span>✳</span> {service.brand ? `Independent ${BRAND_NAMES[service.brand]} visual sample · no affiliation or live account connection` : isPayment ? 'Sample only · No real payment or merchant account is connected' : 'Illustrative demo · No real orders or messages are sent'}</div>
    </div>
  </section>
}

function ServiceImpact({ service }) {
  return <section className="service-impact-section"><div className="container"><div className="impact-heading"><span className="eyebrow">Why this service matters</span><h2>Make the next customer step easier.</h2><p>Good digital setup connects what you offer with what a customer needs to know or do.</p></div>
    <div className="impact-grid"><article className="impact-card impact-primary"><span className="impact-index">01 / THE IMPACT</span><div className="impact-symbol">↗</div><h3>What it can change</h3><p>{service.impact}</p></article><article className="impact-card"><span className="impact-index">02 / WHY IT HELPS</span><div className="impact-symbol">✳</div><h3>Why it’s useful</h3><p>{service.why}</p></article><article className="impact-card"><span className="impact-index">03 / A GOOD FIT FOR</span><div className="impact-symbol">◎</div><h3>Businesses like yours</h3><p>{service.bestFor}</p></article></div>
  </div></section>
}

function ServiceDetailPage({ service, onBack, onChoose }) {
  return <main className="service-detail-page" id="top">
    <section className="service-detail-hero"><div className="container"><button className="detail-back" onClick={onBack}><ArrowLeft size={15} /> Back to all services</button><div className="detail-hero-grid"><div className="detail-hero-copy"><span className="eyebrow">{service.category} · Individual setup</span><h1>{service.name}</h1><p className="detail-summary">{service.summary}</p><div className="detail-price-line"><strong>{money(service.price)}</strong><span>one-time setup fee</span></div><button className="button button-primary" onClick={() => onChoose(service.name)}>Ask about this service <ArrowUpRight size={15} /></button><small className="detail-fee-note">Third-party subscriptions, fees and approvals are separate where applicable.</small></div><div className={`detail-hero-card ${service.brand ? `detail-brand-${service.brand}` : ''}`}><span className="detail-card-kicker">WHAT YOU’RE SETTING UP</span>{service.brand ? <div className="detail-brand-lockup"><BrandLogo brand={service.brand} /></div> : <div className="detail-card-mark">{service.mark}</div>}<h2>{service.name}</h2><p>{service.bestFor}</p><div className="detail-card-foot"><Check size={15} /> Template-led · Clear scope</div></div></div></div></section>
    <ServiceImpact service={service} />
    <ServiceDemo service={service} />
    <section className="detail-steps-section"><div className="container detail-steps-layout"><div><span className="eyebrow">From setup to useful</span><h2>Designed around your customer’s next step.</h2><p>We’ll tailor the sample to your business details, review it with you and make one consolidated revision before handover.</p></div><div className="detail-steps-list"><div><span>01</span><b>Share the essentials</b><small>Your brand, contact details, products or services.</small></div><div><span>02</span><b>We shape the setup</b><small>We adapt the selected template to your workflow.</small></div><div><span>03</span><b>Review and launch</b><small>Confirm details, then share the finished setup.</small></div></div></div></section>
    <section className="detail-bottom-cta"><div className="container detail-bottom-content"><div><span className="eyebrow eyebrow-light">A useful next step</span><h2>Make {service.name.toLowerCase()} work for your business.</h2><p>Ask us what details we need and how this setup could fit your customers.</p></div><button className="button button-white" onClick={() => onChoose(service.name)}>Start with this service <ArrowUpRight size={15} /></button></div></section>
  </main>
}

function Monthly({ onChoose }) {
  return <section className="monthly-section" id="monthly"><div className="container">
    <div className="section-heading section-heading-row"><div><span className="eyebrow">Ongoing support</span><h2>Keep things ticking along.</h2></div><p>Simple monthly help for updates and social posting. Choose what suits your rhythm.</p></div>
    <div className="monthly-grid">{monthlyPlans.map(([name, price, description], index) => <article className="monthly-card" key={name}><span className="monthly-num">0{index + 1} / CARE PLAN</span><h3>{name}</h3><div className="monthly-price">{money(price)} <small>/ month</small></div><p>{description}</p><button className="monthly-link" type="button" onClick={() => onChoose(`${name} monthly plan`)}>Ask about this plan <ArrowUpRight size={14} /></button></article>)}</div>
    <p className="pricing-footnote monthly-note">Social plans cover creating and publishing template-based posts. They don’t include ad management, daily customer replies or guaranteed leads, followers or sales.</p>
  </div></section>
}

function GoodToKnow() {
  const items = [
    ['What do I need to provide?', 'Business name, contact details, logo if available, photos, products or services, prices, address, hours and access to relevant business accounts. We start after the onboarding form is complete.'],
    ['Who owns my domain and what costs extra?', 'Your domain is registered in your name. Domain registration, hosting, payment gateway charges and other third-party fees are billed separately from our setup fee.'],
    ['How do payment features work?', 'Payment Pages, Payment Links and catalogue features are different. We confirm what your approved merchant account supports before promising a checkout or ordering workflow.'],
    ['What isn’t included in the listed price?', 'Custom photography, video shoots, reels, ad campaign management, unlimited revisions and daily customer-message handling. Each setup pack includes one consolidated revision round.'],
    ['Are there special requirements for some industries?', 'Regulated businesses need appropriate licences and disclosures. Clinics must avoid treatment outcome claims; online medicine sales require the right pharmacy licence; property projects should display their RERA number; schools should take extra care with student data.'],
  ]
  return <section className="fineprint-section" id="fineprint"><div className="container fineprint-wrap"><div className="fineprint-title"><span className="eyebrow">The useful details</span><h2>Good to know<br />before we start.</h2><p>Clear expectations make a better project for everyone.</p></div><div className="fineprint-list">{items.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
}

function Contact({ selected, onContact }) {
  const message = `Hi OnlineKarDo! I'm interested in ${selected || 'getting my business online'}. Please share the next steps.`
  const waNumber = CONTACT.whatsapp.replace(/\D/g, '')
  const whatsappHref = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}` : '#contact'
  const emailHref = CONTACT.email ? `mailto:${CONTACT.email}?subject=${encodeURIComponent('OnlineKarDo enquiry')}&body=${encodeURIComponent(message)}` : '#contact'
  return <section className="contact-section" id="contact"><div className="container contact-layout"><div>
    <span className="eyebrow eyebrow-light">Your next step starts here</span><h2>Tell us what you do.<br /><span>We’ll help you get online.</span></h2><p>Pick a pack or tell us what you’re trying to set up. We’ll point you in the right direction.</p>
    <div className="contact-links"><a className="button button-white" href={whatsappHref} target={waNumber ? '_blank' : undefined} rel={waNumber ? 'noreferrer' : undefined}>Chat on WhatsApp <ArrowUpRight size={15} /></a><a className={`contact-email ${CONTACT.email ? '' : 'inactive'}`} href={emailHref}>Send us an email <ArrowUpRight size={14} /></a></div>
  </div><div className="contact-aside"><span className="aside-spark">✳</span><b>One clear brief.<br />One thoughtful setup.</b><span>Start with the details that make your business yours.</span><div className="aside-line" /><small>OnlineKarDo · Get Your Business Online</small></div></div></section>
}

function EnquiryModal({ offer, onClose }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  useEffect(() => {
    const onKeyDown = event => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [onClose])
  async function submit(event) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const response = await fetch(formspreeEndpoint, { method: 'POST', body: new FormData(event.currentTarget), headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('We couldn’t send your request. Please try again in a moment.')
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }
  return <div className="enquiry-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
      <button className="enquiry-close" type="button" onClick={onClose} aria-label="Close enquiry form"><X size={19} /></button>
      {status === 'sent' ? <div className="enquiry-success"><span><Check size={23} /></span><p className="eyebrow">Request received</p><h2>Thanks for reaching out.</h2><p>We’ve received your enquiry about <b>{offer}</b> and will get back to you soon.</p><button className="button button-primary" type="button" onClick={onClose}>Done</button></div> : <>
        <span className="eyebrow">Let’s get your business online</span><h2 id="enquiry-title">Tell us a little about your business.</h2><p className="enquiry-intro">We’ll follow up about <b>{offer}</b> and help you figure out the next step.</p>
        <form className="enquiry-form" onSubmit={submit}>
          <input type="hidden" name="Selected service or plan" value={offer} />
          <label className="enquiry-trap" aria-hidden="true">Leave this field empty<input name="_gotcha" tabIndex="-1" autoComplete="off" /></label>
          <label>Your name<input name="name" required autoComplete="name" placeholder="Name" /></label>
          <label>Business name<input name="business_name" required autoComplete="organization" placeholder="Business name" /></label>
          <label>Phone / WhatsApp<input name="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" /></label>
          <label>Email address<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
          <label className="enquiry-wide">What does your business do?<textarea name="business_details" required rows="3" placeholder="Tell us what you sell or the service you provide…" /></label>
          <label className="enquiry-wide">Anything specific you need?<textarea name="requirements" rows="3" placeholder="A website, ordering, payments, a catalogue…" /></label>
          {error && <p className="enquiry-error" role="alert">{error}</p>}
          <button className="button button-primary enquiry-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={15} /></button>
          <small className="enquiry-privacy">Your details will only be used to respond to this enquiry.</small>
        </form>
      </>}
    </section>
  </div>
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><img src="/assets/onlinekardo-logo.jpeg" alt="OnlineKarDo" /><p>Digital essentials for local businesses, made simpler.</p></div><div className="footer-nav"><div><b>Explore</b><a href="#how">How it works</a><a href="#packs">Setup packs</a><a href="#examples">Examples</a><a href="#monthly">Monthly plans</a></div><div><b>Get started</b><a href="#services">Individual services</a><a href="#contact">Contact</a><a href="#fineprint">Important details</a></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} OnlineKarDo. All rights reserved.</span><span>Made for the people building local business.</span></div></footer>
}

export default function App() {
  const [selected, setSelected] = useState('')
  const [enquiryOffer, setEnquiryOffer] = useState('')
  const [toast, setToast] = useState('')
  const [pathname, setPathname] = useState(window.location.pathname)
  const activeService = services.find(service => service.id === pathname.split('/').filter(Boolean).at(-1) && pathname.startsWith('/services/'))

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title = activeService ? `${activeService.name} for Small Businesses | OnlineKarDo` : 'OnlineKarDo — Get Your Business Online'
  }, [activeService])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  function chooseBusiness(name) {
    setSelected(`${name} setup`)
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    setToast(`${name} setup selected. Share your details to get started.`)
  }

  function openService(service) {
    const nextPath = `/services/${service.id}`
    window.history.pushState({}, '', nextPath)
    setPathname(nextPath)
    setSelected(service.name)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function navigateSection(id) {
    if (window.location.pathname !== '/') {
      const nextUrl = id === 'top' ? '/' : `/#${id}`
      window.history.pushState({}, '', nextUrl)
      setPathname('/')
    }
    window.requestAnimationFrame(() => {
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  function backToServices() {
    window.history.pushState({}, '', '/#services')
    setPathname('/')
    window.requestAnimationFrame(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }))
  }

  function chooseDetailService(name) {
    setSelected(name)
    setEnquiryOffer(name)
  }

  return <>
    <Header isService={Boolean(activeService)} onSection={navigateSection} onEnquiry={chooseDetailService} />
    {activeService ? <ServiceDetailPage service={activeService} onBack={backToServices} onChoose={chooseDetailService} /> : <main id="top"><Hero /><HowItWorks /><Packs onChoose={chooseDetailService} /><Examples onBusiness={chooseBusiness} /><Services onOpen={openService} /><Monthly onChoose={chooseDetailService} /><GoodToKnow /></main>}
    <Contact selected={selected} />
    <Footer />
    {enquiryOffer && <EnquiryModal key={enquiryOffer} offer={enquiryOffer} onClose={() => setEnquiryOffer('')} />}
    <a className="floating-contact" href={CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi OnlineKarDo! I'm interested in ${selected || 'getting my business online'}.`)}` : '#contact'} target={CONTACT.whatsapp ? '_blank' : undefined} rel={CONTACT.whatsapp ? 'noreferrer' : undefined} aria-label="Contact OnlineKarDo"><ArrowUpRight size={17} /><span>Let’s talk</span></a>
    <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
  </>
}

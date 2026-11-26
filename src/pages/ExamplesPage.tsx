import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'

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

interface PhonePreviewItem {
  title: string
  caption: string
  type: string
}
const phonePreviews: PhonePreviewItem[] = [
  { title: 'Product catalogue', caption: 'Browse products with ease', type: 'catalogue' },
  { title: 'WhatsApp ordering', caption: 'Start a ready-to-send order', type: 'orders' },
  { title: 'Payment page', caption: 'Payment setup, where supported', type: 'payment' },
  { title: 'Social business page', caption: 'A consistent online identity', type: 'social' },
  { title: 'Digital menu + QR', caption: 'Ready to share at the counter', type: 'menu' },
  { title: 'One-page website', caption: 'A clear introduction to your work', type: 'website' },
  { title: 'Local search listing', caption: 'Key details in one place', type: 'search' },
  { title: 'Link-in-bio page', caption: 'Turn one link into many paths', type: 'bio' },
]

type BusinessItem = [string, string, string, string]
const businesses: BusinessItem[] = [
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

const filters = [['all', 'All businesses'], ['food', 'Food & drink'], ['retail', 'Shops & makers'], ['services', 'Services'], ['community', 'Learning & stays']] as const

export default function ExamplesPage() {
  const [filter, setFilter] = useState('all')
  const { openEnquiry } = useEnquiry()
  const filtered = filter === 'all' ? businesses : businesses.filter(item => item[2] === filter)

  return (
    <div className="page-wrapper">
      <SEO
        title="Examples — Phone-First Pages for Your Business | OnlineKarDo"
        description="See 8 phone-first page types: product catalogue, WhatsApp ordering, payment page, social page, digital menu, website, search listing, link-in-bio. Filter by 30+ business types."
        canonical="/examples"
      />
      <section className="page-hero page-hero--examples">
        <div className="container">
          <span className="eyebrow">Picture your business here</span>
          <h1>Small screen. Big first impression.</h1>
          <p className="hero-lede">Practical, phone-first pages designed around how customers actually browse, ask and order.</p>
        </div>
      </section>

      <section className="showcase-section">
        <div className="container">
          <div className="preview-grid">
            {phonePreviews.map((preview, index) => (
              <article className="preview-card" key={preview.type}>
                <div className={`phone phone-${preview.type}`}>
                  <div className="phone-notch" />
                  <div className="phone-screen"><PhonePreview type={preview.type} /></div>
                </div>
                <div className="preview-caption">
                  <span>0{index + 1}</span>
                  <div><b>{preview.title}</b><small>{preview.caption}</small></div>
                </div>
              </article>
            ))}
          </div>

          <div className="business-browser">
            <div className="business-head">
              <div>
                <span className="eyebrow">Made for your kind of business</span>
                <h2>What does your business do?</h2>
              </div>
              <div className="business-count"><b>{filtered.length}</b><span>business types</span></div>
            </div>
            <div className="filter-row" role="group" aria-label="Filter businesses">
              {filters.map(([key, label]) => (
                <button className={`filter-chip ${filter === key ? 'active' : ''}`} key={key} onClick={() => setFilter(key)}>
                  {label}
                </button>
              ))}
            </div>
            <div className="business-grid">
              {filtered.map(([name, icon, , fit]) => (
                <button type="button" className="business-card" key={name} onClick={() => openEnquiry(`${name} business setup`, name)}>
                  <span className="business-emoji" aria-hidden="true">{icon}</span>
                  <b>{name}</b>
                  <small>{fit}</small>
                </button>
              ))}
            </div>
            <p className="business-note">Each setup is adapted to your details, audience and the tools your business already uses.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>See a service you like?</h2>
            <p>Explore all 14 individual services or start with a pack.</p>
            <Link className="button button-primary" to="/services">
              Browse services <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import { SEO, OrganizationSchema } from '../components/SEO'

const money = (value: number | string): string => `₹${Number(value).toLocaleString('en-IN')}`

type Step = [string, string, string]
const steps: Step[] = [
  ['↗', 'Pick your setup', 'Choose the pack that fits what your business needs right now.'],
  ['▤', 'Share your details', 'One onboarding form gathers your logo, photos, prices and contact info.'],
  ['✳', 'We build it', 'We adapt a proven template and set up the pieces in your pack.'],
  ['✓', 'Review and launch', 'Approve one consolidated revision, then share your new online home.'],
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
        title="Get Your Business Online in 48 Hours | OnlineKarDo"
        description="Websites, WhatsApp ordering and digital setup for Indian small businesses. Pick a fixed-price pack and get started with OnlineKarDo."
        canonical="/"
        ogImage="/assets/onlinekardo-logo.jpeg"
      />
      <OrganizationSchema />
      <section className="hero !relative !isolate !overflow-hidden !bg-gradient-to-br !from-[#153d31] !via-[#194637] !to-[#2b5a43] !py-20 !text-[#fffaf0] md:!py-28">
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow !text-[#f7b27d]"><span className="eyebrow-dot" />Your digital setup partner</div>
            <h1 className="!max-w-[720px] !text-6xl !leading-[.98] !tracking-[-.075em] md:!text-8xl">Your business deserves<br /><span className="!text-[#f4a168]">a brilliant online home.</span></h1>
            <p className="hero-lede !max-w-xl !text-lg !leading-relaxed !text-[#e0e9df]">A polished website, WhatsApp ordering and the digital essentials that help customers find you, trust you and take the next step.</p>
            <div className="hero-actions">
              <Link to="/packs" className="button button-primary !rounded-full !bg-[#e36a27] !px-7 !py-4 !text-white !shadow-lg !shadow-black/15 hover:!bg-[#f07b36]">Find your setup <ArrowDown size={16} /></Link>
              <Link to="/examples" className="text-link !text-[#fffaf0] underline decoration-[#f4a168]/60 underline-offset-4">See what's possible <ArrowUpRight size={15} /></Link>
            </div>
            <p className="delivery-note !max-w-xl !text-[#c6d5ca]"><Check className="check !text-[#f4a168]" size={14} /> Starting at <strong className="!text-white">₹2,999</strong> <span className="note-divider !text-[#93aa99]">·</span> First launch target: about 48 hours after details and approvals.</p>
            <div className="hero-proof">
              <div className="proof-icon !bg-[#315b47] !text-[#f4a168]">01</div><div><strong className="!text-white">Simple, fixed scope</strong><span className="!text-[#c5d4ca]">Know what's included before we begin.</span></div>
              <div className="proof-icon proof-icon-orange !bg-[#f4a168] !text-[#183d32]">02</div><div><strong className="!text-white">Made for local business</strong><span className="!text-[#c5d4ca]">Clear on a phone. Easy to share.</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="A preview of a small business mobile website">
            <div className="hero-spark spark-one">✳</div><div className="hero-spark spark-two">✳</div>
            <div className="shop-window">
              <div className="shop-top"><span className="shop-avatar">M</span><span className="shop-brand"><b>MOON & MINT</b><small>MADE WITH CARE · IN BENGALURU</small></span><span className="shop-dots">···</span></div>
              <div className="shop-banner"><span>SMALL-BATCH<br />GOOD THINGS</span><i>✿</i></div>
              <div className="shop-intro"><span className="mini-label">A LITTLE SHOP, A LOT TO LOVE</span><h3>Find your<br />everyday favourite.</h3><p>Thoughtful finds for home, gifting and slow days.</p><span className="shop-pill">Browse the collection <b>↗</b></span></div>
              <div className="shop-products"><div className="product-tile product-peach"><span>✿</span><small>THE SUNDAY BUNDLE</small><b>₹ 680</b></div><div className="product-tile product-green"><span>◒</span><small>THE LITTLE VASE</small><b>₹ 420</b></div></div>
              <div className="shop-whatsapp"><span>◉</span> Ask us on WhatsApp</div>
            </div>
            <div className="float-card"><span className="float-check">✓</span><span><b>Ready to share</b><small>Your online storefront, sorted.</small></span></div>
            <div className="visual-caption">A sample storefront for an independent business</div>
          </div>
        </div>
      </section>

      <nav className="!border-b !border-[#dfd6c6] !bg-[#fffaf0]" aria-label="Explore digital services">
        <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 !py-5 md:justify-between">
          <span className="font-display text-xs font-bold uppercase tracking-[.16em] !text-[#76776a]">A better way to show up</span>
          <Link className="font-semibold !text-[#173c30] transition hover:!text-[#e36a27]" to="/services/one-page-business-website">Websites <i className="!text-[#e36a27]">↗</i></Link>
          <Link className="font-semibold !text-[#173c30] transition hover:!text-[#e36a27]" to="/services/whatsapp-ordering-catalogue">WhatsApp ordering <i className="!text-[#e36a27]">↗</i></Link>
          <Link className="font-semibold !text-[#173c30] transition hover:!text-[#e36a27]" to="/services/razorpay-payment-page-or-link">Online payments <i className="!text-[#e36a27]">↗</i></Link>
          <Link className="font-semibold !text-[#173c30] transition hover:!text-[#e36a27]" to="/services/google-business-profile-setup">Google presence <i className="!text-[#e36a27]">↗</i></Link>
          <Link className="font-semibold !text-[#173c30] transition hover:!text-[#e36a27]" to="/services/instagram-business-setup">Social profiles <i className="!text-[#e36a27]">↗</i></Link>
        </div>
      </nav>

      <section className="how-section !bg-[#fffaf0] !py-24" id="how">
        <div className="container">
          <div className="section-heading centered"><span className="eyebrow">A smoother way to get online</span><h2>Four steps. No tech headache.</h2><p>You bring the business details. We bring the setup, structure and launch support.</p></div>
          <div className="steps-grid">{steps.map(([icon, title, copy], index) => <article className="step-card !rounded-2xl !border-[#e6dfd1] !bg-white !p-6 !shadow-[0_10px_36px_rgba(31,53,42,0.05)]" key={title}><span className="step-count !text-[#b5a48d]">0{index + 1}</span><div className={`step-icon !h-12 !w-12 !rounded-2xl ${index % 2 ? '!bg-[#f5e3d2] !text-[#b34f20]' : '!bg-[#e5eee2] !text-[#315b3f]'}`}>{icon}</div><h3 className="!font-display !text-[#173c30]">{title}</h3><p>{copy}</p></article>)}</div>
          <div className="process-foot"><span className="process-line" /><span>We begin when your onboarding form is complete.</span><span className="process-line" /></div>
        </div>
      </section>

      <section className="packs-section !bg-[#f0eee5] !py-24" id="packs">
        <div className="container">
          <div className="section-heading section-heading-row"><div><span className="eyebrow">One-time setup</span><h2>Pick your starting point.</h2></div><p>Clear scope and upfront pricing, so you can choose with confidence.</p></div>
          <div className="pack-grid">{packs.map((pack, index) => <article className={`pack-card !rounded-[24px] !border-[#e4dfd2] !bg-[#fffdf7] !p-7 !shadow-[0_18px_45px_rgba(31,53,42,0.08)] ${index === 0 ? '!border-t-4 !border-t-[#e36a27]' : index === 2 ? '!border-t-4 !border-t-[#69865c]' : ''} ${pack.featured ? 'pack-featured !border-[#173c30] !bg-[#173c30] !text-[#fffaf0]' : ''}`} key={pack.name}>
            {pack.featured && <div className="featured-tag">MOST POPULAR</div>}<div className="pack-top"><span className="pack-label">{pack.label}</span><span className="pack-emoji">{pack.icon}</span></div>
            <h3>{pack.name}</h3><p className="pack-desc">{pack.description}</p><div className="pack-price">{money(pack.price)} <small>one time</small></div>
            <ul>{pack.includes.map(item => <li key={item}><Check size={14} /> {item}</li>)}</ul><div className="pack-delivery"><Check size={14} /> Target: {pack.delivery}</div>
            <button className={`button ${pack.featured ? 'button-primary' : 'button-outline'} pack-action`} onClick={() => openEnquiry(pack.name)}>{pack.button} <ArrowUpRight size={15} /></button>
          </article>)}</div>
          <p className="pricing-footnote">*Delivery targets begin after complete business details and required account approvals. Third-party verification can take longer. Domain, hosting, gateway and other third-party fees are billed separately.</p>
        </div>
      </section>

      <section className="showcase-section !bg-[#e7eee4] !py-24" id="examples">
        <div className="container">
          <div className="section-heading section-heading-row showcase-heading"><div><span className="eyebrow">Picture your business here</span><h2>Small screen. Big first impression.</h2></div><p>Practical, phone-first pages designed around how customers actually browse, ask and order.</p></div>
          <div className="preview-grid">{phonePreviews.map((preview, index) => <article className="preview-card" key={preview.type}>
            <div className={`phone phone-${preview.type}`}><div className="phone-notch" /><div className="phone-screen"><PhonePreview type={preview.type} /></div></div>
            <div className="preview-caption"><span>0{index + 1}</span><div><b>{preview.title}</b><small>{preview.caption}</small></div></div>
          </article>)}</div>
          <div className="business-browser !rounded-[28px] !border-[#d8e2d4] !bg-[#f8f7ef] !p-7 md:!p-12 !shadow-[0_22px_64px_rgba(30,62,43,0.09)]"><div className="business-head"><div><span className="eyebrow">Made for your kind of business</span><h3>What does your business do?</h3></div><div className="business-count"><b>{businesses.length}</b><span>business types</span></div></div>
            <div className="business-grid">{businesses.map(([name, icon, , fit], index) => <button type="button" key={name} className={`business-card !min-h-36 !rounded-2xl !border-[#e5e2d8] !bg-white !p-5 !shadow-[0_6px_18px_rgba(30,50,39,0.04)] hover:-translate-y-1! hover:!shadow-xl ${['!border-t-4 !border-t-[#e36a27]','!border-t-4 !border-t-[#7b91a0]','!border-t-4 !border-t-[#779166]','!border-t-4 !border-t-[#d5a64b]'][index % 4]}`} onClick={() => openEnquiry(`${name} business setup`, name)}><span className="business-emoji !text-2xl" aria-hidden="true">{icon}</span><b className="!font-display !text-[#173c30]">{name}</b><small>{fit}</small></button>)}</div>
            <p className="business-note">Each setup is adapted to your details, audience and the tools your business already uses.</p>
          </div>
        </div>
      </section>

      <section className="cta-section !bg-gradient-to-r !from-[#173c30] !via-[#265840] !to-[#b65328] !py-20 !text-white">
        <div className="container">
          <div className="cta-content">
            <h2 className="!text-white">A stronger digital presence starts here.</h2>
            <p className="!text-[#e3e9df]">Browse the services and ongoing care that make sense for your next chapter.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/services" className="button button-primary">View all services <ArrowUpRight size={15} /></Link>
              <Link to="/monthly" className="button button-outline">Monthly plans <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

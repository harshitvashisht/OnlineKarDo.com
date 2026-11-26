import { ArrowUpRight, Check, Clock3 } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'
import { SEO } from '../components/SEO'

const money = (value: number | string): string => `₹${Number(value).toLocaleString('en-IN')}`

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

export default function PacksPage() {
  const { openEnquiry } = useEnquiry()
  return (
    <div className="page-wrapper">
      <SEO
        title="Setup Packs — Fixed-Price Digital Packs | OnlineKarDo"
        description="Choose from 3 fixed-price digital packs: Starter (₹2,999), Business (₹4,999), Seller (₹6,999). Clear scope, upfront pricing, delivery in 48-72 hours."
        canonical="/packs"
      />
      <section className="page-hero page-hero--packs">
        <div className="container">
          <span className="eyebrow">One-time setup</span>
          <h1>Pick your starting point.</h1>
          <p className="hero-lede">Clear scope and upfront pricing, so you can choose with confidence.</p>
        </div>
      </section>

      <section className="packs-section">
        <div className="container">
          <div className="pack-grid">
            {packs.map(pack => (
              <article className={`pack-card ${pack.featured ? 'pack-featured' : ''}`} key={pack.name}>
                {pack.featured && <div className="featured-tag">MOST POPULAR</div>}
                <div className="pack-top">
                  <span className="pack-label">{pack.label}</span>
                  <span className="pack-emoji">{pack.icon}</span>
                </div>
                <h3>{pack.name}</h3>
                <p className="pack-desc">{pack.description}</p>
                <div className="pack-price">{money(pack.price)} <small>one time</small></div>
                <ul>
                  {pack.includes.map(item => <li key={item}><Check size={14} /> {item}</li>)}
                </ul>
                <div className="pack-delivery"><Clock3 size={14} /> Target: {pack.delivery}</div>
                <button className={`button ${pack.featured ? 'button-primary' : 'button-outline'} pack-action`} onClick={() => openEnquiry(pack.name)}>
                  {pack.button} <ArrowUpRight size={15} />
                </button>
              </article>
            ))}
          </div>
          <p className="pricing-footnote">*Delivery targets begin after complete business details and required account approvals. Third-party verification can take longer. Domain, hosting, gateway and other third-party fees are billed separately.</p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Want to build your own bundle?</h2>
            <p>Choose individual services à la carte or start with a pack and add what you need.</p>
            <button className="button button-primary" onClick={() => openEnquiry('Build your own bundle')}>
              View all services <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

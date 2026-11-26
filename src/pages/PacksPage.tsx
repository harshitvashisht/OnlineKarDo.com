import { ArrowUpRight, Check, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
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
      <section className="page-hero page-hero--packs !bg-[#f1e1ce] !py-24 md:!py-32">
        <div className="container !max-w-6xl !text-left">
          <span className="eyebrow !text-[#a94820]">One-time setup</span>
          <h1 className="!max-w-4xl !text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl">Pick your starting point.</h1>
          <p className="hero-lede !mx-0 !max-w-xl !text-lg !leading-relaxed !text-[#665c4d]">Clear scope and upfront pricing, so you can choose with confidence.</p>
        </div>
      </section>

      <section className="packs-section !bg-[#fffaf0] !py-24">
        <div className="container">
          <div className="pack-grid">
            {packs.map((pack, index) => (
              <article className={`pack-card !rounded-[24px] !border-[#e5dfd1] !border-t-4 !bg-white !p-7 !shadow-[0_14px_42px_rgba(35,52,39,0.08)] ${['!border-t-[#e36a27]','!border-t-[#779166]','!border-t-[#d5a64b]'][index]} ${pack.featured ? 'pack-featured !border-[#173c30] !bg-[#173c30] !text-[#fffaf0]' : ''}`} key={pack.name}>
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

      <section className="cta-section !bg-gradient-to-r !from-[#173c30] !to-[#285842] !py-20 !text-white">
        <div className="container">
          <div className="cta-content">
            <h2>Want to build your own bundle?</h2>
            <p>Choose individual services à la carte or start with a pack and add what you need.</p>
            <Link className="button button-primary" to="/services">
              View all services <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

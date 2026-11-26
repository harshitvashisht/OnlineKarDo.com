import { ArrowUpRight } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'
import { SEO } from '../components/SEO'

const money = (value: number | string): string => `₹${Number(value).toLocaleString('en-IN')}`

type MonthlyPlan = [string, number, string]
const monthlyPlans: MonthlyPlan[] = [
  ['Basic Care', 499, 'Uptime checks, backups and one minor content update.'],
  ['Social Lite', 999, 'Four template-based social posts each month.'],
  ['Social Growth', 1999, 'Eight posts, captions and scheduling.'],
  ['Digital Care Plus', 2999, 'Eight posts, website care and up to two minor updates.'],
]

export default function MonthlyPage() {
  const { openEnquiry } = useEnquiry()
  return (
    <div className="page-wrapper">
      <SEO
        title="Monthly Care Plans — Ongoing Support | OnlineKarDo"
        description="4 monthly plans from ₹499: Basic Care, Social Lite, Social Growth, Digital Care Plus. Website maintenance, social posts, content updates. Cancel anytime."
        canonical="/monthly"
      />
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Ongoing support</span>
          <h1>Keep things ticking along.</h1>
          <p className="hero-lede">Simple monthly help for updates and social posting. Choose what suits your rhythm.</p>
        </div>
      </section>

      <section className="monthly-section">
        <div className="container">
          <div className="monthly-grid">
            {monthlyPlans.map(([name, price, description], index) => (
              <article className="monthly-card" key={name}>
                <span className="monthly-num">0{index + 1} / CARE PLAN</span>
                <h3>{name}</h3>
                <div className="monthly-price">{money(price)} <small>/ month</small></div>
                <p>{description}</p>
                <button className="monthly-link" onClick={() => openEnquiry(`${name} monthly plan`)}>
                  Ask about this plan <ArrowUpRight size={14} />
                </button>
              </article>
            ))}
          </div>
          <p className="pricing-footnote monthly-note">Social plans cover creating and publishing template-based posts. They don't include ad management, daily customer replies or guaranteed leads, followers or sales.</p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need a one-time setup instead?</h2>
            <p>Our packs include everything to get your business online in about 48 hours.</p>
            <button className="button button-primary" onClick={() => openEnquiry('View setup packs')}>
              View setup packs <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
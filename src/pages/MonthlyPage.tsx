import { ArrowUpRight } from 'lucide-react'
import { useEnquiry } from '../context/EnquiryContext'
import { Link } from 'react-router-dom'
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
      <section className="page-hero page-hero--monthly !bg-[#e2ebec] !py-24 md:!py-32">
        <div className="container !max-w-6xl !text-left">
          <span className="eyebrow !text-[#087b87]">Ongoing support</span>
          <h1 className="!max-w-4xl !text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl">Your online presence,<br />well looked after.</h1>
          <p className="hero-lede !mx-0 !max-w-xl !text-lg !leading-relaxed !text-[#5d586b]">Thoughtful monthly help to keep your website fresh, your content moving and the little things taken care of.</p>
        </div>
      </section>

      <section className="monthly-section !bg-[#f7f6ef] !py-24">
        <div className="container">
          <div className="monthly-grid">
            {monthlyPlans.map(([name, price, description], index) => (
              <article className={`monthly-card !rounded-[22px] !border-[#dce4e2] !border-t-4 !bg-white !p-7 !shadow-[0_14px_42px_rgba(35,52,39,0.07)] ${['!border-t-[#4d7880]','!border-t-[#bc7952]','!border-t-[#789166]','!border-t-[#c39e48]'][index]}`} key={name}>
                <span className="monthly-num">0{index + 1} / CARE PLAN</span>
                <h3>{name}</h3>
                <div className="monthly-price">{money(price)} <small>/ month</small></div>
                <p>{description}</p>
                <button className="monthly-link !font-bold !text-[#087b87] hover:!text-[#cf4188]" onClick={() => openEnquiry(`${name} monthly plan`)}>
                  Ask about this plan <ArrowUpRight size={14} />
                </button>
              </article>
            ))}
          </div>
          <p className="pricing-footnote monthly-note">Social plans cover creating and publishing template-based posts. They don't include ad management, daily customer replies or guaranteed leads, followers or sales.</p>
        </div>
      </section>

      <section className="cta-section !bg-gradient-to-r !from-[#dfe9eb] !to-[#d9e5dd] !py-20">
        <div className="container">
          <div className="cta-content">
            <h2>Need a one-time setup instead?</h2>
            <p>Our packs include everything to get your business online in about 48 hours.</p>
            <Link className="button button-primary" to="/packs">
              View setup packs <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

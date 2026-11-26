import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'

type Step = [string, string, string]
const steps: Step[] = [
  ['↗', 'Pick your setup', 'Choose the pack that fits what your business needs right now.'],
  ['▤', 'Share your details', 'One onboarding form gathers your logo, photos, prices and contact info.'],
  ['✳', 'We build it', 'We adapt a proven template and set up the pieces in your pack.'],
  ['✓', 'Review and launch', 'Approve one consolidated revision, then share your new online home.'],
]

export default function HowItWorksPage() {
  return (
    <div className="page-wrapper">
      <SEO
        title="How It Works — 4 Steps to Get Online | OnlineKarDo"
        description="Four simple steps: pick a pack, share details, we build it, review and launch. Get your business online in about 48 hours with OnlineKarDo."
        canonical="/how"
      />
      <section className="page-hero page-hero--how !bg-[#e8ebdb] !py-24 md:!py-32">
        <div className="container !max-w-6xl !text-left">
          <span className="eyebrow !text-[#087b87]">A smoother way to get online</span>
          <h1 className="!max-w-4xl !text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl">Clear from day one.</h1>
          <p className="hero-lede !mx-0 !max-w-xl !text-lg !leading-relaxed !text-[#56604d]">A simple, guided process that takes your business from scattered details to a confident online presence.</p>
        </div>
      </section>

      <section className="how-section !bg-[#fffaf0] !py-24">
        <div className="container">
          <div className="steps-grid">
            {steps.map(([icon, title, copy], index) => (
              <article className="step-card !rounded-2xl !border-[#e5e1d6] !bg-white !p-7 !shadow-[0_12px_36px_rgba(35,52,39,0.06)]" key={title}>
                <span className="step-count">0{index + 1}</span>
                <div className="step-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="process-foot">
            <span className="process-line" />
            <span>We begin when your onboarding form is complete.</span>
            <span className="process-line" />
          </div>
        </div>
      </section>

      <section className="cta-section !bg-gradient-to-r !from-[#e8ebdb] !to-[#dfe8d9] !py-20">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to get started?</h2>
            <p>Pick a pack that fits your business and we'll guide you through the rest.</p>
            <Link to="/packs" className="button button-primary">
              Explore packs <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

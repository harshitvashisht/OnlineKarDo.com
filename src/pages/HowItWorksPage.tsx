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
      <section className="page-hero page-hero--how">
        <div className="container">
          <span className="eyebrow">A smoother way to get online</span>
          <h1>Four steps. No tech headache.</h1>
          <p className="hero-lede">You bring the business details. We bring the setup, structure and launch support.</p>
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <div className="steps-grid">
            {steps.map(([icon, title, copy], index) => (
              <article className="step-card" key={title}>
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

      <section className="cta-section">
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

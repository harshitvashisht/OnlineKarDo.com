import { Link } from 'react-router-dom'
import { SEO, FAQSchema } from '../components/SEO'

const faqs = [
  { question: 'What do I need to provide?', answer: 'Business name, contact details, logo if available, photos, products or services, prices, address, hours and access to relevant business accounts. We start after the onboarding form is complete.' },
  { question: 'Who owns my domain and what costs extra?', answer: 'Your domain is registered in your name. Domain registration, hosting, payment gateway charges and other third-party fees are billed separately from our setup fee.' },
  { question: 'How do payment features work?', answer: 'Payment Pages, Payment Links and catalogue features are different. We confirm what your approved merchant account supports before promising a checkout or ordering workflow.' },
  { question: "What isn't included in the listed price?", answer: 'Custom photography, video shoots, reels, ad campaign management, unlimited revisions and daily customer-message handling. Each setup pack includes one consolidated revision round.' },
  { question: 'Are there special requirements for some industries?', answer: 'Regulated businesses need appropriate licences and disclosures. Clinics must avoid treatment outcome claims; online medicine sales require the right pharmacy licence; property projects should display their RERA number; schools should take extra care with student data.' },
]

export default function FineprintPage() {
  return (
    <div className="page-wrapper">
      <SEO
        title="Good to Know — Important Details Before You Start | OnlineKarDo"
        description="Clear expectations: what you provide, domain ownership, payment features, what's not included, industry-specific requirements. Read before starting your project with OnlineKarDo."
        canonical="/fineprint"
      />
      <FAQSchema faqs={faqs} />
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">The useful details</span>
          <h1>Good to know<br />before we start.</h1>
          <p className="hero-lede">Clear expectations make a better project for everyone.</p>
        </div>
      </section>

      <section className="fineprint-section">
        <div className="container fineprint-wrap">
          <div className="fineprint-list">
            {faqs.map(({ question, answer }, index) => (
              <details key={question} open={index === 0}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to get started?</h2>
            <p>Pick a pack or browse individual services to begin.</p>
            <Link to="/packs" className="button button-primary">
              View setup packs <span style={{ display: 'inline-block', marginLeft: '8px' }}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
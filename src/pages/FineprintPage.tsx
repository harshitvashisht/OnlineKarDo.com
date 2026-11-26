import { Link } from 'react-router-dom'

export default function FineprintPage() {
  const items = [
    ['What do I need to provide?', 'Business name, contact details, logo if available, photos, products or services, prices, address, hours and access to relevant business accounts. We start after the onboarding form is complete.'],
    ['Who owns my domain and what costs extra?', 'Your domain is registered in your name. Domain registration, hosting, payment gateway charges and other third-party fees are billed separately from our setup fee.'],
    ['How do payment features work?', 'Payment Pages, Payment Links and catalogue features are different. We confirm what your approved merchant account supports before promising a checkout or ordering workflow.'],
    ['What isn&apos;t included in the listed price?', 'Custom photography, video shoots, reels, ad campaign management, unlimited revisions and daily customer-message handling. Each setup pack includes one consolidated revision round.'],
    ['Are there special requirements for some industries?', 'Regulated businesses need appropriate licences and disclosures. Clinics must avoid treatment outcome claims; online medicine sales require the right pharmacy licence; property projects should display their RERA number; schools should take extra care with student data.'],
  ]

  return (
    <div className="page-wrapper">
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
            {items.map(([question, answer], index) => (
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
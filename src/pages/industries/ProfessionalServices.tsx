import { Link } from 'react-router-dom'
import { ArrowUpRight, Briefcase, Shield, Users, FileText, Search, Star, Lock, Calendar } from 'lucide-react'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

const features = [
  { title: 'Credibility-First Design', description: 'Partner bios, case results, bar admissions, publications, trust badges above the fold.', icon: Shield },
  { title: 'Secure Client Intake', description: 'Encrypted forms, conflict check, document upload, e-sign, automated conflict letter.', icon: Lock },
  { title: 'Practice Area Pages (SEO)', description: 'Schema-rich service pages, FAQ schema, local landing pages, blog integration.', icon: Search },
  { title: 'Client Portal Gateway', description: 'SSO to Clio/MyCase/Filevine — branded login, document share, messaging, billing.', icon: Users },
  { title: 'Content & Thought Leadership', description: 'Articles, alerts, webinars, newsletters — category, author, schema, distribution.', icon: FileText },
  { title: 'Reputation & Reviews', description: 'Google/Avvo/Justia embed, review response templates, star schema, video testimonials.', icon: Star },
  { title: 'Accessibility & Compliance', description: 'WCAG 2.1 AA, ABA Model Rules advertising compliance, state bar rules.', icon: Briefcase },
  { title: 'Lead Qualification & Routing', description: 'Smart intake by practice area, geography, budget — CRM sync, conflict alert.', icon: Calendar },
]

const platforms = ['WordPress + Legal Plugins', 'Webflow + Secure Forms', 'Custom Next.js + Headless CMS', 'Clio Grow / MyCase / Lawmatics (config)']
const compliance = ['ABA Model Rules 7.1–7.4', 'State Bar Advertising Rules', 'WCAG 2.1 AA', 'GDPR/CCPA', 'Client Confidentiality']
const integrations = ['PMS (Clio, MyCase, Filevine, Actionstep)', 'DocuSign/Adobe Sign', 'Google Business Profile', 'Meta CAPI', 'CallRail', 'Zapier/Make']

const stats = [
  { value: 'ABA Compliant', label: 'Advertising rules' },
  { value: 'WCAG AA', label: 'Accessible by default' },
  { value: 'PMS Integrated', label: 'Clio, MyCase, Filevine' },
  { value: 'Conflict-Safe', label: 'Intake with checks' },
]

const process = [
  { step: '01', title: 'Compliance & Brand Audit', description: 'State bar rules review, current site risk assessment, competitor positioning.' },
  { step: '02', title: 'Content Strategy & IA', description: 'Practice area mapping, attorney bio structure, case result taxonomy, FAQ schema.' },
  { step: '03', title: 'Design System & Trust Signals', description: 'Typography, color, partner cards, case results, bar badges, client logos.' },
  { step: '04', title: 'Build, PMS & Secure Forms', description: 'Encrypted intake, conflict check API, e-sign, PMS sync, reCAPTCHA/hCaptcha.' },
  { step: '05', title: 'Launch & Ethics Review', description: 'State bar compliance check, 301s, Search Console, 30-day monitoring, staff training.' },
]

const faq = [
  { q: 'Do you know my state bar rules?', a: 'We build to ABA Model Rules 7.1–7.4 as baseline and research your jurisdiction\'s specific rules (NY, CA, TX, FL, etc.). Legal review by your counsel recommended.' },
  { q: 'Can you integrate with Clio/MyCase?', a: 'Yes — Clio Grow API, MyCase webhooks, Filevine. We sync contacts, matters, documents, and trigger intake workflows.' },
  { q: 'How do you handle conflict checks?', a: 'Intake form queries your PMS via API before submission. If conflict, auto-decline with polite message. Manual review queue for edge cases.' },
  { q: 'What about client confidentiality?', a: 'No PHI/PII stored on marketing server. Forms encrypt in transit (TLS 1.3) and at rest (AES-256). PMS is system of record. We sign NDA/BAA.' },
  { q: 'Can you write legal content?', a: 'We structure and optimize. Your attorneys provide raw insights; we edit for web readability, SEO, and compliance. Ongoing content retainer available.' },
]

export default function ProfessionalServicesPage() {
  const { openEnquiry } = useEnquiry()

  return (
    <div className="page-wrapper">
      <SEO
        title="Professional Services — Law, Accounting, Advisory Websites | OnlineKarDo"
        description="Credibility-first websites for law firms, accountants, advisors. Secure client intake, PMS integration, ABA-compliant, WCAG AA. Practice area SEO, client portal SSO."
        canonical="/industries/professional-services"
      />

      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ background: 'url(/assets/industries/law-office.jpg) center/cover' }} />
        <div className="relative z-10 container">
          <div className="max-w-4xl">
            <span className="eyebrow" style={{ color: '#6b7280' }}>Industry · Professional Services</span>
            <h1 className="!text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl mt-4 text-[#102a3d]">Trust earned in seconds, intake that converts</h1>
            <p className="text-xl mt-6 text-[#5d6962] max-w-xl">Credibility-first design, secure client intake, content structured for AI-driven discovery for law firms, accountants, and advisory practices.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="button button-primary !rounded-full !px-6 !py-4" style={{ background: '#6b7280' }} onClick={() => openEnquiry('Professional Services')}>Get a free audit <ArrowUpRight size={15} /></button>
              <Link to="/services" className="button button-outline !rounded-full !px-6 !py-4 border-[#6b7280] text-[#6b7280] hover:bg-[#f3f4f6]">Explore services <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: '#f3f4f6' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-[#6b7280]">{s.value}</div>
                <div className="text-sm text-[#5d6962] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#6b7280' }}>What we build</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Every feature, built for credibility and qualified leads</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <article key={i} className="bg-[#f3f4f6] rounded-[22px] p-6 border border-[#e5e7eb] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl mb-4" style={{ background: '#e5e7eb' }}><f.icon size={24} className="text-[#6b7280]" /></div>
                <h3 className="text-xl font-bold text-[#102a3d] mb-2">{f.title}</h3>
                <p className="text-[#5d6962]">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#f3f4f6' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#102a3d] mb-6">Platforms we build on</h3>
              <ul className="space-y-3">
                {platforms.map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#6b7280' }} />
                    <span className="text-[#5d6962]">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#102a3d] mb-6">Compliance & Standards</h3>
              <ul className="space-y-3">
                {compliance.map((c, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#6b7280' }} />
                    <span className="text-[#5d6962]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#102a3d] mb-6">Key Integrations</h3>
              <ul className="space-y-3">
                {integrations.map((i, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#6b7280' }} />
                    <span className="text-[#5d6962]">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#6b7280' }}>Our process</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">From audit to compliant launch in 5 steps</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#6b7280]33 to-transparent" />
            {process.map((p, i) => (
              <div key={i} className="relative pl-20 pb-12 last:pb-0">
                <div className="absolute left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#6b7280]">{p.step}</div>
                <div className="bg-[#f3f4f6] rounded-[16px] p-6 border-l-4 border-[#6b7280]">
                  <h3 className="text-lg font-bold text-[#102a3d] mb-2">{p.title}</h3>
                  <p className="text-[#5d6962]">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#f3f4f6' }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#6b7280' }}>Questions</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Straight answers</h2>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-[16px] border border-[#e5e7eb] overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-[#102a3d] pr-8">{f.q}</h3>
                  <ArrowUpRight size={20} className="text-[#5d6962] group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-[#5d6962] leading-relaxed border-t border-[#e5e7eb]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' }}>
        <div className="container text-center">
          <span className="eyebrow !text-white/80">Ready to build</span>
          <h2 className="!text-4xl md:!text-5xl !font-display !tracking-[-.05em] !text-white mt-2 mb-4">A website that earns trust before the first handshake</h2>
          <p className="!text-white/80 !text-lg mb-8 max-w-xl mx-auto">Free audit, fixed scope, dedicated team. No surprises.</p>
          <button className="button button-white !rounded-full !px-8 !py-4 text-lg" onClick={() => openEnquiry('Professional Services')}>Start my free audit <ArrowUpRight size={15} /></button>
        </div>
      </section>
    </div>
  )
}
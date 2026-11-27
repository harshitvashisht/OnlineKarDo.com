import { Link } from 'react-router-dom'
import { ArrowUpRight, Shield, Users, Calendar, FileText, Search, Star, Smartphone, Lock } from 'lucide-react'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

const features = [
  { title: 'HIPAA-Compliant Architecture', description: 'BAA-ready hosting, encrypted PHI at rest/in transit, audit logs, access controls.', icon: Shield },
  { title: 'WCAG 2.1 AA Accessibility', description: 'Semantic HTML, ARIA, color contrast, keyboard nav, screen-reader tested, VPAT.', icon: Users },
  { title: 'Patient-First Appointment Flow', description: 'Real-time availability, intake forms, insurance capture, reminders (SMS/Email/WhatsApp).', icon: Calendar },
  { title: 'Provider & Location Directory', description: 'Filterable by specialty, insurance, language, distance; schema-rich for local SEO.', icon: Search },
  { title: 'Secure Patient Portal Links', description: 'SSO to EHR portal, test results, messaging, bill pay — branded, not iframe.', icon: Lock },
  { title: 'Content & Education Hub', description: 'Condition library, blog, video, FAQ — structured data for rich results.', icon: FileText },
  { title: 'Reputation & Reviews', description: 'Google/Facebook/Healthgrades embed, review response templates, star schema.', icon: Star },
  { title: 'Mobile-First & Fast', description: 'Core Web Vitals <2.5s LCP, PWA for offline forms, click-to-call, maps.', icon: Smartphone },
]

const platforms = ['WordPress + HIPAA Hosting', 'Webflow + Compliant Add-ons', 'Custom Next.js/React (Vercel/AWS)', 'Headless CMS (Sanity/Contentful)']
const compliance = ['HIPAA', 'HITRUST (optional)', 'WCAG 2.1 AA', 'Section 504', 'State Privacy Laws']
const integrations = ['EHR/EMR (Epic, Cerner, Athena)', 'Patient Portal SSO', 'Google Business Profile', 'Meta CAPI', 'CallRail', 'Formstack HIPAA']

const stats = [
  { value: 'HIPAA + WCAG', label: 'Dual compliance' },
  { value: '<2.5s', label: 'LCP target' },
  { value: 'Section 504', label: 'Deadline ready' },
  { value: 'BAA-ready', label: 'Hosting partners' },
]

const process = [
  { step: '01', title: 'Compliance Discovery', description: 'PHI flow map, risk assessment, BAA vendor review, accessibility audit baseline.' },
  { step: '02', title: 'Architecture & IA', description: 'Content model for providers/locations/services, consent flows, portal SSO design.' },
  { step: '03', title: 'Design System', description: 'Accessible components (WCAG AA), trust signals, provider cards, appointment CTA.' },
  { step: '04', title: 'Build & Harden', description: 'HIPAA hosting, encryption, WAF, audit logging, automated accessibility regression tests.' },
  { step: '05', title: 'Validate & Launch', description: 'Third-party penetration test, VPAT, 301s, Search Console, 30-day monitoring.' },
]

const faq = [
  { q: 'Do you sign a BAA?', a: 'Yes — we sign BAAs with covered entities and ensure all subcontractors (hosting, forms, analytics) execute BAAs. We maintain a vendor register.' },
  { q: 'Can you integrate with our EHR?', a: 'We build the front-end portal link (SSO/OAuth) to your patient portal (Epic MyChart, Cerner HealtheLife, Athena). We do not store PHI on the marketing site.' },
  { q: 'What about Section 504 / WCAG deadline?', a: 'We build to WCAG 2.1 AA by default. Our component library is tested with axe-core, NVDA, VoiceOver. VPAT available on request.' },
  { q: 'Can you migrate our existing site?', a: 'Yes — content migration, 301 redirects, PHI-free audit. We strip any accidental PHI from old CMS during migration.' },
  { q: 'Do you use Google Analytics?', a: 'We configure GA4 with IP anonymization, no PHI in events, and a BAA with Google. Alternative: Matomo/Plausible for zero-PHI analytics.' },
]

export default function HealthcarePage() {
  const { openEnquiry } = useEnquiry()

  return (
    <div className="page-wrapper">
      <SEO
        title="Healthcare — HIPAA & WCAG Compliant Websites | OnlineKarDo"
        description="Patient-facing websites for clinics, hospitals, practices. HIPAA + WCAG 2.1 AA dual compliance. Appointment booking, provider directory, patient portal SSO. Section 504 ready."
        canonical="/industries/healthcare"
      />

      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #eff6fa 0%, #dceef8 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ background: 'url(/assets/industries/clinic.jpg) center/cover' }} />
        <div className="relative z-10 container">
          <div className="max-w-4xl">
            <span className="eyebrow" style={{ color: '#7b91a0' }}>Industry · Healthcare</span>
            <h1 className="!text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl mt-4 text-[#102a3d]">Two compliance layers at once: HIPAA and accessibility</h1>
            <p className="text-xl mt-6 text-[#5d6962] max-w-xl">Patient-facing sites that satisfy HIPAA and ADA/WCAG 2.1 AA together, ahead of federal Section 504 deadlines. We build clinic, hospital, and practice sites that earn trust and convert.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="button button-primary !rounded-full !px-6 !py-4" style={{ background: '#7b91a0' }} onClick={() => openEnquiry('Healthcare')}>Get a free audit <ArrowUpRight size={15} /></button>
              <Link to="/services" className="button button-outline !rounded-full !px-6 !py-4 border-[#7b91a0] text-[#7b91a0] hover:bg-[#eff6fa]">Explore services <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: '#eff6fa' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-[#7b91a0]">{s.value}</div>
                <div className="text-sm text-[#5d6962] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#7b91a0' }}>What we build</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Every feature, built for trust and compliance</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <article key={i} className="bg-[#f0f5fa] rounded-[22px] p-6 border border-[#dceef8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl mb-4" style={{ background: '#eff6fa' }}><f.icon size={24} className="text-[#7b91a0]" /></div>
                <h3 className="text-xl font-bold text-[#102a3d] mb-2">{f.title}</h3>
                <p className="text-[#5d6962]">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#eff6fa' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#102a3d] mb-6">Platforms we build on</h3>
              <ul className="space-y-3">
                {platforms.map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#7b91a0' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#7b91a0' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#7b91a0' }} />
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
            <span className="eyebrow" style={{ color: '#7b91a0' }}>Our process</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">From audit to compliant launch in 5 steps</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#7b91a0]33 to-transparent" />
            {process.map((p, i) => (
              <div key={i} className="relative pl-20 pb-12 last:pb-0">
                <div className="absolute left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#7b91a0]">{p.step}</div>
                <div className="bg-[#f0f5fa] rounded-[16px] p-6 border-l-4 border-[#7b91a0]">
                  <h3 className="text-lg font-bold text-[#102a3d] mb-2">{p.title}</h3>
                  <p className="text-[#5d6962]">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#eff6fa' }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#7b91a0' }}>Questions</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Straight answers</h2>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-[16px] border border-[#dceef8] overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-[#102a3d] pr-8">{f.q}</h3>
                  <ArrowUpRight size={20} className="text-[#5d6962] group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-[#5d6962] leading-relaxed border-t border-[#dceef8]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(135deg, #7b91a0 0%, #5a7a8a 100%)' }}>
        <div className="container text-center">
          <span className="eyebrow !text-white/80">Ready to build</span>
          <h2 className="!text-4xl md:!text-5xl !font-display !tracking-[-.05em] !text-white mt-2 mb-4">Launch a compliant healthcare site with a partner who knows the rules</h2>
          <p className="!text-white/80 !text-lg mb-8 max-w-xl mx-auto">Free audit, fixed scope, dedicated team. No surprises.</p>
          <button className="button button-white !rounded-full !px-8 !py-4 text-lg" onClick={() => openEnquiry('Healthcare')}>Start my free audit <ArrowUpRight size={15} /></button>
        </div>
      </section>
    </div>
  )
}
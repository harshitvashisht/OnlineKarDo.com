import { Link } from 'react-router-dom'
import { ArrowUpRight, Star, Users, FileText, Search, Target, Globe } from 'lucide-react'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

const features = [
  { title: 'Authority Positioning', description: 'Niche manifesto, differentiation map, buyer journey, proof architecture — homepage to footer.', icon: Target },
  { title: 'Case Studies That Close', description: 'Problem → Approach → Result → Metrics — structured data, PDF download, video testimonial.', icon: FileText },
  { title: 'Thought Leadership Engine', description: 'Article system, insights hub, whitepaper gating, newsletter, speaking/events schema.', icon: Star },
  { title: 'High-Value Lead Qualification', description: 'Multi-step diagnostic, budget/timeline gates, Calendly/HubSpot sync, territory routing.', icon: Users },
  { title: 'Service Architecture Pages', description: 'Offer ladder (diagnostic → implementation → retainer), scope, outcomes, investment guide.', icon: Target },
  { title: 'Speaker & Media Kit', description: 'Bio variants, topics, headshots, past talks, press, download kit — one URL for organizers.', icon: Star },
  { title: 'SEO for Executive Search', description: 'Long-tail "fractional CFO", "SAP implementation partner" — schema, clusters, intent.', icon: Search },
  { title: 'Global & Multi-Language', description: 'EN/DE/FR/JP — hreflang, regional case studies, currency, compliance, local partners.', icon: Globe },
]

const platforms = ['WordPress + Custom Theme', 'Webflow + CMS', 'Custom Next.js/React (Vercel)', 'Framer (marketing-led)']
const compliance = ['GDPR', 'CCPA', 'Industry Regulations (FINRA, HIPAA if applicable)', 'WCAG 2.1 AA', 'Data Processing Agreements']
const integrations = ['CRM (HubSpot, Salesforce, Pipedrive)', 'Calendly/Cal.com', 'Marketo/Braze/Klaviyo', 'Analytics (GA4, Meta CAPI, LinkedIn Insight)', 'Zoom/Calendly', 'DocuSign']

const stats = [
  { value: 'Authority-First', label: 'Positioning design' },
  { value: 'Executive SEO', label: 'High-intent keywords' },
  { value: 'Lead-Qualified', label: 'Diagnostic gates' },
  { value: 'Global-Ready', label: 'Multi-language' },
]

const process = [
  { step: '01', title: 'Positioning Workshop', description: 'Niche definition, ideal client profile, differentiation, proof inventory, offer ladder.' },
  { step: '02', title: 'Content Architecture', description: 'Case study templates, insight pillars, service pages, lead magnets, keyword clusters.' },
  { step: '03', title: 'Design System & Authority Signals', description: 'Typography, data viz style, client logos, media mentions, speaker kit, trust badges.' },
  { step: '04', title: 'Build, CRM & Automation', description: 'Diagnostic forms, Calendly, CRM sync, nurture sequences, lead scoring, GA4 events.' },
  { step: '05', title: 'Launch & Authority Growth', description: '301s, Search Console, LinkedIn pixel, content calendar, quarterly insight publishing.' },
]

const faq = [
  { q: 'Do you help define our positioning?', a: 'Yes — the workshop (Step 1) is a facilitated 2-hour session: niche, ICP, differentiation, proof, offer ladder. Output = positioning doc + site map.' },
  { q: 'Can you write our case studies?', a: 'We structure the template (Challenge → Approach → Result → Metrics). Your team provides raw data; we edit for narrative arc, metrics, and SEO.' },
  { q: 'What about confidential client work?', a: 'We build anonymization templates: "Fortune 500 retailer", "Mid-market SaaS", "Healthcare system". Redaction checklist included.' },
  { q: 'Do you handle international sites?', a: 'Yes — hreflang, regional content strategy, currency, compliance (GDPR, Schrems II), local hosting/CDN. Multi-CMS or single CMS with locale.' },
  { q: 'Can you set up LinkedIn Ads tracking?', a: 'Yes — LinkedIn Insight Tag, conversion events (form submit, demo booked), matched audiences, retargeting lists. GA4 + LinkedIn CAPI.' },
]

export default function ConsultingPage() {
  const { openEnquiry } = useEnquiry()

  return (
    <div className="page-wrapper">
      <SEO
        title="Consulting — Authority Websites for High-Value Engagements | OnlineKarDo"
        description="Websites for consulting firms: positioning, case studies, thought leadership, qualified leads. Fractional CxO, strategy, implementation, advisory. Executive SEO, global-ready."
        canonical="/industries/consulting"
      />

      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #ede0ff 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ background: 'url(/assets/industries/strategy.jpg) center/cover' }} />
        <div className="relative z-10 container">
          <div className="max-w-4xl">
            <span className="eyebrow" style={{ color: '#8b5cf6' }}>Industry · Consulting</span>
            <h1 className="!text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl mt-4 text-[#102a3d]">Authority that wins the high-value engagement</h1>
            <p className="text-xl mt-6 text-[#5d6962] max-w-xl">Positioning, proof, and citable thought-leadership that make a serious buyer — and the AI shortlisting them — treat you as the obvious choice. New firm site or a rebrand-and-rebuild.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="button button-primary !rounded-full !px-6 !py-4" style={{ background: '#8b5cf6' }} onClick={() => openEnquiry('Consulting')}>Get a free audit <ArrowUpRight size={15} /></button>
              <Link to="/services" className="button button-outline !rounded-full !px-6 !py-4 border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#f5f0ff]">Explore services <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: '#f5f0ff' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-[#8b5cf6]">{s.value}</div>
                <div className="text-sm text-[#5d6962] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#8b5cf6' }}>What we build</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Every feature, built for authority that converts</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <article key={i} className="bg-[#f5f0ff] rounded-[22px] p-6 border border-[#ede0ff] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl mb-4" style={{ background: '#f5f0ff' }}><f.icon size={24} className="text-[#8b5cf6]" /></div>
                <h3 className="text-xl font-bold text-[#102a3d] mb-2">{f.title}</h3>
                <p className="text-[#5d6962]">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#f5f0ff' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#102a3d] mb-6">Platforms we build on</h3>
              <ul className="space-y-3">
                {platforms.map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#8b5cf6' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#8b5cf6' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#8b5cf6' }} />
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
            <span className="eyebrow" style={{ color: '#8b5cf6' }}>Our process</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">From positioning to pipeline in 5 steps</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#8b5cf6]33 to-transparent" />
            {process.map((p, i) => (
              <div key={i} className="relative pl-20 pb-12 last:pb-0">
                <div className="absolute left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#8b5cf6]">{p.step}</div>
                <div className="bg-[#f5f0ff] rounded-[16px] p-6 border-l-4 border-[#8b5cf6]">
                  <h3 className="text-lg font-bold text-[#102a3d] mb-2">{p.title}</h3>
                  <p className="text-[#5d6962]">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#f5f0ff' }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#8b5cf6' }}>Questions</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Straight answers</h2>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-[16px] border border-[#ede0ff] overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-[#102a3d] pr-8">{f.q}</h3>
                  <ArrowUpRight size={20} className="text-[#5d6962] group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-[#5d6962] leading-relaxed border-t border-[#ede0ff]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
        <div className="container text-center">
          <span className="eyebrow !text-white/80">Ready to build</span>
          <h2 className="!text-4xl md:!text-5xl !font-display !tracking-[-.05em] !text-white mt-2 mb-4">Be the obvious choice for your ideal client</h2>
          <p className="!text-white/80 !text-lg mb-8 max-w-xl mx-auto">Free audit, fixed scope, dedicated team. No surprises.</p>
          <button className="button button-white !rounded-full !px-8 !py-4 text-lg" onClick={() => openEnquiry('Consulting')}>Start my free audit <ArrowUpRight size={15} /></button>
        </div>
      </section>
    </div>
  )
}
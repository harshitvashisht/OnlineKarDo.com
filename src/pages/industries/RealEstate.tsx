import { Link } from 'react-router-dom'
import { ArrowUpRight, House, MapPin, Search, Users, Smartphone, Image, Layers, Globe } from 'lucide-react'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

const features = [
  { title: 'Live IDX/MLS Integration', description: 'RESO Web API, RETS, or FTP — real-time listings, status sync, office/agent attribution.', icon: House },
  { title: 'Advanced Property Search', description: 'Map + list, polygon draw, saved searches, alerts, URL-state for sharing, SEO-friendly.', icon: Search },
  { title: 'Listing Detail That Converts', description: 'Gallery, virtual tour, floor plans, neighborhood data, schools, walk score, lead forms.', icon: Image },
  { title: 'Agent & Office Profiles', description: 'Bio, photo, listings, reviews, social, contact — schema-rich for agent search.', icon: Users },
  { title: 'Lead Capture & Routing', description: 'Smart forms, chat, click-to-call, WhatsApp, round-robin or territory assignment.', icon: Smartphone },
  { title: 'Market Reports & Valuation', description: 'Automated CMA, neighborhood trends, price history — lead magnet with capture.', icon: Layers },
  { title: 'Local SEO & Area Pages', description: 'City/neighborhood/subdivision landing pages, schema, internal linking, GBP sync.', icon: MapPin },
  { title: 'Multi-Language & International', description: 'EN/ES/PT/CH — hreflang, currency, measurement, IDX feed per market.', icon: Globe },
]

const platforms = ['WordPress + IDX Plugins (dsIDXpress, iHomefinder)', 'Custom React/Next.js + RESO Web API', 'Webflow + Custom IDX Integration', 'Sierra Interactive, kvCORE (configuration)']
const compliance = ['RESO Web API Standards', 'Fair Housing Act', 'MLS Rules & Display Compliance', 'GDPR/CCPA', 'State License Law']
const integrations = ['CRM (Follow Up Boss, LionDesk, KVCore)', 'Marketing (BombBomb, Mailchimp)', 'Analytics (GA4, Meta CAPI)', 'ShowingTime, Dotloop', 'Google Business Profile']

const stats = [
  { value: 'Live IDX', label: 'Real-time listings' },
  { value: 'RESO API', label: 'Modern standard' },
  { value: 'Crawlable', label: 'SEO-friendly pages' },
  { value: 'CRM-wired', label: 'Lead routing' },
]

const process = [
  { step: '01', title: 'MLS & Vendor Audit', description: 'RESO feed access, RETS credentials, vendor contract review, compliance checklist.' },
  { step: '02', title: 'Search & Taxonomy Design', description: 'Filter hierarchy, saved search UX, map bounds, URL structure, SEO slugs.' },
  { step: '03', title: 'Listing Detail & Lead Flow', description: 'PDP components, CTA placement, form fields, routing rules, CRM mapping.' },
  { step: '04', title: 'Build, Sync & QA', description: 'Feed ingestion, cron jobs, image optimization, compliance audit, load testing.' },
  { step: '05', title: 'Launch & Optimize', description: '301s, Search Console, GA4 events, heatmaps, A/B test CTA placements.' },
]

const faq = [
  { q: 'Which IDX vendor do you recommend?', a: 'RESO Web API direct (no iframe) for SEO and speed. We work with any RESO-compliant feed. For WordPress: dsIDXpress or iHomefinder. For custom: direct API integration.' },
  { q: 'Can you do franchise/brokerage multi-office?', a: 'Yes — office/agent hierarchy, roster sync, office landing pages, territory-based lead routing, franchise brand compliance.' },
  { q: 'Are listings crawlable by Google?', a: 'Yes — server-side rendered or static-generated pages with full schema (RealEstateListing, Offer, Place). No iframe SEO black holes.' },
  { q: 'How do you handle lead routing?', a: 'Round-robin, territory, agent-claim, or pond. Integrated with Follow Up Boss, LionDesk, KVCore, or custom CRM via webhook.' },
  { q: 'What about MLS compliance?', a: 'We follow MLS display rules: logo, disclaimer, listing attribution, status accuracy, no co-mingling. Audit included.' },
]

export default function RealEstatePage() {
  const { openEnquiry } = useEnquiry()

  return (
    <div className="page-wrapper">
      <SEO
        title="Real Estate — IDX/MLS Websites, Listings & Lead Capture | OnlineKarDo"
        description="Modern real estate websites with live IDX/MLS integration (RESO Web API), crawlable listings, advanced search, lead capture, CRM wiring. Brokerage, agent, franchise."
        canonical="/industries/real-estate"
      />

      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #ecf4e8 0%, #d9e8d0 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ background: 'url(/assets/industries/property.jpg) center/cover' }} />
        <div className="relative z-10 container">
          <div className="max-w-4xl">
            <span className="eyebrow" style={{ color: '#779166' }}>Industry · Real Estate</span>
            <h1 className="!text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl mt-4 text-[#102a3d]">Live listings, crawlable pages, instant lead capture</h1>
            <p className="text-xl mt-6 text-[#5d6962] max-w-xl">IDX/MLS integration on the modern RESO Web API, search-friendly listing pages, and fast mobile lead capture wired to your CRM. New brokerage site or a rebuild of one that never generated a lead.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="button button-primary !rounded-full !px-6 !py-4" style={{ background: '#779166' }} onClick={() => openEnquiry('Real Estate')}>Get a free audit <ArrowUpRight size={15} /></button>
              <Link to="/services" className="button button-outline !rounded-full !px-6 !py-4 border-[#779166] text-[#779166] hover:bg-[#ecf4e8]">Explore services <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: '#ecf4e8' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-[#779166]">{s.value}</div>
                <div className="text-sm text-[#5d6962] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#779166' }}>What we build</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Every feature, built for listings that rank and leads that convert</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <article key={i} className="bg-[#f0f5ed] rounded-[22px] p-6 border border-[#d9e8d0] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl mb-4" style={{ background: '#ecf4e8' }}><f.icon size={24} className="text-[#779166]" /></div>
                <h3 className="text-xl font-bold text-[#102a3d] mb-2">{f.title}</h3>
                <p className="text-[#5d6962]">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#ecf4e8' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#102a3d] mb-6">Platforms we build on</h3>
              <ul className="space-y-3">
                {platforms.map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#779166' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#779166' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#779166' }} />
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
            <span className="eyebrow" style={{ color: '#779166' }}>Our process</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">From feed to live listings in 5 steps</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#779166]33 to-transparent" />
            {process.map((p, i) => (
              <div key={i} className="relative pl-20 pb-12 last:pb-0">
                <div className="absolute left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#779166]">{p.step}</div>
                <div className="bg-[#f0f5ed] rounded-[16px] p-6 border-l-4 border-[#779166]">
                  <h3 className="text-lg font-bold text-[#102a3d] mb-2">{p.title}</h3>
                  <p className="text-[#5d6962]">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#ecf4e8' }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#779166' }}>Questions</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Straight answers</h2>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-[16px] border border-[#d9e8d0] overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-[#102a3d] pr-8">{f.q}</h3>
                  <ArrowUpRight size={20} className="text-[#5d6962] group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-[#5d6962] leading-relaxed border-t border-[#d9e8d0]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(135deg, #779166 0%, #5a7a52 100%)' }}>
        <div className="container text-center">
          <span className="eyebrow !text-white/80">Ready to build</span>
          <h2 className="!text-4xl md:!text-5xl !font-display !tracking-[-.05em] !text-white mt-2 mb-4">Launch a listing site that ranks and converts</h2>
          <p className="!text-white/80 !text-lg mb-8 max-w-xl mx-auto">Free audit, fixed scope, dedicated team. No surprises.</p>
          <button className="button button-white !rounded-full !px-8 !py-4 text-lg" onClick={() => openEnquiry('Real Estate')}>Start my free audit <ArrowUpRight size={15} /></button>
        </div>
      </section>
    </div>
  )
}
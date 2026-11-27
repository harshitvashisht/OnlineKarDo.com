import { Link } from 'react-router-dom'
import { ArrowUpRight, GraduationCap, Users, Calendar, Star, Shield, Globe, Play } from 'lucide-react'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

const features = [
  { title: 'Course & Programme Catalogue', description: 'Filterable by level, format, duration, fee, eligibility — schema-rich for search.', icon: GraduationCap },
  { title: 'Admissions & Enquiry Funnels', description: 'Multi-step forms, document upload, fee payment, status tracker, WhatsApp/Email/SMS.', icon: Users },
  { title: 'LMS Integration / Member Area', description: 'Moodle/LearnDash/TalentLMS SSO — course player, progress, certificates, discussions.', icon: Play },
  { title: 'Faculty & Research Showcase', description: 'Profiles, publications, grants, PhD supervision, video intros — schema for E-E-A-T.', icon: Star },
  { title: 'Events & Open Days', description: 'Calendar, registration, reminders, waitlist, virtual/hybrid, analytics, CRM sync.', icon: Calendar },
  { title: 'Alumni & Giving Portal', description: 'Directory, mentorship, donations, events, news, volunteer — SSO with CRM.', icon: Users },
  { title: 'Compliance & Accessibility', description: 'WCAG 2.1 AA, FERPA, COPPA, UGC/AICTE/NAAC mandates, multi-language.', icon: Shield },
  { title: 'International Student Journey', description: 'Visa guide, fee calculator, scholarship finder, agent portal, multi-currency.', icon: Globe },
]

const platforms = ['WordPress + LearnDash/TutorLMS', 'Custom Next.js + Headless LMS', 'Webflow + Memberstack/Wized', 'Moodle/Totara (theme + integration)']
const compliance = ['FERPA', 'COPPA', 'WCAG 2.1 AA', 'UGC/AICTE/NAAC', 'State Education Dept.', 'GDPR (intl students)']
const integrations = ['LMS (Moodle, Canvas, TalentLMS)', 'CRM (Salesforce, HubSpot, Slate)', 'Payment (Razorpay, Stripe, Flywire)', 'WhatsApp Business', 'Zoom/Teams', 'Google/Meta Analytics']

const stats = [
  { value: 'FERPA/COPPA', label: 'Student privacy' },
  { value: 'WCAG AA', label: 'Accessible' },
  { value: 'LMS-Ready', label: 'SSO integration' },
  { value: 'Multi-Currency', label: 'Intl admissions' },
]

const process = [
  { step: '01', title: 'Stakeholder Discovery', description: 'Registrar, marketing, IT, faculty, alumni — map journeys: prospective → enrolled → alumni.' },
  { step: '02', title: 'Content & IA Audit', description: 'Programme taxonomy, faculty bios, research, admissions flows, event calendar, alumni stories.' },
  { step: '03', title: 'Design System & Compliance', description: 'Brand, accessibility (WCAG AA), FERPA/COPPA patterns, multi-language, component library.' },
  { step: '04', title: 'Build, LMS & CRM Sync', description: 'Catalogue, admissions forms, payment, LMS SSO, CRM (Slate/Salesforce), analytics, email.' },
  { step: '05', title: 'Launch, Train & Optimize', description: 'Staff CMS training, student UAT, Search Console, GA4 events, heatmaps, A/B tests.' },
]

const faq = [
  { q: 'Can you integrate with our LMS (Moodle/Canvas)?', a: 'Yes — SSO (SAML/OIDC/LTI), course deep links, grade passback, enrollment sync. We support Moodle, Canvas, TalentLMS, Blackboard, D2L.' },
  { q: 'How do you handle student data privacy (FERPA/COPPA)?', a: 'No student records on marketing server. Forms encrypt to CRM/SIS. Consent management for under-13 (COPPA). FERPA directory opt-out honored.' },
  { q: 'Can you build a parent portal?', a: 'Yes — separate auth, linked to student record, fee payment, grades, attendance, communication prefs. Role-based access.' },
  { q: 'What about international admissions?', a: 'Multi-currency (Flywire/Stripe), visa docs checklist, agent portal, scholarship finder, English test tracker, geo-IP content.' },
  { q: 'Do you meet UGC/NAAC website mandates?', a: 'We map mandatory disclosures (faculty, fees, infrastructure, NIRF, AQAR) to structured pages with schema. Annual update workflow included.' },
]

export default function EducationTrainingPage() {
  const { openEnquiry } = useEnquiry()

  return (
    <div className="page-wrapper">
      <SEO
        title="Education & Training — School, Coaching, EdTech Websites | OnlineKarDo"
        description="Websites for schools, coaching centres, ed-tech: programme catalogues, admissions funnels, LMS integration, faculty showcase, alumni portals. FERPA, COPPA, WCAG AA, UGC/NAAC compliant."
        canonical="/industries/education-training"
      />

      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ background: 'url(/assets/industries/education.jpg) center/cover' }} />
        <div className="relative z-10 container">
          <div className="max-w-4xl">
            <span className="eyebrow" style={{ color: '#06b6d4' }}>Industry · Education & Training</span>
            <h1 className="!text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl mt-4 text-[#102a3d]">Programs, admissions, and enquiry paths that convert</h1>
            <p className="text-xl mt-6 text-[#5d6962] max-w-xl">Course catalogues, admission funnels, and parent-facing journeys built for schools, coaching centres, and ed-tech platforms. FERPA, COPPA, WCAG AA, UGC/NAAC compliant.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="button button-primary !rounded-full !px-6 !py-4" style={{ background: '#06b6d4' }} onClick={() => openEnquiry('Education & Training')}>Get a free audit <ArrowUpRight size={15} /></button>
              <Link to="/services" className="button button-outline !rounded-full !px-6 !py-4 border-[#06b6d4] text-[#06b6d4] hover:bg-[#f0fdfa]">Explore services <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: '#f0fdfa' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-[#06b6d4]">{s.value}</div>
                <div className="text-sm text-[#5d6962] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#06b6d4' }}>What we build</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Every feature, built for enrolment and engagement</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <article key={i} className="bg-[#f0fdfa] rounded-[22px] p-6 border border-[#ccfbf1] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl mb-4" style={{ background: '#e0f7fa' }}><f.icon size={24} className="text-[#06b6d4]" /></div>
                <h3 className="text-xl font-bold text-[#102a3d] mb-2">{f.title}</h3>
                <p className="text-[#5d6962]">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#f0fdfa' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#102a3d] mb-6">Platforms we build on</h3>
              <ul className="space-y-3">
                {platforms.map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#06b6d4' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#06b6d4' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#06b6d4' }} />
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
            <span className="eyebrow" style={{ color: '#06b6d4' }}>Our process</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">From audit to enrolment-ready in 5 steps</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#06b6d4]33 to-transparent" />
            {process.map((p, i) => (
              <div key={i} className="relative pl-20 pb-12 last:pb-0">
                <div className="absolute left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#06b6d4]">{p.step}</div>
                <div className="bg-[#f0fdfa] rounded-[16px] p-6 border-l-4 border-[#06b6d4]">
                  <h3 className="text-lg font-bold text-[#102a3d] mb-2">{p.title}</h3>
                  <p className="text-[#5d6962]">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#f0fdfa' }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#06b6d4' }}>Questions</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Straight answers</h2>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-[16px] border border-[#ccfbf1] overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-[#102a3d] pr-8">{f.q}</h3>
                  <ArrowUpRight size={20} className="text-[#5d6962] group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-[#5d6962] leading-relaxed border-t border-[#ccfbf1]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }}>
        <div className="container text-center">
          <span className="eyebrow !text-white/80">Ready to build</span>
          <h2 className="!text-4xl md:!text-5xl !font-display !tracking-[-.05em] !text-white mt-2 mb-4">A digital campus that enrols and engages</h2>
          <p className="!text-white/80 !text-lg mb-8 max-w-xl mx-auto">Free audit, fixed scope, dedicated team. No surprises.</p>
          <button className="button button-white !rounded-full !px-8 !py-4 text-lg" onClick={() => openEnquiry('Education & Training')}>Start my free audit <ArrowUpRight size={15} /></button>
        </div>
      </section>
    </div>
  )
}
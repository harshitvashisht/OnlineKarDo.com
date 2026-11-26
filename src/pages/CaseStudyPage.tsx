import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { caseStudies, type CaseStudy } from '../data/caseStudies'

const categoryInfo = {
  'web-development': { title: 'Web Design & Development', path: '/web-development', accent: 'from-[#087b87] to-[#53d4c7]', solutionPoints: ['Mobile-first information structure', 'Clear service and contact details', 'Content organized around customer questions'] },
  'whatsapp-commerce': { title: 'WhatsApp Commerce', path: '/whatsapp-commerce', accent: 'from-[#168b62] to-[#53d899]', solutionPoints: ['Scannable product or menu details', 'Clear ordering and enquiry prompts', 'Useful business hours and contact context'] },
  'local-discovery': { title: 'Local Discovery', path: '/local-discovery', accent: 'from-[#2878d5] to-[#57c9e8]', solutionPoints: ['Consistent business information', 'Clear directions and contact actions', 'Connected listing, social and website details'] },
} as const

function CaseServiceMockup({ study, phase }: { study: CaseStudy; phase: 'before' | 'after' }) {
  const isAfter = phase === 'after'
  const isChat = study.category === 'whatsapp-commerce'
  const isLocal = study.category === 'local-discovery'
  const headline = isAfter ? study.title : `Welcome to ${study.business}`
  return (
    <div className={`case-service-mockup case-service-${study.category} case-mockup-${phase}`}>
      <div className="case-mockup-toolbar"><span/><span/><span/><b>{isChat ? 'Business chat' : isLocal ? 'Local business profile' : `${study.business} · website`}</b><i>↗</i></div>
      {isChat ? <div className="case-mockup-chat-head"><span className="case-mockup-avatar">{study.business.slice(0,1)}</span><b>{study.business}</b><small>{isAfter ? 'Business account · Open today' : 'Available'}</small></div>
        : isLocal ? <div className="case-mockup-listing-head"><b>{study.business}</b><span>{isAfter ? 'Local business · Open today' : 'Business listing'}</span><strong>{isAfter ? 'Updated business details' : 'Details may be incomplete'}</strong></div>
          : <div className="case-mockup-web-nav"><b>{study.business}</b><span>About</span><span>Services</span><span>Contact</span></div>}
      <div className={`case-mockup-cover ${isAfter ? 'is-after' : 'is-before'}`}>
        <img src={study.image} alt={`${isAfter ? 'After' : 'Before'} example ${study.imageAlt.toLowerCase()}`} loading="lazy"/>
        <span>{isAfter ? 'AFTER · CONCEPT' : 'BEFORE · CONCEPT'}</span>
      </div>
      {isChat ? <div className="case-mockup-chat-body"><span className="case-chat-bubble incoming">{isAfter ? 'Hi! I’d like to ask about this.' : 'Hi, can you send the menu?'}</span>{isAfter && <div className="case-chat-product"><img src={study.image} alt=""/><span><b>{study.business} selection</b><small>Details and ordering options</small></span><strong>View</strong></div>}<span className="case-chat-bubble outgoing">{isAfter ? 'Of course — here are the details.' : 'Sure, what are you looking for?'}</span></div>
        : isLocal ? <div className="case-mockup-actions"><span>☎ Call</span><span>⌖ Directions</span><span>↗ Website</span><small>{isAfter ? 'Hours · Location · Contact details' : 'Some details need checking'}</small></div>
          : <div className="case-mockup-web-copy"><small>{study.business.toUpperCase()} · {isAfter ? 'A CLEARER ONLINE HOME' : 'BUSINESS WEBSITE'}</small><b>{headline}</b><p>{isAfter ? study.after : study.before}</p><span>{isAfter ? 'Explore services ↗' : 'More information'}</span></div>}
      {isChat && <div className="case-mockup-message-bar">{isAfter ? 'Message your order or question…' : 'Type a message…'}</div>}
      {isLocal && <div className="case-mockup-map"><span>⌖</span><small>{isAfter ? 'Easy to find in your neighbourhood' : 'Location information'}</small></div>}
    </div>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const study = caseStudies.find(item => item.slug === slug)
  if (!study) return <main className="container py-24"><h1 className="font-display text-4xl text-[#132c3d]">Case study not found.</h1><Link to="/services" className="mt-6 inline-flex items-center gap-2 font-bold text-[#087b87]"><ArrowLeft size={16}/>Browse services</Link></main>

  const category = categoryInfo[study.category]
  return <>
    <SEO title={`${study.title} | OnlineKarDo`} description={study.context} canonical={`/case-studies/${study.slug}`} />
    <main className="overflow-hidden bg-[#f4f8fa]">
      <section className="relative isolate overflow-hidden bg-[#071c32] py-10 text-white md:py-16">
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${category.accent} opacity-25`} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071c32]/90 via-[#0b2945]/80 to-[#10213b]/85" />
        <div className="container">
          <Link to={category.path} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"><ArrowLeft size={16}/>{category.title}</Link>
          <div className="grid items-center gap-10 xl:grid-cols-[1.08fr_.92fr] xl:gap-16">
            <div className="case-preview-shell">
              <div className="case-preview-browser">
                <div className="case-preview-chrome"><span/><span/><span/><b>{study.business.toLowerCase().replaceAll(' ', '')}.example</b><i>↗</i></div>
                <div className="case-preview-nav"><strong>{study.business}</strong><span>Our story</span><span>What we offer</span><span>Visit / contact</span><b>Let&apos;s talk</b></div>
                <div className={`case-preview-visual bg-gradient-to-br ${category.accent}`}>
                  <img src={study.image} alt={study.imageAlt} loading="eager" />
                  <span>BUILT FOR THE WAY YOU WORK</span>
                  <strong>{study.title}</strong>
                  <p>{study.after}</p>
                  <b>Explore the details&nbsp; ↗</b>
                </div>
                <div className="case-preview-lower">
                  <span>THE EXPERIENCE</span>
                  <strong>A clearer next step for every customer.</strong>
                  <div><i/><i/><i/></div>
                </div>
              </div>
              <div className="case-preview-phone"><div className="case-phone-notch"/><span>{study.business}</span><b>{study.title}</b><p>{study.after}</p><div className={`case-phone-button bg-gradient-to-r ${category.accent}`}>Get in touch&nbsp; ↗</div><div className="case-phone-mini-cards"><i/><i/></div></div>
              <span className="case-preview-caption">Example project preview</span>
            </div>
            <div className="case-study-intro">
              <span className="block text-xs font-bold uppercase tracking-[.18em] text-[#8af1e4]">Example project · {study.business}</span>
              <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.02] tracking-[-.055em] md:text-5xl"><span className="font-bold">{study.business}</span> — {study.title}</h1>
              <p className="mt-6 text-base leading-relaxed text-white/75 md:text-lg">{study.context}</p>
              <p className="mt-5 text-base leading-relaxed text-white/70">{study.approach}</p>
              <p className="mt-7 inline-flex rounded-2xl border border-white/15 bg-white/[.07] px-4 py-3 text-xs font-semibold leading-relaxed text-white/70">A practical project example built around common needs in this industry.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c4968] via-[#14386a] to-[#24418a] py-16 text-white md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center"><span className="text-xs font-bold uppercase tracking-[.18em] text-[#78e4da]">01 · The Challenge</span><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.055em] md:text-6xl">What needed to change?</h2><p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">{study.context}</p></div>
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
            <CaseServiceMockup study={study} phase="before"/>
            <article className="rounded-[26px] border border-white/15 bg-[#071c32]/45 p-7 md:p-9"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#ffbd9e]">The starting point</span><h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">A customer journey with room to improve.</h3><p className="mb-0 mt-5 leading-relaxed text-white/75">{study.before}</p></article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a2038] py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(8,123,135,.42),transparent_48%)]" />
        <div className="container relative grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <div><span className="text-xs font-bold uppercase tracking-[.18em] text-[#78e4da]">02 · The Solution</span><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.055em] md:text-6xl">A thoughtful setup, built around the customer.</h2><p className="mt-6 text-base leading-relaxed text-white/75 md:text-lg">{study.approach}</p><div className="mt-7 rounded-2xl border border-white/15 bg-white/[.06] p-5"><p className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-[#78e4da]">Service focus</p><ul className="space-y-4">{category.solutionPoints.map((point,index)=><li key={point} className="flex items-start gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#55c9c0] font-display text-xs font-bold text-[#102a3d]">0{index+1}</span><span className="pt-0.5 text-sm font-semibold text-white md:text-base">{point}</span></li>)}</ul></div></div>
          <div><CaseServiceMockup study={study} phase="after"/><p className="mb-0 mt-3 text-center text-xs font-semibold uppercase tracking-[.1em] text-white/45">Proposed setup</p></div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center"><span className="text-xs font-bold uppercase tracking-[.18em] text-[#087b87]">03 · The Results</span><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.055em] text-[#132c3d] md:text-6xl">A better experience, by design.</h2><p className="mt-5 text-base leading-relaxed text-[#536a78] md:text-lg">The proposed setup is designed to make these parts of the customer experience clearer and easier to manage.</p></div>
          <div className="grid items-stretch gap-5 lg:grid-cols-[.85fr_1.15fr]">
            <div className="case-results-image"><img src={study.image} alt={`${study.business}: ${study.imageAlt}`} loading="lazy"/><div><span>INTENDED IMPACT</span><b>{study.business}</b><small>{category.title} · Concept direction</small></div></div>
            <div className="grid gap-4 md:grid-cols-3">{study.effects.map((effect,index)=><article key={effect} className="rounded-[24px] border border-[#dce8ec] bg-[#f7fbfc] p-6 md:p-7"><span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${category.accent} font-display text-lg font-bold text-white`}>0{index+1}</span><h3 className="mt-5 font-display text-lg font-semibold text-[#132c3d]">{['Find information faster','Move forward with confidence','Make the next step clearer'][index]}</h3><p className="mb-0 mt-3 text-sm leading-relaxed text-[#536a78]">{effect}</p></article>)}</div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24"><div className="container"><div className="case-study-next-step"><img src={study.image} alt="" loading="lazy"/><div><span className="text-xs font-bold uppercase tracking-[.16em] text-[#087b87]">A relevant next step</span><h2 className="mt-2 font-display text-2xl font-semibold text-[#132c3d] md:text-3xl">Explore the service behind this concept.</h2><Link to={category.path} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#087b87] hover:underline">Browse {category.title} <ArrowUpRight size={14}/></Link></div><Link to={`/services/${study.serviceId}`} className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r ${category.accent} px-6 py-4 font-bold text-white`}>Explore matching service <ArrowUpRight size={16}/></Link></div></div></section>
    </main>
  </>
}

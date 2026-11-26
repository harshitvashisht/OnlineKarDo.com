import { ArrowLeft, ArrowUpRight, Check, MapPin, MessageCircle, Monitor, PenTool, Code2, Sparkles, LifeBuoy, ShoppingBag, HeartPulse, House, Utensils, Briefcase, Store, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { caseStudies } from '../data/caseStudies'

type CategoryService = { id: string; title: string; price: number; summary: string; impact: string }
type CategoryContent = {
  title: string; eyebrow: string; intro: string; accent: string; label: string
  services: CategoryService[]; benefits: string[]
}

const categories: Record<string, CategoryContent> = {
  'web-development': {
    title: 'A website that makes your next step clear.', eyebrow: 'Web development', intro: 'Build a confident online home for your business, with the pages, details and contact paths customers need.', accent: 'from-[#087b87] to-[#53d4c7]', label: 'WEB',
    services: [
      { id: 'one-page-business-website', title: 'One-page business website', price: 2999, summary: 'A polished single page for your offer, location and enquiry links.', impact: 'Give visitors one clear place to understand what you do and how to reach you.' },
      { id: '3-5-page-business-website', title: '3–5 page business website', price: 4999, summary: 'Room for your services, story, FAQs and contact details.', impact: 'Help customers explore multiple services without crowding everything onto one page.' },
      { id: 'domain-and-business-email-setup', title: 'Domain and business email setup', price: 999, summary: 'Set up a custom domain and a professional email identity.', impact: 'Make your business easier to recognize across your website and customer conversations.' },
      { id: 'basic-seo-setup', title: 'Basic SEO setup', price: 999, summary: 'Foundational page titles, descriptions and search readiness.', impact: 'Give search engines clearer information about your business and its pages.' },
    ],
    benefits: ['Mobile-first layouts', 'Clear service and contact information', 'Brand-matched visual design', 'A simple route from browsing to enquiry'],
  },
  'whatsapp-commerce': {
    title: 'Turn familiar chats into easier ordering.', eyebrow: 'WhatsApp commerce', intro: 'Help customers browse what you offer and start a useful conversation with the right details already in hand.', accent: 'from-[#168b62] to-[#53d899]', label: 'CHAT',
    services: [
      { id: 'whatsapp-ordering-catalogue', title: 'WhatsApp ordering catalogue', price: 1499, summary: 'A browsable selection with ready-to-send order enquiries.', impact: 'Make product questions and order requests easier to understand and respond to.' },
      { id: 'whatsapp-business-profile-setup', title: 'WhatsApp Business profile setup', price: 499, summary: 'Organize your business profile, hours and customer-facing details.', impact: 'Set expectations before customers message, so each conversation starts with useful context.' },
      { id: 'digital-product-catalogue', title: 'Digital product catalogue', price: 1499, summary: 'A shareable catalogue for product photos, details and prices.', impact: 'Give customers a simple way to compare what is available before they enquire.' },
      { id: 'digital-menu-with-qr-code', title: 'Digital menu with QR code', price: 999, summary: 'A mobile-friendly menu customers can open from a QR code.', impact: 'Keep menu browsing quick at the counter, table or takeaway point.' },
    ],
    benefits: ['Easy-to-share product and menu links', 'Clearer product details before a chat', 'A familiar enquiry journey for customers', 'Business information in one place'],
  },
  'local-discovery': {
    title: 'Be easier to find, recognize and contact.', eyebrow: 'Local discovery', intro: 'Bring your local listing and social profiles together so customers can check the essentials and choose how to connect.', accent: 'from-[#2878d5] to-[#57c9e8]', label: 'LOCAL',
    services: [
      { id: 'google-business-profile-setup', title: 'Google Business Profile setup', price: 999, summary: 'Organize your business listing, location, hours and key details.', impact: 'Help nearby customers check where you are, when you are open and how to get in touch.' },
      { id: 'instagram-business-setup', title: 'Instagram Business account setup', price: 499, summary: 'Set up a business profile with a clear identity and contact path.', impact: 'Make it easier for people discovering your work on social to understand and contact you.' },
      { id: 'facebook-business-page-setup', title: 'Facebook Business Page setup', price: 499, summary: 'Create or organize a page for business updates and customer information.', impact: 'Give customers another familiar place to find your business details and updates.' },
      { id: 'basic-seo-setup', title: 'Basic SEO setup', price: 999, summary: 'Add foundational search details to your website pages.', impact: 'Help search systems connect your pages with the services and locations you describe.' },
    ],
    benefits: ['Consistent name and contact information', 'Clear location and opening details', 'Social profiles with useful next steps', 'A more complete local presence'],
  },
}

function DemoVisual({ kind, accent }: { kind: string; accent: string }) {
  if (kind === 'whatsapp-commerce') return <div className="mx-auto w-full max-w-[340px] rounded-[34px] border-[7px] border-[#172a33] bg-white p-3 shadow-2xl"><div className="rounded-[25px] bg-[#eaf7ef] p-4"><div className="flex items-center gap-3 rounded-2xl bg-[#168b62] p-3 text-white"><MessageCircle size={22}/><span><b className="block text-sm">OnlineKarDo Store</b><small className="text-white/75">Business account</small></span></div><div className="my-5 space-y-3"><div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#d3f8c6] p-3 text-sm text-[#263b30]">Hi! Can I see today&apos;s menu?</div><div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-[#40514a] shadow-sm">Of course! Browse our menu and send your order here.</div><div className="rounded-2xl bg-white p-3 shadow-sm"><div className="h-24 rounded-xl bg-gradient-to-br from-[#bfe7cd] to-[#f6ddaf]"/><b className="mt-2 block text-sm text-[#16382b]">Fresh picks, made today</b><small className="text-[#65776e]">View catalogue · Send order</small></div></div><div className="rounded-full bg-white p-3 text-xs text-[#829087]">Message</div></div></div>
  if (kind === 'local-discovery') return <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white p-4 shadow-2xl"><div className="relative grid h-44 place-items-center overflow-hidden rounded-2xl bg-[#d9eef4]"><div className="absolute inset-0 opacity-60 [background:linear-gradient(30deg,transparent_45%,#fff_46%,#fff_50%,transparent_51%),linear-gradient(120deg,transparent_35%,#fff_36%,#fff_40%,transparent_41%)]"/><div className="absolute left-1/4 top-1/3 h-16 w-16 rounded-full bg-[#a8d8d2]/80"/><div className={`relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${accent} text-white shadow-lg`}><MapPin size={23}/></div><span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#25455b]">Your neighbourhood</span></div><div className="flex items-start justify-between gap-3 p-3"><div><b className="text-lg text-[#142d40]">Your business</b><p className="mt-1 text-sm text-[#647887]">Local service · Open today</p></div><span className="rounded-full bg-[#eef7ff] px-3 py-1 text-xs font-bold text-[#2878d5]">4.8 ★</span></div><div className="grid grid-cols-3 gap-2 px-3 pb-3 text-center text-xs font-semibold text-[#2878d5]"><span className="rounded-xl bg-[#f3f8fc] p-2">Call</span><span className="rounded-xl bg-[#f3f8fc] p-2">Directions</span><span className="rounded-xl bg-[#f3f8fc] p-2">Website</span></div></div>
  return <div className="overflow-hidden rounded-[26px] border border-white/80 bg-white p-2.5 shadow-2xl sm:p-3"><div className="flex items-center justify-between border-b border-[#efede9] px-3 py-2 text-[9px] text-[#6f6b63]"><span>Free shipping on orders over ₹999</span><span>New collection · 2026</span></div><div className="relative flex items-center justify-between px-3 py-3"><b className="font-display text-sm tracking-tight text-[#38533b] sm:text-base">little &amp; kind</b><nav className="hidden gap-4 text-[9px] text-[#5f665d] sm:flex"><span>Newborn</span><span>Clothing</span><span>About us</span></nav><span className="text-[10px] text-[#647269]">⌕　♡　Bag</span></div><div className="grid min-h-[195px] grid-cols-[.88fr_1.12fr] overflow-hidden bg-[#f3f0e9] sm:min-h-[245px]"><div className="flex flex-col items-start justify-center px-4 py-5 sm:px-6"><span className="text-[8px] font-bold uppercase tracking-[.15em] text-[#b07752] sm:text-[9px]">Soft beginnings</span><h3 className="mt-2 font-display text-lg font-semibold leading-tight text-[#4a4036] sm:text-2xl">Made for their little world.</h3><p className="mt-2 hidden text-[9px] leading-relaxed text-[#777067] sm:block">Thoughtful everyday pieces in soft, natural fabrics.</p><span className="mt-4 rounded-full bg-[#748b69] px-3 py-2 text-[8px] font-bold text-white sm:text-[9px]">Shop the collection　→</span></div><img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=85" alt="Baby resting among soft neutral fabrics" loading="lazy" className="h-full min-h-[195px] w-full object-cover sm:min-h-[245px]"/></div><div className="px-3 pb-3 pt-4 sm:px-4"><div className="flex items-end justify-between"><div><span className="text-[7px] font-bold uppercase tracking-[.15em] text-[#b07752]">A little comfort</span><h4 className="mt-1 font-display text-sm font-semibold text-[#3d463a] sm:text-base">Everyday favourites</h4></div><span className="text-[8px] text-[#667265]">View all　→</span></div><div className="mt-3 grid grid-cols-3 gap-2">{[
    ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=360&q=80','Cotton essentials'],
    ['https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=360&q=80','Soft sleepwear'],
    ['https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=360&q=80','Little layers'],
  ].map(([src,label])=><div key={label} className="overflow-hidden rounded-lg bg-[#f4f1ec]"><img src={src} alt={label} loading="lazy" className="h-[62px] w-full object-cover sm:h-[84px]"/><span className="block px-2 py-1.5 text-[8px] font-semibold text-[#596251]">{label}</span></div>)}</div></div><div className="flex items-center gap-1.5 border-t border-[#efede9] px-3 py-2 text-[8px] text-[#68756a]"><Monitor size={12}/>Storefront preview · Designed for phones first</div></div>
}


function OverviewSections({ category, content }: { category: string; content: CategoryContent }) {
  const overviewVisuals: Record<string, { src: string; alt: string; title: string; caption: string }> = {
    'web-development': { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1500&q=85', alt: 'Laptop displaying a website during a focused design session', title: 'A clear online home for your business.', caption: 'Website design & development' },
    'whatsapp-commerce': { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1500&q=85', alt: 'Freshly prepared food arranged for a digital menu', title: 'Make browsing and ordering feel simple.', caption: 'WhatsApp commerce & catalogues' },
    'local-discovery': { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1500&q=85', alt: 'Welcoming local shop ready for customers', title: 'Help nearby customers find their way to you.', caption: 'Local discovery & business profiles' },
  }
  const visual = overviewVisuals[category]
  const foundationVisuals: Record<string, { src: string; alt: string }> = {
    'web-development': { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1800&q=85', alt: 'Small business products arranged for an online storefront' },
    'whatsapp-commerce': { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85', alt: 'Shop owner helping a customer complete a purchase' },
    'local-discovery': { src: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?auto=format&fit=crop&w=1800&q=85', alt: 'Independent local shop welcoming customers' },
  }
  const foundationImage = foundationVisuals[category]
  const capabilities = [
    { icon: PenTool, title: 'Design & content', text: 'Present the essentials clearly.' },
    { icon: Code2, title: 'Setup & connections', text: 'Make the chosen tools work together.' },
    { icon: Sparkles, title: 'Business details', text: 'Use your offer, products and information.' },
    { icon: LifeBuoy, title: 'Review & handoff', text: 'Walk through the finished setup.' },
  ]
  const steps = [
    ['01', 'Understand the need', 'Choose the service and share your goals, audience and current setup.'],
    ['02', 'Shape the plan', 'Confirm the content, access and practical details needed for the work.'],
    ['03', 'Build the experience', 'Create and configure the selected pages, catalogue or business profiles.'],
    ['04', 'Review and hand off', 'Check the result together and share guidance for managing it.'],
  ]
  const industries = category === 'web-development' ? [
    { icon: ShoppingBag, name: 'E-commerce & retail', text: 'Product-led storefronts and clear routes to buy or enquire.' },
    { icon: HeartPulse, name: 'Healthcare', text: 'Helpful service details and practical appointment information.' },
    { icon: House, name: 'Real estate', text: 'Property showcases, location details and enquiry paths.' },
    { icon: Utensils, name: 'Restaurants & hospitality', text: 'Menus, atmosphere, opening details and reservations.' },
    { icon: Briefcase, name: 'Professional services', text: 'Credible service pages that explain expertise and next steps.' },
    { icon: GraduationCap, name: 'Education', text: 'Programs, admissions information and ways to connect.' },
  ] : category === 'whatsapp-commerce' ? [
    { icon: Utensils, name: 'Restaurants & hospitality', text: 'Digital menus, daily specials and order enquiries.' },
    { icon: ShoppingBag, name: 'Retail & boutiques', text: 'Shareable catalogues with product details and variants.' },
    { icon: Store, name: 'Home kitchens & makers', text: 'Simple menus and product collections customers can browse.' },
    { icon: Sparkles, name: 'Beauty & wellness', text: 'Service menus, availability questions and appointment requests.' },
    { icon: House, name: 'Home services', text: 'A direct chat path for service questions and quote requests.' },
    { icon: Briefcase, name: 'Professional services', text: 'A useful first conversation with the right context.' },
  ] : [
    { icon: Utensils, name: 'Restaurants & hospitality', text: 'Help nearby customers find your menu, hours and location.' },
    { icon: HeartPulse, name: 'Healthcare', text: 'Make clinic details, contact options and hours easier to check.' },
    { icon: House, name: 'Home & property services', text: 'Connect local searches with service areas and contact details.' },
    { icon: ShoppingBag, name: 'Retail & boutiques', text: 'Keep shop information and social discovery connected.' },
    { icon: Sparkles, name: 'Beauty & wellness', text: 'Present services and contact information across local profiles.' },
    { icon: Briefcase, name: 'Professional services', text: 'Help prospects find your expertise and choose how to reach you.' },
  ]
  return <>
    <section className="bg-[#f4f8fa] px-4 pb-16 md:px-8 md:pb-24"><div className="container"><figure className="group relative m-0 min-h-[280px] overflow-hidden rounded-[30px] border border-[#dedff0] bg-[#e7ebed] shadow-[0_24px_70px_rgba(22,32,68,.12)] md:min-h-[500px]"><img src={foundationImage.src} alt={foundationImage.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"/><div className="absolute inset-0 bg-gradient-to-t from-[#071c32]/65 via-transparent to-transparent"/><figcaption className="absolute bottom-5 left-5 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-sm font-semibold text-[#243b50] shadow-lg backdrop-blur-sm md:bottom-8 md:left-8">{content.eyebrow} · OnlineKarDo</figcaption></figure></div></section>
    <section className="bg-white py-12 md:py-20"><div className="container grid items-center gap-8 lg:grid-cols-[.9fr_1.1fr]"><div><span className="text-xs font-bold uppercase tracking-[.16em] text-[#6559bf]">One connected experience</span><h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-.05em] text-[#191a27] md:text-5xl">A practical setup, shaped around your customers.</h2><p className="mt-5 max-w-xl text-lg leading-relaxed text-[#6c6b7e]">From the first glance to the first enquiry, each piece should make the next step feel natural. We bring the right design, setup and guidance together for {content.eyebrow.toLowerCase()}.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{capabilities.map(({ icon: Icon, title, text }) => <div key={title} className="flex items-start gap-3 rounded-2xl border border-[#e1e0f0] bg-[#fafaff] p-4"><Icon className="mt-1 shrink-0 text-[#6559bf]" size={19}/><div><b className="text-[#191a27]">{title}</b><p className="mt-1 text-sm text-[#6c6b7e]">{text}</p></div></div>)}</div></div>
      <div className="group relative min-h-[320px] overflow-hidden rounded-[28px] border border-[#dedff0] bg-[#172c4b] shadow-[0_22px_65px_rgba(19,44,61,.18)] md:min-h-[470px]"><img src={visual.src} alt={visual.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"/><div className="absolute inset-0 bg-gradient-to-t from-[#071c32]/90 via-[#071c32]/15 to-transparent"/><div className="absolute left-5 top-5 rounded-2xl border border-white/30 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-sm md:left-8 md:top-8"><span className="block text-[10px] font-bold uppercase tracking-[.14em] text-[#6358b8]">OnlineKarDo · {content.label}</span><b className="mt-1 block text-sm text-[#172d43]">{visual.caption}</b></div><div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#8af1e4]">Built around your business</span><p className="mt-2 max-w-md font-display text-2xl font-semibold text-white md:text-3xl">{visual.title}</p></div></div></div></section>
    <section className="bg-[#f4f8fa] py-16 md:py-24"><div className="container"><div className="mb-9 max-w-3xl"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#6559bf]">From first conversation to handoff</span><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em] text-[#191a27] md:text-5xl">A clear path through the work.</h2><p className="mt-4 leading-relaxed text-[#6c6b7e]">We agree what matters, build around it, then review the details together.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{steps.map(([number, title, text]) => <article key={number} className="rounded-[24px] border border-[#e0dfef] bg-white p-6 shadow-[0_8px_26px_rgba(20,28,66,.06)]"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#171833] font-display text-lg font-bold text-[#65d7cd]">{number}</span><h3 className="mt-5 font-display text-xl font-semibold text-[#191a27]">{title}</h3><p className="mt-2 leading-relaxed text-[#6c6b7e]">{text}</p></article>)}</div><div className="mt-6 rounded-[24px] border border-[#e0dfef] bg-white p-6 md:p-8"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-xl font-semibold text-[#191a27]">The project path</h3><span className="text-sm text-[#6c6b7e]">Scope and timing confirmed before work begins</span></div><div className="mt-6 grid grid-cols-4 gap-2">{['Plan','Prepare','Build','Review'].map((stage,index) => <div key={stage}><div className={`h-2 rounded-full ${index===0?'bg-[#6559bf]':index===1?'bg-[#8272cc]':index===2?'bg-[#56aeb8]':'bg-[#55c5bd]'}`}/><span className="mt-2 block text-sm font-semibold text-[#4c4b61]">{stage}</span></div>)}</div></div></div></section>
    <section className="bg-[#f8f6ed] py-16 md:py-24"><div className="container"><div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div className="max-w-2xl"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#6559bf]">Built for different business needs</span><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em] text-[#191a27] md:text-5xl">Industries we can support.</h2><p className="mt-4 leading-relaxed text-[#6c6b7e]">Explore common business types and how {content.eyebrow.toLowerCase()} can fit their day-to-day customer journey.</p></div><span className={`rounded-full bg-gradient-to-r ${content.accent} px-5 py-2.5 text-sm font-bold text-white`}>Industry overview</span></div><div className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">{industries.map(({icon:Icon,name,text})=><article key={name} className="group flex items-start gap-4 border-b border-[#dcd9ce] py-5 transition hover:translate-x-1"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#e4e1d7] bg-white text-[#24394c] transition group-hover:border-[#55c5bd] group-hover:text-[#087b87]"><Icon size={25}/></span><div><h3 className="font-display text-lg font-semibold text-[#20222a]">{name}</h3><p className="mt-1 leading-relaxed text-[#6c6b7e]">{text}</p></div></article>)}</div></div></section>
  </>
}

export default function CategoryPage({ category }: { category: string }) {
  const content = categories[category]
  if (!content) return <main className="container py-24"><h1 className="font-display text-4xl text-[#132c3d]">This category was not found.</h1><Link to="/" className="mt-6 inline-flex items-center gap-2 font-bold text-[#087b87]">Back home <ArrowLeft size={16}/></Link></main>

  return <>
    <SEO title={`${content.eyebrow} | OnlineKarDo`} description={content.intro}/>
    <main className="overflow-hidden">
      <section className="relative isolate overflow-hidden bg-[#082c50] py-20 text-white md:py-28">
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${content.accent} opacity-30`}/><div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071e42]/90 via-[#07547c]/70 to-[#057f9b]/40"/>
        <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div><Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"><ArrowLeft size={16}/>Back to home</Link><span className="mb-4 block text-xs font-bold uppercase tracking-[.18em] text-[#8af1e4]">{content.eyebrow}</span><h1 className="max-w-3xl font-display text-4xl font-semibold leading-[.98] tracking-[-.065em] md:text-6xl">{content.title}</h1><p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{content.intro}</p></div>
          <div className="relative mx-auto w-full max-w-lg"><div className={`absolute -inset-8 -z-10 rounded-full bg-gradient-to-br ${content.accent} opacity-40 blur-3xl`}/><DemoVisual kind={category} accent={content.accent}/></div>
        </div>
      </section>
      <section className="bg-[#f4f8fa] py-16 md:py-24"><div className="container grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><span className="text-xs font-bold uppercase tracking-[.16em] text-[#087b87]">Built around outcomes</span><h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-.05em] text-[#132c3d] md:text-4xl">Small details.<br/>A stronger presence.</h2><p className="mt-4 leading-relaxed text-[#536a78]">Every setup is shaped around the way your customers find you, understand your offer and get in touch.</p></div><div className="grid gap-3 sm:grid-cols-2">{content.benefits.map((benefit, index)=><div key={benefit} className="flex items-center gap-3 rounded-2xl border border-[#dce8ec] bg-white p-4 shadow-sm"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${content.accent} text-white`}><Check size={17}/></span><span className="font-semibold text-[#234154]">{benefit}</span><span className="ml-auto text-xs font-bold text-[#9aabb4]">0{index+1}</span></div>)}</div><div className="rounded-[26px] bg-[#101c29] p-7 text-white sm:col-span-2 md:flex md:items-center md:justify-between md:p-9"><div><span className="text-xs font-bold uppercase tracking-[.16em] text-[#7de4d9]">Made for your business</span><h3 className="mt-2 font-display text-2xl font-semibold">Want to discuss this setup?</h3></div><Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#65d9cd] px-6 py-3 font-bold text-[#102a3d] md:mt-0">Talk to our team <ArrowUpRight size={16}/></Link></div></div></section>
      <OverviewSections category={category} content={content} />
      <section className="bg-white py-16 md:py-24"><div className="container"><div className="mb-10 max-w-2xl"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#087b87]">Service categories</span><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em] text-[#132c3d] md:text-5xl">What this setup can include.</h2><p className="mt-4 leading-relaxed text-[#536a78]">Explore the building blocks below to see how each one can help your business and what the demo looks like.</p></div><div className="grid gap-4 md:grid-cols-2">{content.services.map((service,index)=><article key={service.id} className="group rounded-[24px] border border-[#dce8ec] bg-gradient-to-br from-[#f4fafb] to-white p-6 transition hover:-translate-y-1 hover:border-[#63d6c8] hover:shadow-[0_20px_55px_rgba(19,44,61,.1)] md:p-7"><div className="flex items-center justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${content.accent} font-bold text-white`}>{content.label.slice(0,1)}{index+1}</span><span className="font-display text-lg font-bold text-[#132c3d]">₹{service.price.toLocaleString('en-IN')}</span></div><h3 className="mt-5 font-display text-xl font-semibold text-[#132c3d]">{service.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#536a78]">{service.summary}</p><div className="mt-5 border-t border-[#e7eef1] pt-4"><small className="font-bold uppercase tracking-[.12em] text-[#087b87]">Business impact</small><p className="mt-1 text-sm leading-relaxed text-[#536a78]">{service.impact}</p></div><Link to={`/services/${service.id}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#102f48] px-5 py-3 text-sm font-bold text-white transition group-hover:bg-[#087b87]">See details &amp; demo <ArrowUpRight size={15}/></Link></article>)}</div></div></section>
      <section className="bg-[#edf7f7] py-16 md:py-24" aria-labelledby="category-cases-title">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-[#087b87]">Example project stories</span>
            <h2 id="category-cases-title" className="mt-3 font-display text-3xl font-semibold tracking-[-.05em] text-[#132c3d] md:text-5xl">See how this can work in practice.</h2>
            <p className="mt-4 leading-relaxed text-[#536a78]">Six example projects based on common needs across businesses in this service area.</p>
          </div>
          <div className="space-y-7">
            {caseStudies.filter(study => study.category === category).map((study, index) => (
              <Link key={study.slug} to={`/case-studies/${study.slug}`} className={`case-study-showcase group ${index % 2 === 1 ? 'case-study-showcase-reverse' : ''}`}>
                <div className="case-study-showcase-image"><img src={study.image} alt={study.imageAlt} loading="lazy"/><span className="case-study-image-label">Example project · {study.business}</span></div>
                <div className={`case-study-showcase-copy bg-gradient-to-br ${content.accent}`}>
                  <span className="text-xs font-bold uppercase tracking-[.16em] text-white/75">Example project 0{index + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white md:text-4xl">{study.business} — {study.title}</h3>
                  <p className="mt-5 leading-relaxed text-white/85">{study.context}</p>
                  <p className="mt-4 leading-relaxed text-white/80">{study.approach}</p>
                  <div className="case-study-before-after mt-5">
                    <div><span>Before</span><p>{study.before}</p></div>
                    <div><span>After</span><p>{study.after}</p></div>
                  </div>
                  <span className="case-study-view-link mt-7 inline-flex items-center gap-3 font-bold uppercase tracking-[.1em] text-white">View case study <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1"/></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  </>
}

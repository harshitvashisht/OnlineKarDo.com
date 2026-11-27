import { Link } from 'react-router-dom'
import { ArrowUpRight, Utensils, MapPin, Smartphone, CreditCard, Star, Clock, Globe, Users } from 'lucide-react'
import { useEnquiry } from '../../context/EnquiryContext'
import { SEO } from '../../components/SEO'

const features = [
  { title: 'Commission-Free Direct Ordering', description: 'Own your customer data. QR table ordering, pickup/delivery, kitchen ticket printing.', icon: Utensils },
  { title: 'Digital Menu with QR Codes', description: 'Real-time edits, dietary tags, price variants, photos, multi-language, PDF backup.', icon: Smartphone },
  { title: 'Local SEO & Google Business', description: 'GBP optimization, review management, posts, Q&A, menu schema, "Order Online" button.', icon: MapPin },
  { title: 'Integrated Payments', description: 'Razorpay/Stripe at table or checkout — UPI, cards, wallets, split bill, tip prompt.', icon: CreditCard },
  { title: 'Reservation & Waitlist', description: 'Widget embed, SMS confirmations, walk-in queue, table management, no-show protection.', icon: Clock },
  { title: 'Loyalty & Re-engagement', description: 'Points, birthday offers, win-back SMS/WhatsApp, referral, birthday capture.', icon: Star },
  { title: 'Multi-Location Management', description: 'Central menu, location hours, area-specific specials, unified reporting.', icon: Globe },
  { title: 'Analytics & Cost Control', description: 'Popular items, peak hours, order value, food cost %, labor vs sales.', icon: Users },
]

const platforms = ['WordPress + WooCommerce/RestroPress', 'Custom React/Next.js + POS API', 'Webflow + Snipcart/Foxy', 'Square/Toast Online Ordering (config)']
const compliance = ['PCI DSS (payments)', 'Food Safety Display', 'Allergen Labeling (FSSAI)', 'GST Invoicing', 'Accessibility (WCAG)']
const integrations = ['POS (Square, Toast, Petpooja, UrbanPiper)', 'Payments (Razorpay, Stripe)', 'Delivery (Dunzo, Swiggy, Zomato API)', 'WhatsApp Business', 'Klaviyo/Mailchimp']

const stats = [
  { value: '0%', label: 'Commission on direct orders' },
  { value: '<2s', label: 'Menu load time' },
  { value: '2+', label: 'Languages supported' },
  { value: 'PCI DSS', label: 'Secure payments' },
]

const process = [
  { step: '01', title: 'Menu & Operations Audit', description: 'Current menu, pricing, variants, kitchen flow, POS, delivery radius, peak hours.' },
  { step: '02', title: 'Information Architecture', description: 'Category tree, dietary tags, price variants, combo logic, modifier groups.' },
  { step: '03', title: 'Design & Ordering Flow', description: 'Menu UI, cart, checkout, table QR, payment, kitchen ticket, confirmation UX.' },
  { step: '04', title: 'Build, POS & Payment Sync', description: 'Menu CMS, POS sync, Razorpay/Stripe, QR generation, printer test, staff training.' },
  { step: '05', title: 'Launch & Optimize', description: 'Table QR deploy, GBP "Order Online", review templates, analytics, A/B test CTAs.' },
]

const faq = [
  { q: 'Do I need to change my POS?', a: 'No — we integrate with Square, Toast, Petpooja, UrbanPiper, or use webhook/API. If no POS, our admin panel works standalone.' },
  { q: 'What about Swiggy/Zomato commissions?', a: 'This builds your DIRECT channel. Keep aggregators for discovery; drive profitable orders to your own site via QR, GBP, WhatsApp.' },
  { q: 'Can customers split bills?', a: 'Yes — split by item, equal split, or custom amounts. Each payer pays via UPI/card. Kitchen gets single ticket.' },
  { q: 'How do QR codes work for tables?', a: 'We generate unique QR per table (PDF, 300 DPI). Scan opens menu with table ID pre-filled. Kitchen knows exact table.' },
  { q: 'What about GST invoices?', a: 'Auto-generated on payment. GSTIN, HSN/SAC, CGST/SGST/IGST breakdown. PDF download + email + WhatsApp.' },
]

export default function RestaurantsHospitalityPage() {
  const { openEnquiry } = useEnquiry()

  return (
    <div className="page-wrapper">
      <SEO
        title="Restaurants & Hospitality — Direct Ordering, Menus, Bookings | OnlineKarDo"
        description="Commission-free direct ordering, digital menus with QR, reservations, Google Business Profile, payments. Own your customers, stop renting from delivery apps."
        canonical="/industries/restaurants-hospitality"
      />

      <section className="relative overflow-hidden py-20 md:py-32" style={{ background: 'linear-gradient(135deg, #fef9e7 0%, #fdf0d0 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ background: 'url(/assets/industries/restaurant.jpg) center/cover' }} />
        <div className="relative z-10 container">
          <div className="max-w-4xl">
            <span className="eyebrow" style={{ color: '#d5a64b' }}>Industry · Restaurants & Hospitality</span>
            <h1 className="!text-6xl !leading-[.95] !tracking-[-.07em] md:!text-8xl mt-4 text-[#102a3d]">Own your orders, stop renting customers from delivery apps</h1>
            <p className="text-xl mt-6 text-[#5d6962] max-w-xl">Commission-free direct ordering, local SEO and Google Business Profile done right, menu schema, two-tap mobile flows — so the order and the customer data stays yours.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="button button-primary !rounded-full !px-6 !py-4" style={{ background: '#d5a64b' }} onClick={() => openEnquiry('Restaurants & Hospitality')}>Get a free audit <ArrowUpRight size={15} /></button>
              <Link to="/services" className="button button-outline !rounded-full !px-6 !py-4 border-[#d5a64b] text-[#d5a64b] hover:bg-[#fef9e7]">Explore services <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: '#fef9e7' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-[#d5a64b]">{s.value}</div>
                <div className="text-sm text-[#5d6962] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#d5a64b' }}>What we build</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Every feature, built for full tables and repeat guests</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <article key={i} className="bg-[#fffaf0] rounded-[22px] p-6 border border-[#fdf0d0] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl mb-4" style={{ background: '#fef9e7' }}><f.icon size={24} className="text-[#d5a64b]" /></div>
                <h3 className="text-xl font-bold text-[#102a3d] mb-2">{f.title}</h3>
                <p className="text-[#5d6962]">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#fef9e7' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#102a3d] mb-6">Platforms we build on</h3>
              <ul className="space-y-3">
                {platforms.map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#d5a64b' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#d5a64b' }} />
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
                    <span className="w-2 h-2 rounded-full" style={{ background: '#d5a64b' }} />
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
            <span className="eyebrow" style={{ color: '#d5a64b' }}>Our process</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">From menu to live ordering in 5 steps</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#d5a64b]33 to-transparent" />
            {process.map((p, i) => (
              <div key={i} className="relative pl-20 pb-12 last:pb-0">
                <div className="absolute left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#d5a64b]">{p.step}</div>
                <div className="bg-[#fffaf0] rounded-[16px] p-6 border-l-4 border-[#d5a64b]">
                  <h3 className="text-lg font-bold text-[#102a3d] mb-2">{p.title}</h3>
                  <p className="text-[#5d6962]">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#fef9e7' }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: '#d5a64b' }}>Questions</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Straight answers</h2>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-[16px] border border-[#fdf0d0] overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-[#102a3d] pr-8">{f.q}</h3>
                  <ArrowUpRight size={20} className="text-[#5d6962] group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-[#5d6962] leading-relaxed border-t border-[#fdf0d0]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(135deg, #d5a64b 0%, #b8903a 100%)' }}>
        <div className="container text-center">
          <span className="eyebrow !text-white/80">Ready to build</span>
          <h2 className="!text-4xl md:!text-5xl !font-display !tracking-[-.05em] !text-white mt-2 mb-4">Own your ordering, own your customers</h2>
          <p className="!text-white/80 !text-lg mb-8 max-w-xl mx-auto">Free audit, fixed scope, dedicated team. No surprises.</p>
          <button className="button button-white !rounded-full !px-8 !py-4 text-lg" onClick={() => openEnquiry('Restaurants & Hospitality')}>Start my free audit <ArrowUpRight size={15} /></button>
        </div>
      </section>
    </div>
  )
}
import { useEffect, useState, useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Monitor, CreditCard, ShoppingBag, Utensils, MapPin, Link2, Mail, Search, MessageSquare, Instagram, Facebook, Truck, Star, Shield, Zap, Users, Globe, BarChart2, Layers, Sparkles, Rocket, Target, Award, Crown, Diamond, Heart, Smartphone, Home, Clipboard, Ticket, Image, FileText, Code, Calendar, Palette, Clock } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'
import { SEO, ServiceSchema, BreadcrumbSchema } from '../components/SEO'

const money = (value: number | string): string => `₹${Number(value).toLocaleString('en-IN')}`

const ICON_COMPONENTS = { Monitor, CreditCard, ShoppingBag, Utensils, MapPin, Link2, Mail, Search, MessageSquare, Instagram, Facebook, Truck, Star, Shield, Zap, Users, Globe, BarChart2, Layers, Sparkles, Rocket, Target, Award, Crown, Diamond, Heart, Smartphone, Home, Clipboard, Ticket, Image, FileText, Code, Calendar, Palette, Clock, Check, ArrowRight } as const

const SERVICE_IMAGES: Record<string, { image: string; icon: keyof typeof ICON_COMPONENTS; color: string; bgColor: string; marqueeItems: string[] }> = {
  'one-page-business-website': { 
    image: '/assets/industries/one-page-website.jpg', 
    icon: 'Monitor', 
    color: '#e36a27', 
    bgColor: '#fff4ed',
    marqueeItems: ['Fast loading', 'Mobile-first', 'SEO ready', 'Contact form', 'WhatsApp link', 'Google Maps', 'Social links', 'Analytics']
  },
  '3-5-page-business-website': { 
    image: '/assets/industries/multi-page-website.jpg', 
    icon: 'Monitor', 
    color: '#7b91a0', 
    bgColor: '#eff6fa',
    marqueeItems: ['5 custom pages', 'CMS enabled', 'Blog system', 'Service pages', 'Team showcase', 'Testimonials', 'FAQ section', 'Lead forms']
  },
  'whatsapp-ordering-catalogue': { 
    image: '/assets/industries/whatsapp-ordering.jpg', 
    icon: 'MessageSquare', 
    color: '#25d366', 
    bgColor: '#e8f8ee',
    marqueeItems: ['Product catalogue', 'Cart system', 'Order summary', 'Auto-replies', 'Inventory sync', 'Multi-category', 'Price variants', 'Delivery options']
  },
  'razorpay-payment-page-or-link': { 
    image: '/assets/industries/payment-link.jpg', 
    icon: 'CreditCard', 
    color: '#0c2451', 
    bgColor: '#eef2fc',
    marqueeItems: ['UPI & Cards', 'Net banking', 'Wallets', 'EMI options', 'Instant refunds', 'Payment links', 'QR codes', 'Webhooks']
  },
  'razorpay-supported-payment-catalogue': { 
    image: '/assets/industries/payment-catalogue.jpg', 
    icon: 'CreditCard', 
    color: '#0c2451', 
    bgColor: '#eef2fc',
    marqueeItems: ['Product grid', 'Cart checkout', 'Secure payments', 'Order tracking', 'Inventory mgmt', 'Coupon codes', 'GST invoices', 'Analytics']
  },
  'digital-product-catalogue': { 
    image: '/assets/industries/product-catalogue.jpg', 
    icon: 'ShoppingBag', 
    color: '#779166', 
    bgColor: '#ecf4e8',
    marqueeItems: ['Up to 50 products', 'Categories', 'Filters', 'Search', 'Wishlist', 'Share links', 'QR codes', 'WhatsApp enquiry']
  },
  'digital-menu-with-qr-code': { 
    image: '/assets/industries/digital-menu.jpg', 
    icon: 'Utensils', 
    color: '#d5a64b', 
    bgColor: '#fef9e7',
    marqueeItems: ['Multi-category', 'Dietary tags', 'Price variants', 'Images', 'QR codes', 'Real-time edits', 'Print ready', 'Multi-language']
  },
  'google-business-profile-setup': { 
    image: '/assets/industries/google-business.jpg', 
    icon: 'MapPin', 
    color: '#4285f4', 
    bgColor: '#e8f0fe',
    marqueeItems: ['Profile setup', 'Photos upload', 'Hours mgmt', 'Review replies', 'Posts', 'Q&A', 'Insights', 'Verification']
  },
  'instagram-business-setup': { 
    image: '/assets/industries/instagram-setup.jpg', 
    icon: 'Instagram', 
    color: '#e1306c', 
    bgColor: '#fdeff4',
    marqueeItems: ['Bio optimization', 'Highlights', 'Story covers', 'Shop setup', 'Link in bio', 'Contact buttons', 'Category tags', 'Insights']
  },
  'facebook-business-page-setup': { 
    image: '/assets/industries/facebook-page.jpg', 
    icon: 'Facebook', 
    color: '#0866ff', 
    bgColor: '#e8f0fe',
    marqueeItems: ['Page creation', 'Cover design', 'Tabs setup', 'Reviews', 'Messenger', 'Shop', 'Events', 'Insights']
  },
  'whatsapp-business-profile-setup': { 
    image: '/assets/industries/whatsapp-profile.jpg', 
    icon: 'MessageSquare', 
    color: '#25d366', 
    bgColor: '#e8f8ee',
    marqueeItems: ['Business info', 'Catalogue', 'Quick replies', 'Labels', 'Away msg', 'Greeting msg', 'Statistics', 'Verification']
  },
  'link-in-bio-business-page': { 
    image: '/assets/industries/link-in-bio.jpg', 
    icon: 'Link2', 
    color: '#8b5cf6', 
    bgColor: '#f5f0ff',
    marqueeItems: ['Unlimited links', 'Custom design', 'Analytics', 'Social icons', 'Forms', 'Payments', 'Video embed', 'SEO ready']
  },
  'domain-and-business-email-setup': { 
    image: '/assets/industries/domain-email.jpg', 
    icon: 'Mail', 
    color: '#ea580c', 
    bgColor: '#fff4ed',
    marqueeItems: ['Domain search', 'Registration', 'DNS setup', 'Email config', 'SPF/DKIM', 'Aliases', 'Forwarding', 'Support']
  },
  'basic-seo-setup': { 
    image: '/assets/industries/basic-seo.jpg', 
    icon: 'Search', 
    color: '#087b87', 
    bgColor: '#ecfdfd',
    marqueeItems: ['Keyword research', 'Meta tags', 'Schema markup', 'Sitemap', 'Robots.txt', 'Speed audit', 'Core web vitals', 'Search console']
  },
}

// Header text colours, one set per service: title, gradient start, gradient end
const HERO_COLORS: Record<string, [string, string, string]> = {
  'one-page-business-website': ['#7c2d12', '#c2410c', '#b45309'],
  '3-5-page-business-website': ['#1e293b', '#334155', '#0369a1'],
  'whatsapp-ordering-catalogue': ['#14532d', '#15803d', '#0f766e'],
  'razorpay-payment-page-or-link': ['#172554', '#1e40af', '#2563eb'],
  'razorpay-supported-payment-catalogue': ['#312e81', '#4338ca', '#7c3aed'],
  'digital-product-catalogue': ['#365314', '#4d7c0f', '#047857'],
  'digital-menu-with-qr-code': ['#713f12', '#a16207', '#c2410c'],
  'google-business-profile-setup': ['#0c4a6e', '#0369a1', '#0e7490'],
  'instagram-business-setup': ['#831843', '#be185d', '#9333ea'],
  'facebook-business-page-setup': ['#1e3a8a', '#1d4ed8', '#0284c7'],
  'whatsapp-business-profile-setup': ['#134e4a', '#0f766e', '#15803d'],
  'link-in-bio-business-page': ['#581c87', '#7e22ce', '#c026d3'],
  'domain-and-business-email-setup': ['#7f1d1d', '#b91c1c', '#ea580c'],
  'basic-seo-setup': ['#164e63', '#0e7490', '#4f46e5'],
}

const SERVICE_CONTENT: Record<string, {
  heroSubtitle: string
  detailedDescription: string
  features: { title: string; description: string; icon: keyof typeof ICON_COMPONENTS }[]
  process: { step: string; title: string; description: string }[]
  faq: { q: string; a: string }[]
  trustPoints: string[]
  stats: { value: string; label: string }[]
  marqueeText: string
}> = {
  'one-page-business-website': {
    heroSubtitle: 'Your digital business card — one focused page that converts visitors into enquiries.',
    detailedDescription: 'A one-page website is the fastest way to establish a professional online presence. We design a scrollable, mobile-first experience that tells your story, showcases your offer, and drives the single action that matters most — getting a customer to contact you. Every element is placed with intent: a compelling hero, clear value proposition, social proof, and a frictionless enquiry form or WhatsApp button.',
    features: [
      { title: 'Hero Section That Converts', description: 'Headline, sub-headline, primary CTA, and trust signals above the fold.', icon: 'Target' },
      { title: 'About / Story Section', description: 'Who you are, what you do, and why customers choose you — in 150 words.', icon: 'Heart' },
      { title: 'Services or Products Showcase', description: 'Up to 6 offerings with icons, short descriptions, and enquiry links.', icon: 'Layers' },
      { title: 'Social Proof Strip', description: 'Google rating, testimonials, client logos, or trust badges.', icon: 'Star' },
      { title: 'Contact & Location Block', description: 'Embedded map, click-to-call, WhatsApp, email, and enquiry form.', icon: 'MapPin' },
      { title: 'Footer Essentials', description: 'Privacy policy, terms, social links, and copyright.', icon: 'Shield' },
      { title: 'Mobile-First Responsive', description: 'Tested on 12+ device sizes; loads in under 2 seconds on 3G.', icon: 'Smartphone' },
      { title: 'Basic SEO & Analytics', description: 'Meta tags, Open Graph, JSON-LD schema, GA4 + Search Console setup.', icon: 'Search' },
    ],
    process: [
      { step: '01', title: 'Discovery Call', description: '30-min call to understand your business, audience, and the one action you want visitors to take.' },
      { step: '02', title: 'Content & Assets', description: 'You share logo, photos, copy, and brand colours. We guide you with a simple questionnaire.' },
      { step: '03', title: 'Design & Build', description: 'We create the page on a staging link — mobile-first, accessible, and brand-aligned.' },
      { step: '04', title: 'Review & Revise', description: 'One consolidated revision round based on your feedback.' },
      { step: '05', title: 'Launch & Handover', description: 'Deploy to your domain, connect analytics, and share a 5-min Loom walkthrough.' },
    ],
    faq: [
      { q: 'Can I add more sections later?', a: 'Yes — the page is built on a modular framework. Additional sections (blog, portfolio, FAQ) can be added as a paid upgrade.' },
      { q: 'Do I need to provide all the content?', a: 'We provide a content template with prompts. You fill in the blanks; we polish the copy for web readability.' },
      { q: 'What if I need a blog later?', a: 'We can add a blog module (CMS) as an upgrade. The one-page structure stays intact with a "Blog" link in navigation.' },
      { q: 'Is hosting included?', a: 'Hosting is separate. We recommend Netlify, Vercel, or Cloudflare Pages (free tiers available) and handle the deployment.' },
    ],
    trustPoints: [
      '200+ one-page sites delivered',
      '98% client satisfaction rate',
      'Average 3.2s load time on mobile',
      'Built on modern, secure stack',
    ],
    stats: [
      { value: '48h', label: 'Average delivery' },
      { value: '2s', label: 'Target load time' },
      { value: '100%', label: 'Mobile responsive' },
      { value: '1', label: 'Revision included' },
    ],
    marqueeText: 'Fast • Focused • Conversion-ready • Mobile-first • SEO-friendly • Analytics-enabled • WhatsApp-connected • Map-integrated •'
  },
  '3-5-page-business-website': {
    heroSubtitle: 'A complete digital presence — multiple pages, CMS-powered, built to grow with your business.',
    detailedDescription: 'A 3–5 page website gives you room to breathe. Home, About, Services, Contact — plus one custom page (Blog, Portfolio, Team, FAQ, or Gallery). We build it on a lightweight CMS so you can update text, images, and blog posts without touching code. Perfect for clinics, consultancies, studios, and service businesses that need more than a single scroll.',
    features: [
      { title: 'Home Page with Full Sections', description: 'Hero, value props, featured services, testimonials, CTA banner.', icon: 'Home' },
      { title: 'About / Story Page', description: 'Mission, values, team bios, timeline, certifications.', icon: 'Users' },
      { title: 'Services / Products Page', description: 'Filterable grid, detail modals, enquiry per service.', icon: 'Layers' },
      { title: 'Custom 4th Page (Your Choice)', description: 'Blog, Portfolio, Case Studies, Team, FAQ, or Gallery.', icon: 'Diamond' },
      { title: 'Contact Page', description: 'Form, map, hours, multiple locations, department routing.', icon: 'MapPin' },
      { title: 'CMS for Easy Updates', description: 'Edit text, swap images, publish posts — no developer needed.', icon: 'Rocket' },
      { title: 'Blog System (Optional)', description: 'Categories, tags, author bios, related posts, SEO fields.', icon: 'Globe' },
      { title: 'Search & Analytics', description: 'Site search, GA4 events, heatmaps, conversion tracking.', icon: 'Search' },
    ],
    process: [
      { step: '01', title: 'Strategy Workshop', description: '60-min session to map sitemap, user journeys, and content priorities.' },
      { step: '02', title: 'Content Collection', description: 'We provide a structured content brief. You supply copy, images, and brand assets.' },
      { step: '03', title: 'Design System & Prototypes', description: 'Figma prototypes for desktop & mobile — typography, colours, components.' },
      { step: '04', title: 'Development & CMS Setup', description: 'Responsive build with modular components, CMS collections, and SEO defaults.' },
      { step: '05', title: 'QA & Launch', description: 'Cross-browser testing, accessibility audit, 301 redirects (if migrating), go-live.' },
    ],
    faq: [
      { q: 'Can I add more pages later?', a: 'Yes — the component library makes new pages fast to assemble. Additional pages are quoted per page.' },
      { q: 'Which CMS do you use?', a: 'We use headless CMS options like Sanity, Contentful, or Netlify CMS — chosen based on your team\'s comfort level.' },
      { q: 'Do you migrate existing content?', a: 'Yes — content migration from WordPress, Wix, Squarespace, or static sites is included up to 20 pages.' },
      { q: 'Is training included?', a: 'We record a 15-min Loom walkthrough of the CMS and share a written guide for your team.' },
    ],
    trustPoints: [
      '150+ multi-page sites launched',
      'CMS training included',
      'WCAG 2.1 AA compliant',
      '30-day post-launch support',
    ],
    stats: [
      { value: '5-7', label: 'Business days' },
      { value: '5', label: 'Custom pages' },
      { value: '100%', label: 'Editable via CMS' },
      { value: '2', label: 'Revision rounds' },
    ],
    marqueeText: 'Multi-page • CMS-powered • Blog-ready • Portfolio-capable • Team-showcase • FAQ-driven • Search-enabled • Analytics-wired •'
  },
  'whatsapp-ordering-catalogue': {
    heroSubtitle: 'Turn WhatsApp into your order desk — a visual catalogue that builds a cart and sends a structured order message.',
    detailedDescription: 'Your customers already use WhatsApp. We give them a beautiful, mobile-first catalogue they can browse, add to cart, and send as a pre-formatted order message — no app download, no friction. You receive clean orders with item names, quantities, prices, and totals. Perfect for home kitchens, bakeries, grocers, boutiques, and any seller who confirms orders personally.',
    features: [
      { title: 'Visual Product Grid', description: 'Up to 30 products with images, names, prices, and variants.', icon: 'ShoppingBag' },
      { title: 'Quantity Selector', description: 'Plus/minus steppers per item; real-time cart total.', icon: 'Target' },
      { title: 'Category Tabs', description: 'Organise by type — Mains, Sides, Drinks, Combos, etc.', icon: 'Layers' },
      { title: 'Order Summary Screen', description: 'Review items, quantities, subtotal, delivery notes before sending.', icon: 'Clipboard' },
      { title: 'Pre-filled WhatsApp Message', description: 'Structured text with order details, customer name, phone, address.', icon: 'MessageSquare' },
      { title: 'Inventory Toggle', description: 'Mark items out of stock; they grey out automatically.', icon: 'Shield' },
      { title: 'QR Code for Print', description: 'Table tents, packaging, receipts — scan to open catalogue.', icon: 'Smartphone' },
      { title: 'Order Notification', description: 'You get a clean WhatsApp message; optional email copy.', icon: 'Mail' },
    ],
    process: [
      { step: '01', title: 'Product Audit', description: 'We review your menu/price list, categorise items, and identify variants.' },
      { step: '02', title: 'Photography Guidance', description: 'We share a shot list; you send photos (or we use placeholder images initially).' },
      { step: '03', title: 'Catalogue Build', description: 'We configure categories, items, prices, and the WhatsApp message template.' },
      { step: '04', title: 'Test Orders', description: 'You place 3-5 test orders; we refine the flow and message format.' },
      { step: '05', title: 'Go Live', description: 'Share the link + QR code. We monitor first 10 orders for smooth operation.' },
    ],
    faq: [
      { q: 'Does this integrate with my POS?', a: 'Not directly — orders come via WhatsApp. You manually enter them into your POS. For high volume, we recommend the Payment Catalogue upgrade.' },
      { q: 'Can customers pay on WhatsApp?', a: 'This version is order-only. For payments, see the Razorpay Payment Catalogue service.' },
      { q: 'What if my prices change?', a: 'You get a simple admin link to update prices, toggle availability, and edit descriptions.' },
      { q: 'Is there a monthly fee?', a: 'No — one-time setup. Hosting on our subdomain is free for 12 months, then ₹499/yr.' },
    ],
    trustPoints: [
      '50+ ordering catalogues live',
      'Zero app installs for customers',
      'Works on any WhatsApp version',
      'GDPR-compliant data handling',
    ],
    stats: [
      { value: '30', label: 'Max products' },
      { value: '2s', label: 'Load time' },
      { value: '100%', label: 'Mobile optimised' },
      { value: '48h', label: 'Setup time' },
    ],
    marqueeText: 'Order via WhatsApp • Visual catalogue • Cart system • QR codes • Inventory toggle • Category tabs • Structured messages • Zero friction •'
  },
  'razorpay-payment-page-or-link': {
    heroSubtitle: 'Collect payments securely — UPI, cards, net banking, wallets, and EMI — via a hosted page or shareable link.',
    detailedDescription: 'Stop chasing payments. We set up a Razorpay payment page or payment links tailored to your flow — advance booking deposits, course fees, service retainers, donation amounts, or invoice payments. Customers pay via their preferred method; you get instant settlement notifications and a clean dashboard. No coding, no maintenance, just a link you can share on WhatsApp, email, SMS, or embed on your site.',
    features: [
      { title: 'Payment Page (Hosted)', description: 'Branded, mobile-optimised page with amount, description, and customer fields.', icon: 'CreditCard' },
      { title: 'Payment Links', description: 'Unique URLs per customer/invoice; expire after use or date.', icon: 'Link2' },
      { title: 'All Payment Methods', description: 'UPI, Credit/Debit Cards, Net Banking, Wallets, EMI, PayLater.', icon: 'Globe' },
      { title: 'Custom Fields', description: 'Collect name, email, phone, address, GSTIN, or custom dropdowns.', icon: 'Layers' },
      { title: 'Instant Notifications', description: 'Email + SMS + Webhook on success/failure; Razorpay dashboard access.', icon: 'Zap' },
      { title: 'Partial Payments', description: 'Allow customers to pay a deposit or split amount.', icon: 'Target' },
      { title: 'International Cards', description: 'Accept Visa/Mastercard/Amex from 100+ countries (activation required).', icon: 'Crown' },
      { title: 'Settlement & Reports', description: 'T+2 settlement, auto-reconciliation reports, GST-compliant invoices.', icon: 'BarChart2' },
    ],
    process: [
      { step: '01', title: 'Razorpay Account Check', description: 'Verify your Razorpay account is activated and KYC complete. We guide if not.' },
      { step: '02', title: 'Flow Design', description: 'Define amount (fixed/variable), customer fields, success/failure redirects, and notifications.' },
      { step: '03', title: 'Page/Link Creation', description: 'Build branded payment page + generate sample links for testing.' },
      { step: '04', title: 'Test Transactions', description: 'Run 5 test payments across UPI, Card, NetBanking; verify webhooks and notifications.' },
      { step: '04', title: 'Go Live & Document', description: 'Share live links, embed codes, and a 1-page SOP for your team.' },
    ],
    faq: [
      { q: 'Do I need a Razorpay account?', a: 'Yes — you must have an activated Razorpay account. We can guide you through signup and KYC (usually 2-3 business days).' },
      { q: 'What are the transaction charges?', a: 'Razorpay charges 2% + GST (domestic cards/UPI), 3% + GST (international). No fee from us.' },
      { q: 'Can I customise the payment page design?', a: 'Yes — logo, brand colour, custom CSS (limited), and custom success/failure messages.' },
      { q: 'How do refunds work?', a: 'Full/partial refunds from Razorpay dashboard — instant for UPI, 5-7 days for cards. We show you the process.' },
    ],
    trustPoints: [
      'Razorpay authorised partner',
      'PCI DSS Level 1 compliant',
      '10,000+ payments processed',
      'Instant settlement tracking',
    ],
    stats: [
      { value: '2%', label: 'Domestic TDR' },
      { value: 'T+2', label: 'Settlement' },
      { value: '100+', label: 'Payment methods' },
      { value: '24h', label: 'Setup time' },
    ],
    marqueeText: 'UPI • Cards • NetBanking • Wallets • EMI • PayLater • International • Instant webhooks • Branded page • Shareable links •'
  },
  'razorpay-supported-payment-catalogue': {
    heroSubtitle: 'A shoppable catalogue with built-in Razorpay checkout — browse, cart, pay, and get order confirmations automatically.',
    detailedDescription: 'Take your WhatsApp ordering to the next level. Customers browse a visual catalogue, build a cart, and check out with Razorpay — all in one flow. You receive paid orders with payment IDs, customer details, and itemised summaries. No manual payment chasing. Ideal for retailers, boutiques, gift shops, food brands, and anyone selling 10-50 products who wants a lightweight e-commerce alternative.',
    features: [
      { title: 'Product Catalogue Grid', description: 'Up to 50 products with images, variants, stock, and categories.', icon: 'ShoppingBag' },
      { title: 'Persistent Cart', description: 'Cart survives page refresh; saved in localStorage for 7 days.', icon: 'Layers' },
      { title: 'Variant Support', description: 'Size, colour, weight — each with own price and SKU.', icon: 'Diamond' },
      { title: 'Coupon Codes', description: 'Percentage, flat amount, free shipping — with expiry and usage limits.', icon: 'Ticket' },
      { title: 'Razorpay Checkout', description: 'Secure, PCI-compliant payment modal with all methods.', icon: 'CreditCard' },
      { title: 'Order Confirmation', description: 'Auto-generated order ID, PDF invoice, email + WhatsApp notification.', icon: 'Check' },
      { title: 'Inventory Decrement', description: 'Stock reduces on successful payment; out-of-stock blocks purchase.', icon: 'Shield' },
      { title: 'Admin Dashboard', description: 'View orders, filter by status, export CSV, mark shipped/delivered.', icon: 'BarChart2' },
    ],
    process: [
      { step: '01', title: 'Product Data Prep', description: 'CSV template provided — name, price, variants, images, stock, categories.' },
      { step: '02', title: 'Razorpay Config', description: 'Verify account, enable webhooks, set up test mode, configure settlement.' },
      { step: '03', title: 'Catalogue Build', description: 'Import products, configure variants, coupons, shipping rules, tax settings.' },
      { step: '04', title: 'End-to-End Testing', description: 'Place test orders across payment methods; verify invoices, stock decrement, emails.' },
      { step: '05', title: 'Launch & Train', description: 'Go live, share admin access, record 20-min training for order management.' },
    ],
    faq: [
      { q: 'Is this a full e-commerce site?', a: 'It\'s a lightweight catalogue + checkout — no customer accounts, wishlist, or complex shipping rules. For full e-commerce, see our E-commerce Development service.' },
      { q: 'Can I use my own payment gateway?', a: 'This service is Razorpay-only. For other gateways, custom development is required.' },
      { q: 'How are refunds handled?', a: 'Refunds initiated from Razorpay dashboard; stock auto-restored. We document the workflow.' },
      { q: 'What about GST invoices?', a: 'Razorpay generates GST-compliant invoices automatically. Your GSTIN is configured once.' },
    ],
    trustPoints: [
      'End-to-end payment flow',
      'Auto inventory sync',
      'GST invoices included',
      'Admin dashboard access',
    ],
    stats: [
      { value: '50', label: 'Max products' },
      { value: '2%', label: 'Razorpay TDR' },
      { value: 'Instant', label: 'Order alerts' },
      { value: '1', label: 'Admin dashboard' },
    ],
    marqueeText: 'Shoppable catalogue • Razorpay checkout • Variants • Coupons • Auto invoices • Inventory sync • Admin panel • Order tracking •'
  },
  'digital-product-catalogue': {
    heroSubtitle: 'A beautiful, shareable product catalogue — browse, filter, enquire, and share as one link. No payments, just enquiries.',
    detailedDescription: 'Showcase your range without the complexity of e-commerce. We build a fast, visual catalogue with categories, filters, and search — each product has an "Enquire" button that opens a pre-filled WhatsApp message or enquiry form. Perfect for wholesalers, manufacturers, artisans, interior designers, and anyone who sells via conversation, not checkout.',
    features: [
      { title: 'Up to 50 Products', description: 'Images, descriptions, specifications, pricing (optional), and tags.', icon: 'ShoppingBag' },
      { title: 'Category & Tag Filters', description: 'Multi-select filters — Material, Use-case, Price range, Collection.', icon: 'Layers' },
      { title: 'Search with Autocomplete', description: 'Instant results as customers type product names or codes.', icon: 'Search' },
      { title: 'Enquire via WhatsApp', description: 'One-tap opens WhatsApp with product name, code, and customer details pre-filled.', icon: 'MessageSquare' },
      { title: 'Enquiry Form Alternative', description: 'For non-WhatsApp users — clean form with file upload for custom requests.', icon: 'Mail' },
      { title: 'Shareable Product Links', description: 'Each product has a unique URL for social, email, or sales team sharing.', icon: 'Link2' },
      { title: 'QR Codes for Print', description: 'Catalogue link + individual product QR codes for packaging and trade shows.', icon: 'Smartphone' },
      { title: 'Dark/Light Mode', description: 'Automatic or manual toggle; respects system preference.', icon: 'Monitor' },
    ],
    process: [
      { step: '01', title: 'Product Audit', description: 'Review your SKU list, categorise, identify hero products and filter attributes.' },
      { step: '02', title: 'Asset Collection', description: 'Images (we provide specs), specifications, pricing strategy, and enquiry preferences.' },
      { step: '03', title: 'Catalogue Build', description: 'Configure categories, filters, product cards, enquiry templates, and QR codes.' },
      { step: '04', title: 'Review & Test', description: 'Test on mobile/desktop, verify enquiry flows, check image loading speeds.' },
      { step: '05', title: 'Launch Kit', description: 'Shareable link, QR code pack, social media templates, and sales team guide.' },
    ],
    faq: [
      { q: 'Can customers buy directly?', a: 'No — this is an enquiry catalogue. For payments, see the Payment Catalogue service.' },
      { q: 'How do I update products?', a: 'You get a simple admin panel to add/edit/remove products, toggle visibility, and update prices.' },
      { q: 'Can I hide prices?', a: 'Yes — price display is optional per product. Great for "price on request" B2B catalogues.' },
      { q: 'Is there a product limit?', a: 'Up to 50 products included. Additional products at ₹50/product as a one-time add-on.' },
    ],
    trustPoints: [
      'Enquiry-focused design',
      'WhatsApp + Form dual flow',
      'Print-ready QR codes',
      'No monthly fees',
    ],
    stats: [
      { value: '50', label: 'Products included' },
      { value: '3s', label: 'Search response' },
      { value: '2', label: 'Enquiry channels' },
      { value: '48h', label: 'Delivery' },
    ],
    marqueeText: 'Visual catalogue • Category filters • Search • WhatsApp enquiry • Form fallback • Share links • QR codes • Dark mode •'
  },
  'digital-menu-with-qr-code': {
    heroSubtitle: 'A stunning digital menu — QR codes on tables, real-time updates, multi-language, and zero reprinting costs.',
    detailedDescription: 'Replace laminated menus with a fast, visual digital menu. Customers scan a QR code, browse categories (Starters, Mains, Drinks, Desserts), see dietary tags (Veg, Vegan, Gluten-free, Spicy), and view high-quality photos. You update prices, add specials, or mark items unavailable in seconds from your phone — no designer, no printer, no waste. Includes table-specific QR codes, a printable menu PDF backup, and analytics on popular items.',
    features: [
      { title: 'Category-Based Navigation', description: 'Starters, Mains, Sides, Drinks, Desserts, Combos — swipe or tab.', icon: 'Layers' },
      { title: 'Dietary & Allergen Tags', description: 'Veg, Vegan, GF, Nut-free, Spicy, Halal — icons + filter.', icon: 'Heart' },
      { title: 'Price Variants', description: 'Half/Full plate, Small/Medium/Large, with per-variant pricing.', icon: 'Target' },
      { title: 'High-Quality Images', description: 'Optimized food photography; lazy-loaded; fallback to placeholder.', icon: 'Image' },
      { title: 'Real-Time Edits', description: 'Admin panel: toggle availability, update prices, add daily specials instantly.', icon: 'Zap' },
      { title: 'Table-Specific QR Codes', description: 'Unique QR per table; you know exactly where the order originated.', icon: 'MapPin' },
      { title: 'Print-Ready PDF Backup', description: 'Auto-generated A4 menu for walk-ins or power outages.', icon: 'FileText' },
      { title: 'Multi-Language Support', description: 'English + 1 regional language included (Hindi, Tamil, Kannada, etc.).', icon: 'Globe' },
    ],
    process: [
      { step: '01', title: 'Menu Audit', description: 'Review current menu, categorise items, identify dietary tags and price variants.' },
      { step: '02', title: 'Photography Session', description: 'We provide a shot list (top-down, 45°, close-up). You shoot or we connect a local photographer.' },
      { step: '03', title: 'Menu Build', description: 'Configure categories, items, variants, tags, QR codes, and PDF template.' },
      { step: '04', title: 'Table QR Printing', description: 'We generate table-specific QR codes (PDF, 300 DPI) — you print & laminate.' },
      { step: '05', title: 'Staff Training', description: '15-min walkthrough: how to mark items 86\'d, add specials, check analytics.' },
    ],
    faq: [
      { q: 'Do customers need internet?', a: 'Yes — but the menu caches for 5 minutes. If WiFi drops, they see the last loaded version.' },
      { q: 'Can I have different menus for lunch/dinner?', a: 'Yes — schedule-based menu switching is included (e.g., Breakfast 7-11, Lunch 12-4, Dinner 5-11).' },
      { q: 'What if I don\'t have food photos?', a: 'We provide styled placeholders by category. You can upgrade to professional photography later.' },
      { q: 'Is there a monthly fee?', a: 'No — one-time setup. Hosting free for 12 months, then ₹499/yr. Admin panel included.' },
    ],
    trustPoints: [
      'Real-time menu updates',
      'Table-specific QR codes',
      'Dietary filter built-in',
      'Print PDF auto-generated',
    ],
    stats: [
      { value: 'Unlimited', label: 'Menu items' },
      { value: '50', label: 'Table QR codes' },
      { value: '2', label: 'Languages included' },
      { value: 'Instant', label: 'Updates live' },
    ],
    marqueeText: 'QR menu • Real-time edits • Dietary tags • Price variants • Multi-language • Table QR • Print backup • Analytics •'
  },
  'google-business-profile-setup': {
    heroSubtitle: 'Own your local presence — verified Google Business Profile with photos, posts, reviews, and insights.',
    detailedDescription: 'When someone searches "near me," your Google Business Profile is the first thing they see. We set up and optimise your profile end-to-end: verification, NAP consistency, categories, attributes, photos, business hours, services, products, Q&A, and review management. You get a monthly insights report showing searches, views, calls, direction requests, and website clicks — so you know exactly how customers find you.',
    features: [
      { title: 'Profile Claim & Verification', description: 'Postcard, phone, email, or video verification — we handle the full flow.', icon: 'Shield' },
      { title: 'NAP Consistency Audit', description: 'Name, Address, Phone matched across Google, website, social, directories.', icon: 'MapPin' },
      { title: 'Category & Attribute Optimisation', description: 'Primary + secondary categories; attributes (WiFi, parking, wheelchair access, etc.).', icon: 'Layers' },
      { title: 'Photo & Video Upload', description: 'Cover, logo, interior, exterior, team, products — 20+ photos optimised.', icon: 'Image' },
      { title: 'Business Hours & Special Hours', description: 'Regular hours + holiday/special hours for festivals and events.', icon: 'Clock' },
      { title: 'Services & Products Listing', description: 'Detailed service menu with prices; product catalogue with "Buy" buttons.', icon: 'ShoppingBag' },
      { title: 'Review Management SOP', description: 'Templates for 5-star, 4-star, and negative reviews; auto-alerts for new reviews.', icon: 'Star' },
      { title: 'Monthly Insights Report', description: 'Search queries, profile views, calls, directions, website clicks, photo views.', icon: 'BarChart2' },
    ],
    process: [
      { step: '01', title: 'Access & Audit', description: 'You grant manager access; we audit existing profile (or create new) and document gaps.' },
      { step: '02', title: 'Verification', description: 'Initiate verification (postcard/phone/video); monitor until "Verified" badge appears.' },
      { step: '03', title: 'Optimisation Sprint', description: 'Complete all fields, upload photos, configure services/products, set up Q&A.' },
      { step: '04', title: 'Review SOP & Alerts', description: 'Deliver review response templates; configure email alerts for new reviews.' },
      { step: '05', title: 'Insights Baseline', description: 'First monthly report delivered; ongoing reports auto-scheduled.' },
    ],
    faq: [
      { q: 'What if I already have a profile?', a: 'We audit and optimise it. If it\'s unverified or duplicated, we fix that first.' },
      { q: 'How long does verification take?', a: 'Postcard: 7-14 days. Phone/Email/Video: instant to 48 hours. We choose the fastest eligible method.' },
      { q: 'Can you manage reviews for me?', a: 'We provide templates and alerts. Ongoing review management is a monthly add-on (₹999/mo).' },
      { q: 'Do I need a physical address?', a: 'Yes — for local businesses. Service-area businesses can hide address but must serve a defined area.' },
    ],
    trustPoints: [
      'Verified badge guaranteed',
      'Monthly insights reports',
      'Review templates included',
      'NAP consistency fixed',
    ],
    stats: [
      { value: '100%', label: 'Verification rate' },
      { value: '20+', label: 'Photos uploaded' },
      { value: 'Monthly', label: 'Insights reports' },
      { value: '7-14d', label: 'Verification time' },
    ],
    marqueeText: 'Verified profile • NAP consistency • Categories • Attributes • Photos • Hours • Services • Reviews • Insights • Q&A •'
  },
  'instagram-business-setup': {
    heroSubtitle: 'An Instagram presence that converts — optimised bio, highlights, shop, and content strategy.',
    detailedDescription: 'Instagram is your visual storefront. We set up your Business account from scratch or overhaul an existing one: bio optimisation with keywords and CTA, Highlight covers designed to your brand, Story templates, Shopping setup (if eligible), Link in Bio page, Contact buttons, and a 30-day content calendar with post ideas, Reel concepts, and hashtag sets. You launch with a professional, cohesive presence ready to attract and convert.',
    features: [
      { title: 'Business Account Conversion', description: 'Personal → Business; category selection; contact options enabled.', icon: 'Smartphone' },
      { title: 'Bio Optimisation', description: '150 characters: value prop + keywords + location + CTA + link.', icon: 'Target' },
      { title: 'Highlight Covers (8-10)', description: 'Custom-designed covers: About, Services, Reviews, FAQ, Offers, Team, etc.', icon: 'Layers' },
      { title: 'Story Templates (6)', description: 'Branded templates for polls, Q&A, new launch, testimonial, offer, behind-scenes.', icon: 'Sparkles' },
      { title: 'Instagram Shop Setup', description: 'Product catalogue sync (if eligible); product tags in posts/Reels/Stories.', icon: 'ShoppingBag' },
      { title: 'Link in Bio Page', description: 'Mobile landing page with 6-8 links: website, WhatsApp, catalogue, booking, etc.', icon: 'Link2' },
      { title: 'Contact Buttons', description: 'Email, Phone, Directions, WhatsApp — one-tap from profile.', icon: 'Mail' },
      { title: '30-Day Content Calendar', description: 'Post types, captions, hashtags, Reel ideas, Story prompts — ready to create.', icon: 'Calendar' },
    ],
    process: [
      { step: '01', title: 'Brand & Audit', description: 'Review existing account (if any), define content pillars, visual style, and goals.' },
      { step: '02', title: 'Account Setup', description: 'Convert to Business, select category, connect Facebook Page, enable contacts.' },
      { step: '03', title: 'Visual Assets', description: 'Design Highlight covers, Story templates, profile photo — deliver as Figma/Canva link.' },
      { step: '04', title: 'Bio & Shop', description: 'Write optimised bio, configure Link in Bio, set up Shopping (if eligible).' },
      { step: '05', title: 'Content Calendar', description: 'Deliver 30-day calendar (Google Sheet/Notion) with themes, formats, hashtags.' },
    ],
    faq: [
      { q: 'Do you create the content?', a: 'We provide the strategy, templates, and calendar. Content creation (photos, Reels) is a separate monthly service.' },
      { q: 'What if I\'m not eligible for Instagram Shop?', a: 'We set up the Link in Bio page with product links as an alternative — works for all account sizes.' },
      { q: 'Can you manage the account?', a: 'Account management (posting, community, DMs) is a separate monthly retainer.' },
      { q: 'Do I need a Facebook Page?', a: 'Yes — Instagram Business requires a connected Facebook Page. We create one if needed.' },
    ],
    trustPoints: [
      'Shop-ready setup',
      'Custom Highlight covers',
      'Content calendar included',
      'Link in Bio page built',
    ],
    stats: [
      { value: '10', label: 'Highlight covers' },
      { value: '6', label: 'Story templates' },
      { value: '30', label: 'Content days' },
      { value: '48h', label: 'Setup time' },
    ],
    marqueeText: 'Business account • Bio optimised • Highlights • Story templates • Shop setup • Link in Bio • Contact buttons • Content calendar •'
  },
  'facebook-business-page-setup': {
    heroSubtitle: 'A complete Facebook Business Page — tabs, reviews, messenger, shop, and ads-ready structure.',
    detailedDescription: 'Facebook remains essential for local discovery, community building, and ad targeting. We build your Page from the ground up: correct category, branded visuals, all tabs configured (Services, Shop, Events, Reviews, Offers), Messenger automation with greeting and FAQ, review management templates, and a pixel-ready structure for future ads. You get a professional presence that builds trust and captures leads.',
    features: [
      { title: 'Page Creation & Category', description: 'Correct primary/secondary categories; username/vanity URL claim.', icon: 'Target' },
      { title: 'Branded Visuals', description: 'Cover photo (desktop + mobile), profile photo, CTA button configuration.', icon: 'Image' },
      { title: 'Tabs Configuration', description: 'Services, Shop, Events, Reviews, Offers, Groups, Jobs — enabled & populated.', icon: 'Layers' },
      { title: 'Services Tab', description: 'Up to 10 services with descriptions, prices, duration, and "Book Now" buttons.', icon: 'ShoppingBag' },
      { title: 'Shop Setup', description: 'Product catalogue (if eligible) or external link integration for collections.', icon: 'ShoppingBag' },
      { title: 'Messenger Automation', description: 'Greeting message, instant reply, FAQ buttons, away message, lead capture.', icon: 'MessageSquare' },
      { title: 'Review Management', description: 'Templates for responses; alerts for new reviews; showcase top reviews.', icon: 'Star' },
      { title: 'Meta Pixel Ready', description: 'Pixel installed on website; events configured for future ad campaigns.', icon: 'Zap' },
    ],
    process: [
      { step: '01', title: 'Page Setup', description: 'Create page, select categories, claim username, assign roles (Admin/Editor).' },
      { step: '02', title: 'Visual Identity', description: 'Upload cover, profile, configure CTA button (WhatsApp/Call/Website/Book).' },
      { step: '03', title: 'Tabs & Content', description: 'Enable tabs, populate Services/Shop/Events, write About section with keywords.' },
      { step: '04', title: 'Messenger & Reviews', description: 'Configure automation, FAQ, greeting, away msg; deliver review templates.' },
      { step: '05', title: 'Pixel & Ads Prep', description: 'Install Meta Pixel on website, verify domain, configure standard events.' },
    ],
    faq: [
      { q: 'Can you run ads for me?', a: 'Ad management is a separate monthly service. This setup makes your Page ads-ready.' },
      { q: 'What if I already have a Page?', a: 'We audit and optimise — fix category, update visuals, enable missing tabs, configure Messenger.' },
      { q: 'Is Shop available for all businesses?', a: 'Facebook Shop requires Commerce eligibility. If not eligible, we link to your website catalogue.' },
      { q: 'Do you post content?', a: 'Content posting is a separate monthly service. We provide a 14-day starter content calendar.' },
    ],
    trustPoints: [
      'All tabs configured',
      'Messenger automation live',
      'Meta Pixel installed',
      'Review templates ready',
    ],
    stats: [
      { value: '8', label: 'Tabs configured' },
      { value: '10', label: 'Services listed' },
      { value: '1', label: 'Pixel installed' },
      { value: '48h', label: 'Setup time' },
    ],
    marqueeText: 'Correct category • Branded visuals • Services tab • Shop • Messenger bot • Reviews • Meta Pixel • Ads-ready •'
  },
  'whatsapp-business-profile-setup': {
    heroSubtitle: 'Your WhatsApp Business presence — verified, catalogued, automated, and ready for customers.',
    detailedDescription: 'WhatsApp is where your customers already are. We set up your WhatsApp Business account end-to-end: verification (Green tick), business profile with description/address/hours/website/email, product catalogue (up to 30 items), quick replies for FAQs, greeting/away messages, labels for conversation management, and a click-to-chat link/QR code for your website and packaging. You launch with a professional, responsive presence that converts chats into orders.',
    features: [
      { title: 'Green Tick Verification', description: 'Official Business Account verification — we prepare and submit the application.', icon: 'Shield' },
      { title: 'Complete Business Profile', description: 'Name, description, category, address, hours, website, email, map location.', icon: 'MapPin' },
      { title: 'Product Catalogue (30 items)', description: 'Images, names, prices, descriptions, codes, URLs — synced to WhatsApp catalogue.', icon: 'ShoppingBag' },
      { title: 'Quick Replies (10-15)', description: 'Pre-written responses for FAQs: pricing, delivery, customisation, returns, etc.', icon: 'Zap' },
      { title: 'Greeting & Away Messages', description: 'Auto-reply on first message; out-of-hours message with expected response time.', icon: 'Mail' },
      { title: 'Conversation Labels', description: 'New Order, Pending Payment, Shipped, Delivered, Follow-up — colour-coded.', icon: 'Layers' },
      { title: 'Click-to-Chat Link + QR', description: 'wa.me link with pre-filled message; QR for packaging, signage, receipts.', icon: 'Link2' },
      { title: 'Broadcast List Setup', description: 'Opt-in broadcast list for promotions; template message approval guidance.', icon: 'Users' },
    ],
    process: [
      { step: '01', title: 'Account Creation', description: 'Download WhatsApp Business, register with business number, verify OTP.' },
      { step: '02', title: 'Profile Completion', description: 'Fill all fields, upload logo, set category, add address/hours/website/email.' },
      { step: '03', title: 'Catalogue Build', description: 'Add 30 products with images, prices, descriptions; organise by collections.' },
      { step: '04', title: 'Automation Config', description: 'Quick replies, greeting/away messages, labels, click-to-chat link generation.' },
      { step: '05', title: 'Green Tick Application', description: 'Prepare documents (GST, PAN, website, utility bill), submit, monitor to approval.' },
    ],
    faq: [
      { q: 'Is Green Tick guaranteed?', a: 'We prepare a compliant application. Approval is at Meta\'s discretion (typically 2-4 weeks). We re-apply once if rejected.' },
      { q: 'Can I use my existing personal WhatsApp number?', a: 'No — WhatsApp Business requires a separate number. You can migrate chats if needed.' },
      { q: 'How many quick replies can I have?', a: 'Up to 50 — we set up 15 core ones; you can add more anytime.' },
      { q: 'Can I broadcast promotional messages?', a: 'Yes — but only to opted-in contacts using approved templates. We guide you on compliance.' },
    ],
    trustPoints: [
      'Green Tick application included',
      'Full catalogue setup',
      'Automation configured',
      'Click-to-chat assets delivered',
    ],
    stats: [
      { value: '30', label: 'Catalogue items' },
      { value: '15', label: 'Quick replies' },
      { value: '1', label: 'Click-to-chat QR' },
      { value: '2-4w', label: 'Green Tick timeline' },
    ],
    marqueeText: 'Green Tick • Business profile • Catalogue • Quick replies • Greeting msg • Away msg • Labels • Click-to-chat • Broadcast •'
  },
  'link-in-bio-business-page': {
    heroSubtitle: 'One link, infinite destinations — a branded mobile landing page for your bio with analytics.',
    detailedDescription: 'Your bio link is prime real estate. We build a fast, beautiful, mobile-first landing page that lives at yourname.onlinekardo.in (or your custom domain). Add unlimited links: website, WhatsApp, catalogue, booking, newsletter, YouTube, Instagram, contact form — each with custom icons, descriptions, and UTM tracking. See clicks, click-through rates, and top destinations in a simple dashboard. Perfect for creators, consultants, agencies, and any business with multiple CTAs.',
    features: [
      { title: 'Unlimited Links', description: 'Buttons, cards, or list layout — each with title, description, icon, and URL.', icon: 'Link2' },
      { title: 'Custom Branding', description: 'Logo, brand colours, font, background, favicon — matches your visual identity.', icon: 'Palette' },
      { title: 'Link Scheduling', description: 'Show/hide links by date/time — perfect for limited offers and event registrations.', icon: 'Calendar' },
      { title: 'UTM Auto-Tagging', description: 'Automatic utm_source=linkinbio, utm_medium=social, utm_campaign per link.', icon: 'Target' },
      { title: 'Click Analytics', description: 'Total clicks, unique visitors, CTR, top links, device breakdown, geo — 30-day history.', icon: 'BarChart2' },
      { title: 'Embedded Forms', description: 'Newsletter signup, enquiry form, booking calendar — inline or modal.', icon: 'Mail' },
      { title: 'Social Proof', description: 'Testimonial carousel, client logos, trust badges, review stars.', icon: 'Star' },
      { title: 'Custom Domain', description: 'Use your own domain (links.yourbusiness.com) — we handle DNS and SSL.', icon: 'Globe' },
    ],
    process: [
      { step: '01', title: 'Link Audit', description: 'List all destinations, prioritise top 3, define link labels and descriptions.' },
      { step: '02', title: 'Design & Build', description: 'Apply branding, create link cards, configure scheduling, forms, and UTM rules.' },
      { step: '03', title: 'Analytics Setup', description: 'Configure dashboard, set up custom domain (if chosen), test tracking.' },
      { step: '04', title: 'Review & Launch', description: 'Test on iOS/Android, verify all links, confirm analytics events fire.' },
      { step: '05', title: 'Handover', description: 'Share edit access (Notion/Sheet), dashboard login, and 10-min Loom tutorial.' },
    ],
    faq: [
      { q: 'Can I edit links myself?', a: 'Yes — we provide a simple Notion/Google Sheet that syncs to your page. Edit anytime, no code.' },
      { q: 'Is there a monthly fee?', a: 'Hosting free for 12 months, then ₹499/yr. Analytics dashboard included.' },
      { q: 'Can I use my own domain?', a: 'Yes — we configure DNS (CNAME) and provision SSL. Included in setup.' },
      { q: 'How many links can I add?', a: 'Unlimited — practical limit is 15-20 for mobile UX. We help you prioritise.' },
    ],
    trustPoints: [
      'Unlimited links',
      'Real-time analytics',
      'Custom domain included',
      'Self-editable via Notion',
    ],
    stats: [
      { value: 'Unlimited', label: 'Links' },
      { value: '30d', label: 'Analytics history' },
      { value: '1', label: 'Custom domain' },
      { value: '48h', label: 'Delivery' },
    ],
    marqueeText: 'Unlimited links • Custom branding • Scheduling • UTM tracking • Analytics • Forms • Social proof • Custom domain •'
  },
  'domain-and-business-email-setup': {
    heroSubtitle: 'Your professional identity — custom domain + business email (hello@yourbusiness.in) with full setup and security.',
    detailedDescription: 'A custom domain and matching email address instantly signal credibility. We handle the full lifecycle: domain search and registration (in your name, not ours), DNS configuration, business email on Google Workspace or Zoho, SPF/DKIM/DMARC authentication for deliverability, aliases (sales@, support@, careers@), forwarding rules, and a 1-page security checklist. You own everything — we just set it up right.',
    features: [
      { title: 'Domain Registration', description: '.in, .com, .co.in, .store, .tech — registered in YOUR name, auto-renew enabled.', icon: 'Globe' },
      { title: 'Business Email (Google Workspace)', description: 'hello@yourbusiness.in + 30GB Drive + Meet + Calendar + Docs — ₹136/user/mo.', icon: 'Mail' },
      { title: 'Business Email (Zoho Mail)', description: 'hello@yourbusiness.in + 5GB + Calendar + Tasks — free for up to 5 users forever.', icon: 'Mail' },
      { title: 'Email Authentication', description: 'SPF, DKIM, DMARC, BIMI — configured for inbox delivery and brand logo in inbox.', icon: 'Shield' },
      { title: 'Aliases & Groups', description: 'sales@, support@, info@, careers@, billing@ — forward to primary inbox.', icon: 'Users' },
      { title: 'Forwarding & Catch-all', description: 'Forward to personal Gmail/Outlook; catch-all for typos (any@yourdomain).', icon: 'ArrowRight' },
      { title: 'Mobile Setup Guide', description: 'Step-by-step for iOS Mail, Gmail app, Outlook, Samsung Mail — with screenshots.', icon: 'Smartphone' },
      { title: 'Security Checklist', description: '2FA enforcement, recovery options, admin alerts, data export schedule.', icon: 'Check' },
    ],
    process: [
      { step: '01', title: 'Domain Search', description: 'Check availability of 5-10 options; register chosen domain in your registrar account.' },
      { step: '02', title: 'Email Platform Selection', description: 'Compare Google Workspace vs Zoho; you choose; we provision.' },
      { step: '03', title: 'DNS & Authentication', description: 'Configure MX, SPF, DKIM, DMARC, CNAME for Workspace/Zoho; verify propagation.' },
      { step: '04', title: 'Aliases & Rules', description: 'Create aliases, groups, forwarding, catch-all, signatures, out-of-office.' },
      { step: '05', title: 'Handover & Docs', description: 'Share admin credentials (LastPass/1Password), mobile setup PDF, security checklist.' },
    ],
    faq: [
      { q: 'Who owns the domain?', a: 'You — registered in your name, in your registrar account. We never register domains under our account.' },
      { q: 'Google Workspace vs Zoho — which should I choose?', a: 'Workspace: better ecosystem, 30GB, ₹136/user/mo. Zoho: free for 5 users, 5GB, good for startups. We help you decide.' },
      { q: 'Can I migrate existing emails?', a: 'Yes — we use Google Workspace Migration or Zoho Mail Migration tools (IMAP/POP).' },
      { q: 'What if I want to change providers later?', a: 'You own the domain and DNS. You can point MX records to any provider anytime.' },
    ],
    trustPoints: [
      'Domain in your name',
      'SPF/DKIM/DMARC configured',
      'Mobile setup guides included',
      'Security checklist delivered',
    ],
    stats: [
      { value: '1', label: 'Primary email' },
      { value: '5+', label: 'Aliases included' },
      { value: '2', label: 'Platform options' },
      { value: '24h', label: 'DNS propagation' },
    ],
    marqueeText: 'Custom domain • Business email • SPF/DKIM/DMARC • Aliases • Forwarding • Mobile setup • Security checklist • You own it •'
  },
  'basic-seo-setup': {
    heroSubtitle: 'Search-engine ready — technical SEO foundation, on-page optimisation, and Search Console wiring.',
    detailedDescription: 'SEO isn\'t magic — it\'s a checklist. We execute the complete technical and on-page foundation so search engines can crawl, understand, and index your pages correctly. You get: keyword research for 10-15 target terms, meta titles/descriptions for all pages, heading structure (H1-H3), schema markup (LocalBusiness, Service, Product, FAQ, Breadcrumb), XML sitemap, robots.txt, Core Web Vitals audit, Google Search Console + Analytics (GA4) setup, and a 30-day ranking baseline report. No ongoing retainer — just a solid foundation you can build on.',
    features: [
      { title: 'Keyword Research (15 terms)', description: 'Primary + secondary + long-tail; search volume, difficulty, intent, mapping to pages.', icon: 'Target' },
      { title: 'Meta Optimisation', description: 'Unique titles (50-60 chars) & descriptions (150-160 chars) for every page.', icon: 'FileText' },
      { title: 'Heading Structure', description: 'Single H1 per page; logical H2/H3 hierarchy; keyword-rich but natural.', icon: 'Layers' },
      { title: 'Schema Markup (5 types)', description: 'LocalBusiness, Service, Product, FAQPage, BreadcrumbList — JSON-LD, validated.', icon: 'Code' },
      { title: 'XML Sitemap & Robots.txt', description: 'Auto-generated sitemap; robots.txt with crawl directives; submitted to GSC.', icon: 'FileText' },
      { title: 'Core Web Vitals Audit', description: 'LCP, INP, CLS measured; opportunities documented; quick wins implemented.', icon: 'Zap' },
      { title: 'Search Console + GA4 Setup', description: 'Property verified, sitemap submitted, enhanced measurement, conversions defined.', icon: 'Search' },
      { title: '30-Day Baseline Report', description: 'Impressions, clicks, CTR, avg position for target keywords — delivered at Day 30.', icon: 'BarChart2' },
    ],
    process: [
      { step: '01', title: 'Site Audit', description: 'Crawl with Screaming Frog; identify indexability, speed, content, and technical issues.' },
      { step: '02', title: 'Keyword Research', description: 'Map 15 target keywords to pages; document search volume, difficulty, intent.' },
      { step: '03', title: 'On-Page Implementation', description: 'Update titles, descriptions, headings, schema, image alt text, internal links.' },
      { step: '04', title: 'Technical Configuration', description: 'Sitemap, robots.txt, canonical tags, hreflang (if needed), Search Console setup.' },
      { step: '05', title: 'Baseline & Handover', description: 'GA4 events verified, GSC sitemap submitted, 30-day report scheduled, Loom walkthrough.' },
    ],
    faq: [
      { q: 'Will this get me to page 1?', a: 'This builds the technical foundation. Rankings depend on content depth, backlinks, competition, and time. We don\'t guarantee positions.' },
      { q: 'Do you write content?', a: 'We optimise existing content. New content writing (blog posts, service pages) is a separate service.' },
      { q: 'What if my site is on Wix/Squarespace/WordPress?', a: 'We work on any platform that allows meta, heading, and schema editing. Some builders have limitations we\'ll flag.' },
      { q: 'Is ongoing SEO included?', a: 'No — this is a one-time foundation. Monthly SEO (content + links + technical) is a separate retainer.' },
    ],
    trustPoints: [
      'Technical foundation complete',
      'Schema markup validated',
      'Search Console wired',
      '30-day baseline report',
    ],
    stats: [
      { value: '15', label: 'Target keywords' },
      { value: '5', label: 'Schema types' },
      { value: '100%', label: 'Pages optimised' },
      { value: '30d', label: 'Baseline report' },
    ],
    marqueeText: 'Keyword research • Meta tags • Headings • Schema markup • Sitemap • Core Web Vitals • Search Console • GA4 • Baseline report •'
  },
}

// Sample screens drawn in code, one before/after pair per service. Names and prices are illustrative.
type Row = [icon: string, label: string, value?: string]
interface ScreenData {
  before: { title: string; style: 'chat' | 'note'; lines: string[] }
  after: { title: string; subtitle: string; layout: 'list' | 'grid'; rows: Row[]; action: string; tabs?: string[] }
}

const SCREENS: Record<string, ScreenData> = {
  'one-page-business-website': {
    before: { title: 'No website to share', style: 'chat', lines: ['Do you have a website?', 'No, I will send photos here', 'Where is your shop?', 'What do you offer?'] },
    after: { title: 'The Little Corner', subtitle: 'One page: offer, location and contact', layout: 'list', tabs: ['Home', 'About', 'Contact'], rows: [['🛍️', 'What we offer'], ['📍', 'Indiranagar, Bengaluru'], ['🕗', 'Open 8 am – 8 pm']], action: 'Send an enquiry' } },
  '3-5-page-business-website': {
    before: { title: 'Everything on one crowded page', style: 'note', lines: ['services timings about us doctors address', 'fees? ask on phone', 'photos coming soon', 'scroll down for map… maybe'] },
    after: { title: 'Greenleaf Family Clinic', subtitle: 'A clear page for every question', layout: 'grid', tabs: ['Home', 'Services', 'About', 'Contact'], rows: [['🩺', 'Services'], ['👩‍⚕️', 'Our team'], ['🏥', 'Gallery'], ['📅', 'Visit us']], action: 'Request an appointment' } },
  'whatsapp-ordering-catalogue': {
    before: { title: 'Orders typed out in chat', style: 'chat', lines: ['What do you have today?', 'Fruit box, greens, eggs', 'Price?', 'Send 2… no, 1 of the first one'] },
    after: { title: 'Nila · Fresh Picks', subtitle: 'Pick items, then send one clear order', layout: 'list', rows: [['🥭', 'Seasonal fruit box × 1', '₹420'], ['🥬', 'Greens bundle × 1', '₹260'], ['🥚', 'Farm eggs × 2', '₹360']], action: 'Send order · ₹1,040' } },
  'razorpay-payment-page-or-link': {
    before: { title: 'Chasing a payment', style: 'chat', lines: ['How do I pay the advance?', 'I will send account details', 'Paid. Did you get it?', 'Please send a screenshot'] },
    after: { title: 'Payment request', subtitle: 'The Sugar Window · sample', layout: 'list', rows: [['🎂', 'Cake booking advance', '₹1,250'], ['📱', 'UPI'], ['💳', 'Card']], action: 'Pay ₹1,250' } },
  'razorpay-supported-payment-catalogue': {
    before: { title: 'Totals worked out by hand', style: 'note', lines: ['kurta 899', 'tote 499 ?', 'total = 1398 (check)', 'payment pending – call back'] },
    after: { title: 'Your cart', subtitle: 'Browse, review and pay in one flow', layout: 'list', rows: [['👕', 'Everyday cotton kurta', '₹899'], ['👜', 'Linen tote bag', '₹499'], ['🧾', 'Total', '₹1,398']], action: 'Continue to checkout' } },
  'digital-product-catalogue': {
    before: { title: 'Photos lost in a chat', style: 'chat', lines: ['📷 photo_0412.jpg', '📷 photo_0413.jpg', 'Which one is ₹480?', 'Scroll up, I sent it last week'] },
    after: { title: 'Small Batch Studio', subtitle: 'Every product and price in one link', layout: 'grid', tabs: ['All', 'Home', 'Clothing'], rows: [['☕', 'Ceramic cup', '₹650'], ['👜', 'Cotton tote', '₹480'], ['👕', 'Linen shirt', '₹1,290'], ['🎁', 'Gift set', '₹1,150']], action: 'Enquire about a product' } },
  'digital-menu-with-qr-code': {
    before: { title: 'Printed menu, edited by pen', style: 'note', lines: ['Garden bowl  ₹250 → ₹280', 'Cold brew  (sold out)', 'Seasonal tart  ₹?', 'reprint next week'] },
    after: { title: 'The Garden Table', subtitle: 'Scan the QR code to see today’s menu', layout: 'list', tabs: ['Mains', 'Drinks', 'Desserts'], rows: [['🥗', 'Garden bowl', '₹280'], ['🍛', 'Roasted paneer plate', '₹340'], ['🍋', 'Lemon rice & greens', '₹260']], action: 'Browse full menu' } },
  'google-business-profile-setup': {
    before: { title: 'Incomplete local listing', style: 'note', lines: ['The Daily Loaf', 'Hours: not listed', 'Phone: not listed', 'No photos yet'] },
    after: { title: 'The Daily Loaf', subtitle: 'Bakery · Indiranagar, Bengaluru', layout: 'list', tabs: ['Overview', 'Photos', 'Contact'], rows: [['🕗', 'Open today', '8 am – 8 pm'], ['📍', 'Get directions'], ['📞', 'Call the shop']], action: 'Visit website' } },
  'instagram-business-setup': {
    before: { title: 'A profile with missing details', style: 'note', lines: ['@user_84213', 'Bio: (empty)', 'No contact button', 'No shop link'] },
    after: { title: 'threadandthimble', subtitle: 'Everyday wear · Made in Bengaluru', layout: 'grid', tabs: ['Posts', 'About', 'Contact'], rows: [['👗', 'New arrivals'], ['🧵', 'Made with care'], ['👜', 'Accessories'], ['🏷️', 'Shop']], action: 'Contact the shop' } },
  'facebook-business-page-setup': {
    before: { title: 'Customers unsure it is you', style: 'chat', lines: ['Is this the nursery?', 'What time do you open?', 'Where are you?', 'Do you have a phone number?'] },
    after: { title: 'Little Leaf Nursery', subtitle: 'Plants and growing advice for city homes', layout: 'list', tabs: ['Posts', 'About', 'Contact'], rows: [['🪴', 'New plants every Friday'], ['🕙', 'Visit us', '10 am – 7 pm'], ['💬', 'Ask a plant question']], action: 'Send message' } },
  'whatsapp-business-profile-setup': {
    before: { title: 'Just an unknown number', style: 'chat', lines: ['Who is this?', 'Is this Saffron & Stone?', 'Menu please', 'Are you open now?'] },
    after: { title: 'Saffron & Stone', subtitle: 'Home-style meals · Business profile', layout: 'list', rows: [['🕚', 'Business hours', '11 am – 8 pm'], ['🍱', 'View catalogue'], ['⚡', 'Quick reply: pickup details']], action: 'Start a chat' } },
  'link-in-bio-business-page': {
    before: { title: '“DM me for details”', style: 'chat', lines: ['Where can I see your work?', 'How do I book?', 'Do you sell prints?', 'Link please?'] },
    after: { title: 'Ananya Kapoor', subtitle: 'Photographer · one link for everything', layout: 'list', rows: [['🖼️', 'View portfolio'], ['📅', 'Book a session'], ['🛒', 'Print shop']], action: 'Say hello' } },
  'domain-and-business-email-setup': {
    before: { title: 'Hard to remember', style: 'note', lines: ['freesite.example/u/shop_8841', 'shopname1987@mail.example', 'Different name on every card', '“Can you spell that again?”'] },
    after: { title: 'Your business address', subtitle: 'One name for website and email', layout: 'list', rows: [['🌐', 'www.yourbusiness.in'], ['✉️', 'hello@yourbusiness.in'], ['🔑', 'Registered in your name']], action: 'Share your address' } },
  'basic-seo-setup': {
    before: { title: 'Unclear search result', style: 'note', lines: ['Home', 'yoursite.example/index', 'No description available', 'Page heading missing'] },
    after: { title: 'Everyday Care Clinic', subtitle: 'Family doctor in Bengaluru · sample result', layout: 'list', rows: [['✅', 'Clear page title'], ['✅', 'Useful search description'], ['✅', 'Organised headings']], action: 'Preview search result' } },
}

function ServiceScreen({ serviceId, side, withPhoto = false }: { serviceId: string; side: 'before' | 'after'; withPhoto?: boolean }) {
  const data = SCREENS[serviceId]
  const photo = withPhoto ? COMPARE_PHOTOS[serviceId]?.[side] : undefined
  if (!data) return null
  if (side === 'before') {
    const { title, style, lines } = data.before
    return (
      <div className="relative h-full w-full bg-[#d9d7d2]">
        {photo && <><ScreenPhoto src={photo} className="grayscale" /><div className="absolute inset-0 bg-[#d9d7d2]/70" /></>}
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-5 pt-5 pb-16 text-[#33312d]">
        <b className="mb-2 text-center text-lg md:text-2xl">{title}</b>
        {style === 'chat'
          ? <div className="flex w-full max-w-md flex-col gap-3">{lines.map((line, i) => <span key={line} className={`max-w-[80%] rounded-2xl border border-[#bbb7ae] px-4 py-2.5 text-sm ${i % 2 ? 'self-end bg-[#c9c6be]' : 'self-start bg-[#efede8]'}`}>{line}</span>)}</div>
          : <div className="w-full max-w-sm -rotate-2 border border-[#bbb7ae] bg-[#f1eee5] p-5 font-mono text-sm shadow-md">{lines.map(line => <p key={line} className="!m-0 border-b border-dashed !border-[#c5c0b2] py-3 !text-[#4d4a45]">{line}</p>)}</div>}
        </div>
      </div>
    )
  }
  const { title, subtitle, layout, rows, action, tabs } = data.after
  const accent = SERVICE_IMAGES[serviceId]?.color || '#47539c'
  return (
    <div className="relative h-full w-full bg-[#f3f5fa]">
      {photo && <><ScreenPhoto src={photo} /><div className="absolute inset-0 bg-[#17142e]/35" /></>}
      <div className="relative flex h-full w-full flex-col justify-center px-4 pt-4 pb-16 sm:px-8 md:pb-4">
      <div className={`mx-auto w-full ${photo ? 'max-w-sm' : 'max-w-md'} rounded-2xl border border-[#e1dfee] bg-white p-4 shadow-lg sm:p-5`}>
        <div className="flex items-center gap-3 border-b border-[#eceaf4] pb-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white" style={{ background: accent }}>{title.charAt(0).toUpperCase()}</span>
          <div className="min-w-0"><b className="block text-base leading-tight text-[#1c1a24]">{title}</b><small className="block text-xs text-[#6b6879]">{subtitle}</small></div>
        </div>
        {tabs && <div className="mt-3 flex gap-1.5">{tabs.map((tab, i) => <span key={tab} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${i ? 'bg-[#f1f0f8] text-[#4f4c60]' : 'bg-[#1c1a24] text-white'}`}>{tab}</span>)}</div>}
        <div className={`mt-3 grid gap-2 ${layout === 'grid' ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {rows.map(([icon, label, value]) => (
            <div key={label} className={`flex min-w-0 rounded-xl border border-[#eceaf4] bg-[#fafaff] p-2.5 ${layout === 'grid' ? 'flex-col items-center text-center' : 'items-center gap-3'}`}>
              <span className={layout === 'grid' ? 'text-2xl' : 'text-xl'}>{icon}</span>
              <span className="min-w-0 flex-1 text-xs font-semibold text-[#1c1a24] sm:text-sm">{label}</span>
              {value && <b className="shrink-0 text-xs text-[#47539c] sm:text-sm">{value}</b>}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-full py-2.5 text-center text-sm font-bold text-white" style={{ background: '#1c1a24' }}>{action}</div>
      </div>
      </div>
    </div>
  )
}

// Free stock photos from Unsplash, shown in the header. To use your own photo,
// replace a URL with a path such as '/assets/my-photo.jpg'.
const unsplash = (photo: string) => `https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=1400&q=80`

const HERO_PHOTOS: Record<string, { src: string; alt: string }> = {
  'one-page-business-website': { src: unsplash('1558478551-1a378f63328e'), alt: 'Laptop on a white table' },
  '3-5-page-business-website': { src: unsplash('1591088761584-d3f8540fc587'), alt: 'Laptop beside a green plant' },
  'whatsapp-ordering-catalogue': { src: unsplash('1509017174183-0b7e0278f1ec'), alt: 'Woman holding a smartphone' },
  'razorpay-payment-page-or-link': { src: unsplash('1599050751795-6cdaafbc2319'), alt: 'Phone held over a card reader for payment' },
  'razorpay-supported-payment-catalogue': { src: unsplash('1563013544-824ae1b704d3'), alt: 'Person using a laptop while holding a card' },
  'digital-product-catalogue': { src: unsplash('1556741533-411cf82e4e2d'), alt: 'Person browsing on a monitor' },
  'digital-menu-with-qr-code': { src: unsplash('1766072972117-f3b61a0ccd54'), alt: 'QR code on a café table' },
  'google-business-profile-setup': { src: unsplash('1694928850410-b209896782a2'), alt: 'Map pin on a sheet of paper' },
  'instagram-business-setup': { src: unsplash('1505156868547-9b49f4df4e04'), alt: 'Smartphone showing the Instagram icon' },
  'facebook-business-page-setup': { src: unsplash('1662070479020-73f77887c87c'), alt: 'Facebook icon with reaction symbols' },
  'whatsapp-business-profile-setup': { src: unsplash('1556742111-a301076d9d18'), alt: 'Close-up of a person holding a smartphone' },
  'link-in-bio-business-page': { src: unsplash('1739989934321-fadbccc56265'), alt: 'Man looking at his phone' },
  'domain-and-business-email-setup': { src: unsplash('1773332598414-44a45e364d85'), alt: 'Woman working with a laptop and tablet' },
  'basic-seo-setup': { src: unsplash('1551288049-bebda4e38f71'), alt: 'Performance graphs on a laptop screen' },
}

// Falls back to the sample screen if the photo cannot load
function HeroPhoto({ serviceId }: { serviceId: string }) {
  const [failed, setFailed] = useState(false)
  const photo = HERO_PHOTOS[serviceId]
  if (!photo || failed) return <div className="h-full"><ServiceScreen serviceId={serviceId} side="after" /></div>
  return <img src={photo.src} alt={photo.alt} onError={() => setFailed(true)} className="h-full w-full object-cover" />
}

// Background photos for the before and after slider
const COMPARE_PHOTOS: Record<string, { before: string; after: string }> = {
  'one-page-business-website': { before: unsplash('1585119192382-71236d43b689'), after: unsplash('1591382696684-38c427c7547a') },
  '3-5-page-business-website': { before: unsplash('1583521214690-73421a1829a9'), after: unsplash('1629317337307-e37f95ebc372') },
  'whatsapp-ordering-catalogue': { before: unsplash('1613420471688-009b97bc5655'), after: unsplash('1571867424488-4565932edb41') },
  'razorpay-payment-page-or-link': { before: unsplash('1634733988138-bf2c3a2a13fa'), after: unsplash('1556742521-9713bf272865') },
  'razorpay-supported-payment-catalogue': { before: unsplash('1554224155-1696413565d3'), after: unsplash('1556742502-ec7c0e9f34b1') },
  'digital-product-catalogue': { before: unsplash('1555529669-e69e7aa0ba9a'), after: unsplash('1561715276-a2d087060f1d') },
  'digital-menu-with-qr-code': { before: unsplash('1599250300435-b9693f21830d'), after: unsplash('1642019084045-26e516668025') },
  'google-business-profile-setup': { before: unsplash('1569336415962-a4bd9f69cd83'), after: unsplash('1604357209793-fca5dca89f97') },
  'instagram-business-setup': { before: unsplash('1598305762558-328f599df683'), after: unsplash('1595039838779-f3780873afdd') },
  'facebook-business-page-setup': { before: unsplash('1528698827591-e19ccd7bc23d'), after: unsplash('1611926653458-09294b3142bf') },
  'whatsapp-business-profile-setup': { before: unsplash('1542838132-92c53300491e'), after: unsplash('1556740714-a8395b3bf30f') },
  'link-in-bio-business-page': { before: unsplash('1776715139576-d22cff4c203a'), after: unsplash('1508938255445-041651dfe0c3') },
  'domain-and-business-email-setup': { before: unsplash('1562240020-ce31ccb0fa7d'), after: unsplash('1773332585687-85beb4da71ab') },
  'basic-seo-setup': { before: unsplash('1632152053640-da3a8b3ee812'), after: unsplash('1460925895917-afdab827c52f') },
}

function ScreenPhoto({ src, className = '' }: { src: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return <img src={src} alt="" data-compare draggable={false} onError={() => setFailed(true)} className={`absolute inset-0 h-full w-full object-cover ${className}`} />
}

function BeforeAfterSlider({ service }: { service: Service }) {
  const [position, setPosition] = useState(50)
  const positionRef = useRef(50)
  const pausedUntil = useRef(0)
  const boxRef = useRef<HTMLDivElement>(null)

  const move = (value: number) => { positionRef.current = value; setPosition(value) }
  const hold = () => { pausedUntil.current = performance.now() + 3000 }

  // Sweeps between 15% and 85%; waits after the visitor interacts
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let last = performance.now()
    let direction = 1
    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 50)
      last = now
      const box = boxRef.current?.getBoundingClientRect()
      const visible = !!box && box.bottom > 0 && box.top < window.innerHeight
      if (visible && now > pausedUntil.current) {
        const current = positionRef.current
        if (current >= 85) direction = -1
        if (current <= 15) direction = 1
        move(current + direction * elapsed * 0.018)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div ref={boxRef} className="relative h-[470px] w-full select-none overflow-hidden md:h-[440px]">
      <div role="img" aria-label={`${service.name}: before`} className="absolute inset-0"><ServiceScreen serviceId={service.id} side="before" withPhoto /></div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}><ServiceScreen serviceId={service.id} side="after" withPhoto /></div>
      <span className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-white px-4 py-2 text-xs font-bold tracking-widest text-[#1c1a24] shadow">BEFORE</span>
      <span className="pointer-events-none absolute right-5 bottom-5 rounded-full bg-[#73c2bc] px-4 py-2 text-xs font-bold tracking-widest text-white shadow">AFTER</span>
      <input type="range" min={0} max={100} step="any" value={position} aria-label="Compare before and after" onChange={e => { hold(); move(Number(e.target.value)) }} onPointerDown={hold} onPointerMove={hold} onKeyDown={hold} className="peer absolute inset-0 z-10 !m-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white peer-focus-visible:bg-[#f4c95d]" style={{ left: `${position}%` }}>
        <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#1c1a24] shadow-lg">↔</span>
      </div>
    </div>
  )
}

interface Service {
  id: string
  name: string
  price: number
  category: string
  mark: string
  summary: string
  impact: string
  why: string
  bestFor: string
  brand?: string
  demo: { heading: string; subheading: string; items: string[]; action: string }
}

interface ServiceDetailPageProps { services: Service[] }

// Card titles for "What is included": each card holds two features, in order
const CARD_GROUPS: Record<string, string[]> = {
  'one-page-business-website': ['First impression', 'Offer & proof', 'Contact & footer', 'Mobile & search'],
  '3-5-page-business-website': ['Core pages', 'Services & more', 'Contact & editing', 'Content & insight'],
  'whatsapp-ordering-catalogue': ['Browsing', 'Building the order', 'Sending & stock', 'Reach & alerts'],
  'razorpay-payment-page-or-link': ['Page & links', 'Methods & fields', 'Alerts & part-payments', 'Cards & reports'],
  'razorpay-supported-payment-catalogue': ['Shopping', 'Options & offers', 'Checkout', 'Stock & admin'],
  'digital-product-catalogue': ['Range & filters', 'Search & enquiry', 'Forms & sharing', 'Print & display'],
  'digital-menu-with-qr-code': ['Menu layout', 'Prices & photos', 'Edits & QR codes', 'Print & language'],
  'google-business-profile-setup': ['Verification & details', 'Categories & media', 'Hours & listings', 'Reviews & insights'],
  'instagram-business-setup': ['Account & bio', 'Visual style', 'Shop & links', 'Contact & content'],
  'facebook-business-page-setup': ['Page & branding', 'Tabs & services', 'Shop & messages', 'Reviews & ads'],
  'whatsapp-business-profile-setup': ['Identity', 'Catalogue & replies', 'Messages & labels', 'Sharing & broadcast'],
  'link-in-bio-business-page': ['Links & branding', 'Scheduling & tracking', 'Insight & forms', 'Trust & domain'],
  'domain-and-business-email-setup': ['Domain & Google email', 'Zoho & authentication', 'Addresses & routing', 'Setup & security'],
  'basic-seo-setup': ['Keywords & metadata', 'Structure & schema', 'Crawling & speed', 'Tracking & reporting'],
}

function FeatureCards({ serviceId, features }: { serviceId: string; features: { title: string; description: string; icon: keyof typeof ICON_COMPONENTS }[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({})
  const groups = Array.from({ length: Math.ceil(features.length / 2) }, (_, i) => features.slice(i * 2, i * 2 + 2))
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, i) => {
        const active = group[picked[i] ?? 0]
        const GroupIcon = ICON_COMPONENTS[active.icon] || Check
        return (
          <article key={i} className="flex min-w-0 flex-col rounded-[28px] border border-[#e1dfee] bg-white p-6 shadow-[0_6px_24px_rgba(30,27,75,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(30,27,75,0.14)]">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eeedf7] text-[#47539c]"><GroupIcon size={24} /></span>
              <h3 className="!m-0 !text-lg !font-bold !leading-tight !text-[#1c1a24]">{CARD_GROUPS[serviceId]?.[i] || `Part ${i + 1}`}</h3>
            </div>
            <div className="mt-5 flex flex-col items-start gap-2">
              {group.map((f, j) => {
                const selected = f === active
                return (
                  <button key={f.title} type="button" aria-pressed={selected} onClick={() => setPicked(current => ({ ...current, [i]: j }))} className={`cursor-pointer rounded-full border px-4 py-2 text-left text-sm font-semibold transition ${selected ? '!border-[#e6d3ad] !bg-[#edeaf6] !text-[#8a6420]' : '!border-[#e1dfee] !bg-[#f8f7fc] !text-[#1c1a24] hover:!border-[#6a5fb8]'}`}>{f.title}</button>
                )
              })}
            </div>
            <p aria-live="polite" className="!mt-4 !mb-0 !text-[15px] !leading-relaxed !text-[#6b6879]">{active.description}</p>
          </article>
        )
      })}
    </div>
  )
}

// Three-question recommender. Answers live only in component state.
const FIT_QUESTIONS = [
  { title: 'What should customers do first?', options: [['learn', 'Learn about my business'], ['order', 'Browse or order'], ['pay', 'Pay me online'], ['find', 'Find and contact me']] },
  { title: 'How much do you need to show?', options: [['simple', 'Just the essentials'], ['detailed', 'Several pages, products or links']] },
  { title: 'Do you already have a website?', options: [['yes', 'Yes'], ['no', 'Not yet']] },
]

function recommend([goal, size, site]: string[]): string {
  const simple = size === 'simple'
  if (goal === 'order') return simple ? 'whatsapp-ordering-catalogue' : 'digital-product-catalogue'
  if (goal === 'pay') return simple ? 'razorpay-payment-page-or-link' : 'razorpay-supported-payment-catalogue'
  if (goal === 'find') return simple ? 'google-business-profile-setup' : site === 'yes' ? 'basic-seo-setup' : 'link-in-bio-business-page'
  if (site === 'yes' && simple) return 'basic-seo-setup'
  return simple ? 'one-page-business-website' : '3-5-page-business-website'
}

function FitCheck({ services, current, onEnquire }: { services: Service[]; current: Service; onEnquire: (name: string) => void }) {
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const done = answers.every(Boolean)
  const match = done ? services.find(s => s.id === recommend(answers)) : undefined
  const target = match || current
  const remaining = answers.filter(a => !a).length

  return (
    <div className="grid overflow-hidden rounded-[32px] border border-[#e1dfee] bg-white shadow-[0_14px_44px_rgba(30,27,75,0.10)] lg:grid-cols-2">
      <div className="min-w-0 p-7 md:p-12">
        <p className="!mt-0 !mb-8 !text-[15px] !text-[#6b6879]">A quick check. Your answers stay in your browser.</p>
        {FIT_QUESTIONS.map((q, i) => (
          <fieldset key={q.title} className="!m-0 !mb-6 !border-0 !p-0">
            <legend className="mb-3 text-sm font-bold tracking-[.12em] text-[#6a5fb8] uppercase">{i + 1} · {q.title}</legend>
            <div className="flex flex-wrap gap-3">
              {q.options.map(([value, label]) => {
                const selected = answers[i] === value
                return (
                  <button key={value} type="button" aria-pressed={selected} onClick={() => setAnswers(list => list.map((a, n) => n === i ? value : a))} className={`cursor-pointer rounded-full border-2 px-5 py-3 text-[15px] font-semibold transition hover:-translate-y-0.5 ${selected ? '!border-[#47539c] !bg-[#47539c] !text-white shadow-md' : '!border-[#e1dfee] !bg-[#f8f7fc] !text-[#1c1a24] hover:!border-[#6a5fb8]'}`}>{label}</button>
                )
              })}
            </div>
          </fieldset>
        ))}
        {answers.some(Boolean) && <button type="button" onClick={() => setAnswers(['', '', ''])} className="cursor-pointer !border-0 !bg-transparent !p-0 text-sm font-semibold !text-[#6b6879] underline underline-offset-4">Start over</button>}
      </div>
      <div aria-live="polite" className="flex min-w-0 flex-col items-start justify-center bg-gradient-to-br from-[#47539c] via-[#2f3263] to-[#17142e] p-7 md:p-12">
        <span className="text-sm font-bold tracking-[.14em] text-[#73c2bc] uppercase">Our suggestion</span>
        <h3 className="!mt-4 !mb-4 !text-3xl !leading-tight !font-medium !text-white md:!text-4xl">{match ? match.name : done ? "Let's talk it through" : 'Answer the three questions →'}</h3>
        <p className="!mt-0 !mb-3 max-w-md !text-lg !leading-relaxed !text-white/65">{match ? match.summary : done ? 'Tell us about your business and ask which setup fits.' : `${remaining} to go. We'll point you to the service that matches your answers.`}</p>
        {match && <p className="!mt-0 !mb-0 !font-semibold !text-white">{money(match.price)}{match.id === current.id ? ' · You are on the right page' : ''}</p>}
        <button type="button" onClick={() => onEnquire(target.name)} className="mt-8 inline-flex cursor-pointer items-center gap-3 rounded-full !border-0 !bg-[#73c2bc] px-8 py-4 text-lg font-bold !text-white transition hover:-translate-y-0.5 hover:shadow-xl">Ask about {match ? 'this match' : 'this service'} <ArrowRight size={18} /></button>
        {match && match.id !== current.id && <Link to={`/services/${match.id}`} className="mt-4 text-sm font-semibold !text-white underline underline-offset-4">View {match.name}</Link>}
      </div>
    </div>
  )
}

export default function ServiceDetailPage({ services }: ServiceDetailPageProps) {
  const { id } = useParams<{ id: string }>()
  const { openEnquiry } = useEnquiry()
  const service = services.find(s => s.id === id)

  useEffect(() => { if (service) document.title = `${service.name} for Small Businesses | OnlineKarDo` }, [service])

  if (!service) return <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}><h2>Service not found</h2><Link to="/services" className="button button-primary"><ArrowLeft size={15} /> Back to services</Link></div>

  const backToServices = () => window.history.back()
  const serviceUrl = `https://onlinekardo.com/services/${service.id}`
  const svcImg = SERVICE_IMAGES[service.id]
  const svcContent = SERVICE_CONTENT[service.id]
  const goTo = (target: string) => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
  const [titleColor, from, to] = HERO_COLORS[service.id] || ['#1c1a24', '#47539c', '#6a5fb8']
  const IconComp = svcImg ? ICON_COMPONENTS[svcImg.icon] : Monitor

  return (
    <main className="service-detail-page" id="top">
      <SEO title={`${service.name} for Small Businesses | OnlineKarDo`} description={service.summary} canonical={`/services/${service.id}`} structuredData={{ '@type': 'Service', name: service.name, description: service.summary, provider: { '@type': 'Organization', name: 'OnlineKarDo', url: 'https://onlinekardo.com' }, offers: { '@type': 'Offer', name: service.name, description: service.summary, price: service.price, priceCurrency: 'INR', availability: 'https://schema.org/InStock', url: serviceUrl }, category: service.category, url: serviceUrl }} />
      <ServiceSchema name={service.name} description={service.summary} price={service.price} category={service.category} url={serviceUrl} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://onlinekardo.com' }, { name: 'Services', url: 'https://onlinekardo.com/services' }, { name: service.name, url: serviceUrl }]} />

      {/* Hero */}
      <section className="service-detail-hero overflow-hidden bg-[#f7f6fb] pt-8 pb-16 md:pb-24">
        <div className="container">
          <button className="detail-back mb-8" onClick={backToServices}><ArrowLeft size={15} /> Back to all services</button>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="min-w-0">
              <div className="flex items-center gap-4"><span className="h-0.5 w-12" style={{ background: to }} /><span className="text-sm font-bold tracking-[.14em] uppercase" style={{ color: from }}>{service.category}</span></div>
              <h1 className="!mt-5 !mb-0 !text-4xl !leading-[1.04] !font-semibold !tracking-[-.045em] md:!text-6xl"><span style={{ color: titleColor }}>{service.name},</span> <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${from}, ${to})` }}>set up around your business</span></h1>
              <p className="!mt-6 !mb-0 max-w-xl !text-lg !leading-relaxed !text-[#6b6879]">{svcContent?.heroSubtitle || service.summary} <button type="button" onClick={() => goTo('details')} className="cursor-pointer !border-0 !bg-transparent !p-0 font-semibold underline underline-offset-4" style={{ color: from }}>Read more</button></p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button type="button" className="inline-flex cursor-pointer items-center gap-3 rounded-full !border-2 px-8 py-4 text-lg font-bold !text-white shadow-md transition hover:-translate-y-0.5" style={{ background: from, borderColor: from }} onClick={() => openEnquiry(service.name)}>Get a quote <ArrowRight size={18} /></button>
                <button type="button" className="inline-flex cursor-pointer items-center gap-3 rounded-full !border-2 !bg-transparent px-8 py-4 text-lg font-bold transition hover:-translate-y-0.5" style={{ color: titleColor, borderColor: titleColor }} onClick={() => goTo('compare')}>See before &amp; after <ArrowUpRight size={18} /></button>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-2xl border border-[#e1dfee] bg-white p-4 shadow-sm">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: from }}><IconComp size={24} /></span>
                  <span className="min-w-0"><b className="block text-xl" style={{ color: titleColor }}>{money(service.price)}</b><small className="block text-sm text-[#6b6879]">One-time setup fee</small></span>
                </div>
                <button type="button" onClick={() => goTo('fit')} className="flex cursor-pointer items-center gap-4 rounded-2xl !border !border-[#e1dfee] !bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: to }}><Check size={24} /></span>
                  <span className="min-w-0"><b className="block" style={{ color: titleColor }}>Is it right for you?</b><small className="block text-sm !text-[#6b6879]">Answer three questions</small></span>
                </button>
              </div>
              <small className="mt-5 block text-[#6b6879]">Third-party subscriptions, fees and approvals are separate where applicable.</small>
            </div>
            <div className="h-[340px] min-w-0 overflow-hidden rounded-[32px] border border-[#e1dfee] bg-[#eeedf7] shadow-[0_30px_70px_rgba(30,27,75,0.16)] md:h-[500px]">
              <HeroPhoto key={service.id} serviceId={service.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section id="details" className="py-24 bg-white">
        <div className="container max-w-4xl">
          <h2 className="!font-display !text-4xl !tracking-[-.05em] mb-8">What you get</h2>
          <div className="prose prose-lg text-[#5d6962] max-w-none">{svcContent?.detailedDescription || ''}</div>
        </div>
      </section>

      {/* Recommender */}
      <section id="fit" className="bg-[#f7f6fb] py-24">
        <div className="container">
          <span className="text-base font-medium text-[#8b93c4]">Not sure yet?</span>
          <h2 className="!mt-3 !mb-4 !text-4xl !tracking-[-.04em] !text-[#1c1a24] md:!text-5xl">Is this the right setup for you?</h2>
          <p className="!mt-0 !mb-10 max-w-2xl !text-lg !leading-relaxed !text-[#6b6879]">Answer three questions to get a suggestion before you enquire.</p>
          <FitCheck key={service.id} services={services} current={service} onEnquire={openEnquiry} />
        </div>
      </section>

      {/* Before / after */}
      <section id="compare" className="bg-[#f7f6fb] pb-16">
        <div className="container !max-w-[1400px]">
          <article className="w-full overflow-hidden rounded-[32px] border border-[#e1dfee] bg-white shadow-[0_14px_44px_rgba(30,27,75,0.10)]">
            <BeforeAfterSlider key={service.id} service={service} />
            <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-2 lg:gap-12">
              <div className="min-w-0">
              <span className="text-sm font-bold tracking-[.12em] text-[#6a5fb8] uppercase">{service.category} · Before and after</span>
              <h2 className="!mt-3 !mb-3 !text-3xl !tracking-[-.04em] !text-[#1c1a24] md:!text-4xl">See what could change</h2>
              <p className="!m-0 !text-lg !leading-relaxed !text-[#6b6879]">{service.impact}</p>
              </div>
              <div className="min-w-0">
              <ul className="!m-0 !mb-5 !list-none space-y-2 !p-0">
                {svcContent?.features?.slice(0, 3).map(f => <li key={f.title} className="flex items-start gap-3 text-[#1c1a24]"><Check size={20} className="mt-0.5 shrink-0 text-[#4caf7d]" />{f.title}</li>)}
              </ul>
              <button type="button" className="inline-flex cursor-pointer items-center gap-3 rounded-full !border-2 !border-[#1c1a24] !bg-transparent px-7 py-3 text-base font-bold !text-[#1c1a24] transition hover:!bg-[#1c1a24] hover:!text-white" onClick={() => openEnquiry(service.name)}>Get a quote <ArrowRight size={18} /></button>
              <small className="mt-5 block text-[#6b6879]">Sample business examples over stock photos, not client work. Your business details and results will differ.</small>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Feature cards */}
      {!!svcContent?.features?.length && (
        <section className="bg-[#f7f6fb] pb-24">
          <div className="container">
            <span className="text-base font-medium text-[#8b93c4]">What is included</span>
            <h2 className="!mt-3 !mb-4 !text-4xl !tracking-[-.04em] !text-[#1c1a24] md:!text-5xl">Every part, explained</h2>
            <p className="!mt-0 !mb-10 max-w-2xl !text-lg !leading-relaxed !text-[#6b6879]">Select any item to see what it covers.</p>
            <FeatureCards key={service.id} serviceId={service.id} features={svcContent.features} />
          </div>
        </section>
      )}

      {/* Process Timeline */}
      <section className="py-24 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: svcImg?.color || '#e36a27' }}>Our process</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">From zero to live in 5 steps</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${svcImg?.color || '#e36a27'}33, transparent)` }} />
            {svcContent?.process?.map((p, i) => (
              <div key={i} className="relative pl-20 pb-12 last:pb-0">
                <div className="absolute left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: svcImg?.color || '#e36a27' }}>{p.step}</div>
                <div className="bg-[#fffaf0] rounded-[16px] p-6 border-l-4" style={{ borderColor: svcImg?.color || '#e36a27' }}>
                  <h3 className="text-lg font-bold text-[#102a3d] mb-2">{p.title}</h3>
                  <p className="text-[#5d6962] [overflow-wrap:anywhere]">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Points + Stats */}
      <section className="py-24" style={{ background: svcImg?.bgColor || '#f6f3fb' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-[#102a3d] mb-6">Why choose OnlineKarDo</h3>
              <ul className="space-y-4">
                {svcContent?.trustPoints?.map((t, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Check size={20} className="shrink-0 mt-1" style={{ color: svcImg?.color || '#e36a27' }} />
                    <span className="text-[#5d6962]">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {svcContent?.stats?.map((s, i) => (
                <div key={i} className="bg-white rounded-[16px] p-6 text-center border border-[#e8e0f3]">
                  <div className="text-4xl font-bold" style={{ color: svcImg?.color || '#e36a27' }}>{s.value}</div>
                  <div className="text-sm text-[#5d6962] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: svcImg?.color || '#e36a27' }}>Questions</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Straight answers</h2>
          </div>
          <div className="space-y-4">
            {svcContent?.faq?.map((f, i) => (
              <details key={i} className="group bg-[#fffaf0] rounded-[16px] border border-[#e8e0f3] overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-[#102a3d] pr-8">{f.q}</h3>
                  <ArrowRight size={20} className="text-[#5d6962] group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-[#5d6962] leading-relaxed border-t border-[#e8e0f3]">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${svcImg?.color || '#e36a27'} 0%, ${svcImg?.color || '#e36a27'}dd 100%)` }}>
        <div className="container text-center">
          <span className="eyebrow !text-white/80">A useful next step</span>
          <h2 className="!text-4xl md:!text-5xl !font-display !tracking-[-.05em] !text-white mt-2 mb-4">Make {service.name.toLowerCase()} work for your business</h2>
          <p className="!text-white/80 !text-lg mb-8 max-w-xl mx-auto">Ask us what details we need and how this setup could fit your customers.</p>
          <button className="button button-white !rounded-full !px-8 !py-4 text-lg" onClick={() => openEnquiry(service.name)}>Start with this service <ArrowUpRight size={15} /></button>
        </div>
      </section>
    </main>
  )
}
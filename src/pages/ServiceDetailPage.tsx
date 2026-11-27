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

function Marquee({ text, speed = 30, className = '' }: { text: string; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(30)
  useEffect(() => {
    if (ref.current) {
      const w = ref.current.scrollWidth
      setDuration(w / speed)
    }
  }, [speed])
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div ref={ref} className="inline-flex gap-8" style={{ animation: `marquee ${duration}s linear infinite` }}>
        {text.split(' • ').map((item: string, i: number) => <span key={i} className="px-4">{item} •</span>)}
        {text.split(' • ').map((item: string, i: number) => <span key={i + 100} className="px-4">{item} •</span>)}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  )
}

const BRAND_NAMES: Record<string, string> = { razorpay: 'Razorpay', google: 'Google', instagram: 'Instagram', facebook: 'Facebook', whatsapp: 'WhatsApp' }

// Demo Components
function OnePageWebsiteDemo() {
  const [section, setSection] = useState('Home')
  const copy = ({ Home: ['A good place to begin.', 'A clear welcome, your main offer and the best way to reach you.'], About: ['Small business. Personal service.', 'Introduce your team, your story and what makes your approach yours.'], Contact: ["We're easy to find.", 'Show your location, opening hours and a simple enquiry action.'] } as Record<string, string[]>)[section]
  return (
    <div className="specific-demo website-sample">
      <div className="specific-top"><b>✳ THE LITTLE CORNER</b><span>BUSINESS WEBSITE</span></div>
      <div className="specific-tabs">{Object.keys({Home: 1, About: 1, Contact: 1}).map(tab => <button className={section === tab ? 'selected' : ''} key={tab} onClick={() => setSection(tab)}>{tab}</button>)}</div>
      <div className="website-sample-hero"><small>{section.toUpperCase()} · BENGALURU</small><h3>{copy[0]}</h3><p>{copy[1]}</p><button className="sample-action" onClick={() => setSection(section === 'Contact' ? 'Home' : 'Contact')}>Find out more <ArrowUpRight size={13} /></button></div>
      <div className="sample-footnote">One page · Sections linked from the top navigation</div>
    </div>
  )
}

function MultiPageWebsitePreview() {
  const pages = [
    { name: 'Home', eyebrow: 'GREENLEAF FAMILY CLINIC · BENGALURU', title: 'Care that listens.', body: 'Thoughtful family healthcare, built around clear conversations and care at every age.', visual: '✳', action: 'Meet the clinic' },
    { name: 'Services', eyebrow: 'HOW WE CAN HELP', title: 'The right care, close to home.', body: 'Explore everyday health services and find the right appointment for you and your family.', visual: '✚', action: 'View services' },
    { name: 'About', eyebrow: 'A LITTLE ABOUT US', title: 'A practice built on listening.', body: 'Meet the people behind your care and learn what to expect when you visit our clinic.', visual: '◌', action: 'Meet our team' },
    { name: 'Gallery', eyebrow: 'INSIDE GREENLEAF', title: 'A calm place to feel cared for.', body: 'Take a look around the clinic, find the entrance and feel familiar before your first visit.', visual: '⌂', action: 'Explore the clinic' },
    { name: 'Contact', eyebrow: 'WE\'RE HERE TO HELP', title: "Let's find a time to meet.", body: 'Check our hours, get directions and send a request for an appointment.', visual: '⌖', action: 'Request an appointment' },
  ]
  const [activeIndex, setActiveIndex] = useState(0)
  const activePage = pages[activeIndex]
  const showPage = (index: number) => setActiveIndex((index + pages.length) % pages.length)

  return (
    <div className="multi-site-preview">
      <div className="multi-site-nav"><span className="multi-site-logo"><i>G</i><b>GREENLEAF<small>FAMILY CLINIC</small></b></span><div className="multi-site-tabs">{pages.map((page, index) => <button className={index === activeIndex ? 'active' : ''} key={page.name} onClick={() => showPage(index)}>{page.name}</button>)}</div><span className="multi-site-book">Book a visit <ArrowUpRight size={12} /></span></div>
      <div className="multi-site-page" key={activePage.name}>
        <div className="multi-site-copy"><small>{activePage.eyebrow}</small><h3>{activePage.title}</h3><p>{activePage.body}</p><div className="multi-site-points"><span><Check size={12} /> Family focused</span><span><Check size={12} /> Easy to reach</span></div><button className="multi-site-action" onClick={() => showPage(activeIndex === pages.length - 1 ? 0 : activeIndex + 1)}>{activePage.action} <ArrowUpRight size={13} /></button></div>
        <div className={`multi-site-image multi-site-image-${activeIndex}`}><span>{activePage.visual}</span><small>{activePage.name.toUpperCase()} PAGE · SAMPLE</small></div>
      </div>
      <div className="multi-site-controls"><button className="page-arrow" aria-label="Previous page" onClick={() => showPage(activeIndex - 1)}><ArrowLeft size={14} /></button><div className="page-progress">{pages.map((page, index) => <button key={page.name} className={index === activeIndex ? 'active' : ''} aria-label={`Show ${page.name} page`} aria-current={index === activeIndex ? 'page' : undefined} onClick={() => showPage(index)} />)}</div><span className="page-count">Page <b>{activeIndex + 1}</b> of 5</span><button className="page-arrow" aria-label="Next page" onClick={() => showPage(activeIndex + 1)}><ArrowRight size={14} /></button></div>
    </div>
  )
}

function WhatsAppOrderingDemo() {
  const [quantities, setQuantities] = useState([0, 0, 0])
  const [notice, setNotice] = useState('')
  const products: [string, number, string][] = [['Seasonal fruit box', 420, '🥭'], ['Fresh greens bundle', 260, '🥬'], ['Farm eggs · 6 pack', 180, '🥚']]
  const total = products.reduce((sum, item, index) => sum + item[1] * quantities[index], 0)
  function change(index: number, delta: number) { setQuantities(current => current.map((value, itemIndex) => itemIndex === index ? Math.max(0, value + delta) : value)) }
  return (
    <div className="specific-demo order-sample">
      <div className="wa-order-titlebar"><span className="brand-lockup brand-lockup-whatsapp"><svg className="brand-logo-icon whatsapp-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#25d366"/><path fill="white" d="M17.4 14.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.3 3.5 5.6 4.9.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/></svg><b>WhatsApp</b></span><span>CATALOGUE ORDER</span></div>
      <div className="wa-order-store"><b>NILA · FRESH PICKS</b><small>A few good things, picked this morning.</small></div>
      {products.map(([name, price, emoji], index) => <div className="order-sample-row" key={name}><span className="order-emoji">{emoji}</span><span className="order-name"><b>{name}</b><small>{money(price)}</small></span><button aria-label={`Remove ${name}`} onClick={() => change(index, -1)}>−</button><b className="order-quantity">{quantities[index]}</b><button aria-label={`Add ${name}`} onClick={() => change(index, 1)}>+</button></div>)}
      <div className="sample-total"><span>Order estimate</span><b>{money(total)}</b></div>
      <button className="sample-action" onClick={() => setNotice(total ? 'Sample order ready to review. Nothing was sent.' : 'Add an item to build a sample order.')}>Review WhatsApp order <ArrowUpRight size={13} /></button>
      {notice && <div className="sample-notice">{notice}</div>}
    </div>
  )
}

function PaymentLinkDemo() {
  const [status, setStatus] = useState('')
  return (
    <div className="specific-demo payment-sample">
      <div className="razorpay-brandbar"><span className="brand-lockup brand-lockup-razorpay"><svg className="brand-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.436 0 10.526 7.773l-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24ZM14.26 10.098 3.389 17.166 1.564 24h9.008l3.688-13.902Z" /></svg><b>Razorpay</b></span><span>PAYMENT LINKS</span></div>
      <div className="payment-request-label">PAYMENT REQUEST · SAMPLE</div>
      <div className="payment-amount">₹1,250</div>
      <p className="payment-for">Booking advance · The Sugar Window</p>
      <div className="payment-line"><span>Request ID</span><b>DEMO-2048</b></div>
      <div className="payment-line"><span>Merchant</span><b>Example business</b></div>
      <button className="sample-action" onClick={() => setStatus('Payment demo only — no payment was collected.')}>{status ? 'Demo viewed' : 'Continue to sample payment'} <ArrowUpRight size={13} /></button>
      {status && <div className="sample-notice">{status}</div>}
      <small className="sample-legal">A live link requires an approved merchant account.</small>
    </div>
  )
}

function PaymentCatalogueDemo() {
  const [cart, setCart] = useState<number[]>([])
  const [notice, setNotice] = useState('')
  const products: [string, number][] = [['Linen tote', 499], ['Everyday kurta', 899], ['Gift set', 1150]]
  const total = cart.reduce((sum, index) => sum + products[index][1], 0)
  return (
    <div className="specific-demo payment-catalogue-sample">
      <div className="razorpay-brandbar"><span className="brand-lockup brand-lockup-razorpay"><svg className="brand-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.436 0 10.526 7.773l-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24ZM14.26 10.098 3.389 17.166 1.564 24h9.008l3.688-13.902Z" /></svg><b>Razorpay</b></span><span>PAYMENT CATALOGUE</span></div>
      <div className="catalogue-storehead"><b>THREAD & THIMBLE</b><small>SHOP · SAMPLE</small></div>
      <p className="sample-intro">Browse a product, build a cart, review the total.</p>
      <div className="catalogue-product-grid">{products.map(([name, price], index) => <button className={cart.includes(index) ? 'chosen' : ''} key={name} onClick={() => setCart(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index])}><span>{['👜', '👕', '🎁'][index]}</span><b>{name}</b><small>{money(price)} · {cart.includes(index) ? 'Added' : 'Add to cart +'}</small></button>)}</div>
      <div className="sample-total"><span>Sample cart · {cart.length} items</span><b>{money(total)}</b></div>
      <button className="sample-action" onClick={() => setNotice('Sample checkout only. Your merchant account determines available payment options.')}>Review checkout options <ArrowUpRight size={13} /></button>
      {notice && <div className="sample-notice">{notice}</div>}
    </div>
  )
}

function ProductCatalogueDemo() {
  const [category, setCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState('')
  const products = [{name:'Ceramic cup',type:'Home',price:650,icon:'☕'},{name:'Cotton tote',type:'Accessories',price:480,icon:'👜'},{name:'Linen shirt',type:'Clothing',price:1290,icon:'👕'},{name:'Gift set',type:'Home',price:1150,icon:'🎁'}]
  const visible = category === 'All' ? products : products.filter(item => item.type === category)
  return (
    <div className="specific-demo products-sample">
      <div className="specific-top"><b>SMALL BATCH STUDIO</b><span>4 ITEMS · CATALOGUE</span></div>
      <div className="specific-tabs">{['All','Home','Accessories','Clothing'].map(tab => <button className={category === tab ? 'selected' : ''} key={tab} onClick={() => setCategory(tab)}>{tab}</button>)}</div>
      <div className="catalogue-list">{visible.map(item => <button key={item.name} onClick={() => setSelectedItem(item.name)}><span>{item.icon}</span><b>{item.name}</b><small>{money(item.price)}</small><ArrowUpRight size={12} /></button>)}</div>
      {selectedItem && <div className="sample-notice">{selectedItem} selected for a sample enquiry.</div>}
      <div className="sample-footnote">A browsable catalogue, ready to share as one link.</div>
    </div>
  )
}

function DigitalMenuDemo() {
  const [category, setCategory] = useState('Mains')
  const menu: Record<string, [string, string][]> = { Mains: [['Garden bowl','₹280'],['Roasted paneer plate','₹340'],['Lemon rice & greens','₹260']], Drinks: [['Cold brew','₹180'],['Nimbu soda','₹120'],['Masala chai','₹90']], Desserts: [['Seasonal tart','₹190'],['Chocolate cake','₹210'],['Mango shrikhand','₹160']] }
  return (
    <div className="specific-demo menu-sample">
      <div className="menu-sample-cover"><small>GOOD FOOD, GOOD MOOD</small><b>THE GARDEN TABLE</b><span>MENU · BENGALURU</span></div>
      <div className="specific-tabs">{Object.keys(menu).map(tab => <button className={category === tab ? 'selected' : ''} key={tab} onClick={() => setCategory(tab)}>{tab}</button>)}</div>
      {menu[category].map(([name, price]) => <div className="menu-sample-row" key={name}><b>{name}</b><span>{price}</span></div>)}
      <div className="sample-footnote">A QR code can open this menu on a customer's phone.</div>
    </div>
  )
}

function GoogleBusinessDemo() {
  const [active, setActive] = useState('Overview')
  const details: Record<string, string> = { Overview: 'Fresh breads, pastries and coffee made every morning.', Hours: 'Today · 8:00 am–8:00 pm\nMon–Sat · 8:00 am–8:00 pm', Contact: 'Indiranagar, Bengaluru\nCall · Directions · Website' }
  return (
    <div className="specific-demo google-sample">
      <div className="google-product-bar"><span className="brand-lockup brand-lockup-google"><svg className="brand-logo-icon google-logo-icon" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.7-.4-4H24v7.6h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.8Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.6 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 0 17.9l6.8-5.1Z"/><path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.2C14.2 15.6 18.7 12 24 12Z"/></svg><b>Google</b></span><span>BUSINESS PROFILE · SAMPLE</span></div>
      <div className="google-sample-search"><span className="google-search-icon">⌕</span><span>bakery near me</span><small>⌕</small></div>
      <div className="google-business-card"><div className="google-cover">🥐 <span>LOCAL PLACE · SAMPLE</span></div><h3>The Daily Loaf</h3><small>Bakery · Bengaluru · Open now</small><div className="google-rating">SAMPLE PREVIEW <span>★</span></div><div className="specific-tabs">{Object.keys(details).map(tab => <button className={active === tab ? 'selected' : ''} key={tab} onClick={() => setActive(tab)}>{tab}</button>)}</div><p className="google-details">{details[active]}</p><div className="google-quicklinks"><span>⌖ Directions</span><span>☎ Call</span><span>↗ Website</span></div></div>
      <div className="sample-footnote">Example listing; no live Google profile is connected.</div>
    </div>
  )
}

function InstagramSetupDemo() {
  const [tab, setTab] = useState('Posts')
  return (
    <div className="specific-demo instagram-sample">
      <div className="instagram-brandbar"><span className="brand-lockup brand-lockup-instagram"><svg className="brand-logo-icon instagram-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="igLogoGradient" x1="0" x2="1" y1="1" y2="0"><stop stopColor="#feda75"/><stop offset=".45" stopColor="#d62976"/><stop offset="1" stopColor="#4f5bd5"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igLogoGradient)"/><rect x="6.5" y="6.5" width="11" height="11" rx="3.5" fill="none" stroke="white" strokeWidth="1.7"/><circle cx="12" cy="12" r="2.7" fill="none" stroke="white" strokeWidth="1.7"/><circle cx="17.5" cy="6.8" r="1" fill="white"/></svg><b>Instagram</b></span><span>⌕</span><span>♡</span></div>
      <div className="social-profile-sample"><div className="insta-avatar">TT</div><div><b>threadandthimble</b><small>Business profile · Sample</small></div><button onClick={() => setTab('Contact')}>Follow</button></div>
      <div className="insta-bio">Thoughtful everyday wear<br />Made in Bengaluru · New pieces weekly<br /><a>threadandthimble.example</a></div>
      <div className="specific-tabs">{['Posts','About','Contact'].map(item => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === 'Posts' ? <div className="insta-grid"><span>✳<small>NEW ARRIVALS</small></span><span>◒<small>MADE SLOWLY</small></span><span>☼<small>THE EVERYDAY EDIT</small></span></div> : <div className="social-tab-content"><b>{tab === 'About' ? 'Clothing & accessories' : 'Get in touch'}</b><small>{tab === 'About' ? 'Small batches, considered details.' : 'WhatsApp · Email · Store location'}</small></div>}
      <div className="sample-footnote">Sample profile with contact and shop links.</div>
    </div>
  )
}

function FacebookPageDemo() {
  const [tab, setTab] = useState('Posts')
  return (
    <div className="specific-demo facebook-sample">
      <div className="facebook-brandbar"><span className="brand-lockup brand-lockup-facebook"><svg className="brand-logo-icon facebook-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#0866ff"/><path fill="white" d="M13.8 22v-8.1h2.7l.4-3.2h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V4.3c-.3 0-1.2-.1-2.3-.1-2.4 0-4.1 1.5-4.1 4.3v2.2H8v3.2h2.6V22h3.2Z"/></svg><b>Facebook</b></span><span>☰</span></div>
      <div className="facebook-cover"><span>✿</span><small>LITTLE LEAF NURSERY · SAMPLE PAGE</small></div>
      <div className="facebook-page-title"><b>Little Leaf Nursery</b><span>Plants for city homes</span></div>
      <div className="facebook-action-row"><button onClick={() => setTab('Contact')}>Message</button><button onClick={() => setTab('About')}>View details</button></div>
      <div className="specific-tabs">{['Posts','About','Contact'].map(item => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
      <div className="facebook-post"><small>{tab.toUpperCase()} · SAMPLE</small><b>{tab === 'Posts' ? 'A new batch of easy-care plants is here.' : tab === 'About' ? 'Plants, pots and growing advice.' : 'Visit us · 10 am–7 pm · Bengaluru'}</b><p>Clear business information helps visitors know what to expect.</p></div>
    </div>
  )
}

function WhatsAppProfileDemo() {
  const [message, setMessage] = useState('')
  return (
    <div className="specific-demo wa-profile-sample">
      <div className="wa-profile-header"><span className="brand-lockup brand-lockup-whatsapp inverted"><svg className="brand-logo-icon whatsapp-logo-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#25d366"/><path fill="white" d="M17.4 14.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.3 3.5 5.6 4.9.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/></svg><b>WhatsApp Business</b></span><span>⋮</span></div>
      <div className="wa-business-profile"><div className="wa-business-avatar">S</div><h3>Saffron & Stone</h3><small>Home-style meals · Bengaluru</small><span className="wa-hours">Open · Closes 8:00 pm</span><div className="wa-profile-buttons"><button onClick={() => setMessage('Sample call action selected')}>Call</button><button onClick={() => setMessage('Sample catalogue opened')}>Catalogue</button></div></div>
      <div className="wa-quick-messages"><small>START A CONVERSATION</small>{["Can I see today's menu?",'What are your pickup hours?','Do you deliver nearby?'].map(item => <button key={item} onClick={() => setMessage(item)}>{item}<ArrowUpRight size={12} /></button>)}</div>
      {message && <div className="sample-notice">Sample selection: "{message}" — not sent.</div>}
    </div>
  )
}

function LinkInBioDemo() {
  const [selected, setSelected] = useState('')
  const items = [['View my portfolio','Selected work and recent projects'],['Book a session','Availability and booking enquiry'],['Print shop','Browse available prints'],['Say hello','Contact Ananya directly']]
  return (
    <div className="specific-demo bio-sample">
      <div className="bio-sample-avatar">AK</div>
      <h3>Ananya Kapoor</h3>
      <p>Photographer & visual storyteller</p>
      <div className="bio-link-list">{items.map(([title, description]) => <button key={title} onClick={() => setSelected(title)}><span><b>{title}</b><small>{description}</small></span><ArrowUpRight size={14} /></button>)}</div>
      {selected && <div className="sample-notice">"{selected}" selected. Your link would open here.</div>}
      <small className="sample-footnote">One profile link. Four helpful destinations.</small>
    </div>
  )
}

function DomainEmailDemo() {
  const [active, setActive] = useState('Website')
  return (
    <div className="specific-demo domain-sample">
      <div className="specific-top"><b>YOUR BUSINESS IDENTITY</b><span>SETUP PREVIEW</span></div>
      <p className="sample-intro">A domain and email that match your business name.</p>
      <div className="identity-switch"><button className={active === 'Website' ? 'selected' : ''} onClick={() => setActive('Website')}>Website</button><button className={active === 'Email' ? 'selected' : ''} onClick={() => setActive('Email')}>Business email</button></div>
      <div className="identity-card"><span className="identity-icon">{active === 'Website' ? '↗' : '@'}</span><small>{active === 'Website' ? 'YOUR DOMAIN' : 'YOUR BUSINESS EMAIL'}</small><b>{active === 'Website' ? 'www.yourbusiness.in' : 'hello@yourbusiness.in'}</b><span>{active === 'Website' ? 'Registered in your business name' : 'Connected to your chosen mailbox provider'}</span></div>
      <div className="sample-notice">Example only. Domain availability and provider charges are separate.</div>
    </div>
  )
}

function BasicSeoDemo() {
  const [tab, setTab] = useState('Search result')
  return (
    <div className="specific-demo seo-sample">
      <div className="specific-top"><b>SEARCH PRESENCE</b><span>BASIC SEO PREVIEW</span></div>
      <div className="specific-tabs">{['Search result','Page details'].map(item => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === 'Search result' ? <div className="seo-result"><small>yourbusiness.in › bengaluru</small><b>Everyday Care Clinic | Family Doctor in Bengaluru</b><span>Clear information about clinic services, hours and location. Request an appointment online.</span></div> : <div className="seo-checklist">{[['✓','Page title describes the business'],['✓','Search description explains the page'],['✓','Headings organize key information']].map(([mark, text]) => <div key={text}><span>{mark}</span>{text}</div>)}</div>}
      <div className="sample-footnote">SEO setup helps search tools understand a page; it cannot guarantee rankings.</div>
    </div>
  )
}

const serviceDemos: Record<string, React.ComponentType<{ service: Service }>> = {
  'one-page-business-website': OnePageWebsiteDemo,
  '3-5-page-business-website': MultiPageWebsitePreview,
  'whatsapp-ordering-catalogue': WhatsAppOrderingDemo,
  'razorpay-payment-page-or-link': PaymentLinkDemo,
  'razorpay-supported-payment-catalogue': PaymentCatalogueDemo,
  'digital-product-catalogue': ProductCatalogueDemo,
  'digital-menu-with-qr-code': DigitalMenuDemo,
  'google-business-profile-setup': GoogleBusinessDemo,
  'instagram-business-setup': InstagramSetupDemo,
  'facebook-business-page-setup': FacebookPageDemo,
  'whatsapp-business-profile-setup': WhatsAppProfileDemo,
  'link-in-bio-business-page': LinkInBioDemo,
  'domain-and-business-email-setup': DomainEmailDemo,
  'basic-seo-setup': BasicSeoDemo,
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
  const IconComp = svcImg ? ICON_COMPONENTS[svcImg.icon] : Monitor

  return (
    <main className="service-detail-page" id="top">
      <SEO title={`${service.name} for Small Businesses | OnlineKarDo`} description={service.summary} canonical={`/services/${service.id}`} structuredData={{ '@type': 'Service', name: service.name, description: service.summary, provider: { '@type': 'Organization', name: 'OnlineKarDo', url: 'https://onlinekardo.com' }, offers: { '@type': 'Offer', name: service.name, description: service.summary, price: service.price, priceCurrency: 'INR', availability: 'https://schema.org/InStock', url: serviceUrl }, category: service.category, url: serviceUrl }} />
      <ServiceSchema name={service.name} description={service.summary} price={service.price} category={service.category} url={serviceUrl} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://onlinekardo.com' }, { name: 'Services', url: 'https://onlinekardo.com/services' }, { name: service.name, url: serviceUrl }]} />

      {/* Hero with Marquee */}
      <section className="service-detail-hero relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${svcImg?.bgColor || '#f3ede1'} 0%, white 100%)` }}>
        <div className="absolute inset-0 opacity-5" style={{ background: `url(${svcImg?.image || '/assets/industries/one-page-website.jpg'}) center/cover` }} />
        <div className="relative z-10 container py-16 md:py-24">
          <button className="detail-back mb-8" onClick={backToServices}><ArrowLeft size={15} /> Back to all services</button>
          <div className="lg:grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
            <div>
              <span className="eyebrow" style={{ color: svcImg?.color || '#e36a27' }}>{service.category} · Individual setup</span>
              <h1 className="!text-6xl !leading-[.95] !tracking-[-.07em] md:!text-7xl mt-4">{service.name}</h1>
              <p className="detail-summary text-xl mt-6 text-[#5d6962] max-w-xl">{svcContent?.heroSubtitle || service.summary}</p>
              <div className="detail-price-line mt-8"><strong>{money(service.price)}</strong><span>one-time setup fee</span></div>
              <button className="button button-primary !rounded-full !px-6 !py-4 mt-8" style={{ background: svcImg?.color || '#e36a27' }} onClick={() => openEnquiry(service.name)}>Ask about this service <ArrowUpRight size={15} /></button>
              <small className="detail-fee-note mt-4 block">Third-party subscriptions, fees and approvals are separate where applicable.</small>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative rounded-[28px] overflow-hidden" style={{ aspectRatio: '4/5', background: svcImg?.bgColor || '#f3ede1' }}>
                <img src={svcImg?.image || '/assets/industries/one-page-website.jpg'} alt={service.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div><span className="text-xs font-medium text-white/80 tracking-wide uppercase">SERVICE PREVIEW</span><p className="text-sm mt-1 text-white font-medium">{service.name}</p></div>
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20"><IconComp size={28} className="text-white" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Marquee at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 py-4" style={{ background: `linear-gradient(to top, ${svcImg?.color || '#e36a27'}22, transparent)` }}>
          <Marquee text={svcContent?.marqueeText || ''} speed={25} className="px-4" />
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-24 bg-white">
        <div className="container max-w-4xl">
          <h2 className="!font-display !text-4xl !tracking-[-.05em] mb-8">What you get</h2>
          <div className="prose prose-lg text-[#5d6962] max-w-none">{svcContent?.detailedDescription || ''}</div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24" style={{ background: svcImg?.bgColor || '#f6f3fb' }}>
        <div className="container">
          <div className="text-center mb-16">
            <span className="eyebrow" style={{ color: svcImg?.color || '#e36a27' }}>Features</span>
            <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2">Every detail, built for conversion</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {svcContent?.features?.map((f, i) => (
              <article key={i} className="bg-white rounded-[22px] p-6 border border-[#e8e0f3] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl mb-4" style={{ background: `${svcImg?.color || '#e36a27'}15` }}><IconComp size={24} className="text-white" style={{ color: svcImg?.color || '#e36a27' }} /></div>
                <h3 className="text-xl font-bold text-[#102a3d] mb-2">{f.title}</h3>
                <p className="text-[#5d6962]">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
                  <p className="text-[#5d6962]">{p.description}</p>
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

      {/* Interactive Demo */}
      <section className="py-24" style={{ background: '#e7eee4' }}>
        <div className="container">
          <div className="lg:grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
            <div>
              <span className="eyebrow">A small preview</span>
              <h2 className="!font-display !text-4xl !tracking-[-.05em] mt-2 mb-4">See how it could work</h2>
              <p className="text-[#5d6962] mb-6">This is a sample interaction to help you picture the customer experience. Names and details are illustrative.</p>
              <div className="flex items-center gap-2 text-sm text-[#087b87]"><Check size={16} /><span>{service.category === 'Payments' ? 'Demo only. No payment is collected.' : 'Sample content only. Your business details replace these.'}</span></div>
            </div>
            <div className="relative">
              <div className="demo-stage rounded-[22px] overflow-hidden border border-[#dce4e2] bg-white" style={{ background: svcImg?.bgColor || '#f3ede1' }}>
                <div className="demo-toolbar flex items-center justify-between px-4 py-3 border-b border-[#dce4e2]"><span className="flex gap-1.5"><i className="w-3 h-3 rounded-full bg-[#d5d9d0]" /><i className="w-3 h-3 rounded-full bg-[#d5d9d0]" /><i className="w-3 h-3 rounded-full bg-[#d5d9d0]" /></span><b className="text-xs tracking-wider">ONLINEKARDO · SAMPLE PREVIEW</b><span className="demo-label text-xs px-2 py-0.5 rounded bg-[#fff4ed] text-[#e36a27]">NOT LIVE</span></div>
                <div className="p-6 min-h-[400px]">
                  {(() => {
                    const DemoComponent = serviceDemos[service.id]
                    return DemoComponent ? <DemoComponent service={service} /> : <div className="text-center text-[#5d6962] py-20">Demo component not found</div>
                  })()}
                </div>
                <div className="demo-stage-caption px-4 py-3 text-xs text-[#818781] border-t border-[#dce4e2]"><span>✳</span> {service.brand ? `Independent ${BRAND_NAMES[service.brand]} visual sample · no affiliation or live account connection` : service.category === 'Payments' ? 'Sample only · No real payment or merchant account is connected' : 'Illustrative demo · No real orders or messages are sent'}</div>
              </div>
            </div>
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
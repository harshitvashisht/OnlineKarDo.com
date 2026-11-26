export type CaseCategory = 'web-development' | 'whatsapp-commerce' | 'local-discovery'

export interface CaseStudy {
  slug: string
  category: CaseCategory
  business: string
  title: string
  context: string
  before: string
  after: string
  approach: string
  effects: string[]
  image: string
  imageAlt: string
  serviceId: string
}

// Sample case studies model common needs for the relevant service category.
// They are not testimonials or measured client results.
const caseStudyEntries: Omit<CaseStudy, 'image' | 'imageAlt' | 'serviceId'>[] = [
  {
    slug: 'daily-loaf-website', category: 'web-development', business: 'Bakery', title: 'A bakery website that answers the everyday questions',
    context: 'The Daily Loaf is a neighbourhood bakery with fresh bakes, celebration cakes and changing daily specials. Most first-time visitors want to check opening hours, see what is available and ask about custom orders.',
    before: 'The bakery relied on scattered social posts. Hours, menu highlights, location and custom cake enquiries were spread across different posts and messages.',
    after: 'A mobile-first website brings the bakery story, current menu highlights, location, hours and a clear custom-order enquiry path together.',
    approach: 'Lead with the daily offer, give popular products room to breathe, and place contact and directions beside the information customers need before visiting.',
    effects: ['Visitors can find hours and location without searching old posts.', 'Custom cake enquiries start with useful event and preference details.', 'The team has one link to share for menus, directions and business information.'],
  },
  {
    slug: 'greenleaf-clinic-website', category: 'web-development', business: 'Clinic', title: 'A calmer first visit for a family clinic',
    context: 'Greenleaf Family Clinic wants new patients to understand its care approach, services and appointment process before they call.',
    before: 'Important details were mostly shared by phone, so people had to call to learn what the clinic offers, when it is open or what to bring.',
    after: 'A clear multi-page site explains the clinic, its services, practical visit information and the best way to request an appointment.',
    approach: 'Organize content around patient questions, use plain-language service summaries and keep appointment actions consistent across pages.',
    effects: ['Patients can review visit information at their own pace.', 'Service pages give callers a shared vocabulary for discussing care.', 'A consistent contact route makes appointment requests easier to triage.'],
  },
  {
    slug: 'thread-thimble-website', category: 'web-development', business: 'Garment shop', title: 'A small apparel shop gets a more useful online home',
    context: 'Thread & Thimble sells thoughtful everyday wear and answers frequent questions about sizes, fabrics, availability and store visits.',
    before: 'Products appeared as individual social posts, while sizing guidance, the shop story and contact details were hard to find together.',
    after: 'A compact storefront-style website groups key collections, sizing notes, shop details and enquiry links in one branded experience.',
    approach: 'Use collection-led navigation, concise product guidance and mobile-friendly contact actions that suit customers browsing between errands.',
    effects: ['Customers can compare collections without scrolling a social feed.', 'Sizing and fabric notes are easier to share and keep current.', 'The shop can direct people to one reliable source for its latest details.'],
  },
  {
    slug: 'studio-forme-website', category: 'web-development', business: 'Interior design studio', title: 'A portfolio that makes the studio’s work easier to explore',
    context: 'Studio Forme needs prospective clients to understand its design style, process and project types before starting a conversation.',
    before: 'Project photos and service descriptions lived in separate places, making it difficult to see the studio’s range and approach.',
    after: 'A portfolio-led website presents selected work, the design process, services and a focused project enquiry path.',
    approach: 'Put strong imagery first, add context to each project and connect inspiration to a clear next step for prospective clients.',
    effects: ['Visitors can browse work by project type and understand the studio’s role.', 'Project context helps set expectations before the first call.', 'A focused enquiry form gathers the basics needed to start a discussion.'],
  },
  {
    slug: 'little-yoga-website', category: 'web-development', business: 'Yoga studio', title: 'A studio website built around class discovery',
    context: 'A neighbourhood yoga studio offers several class styles and wants new students to understand levels, schedules and how to join.',
    before: 'Class updates were posted one at a time, and newcomers had to message the studio to understand which session suited them.',
    after: 'A simple site explains class formats, who each class is for, the weekly schedule, studio location and an enrolment enquiry option.',
    approach: 'Keep the schedule scannable, explain beginner-friendly options and make location and booking details visible on phones.',
    effects: ['New students can choose a class with more confidence.', 'Schedule changes have one clear place to be updated.', 'The studio receives enquiries with a preferred class already identified.'],
  },
  {
    slug: 'northstar-repairs-website', category: 'web-development', business: 'Appliance repair service', title: 'A service website that turns a problem into a clear request',
    context: 'Northstar Repairs handles appliance servicing across a local area and needs customers to describe the issue and location up front.',
    before: 'Customers often called without model, issue or area details, leading to repeated questions before a visit could be planned.',
    after: 'A service-focused site lists supported repairs, coverage areas, preparation tips and a structured repair enquiry route.',
    approach: 'Explain what the team handles, ask for the key troubleshooting details and keep phone contact available for urgent cases.',
    effects: ['Customers can check service coverage before reaching out.', 'Repair requests arrive with appliance and issue details together.', 'The team can prioritize follow-up using a more complete first message.'],
  },
  {
    slug: 'nila-whatsapp-orders', category: 'whatsapp-commerce', business: 'Home kitchen', title: 'A daily menu that is easier to browse and order',
    context: 'Nila Home Kitchen prepares a changing menu and takes pre-orders over WhatsApp from nearby customers.',
    before: 'The menu was sent as a long message or image, and customers often asked whether items were available and how to place an order.',
    after: 'A shareable menu groups dishes with short descriptions and prices, with a ready-to-send WhatsApp order prompt.',
    approach: 'Make the daily selection easy to scan, show ordering cut-off and pickup details, and prefill a message that helps the kitchen confirm an order.',
    effects: ['Customers can review the menu before starting a chat.', 'Order messages can include item, quantity and pickup preference.', 'The kitchen can replace a single menu link as the daily selection changes.'],
  },
  {
    slug: 'garden-table-whatsapp-menu', category: 'whatsapp-commerce', business: 'Cafe', title: 'A QR menu that opens a useful WhatsApp conversation',
    context: 'The Garden Table cafe wants dine-in and takeaway customers to check its menu from their phones and ask about items.',
    before: 'Menu photos became hard to read on small screens, and common questions about ingredients or takeaway availability interrupted service.',
    after: 'A mobile menu linked from a QR code organizes categories, item descriptions and a WhatsApp contact action.',
    approach: 'Design the menu for quick scanning, keep item details concise and route questions to a prefilled message with the dish name.',
    effects: ['Guests can open menu details without waiting for a printed copy.', 'Messages identify the dish customers are asking about.', 'Staff can keep the shared menu current without reprinting QR codes.'],
  },
  {
    slug: 'saffron-stone-catalogue', category: 'whatsapp-commerce', business: 'Handmade gifts', title: 'A product catalogue that helps gift buyers decide',
    context: 'Saffron & Stone makes handmade gifts and takes customization requests through WhatsApp.',
    before: 'Product photos were shared one by one, with size, material, price and customization details repeated in chat.',
    after: 'A categorized digital catalogue shows product photos, key details and a direct WhatsApp enquiry for each collection.',
    approach: 'Group products by occasion, label made-to-order options clearly and invite customers to share the item they want to personalize.',
    effects: ['Customers can browse a range before asking for details.', 'Enquiries can refer to a specific product or collection.', 'The maker can spend less time resending the same product information.'],
  },
  {
    slug: 'thread-thimble-whatsapp', category: 'whatsapp-commerce', business: 'Garment shop', title: 'Product questions arrive with a clearer starting point',
    context: 'Thread & Thimble answers size and availability questions from customers browsing its latest clothing collections.',
    before: 'Messages often began with a screenshot and no product name, size or color preference, creating several rounds of clarification.',
    after: 'A shareable catalogue presents collection details and opens WhatsApp with the selected item ready to discuss.',
    approach: 'Include consistent names, available variants and concise sizing guidance, then link each product to an enquiry prompt.',
    effects: ['Customers have product details alongside the image.', 'The first message can include the item and preferred variant.', 'Staff can respond to product questions with better context.'],
  },
  {
    slug: 'daily-loaf-digital-menu', category: 'whatsapp-commerce', business: 'Bakery', title: 'A bakery menu that works at the counter and on WhatsApp',
    context: 'The Daily Loaf offers daily bakes and takes cake enquiries from customers who may be visiting in person or ordering remotely.',
    before: 'Customers had to ask for the day’s selection and send several messages to explain a custom cake request.',
    after: 'A mobile menu with a QR entry point shares daily highlights and a separate WhatsApp prompt gathers cake date, size and design preferences.',
    approach: 'Separate ready-to-buy daily items from custom-order information, and guide each customer to the right enquiry flow.',
    effects: ['Walk-in customers can browse while they wait.', 'Remote customers can see current highlights from a saved link.', 'Custom requests arrive with practical details for a follow-up.'],
  },
  {
    slug: 'florist-whatsapp-orders', category: 'whatsapp-commerce', business: 'Florist', title: 'A simpler path from bouquet browsing to a custom request',
    context: 'Bloom & Branch creates seasonal bouquets and needs to capture delivery date, budget and color preferences.',
    before: 'Customers shared inspiration photos without dates or delivery details, and the florist had to collect the basics in follow-up messages.',
    after: 'A bouquet catalogue presents styles and price guidance, with a WhatsApp prompt asking for date, budget and delivery area.',
    approach: 'Show examples as inspiration rather than fixed inventory, and make the customization and availability check clear.',
    effects: ['Customers understand that bouquets can be tailored.', 'The first enquiry includes details needed to check feasibility.', 'The florist can follow up with a relevant option instead of starting from scratch.'],
  },
  {
    slug: 'daily-loaf-local-profile', category: 'local-discovery', business: 'Bakery', title: 'Make it easier to confirm the bakery is open',
    context: 'The Daily Loaf serves nearby residents and visitors looking for fresh bread, pastries and celebration cakes.',
    before: 'Searchers could find inconsistent hours and older menu posts, and had to open several links to confirm location and contact details.',
    after: 'A coordinated local listing keeps the bakery name, hours, address, contact route and website aligned.',
    approach: 'Review the core listing fields, add useful categories and photos, and connect the listing to the current menu and enquiry page.',
    effects: ['People can check practical visit details in one place.', 'The listing gives customers clear call and direction actions.', 'Consistent details reduce confusion between search and the website.'],
  },
  {
    slug: 'greenleaf-clinic-local-discovery', category: 'local-discovery', business: 'Clinic', title: 'Help patients find the clinic and prepare for a visit',
    context: 'Greenleaf Family Clinic wants local patients to verify location, hours and appointment options before travelling.',
    before: 'Patients relied on word of mouth for directions and often called just to confirm basic visit information.',
    after: 'A maintained local profile connects accurate hours, map location, phone number and website visit guidance.',
    approach: 'Keep the clinic’s public details consistent, add clear directions and link to the page that explains appointments and services.',
    effects: ['Patients can verify the clinic’s location and hours before leaving.', 'The call action is easier to find for appointment questions.', 'The website and listing tell the same story about services and visits.'],
  },
  {
    slug: 'northstar-repairs-local-search', category: 'local-discovery', business: 'Appliance repair service', title: 'Local search details that set clear service expectations',
    context: 'Northstar Repairs serves selected neighbourhoods and wants nearby customers to know what it repairs and where it travels.',
    before: 'Search results gave limited information about coverage, supported appliances and how to request a visit.',
    after: 'A complete local profile clarifies service area, contact details and the link to the repair request page.',
    approach: 'Use accurate service descriptions and areas, select relevant listing categories and keep the request link current.',
    effects: ['Customers can check coverage before calling.', 'The service listing sets more realistic expectations about supported work.', 'Enquiries can begin from one visible route on search or maps.'],
  },
  {
    slug: 'thread-thimble-social-discovery', category: 'local-discovery', business: 'Garment shop', title: 'A consistent shop identity across search and social',
    context: 'Thread & Thimble wants people who discover a social post to confirm store details and explore collections before visiting.',
    before: 'Profile descriptions, contact details and shop hours varied between platforms, leaving customers unsure which details were current.',
    after: 'Social and local profiles share a consistent business description, contact path, opening details and link to the collection page.',
    approach: 'Align names and core details, choose a clear profile image and make the most useful next action easy to find.',
    effects: ['Customers see consistent details wherever they find the shop.', 'Social visitors have a direct route to collections and store information.', 'The business can update key information from a clear checklist.'],
  },
  {
    slug: 'garden-table-local-discovery', category: 'local-discovery', business: 'Restaurant', title: 'Help diners check the menu, location and opening time',
    context: 'The Garden Table wants nearby diners to find current hours, directions and menu information before choosing where to eat.',
    before: 'Hours and menu links were not easy to verify, especially for people discovering the restaurant through a map search.',
    after: 'A consistent listing connects current hours, directions, menu and a direct contact option.',
    approach: 'Prioritize accurate business details, link to the mobile menu and add current photos that reflect the dining experience.',
    effects: ['Diners can confirm when and where to visit.', 'The menu is reachable from the discovery point.', 'Updated details make it easier to act without hunting through posts.'],
  },
  {
    slug: 'bloom-branch-local-discovery', category: 'local-discovery', business: 'Florist', title: 'A local profile that turns seasonal discovery into enquiries',
    context: 'Bloom & Branch wants nearby customers to find the studio for bouquets, gifting and event flowers.',
    before: 'Seasonal work appeared on social, but the profile did not clearly connect the studio’s location, hours and custom order route.',
    after: 'The local profile presents reliable visit details and points customers to a current gallery and custom bouquet enquiry path.',
    approach: 'Use seasonal photos, describe the main services accurately and link the profile to a page that explains custom requests.',
    effects: ['People can check whether the studio is nearby and open.', 'Customers can move from a discovery image to a relevant enquiry.', 'The profile remains useful between seasonal campaigns.'],
  },
]

export const caseStudies: CaseStudy[] = caseStudyEntries.map(study => ({
  ...study,
  serviceId: ({
    'daily-loaf-website': 'one-page-business-website',
    'greenleaf-clinic-website': '3-5-page-business-website',
    'thread-thimble-website': 'one-page-business-website',
    'studio-forme-website': '3-5-page-business-website',
    'little-yoga-website': 'one-page-business-website',
    'northstar-repairs-website': 'one-page-business-website',
    'nila-whatsapp-orders': 'whatsapp-ordering-catalogue',
    'garden-table-whatsapp-menu': 'digital-menu-with-qr-code',
    'saffron-stone-catalogue': 'digital-product-catalogue',
    'thread-thimble-whatsapp': 'whatsapp-ordering-catalogue',
    'daily-loaf-digital-menu': 'digital-menu-with-qr-code',
    'florist-whatsapp-orders': 'digital-product-catalogue',
    'daily-loaf-local-profile': 'google-business-profile-setup',
    'greenleaf-clinic-local-discovery': 'google-business-profile-setup',
    'northstar-repairs-local-search': 'google-business-profile-setup',
    'thread-thimble-social-discovery': 'instagram-business-setup',
    'garden-table-local-discovery': 'google-business-profile-setup',
    'bloom-branch-local-discovery': 'google-business-profile-setup',
  } as Record<string, string>)[study.slug],
  ...({
    'daily-loaf-website': { image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Fresh artisan loaves arranged in the bakery window' },
    'greenleaf-clinic-website': { image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Bright clinic reception with a welcoming patient area' },
    'thread-thimble-website': { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Customers exploring a contemporary clothing collection' },
    'studio-forme-website': { image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Modern interior design project with warm natural light' },
    'little-yoga-website': { image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=85', imageAlt: 'A guided yoga session in a calm studio' },
    'northstar-repairs-website': { image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Technician inspecting equipment during a repair visit' },
    'nila-whatsapp-orders': { image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Home kitchen preparing fresh food for the daily menu' },
    'garden-table-whatsapp-menu': { image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Cafe dining space where guests can scan a digital menu' },
    'saffron-stone-catalogue': { image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Handmade homewares and gifts arranged for browsing' },
    'thread-thimble-whatsapp': { image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Everyday apparel styled for a product catalogue' },
    'daily-loaf-digital-menu': { image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Fresh pastries and baked goods ready for the daily menu' },
    'florist-whatsapp-orders': { image: 'https://images.unsplash.com/photo-1490750967868-1aa7f8c3102f?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Seasonal bouquet arranged for a custom flower order' },
    'daily-loaf-local-profile': { image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Bakery counter displaying fresh bread and pastries' },
    'greenleaf-clinic-local-discovery': { image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Healthcare clinic hallway with clear visitor access' },
    'northstar-repairs-local-search': { image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Local service technician working with repair tools' },
    'thread-thimble-social-discovery': { image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Fashion look styled for a clothing shop social profile' },
    'garden-table-local-discovery': { image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Restaurant dining room with tables ready for guests' },
    'bloom-branch-local-discovery': { image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1400&q=85', imageAlt: 'Florist workspace with colorful seasonal flowers' },
  } as Record<string, { image: string; imageAlt: string }>)[study.slug],
}))

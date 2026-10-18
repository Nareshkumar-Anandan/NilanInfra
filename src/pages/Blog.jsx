import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  X, 
  CheckCircle2, 
  Share2, 
  Building2, 
  Home as HomeIcon, 
  Landmark, 
  Compass, 
  Layers, 
  PhoneCall,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Play,
  Pause
} from 'lucide-react';

// Hero & brand assets
import nilanLogo from '../assets/nilan.png';
import heroBgImg from '../assets/nilan_hero.png';
import shanmugamImg from '../assets/logo/Shanmugam.webp';

// Article images
import houseCostImg from '../assets/blog/house_cost.jpg';
import housePlanImg from '../assets/blog/house_plan.jpg';
import vastuTipsImg from '../assets/blog/vastu_tips.jpg';
import flooringOptionsImg from '../assets/blog/flooring_options.jpg';
import officeGuideImg from '../assets/blog/office_guide.jpg';
import commercialApprovalImg from '../assets/blog/commercial_approval.jpg';
import dtcpCmdaImg from '../assets/blog/dtcp_cmda.jpg';
import propertyInvestmentImg from '../assets/blog/property_investment.jpg';

import './Blog.css';

const blogArticles = [
  {
    id: 'house-construction-cost-coimbatore',
    title: 'House Construction Cost in Coimbatore',
    category: 'House topics',
    badge: 'Construction',
    badgeClass: 'badge-construction',
    excerpt: 'What really decides the price of a new home, and how to make a budget you can keep to.',
    image: houseCostImg,
    readTime: '6 min read',
    date: 'Oct 15, 2026',
    author: 'Er. Shanmugam',
    authorRole: 'Chief Civil Engineer',
    authorAvatar: shanmugamImg,
    isFeaturedMain: true,
    highlights: [
      'Current average cost: ₹2,100 to ₹3,200 per sq. ft depending on specifications.',
      'Key cost drivers: Soil foundation type, cement/steel grades, joinery, and sanitary fittings.',
      'How to buffer 10% contingency to eliminate surprises halfway through construction.'
    ],
    content: `
### What Decides the Price of a New Home in Coimbatore?

When you plan to build a home in Coimbatore—whether in Vadavalli, Saravanampatti, Singanallur, or Kovaipudur—the question everyone asks first is: *"How much will it cost per square foot?"*

While square footage gives a quick baseline, the real price of your home is decided by structural requirements, soil conditions, and finishing material choices.

#### 1. Soil and Foundation Engineering
Coimbatore has varied soil profiles. Areas near the Western Ghats (like Thondamuthur and Vadavalli) often feature gravelly red loam, while areas in the eastern belt may have expansive black cotton soil requiring deeper pile foundations or RCC raft footings. Foundation costs typically represent 12% to 18% of your overall structural expenditure.

#### 2. Structural Core: Cement, TMT Steel & Aggregates
- **TMT Steel:** High-ductility 550D TMT bars safeguard your house against seismic vibrations and long-term settlement.
- **Ready-Mix Concrete (RMC) vs Site-Mix:** Using tested grade concrete (M20/M25) ensures guaranteed compressive strength and reduces voids.
- **Bricks & Blocks:** Red clay wire-cut bricks versus AAC (Autoclaved Aerated Concrete) blocks will impact insulation, wall weight, and plastering costs.

#### 3. Realistic Budget Segments in Coimbatore (2026)
* **Standard Quality Build:** ₹2,100 – ₹2,400 per sq.ft. (Standard vitrified tiles, CPVC plumbing, Anchor/Legrand switches, teak wood main frame).
* **Premium Luxury Build:** ₹2,500 – ₹3,200+ per sq.ft. (Italian marble or large-format glazed tiles, Kohler/Jaquar concealed fittings, UPVC double-glazed windows, designer elevation textures).

#### 4. The 3 Golden Rules for Keeping to Your Budget
1. **Freeze Architectural & Electrical Plans Early:** Late changes in bathroom locations or window openings lead to hacking and high rework expenses.
2. **Itemized BOQ (Bill of Quantities):** Never sign a vague lump-sum agreement. Insist on clear brand names, thicknesses, and grade specifications.
3. **Keep a 10% Contingency Reserve:** Set aside 10% of your total budget for site development, compound wall, borewell drilling, and EB connection deposits.
    `
  },
  {
    id: 'commercial-building-approval-process',
    title: 'Commercial Building Approval Process',
    category: 'Commercial topics',
    badge: 'Business',
    badgeClass: 'badge-business',
    excerpt: 'A step-by-step look at the approvals a commercial building usually needs before construction starts.',
    image: commercialApprovalImg,
    readTime: '7 min read',
    date: 'Oct 11, 2026',
    author: 'Nilan Liaison Team',
    authorRole: 'Compliance & Legal Officer',
    authorAvatar: shanmugamImg,
    isFeaturedSideTop: true,
    highlights: [
      'Land use zoning verification under Coimbatore Master Plan (LPA).',
      'Mandatory Fire NOC, TNPCB, and Directorate of Town & Country Planning sanction.',
      'Setbacks, FSI (Floor Space Index), and road-width prerequisites.'
    ],
    content: `
### Step-by-Step Commercial Approval Guide in Tamil Nadu

Starting a commercial construction—such as a retail complex, office tower, or clinic—requires strict statutory permissions prior to groundbreaking. Here is the practical sequence followed on Coimbatore sites.

#### 1. Land Use and Zoning Clearance
Before drawing floor plans, verify whether the site falls within Mixed Commercial, Commercial, or General Industrial zones under the Coimbatore Local Planning Authority (LPA). Building commercial offices on un-reclassified agricultural or strictly residential land is illegal without formal Land Use Conversion.

#### 2. Road Width & Setback Compliance
Commercial permissions demand specific road widths:
- Minimum 30 to 40-foot road width for standard commercial complexes.
- Wider access (60+ feet) for multi-storey or assembly buildings.
- Setbacks must accommodate fire-tender vehicular movement around the perimeter.

#### 3. Key Departments for Sanction
* **Local Planning Authority (DTCP/LPA):** Approves structural drawings, parking ratios, and Floor Space Index (FSI).
* **Fire and Rescue Services Department:** Mandatory Fire NOC for all commercial buildings above specified heights.
* **Pollution Control Board (TNPCB):** Required if operating restaurants, hospitals, or manufacturing setups.
* **TANGEDCO (Electricity Board):** HT or LT line feasibility and dedicated transformer yard space.
    `
  },
  {
    id: 'dtcp-and-cmda-approval',
    title: 'DTCP and CMDA Approval',
    category: 'Real estate topics',
    badge: 'Industrial',
    badgeClass: 'badge-industrial',
    excerpt: 'What these approvals mean, which office applies where, and why you must check before you buy a plot.',
    image: dtcpCmdaImg,
    readTime: '5 min read',
    date: 'Oct 09, 2026',
    author: 'Er. Shanmugam',
    authorRole: 'Chief Civil Engineer',
    authorAvatar: shanmugamImg,
    isFeaturedSideBottom: true,
    highlights: [
      'Jurisdiction difference: DTCP covers Coimbatore and entire Tamil Nadu; CMDA governs Chennai Metropolitan Area.',
      'Why Panchayat-only approvals are invalid without DTCP technical sanction.',
      'How to verify online plot numbers, OSR gifts, and avoid unapproved layouts.'
    ],
    content: `
### Demystifying DTCP vs CMDA Approvals in Tamil Nadu

Before putting your hard-earned money into a land plot or construction layout, understanding planning approval jurisdiction is vital.

#### DTCP vs CMDA: What Is the Difference?
- **CMDA (Chennai Metropolitan Development Authority):** Has statutory jurisdiction strictly over the Chennai Metropolitan Area and peripheral zones.
- **DTCP (Directorate of Town and Country Planning):** Governs all other urban and rural districts in Tamil Nadu—including **Coimbatore, Tirupur, Erode, Salem, and Madurai**.

#### Why You Must Avoid "Panchayat-Approved" Unapproved Plots
In the past, local village panchayats issued layout approvals without mandatory technical sanction from DTCP. The Government of Tamil Nadu has explicitly de-recognized such layouts:
1. **No Bank Loans:** Nationalized banks and major NBFCs will not sanction building loans on non-DTCP/non-RERA registered plots.
2. **No EB / Water Sanction:** Electricity boards and corporations will not issue new commercial or residential service connections without approved DTCP layout numbers.
3. **No Resale Value:** You may get stuck with a plot that cannot be legally constructed upon.

#### Checklist Before Buying
- Check the official **DTCP Approval Number** (e.g., DTCP No. xx/202x).
- Verify the **OSR (Open Space Reservation)** gift deed has been surrendered to the local authority for parks and public roads.
- Confirm **RERA Registration** for added consumer security.
    `
  },
  {
    id: '2bhk-or-3bhk-how-to-plan-your-house',
    title: '2BHK or 3BHK: How to Plan Your House',
    category: 'House topics',
    badge: 'Architecture',
    badgeClass: 'badge-architecture',
    excerpt: 'How to choose between two and three bedrooms by your family, your plot and the years ahead.',
    image: housePlanImg,
    readTime: '5 min read',
    date: 'Oct 06, 2026',
    author: 'Nilan Architectural Team',
    authorRole: 'Senior Architect',
    authorAvatar: shanmugamImg,
    highlights: [
      'Balancing plot size (e.g., 3.5 cents vs 5 cents) against parking and open garden space.',
      'Evaluating future needs: growing children, elderly parents, and home-office hybrid work.',
      'Phased vertical construction: Ground floor 2BHK with provisions for 1st-floor expansion.'
    ],
    content: `
### Choosing Between 2BHK and 3BHK for Your Plot

Deciding between a 2-Bedroom and 3-Bedroom home is one of the most consequential decisions you will make. It determines not just your budget today, but how well your home serves your family 10 years from now.

#### 1. Plot Size and Setbacks
In Coimbatore, residential plots commonly range from 3 cents (1,306 sq.ft.) to 5 cents (2,178 sq.ft.).
- **On a 3 to 3.5-cent plot:** A spacious 2BHK ground floor gives you ample car parking, a comfortable portico, and good cross-ventilation. Fitting a 3BHK entirely on the ground floor on this size can make rooms cramped.
- **Duplex Solution:** If you need 3 bedrooms on a 3-cent plot, a duplex layout (Living + Kitchen + 1 Bedroom on ground; 2 Bedrooms + Family Lounge on first floor) is the ideal modern solution.

#### 2. Evaluating Family Life Cycles
- **Elderly Parents:** Always allocate one accessible bedroom on the ground floor with zero-threshold bathrooms and grab-bar provisions.
- **Children Growing Up:** A 3rd bedroom provides quiet study space and privacy that becomes indispensable during schooling and college years.
- **Hybrid Work / Guest Room:** A 3rd room can double as a quiet home office with fiber-optic wiring and natural light.

#### 3. Smart Phased Construction Strategy
If current finances are tight, design a **3BHK-ready structural frame**. Build the ground floor 2BHK now, but ensure column rebar, foundation footings, and staircase positioning are pre-engineered for a first-floor master suite when funds allow.
    `
  },
  {
    id: 'vastu-tips-for-new-homes',
    title: 'Vastu Tips for New Homes',
    category: 'House topics',
    badge: 'Vastu Design',
    badgeClass: 'badge-vastu',
    excerpt: 'Simple, practical Vastu points for the entrance, room places and light, and how to keep them with a layout that works.',
    image: vastuTipsImg,
    readTime: '5 min read',
    date: 'Oct 02, 2026',
    author: 'Er. Shanmugam',
    authorRole: 'Chief Civil Engineer',
    authorAvatar: shanmugamImg,
    highlights: [
      'North-East (Ishanya) entrance and water sump positioning for light and positive energy.',
      'South-East (Agni) kitchen orientation for natural morning ventilation.',
      'Master bedroom in South-West (Kubera) for privacy and structural balance.'
    ],
    content: `
### Practical Vastu for Modern Living: Where Tradition Meets Good Engineering

Vastu Shastra, when understood correctly, is ancient environmental science: it maximizes sunlight, cross-ventilation, and privacy in a tropical climate like Tamil Nadu.

#### 1. The Main Entrance (Simha Dwara)
- **Best Directions:** North-East, East, or North.
- **Practical Benefit:** Captures pleasant early morning ultraviolet sunlight without the blistering heat of the harsh western afternoon sun.
- **Tip:** Ensure the entrance is well-lit, elevated slightly above road level, and free from direct clutter.

#### 2. The Kitchen (Agni Moolai)
- **Position:** South-East corner is the premier location. Alternative: North-West.
- **Cooking Direction:** Stand facing East while cooking.
- **Engineering Logic:** South-eastern winds carry cooking vapors and heat away from the living bedrooms, maintaining fresh air circulation.

#### 3. Master Bedroom
- **Position:** South-West (Niruthi corner).
- **Benefit:** Offers maximum thermal comfort in the evening and creates a quiet, restful sanctuary away from active street noise.

#### 4. Water Sump and Septic Tank
- **Underground Water Sump & Borewell:** North-East quadrant.
- **Septic Tank:** North-West or West boundary, strictly separate from the drinking water sump to prevent cross-contamination.
    `
  },
  {
    id: 'best-flooring-options',
    title: 'Best Flooring Options',
    category: 'House topics',
    badge: 'Materials',
    badgeClass: 'badge-materials',
    excerpt: 'Vitrified tiles, granite, marble, wood and more, compared by cost, care and comfort for daily life.',
    image: flooringOptionsImg,
    readTime: '6 min read',
    date: 'Sep 29, 2026',
    author: 'Nilan Finishing Specialists',
    authorRole: 'Materials Engineer',
    authorAvatar: shanmugamImg,
    highlights: [
      'Double-charged vitrified tiles: Best value, scratch-resistant, and low maintenance.',
      'Natural Granite: Unmatched durability for staircases, sit-outs, and kitchen slabs.',
      'Italian Marble & Engineered Wood: Luxury aesthetics for premium living and master suites.'
    ],
    content: `
### Comparing Flooring Options for Coimbatore Homes

Flooring defines the visual tone, coolness underfoot, and daily maintenance effort of your home. Here is our head-to-head comparison based on 100+ site installations in Coimbatore.

#### 1. Double-Charged & GVT Vitrified Tiles
- **Price:** ₹65 to ₹130 per sq.ft.
- **Best For:** Living rooms, bedrooms, and dining halls.
- **Advantages:** Highly stain-resistant, pre-polished, non-porous, and available in large formats (4x2 ft, 6x4 ft) that minimize grout joints.
- **Verdict:** The #1 choice for value, durability, and hassle-free maintenance.

#### 2. Natural Granite Stone
- **Price:** ₹90 to ₹240 per sq.ft.
- **Best For:** Staircases, kitchen counters, pooja platforms, and porticos.
- **Advantages:** Virtually indestructible, withstands heavy foot traffic, and handles moisture effortlessly. Flamed or leather finishes provide great anti-skid grip outdoors.

#### 3. Italian & Indian Marble
- **Price:** ₹220 to ₹600+ per sq.ft. (plus specialized laying & diamond polishing).
- **Best For:** Formal drawing rooms and luxury villas.
- **Advantages:** Unrivaled natural veining and seamless monolithic sheen. Requires periodic sealing to prevent stains from turmeric or acidic liquids.

#### 4. Wooden Laminate & SPC Flooring
- **Price:** ₹110 to ₹220 per sq.ft.
- **Best For:** Master bedrooms and home theatres.
- **Advantages:** Warm and gentle underfoot. Stone Polymer Composite (SPC) click-lock flooring offers 100% waterproof resistance while mimicking natural teak or oak.
    `
  },
  {
    id: 'office-construction-guide',
    title: 'Office Construction Guide',
    category: 'Commercial topics',
    badge: 'Corporate',
    badgeClass: 'badge-corporate',
    excerpt: 'What to think about before you build an office: layout, services, parking and room to grow.',
    image: officeGuideImg,
    readTime: '7 min read',
    date: 'Sep 24, 2026',
    author: 'Er. Shanmugam',
    authorRole: 'Chief Civil Engineer',
    authorAvatar: shanmugamImg,
    highlights: [
      'Optimizing clear column spans for flexible, modular workstation floorplates.',
      'Integrated MEP: VRF air-conditioning, acoustic ceiling baffles, and structured networking.',
      'Mandatory parking quotas and electric vehicle (EV) charging provisions.'
    ],
    content: `
### Constructing a High-Performance Office Building

A successful commercial workplace must balance employee productivity, energy efficiency, and operational scalability. Here are the core design principles we apply on office construction projects.

#### 1. Column Grid and Flexible Floorplates
- Use larger structural column grids (minimum 6m x 6m or post-tensioned slabs) to minimize internal structural obstructions.
- This allows tenants to configure open-plan hot-desking, collaborative meeting pods, or private executive cabins with dry-wall modular partitions.

#### 2. MEP & Services Integration (Mechanical, Electrical, Plumbing)
- **Air Conditioning:** Central VRF/VRV systems allow zone-wise temperature control, reducing electricity bills by up to 30%.
- **Raised Access Flooring:** Allows clean routing of power and CAT6A data cabling beneath the floor, preventing unsightly dangling wires.
- **Acoustic Management:** Acoustic plasterboard, rockwool wall infills, and ceiling baffles ensure meeting privacy and phone-booth isolation.

#### 3. Parking and Accessibility Norms
Under Coimbatore municipal norms, every commercial space must provide stipulated parking bays based on built-up area. Planning basement or stilt parking with wide turning radiuses and EV charging infrastructure ensures full building tenancy.
    `
  },
  {
    id: 'property-investment-in-coimbatore',
    title: 'Property Investment in Coimbatore',
    category: 'Real estate topics',
    badge: 'Investment',
    badgeClass: 'badge-investment',
    excerpt: 'What to think about before you invest: place, roads and transport, approvals and long-term value.',
    image: propertyInvestmentImg,
    readTime: '7 min read',
    date: 'Sep 18, 2026',
    author: 'Nilan Investment Advisory',
    authorRole: 'Real Estate Strategist',
    authorAvatar: shanmugamImg,
    highlights: [
      'Top emerging investment corridors: Avinashi Road, Saravanampatti IT corridor, and Western Ring Road belt.',
      'Infrastructure catalysts: Coimbatore Metro rail, Airport expansion, and industrial parks.',
      'Due diligence checklist: 30-year Encumbrance Certificate (EC), Patta, and DTCP validation.'
    ],
    content: `
### Strategic Property Investment in Coimbatore: Growth Corridors & Due Diligence

Coimbatore continues to rank among South India's top Tier-2 investment destinations, driven by robust manufacturing, burgeoning IT exports, premier healthcare, and a pleasant year-round climate.

#### 1. High-Potential Micro-Markets
* **Avinashi Road & Neelambur:** The prime arterial spine connecting the international airport, Codissia trade complex, and multi-speciality medical hubs.
* **Saravanampatti & Keeranatham:** The IT corridor of Coimbatore housing major tech parks like CHIL SEZ. Ideal for rental apartments and gated community plots.
* **Vadavalli & Thondamuthur Belt:** The most sought-after residential sanctuary, boasting panoramic Western Ghats views, clean air, and Siruvani drinking water connections.
* **L&T Bypass & Trichy Road:** High industrial and logistics appreciation corridor with superb inter-city connectivity.

#### 2. Upcoming Infrastructure Boosters
- **Coimbatore Elevated Expressway & Metro Rail:** Will slash commute times between Avinashi Road and Ukkadam.
- **Airport Runway Expansion:** Paving the way for direct international flights to Singapore, Dubai, and Europe.
- **Western Ring Road:** Easing heavy vehicle transit and unlocking new suburban residential clusters.

#### 3. Essential Legal Due Diligence Before Buying
1. **30-Year Encumbrance Certificate (EC):** Ensure there are no undisclosed mortgages, bank liens, or disputes.
2. **Patta & Chitta Verification:** Confirm the seller's name matches the Tamil Nadu revenue records online.
3. **DTCP & RERA Sanction:** Verify that roads and public utility spaces are legally deeded to the local body.
    `
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [scrollDirection, setScrollDirection] = useState('right');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Construction & Real Estate Blog | Nilan Infra";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Practical advice on house construction, Vastu, flooring, approvals and property investment in Coimbatore from the team at Nilan Infra.'
    );
  }, []);

  // Filter articles based on category and search query
  const filteredArticles = blogArticles.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Guarantee seamless infinite looping by ensuring the track has enough items
  const getMarqueeItems = (items) => {
    if (!items || items.length === 0) return [];
    let baseList = [...items];
    while (baseList.length < 6) {
      baseList = [...baseList, ...items];
    }
    return baseList;
  };

  const marqueeItems = getMarqueeItems(filteredArticles);

  const renderArticleCard = (article, keySuffix) => (
    <div
      key={`${article.id}-${keySuffix}`}
      className="article-card-minimal"
    >
      <div 
        className="article-card-image" 
        onClick={() => setSelectedArticle(article)}
      >
        <img src={article.image} alt={article.title} loading="lazy" />
      </div>

      <div className="article-card-info">
        <h3 onClick={() => setSelectedArticle(article)}>
          {article.title}
        </h3>
        <p>{article.excerpt}</p>

        <div className="article-card-actions">
          <button 
            type="button"
            className="article-btn-enquire" 
            onClick={(e) => {
              e.stopPropagation();
              navigate('/contact');
            }}
          >
            ENQUIRE NOW
          </button>
          <button 
            type="button"
            className="article-link-readmore" 
            onClick={() => setSelectedArticle(article)}
          >
            <span>READ MORE</span> <span className="arrow">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );

  const featuredMain = blogArticles.find(a => a.isFeaturedMain);
  const featuredSideTop = blogArticles.find(a => a.isFeaturedSideTop);
  const featuredSideBottom = blogArticles.find(a => a.isFeaturedSideBottom);

  const categories = ['All', 'House topics', 'Commercial topics', 'Real estate topics'];

  // Handle keyboard ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle]);

  return (
    <div className="blog-page">

      {/* Blog Hero - Exactly Matching Services Hero Design */}
      <section className="services-hero">
        <div className="services-hero-bg">
          <img src={heroBgImg} alt="Construction and Real Estate Tips | Nilan Infra" />
          <div className="services-hero-overlay"></div>
        </div>
        <div className="services-hero-content">
          <span className="services-hero-tag">Construction & Real Estate Tips</span>
          <h1 className="services-hero-title">Construction and Real Estate Tips</h1>
          <p className="services-hero-subtitle">
            Building or buying property brings many questions. Here we answer them in simple words, 
            from what we see on real sites. Choose a topic, or start with the one closest to your plan.
          </p>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="blog-container">

        {/* Quick Topic Search Bar */}
        <div className="blog-search-bar-row">
          <div className="blog-search-box">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search topics (e.g., house cost, vastu, DTCP, flooring, 3BHK, commercial)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* SECTION 1: FEATURED POSTS (Matches the user's design image) */}
        {(!searchQuery && activeCategory === 'All') && (
          <section className="featured-section">
            <div className="section-title-wrap">
              <span className="section-overline">— FEATURED POSTS</span>
              <h2 className="section-heading">Stay Updated On The Latest News</h2>
              <p className="section-subtitle">
                Expert insights, structural advice, and site-tested guidance straight from our active engineering sites across Coimbatore.
              </p>
            </div>

            <div className="featured-grid">
              
              {/* Left Column: Big Main Featured Card */}
              {featuredMain && (
                <motion.div 
                  className="featured-card-large"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setSelectedArticle(featuredMain)}
                >
                  <div className="featured-large-img-wrap">
                    <img src={featuredMain.image} alt={featuredMain.title} />
                    <span className={`post-badge ${featuredMain.badgeClass}`}>
                      {featuredMain.badge}
                    </span>
                  </div>

                  <div className="featured-large-body">
                    <h3 className="featured-large-title">{featuredMain.title}</h3>
                    <p className="featured-large-excerpt">{featuredMain.excerpt}</p>

                    <div className="post-author-row">
                      <div className="author-meta">
                        <div className="author-details">
                          <span className="author-name">{featuredMain.author}</span>
                          <span className="post-date">{featuredMain.date}</span>
                        </div>
                      </div>
                      <span className="read-more-pill">
                        Read Guide <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Right Column: Two Stacked Horizontal Cards */}
              <div className="featured-stacked-column">
                
                {/* Stacked Card 1 */}
                {featuredSideTop && (
                  <motion.div 
                    className="featured-card-horizontal"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onClick={() => setSelectedArticle(featuredSideTop)}
                  >
                    <div className="horizontal-img-wrap">
                      <img src={featuredSideTop.image} alt={featuredSideTop.title} />
                      <span className={`post-badge ${featuredSideTop.badgeClass}`}>
                        {featuredSideTop.badge}
                      </span>
                    </div>

                    <div className="horizontal-body">
                      <h4 className="horizontal-title">{featuredSideTop.title}</h4>
                      <p className="horizontal-excerpt">{featuredSideTop.excerpt}</p>

                      <div className="post-author-row">
                        <div className="author-meta">
                          <div className="author-details">
                            <span className="author-name">{featuredSideTop.author}</span>
                            <span className="post-date">{featuredSideTop.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stacked Card 2 */}
                {featuredSideBottom && (
                  <motion.div 
                    className="featured-card-horizontal"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onClick={() => setSelectedArticle(featuredSideBottom)}
                  >
                    <div className="horizontal-img-wrap">
                      <img src={featuredSideBottom.image} alt={featuredSideBottom.title} />
                      <span className={`post-badge ${featuredSideBottom.badgeClass}`}>
                        {featuredSideBottom.badge}
                      </span>
                    </div>

                    <div className="horizontal-body">
                      <h4 className="horizontal-title">{featuredSideBottom.title}</h4>
                      <p className="horizontal-excerpt">{featuredSideBottom.excerpt}</p>

                      <div className="post-author-row">
                        <div className="author-meta">
                          <div className="author-details">
                            <span className="author-name">{featuredSideBottom.author}</span>
                            <span className="post-date">{featuredSideBottom.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: RECENT POSTS / NEWS & ARTICLES (Matches bottom of image) */}
        <section className="recent-posts-section" id="all-articles">
          <div className="section-header-row">
            <div className="section-title-wrap">
              <span className="section-overline">— RECENT POSTS</span>
              <h2 className="section-heading">News & Articles</h2>
            </div>

            <div className="section-header-actions">
              {/* Category Filter Pills */}
              <div className="category-filter-pills">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat === 'All' ? 'All Articles' : cat}
                  </button>
                ))}
              </div>

              {/* Marquee Controls */}
              <div className="marquee-controls-pill">
                <button
                  type="button"
                  className={`marquee-ctrl-btn ${scrollDirection === 'left' ? 'active' : ''}`}
                  onClick={() => setScrollDirection('left')}
                  title="Scroll Left"
                  aria-label="Scroll Left"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  type="button"
                  className={`marquee-ctrl-btn ${isPaused ? 'active' : ''}`}
                  onClick={() => setIsPaused(!isPaused)}
                  title={isPaused ? "Play Auto-Scroll" : "Pause Auto-Scroll"}
                  aria-label={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <Play size={14} /> : <Pause size={14} />}
                </button>
                <button
                  type="button"
                  className={`marquee-ctrl-btn ${scrollDirection === 'right' ? 'active' : ''}`}
                  onClick={() => setScrollDirection('right')}
                  title="Scroll Right"
                  aria-label="Scroll Right"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Search Result Count if active */}
          {(searchQuery || activeCategory !== 'All') && (
            <div className="results-summary">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} 
              {activeCategory !== 'All' ? ` under "${activeCategory}"` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
              <button 
                className="reset-filter-btn"
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Continuous Infinite Marquee Track (Left to Right / Pauses on Hover) */}
          {filteredArticles.length > 0 ? (
            <div 
              className="marquee-wrapper"
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div className={`marquee-track scroll-${scrollDirection} ${isPaused ? 'paused' : ''}`}>
                <div className="marquee-group">
                  {marqueeItems.map((article, index) => renderArticleCard(article, `grp1-${index}`))}
                </div>
                <div className="marquee-group" aria-hidden="true">
                  {marqueeItems.map((article, index) => renderArticleCard(article, `grp2-${index}`))}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-articles-found">
              <h3>No articles found</h3>
              <p>We couldn't find any guides matching your search criteria. Try a different search term or category.</p>
              <button 
                className="btn-premium"
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              >
                View All Guides
              </button>
            </div>
          )}
        </section>

      </div>

      {/* Luxury Split Action Section - Matches exact design of reference image without changing content */}
      <section className="blog-luxury-action-section">
        <div className="luxury-action-wrapper">
          <div className="luxury-action-container">
            <div className="luxury-action-title-block">
              <span className="luxury-action-dash">—</span>
              <div className="luxury-action-titles">
                <span className="luxury-action-tag">DIRECT SITE ADVICE</span>
                <h2>HAVE A SPECIFIC QUESTION.</h2>
                <h3>ABOUT YOUR PLOT OR CONSTRUCTION?</h3>
              </div>
            </div>
            <div className="luxury-action-content-block">
              <p>
                Every site has unique soil conditions, road access, and regulatory parameters. 
                Talk directly with our senior site engineers for straightforward, practical answers.
              </p>
              <div className="luxury-action-links-row">
                <Link to="/contact" className="luxury-action-link">
                  <span>BOOK A SITE CONSULTATION</span>
                  <span className="action-arrow">&gt;</span>
                </Link>
                <a href="tel:+919443522285" className="luxury-action-phone-link">
                  <PhoneCall size={15} />
                  <span>+91 94435 22285</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL ARTICLE MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="article-modal-overlay" onClick={() => setSelectedArticle(null)}>
            <motion.div 
              className="article-modal-container"
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article modal"
              >
                <X size={22} />
              </button>

              <div className="modal-header-hero">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="modal-hero-img" />
                <div className="modal-hero-gradient"></div>
                
                <div className="modal-hero-text">
                  <div className="modal-badges-row">
                    <span className={`post-badge ${selectedArticle.badgeClass}`}>
                      {selectedArticle.badge}
                    </span>
                    <span className="modal-category-pill">{selectedArticle.category}</span>
                    <span className="modal-read-pill"><Clock size={13} /> {selectedArticle.readTime}</span>
                  </div>
                  <h1 className="modal-article-title">{selectedArticle.title}</h1>
                </div>
              </div>

              <div className="modal-body-content">
                {/* Author Info Bar */}
                <div className="modal-author-strip">
                  <div className="modal-author-info">
                    <div>
                      <h4 className="modal-author-name">{selectedArticle.author}</h4>
                      <p className="modal-author-role">{selectedArticle.authorRole} • Nilan Infra</p>
                    </div>
                  </div>
                  <div className="modal-date-info">
                    <Calendar size={15} />
                    <span>Published on {selectedArticle.date}</span>
                  </div>
                </div>

                {/* Key Takeaways Box */}
                {selectedArticle.highlights && selectedArticle.highlights.length > 0 && (
                  <div className="modal-takeaways-card">
                    <h4 className="takeaways-title">
                      <Sparkles size={18} /> Quick Key Takeaways
                    </h4>
                    <ul>
                      {selectedArticle.highlights.map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="takeaway-check" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Render Article Formatted Markdown Text */}
                <div className="modal-prose">
                  {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    if (trimmed.startsWith('### ')) {
                      return <h2 key={idx} className="prose-h2">{trimmed.replace('### ', '')}</h2>;
                    }
                    if (trimmed.startsWith('#### ')) {
                      return <h3 key={idx} className="prose-h3">{trimmed.replace('#### ', '')}</h3>;
                    }
                    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                      const items = trimmed.split('\n');
                      return (
                        <ul key={idx} className="prose-ul">
                          {items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item.replace(/^(\*|-)\s+/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (/^\d+\.\s/.test(trimmed)) {
                      const items = trimmed.split('\n');
                      return (
                        <ol key={idx} className="prose-ol">
                          {items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item.replace(/^\d+\.\s+/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    return <p key={idx} className="prose-p">{trimmed}</p>;
                  })}
                </div>

                {/* Article Footer Callout */}
                <div className="modal-bottom-cta">
                  <div className="modal-bottom-cta-text">
                    <span className="modal-bottom-cta-badge">EXPERIENCE NILAN EXCELLENCE</span>
                    <h3>Planning a project in Coimbatore?</h3>
                    <p>Discuss your floor plan, budget estimation, or regulatory approvals with our engineering team.</p>
                  </div>
                  <button 
                    type="button"
                    className="modal-cta-btn"
                    onClick={() => {
                      setSelectedArticle(null);
                      navigate('/contact');
                    }}
                  >
                    <span>Request Free Consultation</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Blog;

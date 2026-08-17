import React, { useState, useEffect } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { 
  Building2, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Award, 
  FileText, 
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  Leaf,
  TrendingUp,
  Cpu,
  Smartphone,
  Image as ImageIcon,
  X,
  Maximize2,
  Layers
} from 'lucide-react';

export const CompanyPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [activeTab, setActiveTab] = useState('compliance');
  const [openFaq, setOpenFaq] = useState(null);
  const [visibleCount, setVisibleCount] = useState(16);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // All 32 Company Gallery Photos (In Logical / Chronological Progression)
  const allCompanyImages = [
    { 
      id: 1, 
      title: 'Initial Team Ideation Sprint', 
      category: 'Ideation', 
      date: 'Aug 2025', 
      url: '/company/IMG-20250830-WA0002.jpg',
      description: 'Founding brainstorm mapping out India\'s informal e-waste supply chain and formal smelter routing.' 
    },
    { 
      id: 2, 
      title: 'Platform Architecture Whiteboarding', 
      category: 'System Design', 
      date: 'Aug 2025', 
      url: '/company/IMG-20250830-WA0003.jpg',
      description: 'Designing the distributed REST API architecture, AI scanner interface, and recycler database schemas.' 
    },
    { 
      id: 3, 
      title: 'Circular Tech Vision Framework', 
      category: 'Strategy', 
      date: 'Aug 2025', 
      url: '/company/IMG-20250830-WA0004.jpg',
      description: 'Formulating the core ESG carbon abatement formulas and zero-landfill smelter guarantees.' 
    },
    { 
      id: 4, 
      title: 'Hardware Classification Roadmap', 
      category: 'R&D Planning', 
      date: 'Aug 2025', 
      url: '/company/IMG-20250830-WA0005.jpg',
      description: 'Categorizing PCB yield fractions, copper coil weights, and battery chemistry parameters.' 
    },
    { 
      id: 5, 
      title: 'Printed Circuit Board Analysis', 
      category: 'Hardware Lab', 
      date: 'Oct 2025', 
      url: '/company/IMG-20251008-WA0005.jpg',
      description: 'Microscopic inspection of solder traces and high-grade gold/copper pin extractions.' 
    },
    { 
      id: 6, 
      title: 'Prototype Component Assembly', 
      category: 'Prototyping', 
      date: 'Oct 2025', 
      url: '/company/IMG_20251027_155812095_HDR.jpg',
      description: 'Hardware lab prototype integration for real-time sensor and camera classification.' 
    },
    { 
      id: 7, 
      title: 'Live Degradation Tiering Analysis', 
      category: 'Quality Testing', 
      date: 'Nov 2025', 
      url: '/company/IMG_20251124_145217047_HDR.jpg',
      description: 'Automated cosmetic rating classification for secondary market refurbishment.' 
    },
    { 
      id: 8, 
      title: 'Urban Mining Smelter Calculations', 
      category: 'Smelter Logic', 
      date: 'Nov 2025', 
      url: '/company/IMG_20251124_145222735_HDR.jpg',
      description: 'Refining precious metal recovery yield percentages for CPCB certified industrial smelters.' 
    },
    { 
      id: 9, 
      title: 'Component Fraction Validation', 
      category: 'Validation', 
      date: 'Nov 2025', 
      url: '/company/IMG_20251124_155242561.jpg',
      description: 'Comparing predicted AI weights against physical bench scale measurements.' 
    },
    { 
      id: 10, 
      title: 'Smart India Hackathon Pitch Sprint', 
      category: 'SIH 2026', 
      date: 'Feb 2026', 
      url: '/company/IMG_20260228_122517209_HDR.jpg',
      description: 'Founding team pitching EcoTrace to hackathon evaluators and green tech juries.' 
    },
    { 
      id: 11, 
      title: 'Live Evaluation & Architecture Review', 
      category: 'Presentation', 
      date: 'Feb 2026', 
      url: '/company/IMG_20260228_122647091_HDR.jpg',
      description: 'Demonstrating automated CPCB Form-2 generation and live QR consignment tracing.' 
    },
    { 
      id: 12, 
      title: 'Prototype Verification Showcase', 
      category: 'Demonstration', 
      date: 'Feb 2026', 
      url: '/company/IMG_20260228_123300548_HDR.jpg',
      description: 'Presenting end-to-end user journey from consumer app scan to verified recycler drop-off.' 
    },
    { 
      id: 13, 
      title: 'Campus E-Waste Collection Hub', 
      category: 'Community', 
      date: 'Mar 2026', 
      url: '/company/IMG_20260320_120419822_HDR.jpg',
      description: 'Engaging student donors and collecting retired electronics at campus collection points.' 
    },
    { 
      id: 14, 
      title: 'Student Donor Outreach & Drive', 
      category: 'Field Drive', 
      date: 'Mar 2026', 
      url: '/company/IMG_20260320_120427306_HDR.jpg',
      description: 'Educational campaign on toxic chemical hazards of informal electronics dumping.' 
    },
    { 
      id: 15, 
      title: 'Industrial Smelter Hub Visit', 
      category: 'Field Audit', 
      date: 'Apr 2026', 
      url: '/company/IMG_20260407_172517370_HDR.jpg',
      description: 'On-site technical audit of certified smelter pyrometallurgical refining processes.' 
    },
    { 
      id: 16, 
      title: 'Smelter Operations Inspection', 
      category: 'Compliance', 
      date: 'Apr 2026', 
      url: '/company/IMG_20260407_172518927_HDR.jpg',
      description: 'Verifying air emission scrubbing systems and zero-leaching containment standards.' 
    },
    { 
      id: 17, 
      title: 'Bulk Processing Operations', 
      category: 'Logistics', 
      date: 'Apr 2026', 
      url: '/company/IMG_20260407_172521111.jpg',
      description: 'Monitoring automated shredder lines and eddy-current non-ferrous metal sorters.' 
    },
    { 
      id: 18, 
      title: 'Zero-Landfill Stream Verification', 
      category: 'ESG Audit', 
      date: 'Apr 2026', 
      url: '/company/IMG_20260407_172522684.jpg',
      description: 'Documenting complete material mass balance records for corporate audit trails.' 
    },
    { 
      id: 19, 
      title: 'API & Microservices Architecture', 
      category: 'Software Engine', 
      date: 'Apr 2026', 
      url: '/company/IMG-20260415-WA0019 (1).jpg',
      description: 'Optimizing Supabase real-time sync, state management, and geo-fencing queries.' 
    },
    { 
      id: 20, 
      title: 'CPCB Form-2 Generator Review', 
      category: 'Regulatory', 
      date: 'Apr 2026', 
      url: '/company/IMG-20260415-WA0019.jpg',
      description: 'Auditing legal compliance modules against Ministry of Environment e-waste regulations.' 
    },
    { 
      id: 21, 
      title: 'Doorstep Pickup Dispatch Logic', 
      category: 'GeoLogistics', 
      date: 'Apr 2026', 
      url: '/company/IMG-20260415-WA0022.jpg',
      description: 'Refining driver routing algorithms and real-time pickup status tracking.' 
    },
    { 
      id: 22, 
      title: 'Regional Exhibition Showcase', 
      category: 'Exhibition', 
      date: 'May 2026', 
      url: '/company/IMG_20260523_123648554_HDR.jpg',
      description: 'Displaying EcoTrace at regional innovation summits and sustainability expos.' 
    },
    { 
      id: 23, 
      title: 'Innovation Summit Presentation', 
      category: 'Summit', 
      date: 'May 2026', 
      url: '/company/IMG_20260523_123655035_HDR.jpg',
      description: 'Keynote on circular economy acceleration and AI computer vision in waste management.' 
    },
    { 
      id: 24, 
      title: 'Enterprise Stakeholder Meet', 
      category: 'Partnerships', 
      date: 'May 2026', 
      url: '/company/IMG_20260523_123708864_HDR.jpg',
      description: 'Aligning corporate ESG leaders and OEM recyclers on annual EPR compliance targets.' 
    },
    { 
      id: 25, 
      title: 'Sustainability Awards Forum', 
      category: 'Recognition', 
      date: 'May 2026', 
      url: '/company/IMG_20260523_123711217_HDR.jpg',
      description: 'Recognized for indigenous green technology innovation and youth-driven climate impact.' 
    },
    { 
      id: 26, 
      title: 'EcoTrace Live Platform Trial', 
      category: 'Product Demo', 
      date: 'May 2026', 
      url: '/company/IMG_20260523_123754655_HDR.jpg',
      description: 'Public testing of mobile AR scanning and instant token reward payouts.' 
    },
    { 
      id: 27, 
      title: 'Recycler Onboarding Workshop', 
      category: 'Operations', 
      date: 'May 2026', 
      url: '/company/IMG_20260523_123757101_HDR.jpg',
      description: 'Training partner recycling facilities on digital inventory ledger verification.' 
    },
    { 
      id: 28, 
      title: 'Carbon Offset Calculation Live', 
      category: 'ESG Metrics', 
      date: 'May 2026', 
      url: '/company/IMG_20260523_123843128_HDR.jpg',
      description: 'Demonstrating real-time CO2e abatement calculations from copper and gold recovery.' 
    },
    { 
      id: 29, 
      title: 'Smart City E-Waste Forum', 
      category: 'CleanTech', 
      date: 'May 2026', 
      url: '/company/IMG_20260523_123850354_HDR.jpg',
      description: 'Discussing municipal e-waste integration with urban development authorities.' 
    },
    { 
      id: 30, 
      title: 'National Scale Deployment Sprint', 
      category: 'Milestone', 
      date: 'Aug 2026', 
      url: '/company/IMG_20260808_143820447_HDR.jpg',
      description: 'Expanding logistics network and recycler coverage across North India.' 
    },
    { 
      id: 31, 
      title: 'EcoTrace Official Team Keynote', 
      category: 'Team Milestone', 
      date: 'Aug 2026', 
      url: '/company/file_000000002dc46243aefd538ba9bd4126.png',
      description: 'Founding leadership team celebrating platform deployment and hackathon milestones.' 
    },
    { 
      id: 32, 
      title: 'Enterprise E-Waste Alliance Network', 
      category: 'Alliance', 
      date: 'Aug 2026', 
      url: '/company/file_00000000e6fc61f59b40b08dedbea93b.png',
      description: 'Uniting recyclers, corporate donors, and community leads into a unified green grid.' 
    }
  ];

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => (prev > 0 ? prev - 1 : allCompanyImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => (prev < allCompanyImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, allCompanyImages.length]);

  const displayedImages = allCompanyImages.slice(0, visibleCount);
  const hasMoreImages = visibleCount < allCompanyImages.length;

  const handleNextImage = () => {
    setSelectedImageIndex(prev => (prev < allCompanyImages.length - 1 ? prev + 1 : 0));
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => (prev > 0 ? prev - 1 : allCompanyImages.length - 1));
  };

  // Accordion FAQ Items
  const faqItems = [
    {
      id: 1,
      question: 'How does EcoTrace automate CPCB & EPR Compliance for Corporations?',
      answer: 'EcoTrace generates immutable digital logs for every asset collected, retired, or recycled. Our backend automatically formats data into CPCB Form-2 formats, issuing audit-ready ESG certificates that integrate directly with annual corporate sustainability filings.'
    },
    {
      id: 2,
      question: 'What data sanitization standards are enforced for retired corporate hardware?',
      answer: 'All corporate IT assets undergo certified NIST 800-88 data sanitization protocols prior to component recycling. Hard drives receive degaussing or physical shredding with video audit logs provided to enterprise clients.'
    },
    {
      id: 3,
      question: 'How are carbon credit calculations verified?',
      answer: 'Our carbon abatement model calculates energy and emissions avoided by substituting virgin ore mining with recovered secondary metals (gold, copper, silver). Every certificate is calculated using Life Cycle Assessment (LCA) methodologies.'
    },
    {
      id: 4,
      question: 'Can enterprise clients integrate EcoTrace API into internal asset management systems?',
      answer: 'Yes. EcoTrace provides RESTful APIs for enterprise ITAM (IT Asset Management) systems, allowing automated scheduling of bulk e-waste retirement directly from corporate portals.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="company" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '0 0 100px' }}>

        {/* HERO — full-bleed section bg, glassmorphism card inside */}
        <section className="page-hero-section company-hero-bg">
          <div className="container">
            <div className="page-hero-card">
              <div className="badge badge-emerald" style={{ marginBottom: '20px' }}>
                <Sparkles size={14} />
                <span>Corporate B2B ESG &amp; Industrial Recycling Alliance</span>
              </div>
              <h1 className="page-hero-title">
                Enterprise Solutions &amp; <span className="gradient-text">EPR Compliance</span>
              </h1>
              <p className="page-hero-desc" style={{ marginBottom: '32px' }}>
                EcoTrace connects electronics OEMs, tech parks, and corporate enterprises with verified industrial smelters. We replace informal dumping with automated CPCB compliance, audit-ready carbon credits, and zero-landfill guarantees.
              </p>
              <div className="hero-cta-wrapper" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
                <button className="btn btn-primary btn-lg" onClick={() => onNavigate('partner')} id="company-partner-btn">
                  <Building2 size={18} style={{ flexShrink: 0 }} />
                  <span>Partner with EcoTrace</span>
                  <ArrowRight size={16} style={{ flexShrink: 0 }} />
                </button>
                <button className="btn btn-secondary btn-lg" onClick={onOpenConsumerApp}>
                  <Smartphone size={18} style={{ flexShrink: 0 }} />
                  <span>Scan Enterprise E-Waste</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container">

          {/* DYNAMIC METRIC CHIPS BAR */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '60px' }} className="metrics-grid">
            <div className="metric-card" style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <ShieldCheck size={24} color="#10B981" />
                <span className="badge badge-emerald">Automated</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '4px' }}>100% CPCB</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>E-Waste Form-2 Compliance</div>
            </div>

            <div className="metric-card" style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Leaf size={24} color="#3B82F6" />
                <span className="badge badge-blue">Verified</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '4px' }}>Zero Landfill</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Smelter Stream Guarantee</div>
            </div>

            <div className="metric-card" style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Lock size={24} color="#8B5CF6" />
                <span className="badge badge-purple">NIST 800-88</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '4px' }}>Data Secure</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Certified Hardware Destruction</div>
            </div>

            <div className="metric-card" style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <TrendingUp size={24} color="#10B981" />
                <span className="badge badge-emerald">Scope 3</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '4px' }}>ESG Audited</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Real-Time Carbon Certificates</div>
            </div>
          </div>

          {/* INTERACTIVE SOLUTION SHOWCASE TABS */}
          <div style={{ marginBottom: '60px' }}>
            <div className="section-header">
              <div className="section-subtitle">Enterprise Solutions</div>
              <h2 className="section-title">Built for Corporate ESG & Industrial Standards</h2>
              <p className="section-description">Select a pillar below to explore how EcoTrace streamlines corporate hardware retirement.</p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button 
                onClick={() => setActiveTab('compliance')} 
                className={`btn ${activeTab === 'compliance' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <ShieldCheck size={16} />
                <span>CPCB & EPR Compliance</span>
              </button>

              <button 
                onClick={() => setActiveTab('ai')} 
                className={`btn ${activeTab === 'ai' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <Cpu size={16} />
                <span>AI Vision Integration</span>
              </button>

              <button 
                onClick={() => setActiveTab('esg')} 
                className={`btn ${activeTab === 'esg' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <Leaf size={16} />
                <span>Scope 3 Carbon Auditing</span>
              </button>

              <button 
                onClick={() => setActiveTab('security')} 
                className={`btn ${activeTab === 'security' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <Lock size={16} />
                <span>Data Sanitization</span>
              </button>
            </div>

            {/* Active Tab Panel */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px'
            }}>
              {activeTab === 'compliance' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px', color: 'var(--emerald-primary)' }}>
                    Automated Extended Producer Responsibility (EPR)
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
                    India's E-Waste Management Rules require electronics brands to fulfill mandatory annual recycling targets. EcoTrace eliminates manual paperwork by issuing automated digital Form-2 receipts backed by immutable smelter ledger records.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span className="badge badge-emerald">✓ Instant Form-2 Generation</span>
                    <span className="badge badge-blue">✓ CPCB Audit Ready</span>
                    <span className="badge badge-purple">✓ Smelter Ledger Verified</span>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px', color: 'var(--emerald-primary)' }}>
                    Sub-200ms Multi-Task Vision Classifier
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
                    Our neural vision model detects device degradation tiers, identifies internal component weight fractions (PCBs, copper windings, batteries), and computes fair valuation benchmarks instantly on any web browser.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span className="badge badge-emerald">✓ 45,000+ Image Dataset</span>
                    <span className="badge badge-blue">✓ Edge Neural Inference</span>
                    <span className="badge badge-purple">✓ 99.4% Accuracy Rate</span>
                  </div>
                </div>
              )}

              {activeTab === 'esg' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px', color: 'var(--emerald-primary)' }}>
                    Audit-Ready Scope 3 GHG Reduction Certificates
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
                    Every retired desktop, laptop, or server processed through EcoTrace generates a verified carbon offset certificate calculating exact greenhouse gas emissions prevented by substituting virgin ore mining.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span className="badge badge-emerald">✓ Downloadable PDF Reports</span>
                    <span className="badge badge-blue">✓ LCA Benchmark Compliant</span>
                    <span className="badge badge-purple">✓ Annual ESG Ready</span>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px', color: 'var(--emerald-primary)' }}>
                    NIST 800-88 Hardware Data Destruction
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
                    Corporate IT assets receive certified magnetic degaussing or physical shredding with serial-number level destruction certificates to protect enterprise IP and customer privacy.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span className="badge badge-emerald">✓ Serialized Destruction Log</span>
                    <span className="badge badge-blue">✓ NIST 800-88 Standard</span>
                    <span className="badge badge-purple">✓ Zero Data Risk</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COMPANY & ECOSYSTEM GALLERY (16 AT A TIME PAGINATION + LIGHTBOX) */}
          <div id="company-gallery-section" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
            <div className="section-header">
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                <ImageIcon size={14} />
                <span>Company &amp; Ecosystem Moments</span>
              </div>
              <h2 className="section-title">EcoTrace Company &amp; Ecosystem Gallery</h2>
              <p className="section-description">
                A visual chronicle of our founding research, hackathon sprints, field smelter audits, and community recycling drives.
              </p>
            </div>

            {/* Gallery Stats Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '24px',
              padding: '12px 20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <Layers size={16} color="var(--emerald-primary)" />
                <span>
                  Showing <strong style={{ color: 'var(--text-primary)' }}>{displayedImages.length}</strong> of <strong style={{ color: 'var(--text-primary)' }}>{allCompanyImages.length}</strong> company moments (16 per batch)
                </span>
              </div>
              <div style={{
                height: '6px',
                width: '180px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${(displayedImages.length / allCompanyImages.length) * 100}%`,
                  background: 'linear-gradient(90deg, #10B981, #3B82F6)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>

            {/* Image Grid */}
            <div className="company-gallery-grid metrics-grid">
              {displayedImages.map((img, i) => (
                <div 
                  key={img.id || i} 
                  className="feature-card gallery-item-card" 
                  onClick={() => setSelectedImageIndex(i)}
                  style={{ 
                    padding: '0', 
                    overflow: 'hidden', 
                    borderRadius: 'var(--radius-md)', 
                    height: '240px', 
                    position: 'relative',
                    cursor: 'pointer',
                    group: 'gallery-item'
                  }}
                  title="Click to view full photo"
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      transition: 'transform 0.4s ease' 
                    }} 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop';
                    }}
                  />

                  {/* Dark Gradient Overlay with Info */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                    transition: 'background 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '3px 8px' }}>
                        {img.category}
                      </span>
                      <span style={{
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(6px)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)'
                      }}>
                        #{i + 1}
                      </span>
                    </div>

                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.3', marginBottom: '4px' }}>
                        {img.title}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>{img.date}</span>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.7rem',
                          color: 'var(--emerald-primary)',
                          fontWeight: '600'
                        }}>
                          <Maximize2 size={12} />
                          <span>View</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls ("View More" / "Show Less") */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '36px',
              gap: '16px'
            }}>
              {hasMoreImages ? (
                <button 
                  className="btn btn-primary btn-lg" 
                  onClick={() => setVisibleCount(prev => Math.min(prev + 16, allCompanyImages.length))}
                  id="view-more-company-photos-btn"
                  style={{
                    padding: '14px 36px',
                    fontSize: '1rem',
                    fontWeight: '800',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
                  }}
                >
                  <ImageIcon size={18} />
                  <span>View More Photos (+{Math.min(16, allCompanyImages.length - visibleCount)} next)</span>
                  <ChevronDown size={18} />
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <div className="badge badge-emerald" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} />
                    <span>All {allCompanyImages.length} Company Moments Displayed</span>
                  </div>
                  <button 
                    className="btn btn-secondary btn-md" 
                    onClick={() => {
                      setVisibleCount(16);
                      const elem = document.getElementById('company-gallery-section');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <ChevronUp size={16} />
                    <span>Show Less (Collapse to 16)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FULLSCREEN LIGHTBOX MODAL */}
          {selectedImageIndex !== null && allCompanyImages[selectedImageIndex] && (
            <div 
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10, 15, 29, 0.94)',
                backdropFilter: 'blur(12px)',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
              }}
              onClick={() => setSelectedImageIndex(null)}
            >
              <div 
                style={{
                  position: 'relative',
                  maxWidth: '960px',
                  width: '100%',
                  maxHeight: '90vh',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: '1px solid var(--border-color)',
                  background: 'rgba(15, 23, 42, 0.6)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                      {allCompanyImages[selectedImageIndex].category}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Photo {selectedImageIndex + 1} of {allCompanyImages.length} • {allCompanyImages[selectedImageIndex].date}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedImageIndex(null)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: 'none',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-full)',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Main Image Area with Navigation Buttons */}
                <div style={{
                  position: 'relative',
                  flex: 1,
                  minHeight: '340px',
                  maxHeight: '60vh',
                  background: '#0B0F19',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={allCompanyImages[selectedImageIndex].url} 
                    alt={allCompanyImages[selectedImageIndex].title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '60vh',
                      objectFit: 'contain',
                      borderRadius: '4px'
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop';
                    }}
                  />

                  {/* Previous Button */}
                  <button 
                    onClick={handlePrevImage}
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--emerald-primary)';
                      e.currentTarget.style.color = '#0F172A';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(15, 23, 42, 0.75)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* Next Button */}
                  <button 
                    onClick={handleNextImage}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--emerald-primary)';
                      e.currentTarget.style.color = '#0F172A';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(15, 23, 42, 0.75)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    aria-label="Next photo"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Modal Footer Info */}
                <div style={{
                  padding: '20px 24px',
                  background: 'var(--bg-card)',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '6px' }}>
                    {allCompanyImages[selectedImageIndex].title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {allCompanyImages[selectedImageIndex].description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* INTERACTIVE FAQ ACCORDION */}
          <div style={{ marginBottom: '60px', maxWidth: '840px', margin: '0 auto 60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div className="section-subtitle">Frequently Asked Questions</div>
              <h2 className="section-title">Enterprise & Recycler Inquiries</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {faqItems.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div 
                    key={faq.id} 
                    className="faq-card-wrapper"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden'
                    }}
                  >
                    <button 
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      style={{
                        width: '100%',
                        padding: '20px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronDown size={20} color="var(--emerald-primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 24px 20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CERTIFIED CORPORATE ALLIANCE NETWORK */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--emerald-primary)', marginBottom: '20px' }}>
              Certified Corporate Alliance Network
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '28px', opacity: 0.85 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: '800' }}>
                <Building2 size={22} color="#10B981" />
                <span>GREEN TECH CORP</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: '800' }}>
                <Globe size={22} color="#3B82F6" />
                <span>CIRCULAR GLOBAL</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: '800' }}>
                <Zap size={22} color="#8B5CF6" />
                <span>URBAN MINING INC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: '800' }}>
                <ShieldCheck size={22} color="#10B981" />
                <span>ECO RECYCLERS ASSOC</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenConsumerApp={onOpenConsumerApp} onOpenRecyclerDash={onOpenRecyclerDash} />
    </div>
  );
};

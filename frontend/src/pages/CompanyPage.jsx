import React, { useState } from 'react';
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
  CheckCircle2,
  Lock,
  Leaf,
  TrendingUp,
  Cpu,
  Smartphone,
  Image as ImageIcon
} from 'lucide-react';

export const CompanyPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [activeTab, setActiveTab] = useState('compliance');
  const [openFaq, setOpenFaq] = useState(null);

  // 16 High-Quality Industrial & Recycler Platform Gallery Images
  const galleryImages = [
    { title: 'AI Camera Viewfinder Reticle', category: 'Vision AI', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop' },
    { title: 'Printed Circuit Board Architecture', category: 'Hardware', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
    { title: 'Urban Mining E-Waste Sorting', category: 'Recycling', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop' },
    { title: 'Industrial Smelter Metal Recovery', category: 'Processing', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop' },
    { title: 'Clean Energy Circular Infrastructure', category: 'Sustainability', url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop' },
    { title: 'University Campus Collection Drive', category: 'Community', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop' },
    { title: 'Enterprise Corporate ESG Hub', category: 'Corporate', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' },
    { title: 'Robotic Dismantling System', category: 'Innovation', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop' },
    { title: 'Scrap Electronics Recovery Facility', category: 'Logistics', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop' },
    { title: 'High-Tech Enterprise Data Center', category: 'ITAD', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' },
    { title: 'Precious Gold & Copper Refining', category: 'Urban Mining', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
    { title: 'Smart Sustainable Cities', category: 'Environment', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop' },
    { title: 'Green Tech Microchip Design', category: 'Hardware', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop' },
    { title: 'Solar Infrastructure Deployment', category: 'CleanTech', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop' },
    { title: 'Doorstep Pickup GPS Logistics', category: 'Logistics', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop' },
    { title: 'Eco Circuit Matrix Network', category: 'Technology', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop' }
  ];

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
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={onOpenRecyclerDash}>
                  <Building2 size={20} />
                  <span>Access Recycler Portal</span>
                  <ArrowRight size={18} />
                </button>
                <button className="btn btn-secondary btn-lg" onClick={onOpenConsumerApp}>
                  <Smartphone size={20} />
                  <span>Test AI Scanner</span>
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

          {/* 16-IMAGE PLATFORM GALLERY GRID */}
          <div style={{ marginBottom: '80px' }}>
            <div className="section-header">
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                <ImageIcon size={14} />
                <span>Industrial Platform Gallery</span>
              </div>
              <h2 className="section-title">EcoTrace 16-Image Ecosystem Gallery</h2>
              <p className="section-description">
                A visual showcase of hardware scanning, urban mining, component recovery, and industrial smelter processing.
              </p>
            </div>

            <div className="company-gallery-grid metrics-grid">
              {galleryImages.map((img, i) => (
                <div key={i} className="feature-card" style={{ padding: '0', overflow: 'hidden', borderRadius: 'var(--radius-md)', height: '220px', position: 'relative' }}>
                  <img src={img.url} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.9) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '16px'
                  }}>
                    <span className="badge badge-emerald" style={{ width: 'fit-content', fontSize: '0.7rem', marginBottom: '4px' }}>{img.category}</span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.3' }}>{img.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

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

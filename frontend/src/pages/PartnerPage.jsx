import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { PartnerApplicationModal } from '../components/partner/PartnerApplicationModal';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Scale, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  FileText, 
  Globe, 
  Truck, 
  DollarSign, 
  AlertTriangle, 
  Users, 
  Check, 
  X as XIcon,
  Flame,
  Award,
  Zap,
  Lock,
  Boxes
} from 'lucide-react';

export const PartnerPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Research Ecosystem Profiles (From Ashmit_E-Waste_Research.pdf)
  const ecosystemPlayers = [
    {
      id: 'attero',
      name: 'Attero Recycling',
      category: 'deep-tech',
      type: 'Deep-Tech Recycler / Material Recovery',
      badge: 'Deep-Tech Metallurgy',
      color: '#8B5CF6',
      specialty: 'Extraction of precious metals (Gold, Silver, Palladium, Copper) from high-grade PCBs & EV lithium-ion batteries.',
      logistics: 'B2B reverse logistics & corporate enterprise IT asset collection.',
      focus: 'High-yield urban mining & hydro-metallurgical refining.',
      ecosystemRole: 'Industrial Smelter & Material Extractor',
      strength: 'Extracts 99% of pure precious metals from complex circuit boards.'
    },
    {
      id: 'recyclekaro',
      name: 'RecycleKaro',
      category: 'smelter',
      type: 'CPCB-Authorized Recycler & Smelter',
      badge: 'CPCB Certified',
      color: '#10B981',
      specialty: 'End-to-end industrial electronic scrap recycling, EV battery dismantling, and heavy commercial ITAD.',
      logistics: 'Strictly B2B / Bulk tonnage doorstep logistics across industrial belts.',
      focus: 'High-tonnage commercial electronic scrap & industrial batteries.',
      ecosystemRole: 'Heavy Industrial Smelter & Tonnage Processor',
      strength: 'Handles high-volume industrial recycling with zero-landfill assurance.'
    },
    {
      id: 'karosambhav',
      name: 'Karo Sambhav',
      category: 'pro',
      type: 'Producer Responsibility Organization (PRO)',
      badge: 'PRO Ecosystem',
      color: '#3B82F6',
      specialty: 'Sets up verified collection channels to assist global & domestic electronics OEMs meet mandatory CPCB EPR quotas.',
      logistics: 'Community drop-off bins, institutional drives, and stakeholder collection networks.',
      focus: 'EPR policy fulfillment, OEM compliance, and educational drives.',
      ecosystemRole: 'Producer Responsibility & EPR Compliance Network',
      strength: 'Extensive pan-India EPR compliance management for Tier-1 brands.'
    },
    {
      id: 'hulladek',
      name: 'Hulladek Recycling',
      category: 'collector',
      type: 'Recycler & Regional Reverse Collector',
      badge: 'Regional Network',
      color: '#F59E0B',
      specialty: 'Commercial and residential e-waste collection across Eastern India and key metropolitan clusters.',
      logistics: 'Scheduled doorstep reverse logistics for institutions and corporates.',
      focus: 'Organized collection pipelines and authorized channel aggregation.',
      ecosystemRole: 'Authorized Regional Aggregator & Collector',
      strength: 'Pioneered formal e-waste collection networks across Eastern India.'
    },
    {
      id: 'cashify',
      name: 'Cashify',
      category: 're-commerce',
      type: 'Re-Commerce / Device Buyback Platform',
      badge: 'Re-Commerce Hub',
      color: '#06B6D4',
      specialty: 'Instant valuation, purchase, and refurbishment of functional consumer smart devices.',
      logistics: 'Consumer doorstep pickup via hyper-local riders.',
      focus: 'Refurbishment, resale, and extending device lifecycle.',
      ecosystemRole: 'Secondary Market & Refurbishment Ecosystem',
      strength: 'Dynamic pricing algorithms for working high-value smartphones & laptops.'
    }
  ];

  const filteredPlayers = activeCategory === 'all' 
    ? ecosystemPlayers 
    : ecosystemPlayers.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="partner" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, paddingBottom: '100px' }}>

        {/* HERO SECTION */}
        <section className="page-hero-section company-hero-bg" style={{ position: 'relative' }}>
          <div className="container">
            <div className="page-hero-card" style={{ maxWidth: '980px', margin: '0 auto' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '18px' }}>
                <Sparkles size={14} />
                <span>🇮🇳 Indian E-Waste Recycler &amp; Industrial Alliance</span>
              </div>
              <h1 className="page-hero-title">
                Indian E-Waste Partners &amp; <span className="gradient-text">Industrial Ecosystem</span>
              </h1>
              <p className="page-hero-desc" style={{ marginBottom: '28px' }}>
                India generates over <strong>13.98 Lakh Tonnes</strong> of e-waste annually with <strong>46% recoverable metal value</strong>. 
                EcoTrace connects households, enterprises, and tech parks with verified CPCB-authorized smelters and deep-tech refiners—turning fragmented scrap into formal, audit-ready circular resources.
              </p>
              
              {/* ACTION BUTTONS GROUP */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '14px', 
                  flexWrap: 'wrap', 
                  width: '100%' 
                }} 
                className="hero-cta-wrapper"
              >
                <button 
                  className="btn btn-primary btn-lg" 
                  onClick={() => setIsApplyModalOpen(true)}
                  id="partner-hero-apply-btn"
                  style={{ gap: '10px' }}
                >
                  <Building2 size={18} style={{ flexShrink: 0 }} />
                  <span>Be a Partner with Us</span>
                  <ArrowRight size={16} style={{ flexShrink: 0 }} />
                </button>

                <button 
                  className="btn btn-secondary btn-lg" 
                  onClick={() => onNavigate('org-admin')}
                  id="partner-hero-org-login-btn"
                  style={{ gap: '10px', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid var(--border-color)' }}
                >
                  <ShieldCheck size={18} color="#3B82F6" style={{ flexShrink: 0 }} />
                  <span>Organization Admin</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container">

          {/* RESEARCH METRIC CARDS GRID */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '20px', 
              margin: '-30px 0 60px' 
            }} 
            className="metrics-grid"
          >
            <div className="metric-card" style={{ padding: '24px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Scale size={24} color="#10B981" />
                <span className="badge badge-emerald">FY 24–25 CPCB Data</span>
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>13.98 Lakh MT</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Generated in India (Doubled in 8 Years)</div>
            </div>

            <div className="metric-card" style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <TrendingUp size={24} color="#3B82F6" />
                <span className="badge badge-blue">USD 9.95 Billion</span>
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>$3.32B → $9.95B</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Indian E-Waste Market Forecast (2025-2034)</div>
            </div>

            <div className="metric-card" style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Cpu size={24} color="#F59E0B" />
                <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.3)' }}>Urban Mining</span>
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>46% Metals</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Recoverable Gold, Silver &amp; Pure Copper</div>
            </div>

            <div className="metric-card" style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <ShieldCheck size={24} color="#8B5CF6" />
                <span className="badge badge-purple">E-Waste Rules 2022</span>
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '4px', color: 'var(--text-primary)' }}>60% → 80% EPR</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mandatory CPCB Producer Collection Target</div>
            </div>
          </div>

          {/* SECTION 1: INDIAN E-WASTE PARTNERS & RECYCLING ECOSYSTEM */}
          <div style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
              <div className="badge badge-blue" style={{ marginBottom: '12px' }}>
                <Boxes size={14} />
                <span>Indian Recycling Landscape</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 14px', color: 'var(--text-primary)' }}>
                Leading Indian E-Waste Recyclers &amp; Industrial Players
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Companies like these drive the specialized recovery, smelting, and producer responsibility operations across India. 
                EcoTrace integrates as the digital operating layer connecting suppliers with formal facilities.
              </p>

              {/* Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
                {[
                  { id: 'all', label: 'All Recycler Categories' },
                  { id: 'deep-tech', label: 'Deep-Tech Refiners (Attero)' },
                  { id: 'smelter', label: 'CPCB Smelters (RecycleKaro)' },
                  { id: 'pro', label: 'PRO Networks (Karo Sambhav)' },
                  { id: 'collector', label: 'Regional Networks (Hulladek)' },
                  { id: 're-commerce', label: 'Re-Commerce (Cashify)' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline'} btn-sm`}
                    style={{ borderRadius: '20px', padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recycler Cards Grid */}
            <div className="partner-cards-grid">
              {filteredPlayers.map((player) => (
                <div 
                  key={player.id}
                  className="video-card-wrapper partner-card-wrapper"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '20px',
                    padding: '26px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '20px'
                  }}
                >
                  <div>
                    <div className="partner-card-header-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                      <span 
                        style={{ 
                          fontSize: '0.74rem', 
                          fontWeight: '700', 
                          padding: '4px 10px', 
                          borderRadius: '8px', 
                          background: `${player.color}20`, 
                          color: player.color,
                          border: `1px solid ${player.color}40`,
                          display: 'inline-block',
                          maxWidth: '100%',
                          whiteSpace: 'normal',
                          lineHeight: '1.3'
                        }}
                      >
                        {player.badge}
                      </span>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right', flex: '1 1 auto' }}>
                        {player.ecosystemRole}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 6px', color: 'var(--text-primary)' }}>
                      {player.name}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--emerald-primary)', fontWeight: '600', marginBottom: '14px' }}>
                      {player.type}
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '16px' }}>
                      {player.specialty}
                    </p>

                    <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Logistics Model: </strong>
                        {player.logistics}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Core Strength: </strong>
                        {player.strength}
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      EcoTrace Digital Bridge
                    </span>
                    <button 
                      onClick={() => setIsApplyModalOpen(true)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--emerald-primary)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <span>Join Alliance</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: HOW ECOTRACE BRIDGES CRITICAL MARKET GAPS */}
          <div className="partner-gaps-container" style={{ marginBottom: '80px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '40px 32px' }}>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
              <div className="badge badge-purple" style={{ marginBottom: '12px' }}>
                <Zap size={14} />
                <span>Market Gap Resolution</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 12px', color: 'var(--text-primary)' }}>
                How EcoTrace Bridges India's E-Waste Gaps
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
                India has deep-tech smelters capable of recovering 99% of metals, but lacks the consumer-to-facility pipeline.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="metrics-grid">
              {/* Gap 1 */}
              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: '700', textTransform: 'uppercase' }}>Market Gap 1</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>The Mystery Drawer</h4>
                  </div>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                  Consumers hoard tangled cables, motherboards, and burnt adapters because they don't know what they are worth.
                </p>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--emerald-primary)', fontWeight: '700', marginBottom: '4px' }}>EcoTrace AI Solution:</div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                    AI Camera Viewfinder instantly estimates internal precious metal values (Gold/Silver/Copper) for instant payouts.
                  </div>
                </div>
              </div>

              {/* Gap 2 */}
              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Truck size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: '700', textTransform: 'uppercase' }}>Market Gap 2</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>Volume Disconnect</h4>
                  </div>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                  Households want to recycle 3kg of broken items responsibly, but formal high-tech smelters only dispatch for bulk tonnage.
                </p>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#3B82F6', fontWeight: '700', marginBottom: '4px' }}>EcoTrace Aggregator Bridge:</div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                    Hyper-local doorstep logistics aggregate small B2C parcels into consolidated bulk tonnage routed to formal recyclers.
                  </div>
                </div>
              </div>

              {/* Gap 3 */}
              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: '700', textTransform: 'uppercase' }}>Market Gap 3</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>The Trust Deficit</h4>
                  </div>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                  Eco-conscious citizens have zero proof that their scrap wasn't burned in open acid baths by informal scrap dealers.
                </p>
                <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#8B5CF6', fontWeight: '700', marginBottom: '4px' }}>Digital E-Waste Passport:</div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                    Users receive certified CPCB Form-2 tracking, exact metals recovered, and CO₂ offset telemetry.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: COMPREHENSIVE ECOSYSTEM COMPARISON TABLE */}
          <div style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '10px' }}>
                <Scale size={14} />
                <span>Benchmark Matrix</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 10px', color: 'var(--text-primary)' }}>
                Ecosystem Solutions Comparison
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0 }}>
                Synthesized directly from market research on Indian e-waste collection channels
              </p>
            </div>

            <div 
              style={{ 
                overflowX: 'auto', 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '20px',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>FEATURE</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: '700', color: '#06B6D4' }}>Cashify (Buyback)</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: '700', color: '#8B5CF6' }}>Attero / RecycleKaro</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: '700', color: '#EF4444' }}>Informal Sector</th>
                    <th style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--emerald-primary)', background: 'rgba(16, 185, 129, 0.08)' }}>EcoTrace Network</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.88rem' }}>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-primary)' }}>Target Audience</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>B2C (Consumers)</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>B2B (Enterprises / OEMs)</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>B2C (Consumers)</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: 'var(--emerald-primary)', background: 'rgba(16, 185, 129, 0.08)' }}>B2C &amp; B2B Aggregated</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-primary)' }}>Accepts Broken / Scrap Items?</td>
                    <td style={{ padding: '14px 20px', color: '#EF4444' }}>❌ No (Functional Only)</td>
                    <td style={{ padding: '14px 20px', color: '#3B82F6' }}>✅ Yes (Tonnage only)</td>
                    <td style={{ padding: '14px 20px', color: '#10B981' }}>✅ Yes (Unregulated)</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: 'var(--emerald-primary)', background: 'rgba(16, 185, 129, 0.08)' }}>✅ Yes (Kilos to Tons)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-primary)' }}>Doorstep Pickup Available?</td>
                    <td style={{ padding: '14px 20px', color: '#10B981' }}>✅ Yes</td>
                    <td style={{ padding: '14px 20px', color: '#F59E0B' }}>⚠️ Bulk Tonnage Only</td>
                    <td style={{ padding: '14px 20px', color: '#10B981' }}>✅ Yes (Hyper-local)</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: 'var(--emerald-primary)', background: 'rgba(16, 185, 129, 0.08)' }}>✅ Yes (AI Dispatch)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-primary)' }}>Transparent Valuation</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>Working Condition Pricing</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>Contractual by Weight</td>
                    <td style={{ padding: '14px 20px', color: '#EF4444' }}>Arbitrary Haggling</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: 'var(--emerald-primary)', background: 'rgba(16, 185, 129, 0.08)' }}>AI Material Estimation</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: 'var(--text-primary)' }}>End-of-Life Traceability</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>N/A (Resold)</td>
                    <td style={{ padding: '14px 20px', color: '#3B82F6' }}>Corporate EPR Certs</td>
                    <td style={{ padding: '14px 20px', color: '#EF4444' }}>❌ Zero Traceability</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: 'var(--emerald-primary)', background: 'rgba(16, 185, 129, 0.08)' }}>E-Waste Digital Passport</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BOTTOM PARTNER CALL TO ACTION */}
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '44px 36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '10px' }}>
                <Sparkles size={13} />
                <span>ALLIANCE ONBOARDING GATEWAY</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0 0 8px', color: 'var(--text-primary)' }}>
                Partner Your Organization with EcoTrace
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Whether you manage a corporate IT campus, industrial smelting furnace, educational university, or regional collection network—apply to integrate with our AI classification and logistics infrastructure.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => setIsApplyModalOpen(true)}
                style={{ gap: '8px' }}
              >
                <Building2 size={18} />
                <span>Be a Partner of Ours</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenConsumerApp={onOpenConsumerApp} onOpenRecyclerDash={onOpenRecyclerDash} />

      {/* POPUPS / MODALS */}
      <PartnerApplicationModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
      />
    </div>
  );
};

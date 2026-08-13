import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  Leaf, 
  FileText, 
  Truck, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Award,
  Layers,
  Smartphone,
  LayoutDashboard,
  BarChart3,
  Lock,
  Database
} from 'lucide-react';

export const PlatformPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [activePillar, setActivePillar] = useState('vision');

  const pillars = [
    {
      id: 'vision',
      title: '1. Multi-Task Vision Classifier',
      badge: '< 200ms Edge Inference',
      icon: Cpu,
      headline: 'Sub-200ms Neural Image Analysis',
      desc: 'Our multi-task deep learning model combines Convolutional Neural Networks (CNNs) with Vision Transformers (ViT) to process consumer smartphone images in under 200 milliseconds.',
      features: [
        'Multi-label detection of device category, model tier, and physical degradation.',
        'Volumetric estimation of printed circuit board (PCB) size and copper windings.',
        'Battery chemistry identification (Lithium-Ion, LiPo, NiMH) for safe handling.',
        'Trained on 45,000+ localized electronics datasets from Uttar Pradesh tech hubs.'
      ],
      stats: [
        { label: 'Inference Speed', value: '< 200 ms' },
        { label: 'Detection Accuracy', value: '99.4%' },
        { label: 'Dataset Size', value: '45,000+' }
      ],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'pricing',
      title: '2. Dynamic Valuation Engine',
      badge: 'Live LME Commodity Benchmarks',
      icon: TrendingUp,
      headline: 'Algorithmic Metal Commodity Pricing',
      desc: 'Payout values are dynamically calculated using real-time API integrations with the London Metal Exchange (LME) copper, gold, and silver commodity indices.',
      features: [
        'Live market benchmarking for secondary raw metal recovery value.',
        'Component purity coefficient formulas estimating exact gold and copper weight.',
        'Transparent cash offer quotes issued directly to consumer mobile apps.',
        'Local recycler bidding index ensuring competitive payout rates.'
      ],
      stats: [
        { label: 'Market Index', value: 'LME Live' },
        { label: 'Payout Method', value: 'Instant UPI' },
        { label: 'Pricing Model', value: '100% Open' }
      ],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'esg',
      title: '3. Scope 3 Carbon Analytics',
      badge: 'CPCB & ESG Compliant',
      icon: Leaf,
      headline: 'Real-Time Greenhouse Gas Abatement',
      desc: 'Every item processed through EcoTrace generates audit-ready Scope 3 greenhouse gas abatement certificates, calculating exact carbon emissions prevented by substituting virgin mining.',
      features: [
        'Life Cycle Assessment (LCA) mathematical carbon credit formulas.',
        'Automated CPCB E-Waste Form-2 compliance document generation.',
        'Downloadable ESG PDF certificates for enterprise sustainability filings.',
        'Zero-landfill guarantee verified by smelter batch ledger receipts.'
      ],
      stats: [
        { label: 'CO₂ Prevented', value: '2.8T / Ton' },
        { label: 'Compliance', value: 'CPCB Form-2' },
        { label: 'Reporting', value: 'Scope 3 ESG' }
      ],
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'passport',
      title: '4. Digital E-Waste Passport',
      badge: 'NIST 800-88 Standard',
      icon: FileText,
      headline: 'Immutable Chain of Custody Ledger',
      desc: 'EcoTrace issues a digital e-waste passport for every device scanned, recording the item trajectory from consumer submission, doorstep pickup transit, to final smelter extraction.',
      features: [
        'Immutable digital chain-of-custody tracking code.',
        'NIST 800-88 certified hardware data sanitization for corporate IT assets.',
        'Serialized destruction log video proof for enterprise data drives.',
        'End-to-end auditability for municipal and corporate compliance.'
      ],
      stats: [
        { label: 'Data Security', value: 'NIST 800-88' },
        { label: 'Traceability', value: '100% Verified' },
        { label: 'Audit Log', value: 'Immutable' }
      ],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const currentPillar = pillars.find(p => p.id === activePillar) || pillars[0];
  const ActiveIcon = currentPillar.icon;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="platform" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '40px 0 100px' }}>
        <div className="container">
          
          {/* HERO BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9)), url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop") center/cover',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '56px 40px',
            marginBottom: '48px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            color: '#FFFFFF'
          }}>
            <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
              <Sparkles size={14} />
              <span>AI E-Waste Architecture</span>
            </div>
            
            <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.15', marginBottom: '20px', color: '#FFFFFF' }}>
              AI-Powered E-Waste <span className="gradient-text">Intelligence Architecture</span>
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: '#CBD5E1', maxWidth: '780px', lineHeight: '1.6', marginBottom: '32px' }}>
              A deep dive into EcoTrace's multi-label computer vision model, real-time metal commodity valuation engine, Scope 3 ESG carbon tracking, and digital chain-of-custody passports.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={onOpenConsumerApp}>
                <Smartphone size={20} />
                <span>Test Camera Scanner</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={onOpenRecyclerDash}>
                <LayoutDashboard size={20} />
                <span>Recycler B2B Portal</span>
              </button>
            </div>
          </div>

          {/* QUICK TELEMETRY METRICS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '60px' }} className="metrics-grid">
            <div className="metric-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)', marginBottom: '4px' }}>&lt; 200 ms</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Inference Speed</div>
            </div>

            <div className="metric-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)', marginBottom: '4px' }}>99.4%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Detection Accuracy</div>
            </div>

            <div className="metric-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)', marginBottom: '4px' }}>100% CPCB</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Form-2 Compliance</div>
            </div>

            <div className="metric-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)', marginBottom: '4px' }}>45,000+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Training Dataset</div>
            </div>
          </div>

          {/* INTERACTIVE 4-PILLAR ARCHITECTURE MODULE */}
          <div style={{ marginBottom: '80px' }}>
            <div className="section-header">
              <div className="section-subtitle">Platform Architecture</div>
              <h2 className="section-title">The Four Core Pillars of EcoTrace</h2>
              <p className="section-description">Select a pillar below to inspect its technical specification and performance benchmarks.</p>
            </div>

            {/* Pillar Selector Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '32px' }} className="metrics-grid">
              {pillars.map((p) => {
                const isActive = activePillar === p.id;
                const PIcon = p.icon;

                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePillar(p.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'var(--emerald-glow)' : 'var(--bg-card)',
                      border: isActive ? '2px solid var(--emerald-primary)' : '1px solid var(--border-color)',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? 'var(--shadow-md)' : 'none'
                    }}
                  >
                    <PIcon size={20} color={isActive ? '#10B981' : 'var(--text-muted)'} />
                    <span style={{ fontWeight: isActive ? '800' : '600', fontSize: '0.92rem', color: isActive ? 'var(--emerald-primary)' : 'var(--text-primary)' }}>
                      {p.title.split('.')[1]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Pillar Detailed Showcase Card */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '36px', alignItems: 'center' }} className="hero-grid">
                
                {/* Left Side: Specs & Bullet Points */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div className="feature-icon-box" style={{ marginBottom: 0, width: '44px', height: '44px' }}>
                      <ActiveIcon size={24} />
                    </div>
                    <div>
                      <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>{currentPillar.badge}</span>
                      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginTop: '4px' }}>{currentPillar.headline}</h3>
                    </div>
                  </div>

                  <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '24px' }}>
                    {currentPillar.desc}
                  </p>

                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px' }}>Technical Capabilities:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    {currentPillar.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stat Chips Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                    {currentPillar.stats.map((st, sidx) => (
                      <div key={sidx} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{st.label}</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>{st.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Image Showcase */}
                <div style={{ height: '320px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
                  <img src={currentPillar.image} alt={currentPillar.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(15,23,42,0.9) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '20px'
                  }}>
                    <div style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '1.05rem' }}>
                      {currentPillar.title}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 4-STEP MATERIAL RECOVERY PIPELINE */}
          <div style={{ marginBottom: '80px' }}>
            <div className="section-header">
              <div className="section-subtitle">Lifecycle Pipeline</div>
              <h2 className="section-title">The End-to-End Recovery Journey</h2>
              <p className="section-description">From consumer mobile scan to industrial urban mining extraction.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="metrics-grid">
              <div className="feature-card" style={{ padding: '24px' }}>
                <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>01. Camera Scan</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px' }}>AI Neural Detection</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  User snaps device photo. Neural model detects PCB size, degradation tier, and metal content in &lt; 200ms.
                </p>
              </div>

              <div className="feature-card" style={{ padding: '24px' }}>
                <div className="badge badge-blue" style={{ marginBottom: '12px' }}>02. Valuation</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px' }}>LME Price Offer</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  System calculates fair cash quote based on live London Metal Exchange indices and local recycler demand.
                </p>
              </div>

              <div className="feature-card" style={{ padding: '24px' }}>
                <div className="badge badge-purple" style={{ marginBottom: '12px' }}>03. Logistics</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px' }}>Doorstep Pickup</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Authorized collection logistics partners pick up item with GPS map tracking and slot confirmation under 24 hours.
                </p>
              </div>

              <div className="feature-card" style={{ padding: '24px' }}>
                <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>04. Recycler</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '8px' }}>Urban Mining</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  CPCB smelters accept item on Web Dashboard, extract 98.2% gold & copper, and issue official recycling certificates.
                </p>
              </div>
            </div>
          </div>

          {/* RESOURCE RECOVERY BENCHMARKS */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '44px',
            marginBottom: '60px'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '24px', textAlign: 'center' }}>
              Resource Recovery Yield Benchmarks
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="metrics-grid">
              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--emerald-primary)', marginBottom: '4px' }}>98.2%</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>Gold Extraction Yield</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recovered from high-grade circuit board contacts.</p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--emerald-primary)', marginBottom: '4px' }}>94.6%</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>Copper Wire Purity</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recovered from motor windings & transformers.</p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--emerald-primary)', marginBottom: '4px' }}>100%</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '4px' }}>Heavy Metal Containment</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Zero lead or mercury escaping into groundwater.</p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CALL TO ACTION */}
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '16px' }}>Ready to Experience the AI Platform?</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '600px', margin: '0 auto 28px' }}>
              Test instant camera scan or explore the Recycler Dashboard to view incoming e-waste bids.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={onOpenConsumerApp}>
                <Smartphone size={20} />
                <span>Launch Mobile Scanner</span>
              </button>
              <button className="btn btn-secondary btn-lg" onClick={onOpenRecyclerDash}>
                <LayoutDashboard size={20} />
                <span>Open Recycler Dashboard</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenConsumerApp={onOpenConsumerApp} onOpenRecyclerDash={onOpenRecyclerDash} />
    </div>
  );
};

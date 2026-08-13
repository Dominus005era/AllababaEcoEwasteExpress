import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  TrendingUp, 
  Leaf, 
  FileText, 
  Truck, 
  LayoutDashboard, 
  Sparkles, 
  ArrowRight, 
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const SpiralStairwayFeatures = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const features = [
    {
      id: '01',
      title: 'AI Computer Vision Classifier',
      subtitle: 'Sub-200ms Multi-Task Neural Recognition',
      desc: 'Instant camera scan detects device type, structural degradation tier, internal printed circuit board (PCB) size, and battery chemistry.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      badge: '99.4% AI Accuracy',
      icon: Cpu,
      stats: [
        { label: 'Latency', value: '< 200 ms' },
        { label: 'Dataset', value: '45,000+' },
        { label: 'Detection', value: 'Edge AI' }
      ],
      action: onOpenConsumerApp,
      btnText: 'Launch Mobile Scanner'
    },
    {
      id: '02',
      title: 'Dynamic Resale Valuation Engine',
      subtitle: 'Real-Time Commodity Market Benchmark',
      desc: 'Algorithmic pricing referenced to live London Metal Exchange (LME) copper, gold, and silver commodity indices for transparent payouts.',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1200&auto=format&fit=crop',
      badge: 'Live LME Index',
      icon: TrendingUp,
      stats: [
        { label: 'Pricing', value: 'LME Index' },
        { label: 'Payouts', value: 'Instant Cash' },
        { label: 'Math', value: 'Open API' }
      ],
      action: () => onNavigate('platform'),
      btnText: 'View Valuation Math'
    },
    {
      id: '03',
      title: 'Real-Time Carbon Offset Analytics',
      subtitle: 'Scope 3 ESG Footprint Auditing',
      desc: 'Calculates exact greenhouse gas emissions avoided by diverting heavy metals from landfills into certified smelters.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop',
      badge: 'CPCB & Scope 3 Certified',
      icon: Leaf,
      stats: [
        { label: 'CO₂ Saved', value: '2.8T / Ton' },
        { label: 'CPCB Form', value: 'Form-2' },
        { label: 'Certificate', value: 'PDF Audit' }
      ],
      action: () => onNavigate('platform'),
      btnText: 'Explore Carbon Analytics'
    },
    {
      id: '04',
      title: 'Digital E-Waste Passport',
      subtitle: 'Immutable Chain of Custody Ledger',
      desc: 'Generates an immutable digital passport tracking device trajectory from consumer camera submission to final smelter extraction.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
      badge: 'NIST 800-88 Standard',
      icon: FileText,
      stats: [
        { label: 'Security', value: 'NIST 800-88' },
        { label: 'Custody', value: 'End-to-End' },
        { label: 'Audit', value: 'Ledger Log' }
      ],
      action: () => onNavigate('platform'),
      btnText: 'Inspect Digital Passport'
    },
    {
      id: '05',
      title: 'Automated Doorstep Pickup',
      subtitle: 'Smart Geo-Routing Logistics Dispatch',
      desc: 'Integrated GPS routing dispatches authorized collection logistics partners directly to consumer addresses with real-time tracking.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      badge: '< 24 Hours Dispatch',
      icon: Truck,
      stats: [
        { label: 'Dispatch', value: '< 24 Hours' },
        { label: 'Tracking', value: 'Live GPS' },
        { label: 'Coverage', value: 'UP & Metro' }
      ],
      action: onOpenConsumerApp,
      btnText: 'Schedule Doorstep Pickup'
    },
    {
      id: '06',
      title: 'Recycler B2B Web Portal',
      subtitle: 'Real-Time Industrial Bidding Queue',
      desc: 'Dedicated desktop web portal for authorized recyclers to filter incoming e-waste bids, accept pickup jobs, and audit inventory.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
      badge: 'Authorized Recycler Hub',
      icon: LayoutDashboard,
      stats: [
        { label: 'B2B Hub', value: 'Real-Time Bids' },
        { label: 'Recyclers', value: 'CPCB Certified' },
        { label: 'Stream', value: 'Direct' }
      ],
      action: onOpenRecyclerDash,
      btnText: 'Access Recycler Dashboard'
    }
  ];

  // Auto-Rotation Timer (4 seconds)
  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPaused, features.length]);

  const currentFeature = features[activeIndex];
  const IconComponent = currentFeature.icon;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  return (
    <div 
      className="feature-matrix-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* MAIN FEATURE MATRIX LAYOUT */}
      <div className="feature-matrix-layout">
        
        {/* DESKTOP LEFT FEATURE LIST (Hidden on Mobile) */}
        <div className="desktop-feature-list">
          <div className="badge badge-emerald" style={{ width: 'fit-content', marginBottom: '14px' }}>
            <Sparkles size={13} />
            <span>ENTERPRISE PILLARS</span>
          </div>

          <div className="desktop-feature-items-container">
            {features.map((f, idx) => {
              const isActive = activeIndex === idx;
              const FIcon = f.icon;

              return (
                <button
                  key={f.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`desktop-feature-item ${isActive ? 'active' : ''}`}
                >
                  <div className="step-badge-num">
                    {f.id}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div className="step-item-title">
                      {f.title}
                    </div>
                  </div>

                  <FIcon size={16} color={isActive ? '#10B981' : 'var(--text-muted)'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT FEATURE SPOTLIGHT DISPLAY (Stretched Height & Clean Mobile Card) */}
        <div className="feature-spotlight-card">
          {/* Stretched High-Res Image Header */}
          <div className="spotlight-image-wrapper">
            <img 
              src={currentFeature.image} 
              alt={currentFeature.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div className="spotlight-image-overlay">
              <span className="badge badge-emerald" style={{ width: 'fit-content', marginBottom: '12px', fontSize: '0.8rem' }}>
                <Zap size={13} />
                <span>{currentFeature.badge}</span>
              </span>

              {/* Holographic Telemetry Metrics */}
              <div className="spotlight-telemetry-grid">
                {currentFeature.stats.map((st, sidx) => (
                  <div key={sidx} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase' }}>{st.label}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>{st.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="spotlight-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="feature-icon-box" style={{ marginBottom: 0, width: '42px', height: '42px', flexShrink: 0 }}>
                  <IconComponent size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--emerald-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '800' }}>
                    FEATURE PILLAR {currentFeature.id} OF 06
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', lineHeight: '1.2' }}>{currentFeature.title}</h3>
                </div>
              </div>

              {/* Mobile Arrows */}
              <div className="mobile-arrow-controls">
                <button onClick={handlePrev} className="btn btn-secondary btn-sm" style={{ padding: '6px', borderRadius: '50%' }}>
                  <ChevronLeft size={16} />
                </button>
                <button onClick={handleNext} className="btn btn-secondary btn-sm" style={{ padding: '6px', borderRadius: '50%' }}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--emerald-primary)', marginBottom: '10px' }}>
              {currentFeature.subtitle}
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '24px' }}>
              {currentFeature.desc}
            </p>

            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={currentFeature.action}>
              <span>{currentFeature.btnText}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>

      {/* STEP PAGINATION DOTS (MOBILE & DESKTOP) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
        {features.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setActiveIndex(dotIdx)}
            style={{
              width: activeIndex === dotIdx ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: activeIndex === dotIdx ? 'var(--emerald-primary)' : 'var(--border-color)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to feature step ${dotIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

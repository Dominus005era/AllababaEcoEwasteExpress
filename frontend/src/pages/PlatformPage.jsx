import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import '../styles/platform.css';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Cpu, 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  Truck, 
  Flame, 
  Leaf, 
  Skull, 
  Award, 
  CheckCircle2, 
  Zap, 
  Smartphone, 
  LayoutDashboard,
  TrendingUp,
  ListFilter,
  Play,
  FileCheck2,
  MapPin,
  QrCode,
  Layers,
  Eye
} from 'lucide-react';

export const PlatformPage = ({ onNavigate, onOpenConsumerApp, onOpenRecyclerDash }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayMode, setDisplayMode] = useState('comparison'); // 'comparison' or 'story-art'

  const steps = [
    {
      id: '01',
      stageName: 'Creation & The Drawer of Oblivion',
      shortName: '01. Creation',
      storyImage: '/story/img 2.png',
      before: {
        title: 'The Forgotten Shadow Journey',
        badge: 'Drawer of Oblivion',
        desc: 'A cracked smartphone sits in a dark bedroom drawer for 3 years. Forgotten. Outdated. Eventually tossed into the daily trash bag alongside wet household garbage.',
        stat: '3 Years Lost',
        statLabel: 'Drawer Stagnation',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop',
        points: ['Zero perceived value', 'Treated as worthless junk', 'Precious metals wasted forever']
      },
      after: {
        title: 'The Dignified Circular Journey',
        badge: 'Instant AI Voice',
        desc: 'A phone reaches the end of its life. Instead of rotting in a drawer or wet trash, the user opens EcoTrace, snaps a single photo, and gives that old phone a voice in < 3s.',
        stat: '< 3 Seconds',
        statLabel: 'AI Scan Time',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
        points: ['EcoTrace AI scan in under 3s', 'Device & broken condition auto-detected', '94% confidence classification']
      }
    },
    {
      id: '02',
      stageName: 'The Invisible Loss vs Revealed Value',
      shortName: '02. Valuation',
      storyImage: '/story/img 1.png',
      before: {
        title: 'The Invisible Loss',
        badge: 'Zero Value Perceived',
        desc: 'Treated as worthless junk. No one knows what precious metals inside — gold, copper, lithium, PCBs — are being wasted forever with informal scrap dealers.',
        stat: '₹0 / Scrap Loss',
        statLabel: 'Zero Perceived Worth',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
        points: ['Gold, Copper, Lithium = ₹0 Value', 'Informal scrap dealer lowballing', 'Heavy toxic metals discarded']
      },
      after: {
        title: 'The Revealed Value & Yield Matrix',
        badge: 'Instant Cash Quote',
        desc: 'AI neural vision instantly breaks down the inner soul of the device: gold contacts, copper wire, lithium battery, and yields an instant ₹450 cash payout with 2.3kg CO₂ saved.',
        stat: '₹450 Cash',
        statLabel: '2.3kg CO₂ Abated',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
        points: ['Breakdown: Gold, Copper, Lithium, PCBs', 'Instant ₹450 direct UPI valuation', 'Hidden waste becomes visible wealth']
      }
    },
    {
      id: '03',
      stageName: 'The Dangerous Path vs Green Logistics',
      shortName: '03. Logistics',
      storyImage: '/story/img 3.png',
      before: {
        title: 'The Dangerous Path',
        badge: 'Unregulated Handcarts',
        desc: 'Collected by informal scrap peddlers. Loaded onto open carts. Handled with bare hands. Shipped to unregulated, unmapped back-alley scrap yards.',
        stat: '100% Hazardous',
        statLabel: 'Unregulated Exposure',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
        points: ['Handled loosely with bare hands', 'Loaded onto open wooden carts', 'Shipped to unregulated back-alley yards']
      },
      after: {
        title: 'Green Logistics & Live Map Tracking',
        badge: 'Doorstep Green Van',
        desc: 'One simple tap on "Schedule Pickup". A verified CPCB-authorized green recycler is dispatched directly to the doorstep with interactive live GPS map tracking.',
        stat: 'Live GPS Track',
        statLabel: 'Doorstep Pickup',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
        points: ['1-Tap "Schedule Pickup" booking', 'Assigned green logistics vehicle', 'Live map tracking from pickup to facility']
      }
    },
    {
      id: '04',
      stageName: 'The Human Toll vs Certified Recycling',
      shortName: '04. Processing',
      storyImage: '/story/img 4.png',
      before: {
        title: 'The Human & Planet Toll',
        badge: 'Toxic Acid & Open Fire',
        desc: 'Acid baths poured directly into soil. Toxic lead and mercury fumes breathed in by young workers. Groundwater poisoned and e-waste burned over open charcoal fires.',
        stat: 'Toxic Poison',
        statLabel: 'Acid Soil Runoff',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
        points: ['Acid baths dumped into waterways', 'Toxic lead & mercury smoke inhaled', 'Groundwater poisoned across generations']
      },
      after: {
        title: 'Certified Recycling & Digital Passport',
        badge: 'EW-2026-000184 Passport',
        desc: 'Digital E-Waste Passport (EW-2026-000184) updated live. Authorized facility safely dismantles devices. 98.2% gold, copper, and lithium recovered for clean circular supply chains.',
        stat: '98.2% Yield',
        statLabel: 'Gold & Copper Saved',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop',
        points: ['Digital Passport EW-2026-000184', 'Safely dismantled in certified plant', 'Precious metals returned to supply chain']
      }
    },
    {
      id: '05',
      stageName: 'The Negative Legacy vs Proof of Impact',
      shortName: '05. Proof of Impact',
      storyImage: '/story/img 5.png',
      before: {
        title: 'The Negative Legacy',
        badge: 'Millions of Tons Landfilled',
        desc: 'Millions of tons clogging municipal landfills. Permanent environmental toxicity. Heavy metals like mercury, cadmium, and lead leaking into city water reservoirs.',
        stat: 'Infinite Risk',
        statLabel: 'Permanent Landfill Waste',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
        points: ['Mountains of e-waste in slum dumps', 'Heavy metal toxic leak into soil', 'Zero accountability or recycling trail']
      },
      after: {
        title: 'The EcoTrace Verified Impact Certificate',
        badge: 'Audit Verified Seal',
        desc: 'Digital Green Certificate issued. Total carbon footprint offset calculated (2.3kg CO₂ per device). E-waste permanently transformed into clean, traceable wealth.',
        stat: '2.3kg CO₂',
        statLabel: 'Carbon Offset Verified',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
        points: ['Digital Green Certificate EW-2026-000184', 'Carbon offset mathematically verified', '100% circular manufacturing loop']
      }
    }
  ];

  const activeStage = steps[currentStep];

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView="platform" 
        onNavigate={onNavigate} 
        onOpenConsumerApp={onOpenConsumerApp} 
        onOpenRecyclerDash={onOpenRecyclerDash} 
      />

      <main style={{ flex: 1, padding: '0 0 80px' }}>

        {/* HERO SECTION */}
        <section className="platform-page-hero">
          <div className="container">
            <div className="platform-hero-card">
              <div className="badge badge-emerald" style={{ marginBottom: '14px', width: 'fit-content' }}>
                <Sparkles size={14} />
                <span>The Story of E-Waste • Problem Statement &amp; AI Solution</span>
              </div>

              <h1 className="platform-hero-title">
                E-Waste Transformation <span className="gradient-text">Before vs. After</span> EcoTrace
              </h1>

              <p className="platform-hero-desc">
                Follow the journey of electronic waste: from forgotten bedroom drawers and toxic acid burning yards to AI-powered instant valuation, green doorstep logistics, and certified digital passports.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={onOpenConsumerApp}>
                  <Smartphone size={18} />
                  <span>Test AI Camera Scanner</span>
                </button>
                <button className="btn btn-secondary" onClick={onOpenRecyclerDash}>
                  <LayoutDashboard size={18} />
                  <span>Open Recycler Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container">

          {/* VIEW SWITCHER: COMPARISON CARDS vs STORY ARTWORK */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Select Transformation Lifecycle Stage:
            </div>

            <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <button
                onClick={() => setDisplayMode('comparison')}
                style={{
                  background: displayMode === 'comparison' ? 'var(--emerald-primary)' : 'transparent',
                  color: displayMode === 'comparison' ? '#FFFFFF' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Side-by-Side Matrix
              </button>
              <button
                onClick={() => setDisplayMode('story-art')}
                style={{
                  background: displayMode === 'story-art' ? 'var(--emerald-primary)' : 'transparent',
                  color: displayMode === 'story-art' ? '#FFFFFF' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Eye size={14} />
                <span>Story Visual Artwork</span>
              </button>
            </div>
          </div>

          {/* DESKTOP STAGE SELECTOR TABS */}
          <div className="platform-stage-tabs-wrapper desktop-only-tabs">
            <div className="platform-stage-tabs">
              {steps.map((st, idx) => {
                const isActive = currentStep === idx;
                return (
                  <button
                    key={st.id}
                    onClick={() => setCurrentStep(idx)}
                    className={`stage-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    <span className="stage-tab-num">{st.id}</span>
                    <span>{st.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE DROPDOWN STAGE SELECTOR */}
          <div className="mobile-stage-selector-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-primary)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px' }}>
              <ListFilter size={16} />
              <span>SELECT LIFECYCLE STAGE ({currentStep + 1} OF 5):</span>
            </div>
            <select 
              value={currentStep} 
              onChange={(e) => setCurrentStep(Number(e.target.value))}
              className="mobile-stage-select"
            >
              {steps.map((st, idx) => (
                <option key={st.id} value={idx}>
                  {st.id}. {st.stageName}
                </option>
              ))}
            </select>
          </div>

          {/* MAIN STAGE SHOWCASE CARD */}
          <div className="comparison-master-card">
            
            {/* Top Stage Header & Controls */}
            <div className="comparison-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span className="badge badge-emerald" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                  STAGE {activeStage.id} OF 05
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>{activeStage.stageName}</h2>
              </div>
            </div>

            {displayMode === 'comparison' ? (
              /* DUAL COMPARISON GRID (Side-by-Side on Desktop, Stacked cleanly on Mobile) */
              <div className="comparison-grid">
                
                {/* BEFORE ECOTRACE CARD */}
                <div className="comparison-subcard before-card">
                  <div className="subcard-header red">
                    <Trash2 size={20} color="#EF4444" />
                    <div>
                      <span className="subcard-tag red">🔴 BEFORE ECOTRACE</span>
                      <h3 className="subcard-title red">{activeStage.before.title}</h3>
                    </div>
                  </div>

                  <div className="subcard-media-wrapper">
                    <img src={activeStage.before.image} alt={activeStage.before.title} />
                    <div className="subcard-stat-overlay red">
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#FECDD3' }}>{activeStage.before.statLabel}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>{activeStage.before.stat}</div>
                    </div>
                  </div>

                  <p className="subcard-desc">{activeStage.before.desc}</p>

                  <div className="subcard-bullets">
                    {activeStage.before.points.map((pt, pidx) => (
                      <div key={pidx} className="bullet-item red">
                        <span className="bullet-dot red">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AFTER ECOTRACE CARD */}
                <div className="comparison-subcard after-card">
                  <div className="subcard-header green">
                    <Cpu size={20} color="#10B981" />
                    <div>
                      <span className="subcard-tag green">🟢 AFTER ECOTRACE</span>
                      <h3 className="subcard-title green">{activeStage.after.title}</h3>
                    </div>
                  </div>

                  <div className="subcard-media-wrapper">
                    <img src={activeStage.after.image} alt={activeStage.after.title} />
                    <div className="subcard-stat-overlay green">
                      <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#D1FAE5' }}>{activeStage.after.statLabel}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF' }}>{activeStage.after.stat}</div>
                    </div>
                  </div>

                  <p className="subcard-desc">{activeStage.after.desc}</p>

                  <div className="subcard-bullets">
                    {activeStage.after.points.map((pt, pidx) => (
                      <div key={pidx} className="bullet-item green">
                        <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* STORY ARTWORK INFOGRAPHIC MODE */
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(16, 185, 129, 0.4)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  background: '#0B0F19',
                  maxWidth: '1000px',
                  margin: '0 auto'
                }}>
                  <img 
                    src={activeStage.storyImage} 
                    alt={`The Story of E-Waste Stage ${activeStage.id}`}
                    style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '600px', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ marginTop: '14px', fontSize: '0.85rem', color: '#94A3B8' }}>
                  Graphic illustration from <em>"The Story of E-Waste"</em> problem statement series.
                </div>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="comparison-bottom-bar">
              <button className="btn btn-secondary btn-sm" onClick={handlePrev}>
                <ChevronLeft size={16} />
                <span>Prev Step</span>
              </button>

              <div style={{ display: 'flex', gap: '6px' }}>
                {steps.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentStep(dotIdx)}
                    style={{
                      width: currentStep === dotIdx ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: currentStep === dotIdx ? 'var(--emerald-primary)' : 'var(--border-color)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={`Go to stage ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button className="btn btn-primary btn-sm" onClick={handleNext}>
                <span>Next Step</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

          {/* PLATFORM ENGINE ARCHITECTURE VIDEO SECTION */}
          <div style={{ marginBottom: '60px', marginTop: '60px' }}>
            <div className="section-header" style={{ marginBottom: '36px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
                <Play size={14} />
                <span>Platform Transformation Walkthrough</span>
              </div>
              <h2 className="section-title">The EcoTrace Platform Engine in Action</h2>
              <p className="section-description">
                Explore our end-to-end circular infrastructure: from AI neural hardware valuation and automated CPCB-compliant bidding to digitized doorstep logistics and closed-loop material recovery.
              </p>
            </div>

            <div className="video-card-wrapper" style={{
              maxWidth: '960px',
              margin: '0 auto',
              background: '#000000',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--emerald-primary)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg), var(--shadow-emerald)',
              position: 'relative'
            }}>
              <video 
                controls 
                autoPlay 
                muted 
                loop 
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '520px', objectFit: 'cover' }}
                poster="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"
              >
                <source src="/Platform.mp4" type="video/mp4" />
                <source src="/platform_demo.mp4" type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>
            </div>
          </div>

          {/* TELEMETRY IMPACT BENCHMARKS */}
          <div className="impact-benchmarks-card">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '8px' }}>
                <TrendingUp size={13} />
                <span>Platform System Benchmarks</span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>Quantifiable EcoTrace Yields</h2>
            </div>

            <div className="impact-stats-grid">
              <div className="impact-stat-box">
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>98.2%</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Gold Extraction Yield</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recovered from PCB contacts.</div>
              </div>

              <div className="impact-stat-box">
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>94.6%</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Copper Wire Purity</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recovered from motor windings.</div>
              </div>

              <div className="impact-stat-box">
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>2.8 Tons</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>CO₂ Prevented / Ton</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scope 3 greenhouse abatement.</div>
              </div>

              <div className="impact-stat-box">
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)' }}>100%</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>NIST 800-88 Wiped</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Guaranteed IT data security.</div>
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="platform-cta-banner">
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>Be Part of the AI E-Waste Revolution</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
              Test our sub-200ms camera scan or access the recycler bidding dashboard to route items cleanly.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={onOpenConsumerApp}>
                <Smartphone size={18} />
                <span>Launch Camera Scanner</span>
              </button>
              <button className="btn btn-secondary" onClick={onOpenRecyclerDash}>
                <LayoutDashboard size={18} />
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
